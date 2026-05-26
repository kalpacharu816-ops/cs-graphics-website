"use client";

import dynamic from "next/dynamic";
import { SmoothScroll } from "./SmoothScroll";
import { ScrollRestoration } from "./ScrollRestoration";
import { CmsHydrator } from "./CmsHydrator";

const CustomCursor = dynamic(
  () => import("@/components/effects/CustomCursor").then((m) => m.CustomCursor),
  { ssr: false }
);

const ParticleCanvas = dynamic(
  () =>
    import("@/components/effects/ParticleCanvas").then((m) => m.ParticleCanvas),
  { ssr: false }
);

export function AppProviders({ children }: { children: React.ReactNode }) {
  return (
    <SmoothScroll>
      <CmsHydrator />
      <ScrollRestoration />
      <ParticleCanvas />
      <CustomCursor />
      {children}
    </SmoothScroll>
  );
}
