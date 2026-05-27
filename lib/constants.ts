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
    title: "Lal Indian Restaurant",
    category: "Social Media Campaign",
    gradient: "from-violet-600/40 via-purple-900/60 to-black",
    image: "/portfolio/PortFolio.png",
  },
  {
    title: "Recent Stream Cover Arts",
    category: "Streaming Cover Arts",
    gradient: "from-indigo-500/30 via-cs-purple/80 to-black",
    image: "/portfolio/PortFolio2.png",
  },
  {
    title: "Music YouTube Thumbnails",
    category: "YouTube Thumbnails",
    gradient: "from-fuchsia-600/30 via-violet-900/70 to-black",
    image: "/portfolio/PortFolio3.png",
  },
  {
    title: "Recent Social Ads for Marketing Campaign",
    category: "Social Media Campaign",
    gradient: "from-cs-violet/40 via-purple-950/80 to-black",
    image: "/portfolio/PortFolio4.png",
  },
  {
    title: "Recent YouTube Thumbnails",
    category: "YouTube Thumbnails",
    gradient: "from-blue-600/20 via-cs-purple/90 to-black",
    image: "/portfolio/PortFolio5.png",
  },
] as const;

export const STATS = [
  { value: 4, suffix: "+", label: "Years+ Experience", icon: "experience" },
  { value: 735, suffix: "+", label: "Projects Done", icon: "projects" },
  { value: 90, suffix: "+", label: "Clients", icon: "clients" },
] as const;

