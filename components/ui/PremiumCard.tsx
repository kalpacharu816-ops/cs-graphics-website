"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

const MotionLink = motion.create(Link);

type StrokeVariant = "yellow" | "purple";

type PremiumCardProps = {
  children: React.ReactNode;
  className?: string;
  href?: string;
  onClick?: () => void;
  as?: "div" | "article" | "blockquote";
  stroke?: StrokeVariant;
  glass?: boolean;
};

export function PremiumCard({
  children,
  className,
  href,
  onClick,
  as = "div",
  stroke = "purple",
  glass = false,
}: PremiumCardProps) {
  const classNames = cn(
    "premium-card group relative block overflow-hidden will-gpu rounded-3xl",
    glass ? "glass-premium" : "bg-cs-black/50",
    stroke === "yellow" ? "stroke-yellow" : "stroke-purple",
    className
  );

  const motionProps = {
    onClick,
    className: classNames,
    whileHover: { scale: 1.02, y: -6 },
    transition: { type: "spring" as const, stiffness: 320, damping: 26 },
  };

  const inner = <div className="relative z-[1]">{children}</div>;

  if (href) {
    const isInternal = href.startsWith("/") && !href.startsWith("//");
    if (isInternal) {
      return (
        <MotionLink href={href} scroll={false} {...motionProps}>
          {inner}
        </MotionLink>
      );
    }

    return (
      <motion.a href={href} {...motionProps}>
        {inner}
      </motion.a>
    );
  }

  if (as === "blockquote") {
    return <motion.blockquote {...motionProps}>{inner}</motion.blockquote>;
  }
  if (as === "article") {
    return <motion.article {...motionProps}>{inner}</motion.article>;
  }
  return <motion.div {...motionProps}>{inner}</motion.div>;
}
