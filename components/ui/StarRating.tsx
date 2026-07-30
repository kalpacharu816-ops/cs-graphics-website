"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

export function StarRating({
  value,
  onChange,
  size = "lg",
}: {
  value: number;
  onChange: (n: number) => void;
  size?: "md" | "lg";
}) {
  const [hover, setHover] = useState(0);
  const display = hover || value;
  const sizeClass = size === "lg" ? "text-2xl sm:text-3xl gap-2" : "text-xl gap-1.5";

  return (
    <div
      className={cn("flex items-center", sizeClass)}
      role="group"
      aria-label="Star rating"
      onMouseLeave={() => setHover(0)}
    >
      {[1, 2, 3, 4, 5].map((n) => (
        <motion.button
          key={n}
          type="button"
          onClick={() => onChange(n)}
          onMouseEnter={() => setHover(n)}
          aria-label={`${n} star${n > 1 ? "s" : ""}`}
          className={cn(
            "star-btn rounded-lg px-0.5 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-cs-violet",
            n <= display ? "text-cs-gold" : "text-cs-silver/20"
          )}
          whileHover={{ scale: 1.2, rotate: -6 }}
          whileTap={{ scale: 0.9 }}
        >
          ★
        </motion.button>
      ))}
    </div>
  );
}
