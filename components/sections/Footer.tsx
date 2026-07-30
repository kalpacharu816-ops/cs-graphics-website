"use client";

import Link from "next/link";
import { BRAND, NAV_LINKS, SERVICES, CONTACT } from "@/lib/constants";
import { SocialIcons } from "@/components/ui/SocialIcons";

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="section-padding border-t border-white/5 py-12 md:py-16">
      <div className="grid gap-10 sm:gap-12 md:grid-cols-4">
        <div className="md:col-span-2">
          <p
            className="text-xl sm:text-2xl font-bold text-metallic"
            style={{ fontFamily: "var(--font-display)" }}
          >
            {BRAND}
          </p>
          <p className="mt-4 max-w-sm text-sm text-cs-silver/50 leading-relaxed">
            Premium visual design for creators, streamers, and brands. Based in
            Sri Lanka · Delivering worldwide.
          </p>
          <SocialIcons className="mt-6" />
        </div>

        <div>
          <p className="text-xs uppercase tracking-widest text-cs-violet mb-4">
            Navigate
          </p>
          <ul className="space-y-2">
            {NAV_LINKS.map((l) => (
              <li key={l.href}>
                <Link
                  href={l.href}
                  scroll={false}
                  className="text-sm text-cs-silver/60 hover:text-cs-neon transition-colors"
                >
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <p className="text-xs uppercase tracking-widest text-cs-violet mb-4">
            Services
          </p>
          <ul className="space-y-2">
            {SERVICES.slice(0, 5).map((s) => (
              <li key={s.slug}>
                <Link
                  href={`/services/${s.slug}`}
                  scroll={false}
                  className="text-sm text-cs-silver/50 hover:text-cs-silver transition-colors"
                >
                  {s.title}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="mt-10 sm:mt-12 flex flex-col gap-3 border-t border-white/5 pt-8 md:flex-row md:items-center md:justify-between">
        <p className="text-xs text-cs-silver/40">
          © {year} {BRAND}. All rights reserved.
        </p>
        <p className="text-xs text-cs-silver/30">{CONTACT.email}</p>
      </div>
    </footer>
  );
}
