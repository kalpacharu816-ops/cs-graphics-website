"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

export function SectionReveal({
  children,
  className,
  delay = 0,
  parallax = false,
}: {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  parallax?: boolean;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: parallax ? 24 : 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-5%" }}
      transition={{
        duration: 0.55,
        delay,
        ease: [0.22, 1, 0.36, 1],
      }}
      className={cn("will-gpu section-flow", className)}
    >
      {children}
    </motion.div>
  );
}
