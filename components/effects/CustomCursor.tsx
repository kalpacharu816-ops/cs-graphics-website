"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

type Particle = { x: number; y: number; life: number; size: number };

export function CustomCursor() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const particles = useRef<Particle[]>([]);
  const mouse = useRef({ x: 0, y: 0 });
  const [enabled, setEnabled] = useState(false);
  const [hovering, setHovering] = useState(false);

  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);
  const ringX = useSpring(cursorX, { stiffness: 250, damping: 24 });
  const ringY = useSpring(cursorY, { stiffness: 250, damping: 24 });
  const glowX = useSpring(cursorX, { stiffness: 120, damping: 30 });
  const glowY = useSpring(cursorY, { stiffness: 120, damping: 30 });

  useEffect(() => {
    const fine = window.matchMedia("(pointer: fine)").matches;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const mobile = window.matchMedia("(max-width: 768px)").matches;
    if (!fine || reduced || mobile) return;

    setEnabled(true);
    document.body.classList.add("custom-cursor");

    const onMove = (e: MouseEvent) => {
      mouse.current = { x: e.clientX, y: e.clientY };
      cursorX.set(e.clientX);
      cursorY.set(e.clientY);
      const p = particles.current;
      p.push({ x: e.clientX, y: e.clientY, life: 1, size: Math.random() * 2.5 + 1 });
      if (p.length > 20) p.splice(0, p.length - 20);
    };

    const onOver = (e: MouseEvent) => {
      const t = e.target as HTMLElement;
      setHovering(!!t.closest("a, button, [data-magnetic]"));
    };

    window.addEventListener("mousemove", onMove, { passive: true });
    window.addEventListener("mouseover", onOver, { passive: true });

    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    let raf: number;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener("resize", resize, { passive: true });

    const draw = () => {
      if (!ctx) return;
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      const p = particles.current;
      for (let i = p.length - 1; i >= 0; i--) {
        p[i].life -= 0.04;
        if (p[i].life <= 0) continue;
        ctx.beginPath();
        ctx.arc(p[i].x, p[i].y, p[i].size * p[i].life, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(110, 0, 255, ${p[i].life * 0.5})`;
        ctx.fill();
      }
      raf = requestAnimationFrame(draw);
    };
    draw();

    return () => {
      document.body.classList.remove("custom-cursor");
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mouseover", onOver);
      window.removeEventListener("resize", resize);
      cancelAnimationFrame(raf);
    };
  }, [cursorX, cursorY]);

  if (!enabled) return null;

  return (
    <>
      <canvas
        ref={canvasRef}
        className="pointer-events-none fixed inset-0 z-[9998]"
        aria-hidden
      />
      {/* Glow */}
      <motion.div
        className="pointer-events-none fixed top-0 left-0 -z-10"
        style={{ x: glowX, y: glowY }}
        aria-hidden
      >
        <div
          className="-translate-x-1/2 -translate-y-1/2 h-[320px] w-[320px] rounded-full"
          style={{
            background:
              "radial-gradient(circle, rgba(110,0,255,0.12) 0%, rgba(110,0,255,0.04) 40%, transparent 70%)",
          }}
        />
      </motion.div>
      {/* Dot */}
      <motion.div
        className="pointer-events-none fixed top-0 left-0 z-[9999] mix-blend-difference"
        style={{ x: cursorX, y: cursorY }}
      >
        <motion.div
          className="-translate-x-1/2 -translate-y-1/2 h-2 w-2 rounded-full bg-cs-neon"
          animate={{ scale: hovering ? 0.5 : 1 }}
          transition={{ duration: 0.15 }}
        />
      </motion.div>
      {/* Ring */}
      <motion.div
        className="pointer-events-none fixed top-0 left-0 z-[9998]"
        style={{ x: ringX, y: ringY }}
      >
        <motion.div
          className="-translate-x-1/2 -translate-y-1/2 rounded-full border border-cs-silver/50"
          animate={{
            width: hovering ? 56 : 36,
            height: hovering ? 56 : 36,
            borderColor: hovering
              ? "rgba(110, 0, 255, 0.8)"
              : "rgba(217, 217, 217, 0.4)",
          }}
          transition={{ type: "spring", stiffness: 250, damping: 20 }}
        />
      </motion.div>
    </>
  );
}
