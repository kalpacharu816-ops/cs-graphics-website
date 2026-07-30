"use client";

import { useRef } from "react";
import Link from "next/link";
import { motion, useMotionValue, useSpring } from "framer-motion";
import { cn } from "@/lib/utils";

const MotionLink = motion.create(Link);

export function MagneticButton({
  children,
  href,
  className,
}: {
  children: React.ReactNode;
  href: string;
  className?: string;
}) {
  const ref = useRef<HTMLAnchorElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const springX = useSpring(x, { stiffness: 300, damping: 20 });
  const springY = useSpring(y, { stiffness: 300, damping: 20 });
  const isInternal = href.startsWith("/") && !href.startsWith("//");
  const classNames = cn(
    "btn-premium glass relative inline-flex items-center gap-2 overflow-hidden rounded-full px-8 py-4 text-sm uppercase tracking-[0.2em] text-cs-silver",
    className
  );
  const handleMouseMove = (e: React.MouseEvent<HTMLAnchorElement>) => {
    const rect = ref.current?.getBoundingClientRect();
    if (!rect) return;
    x.set((e.clientX - rect.left - rect.width / 2) * 0.22);
    y.set((e.clientY - rect.top - rect.height / 2) * 0.22);
  };
  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };
  const content = (
    <>
      <span className="btn-premium-shine pointer-events-none absolute inset-0" aria-hidden />
      <span className="relative z-[1]">{children}</span>
    </>
  );

  if (isInternal) {
    return (
      <MotionLink
        ref={ref}
        href={href}
        scroll={false}
        data-magnetic
        style={{ x: springX, y: springY }}
        className={classNames}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.97 }}
      >
        {content}
      </MotionLink>
    );
  }

  return (
    <motion.a
      ref={ref}
      href={href}
      data-magnetic
      style={{ x: springX, y: springY }}
      className={classNames}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.97 }}
    >
      {content}
    </motion.a>
  );
}
