"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { HiX } from "react-icons/hi";
import { getPortfolio } from "@/lib/cms/store";
import { PORTFOLIO } from "@/lib/constants";
import type { PortfolioItem } from "@/lib/cms/types";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { MotionBlur } from "@/components/ui/MotionBlur";
import { cn } from "@/lib/utils";

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.08 },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 28, filter: "blur(10px)" },
  visible: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] as const },
  },
};

export function PortfolioScroll() {
  const [items, setItems] = useState<PortfolioItem[]>(() =>
    PORTFOLIO.map((p, i) => ({
      id: `port-${i}`,
      title: p.title,
      category: p.category,
      gradient: p.gradient,
    }))
  );
  const [preview, setPreview] = useState<number | null>(null);

  useEffect(() => {
    setItems(getPortfolio());
  }, []);

  const displayItems: PortfolioItem[] =
    items.length > 0
      ? items
      : PORTFOLIO.map((p, i) => ({
          id: `port-${i}`,
          title: p.title,
          category: p.category,
          gradient: p.gradient,
        }));

  const row1 = displayItems.slice(0, 2);
  const row2 = displayItems.slice(2, 5);

  return (
    <section id="work" className="section-padding py-20 md:py-28 overflow-hidden">
      <MotionBlur>
        <SectionHeading
          eyebrow="Portfolio"
          title="Selected work"
          subtitle="Click any piece to view in fullscreen — cinematic detail at every scale."
          align="center"
        />
      </MotionBlur>

      <motion.div
        className="mx-auto mt-12 max-w-6xl flex flex-col gap-4 sm:gap-5"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5">
          {row1.map((item, i) => (
            <PortfolioCard
              key={item.id}
              item={item}
              index={i}
              onOpen={() => setPreview(i)}
            />
          ))}
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-5">
          {row2.map((item, i) => (
            <PortfolioCard
              key={item.id}
              item={item}
              index={i + 2}
              onOpen={() => setPreview(i + 2)}
            />
          ))}
        </div>
      </motion.div>

      <AnimatePresence>
        {preview !== null && displayItems[preview] && (
          <motion.div
            role="dialog"
            aria-modal
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-[200] flex items-center justify-center p-3 sm:p-6 md:p-8"
          >
            <button
              type="button"
              className="absolute inset-0 bg-cs-black/92 backdrop-blur-sm"
              aria-label="Close"
              onClick={() => setPreview(null)}
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.94, filter: "blur(14px)" }}
              animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
              exit={{ opacity: 0, scale: 0.96 }}
              transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
              className="relative z-10 w-full max-w-5xl glass-premium rounded-3xl overflow-hidden stroke-purple shadow-[0_0_80px_rgba(110,0,255,0.2)]"
            >
              <div className="relative aspect-video min-h-[220px] sm:min-h-[300px] w-full bg-cs-black">
                {displayItems[preview].image ? (
                  <Image
                    src={displayItems[preview].image!}
                    alt={displayItems[preview].title}
                    fill
                    className="object-contain"
                    sizes="100vw"
                    priority
                  />
                ) : (
                  <div
                    className={cn(
                      "absolute inset-0 bg-gradient-to-br",
                      displayItems[preview].gradient
                    )}
                  />
                )}
              </div>
              <div className="p-5 sm:p-6 border-t border-cs-violet/20">
                <p className="text-[10px] uppercase tracking-[0.3em] text-cs-violet">
                  {displayItems[preview].category}
                </p>
                <h3
                  className="mt-1.5 text-xl sm:text-2xl font-bold text-cs-silver"
                  style={{ fontFamily: "var(--font-display)" }}
                >
                  {displayItems[preview].title}
                </h3>
              </div>
              <button
                type="button"
                onClick={() => setPreview(null)}
                className="absolute top-3 right-3 sm:top-4 sm:right-4 flex h-9 w-9 sm:h-10 sm:w-10 items-center justify-center rounded-full glass-premium stroke-yellow hover:shadow-[0_0_24px_rgba(231,255,0,0.25)] transition-shadow"
                aria-label="Close"
              >
                <HiX className="h-4 w-4 sm:h-5 sm:w-5" />
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}

function PortfolioCard({
  item,
  index,
  onOpen,
}: {
  item: PortfolioItem;
  index: number;
  onOpen: () => void;
}) {
  return (
    <motion.div variants={cardVariants} className="will-gpu">
      <button
        type="button"
        onClick={onOpen}
        className="portfolio-mini-card group relative block w-full overflow-hidden rounded-2xl text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-cs-violet cursor-pointer"
      >
        <div className="relative aspect-[4/3] w-full overflow-hidden rounded-2xl">
          {item.image ? (
            <Image
              src={item.image}
              alt={item.title}
              fill
              className="object-cover transition-all duration-700 ease-out group-hover:scale-105"
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
              loading="lazy"
            />
          ) : (
            <div
              className={cn(
                "absolute inset-0 bg-gradient-to-br transition-all duration-700 ease-out group-hover:scale-105",
                item.gradient
              )}
            />
          )}
          <div className="absolute inset-0 bg-gradient-to-t from-cs-black/85 via-cs-black/20 to-transparent" />
          <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-[radial-gradient(ellipse_at_50%_80%,rgba(110,0,255,0.3),transparent_65%)]" />
          <div className="absolute inset-0 border border-transparent group-hover:border-cs-violet/40 rounded-2xl transition-colors duration-500" />
          <div className="absolute bottom-0 left-0 right-0 p-4 sm:p-5">
            <p className="text-[9px] uppercase tracking-[0.3em] text-cs-neon/80 group-hover:text-cs-neon transition-colors">
              {item.category}
            </p>
            <h3
              className="mt-1.5 text-sm sm:text-base md:text-lg font-bold text-cs-silver group-hover:drop-shadow-[0_0_12px_rgba(217,217,217,0.2)] transition-all"
              style={{ fontFamily: "var(--font-display)" }}
            >
              {item.title}
            </h3>
          </div>
        </div>
      </button>
    </motion.div>
  );
}
