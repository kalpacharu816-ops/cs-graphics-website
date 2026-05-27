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
  image: "image" in p ? (p as { image: string }).image : undefined,
}));

function readLocal<T>(key: string): T | null {
  if (typeof window === "undefined") return null;
  try {
    const raw = localStorage.getItem(key);
    if (!raw) return null;
    return JSON.parse(raw) as T;
  } catch {
    return null;
  }
}

function writeLocal<T>(key: string, value: T): void {
  if (typeof window === "undefined") return;
  localStorage.setItem(key, JSON.stringify(value));
}

const CMS_TYPE_MAP: Record<string, string> = {
  [CMS_KEYS.hero]: "hero",
  [CMS_KEYS.offers]: "offers",
  [CMS_KEYS.popup]: "popup",
  [CMS_KEYS.collaborators]: "collaborators",
  [CMS_KEYS.payments]: "payments",
  [CMS_KEYS.gallery]: "gallery",
  [CMS_KEYS.socials]: "socials",
  [CMS_KEYS.portfolio]: "portfolio",
  [CMS_KEYS.services]: "services",
};

async function writeToApi(type: string, data: unknown): Promise<void> {
  try {
    await fetch("/api/admin/cms", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ type, data }),
    });
  } catch {
  }
}

const ENV_CMS_MAP: Record<string, string> = {};
for (const [ls, api] of Object.entries(CMS_TYPE_MAP)) {
  ENV_CMS_MAP[ls] = api;
}

export async function syncAllFromApi(): Promise<void> {
  try {
    const res = await fetch("/api/admin/cms");
    if (!res.ok) return;
    const data: Record<string, unknown> = await res.json();
    const revMap: Record<string, string> = {};
    for (const [ls, api] of Object.entries(CMS_TYPE_MAP)) {
      revMap[api] = ls;
    }
    for (const [apiKey, value] of Object.entries(data)) {
      const lsKey = revMap[apiKey];
      if (lsKey && value !== null) {
        writeLocal(lsKey, value);
      }
    }
  } catch {
  }
}

export async function syncCmsType(localKey: string): Promise<void> {
  const type = CMS_TYPE_MAP[localKey];
  if (!type) return;
  try {
    const res = await fetch(`/api/admin/cms?type=${type}`);
    if (!res.ok) return;
    const result: { type: string; data: unknown } = await res.json();
    if (result.data !== null) {
      writeLocal(localKey, result.data);
    }
  } catch {
  }
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
  return readLocal<HeroConfig>(CMS_KEYS.hero) ?? { ...HERO_CONFIG, titleWords: [...HERO_CONFIG.titleWords] };
}

export function setHeroConfig(config: HeroConfig): void {
  writeLocal(CMS_KEYS.hero, config);
  writeToApi("hero", config);
}

export function getOfferMessages(): string[] {
  return readLocal<OffersCms>(CMS_KEYS.offers) ?? [...OFFER_MESSAGES];
}

export function setOfferMessages(messages: string[]): void {
  writeLocal(CMS_KEYS.offers, messages);
  writeToApi("offers", messages);
}

export function getPopupConfig(): PopupCms {
  const stored = readLocal<PopupCms>(CMS_KEYS.popup);
  const base: PopupCms = {
    ...seasonalPopupConfig,
    cta: { ...seasonalPopupConfig.cta },
  };
  return stored ? { ...base, ...stored, cta: { ...base.cta, ...stored.cta } } : base;
}

export function setPopupConfig(config: PopupCms): void {
  writeLocal(CMS_KEYS.popup, config);
  writeToApi("popup", config);
}

export function getCollaborators(): Collaborator[] {
  return readLocal<Collaborator[]>(CMS_KEYS.collaborators) ?? COLLABORATORS;
}

export function setCollaborators(list: Collaborator[]): void {
  writeLocal(CMS_KEYS.collaborators, list);
  writeToApi("collaborators", list);
}

export function getPaymentConfig(): Record<PaymentSlug, PaymentMethodConfig> {
  const stored = readLocal<Partial<Record<PaymentSlug, PaymentMethodConfig>>>(CMS_KEYS.payments);
  if (!stored) return PAYMENT_METHODS_CONFIG;
  return { ...PAYMENT_METHODS_CONFIG, ...stored };
}

export function setPaymentConfig(slug: PaymentSlug, config: PaymentMethodConfig): void {
  const current = getPaymentConfig();
  writeLocal(CMS_KEYS.payments, { ...current, [slug]: config });
  writeToApi("payments", { ...current, [slug]: config });
}

export function getGalleryOverride(slug: string): GalleryImage[] | null {
  const all = readLocal<Record<string, GalleryImage[]>>(CMS_KEYS.gallery);
  return all?.[slug] ?? null;
}

export function setGalleryOverride(slug: string, images: GalleryImage[]): void {
  const all = readLocal<Record<string, GalleryImage[]>>(CMS_KEYS.gallery) ?? {};
  writeLocal(CMS_KEYS.gallery, { ...all, [slug]: images });
  writeToApi("gallery", { ...all, [slug]: images });
}

export function getAllGalleryOverrides(): Record<string, GalleryImage[]> {
  return readLocal<Record<string, GalleryImage[]>>(CMS_KEYS.gallery) ?? {};
}

// ─── Social links ───
export function getSocialLinks(): SocialLink[] {
  return readLocal<SocialLink[]>(CMS_KEYS.socials) ?? DEFAULT_SOCIALS;
}

export function setSocialLinks(links: SocialLink[]): void {
  writeLocal(CMS_KEYS.socials, links);
  writeToApi("socials", links);
}

// ─── Portfolio ───
export function getPortfolio(): PortfolioItem[] {
  return readLocal<PortfolioItem[]>(CMS_KEYS.portfolio) ?? DEFAULT_PORTFOLIO;
}

export function setPortfolio(items: PortfolioItem[]): void {
  writeLocal(CMS_KEYS.portfolio, items);
  writeToApi("portfolio", items);
}

// ─── Service detail overrides ───
export function getServiceOverrides(): Partial<Record<ServiceSlug, ServiceDetailCms>> {
  return readLocal<Partial<Record<ServiceSlug, ServiceDetailCms>>>(CMS_KEYS.services) ?? {};
}

export function setServiceOverride(slug: ServiceSlug, data: ServiceDetailCms): void {
  const all = getServiceOverrides();
  writeLocal(CMS_KEYS.services, { ...all, [slug]: data });
  writeToApi("services", { ...all, [slug]: data });
}

export function getMergedService(slug: string): ServiceDetail | undefined {
  const base = SERVICE_DETAILS[slug as ServiceSlug];
  if (!base) return undefined;
  const override = getServiceOverrides()[slug as ServiceSlug];
  const galleryRaw = getGalleryOverride(slug);
  let gallery: GalleryImage[];
  if (galleryRaw) {
    gallery = galleryRaw.map((g, i) => ({
      ...g,
      src: g.src || base.gallery[i]?.src,
      gradient: g.gradient ?? "from-cs-violet/40 via-purple-950/80 to-black",
    }));
  } else {
    gallery = base.gallery;
  }
  if (!override) return { ...base, gallery };
  return {
    ...base,
    ...override,
    icon: base.icon,
    gallery,
  };
}
