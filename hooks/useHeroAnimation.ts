"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";

const HERO_ANIM_KEY = "cs-hero-animated-session";

export function useHeroAnimation(
  headlineRef: React.RefObject<HTMLElement | null>,
  subRef: React.RefObject<HTMLElement | null>
) {
  const ran = useRef(false);

  useEffect(() => {
    if (ran.current) return;
    ran.current = true;

    const words = headlineRef.current?.querySelectorAll(".word");
    const sub = subRef.current;
    if (!words?.length) return;

    const alreadyAnimated =
      typeof window !== "undefined" &&
      sessionStorage.getItem(HERO_ANIM_KEY) === "1";

    if (alreadyAnimated) {
      gsap.set(words, { opacity: 1, y: 0, filter: "blur(0px)" });
      if (sub) gsap.set(sub, { opacity: 1, y: 0, filter: "blur(0px)" });
      return;
    }

    gsap.set(words, { opacity: 0, y: 80, filter: "blur(16px)" });
    if (sub) gsap.set(sub, { opacity: 0, y: 30, filter: "blur(8px)" });

    const tl = gsap.timeline({
      defaults: { ease: "power4.out" },
      onComplete: () => {
        sessionStorage.setItem(HERO_ANIM_KEY, "1");
        gsap.set(words, { clearProps: "all" });
        if (sub) gsap.set(sub, { clearProps: "all" });
      },
    });

    tl.to(words, {
      y: 0,
      opacity: 1,
      filter: "blur(0px)",
      stagger: 0.08,
      duration: 1,
      delay: 0.15,
    });

    if (sub) {
      tl.to(
        sub,
        {
          y: 0,
          opacity: 1,
          filter: "blur(0px)",
          duration: 0.9,
        },
        "-=0.5"
      );
    }

    return () => {
      tl.kill();
    };
  }, [headlineRef, subRef]);
}
