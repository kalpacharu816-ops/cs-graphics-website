"use client";

import { useRef, useMemo, useEffect, useState } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Points, PointMaterial } from "@react-three/drei";
import type { Points as PointsType } from "three";

function ParticleField({ count }: { count: number }) {
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
        size={0.016}
        sizeAttenuation
        depthWrite={false}
        opacity={0.35}
      />
    </Points>
  );
}

export function ParticleCanvas() {
  const [count, setCount] = useState(0);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const mobile = window.matchMedia("(max-width: 768px)").matches;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced) setCount(0);
    else if (mobile) setCount(350);
    else setCount(700);
  }, []);

  if (!mounted || count === 0) return null;

  const dpr =
    typeof window !== "undefined"
      ? Math.min(window.devicePixelRatio, 1.25)
      : 1;

  return (
    <div className="particle-canvas pointer-events-none fixed inset-0 -z-10 opacity-40 md:opacity-50">
      <Canvas camera={{ position: [0, 0, 5], fov: 60 }} dpr={[1, dpr]}>
        <ParticleField count={count} />
      </Canvas>
    </div>
  );
}
