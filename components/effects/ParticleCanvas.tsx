"use client";

import { useRef, useMemo, useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { Canvas, useFrame } from "@react-three/fiber";
import { Points, PointMaterial } from "@react-three/drei";
import type { Points as PointsType } from "three";

const PARTICLE_CONFIGS = {
  low: { count: 120, dpr: 0.6, opacity: 0.2, size: 0.014 },
  medium: { count: 280, dpr: 0.9, opacity: 0.28, size: 0.015 },
  high: { count: 560, dpr: 1.2, opacity: 0.35, size: 0.016 },
};

function ParticleField({ count, size, opacity }: { count: number; size: number; opacity: number }) {
  const ref = useRef<PointsType>(null);

  const positions = useMemo(() => {
    const arr = new Float32Array(count * 3);
    for (let i = 0; i < count * 3; i++) {
      arr[i] = (Math.random() - 0.5) * 14;
    }
    return arr;
  }, [count]);

  useFrame((state) => {
    if (!ref.current) return;
    ref.current.rotation.y = state.clock.elapsedTime * 0.02;
    ref.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.1) * 0.05;
  });

  return (
    <Points ref={ref}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
      </bufferGeometry>
      <PointMaterial
        transparent
        color="#6E00FF"
        size={size}
        sizeAttenuation
        depthWrite={false}
        opacity={opacity}
      />
    </Points>
  );
}

export function ParticleCanvas() {
  const pathname = usePathname();
  const [tier, setTier] = useState<"low" | "medium" | "high" | null>(null);

  useEffect(() => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced) { setTier(null); return; }
    const mobile = window.matchMedia("(max-width: 768px)").matches;
    const mem = (navigator as any).deviceMemory;
    const cores = navigator.hardwareConcurrency;
    if (mobile || mem !== undefined && mem <= 4 || cores !== undefined && cores <= 4) setTier("low");
    else if (mem !== undefined && mem <= 8 || cores !== undefined && cores <= 6) setTier("medium");
    else setTier("high");
  }, []);

  if (pathname === "/" || !tier) return null;

  const cfg = PARTICLE_CONFIGS[tier];

  return (
    <div className="particle-canvas pointer-events-none fixed inset-0 -z-10 opacity-40 md:opacity-50">
      <Canvas camera={{ position: [0, 0, 5], fov: 60 }} dpr={[1, cfg.dpr]}>
        <ParticleField count={cfg.count} size={cfg.size} opacity={cfg.opacity} />
      </Canvas>
    </div>
  );
}
