"use client";

import { MotionBlur } from "./MotionBlur";
import { cn } from "@/lib/utils";

export function SectionHeading({
  eyebrow,
  title,
  subtitle,
  align = "left",
}: {
  eyebrow: string;
  title: string;
  subtitle?: string;
  align?: "left" | "center";
}) {
  return (
    <MotionBlur
      className={cn(
        "mb-14 max-w-2xl",
        align === "center" && "mx-auto text-center"
      )}
    >
      <p className="mb-3 text-xs uppercase tracking-[0.35em] text-cs-violet font-medium">
        {eyebrow}
      </p>
      <h2
        className="font-[family-name:var(--font-display)] text-4xl md:text-5xl lg:text-6xl font-semibold tracking-tight text-cs-silver"
        style={{ fontFamily: "var(--font-display)" }}
      >
        {title}
      </h2>
      {subtitle && (
        <p className="mt-4 text-base md:text-lg text-cs-silver/60 leading-relaxed">
          {subtitle}
        </p>
      )}
    </MotionBlur>
  );
}
