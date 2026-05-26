import { CMS_KEYS } from "./keys";

export type SiteSettingsCms = {
  companyProfilePdf: string;
};

const DEFAULT: SiteSettingsCms = {
  companyProfilePdf: "/content/company-profile.pdf",
};

function read(): SiteSettingsCms {
  if (typeof window === "undefined") return DEFAULT;
  try {
    const raw = localStorage.getItem(CMS_KEYS.siteSettings);
    return raw ? { ...DEFAULT, ...(JSON.parse(raw) as SiteSettingsCms) } : DEFAULT;
  } catch {
    return DEFAULT;
  }
}

function write(settings: SiteSettingsCms): void {
  if (typeof window === "undefined") return;
  localStorage.setItem(CMS_KEYS.siteSettings, JSON.stringify(settings));
}

export function getSiteSettings(): SiteSettingsCms {
  return read();
}

export function setSiteSettings(settings: SiteSettingsCms): void {
  write(settings);
}

export function getCompanyProfileUrl(): string {
  return read().companyProfilePdf;
}

export function setCompanyProfilePdf(path: string): void {
  write({ ...read(), companyProfilePdf: path });
}
