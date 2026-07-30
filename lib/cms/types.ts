import type { ServiceSlug } from "@/lib/services-data";

export type SocialLink = {
  id: string;
  label: string;
  href: string;
  enabled: boolean;
};

export type PortfolioItem = {
  id: string;
  title: string;
  category: string;
  gradient: string;
  image?: string;
};

export type GalleryImageCms = {
  id: string;
  alt: string;
  aspect: "tall" | "wide" | "square";
  gradient?: string;
  src?: string;
};

export type ServiceDetailCms = {
  slug: ServiceSlug;
  title: string;
  shortTitle: string;
  description: string;
  longDescription: string;
  heroEyebrow: string;
};

export type ContactMessage = {
  id: string;
  name: string;
  email: string;
  message: string;
  createdAt: string;
  read: boolean;
};
