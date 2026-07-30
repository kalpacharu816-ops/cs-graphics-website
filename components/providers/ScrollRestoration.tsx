"use client";

import { useEffect, useRef } from "react";
import { usePathname } from "next/navigation";

const positions = new Map<string, number>();
const SCROLL_OFFSET = -112;
const STORAGE_PREFIX = "cs-scroll:";

function currentKey() {
  return `${window.location.pathname}${window.location.search}`;
}

function currentScrollTop() {
  return window.scrollY || document.documentElement.scrollTop || document.body.scrollTop || 0;
}

function saveCurrentPosition() {
  const key = currentKey();
  const top = currentScrollTop();
  positions.set(key, top);
  try {
    sessionStorage.setItem(`${STORAGE_PREFIX}${key}`, String(top));
  } catch {
    // Session storage can be unavailable in private contexts.
  }
}

function getSavedPosition(key: string) {
  const memory = positions.get(key);
  if (memory !== undefined) return memory;

  try {
    const stored = sessionStorage.getItem(`${STORAGE_PREFIX}${key}`);
    return stored === null ? undefined : Number(stored);
  } catch {
    return undefined;
  }
}

function scrollToPosition(top: number) {
  if (window.csScrollTo) {
    window.csScrollTo(top, { immediate: true, offset: 0 });
    return;
  }

  window.scrollTo({ top, behavior: "instant" as ScrollBehavior });
}

function scrollToHash(hash: string) {
  const id = decodeURIComponent(hash.slice(1));
  const target = document.getElementById(id);
  if (!target) return false;

  if (window.csScrollTo) {
    window.csScrollTo(target, { immediate: true, offset: SCROLL_OFFSET });
  } else {
    target.scrollIntoView({ behavior: "instant" as ScrollBehavior, block: "start" });
  }
  return true;
}

export function ScrollRestoration() {
  const pathname = usePathname();
  const previousKey = useRef<string | null>(null);
  const isPopNavigation = useRef(false);
  const isLinkNavigation = useRef(false);

  useEffect(() => {
    if ("scrollRestoration" in history) {
      history.scrollRestoration = "manual";
    }

    const onPopState = () => {
      saveCurrentPosition();
      isPopNavigation.current = true;
    };

    const onLinkClick = (event: MouseEvent) => {
      if (
        event.defaultPrevented ||
        event.button !== 0 ||
        event.metaKey ||
        event.ctrlKey ||
        event.shiftKey ||
        event.altKey
      ) {
        return;
      }

      const target = event.target instanceof Element
        ? event.target.closest<HTMLAnchorElement>("a[href]")
        : null;
      if (!target) return;

      const url = new URL(target.href, window.location.href);
      if (url.origin !== window.location.origin) return;

      saveCurrentPosition();
      isLinkNavigation.current = true;
    };

    let ticking = false;
    const onScroll = () => {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(() => {
        saveCurrentPosition();
        ticking = false;
      });
    };

    window.addEventListener("click", onLinkClick, { capture: true });
    window.addEventListener("popstate", onPopState);
    window.addEventListener("scroll", onScroll, { passive: true });

    return () => {
      window.removeEventListener("click", onLinkClick, { capture: true });
      window.removeEventListener("popstate", onPopState);
      window.removeEventListener("scroll", onScroll);
      if ("scrollRestoration" in history) {
        history.scrollRestoration = "auto";
      }
    };
  }, []);

  useEffect(() => {
    const key = currentKey();
    previousKey.current = key;

    const hash = window.location.hash;
    if (hash) {
      requestAnimationFrame(() => requestAnimationFrame(() => scrollToHash(hash)));
      isPopNavigation.current = false;
      isLinkNavigation.current = false;
      return;
    }

    const saved = getSavedPosition(key);
    if (isPopNavigation.current || (!isLinkNavigation.current && saved !== undefined)) {
      requestAnimationFrame(() => scrollToPosition(saved ?? 0));
      isPopNavigation.current = false;
      isLinkNavigation.current = false;
      return;
    }

    requestAnimationFrame(() => scrollToPosition(0));
    isLinkNavigation.current = false;
  }, [pathname]);

  useEffect(() => {
    const onPageHide = () => {
      saveCurrentPosition();
    };

    const onHashChange = () => {
      const hash = window.location.hash;
      if (hash) {
        requestAnimationFrame(() => scrollToHash(hash));
      }
    };

    window.addEventListener("pagehide", onPageHide);
    window.addEventListener("hashchange", onHashChange);

    return () => {
      window.removeEventListener("pagehide", onPageHide);
      window.removeEventListener("hashchange", onHashChange);
    };
  }, []);

  return null;
}
