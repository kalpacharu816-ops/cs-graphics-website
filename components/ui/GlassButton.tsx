"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

type GlassButtonProps = {
  children: React.ReactNode;
  href?: string;
  onClick?: () => void;
  variant?: "primary" | "outline" | "neon";
  className?: string;
  type?: "button" | "submit" | "reset";
};

export function GlassButton({
  children,
  href,
  onClick,
  variant = "primary",
  className,
  type = "button",
}: GlassButtonProps) {
  const base = cn(
    "btn-premium relative inline-flex items-center justify-center gap-2 overflow-hidden rounded-full px-7 py-3.5 text-sm font-medium tracking-wide transition-shadow",
    variant === "primary" && "glass-premium stroke-purple text-cs-silver hover:glow-purple",
    variant === "outline" && "stroke-purple bg-transparent text-cs-silver hover:glow-purple",
    variant === "neon" && "stroke-yellow text-cs-neon hover:glow-yellow",
    className
  );

  const motionProps = {
    "data-magnetic": true,
    whileHover: { scale: 1.03 },
    whileTap: { scale: 0.97 },
    transition: { type: "spring" as const, stiffness: 350, damping: 22 },
  };

  if (href) {
    return (
      <motion.a href={href} className={base} {...motionProps}>
        {children}
      </motion.a>
    );
  }

  return (
    <motion.button type={type} onClick={onClick} className={base} {...motionProps}>
      {children}
    </motion.button>
  );
}
