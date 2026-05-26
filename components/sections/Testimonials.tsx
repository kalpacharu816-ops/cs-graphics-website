"use client";

import { useEffect, useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { TESTIMONIALS } from "@/lib/constants";
import { getApprovedReviews, type ClientReview } from "@/lib/reviews";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { SectionReveal } from "@/components/ui/SectionReveal";
import { PremiumCard } from "@/components/ui/PremiumCard";
import { GlassButton } from "@/components/ui/GlassButton";
import { cn } from "@/lib/utils";

type DisplayReview = {
  id: string;
  name: string;
  role: string;
  quote: string;
  rating: number;
  lang?: "en" | "si";
};

const INITIAL_COUNT = 3;

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.08 },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 28, scale: 0.96, filter: "blur(8px)" },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    filter: "blur(0px)",
    transition: { duration: 0.55, ease: [0.16, 1, 0.3, 1] as const },
  },
};

function GlowingStars({ rating, className }: { rating: number; className?: string }) {
  return (
    <div className={cn("flex gap-0.5", className)} aria-label={`${rating} out of 5 stars`}>
      {[1, 2, 3, 4, 5].map((n) => (
        <motion.span
          key={n}
          initial={{ opacity: 0, scale: 0.4, rotate: -15 }}
          whileInView={{ opacity: 1, scale: 1, rotate: 0 }}
          viewport={{ once: true }}
          transition={{ delay: n * 0.05, duration: 0.35, ease: "backOut" }}
          className={cn(
            "text-base sm:text-lg inline-block transition-all duration-300",
            n <= rating
              ? "text-cs-gold drop-shadow-[0_0_6px_rgba(231,201,74,0.4)] hover:drop-shadow-[0_0_14px_rgba(231,201,74,0.7)] hover:scale-110"
              : "text-cs-silver/15"
          )}
        >
          ★
        </motion.span>
      ))}
    </div>
  );
}

export function Testimonials() {
  const [dynamic, setDynamic] = useState<ClientReview[]>([]);
  const [expanded, setExpanded] = useState(false);

  const refresh = useCallback(() => {
    setDynamic(getApprovedReviews());
  }, []);

  useEffect(() => {
    refresh();
  }, [refresh]);

  const staticReviews: DisplayReview[] = TESTIMONIALS.map((t, i) => ({
    id: `static-${i}`,
    name: t.name,
    role: t.role,
    quote: t.quote,
    rating: t.rating,
    lang: "lang" in t ? (t.lang as "en" | "si") : undefined,
  }));

  const userReviews: DisplayReview[] = dynamic.map((r) => ({
    id: r.id,
    name: r.name,
    role: r.role,
    quote: r.quote,
    rating: r.rating,
    lang: r.lang,
  }));

  const all = [...userReviews, ...staticReviews];
  const visible = expanded ? all : all.slice(0, INITIAL_COUNT);
  const hasMore = all.length > INITIAL_COUNT;

  return (
    <SectionReveal>
      <section id="reviews" className="section-padding py-24 md:py-36">
        <SectionHeading
          eyebrow="Reviews"
          title="Real voices, real results"
          subtitle="Feedback from creators and brands who trust CS Graphics."
          align="center"
        />

        <motion.div
          className="grid gap-5 sm:gap-6 md:grid-cols-2 lg:grid-cols-3"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-40px" }}
        >
          <AnimatePresence mode="popLayout">
            {visible.map((t, i) => (
              <motion.div
                key={t.id}
                variants={cardVariants}
                layout
                initial="hidden"
                animate="visible"
                exit={{ opacity: 0, scale: 0.94, filter: "blur(8px)", transition: { duration: 0.3 } }}
                transition={{ duration: 0.5, delay: expanded ? (i - INITIAL_COUNT) * 0.04 : 0 }}
              >
                <PremiumCard
                  as="blockquote"
                  stroke="yellow"
                  glass
                  className="review-card-glass p-6 sm:p-8 h-full"
                >
                  <GlowingStars rating={t.rating} />
                  <p
                    className={cn(
                      "mt-5 sm:mt-6 text-cs-silver/90 leading-relaxed text-[15px] sm:text-base",
                      t.lang === "si" && "sinhala-text"
                    )}
                    lang={t.lang === "si" ? "si" : undefined}
                  >
                    &ldquo;{t.quote}&rdquo;
                  </p>
                  <footer className="mt-5 sm:mt-6 pt-4 sm:pt-5 border-t border-cs-violet/15">
                    <cite
                      className={cn(
                        "not-italic font-semibold text-cs-silver text-sm sm:text-base",
                        t.lang === "si" && "sinhala-text"
                      )}
                    >
                      {t.name}
                    </cite>
                    <p
                      className={cn(
                        "text-xs sm:text-sm text-cs-silver/45 mt-0.5 tracking-wide",
                        t.lang === "si" && "sinhala-text"
                      )}
                    >
                      {t.role}
                    </p>
                  </footer>
                </PremiumCard>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

        {hasMore && (
          <motion.div
            layout
            className="mt-12 sm:mt-14 flex justify-center"
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3, duration: 0.5 }}
          >
            <GlassButton
              variant="outline"
              onClick={() => setExpanded(!expanded)}
            >
              {expanded ? "Show Less" : `See More Reviews (${all.length - INITIAL_COUNT})`}
            </GlassButton>
          </motion.div>
        )}
      </section>
    </SectionReveal>
  );
}
