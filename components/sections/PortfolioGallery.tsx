"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { HiOutlineArrowsExpand, HiX } from "react-icons/hi";
import { PORTFOLIO } from "@/lib/constants";
import { getPortfolio } from "@/lib/cms/store";
import type { PortfolioItem } from "@/lib/cms/types";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { SectionReveal } from "@/components/ui/SectionReveal";
import { cn } from "@/lib/utils";

const ALL = "All";

export function PortfolioGallery() {
  const [items, setItems] = useState<PortfolioItem[]>([]);
  const [category, setCategory] = useState(ALL);
  const [preview, setPreview] = useState<number | null>(null);

  useEffect(() => {
    setItems(getPortfolio());
  }, []);

  const categories = useMemo(() => {
    const cats = new Set(items.map((i) => i.category));
    return [ALL, ...Array.from(cats)];
  }, [items]);

  const filtered =
    category === ALL ? items : items.filter((i) => i.category === category);

  const openPreview = useCallback((index: number) => setPreview(index), []);
  const closePreview = useCallback(() => setPreview(null), []);

  useEffect(() => {
    if (preview === null) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") closePreview();
      if (e.key === "ArrowRight")
        setPreview((i) =>
          i !== null ? (i + 1) % filtered.length : null
        );
      if (e.key === "ArrowLeft")
        setPreview((i) =>
          i !== null ? (i - 1 + filtered.length) % filtered.length : null
        );
    };
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKey);
    };
  }, [preview, filtered.length, closePreview]);

  return (
    <SectionReveal parallax={false}>
      <section id="work" className="section-padding py-24 md:py-32 overflow-hidden">
        <SectionHeading
          eyebrow="Portfolio"
          title="Selected work"
          subtitle="Scroll horizontally — filter by category and tap any project for fullscreen preview."
          align="center"
        />

        <div className="mt-10 flex flex-wrap justify-center gap-2 sm:gap-3">
          {categories.map((cat) => (
            <button
              key={cat}
              type="button"
              onClick={() => setCategory(cat)}
              className={cn(
                "rounded-full px-4 py-2 text-[10px] sm:text-xs uppercase tracking-widest transition-all duration-300",
                category === cat
                  ? "tab-active stroke-accent-active text-cs-silver"
                  : "surface-muted text-cs-silver/50 hover:text-cs-silver hover:stroke-accent"
              )}
            >
              {cat}
            </button>
          ))}
        </div>

        <div className="relative mt-10 -mx-[clamp(1.25rem,4vw,3rem)] px-[clamp(1.25rem,4vw,3rem)]">
          <div className="pointer-events-none absolute left-0 top-0 bottom-4 z-10 w-12 sm:w-20 portfolio-fade-left" />
          <div className="pointer-events-none absolute right-0 top-0 bottom-4 z-10 w-12 sm:w-20 portfolio-fade-right" />

          <div
            className="portfolio-scroll flex gap-5 sm:gap-6 overflow-x-auto pb-6 snap-x snap-mandatory scroll-smooth"
            style={{ WebkitOverflowScrolling: "touch" }}
          >
            {filtered.map((item, index) => (
              <motion.article
                key={item.id}
                layout
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.45, delay: index * 0.04 }}
                className="snap-center shrink-0 w-[min(82vw,340px)] sm:w-[360px] md:w-[400px]"
              >
                <button
                  type="button"
                  onClick={() => openPreview(index)}
                  className="portfolio-card-premium group relative block w-full overflow-hidden rounded-2xl text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-cs-violet"
                >
                  <div className="relative aspect-[4/5] w-full">
                    {item.image ? (
                      <Image
                        src={item.image}
                        alt={item.title}
                        fill
                        className="object-cover transition-transform duration-700 group-hover:scale-105"
                        sizes="400px"
                        loading="lazy"
                      />
                    ) : (
                      <div
                        className={cn(
                          "absolute inset-0 bg-gradient-to-br",
                          item.gradient
                        )}
                      />
                    )}
                    <div className="absolute inset-0 bg-gradient-to-t from-cs-black via-cs-black/40 to-transparent opacity-90" />
                    <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-400 bg-[radial-gradient(ellipse_at_50%_100%,rgba(110,0,255,0.25),transparent_60%)]" />
                    <span className="absolute top-4 right-4 flex h-10 w-10 items-center justify-center rounded-full surface opacity-0 group-hover:opacity-100 transition-opacity">
                      <HiOutlineArrowsExpand className="h-4 w-4 text-cs-neon" />
                    </span>
                    <div className="absolute bottom-0 left-0 right-0 p-5 sm:p-6">
                      <p className="text-[10px] uppercase tracking-[0.3em] text-cs-neon">
                        {item.category}
                      </p>
                      <h3
                        className="mt-1 text-xl sm:text-2xl font-bold text-cs-silver"
                        style={{ fontFamily: "var(--font-display)" }}
                      >
                        {item.title}
                      </h3>
                    </div>
                  </div>
                </button>
              </motion.article>
            ))}
          </div>
        </div>

        <AnimatePresence>
          {preview !== null && filtered[preview] && (
            <motion.div
              role="dialog"
              aria-modal
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.25 }}
              className="fixed inset-0 z-[200] flex items-center justify-center p-4 md:p-10"
            >
              <button
                type="button"
                aria-label="Close"
                className="absolute inset-0 bg-cs-black/92"
                onClick={closePreview}
              />
              <motion.div
                initial={{ opacity: 0, scale: 0.96 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.98 }}
                transition={{ duration: 0.3 }}
                className="relative z-10 w-full max-w-5xl stroke-accent rounded-3xl overflow-hidden surface-elevated"
              >
                <div className="relative aspect-video w-full min-h-[240px]">
                  {filtered[preview].image ? (
                    <Image
                      src={filtered[preview].image!}
                      alt={filtered[preview].title}
                      fill
                      className="object-contain bg-cs-black"
                      sizes="100vw"
                      priority
                    />
                  ) : (
                    <div
                      className={cn(
                        "absolute inset-0 bg-gradient-to-br",
                        filtered[preview].gradient
                      )}
                    />
                  )}
                </div>
                <div className="p-6 border-t border-white/10">
                  <p className="text-xs uppercase tracking-widest text-cs-violet">
                    {filtered[preview].category}
                  </p>
                  <h3
                    className="mt-1 text-2xl font-bold text-cs-silver"
                    style={{ fontFamily: "var(--font-display)" }}
                  >
                    {filtered[preview].title}
                  </h3>
                </div>
                <button
                  type="button"
                  onClick={closePreview}
                  className="absolute top-4 right-4 flex h-10 w-10 items-center justify-center rounded-full surface hover:glow-yellow"
                  aria-label="Close preview"
                >
                  <HiX className="h-5 w-5" />
                </button>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </section>
    </SectionReveal>
  );
}
