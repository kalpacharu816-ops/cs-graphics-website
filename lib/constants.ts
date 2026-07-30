import type { ServiceSlug } from "./services-data";
import type { PaymentSlug } from "./payment-methods.config";

export const BRAND = "CS Graphics";

export const OFFER_MESSAGES = [
  "Limited slots available — Book your design package this week",
  "Free revision on thumbnail bundles",
  "Premium stream packs · Seasonal offers",
] as const;

export const OFFER_TEXT = OFFER_MESSAGES.join("   ◆   ");

export const SERVICES: {
  title: string;
  description: string;
  icon: string;
  slug: ServiceSlug;
}[] = [
  {
    title: "YouTube Thumbnails",
    description: "Scroll-stopping visuals engineered for clicks and watch time.",
    icon: "▶",
    slug: "youtube-thumbnails",
  },
  {
    title: "Social Media Ads",
    description: "High-converting ad creatives built for every platform.",
    icon: "◆",
    slug: "social-media-ads",
  },
  {
    title: "Streaming Cover Arts",
    description: "Bold stream branding that dominates the browse page.",
    icon: "◎",
    slug: "streaming-cover-arts",
  },
  {
    title: "Album Covers",
    description: "Cinematic artwork that defines your sound identity.",
    icon: "♫",
    slug: "album-covers",
  },
  {
    title: "Posters",
    description: "Print-ready posters with premium typographic hierarchy.",
    icon: "▣",
    slug: "posters",
  },
  {
    title: "Banners",
    description: "Web & channel banners with pixel-perfect composition.",
    icon: "▭",
    slug: "banners",
  },
  {
    title: "Handbills",
    description: "Event handbills designed to cut through the noise.",
    icon: "◈",
    slug: "handbills",
  },
  {
    title: "Others",
    description: "Custom creative solutions tailored to your unique vision.",
    icon: "✦",
    slug: "others",
  },
];

export const PORTFOLIO = [
  {
    title: "Neon Drift Thumbnail",
    category: "YouTube",
    gradient: "from-violet-600/40 via-purple-900/60 to-black",
  },
  {
    title: "Midnight Stream Pack",
    category: "Streaming",
    gradient: "from-indigo-500/30 via-cs-purple/80 to-black",
  },
  {
    title: "Pulse Album Art",
    category: "Music",
    gradient: "from-fuchsia-600/30 via-violet-900/70 to-black",
  },
  {
    title: "Velocity Ad Campaign",
    category: "Social Ads",
    gradient: "from-cs-violet/40 via-purple-950/80 to-black",
  },
  {
    title: "Apex Event Poster",
    category: "Print",
    gradient: "from-blue-600/20 via-cs-purple/90 to-black",
  },
] as const;

export const STATS = [
  { value: 4, suffix: "+", label: "Years+ Experience", icon: "experience" },
  { value: 735, suffix: "+", label: "Projects Done", icon: "projects" },
  { value: 90, suffix: "+", label: "Clients", icon: "clients" },
] as const;

export const TESTIMONIALS = [
  {
    name: "Kasun Perera",
    role: "YouTuber · 120K subs",
    quote:
      "CS Graphics transformed my channel aesthetic. CTR jumped 34% after the new thumbnail system.",
    rating: 5,
  },
  {
    name: "Dilani Fernando",
    role: "Music Artist",
    quote:
      "The album cover felt cinematic and premium — exactly the vibe I wanted for my release.",
    rating: 5,
  },
  {
    name: "Ravindu Silva",
    role: "Twitch Streamer",
    quote:
      "Fast turnaround, insane quality. My stream branding finally looks as good as the content.",
    rating: 5,
  },
  {
    name: "නිශාන්ත පෙරේරා",
    role: "ව්‍යාපාරික",
    quote:
      "CS Graphics මගේ බ්‍රෑන්ඩ් එකට හරිම ප්‍රොෆෙෂනල් look එකක් දුන්නා. සිංහලෙන්ම communicate කරගන්න පුළුවන් වීම විශාල ප්ලස් එකක්.",
    rating: 5,
    lang: "si" as const,
  },
] as const;

export const PAYMENT_METHODS: { name: string; slug: PaymentSlug }[] = [
  { name: "Visa", slug: "visa" },
  { name: "Mastercard", slug: "mastercard" },
  { name: "PayHere", slug: "payhere" },
  { name: "PayPal", slug: "paypal" },
  { name: "Bank Transfer", slug: "bank-transfer" },
  { name: "Cash", slug: "cash" },
  { name: "Crypto", slug: "crypto" },
];

export const CONTACT = {
  whatsapp: "0729464525",
  whatsappUrl: "https://wa.me/94729464525",
  email: "csgraphicspvt@gmail.com",
} as const;

export const SOCIALS = [
  { label: "Instagram", href: "https://instagram.com" },
  { label: "Facebook", href: "https://facebook.com" },
  { label: "TikTok", href: "https://tiktok.com" },
  { label: "Behance", href: "https://behance.net" },
  { label: "Pinterest", href: "https://pinterest.com" },
] as const;

export const NAV_LINKS = [
  { label: "Services", href: "/#services" },
  { label: "About", href: "/#about" },
  { label: "Reviews", href: "/#reviews" },
  { label: "Contact", href: "/#contact" },
] as const;
