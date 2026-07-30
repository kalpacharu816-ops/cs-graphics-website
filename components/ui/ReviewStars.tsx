"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

export function ReviewStars({
  rating,
  className,
}: {
  rating: number;
  className?: string;
}) {
  return (
    <div className={cn("flex gap-0.5", className)} aria-label={`${rating} out of 5 stars`}>
      {[1, 2, 3, 4, 5].map((n) => (
        <motion.span
          key={n}
          initial={{ opacity: 0, scale: 0.6 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ delay: n * 0.06, duration: 0.35 }}
          className={cn(
            "text-base sm:text-lg",
            n <= rating ? "text-cs-gold drop-shadow-[0_0_8px_rgba(231,201,74,0.5)]" : "text-cs-silver/15"
          )}
        >
          ★
        </motion.span>
      ))}
    </div>
  );
}
