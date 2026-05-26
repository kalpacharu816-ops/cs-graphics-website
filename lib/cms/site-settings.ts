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

async function writeApi(settings: SiteSettingsCms): Promise<void> {
  try {
    await fetch("/api/admin/cms", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ type: "siteSettings", data: settings }),
    });
  } catch {
  }
}

export async function syncSiteSettingsFromApi(): Promise<void> {
  try {
    const res = await fetch("/api/admin/cms?type=siteSettings");
    if (!res.ok) return;
    const result: { type: string; data: SiteSettingsCms } = await res.json();
    if (result.data) write(result.data);
  } catch {
  }
}

export function getSiteSettings(): SiteSettingsCms {
  return read();
}

export function setSiteSettings(settings: SiteSettingsCms): void {
  write(settings);
  writeApi(settings);
}

export function getCompanyProfileUrl(): string {
  return read().companyProfilePdf;
}

export function setCompanyProfilePdf(path: string): void {
  const settings = { ...read(), companyProfilePdf: path };
  write(settings);
  writeApi(settings);
}
