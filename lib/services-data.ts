export type ServiceSlug =
  | "youtube-thumbnails"
  | "social-media-ads"
  | "streaming-cover-arts"
  | "album-covers"
  | "posters"
  | "banners"
  | "handbills"
  | "others";

export type GalleryImage = {
  id: string;
  alt: string;
  /** Aspect ratio hint for masonry (tall | wide | square) */
  aspect: "tall" | "wide" | "square";
  gradient: string;
  /** Optional image path under /public */
  src?: string;
};

export type ServiceDetail = {
  slug: ServiceSlug;
  title: string;
  shortTitle: string;
  description: string;
  longDescription: string;
  icon: string;
  heroEyebrow: string;
  gallery: GalleryImage[];
};

const gradients = {
  violet: "from-violet-600/50 via-purple-900/70 to-black",
  indigo: "from-indigo-500/40 via-cs-purple/80 to-black",
  fuchsia: "from-fuchsia-600/35 via-violet-900/75 to-black",
  blue: "from-blue-600/25 via-cs-purple/90 to-black",
  neon: "from-cs-violet/45 via-purple-950/85 to-black",
  pink: "from-pink-600/30 via-violet-800/70 to-black",
};

function gallerySet(prefix: string): GalleryImage[] {
  const aspects: GalleryImage["aspect"][] = [
    "wide",
    "tall",
    "square",
    "tall",
    "wide",
    "square",
    "tall",
    "wide",
  ];
  const keys = Object.keys(gradients) as (keyof typeof gradients)[];
  return aspects.map((aspect, i) => ({
    id: `${prefix}-${i + 1}`,
    alt: `${prefix} design ${i + 1}`,
    aspect,
    gradient: gradients[keys[i % keys.length]],
  }));
}

export const SERVICE_DETAILS: Record<ServiceSlug, ServiceDetail> = {
  "youtube-thumbnails": {
    slug: "youtube-thumbnails",
    title: "YouTube Thumbnails",
    shortTitle: "Thumbnails",
    description: "Scroll-stopping visuals engineered for clicks and watch time.",
    longDescription:
      "High-CTR thumbnail systems built for YouTube's browse and suggested feeds. Every frame is composed for clarity at small sizes, emotional hook at first glance, and brand consistency across your channel.",
    icon: "▶",
    heroEyebrow: "YouTube · CTR Focused",
    gallery: gallerySet("thumb"),
  },
  "social-media-ads": {
    slug: "social-media-ads",
    title: "Social Media Ads",
    shortTitle: "Social Ads",
    description: "High-converting ad creatives built for every platform.",
    longDescription:
      "Platform-native ad creatives for Meta, TikTok, and beyond — optimized for thumb-stopping impact, clear value proposition, and conversion-focused hierarchy.",
    icon: "◆",
    heroEyebrow: "Ads · Conversion Design",
    gallery: gallerySet("ads"),
  },
  "streaming-cover-arts": {
    slug: "streaming-cover-arts",
    title: "Streaming Cover Arts",
    shortTitle: "Stream Art",
    description: "Bold stream branding that dominates the browse page.",
    longDescription:
      "Twitch, Kick, and YouTube Live cover art that reads instantly in dark UIs. Cohesive stream identity from offline screens to live panels.",
    icon: "◎",
    heroEyebrow: "Streaming · Live Identity",
    gallery: gallerySet("stream"),
  },
  "album-covers": {
    slug: "album-covers",
    title: "Album Covers",
    shortTitle: "Album Art",
    description: "Cinematic artwork that defines your sound identity.",
    longDescription:
      "Release-ready album and single artwork with cinematic depth, typographic precision, and streaming-platform compliance for Spotify, Apple Music, and physical print.",
    icon: "♫",
    heroEyebrow: "Music · Visual Identity",
    gallery: gallerySet("album"),
  },
  posters: {
    slug: "posters",
    title: "Posters",
    shortTitle: "Posters",
    description: "Print-ready posters with premium typographic hierarchy.",
    longDescription:
      "Event, film, and promotional posters designed for large-format impact — balanced composition, readable hierarchy, and print-ready color workflows.",
    icon: "▣",
    heroEyebrow: "Print · Event Visuals",
    gallery: gallerySet("poster"),
  },
  banners: {
    slug: "banners",
    title: "Banners",
    shortTitle: "Banners",
    description: "Web & channel banners with pixel-perfect composition.",
    longDescription:
      "YouTube channel art, website hero banners, and digital billboards crafted for every breakpoint — safe zones respected, brand story amplified.",
    icon: "▭",
    heroEyebrow: "Digital · Channel Branding",
    gallery: gallerySet("banner"),
  },
  handbills: {
    slug: "handbills",
    title: "Handbills",
    shortTitle: "Handbills",
    description: "Event handbills designed to cut through the noise.",
    longDescription:
      "Compact, high-impact handbills for events, launches, and street marketing — clear messaging, bold visuals, and cost-effective print layouts.",
    icon: "◈",
    heroEyebrow: "Print · Street Marketing",
    gallery: gallerySet("handbill"),
  },
  others: {
    slug: "others",
    title: "Others",
    shortTitle: "Custom",
    description: "Custom creative solutions tailored to your unique vision.",
    longDescription:
      "Logo systems, brand kits, pitch decks, merch mockups, and bespoke visual projects — tell us your goal and we'll architect the right design solution.",
    icon: "✦",
    heroEyebrow: "Custom · Bespoke Creative",
    gallery: gallerySet("custom"),
  },
};

export const SERVICE_SLUGS = Object.keys(SERVICE_DETAILS) as ServiceSlug[];

export function getServiceBySlug(slug: string): ServiceDetail | undefined {
  return SERVICE_DETAILS[slug as ServiceSlug];
}
