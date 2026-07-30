export const HERO_CONFIG = {
  eyebrow: "Premium Creative Studio",
  titleWords: ["Premium", "Visuals", "That", "Convert."],
  subtitle:
    "CS Graphics crafts scroll-stopping thumbnails, stream packs, and brand visuals with cinematic precision.",
  tagline: "#Creative. Strong.",
} as const;

export type HeroConfig = {
  eyebrow: string;
  titleWords: string[];
  subtitle: string;
  tagline: string;
  /** Static video path under /public (e.g. /content/hero/hero.mp4) */
  videoUrl?: string;
};
