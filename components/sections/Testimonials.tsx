"use client";

import { useEffect, useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { TESTIMONIALS } from "@/lib/constants";
import { getApprovedReviews, type ClientReview } from "@/lib/reviews";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { SectionReveal } from "@/components/ui/SectionReveal";
import { PremiumCard } from "@/components/ui/PremiumCard";
import { ReviewStars } from "@/components/ui/ReviewStars";
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
          title="What clients say"
          subtitle="Real feedback from creators and brands we've partnered with."
          align="center"
        />

        <div className="grid gap-5 sm:gap-6 md:grid-cols-2 lg:grid-cols-3">
          <AnimatePresence mode="popLayout">
            {visible.map((t) => (
              <PremiumCard
                key={t.id}
                as="blockquote"
                stroke="yellow"
                glass
                className="review-card-glass p-6 sm:p-8"
              >
                <motion.div
                  layout
                  initial={{ opacity: 0, scale: 0.96 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.96 }}
                  transition={{ duration: 0.45 }}
                >
                  <ReviewStars rating={t.rating} />
                  <p
                    className={cn(
                      "mt-6 text-cs-silver/90 leading-relaxed text-[15px] sm:text-base",
                      t.lang === "si" && "sinhala-text"
                    )}
                    lang={t.lang === "si" ? "si" : undefined}
                  >
                    &ldquo;{t.quote}&rdquo;
                  </p>
                  <footer className="mt-6">
                    <cite
                      className={cn(
                        "not-italic font-semibold text-cs-silver",
                        t.lang === "si" && "sinhala-text"
                      )}
                    >
                      {t.name}
                    </cite>
                    <p
                      className={cn(
                        "text-sm text-cs-silver/50",
                        t.lang === "si" && "sinhala-text"
                      )}
                    >
                      {t.role}
                    </p>
                  </footer>
                </motion.div>
              </PremiumCard>
            ))}
          </AnimatePresence>
        </div>

        {hasMore && (
          <motion.div
            layout
            className="mt-12 flex justify-center"
          >
            <GlassButton
              variant="outline"
              onClick={() => setExpanded(!expanded)}
            >
              {expanded ? "Show Less" : "See More"}
            </GlassButton>
          </motion.div>
        )}
      </section>
    </SectionReveal>
  );
}
