"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { HiOutlineArrowsExpand, HiX } from "react-icons/hi";
import type { GalleryImage } from "@/lib/services-data";
import { cn } from "@/lib/utils";

type MasonryGalleryProps = {
  images: GalleryImage[];
};

export function MasonryGallery({ images }: MasonryGalleryProps) {
  const [active, setActive] = useState<number | null>(null);
  const [visible, setVisible] = useState<Set<string>>(new Set());

  const observerRef = useRef<IntersectionObserver | null>(null);
  const itemRefs = useRef<Map<string, HTMLDivElement>>(new Map());

  useEffect(() => {
    observerRef.current = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const id = entry.target.getAttribute("data-id");
            if (id) setVisible((prev) => new Set(prev).add(id));
          }
        });
      },
      { rootMargin: "120px", threshold: 0.08 }
    );

    itemRefs.current.forEach((el) => observerRef.current?.observe(el));
    return () => observerRef.current?.disconnect();
  }, [images]);

  const setRef = useCallback((id: string, el: HTMLDivElement | null) => {
    if (el) {
      itemRefs.current.set(id, el);
      observerRef.current?.observe(el);
    } else {
      itemRefs.current.delete(id);
    }
  }, []);

  useEffect(() => {
    if (active === null) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setActive(null);
      if (e.key === "ArrowRight")
        setActive((i) => (i !== null ? (i + 1) % images.length : null));
      if (e.key === "ArrowLeft")
        setActive((i) =>
          i !== null ? (i - 1 + images.length) % images.length : null
        );
    };
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKey);
    };
  }, [active, images.length]);

  const aspectClass = (aspect: GalleryImage["aspect"]) => {
    if (aspect === "tall") return "aspect-[3/4]";
    if (aspect === "wide") return "aspect-video";
    return "aspect-square";
  };

  return (
    <>
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        className="gallery-minimal columns-1 gap-5 sm:columns-2 lg:columns-3 [column-gap:1.25rem]"
      >
        {images.map((img, index) => {
          const isLoaded = visible.has(img.id);
          return (
            <motion.div
              key={img.id}
              ref={(el) => setRef(img.id, el)}
              data-id={img.id}
              initial={{ opacity: 0, y: 24, filter: "blur(12px)" }}
              animate={
                isLoaded
                  ? { opacity: 1, y: 0, filter: "blur(0px)" }
                  : { opacity: 0, y: 24, filter: "blur(12px)" }
              }
              transition={{ duration: 0.65, ease: [0.16, 1, 0.3, 1] }}
              className="mb-4 break-inside-avoid"
            >
              <button
                type="button"
                onClick={() => setActive(index)}
                className={cn(
                  "gallery-item group relative w-full overflow-hidden rounded-xl border border-white/[0.08]",
                  "transition-transform duration-500 ease-out will-change-transform",
                  "hover:scale-[1.02] hover:glow-violet focus:outline-none focus-visible:ring-2 focus-visible:ring-cs-violet"
                )}
                style={{ transform: "translateZ(0)" }}
              >
                <motion.div
                  className={cn(
                    "relative w-full bg-gradient-to-br overflow-hidden",
                    img.gradient,
                    aspectClass(img.aspect)
                  )}
                  whileHover={{ scale: 1.06 }}
                  transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                >
                  {img.src ? (
                    <Image
                      src={img.src}
                      alt={img.alt}
                      fill
                      className="object-cover"
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                      loading="lazy"
                    />
                  ) : null}
                  <motion.div
                    className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-400"
                  />
                  <span className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-400">
                    <span className="glass flex h-12 w-12 items-center justify-center rounded-full text-cs-silver">
                      <HiOutlineArrowsExpand className="h-5 w-5" />
                    </span>
                  </span>
                  <span className="absolute bottom-4 left-4 text-xs uppercase tracking-widest text-cs-silver/50">
                    {img.alt}
                  </span>
                </motion.div>
              </button>
            </motion.div>
          );
        })}
      </motion.div>

      <AnimatePresence>
        {active !== null && (
          <motion.div
            role="dialog"
            aria-modal
            aria-label="Image preview"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.35 }}
            className="fixed inset-0 z-[180] flex items-center justify-center p-4 md:p-8"
          >
            <motion.button
              type="button"
              aria-label="Close preview"
              className="absolute inset-0 bg-black/85 backdrop-blur-xl"
              initial={{ backdropFilter: "blur(0px)" }}
              animate={{ backdropFilter: "blur(24px)" }}
              exit={{ backdropFilter: "blur(0px)" }}
              onClick={() => setActive(null)}
            />
            <motion.div
              key={active}
              initial={{ opacity: 0, scale: 0.92, filter: "blur(20px)" }}
              animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
              exit={{ opacity: 0, scale: 0.94, filter: "blur(16px)" }}
              transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
              className="relative z-10 w-full max-w-5xl"
            >
              <div
                className={cn(
                  "relative aspect-video w-full overflow-hidden rounded-3xl border border-white/15 bg-gradient-to-br shadow-2xl",
                  images[active].gradient
                )}
              >
                {images[active].src ? (
                  <Image
                    src={images[active].src!}
                    alt={images[active].alt}
                    fill
                    className="object-contain"
                    sizes="100vw"
                    priority
                  />
                ) : null}
                <p className="absolute bottom-6 left-6 z-10 text-sm text-cs-silver/70">
                  {images[active].alt}
                </p>
              </div>
              <button
                type="button"
                onClick={() => setActive(null)}
                className="absolute -top-12 right-0 flex h-10 w-10 items-center justify-center rounded-full glass text-cs-silver hover:glow-violet transition-shadow"
                aria-label="Close"
              >
                <HiX className="h-5 w-5" />
              </button>
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="mt-4 text-center text-xs text-cs-silver/40 tracking-widest uppercase"
              >
                {active + 1} / {images.length} · Esc to close
              </motion.p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
