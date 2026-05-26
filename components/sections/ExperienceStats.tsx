"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import { HiOutlineBriefcase, HiOutlineLightningBolt, HiOutlineUserGroup } from "react-icons/hi";
import { STATS } from "@/lib/constants";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { cn } from "@/lib/utils";

const ICONS = {
  experience: HiOutlineLightningBolt,
  projects: HiOutlineBriefcase,
  clients: HiOutlineUserGroup,
} as const;

function AnimatedCounter({
  value,
  suffix,
  active,
}: {
  value: number;
  suffix: string;
  active: boolean;
}) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!active) return;
    const duration = 2000;
    const start = performance.now();
    let frame: number;

    const tick = (now: number) => {
      const progress = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 4);
      setCount(Math.floor(eased * value));
      if (progress < 1) frame = requestAnimationFrame(tick);
    };

    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [active, value]);

  const display = value < 10 ? String(count).padStart(2, "0") : String(count);

  return (
    <span className="text-metallic text-5xl md:text-6xl font-bold tabular-nums tracking-tight">
      {display}
      {suffix}
    </span>
  );
}

export function ExperienceStats() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section id="stats" className="section-padding py-28 md:py-36">
      <SectionHeading
        eyebrow="Track Record"
        title="Numbers that speak"
        subtitle="Years of craft, hundreds of projects, and brands that trust the process."
        align="center"
      />

      <motion.div
        ref={ref}
        className="grid gap-6 sm:grid-cols-3 max-w-5xl mx-auto"
        initial="hidden"
        animate={inView ? "visible" : "hidden"}
        variants={{
          hidden: {},
          visible: { transition: { staggerChildren: 0.12 } },
        }}
      >
        {STATS.map((stat) => {
          const Icon = ICONS[stat.icon as keyof typeof ICONS];
          return (
            <motion.article
              key={stat.label}
              variants={{
                hidden: { opacity: 0, y: 36, filter: "blur(12px)" },
                visible: {
                  opacity: 1,
                  y: 0,
                  filter: "blur(0px)",
                  transition: { duration: 0.75, ease: [0.16, 1, 0.3, 1] },
                },
              }}
              className={cn(
                "glass rounded-3xl p-8 md:p-10 text-center",
                "hover:glow-violet transition-shadow duration-500"
              )}
              style={{ transform: "translateZ(0)" }}
            >
              <span className="inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-cs-violet/15 text-cs-violet glow-violet mb-6">
                <Icon className="h-6 w-6" />
              </span>
              <div
                className="font-semibold"
                style={{ fontFamily: "var(--font-display)" }}
              >
                <AnimatedCounter
                  value={stat.value}
                  suffix={stat.suffix}
                  active={inView}
                />
              </div>
              <p className="mt-3 text-sm uppercase tracking-[0.2em] text-cs-silver/50">
                {stat.label}
              </p>
            </motion.article>
          );
        })}
      </motion.div>
    </section>
  );
}