export const TESTIMONIALS = [
  {
    name: "Chaminda Pathmasiri",
    role: "YouTuber",
    rating: 5,
    quote:
      "\u201CSupiri. Maram quality ekt ikmntm mge vde krl dunna. Channel ekk krn kenekt maram vtin ganakata vede krl denv, podi channel thyen krnekt unth vedk krgnd plwn thank, anika price ek podi unt vde quality ek \uD83D\uDC00, time ektm gnddth plwn, \uD83D\uDC00 recommend \uD83D\uDCAA\uD83D\uDD25\uD83D\uDC00\u201D",
    lang: "si" as const,
  },
  {
    name: "Naveen Kavishka",
    role: "YouTuber",
    rating: 5,
    quote:
      "\u201C\u0DB8\u0DBB\u0DD0 \u0DC3\u0DD4\u0DB4\u0DD2\u0DBB\u0DD2\u0DBA\u0DA7 \u0D89\u0D9A\u0DCA\u0DB8\u0DB1\u0DD2\u0DB1\u0DCA \u0D9A\u0DBB\u0DBD\u0DCF \u0DAF\u0DD4\u0DB1\u0DCA\u0DB1 \u0D85\u0DB4\u0DD2\u0DA7 \u0D94\u0DB1\u0DDA \u0DC0\u0DD2\u0DAF\u0DD2\u0DBA \u0D9A\u0DD2\u0DC0\u0DCA\u0DC0\u0DCF\u0DB8 \u0D91 \u0DC0\u0DD2\u0DAF\u0DD2\u0DBA\u0DA7 \u0D9A\u0DBB\u0DBD\u0DCF \u0DAF\u0DD9\u0DB1\u0DC0\u0DCF \u0DB8\u0DBB\u0DD0 \uD83E\uDD70 \u0D85\u0DBA\u0DD2\u0DA9\u0DD2\u0DBA\u0DCF \u0D91\u0D9A\u0D9A\u0DCA \u0DB1\u0DD0\u0DAD\u0DAD \u0DC0\u0DD2\u0DC3\u0DCA\u0DAD\u0DBB \u0DAF\u0DD4\u0DB1\u0DCA\u0DB1\u0DCF\u0DB8 \u0DC3\u0DD4\u0DB4\u0DD2\u0DBB\u0DD2\u0DBA\u0DA7 \u0D9A\u0DBB\u0DBD\u0DCF \u0DAF\u0DD9\u0DB1\u0DC0\u0DCF \u0DB6\u0DBA \u0DB1\u0DD0\u0DAD\u0DD4\u0DC0 \u0DC0\u0DD0\u0DA9\u0D9A\u0DCA \u0D9A\u0DBB\u0D9C\u0DB1\u0DCA\u0DB1\u201D",
    lang: "si" as const,
  },
  {
    name: "Ravindu Chamika Kaushalya",
    role: "YouTuber",
    rating: 5,
    quote:
      "\u201CHighly recommended! I have been working with him for quite a while now. From day one the service has been superb! Keep up the good work bro!\u201D",
  },
  {
    name: "Sandika Nuwan",
    role: "Tutor",
    rating: 5,
    quote:
      "\u201CThe designer was a rare gem, incredibly patient, and truly listened to my needs, turning my vision into a fantastic post that I absolutely love.\u201D",
  },
  {
    name: "Avishka Jayalath",
    role: "YouTuber",
    rating: 5,
    quote: "\u201CFriendly customer service, good luck \u2764\uFE0F\u201D",
  },
  {
    name: "Vihanga Kotadeniya",
    role: "Businessman",
    rating: 5,
    quote:
      "\u201CExperience tells us where you can get the best deal for the price you pay with confidence \uD83E\uDD1D\uD83E\uDEF6\u201D",
  },
  {
    name: "Avishka Fernandez",
    role: "YouTuber",
    rating: 5,
    quote:
      "\u201CProvide friendly and excellent service and delivered it in right time. Thank you so much and keep up the good work! \u2764\uFE0F\u201D",
  },
  {
    name: "Chamal Shanuka",
    role: "Singer",
    rating: 5,
    quote:
      "\u201CProvide friendly and excellent service and delivered it in right time. Thank you so much and keep up the good work! \u2764\uFE0F\u201D",
  },
  {
    name: "Asith Musick",
    role: "Singer",
    rating: 5,
    quote:
      "\u201CSupiri. Thank you \u0D9A\u0DD2\u0DBA\u0DB4\u0DD4 \u0DC0\u0DD9\u0DBD\u0DCF\u0DC0\u0DA7\u0DAD \u0D9A\u0DBD\u0DD2\u0DB1\u0DCA \u0DC3\u0DD4\u0DB4\u0DD2\u0DBB\u0DD2\u0DBA\u0DA7 \u0DC0\u0DD0\u0DA9\u0DDA \u0D89\u0DC0\u0DBB \u0D9A\u0DBB\u0DBD\u0DCF \u0DAF\u0DD4\u0DB1\u0DCA\u0DB1\u0DA7 \uD83E\uDD1D\uD83E\uDD1D\u201D",
    lang: "si" as const,
  },
  {
    name: "Thilina Nilaksha T Jay",
    role: "Singer",
    rating: 5,
    quote:
      "\u201C\u0DC0\u0DD0\u0DA9\u0DDA \u0DC4\u0DD2\u0DAD\u0DD4\u0DC0\u0DA7\u0DAD \u0DC0\u0DA9\u0DCF \u0D89\u0D9A\u0DCA\u0DB8\u0DB1\u0DD2\u0DB1\u0DCA \u0DC4\u0DDC\u0DB3\u0DB8 \u0DC0\u0DD2\u0DAF\u0DD2\u0DBA\u0DA7 \u0DBD\u0DD0\u0DB6\u0DD4\u0DAB\u0DCF. \u0DC4\u0DDC\u0DB3 output \u0D91\u0D9A\u0D9A\u0DCA \u0DAD\u0DD2\u0DBA\u0DD9\u0DB1\u0DC0\u0DCF \u0DC0\u0DD0\u0DA9 \u0DC0\u0DBD.\u201D",
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
  { label: "Work", href: "/#work" },
  { label: "Reviews", href: "/#reviews" },
  { label: "Contact", href: "/#contact" },
  { label: "Terms", href: "/terms-of-services" },
] as const;
