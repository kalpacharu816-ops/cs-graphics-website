"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { BRAND, NAV_LINKS } from "@/lib/constants";
import { SocialIcons } from "@/components/ui/SocialIcons";
import { cn } from "@/lib/utils";

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState<string>("");

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 24);
      const ids = NAV_LINKS.map((l) => l.href.replace("/#", "")).filter(Boolean);
      let current = "";
      for (const id of ids) {
        const el = document.getElementById(id);
        if (el && el.getBoundingClientRect().top <= 140) current = id;
      }
      setActive(current);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <header className="fixed top-9 sm:top-10 left-0 right-0 z-[80] section-padding pointer-events-none">
      <motion.nav
        layout
        className={cn(
          "pointer-events-auto mx-auto flex max-w-5xl items-center justify-between rounded-full px-4 sm:px-6 py-2.5 sm:py-3 liquid-glass-nav transition-shadow duration-500",
          scrolled && "shadow-[0_12px_48px_rgba(110,0,255,0.22)]"
        )}
      >
        <Link
          href="/"
          className="font-semibold tracking-tight text-cs-silver text-sm sm:text-base"
          style={{ fontFamily: "var(--font-display)" }}
        >
          {BRAND}
        </Link>

        <ul className="hidden items-center gap-1 md:flex">
          {NAV_LINKS.map((link) => {
            const id = link.href.replace("/#", "");
            const isActive = active === id;
            return (
              <li key={link.href}>
                <Link
                  href={link.href}
                  data-magnetic
                  className={cn(
                    "relative rounded-full px-4 py-2 text-sm transition-colors duration-300",
                    isActive
                      ? "text-cs-neon nav-link-active"
                      : "text-cs-silver/65 hover:text-cs-silver"
                  )}
                >
                  {link.label}
                  {isActive && (
                    <motion.span
                      layoutId="nav-pill"
                      className="absolute inset-0 rounded-full border border-cs-neon/40 bg-cs-violet/15 -z-10"
                      transition={{ type: "spring", stiffness: 380, damping: 30 }}
                    />
                  )}
                </Link>
              </li>
            );
          })}
        </ul>

        <div className="flex items-center gap-2 sm:gap-3">
          <Link
            href="/#contact"
            data-magnetic
            className="hidden sm:inline-flex rounded-full px-5 py-2 text-[10px] sm:text-xs uppercase tracking-widest text-cs-silver stroke-purple bg-cs-black/40 hover:glow-purple transition-shadow"
          >
            Start Project
          </Link>
          <button
            type="button"
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
            className="md:hidden glass-premium h-9 w-9 rounded-full text-cs-silver stroke-purple touch-manipulation"
            onClick={() => setOpen(!open)}
          >
            {open ? "✕" : "☰"}
          </button>
        </div>
      </motion.nav>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.25 }}
            className="pointer-events-auto mt-3 mx-auto max-w-5xl rounded-2xl glass-premium p-6 md:hidden max-h-[min(80vh,520px)] overflow-y-auto stroke-purple"
          >
            <ul className="flex flex-col gap-3">
              {NAV_LINKS.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    onClick={() => setOpen(false)}
                    className="text-lg text-cs-silver block py-1 touch-manipulation"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
            <SocialIcons className="mt-6 pt-6 border-t border-cs-violet/20" size="sm" />
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
