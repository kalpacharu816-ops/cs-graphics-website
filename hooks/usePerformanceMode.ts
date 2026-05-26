"use client";

import { useEffect, useState } from "react";

export type PerformanceTier = "low" | "medium" | "high";

function detectTier(): PerformanceTier {
  if (typeof window === "undefined") return "high";
  const mem = (navigator as any).deviceMemory;
  const cores = navigator.hardwareConcurrency;
  const isMobile = /Android|iPhone|iPad|iPod/i.test(navigator.userAgent);
  if (isMobile || mem !== undefined && mem <= 4 || cores !== undefined && cores <= 4) return "low";
  if (mem !== undefined && mem <= 8 || cores !== undefined && cores <= 6) return "medium";
  return "high";
}

export function usePerformanceMode() {
  const [tier, setTier] = useState<PerformanceTier>("high");
  useEffect(() => { setTier(detectTier()); }, []);
  return {
    tier,
    isMobile: tier === "low",
    particles: tier === "low" ? 120 : tier === "medium" ? 280 : 560,
    dpr: tier === "low" ? 0.6 : tier === "medium" ? 0.9 : 1.2,
    blur: tier === "low",
    reducedAnimations: tier !== "high",
  };
}
