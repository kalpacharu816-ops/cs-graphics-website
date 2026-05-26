"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { BRAND } from "@/lib/constants";

export function LoaderGate({ children }: { children: React.ReactNode }) {
  const [done, setDone] = useState(false);
  const [showContent, setShowContent] = useState(false);
  const overlayRef = useRef<HTMLDivElement>(null);
  const logoRef = useRef<HTMLHeadingElement>(null);
  const shineRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const skipped =
      typeof window !== "undefined" &&
      sessionStorage.getItem("cs-loader-done") === "1";

    if (skipped) {
      setDone(true);
      setShowContent(true);
      return;
    }

    const tl = gsap.timeline({
      defaults: { ease: "power4.inOut" },
      onComplete: () => {
        sessionStorage.setItem("cs-loader-done", "1");
        setDone(true);
        setTimeout(() => setShowContent(true), 100);
      },
    });

    tl.from(logoRef.current, {
      scale: 0.5,
      opacity: 0,
      filter: "blur(24px)",
      duration: 1.2,
    })
      .fromTo(
        shineRef.current,
        { x: "-120%" },
        { x: "120%", duration: 0.9 },
        "-=0.5"
      )
      .to(overlayRef.current, {
        opacity: 0,
        duration: 0.7,
        delay: 0.4,
      });
  }, []);

  return (
    <>
      {!done && (
        <div
          ref={overlayRef}
          className="fixed inset-0 z-[200] flex flex-col items-center justify-center bg-cs-black"
        >
          <div className="relative overflow-hidden">
            <h1
              ref={logoRef}
              className="text-metallic text-4xl md:text-6xl font-bold tracking-tight"
              style={{ fontFamily: "var(--font-display)" }}
            >
              {BRAND}
            </h1>
            <span
              ref={shineRef}
              className="pointer-events-none absolute inset-0 -skew-x-12 bg-gradient-to-r from-transparent via-white/40 to-transparent block"
            />
          </div>
          <p className="mt-6 text-xs uppercase tracking-[0.4em] text-cs-silver/40">
            Crafting visuals
          </p>
        </div>
      )}
      <div
        className={
          showContent || done
            ? "opacity-100 transition-opacity duration-500"
            : "opacity-0"
        }
      >
        {children}
      </div>
    </>
  );
}
