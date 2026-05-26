"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import {
  FaBehance,
  FaFacebook,
  FaInstagram,
  FaPinterest,
  FaTiktok,
  FaWhatsapp,
} from "react-icons/fa";
import { CONTACT, SOCIALS } from "@/lib/constants";
import { getSocialLinks } from "@/lib/cms/store";
import { cn } from "@/lib/utils";

const ICON_MAP = {
  Behance: FaBehance,
  Pinterest: FaPinterest,
  Instagram: FaInstagram,
  Facebook: FaFacebook,
  TikTok: FaTiktok,
  WhatsApp: FaWhatsapp,
} as const;

const ORDER = [
  "WhatsApp",
  "Facebook",
  "TikTok",
  "Instagram",
  "Behance",
  "Pinterest",
] as const;

type SocialIconsProps = {
  className?: string;
  includeWhatsApp?: boolean;
  size?: "sm" | "md";
};

export function SocialIcons({
  className,
  includeWhatsApp = true,
  size = "md",
}: SocialIconsProps) {
  const iconSize = size === "sm" ? 18 : 22;
  const [links, setLinks] = useState<{ label: string; href: string }[]>(
    SOCIALS.map((s) => ({ label: s.label, href: s.href }))
  );

  useEffect(() => {
    const stored = getSocialLinks().filter((s) => s.enabled);
    if (stored.length) {
      setLinks(stored.map((s) => ({ label: s.label, href: s.href })));
    }
  }, []);

  const all = [
    ...links,
    ...(includeWhatsApp && !links.some((l) => l.label === "WhatsApp")
      ? [{ label: "WhatsApp", href: CONTACT.whatsappUrl }]
      : []),
  ];

  const sorted = [...all].sort(
    (a, b) =>
      ORDER.indexOf(a.label as (typeof ORDER)[number]) -
      ORDER.indexOf(b.label as (typeof ORDER)[number])
  );

  return (
    <ul className={cn("flex flex-wrap items-center gap-3 sm:gap-4", className)}>
      {sorted.map((s) => {
        const Icon = ICON_MAP[s.label as keyof typeof ICON_MAP];
        if (!Icon) return null;
        return (
          <li key={`${s.label}-${s.href}`}>
            <motion.a
              href={s.href}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={s.label}
              data-magnetic
              className="social-icon-glass flex h-11 w-11 sm:h-12 sm:w-12 items-center justify-center rounded-full text-cs-silver/75 hover:text-cs-neon will-gpu"
              whileHover={{ scale: 1.12, y: -3 }}
              whileTap={{ scale: 0.95 }}
            >
              <Icon size={iconSize} />
            </motion.a>
          </li>
        );
      })}
    </ul>
  );
}
