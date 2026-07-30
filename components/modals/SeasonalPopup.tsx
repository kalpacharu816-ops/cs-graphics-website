"use client";

import { useEffect, useState, useCallback } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { HiX } from "react-icons/hi";
import { seasonalPopupConfig } from "@/lib/seasonal-popup.config";
import { getPopupConfig, type PopupCms } from "@/lib/cms/store";
import { cn } from "@/lib/utils";

export function SeasonalPopup() {
  const [open, setOpen] = useState(false);
  const [popup, setPopup] = useState<PopupCms>(() => ({
    ...seasonalPopupConfig,
    cta: { ...seasonalPopupConfig.cta },
  }));

  const close = useCallback(() => setOpen(false), []);

  useEffect(() => {
    setPopup(getPopupConfig());
  }, []);

  useEffect(() => {
    if (!popup.enabled) return;

    const timer = setTimeout(() => setOpen(true), popup.showDelayMs);

    let autoTimer: ReturnType<typeof setTimeout> | undefined;
    if (popup.autoCloseMs > 0) {
      autoTimer = setTimeout(
        close,
        popup.showDelayMs + popup.autoCloseMs
      );
    }

    return () => {
      clearTimeout(timer);
      if (autoTimer) clearTimeout(autoTimer);
    };
  }, [close, popup]);

  const typeLabel = {
    seasonal: "Seasonal",
    offer: "Special Offer",
    announcement: "Announcement",
    event: "Event",
  }[popup.type];
  const ctaIsInternal =
    popup.cta.href.startsWith("/") && !popup.cta.href.startsWith("//");

  return (
    <AnimatePresence>
      {open && (
        <>
          <motion.div
            key="backdrop"
            initial={{ opacity: 0, backdropFilter: "blur(0px)" }}
            animate={{ opacity: 1, backdropFilter: "blur(12px)" }}
            exit={{ opacity: 0, backdropFilter: "blur(0px)" }}
            transition={{ duration: 0.45 }}
            className="fixed inset-0 z-[150] bg-black/65"
            onClick={close}
            aria-hidden
          />
          <motion.div
            key="modal"
            role="dialog"
            aria-modal
            aria-labelledby="seasonal-popup-title"
            initial={{ opacity: 0, scale: 0.88, y: 24, filter: "blur(20px)" }}
            animate={{ opacity: 1, scale: 1, y: 0, filter: "blur(0px)" }}
            exit={{
              opacity: 0,
              scale: 0.92,
              y: 16,
              filter: "blur(16px)",
              transition: {
                duration: popup.exitDurationMs / 1000,
                ease: [0.16, 1, 0.3, 1],
              },
            }}
            transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
            className="fixed left-1/2 top-1/2 z-[151] w-[min(92vw,440px)] -translate-x-1/2 -translate-y-1/2"
            style={{ transform: "translate(-50%, -50%) translateZ(0)" }}
          >
            <motion.div
              className={cn(
                "glass relative overflow-hidden rounded-3xl p-8 md:p-10 text-center",
                "border border-white/10 shadow-[0_24px_80px_rgba(110,0,255,0.2)]"
              )}
              layout
            >
              <motion.div
                className="pointer-events-none absolute -inset-px rounded-3xl bg-gradient-to-br from-cs-violet/20 via-transparent to-transparent opacity-60"
                animate={{ opacity: [0.4, 0.7, 0.4] }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
              />

              <button
                type="button"
                onClick={close}
                aria-label="Close popup"
                className="absolute right-4 top-4 z-10 flex h-9 w-9 items-center justify-center rounded-full glass text-cs-silver/70 hover:text-cs-silver hover:glow-violet transition-all"
              >
                <HiX className="h-4 w-4" />
              </button>

              {popup.image ? (
                <motion.div
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="relative mx-auto mb-6 h-36 w-full max-w-[280px] overflow-hidden rounded-2xl"
                >
                  <Image
                    src={popup.image}
                    alt=""
                    fill
                    className="object-cover"
                  />
                </motion.div>
              ) : null}

              <div className="relative z-[1]">
                <div className="flex items-center justify-center gap-2 mb-3">
                  <p className="text-xs uppercase tracking-[0.3em] text-cs-neon">
                    {typeLabel}
                  </p>
                  {popup.badge ? (
                    <span className="rounded-full bg-cs-violet/30 px-2 py-0.5 text-[10px] uppercase tracking-wider text-cs-silver">
                      {popup.badge}
                    </span>
                  ) : null}
                </div>

                <h3
                  id="seasonal-popup-title"
                  className="text-2xl md:text-3xl font-bold text-cs-silver"
                  style={{ fontFamily: "var(--font-display)" }}
                >
                  {popup.title}
                </h3>

                <p className="mt-2 text-xs uppercase tracking-[0.2em] text-cs-violet/80">
                  {popup.eyebrow}
                </p>

                <p className="mt-4 text-sm text-cs-silver/60 leading-relaxed">
                  {popup.description}
                </p>

                <motion.div
                  className="mt-7 flex flex-col gap-3"
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.25 }}
                >
                  {ctaIsInternal ? (
                    <Link
                      href={popup.cta.href}
                      scroll={false}
                      onClick={close}
                      className="rounded-full bg-cs-violet px-6 py-3.5 text-sm font-medium text-white hover:glow-violet transition-shadow"
                    >
                      {popup.cta.label}
                    </Link>
                  ) : (
                    <a
                      href={popup.cta.href}
                      onClick={close}
                      className="rounded-full bg-cs-violet px-6 py-3.5 text-sm font-medium text-white hover:glow-violet transition-shadow"
                    >
                      {popup.cta.label}
                    </a>
                  )}
                  <button
                    type="button"
                    onClick={close}
                    className="text-xs text-cs-silver/40 hover:text-cs-silver transition-colors py-1"
                  >
                    {popup.secondaryLabel}
                  </button>
                </motion.div>
              </div>
            </motion.div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
