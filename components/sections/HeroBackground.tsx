"use client";

import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { getHeroConfig } from "@/lib/cms/store";
import { getHeroVideoBlob } from "@/lib/hero-video-storage";

const DEFAULT_VIDEO = "/content/hero/hero.mp4";

export function HeroBackground() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [src, setSrc] = useState<string | null>(null);
  const [ready, setReady] = useState(false);
  const [error, setError] = useState(false);
  const blobUrlRef = useRef<string | null>(null);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    setIsMobile(window.matchMedia("(max-width: 768px)").matches);
  }, []);

  useEffect(() => {
    let cancelled = false;

    async function load() {
      const config = getHeroConfig();
      const blob = await getHeroVideoBlob();
      if (cancelled) return;

      if (blobUrlRef.current) {
        URL.revokeObjectURL(blobUrlRef.current);
        blobUrlRef.current = null;
      }

      if (blob && blob.size > 0) {
        const url = URL.createObjectURL(blob);
        blobUrlRef.current = url;
        setSrc(url);
        setError(false);
        return;
      }

      const staticUrl = config.videoUrl ?? DEFAULT_VIDEO;
      setSrc(staticUrl);
      setError(false);
    }

    load();

    const onUpdate = () => load();
    window.addEventListener("cs-hero-video-updated", onUpdate);

    return () => {
      cancelled = true;
      window.removeEventListener("cs-hero-video-updated", onUpdate);
      if (blobUrlRef.current) {
        URL.revokeObjectURL(blobUrlRef.current);
      }
    };
  }, []);

  useEffect(() => {
    const v = videoRef.current;
    if (!v || !src) return;
    v.load();
    v.play().catch(() => {});
  }, [src]);

  return (
    <div className="absolute inset-0 -z-[1] overflow-hidden">
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse at 50% 0%, rgba(110,0,255,0.3), transparent 55%), linear-gradient(180deg, #1a0033 0%, #050505 70%)",
        }}
      />
      <AnimatePresence mode="wait">
        {src && !error && (
          <motion.div
            key={src}
            initial={{ opacity: 0 }}
            animate={{ opacity: ready ? 1 : 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1.6, ease: "easeOut" }}
            className="absolute inset-0"
          >
            <video
              ref={videoRef}
              src={src}
              autoPlay
              muted
              loop
              playsInline
              preload={isMobile ? "metadata" : "auto"}
              onLoadedData={() => setReady(true)}
              onError={() => setError(true)}
              className="absolute inset-0 h-full w-full object-cover opacity-25 scale-[1.02]"
              style={{ filter: "blur(2px)" }}
            />
          </motion.div>
        )}
      </AnimatePresence>
      <div className="absolute inset-0 bg-gradient-to-b from-cs-purple/20 via-cs-black/70 to-cs-black" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_50%_50%,transparent_40%,rgba(5,5,5,0.6)_100%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_70%_20%,rgba(231,255,0,0.05),transparent_50%)]" />
      <div className="absolute inset-0 backdrop-blur-[1px]" />
    </div>
  );
}
