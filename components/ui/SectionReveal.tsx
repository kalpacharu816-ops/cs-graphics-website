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
      initial={{ opacity: 0, y: parallax ? 24 : 20, filter: "blur(6px)" }}
      whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
      viewport={{ once: true, margin: "-5%" }}
      transition={{
        duration: 0.65,
        delay,
        ease: [0.16, 1, 0.3, 1],
      }}
      className={cn("will-gpu section-flow", className)}
    >
      {children}
    </motion.div>
  );
}
