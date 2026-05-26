import { seasonalPopupConfig } from "@/lib/seasonal-popup.config";
import { OFFER_MESSAGES, SOCIALS, PORTFOLIO } from "@/lib/constants";
import { HERO_CONFIG, type HeroConfig } from "@/lib/hero.config";
import { COLLABORATORS, type Collaborator } from "@/lib/collaborators";
import { PAYMENT_METHODS_CONFIG, type PaymentMethodConfig, type PaymentSlug } from "@/lib/payment-methods.config";
import {
  SERVICE_DETAILS,
  type GalleryImage,
  type ServiceDetail,
  type ServiceSlug,
} from "@/lib/services-data";
import { CMS_KEYS } from "./keys";
import type { SocialLink, PortfolioItem, ServiceDetailCms, GalleryImageCms } from "./types";

export type { GalleryImageCms };

const DEFAULT_SOCIALS: SocialLink[] = [
  ...SOCIALS.map((s, i) => ({
    id: `social-${i}`,
    label: s.label,
    href: s.href,
    enabled: true,
  })),
  { id: "whatsapp", label: "WhatsApp", href: "https://wa.me/94729464525", enabled: true },
];

const DEFAULT_PORTFOLIO: PortfolioItem[] = PORTFOLIO.map((p, i) => ({
  id: `port-${i}`,
  title: p.title,
  category: p.category,
  gradient: p.gradient,
}));

function read<T>(key: string): T | null {
  if (typeof window === "undefined") return null;
  try {
    const raw = localStorage.getItem(key);
    if (!raw) return null;
    return JSON.parse(raw) as T;
  } catch {
    return null;
  }
}

function write<T>(key: string, value: T): void {
  if (typeof window === "undefined") return;
  localStorage.setItem(key, JSON.stringify(value));
}

export type PopupCms = {
  enabled: boolean;
  showDelayMs: number;
  autoCloseMs: number;
  exitDurationMs: number;
  type: "seasonal" | "offer" | "announcement" | "event";
  eyebrow: string;
  title: string;
  description: string;
  badge?: string;
  image?: string;
  cta: { label: string; href: string };
  secondaryLabel: string;
};
export type OffersCms = string[];

export function getHeroConfig(): HeroConfig {
  return read<HeroConfig>(CMS_KEYS.hero) ?? { ...HERO_CONFIG, titleWords: [...HERO_CONFIG.titleWords] };
}

export function setHeroConfig(config: HeroConfig): void {
  write(CMS_KEYS.hero, config);
}

export function getOfferMessages(): string[] {
  return read<OffersCms>(CMS_KEYS.offers) ?? [...OFFER_MESSAGES];
}

export function setOfferMessages(messages: string[]): void {
  write(CMS_KEYS.offers, messages);
}

export function getPopupConfig(): PopupCms {
  const stored = read<PopupCms>(CMS_KEYS.popup);
  const base: PopupCms = {
    ...seasonalPopupConfig,
    cta: { ...seasonalPopupConfig.cta },
  };
  return stored ? { ...base, ...stored, cta: { ...base.cta, ...stored.cta } } : base;
}

export function setPopupConfig(config: PopupCms): void {
  write(CMS_KEYS.popup, config);
}

export function getCollaborators(): Collaborator[] {
  return read<Collaborator[]>(CMS_KEYS.collaborators) ?? COLLABORATORS;
}

export function setCollaborators(list: Collaborator[]): void {
  write(CMS_KEYS.collaborators, list);
}

export function getPaymentConfig(): Record<PaymentSlug, PaymentMethodConfig> {
  const stored = read<Partial<Record<PaymentSlug, PaymentMethodConfig>>>(CMS_KEYS.payments);
  if (!stored) return PAYMENT_METHODS_CONFIG;
  return { ...PAYMENT_METHODS_CONFIG, ...stored };
}

export function setPaymentConfig(slug: PaymentSlug, config: PaymentMethodConfig): void {
  const current = getPaymentConfig();
  write(CMS_KEYS.payments, { ...current, [slug]: config });
}

export function getGalleryOverride(slug: string): GalleryImage[] | null {
  const all = read<Record<string, GalleryImage[]>>(CMS_KEYS.gallery);
  return all?.[slug] ?? null;
}

export function setGalleryOverride(slug: string, images: GalleryImage[]): void {
  const all = read<Record<string, GalleryImage[]>>(CMS_KEYS.gallery) ?? {};
  write(CMS_KEYS.gallery, { ...all, [slug]: images });
}

export function getAllGalleryOverrides(): Record<string, GalleryImage[]> {
  return read<Record<string, GalleryImage[]>>(CMS_KEYS.gallery) ?? {};
}

// ─── Social links ───
export function getSocialLinks(): SocialLink[] {
  return read<SocialLink[]>(CMS_KEYS.socials) ?? DEFAULT_SOCIALS;
}

export function setSocialLinks(links: SocialLink[]): void {
  write(CMS_KEYS.socials, links);
}

// ─── Portfolio ───
export function getPortfolio(): PortfolioItem[] {
  return read<PortfolioItem[]>(CMS_KEYS.portfolio) ?? DEFAULT_PORTFOLIO;
}

export function setPortfolio(items: PortfolioItem[]): void {
  write(CMS_KEYS.portfolio, items);
}

// ─── Service detail overrides ───
export function getServiceOverrides(): Partial<Record<ServiceSlug, ServiceDetailCms>> {
  return read<Partial<Record<ServiceSlug, ServiceDetailCms>>>(CMS_KEYS.services) ?? {};
}

export function setServiceOverride(slug: ServiceSlug, data: ServiceDetailCms): void {
  const all = getServiceOverrides();
  write(CMS_KEYS.services, { ...all, [slug]: data });
}

export function getMergedService(slug: string): ServiceDetail | undefined {
  const base = SERVICE_DETAILS[slug as ServiceSlug];
  if (!base) return undefined;
  const override = getServiceOverrides()[slug as ServiceSlug];
  const galleryRaw = getGalleryOverride(slug);
  const gallery = galleryRaw
    ? galleryRaw.map((g) => ({
        ...g,
        gradient: g.gradient ?? "from-cs-violet/40 via-purple-950/80 to-black",
      }))
    : base.gallery;
  if (!override) return { ...base, gallery };
  return {
    ...base,
    ...override,
    icon: base.icon,
    gallery,
  };
}
