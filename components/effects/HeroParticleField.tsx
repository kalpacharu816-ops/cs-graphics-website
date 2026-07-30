"use client";

import { useRef, useMemo, useEffect, useState } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Points, PointMaterial } from "@react-three/drei";
import * as THREE from "three";
import type { Points as PointsType } from "three";

function ParticleWave({ count }: { count: number }) {
  const ref = useRef<PointsType>(null);
  const mouse = useRef({ x: 0, y: 0 });

  const { positions, basePositions } = useMemo(() => {
    const pos = new Float32Array(count * 3);
    const base = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      const x = (Math.random() - 0.5) * 22;
      const y = (Math.random() - 0.5) * 14;
      const z = (Math.random() - 0.5) * 8;
      base[i * 3] = x;
      base[i * 3 + 1] = y;
      base[i * 3 + 2] = z;
      pos[i * 3] = x;
      pos[i * 3 + 1] = y;
      pos[i * 3 + 2] = z;
    }
    return { positions: pos, basePositions: base };
  }, [count]);

  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      mouse.current.x = (e.clientX / window.innerWidth - 0.5) * 2;
      mouse.current.y = -(e.clientY / window.innerHeight - 0.5) * 2;
    };
    window.addEventListener("mousemove", onMove, { passive: true });
    return () => window.removeEventListener("mousemove", onMove);
  }, []);

  useFrame((state) => {
    if (!ref.current) return;
    const t = state.clock.elapsedTime;
    const geo = ref.current.geometry as THREE.BufferGeometry;
    const attr = geo.attributes.position as THREE.BufferAttribute;
    const arr = attr.array as Float32Array;

    for (let i = 0; i < count; i++) {
      const bx = basePositions[i * 3];
      const by = basePositions[i * 3 + 1];
      const bz = basePositions[i * 3 + 2];
      const wave =
        Math.sin(bx * 0.35 + t * 0.6) * 0.35 +
        Math.cos(by * 0.4 + t * 0.5) * 0.25;
      arr[i * 3] = bx + wave + mouse.current.x * 0.4 * (bz * 0.1 + 1);
      arr[i * 3 + 1] =
        by + Math.sin(t * 0.4 + i * 0.02) * 0.2 + mouse.current.y * 0.3;
      arr[i * 3 + 2] = bz + Math.sin(t * 0.3 + bx) * 0.15;
    }
    attr.needsUpdate = true;
    ref.current.rotation.y = t * 0.015;
  });

  return (
    <Points ref={ref} frustumCulled={false}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
      </bufferGeometry>
      <PointMaterial
        transparent
        color="#e8e8f0"
        size={0.026}
        sizeAttenuation
        depthWrite={false}
        opacity={0.5}
        blending={THREE.AdditiveBlending}
      />
    </Points>
  );
}

export function HeroParticleField() {
  const [mounted, setMounted] = useState(false);
  const [particleCount, setParticleCount] = useState(0);

  useEffect(() => {
    setMounted(true);
    const mobile = window.matchMedia("(max-width: 768px)").matches;
    const lowEnd = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (lowEnd) setParticleCount(0);
    else if (mobile) setParticleCount(280);
    else setParticleCount(720);
  }, []);

  const dpr =
    typeof window !== "undefined"
      ? Math.min(window.devicePixelRatio, 1.35)
      : 1;

  if (!mounted) {
    return (
      <div
        className="absolute inset-0 -z-10 bg-gradient-to-b from-[#12002b] via-[#080012] to-[#050505]"
        aria-hidden
      />
    );
  }

  return (
    <div className="hero-particles absolute inset-0 -z-10 overflow-hidden" aria-hidden>
      <div className="absolute inset-0 bg-gradient-to-b from-[#12002b] via-[#0a0018] to-[#050505]" />
      {particleCount > 0 && (
        <Canvas
          dpr={[1, dpr]}
          camera={{ position: [0, 0, 10], fov: 55 }}
          gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}
          style={{ position: "absolute", inset: 0 }}
        >
          <ParticleWave count={particleCount} />
        </Canvas>
      )}
      <div className="absolute inset-0 bg-gradient-to-b from-cs-black/20 via-cs-black/55 to-cs-black pointer-events-none" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(110,0,255,0.12),transparent_65%)] pointer-events-none" />
    </div>
  );
}
