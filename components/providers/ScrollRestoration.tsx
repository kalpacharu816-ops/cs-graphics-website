"use client";

import { useEffect } from "react";
import { getLenis } from "./SmoothScroll";

export function ScrollRestoration() {
  useEffect(() => {
    const hash = window.location.hash;

    function forceScrollTop() {
      window.scrollTo(0, 0);
      document.documentElement.scrollTop = 0;
      document.body.scrollTop = 0;
      const lenis = getLenis();
      if (lenis) lenis.scrollTo(0, { immediate: true });
    }

    // Always scroll to top first, regardless of hash
    forceScrollTop();
    requestAnimationFrame(forceScrollTop);
    setTimeout(forceScrollTop, 50);
    setTimeout(forceScrollTop, 150);

    // Clean the hash from the URL so a subsequent refresh
    // doesn't restore a stale section anchor
    if (hash && hash !== "#") {
      history.replaceState(null, "", window.location.pathname);
    }
  }, []);

  return null;
}

// Set as early as possible — before React hydration
if (typeof window !== "undefined" && "scrollRestoration" in history) {
  history.scrollRestoration = "manual";
}
