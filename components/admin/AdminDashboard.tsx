"use client";

import { useEffect, useState, useCallback, useRef } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import {
  getHeroConfig,
  setHeroConfig,
  getOfferMessages,
  setOfferMessages,
  getPopupConfig,
  setPopupConfig,
  getCollaborators,
  setCollaborators,
  getSocialLinks,
  setSocialLinks,
  getPortfolio,
  setPortfolio as persistPortfolio,
  getServiceOverrides,
  setServiceOverride,
  getGalleryOverride,
  setGalleryOverride,
  getPaymentConfig,
  setPaymentConfig,
  type PopupCms,
} from "@/lib/cms/store";
import {
  loadStoredReviews,
  approveReview,
  rejectReview,
  deleteReview,
  updateReview,
  toggleFeaturedReview,
  type ClientReview,
} from "@/lib/reviews";
import { loadInbox, markInboxRead, deleteInboxMessage } from "@/lib/contact-inbox";
import { PAYMENT_SLUGS, PAYMENT_METHODS_CONFIG, type PaymentSlug } from "@/lib/payment-methods.config";
import { HERO_CONFIG } from "@/lib/hero.config";
import { seasonalPopupConfig } from "@/lib/seasonal-popup.config";
import { OFFER_MESSAGES } from "@/lib/constants";
import { SERVICE_SLUGS, SERVICE_DETAILS, type ServiceSlug, type GalleryImage } from "@/lib/services-data";
import type { HeroConfig } from "@/lib/hero.config";
import type { Collaborator } from "@/lib/collaborators";
import type { SocialLink, PortfolioItem, ServiceDetailCms } from "@/lib/cms/types";
import type { ContactMessage } from "@/lib/cms/types";
import type { PaymentMethodConfig } from "@/lib/payment-methods.config";
import {
  saveHeroVideo,
  clearHeroVideo,
  hasHeroVideo,
} from "@/lib/hero-video-storage";
import {
  getSiteSettings,
  setCompanyProfilePdf,
} from "@/lib/cms/site-settings";

type MediaFile = {
  name: string;
  path: string;
  size: number;
  localPath?: string;
};

const TABS = [
  { id: "Reviews", label: "Reviews" },
  { id: "Inbox", label: "Inbox" },
  { id: "Hero", label: "Hero & Video" },
  { id: "Company", label: "Company PDF" },
  { id: "Socials", label: "Socials" },
  { id: "Portfolio", label: "Portfolio" },
  { id: "Services", label: "Services" },
  { id: "Gallery", label: "Gallery" },
  { id: "Collaborators", label: "Partners" },
  { id: "Offers", label: "Offers" },
  { id: "Popup", label: "Popup" },
  { id: "Payments", label: "Payments" },
] as const;

type Tab = (typeof TABS)[number]["id"];

function AdminInput(props: React.InputHTMLAttributes<HTMLInputElement>) {
  return (
    <input
      {...props}
      className={`form-input w-full rounded-xl border border-white/10 bg-white/5 px-4 py-2.5 text-cs-silver text-sm ${props.className ?? ""}`}
    />
  );
}

function AdminTextarea(props: React.TextareaHTMLAttributes<HTMLTextAreaElement>) {
  return (
    <textarea
      {...props}
      className={`form-input w-full rounded-xl border border-white/10 bg-white/5 px-4 py-2.5 text-cs-silver text-sm resize-y ${props.className ?? ""}`}
    />
  );
}

function SaveBtn({ onClick, label = "Save" }: { onClick: () => void; label?: string }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="btn-premium rounded-full bg-cs-violet px-6 py-2.5 text-sm text-white hover:glow-violet"
    >
      {label}
    </button>
  );
}

export function AdminDashboard() {
  const router = useRouter();
  const [tab, setTab] = useState<Tab>("Reviews");
  const [reviews, setReviews] = useState<ClientReview[]>([]);
  const [inbox, setInbox] = useState<ContactMessage[]>([]);
  const [hero, setHero] = useState<HeroConfig>({ ...HERO_CONFIG, titleWords: [...HERO_CONFIG.titleWords] });
  const [offers, setOffers] = useState<string[]>([...OFFER_MESSAGES]);
  const [popup, setPopup] = useState<PopupCms>(() => ({
    ...seasonalPopupConfig,
    cta: { ...seasonalPopupConfig.cta },
  }));
  const [collabs, setCollabs] = useState<Collaborator[]>([]);
  const [socials, setSocials] = useState<SocialLink[]>([]);
  const [portfolio, setPortfolio] = useState<PortfolioItem[]>([]);
  const [serviceSlug, setServiceSlug] = useState<ServiceSlug>("youtube-thumbnails");
  const [serviceEdit, setServiceEdit] = useState<ServiceDetailCms | null>(null);
  const [gallerySlug, setGallerySlug] = useState<ServiceSlug>("youtube-thumbnails");
  const [galleryItems, setGalleryItems] = useState<GalleryImage[]>([]);
  const [paymentSlug, setPaymentSlug] = useState<PaymentSlug>("visa");
  const [paymentEdit, setPaymentEdit] = useState<PaymentMethodConfig | null>(null);
  const [heroVideoStatus, setHeroVideoStatus] = useState<string>("");
  const [hasCustomVideo, setHasCustomVideo] = useState(false);
  const [heroFiles, setHeroFiles] = useState<MediaFile[]>([]);
  const [pdfFiles, setPdfFiles] = useState<MediaFile[]>([]);
  const [selectedPdf, setSelectedPdf] = useState("");
  const [companyPdfStatus, setCompanyPdfStatus] = useState("");
  const [portfolioFiles, setPortfolioFiles] = useState<MediaFile[]>([]);
  const [galleryFiles, setGalleryFiles] = useState<MediaFile[]>([]);
  const [portfolioUploadStatus, setPortfolioUploadStatus] = useState("");
  const [galleryUploadStatus, setGalleryUploadStatus] = useState("");
  const videoInputRef = useRef<HTMLInputElement>(null);
  const pdfInputRef = useRef<HTMLInputElement>(null);
  const portfolioInputRef = useRef<HTMLInputElement>(null);
  const galleryInputRef = useRef<HTMLInputElement>(null);

  const reload = useCallback(() => {
    setReviews(loadStoredReviews());
    setInbox(loadInbox());
    setHero(getHeroConfig());
    setOffers(getOfferMessages());
    setPopup(getPopupConfig());
    setCollabs(getCollaborators());
    setSocials(getSocialLinks());
    setPortfolio(getPortfolio());
    hasHeroVideo().then(setHasCustomVideo);
    setSelectedPdf(getSiteSettings().companyProfilePdf);
    fetch("/api/admin/media?folder=hero")
      .then((r) => r.json())
      .then((d) => setHeroFiles(d.files ?? []))
      .catch(() => setHeroFiles([]));
    fetch("/api/admin/media?folder=profiles")
      .then((r) => r.json())
      .then((d) => setPdfFiles(d.files ?? []))
      .catch(() => setPdfFiles([]));
    fetch("/api/admin/media?folder=portfolio")
      .then((r) => r.json())
      .then((d) => setPortfolioFiles(d.files ?? []))
      .catch(() => setPortfolioFiles([]));
    fetch("/api/admin/media?folder=gallery")
      .then((r) => r.json())
      .then((d) => setGalleryFiles(d.files ?? []))
      .catch(() => setGalleryFiles([]));
  }, []);

  useEffect(() => {
    fetch("/api/admin/login")
      .then((r) => r.json())
      .then((d) => {
        if (!d.authenticated) router.replace("/studio/control");
      });
    reload();
  }, [router, reload]);

  useEffect(() => {
    const base = SERVICE_DETAILS[serviceSlug];
    const ov = getServiceOverrides()[serviceSlug];
    setServiceEdit(
      ov ?? {
        slug: serviceSlug,
        title: base.title,
        shortTitle: base.shortTitle,
        description: base.description,
        longDescription: base.longDescription,
        heroEyebrow: base.heroEyebrow,
      }
    );
  }, [serviceSlug]);

  useEffect(() => {
    const g = getGalleryOverride(gallerySlug) ?? SERVICE_DETAILS[gallerySlug].gallery;
    setGalleryItems([...g]);
  }, [gallerySlug]);

  useEffect(() => {
    setPaymentEdit({ ...getPaymentConfig()[paymentSlug] });
  }, [paymentSlug]);

  const logout = async () => {
    await fetch("/api/admin/login", { method: "DELETE" });
    router.replace("/studio/control");
  };

  const refreshMedia = () => {
    fetch("/api/admin/hero-video")
      .then((r) => r.json())
      .then((d) => setHeroFiles(d.files ?? []));
    fetch("/api/admin/media?folder=profiles")
      .then((r) => r.json())
      .then((d) => setPdfFiles(d.files ?? []));
    fetch("/api/admin/media?folder=portfolio")
      .then((r) => r.json())
      .then((d) => setPortfolioFiles(d.files ?? []))
      .catch(() => setPortfolioFiles([]));
    fetch("/api/admin/media?folder=gallery")
      .then((r) => r.json())
      .then((d) => setGalleryFiles(d.files ?? []))
      .catch(() => setGalleryFiles([]));
  };

  return (
    <div className="admin-shell flex min-h-screen">
      <aside className="admin-sidebar hidden lg:flex w-56 xl:w-64 flex-col shrink-0 p-5 gap-1">
        <p className="text-[10px] uppercase tracking-[0.35em] text-cs-violet mb-4 px-2">
          Studio Control
        </p>
        {TABS.map((t) => (
          <button
            key={t.id}
            type="button"
            onClick={() => setTab(t.id)}
            className={`admin-sidebar-link rounded-xl px-3 py-2.5 text-left text-xs uppercase tracking-widest ${
              tab === t.id ? "admin-sidebar-link-active" : "text-cs-silver/45"
            }`}
          >
            {t.label}
            {t.id === "Inbox" && inbox.filter((m) => !m.read).length > 0 && (
              <span className="ml-1 text-cs-neon">· {inbox.filter((m) => !m.read).length}</span>
            )}
          </button>
        ))}
      </aside>

      <div className="flex-1 flex flex-col min-w-0">
        <header className="glass-premium border-b border-cs-violet/20 px-5 py-4 flex flex-wrap items-center justify-between gap-3">
          <div>
            <h1 className="text-lg font-bold text-cs-silver" style={{ fontFamily: "var(--font-display)" }}>
              {TABS.find((t) => t.id === tab)?.label ?? tab}
            </h1>
            <p className="text-xs text-cs-silver/45 mt-0.5">CS Graphics admin dashboard</p>
          </div>
          <div className="flex gap-2 lg:hidden overflow-x-auto max-w-full">
            <select
              value={tab}
              onChange={(e) => setTab(e.target.value as Tab)}
              className="form-input rounded-lg text-xs px-3 py-2"
            >
              {TABS.map((t) => (
                <option key={t.id} value={t.id}>{t.label}</option>
              ))}
            </select>
          </div>
          <div className="flex gap-2">
            <a href="/" className="text-xs uppercase tracking-widest text-cs-silver/60 hover:text-cs-neon px-3 py-2">
              View Site
            </a>
            <button type="button" onClick={logout} className="text-xs uppercase tracking-widest text-cs-silver/60 hover:text-cs-neon px-3 py-2">
              Logout
            </button>
          </div>
        </header>

        <main className="flex-1 p-5 md:p-8 overflow-y-auto">
          <div className="admin-main-card rounded-2xl p-5 md:p-8 min-h-[min(70vh,720px)]">
        {tab === "Reviews" && (
          <div className="space-y-4 max-w-3xl">
            <p className="text-sm text-cs-silver/50">Edit, approve, feature, or delete reviews.</p>
            {reviews.map((r) => (
              <div key={r.id} className="surface rounded-xl p-4 space-y-3 border border-white/5">
                <div className="flex flex-wrap gap-2 text-xs text-cs-violet">
                  <span>{r.status}</span>
                  {r.featured && <span className="text-cs-gold">★ Featured</span>}
                  <span>{r.rating}★ · {r.lang}</span>
                </div>
                <AdminInput value={r.name} onChange={(e) => { updateReview(r.id, { name: e.target.value }); reload(); }} />
                <AdminInput value={r.role} onChange={(e) => { updateReview(r.id, { role: e.target.value }); reload(); }} />
                <AdminTextarea value={r.quote} rows={3} onChange={(e) => { updateReview(r.id, { quote: e.target.value }); reload(); }} />
                <div className="flex flex-wrap gap-2">
                  {r.status === "pending" && (
                    <button type="button" onClick={() => { approveReview(r.id); reload(); }} className="text-xs text-cs-neon px-3 py-1 rounded-full bg-cs-violet/20">Approve</button>
                  )}
                  <button type="button" onClick={() => { toggleFeaturedReview(r.id); reload(); }} className="text-xs text-cs-gold px-3 py-1 rounded-full border border-cs-gold/30">Feature</button>
                  <button type="button" onClick={() => { rejectReview(r.id); reload(); }} className="text-xs text-red-400 px-3 py-1 rounded-full border border-red-500/30">Reject</button>
                  <button type="button" onClick={() => { deleteReview(r.id); reload(); }} className="text-xs text-cs-silver/50 px-3 py-1 rounded-full border border-white/10">Delete</button>
                </div>
              </div>
            ))}
          </div>
        )}

        {tab === "Inbox" && (
          <div className="space-y-3 max-w-3xl">
            {inbox.length === 0 && <p className="text-cs-silver/40">No messages yet.</p>}
            {inbox.map((m) => (
              <div key={m.id} className={`surface rounded-xl p-4 ${!m.read ? "border-cs-violet/40" : "border-white/5"}`}>
                <p className="font-medium text-cs-silver">{m.name} · {m.email}</p>
                <p className="text-sm text-cs-silver/60 mt-2">{m.message}</p>
                <p className="text-xs text-cs-silver/40 mt-2">{new Date(m.createdAt).toLocaleString()}</p>
                <div className="flex gap-2 mt-3">
                  {!m.read && <button type="button" onClick={() => { markInboxRead(m.id); reload(); }} className="text-xs text-cs-neon">Mark read</button>}
                  <button type="button" onClick={() => { deleteInboxMessage(m.id); reload(); }} className="text-xs text-red-400">Delete</button>
                </div>
              </div>
            ))}
          </div>
        )}

        {tab === "Hero" && (
          <div className="space-y-4 max-w-xl">
            <AdminInput value={hero.eyebrow} onChange={(e) => setHero({ ...hero, eyebrow: e.target.value })} placeholder="Eyebrow" />
            <AdminInput value={hero.titleWords.join(" ")} onChange={(e) => setHero({ ...hero, titleWords: e.target.value.split(/\s+/) })} placeholder="Title words" />
            <AdminInput value={hero.tagline} onChange={(e) => setHero({ ...hero, tagline: e.target.value })} placeholder="Tagline" />
            <AdminTextarea value={hero.subtitle} rows={3} onChange={(e) => setHero({ ...hero, subtitle: e.target.value })} />
            <div className="glass-premium rounded-xl p-5 space-y-4 stroke-purple max-w-2xl">
              <p className="text-xs uppercase tracking-widest text-cs-violet">Active video path</p>
              <p className="admin-file-tree text-cs-neon break-all">
                {hero.videoUrl ?? "/content/hero/hero-bg.mp4"}
                {hasCustomVideo && " + browser IndexedDB blob"}
              </p>
              <div className="admin-file-tree rounded-lg p-3 border border-cs-violet/20">
                <p className="text-cs-violet mb-2">public/content/hero/</p>
                {heroFiles.length === 0 && <p className="text-cs-silver/40">No videos uploaded yet.</p>}
                {heroFiles.map((f) => (
                  <button
                    key={f.path}
                    type="button"
                    onClick={() => {
                      const updated = { ...hero, videoUrl: f.path };
                      setHero(updated);
                      setHeroConfig(updated);
                      window.dispatchEvent(new Event("cs-hero-video-updated"));
                      setHeroVideoStatus(`Using ${f.localPath ?? f.path}`);
                    }}
                    className={`admin-file-item block w-full text-left rounded-lg px-3 py-2 mb-2 ${
                      hero.videoUrl?.startsWith(f.path) ? "admin-file-item-selected" : ""
                    }`}
                  >
                    <span className="text-cs-silver">{f.name}</span>
                    <span className="block text-[10px] text-cs-silver/40">{f.localPath ?? f.path}</span>
                  </button>
                ))}
              </div>
              <input
                ref={videoInputRef}
                type="file"
                accept="video/mp4,video/webm,video/quicktime"
                className="text-xs text-cs-silver/60 w-full"
                onChange={async (e) => {
                  const file = e.target.files?.[0];
                  if (!file) return;
                  setHeroVideoStatus("Uploading…");
                  try {
                    await saveHeroVideo(file);
                    const form = new FormData();
                    form.append("video", file);
                    form.append("filename", file.name);
                    const res = await fetch("/api/admin/hero-video", { method: "POST", body: form });
                    const data = (await res.json()) as { url?: string; path?: string };
                    if (res.ok && data.path) {
                      const updated = { ...hero, videoUrl: data.path };
                      setHero(updated);
                      setHeroConfig(updated);
                    }
                    setHasCustomVideo(true);
                    refreshMedia();
                    window.dispatchEvent(new Event("cs-hero-video-updated"));
                    setHeroVideoStatus("Video uploaded and selected.");
                  } catch {
                    setHeroVideoStatus("Upload failed.");
                  }
                  e.target.value = "";
                }}
              />
              <button
                type="button"
                onClick={async () => {
                  await clearHeroVideo();
                  const updated = { ...hero, videoUrl: undefined };
                  setHero(updated);
                  setHeroConfig(updated);
                  setHasCustomVideo(false);
                  window.dispatchEvent(new Event("cs-hero-video-updated"));
                  setHeroVideoStatus("Cleared browser video cache.");
                }}
                className="text-xs text-cs-silver/60 px-3 py-1 rounded-full border border-cs-violet/30"
              >
                Clear browser cache
              </button>
              {heroVideoStatus && <p className="text-xs text-cs-silver/50">{heroVideoStatus}</p>}
            </div>
            <SaveBtn onClick={() => { setHeroConfig(hero); alert("Hero saved."); }} />
          </div>
        )}

        {tab === "Company" && (
          <div className="space-y-4 max-w-2xl">
            <div className="glass-premium rounded-xl p-5 space-y-4 stroke-purple">
              <p className="text-xs uppercase tracking-widest text-cs-violet">Company profile PDF</p>
              <p className="admin-file-tree text-cs-neon break-all">Active: {selectedPdf}</p>
              <div className="admin-file-tree rounded-lg p-3 border border-cs-violet/20">
                <p className="text-cs-violet mb-2">public/content/profiles/</p>
                {pdfFiles.map((f) => (
                  <button
                    key={f.path}
                    type="button"
                    onClick={() => setSelectedPdf(f.path)}
                    className={`admin-file-item block w-full text-left rounded-lg px-3 py-2 mb-2 ${
                      selectedPdf === f.path ? "admin-file-item-selected" : ""
                    }`}
                  >
                    <span className="text-cs-silver">{f.name}</span>
                    <span className="block text-[10px] text-cs-silver/40">public/content/profiles/{f.name}</span>
                  </button>
                ))}
              </div>
              <input
                ref={pdfInputRef}
                type="file"
                accept="application/pdf"
                className="text-xs w-full text-cs-silver/60"
                onChange={async (e) => {
                  const file = e.target.files?.[0];
                  if (!file) return;
                  setCompanyPdfStatus("Uploading…");
                  const form = new FormData();
                  form.append("pdf", file);
                  form.append("filename", file.name);
                  const res = await fetch("/api/admin/company-profile", { method: "POST", body: form });
                  const data = (await res.json()) as { path?: string };
                  if (res.ok && data.path) {
                    setSelectedPdf(data.path);
                    refreshMedia();
                    setCompanyPdfStatus("PDF uploaded.");
                  } else setCompanyPdfStatus("Upload failed.");
                  e.target.value = "";
                }}
              />
              {companyPdfStatus && <p className="text-xs text-cs-silver/50">{companyPdfStatus}</p>}
            </div>
            <SaveBtn
              onClick={() => {
                setCompanyProfilePdf(selectedPdf);
                alert("Company PDF path saved for download button.");
              }}
            />
          </div>
        )}

        {tab === "Socials" && (
          <div className="space-y-3 max-w-xl">
            {socials.map((s, i) => (
              <div key={s.id} className="grid gap-2 sm:grid-cols-[1fr_1fr_auto] items-center">
                <AdminInput value={s.label} onChange={(e) => { const n = [...socials]; n[i] = { ...s, label: e.target.value }; setSocials(n); }} />
                <AdminInput value={s.href} onChange={(e) => { const n = [...socials]; n[i] = { ...s, href: e.target.value }; setSocials(n); }} />
                <label className="flex items-center gap-2 text-xs text-cs-silver/60">
                  <input type="checkbox" checked={s.enabled} onChange={(e) => { const n = [...socials]; n[i] = { ...s, enabled: e.target.checked }; setSocials(n); }} />
                  On
                </label>
              </div>
            ))}
            <button type="button" onClick={() => setSocials([...socials, { id: `s-${Date.now()}`, label: "New", href: "https://", enabled: true }])} className="text-xs text-cs-neon">+ Add link</button>
            <SaveBtn onClick={() => { setSocialLinks(socials); alert("Social links saved."); }} />
          </div>
        )}

        {tab === "Portfolio" && (
          <div className="space-y-4 max-w-2xl">
            <div className="glass-premium rounded-xl p-5 space-y-4 stroke-purple">
              <p className="text-xs uppercase tracking-widest text-cs-violet">Upload images</p>
              <input
                ref={portfolioInputRef}
                type="file"
                accept="image/png,image/jpeg,image/webp,image/svg+xml,image/gif"
                className="text-xs w-full text-cs-silver/60"
                onChange={async (e) => {
                  const file = e.target.files?.[0];
                  if (!file) return;
                  setPortfolioUploadStatus("Uploading…");
                  const form = new FormData();
                  form.append("file", file);
                  form.append("filename", file.name);
                  form.append("folder", "portfolio");
                  try {
                    const res = await fetch("/api/admin/media", { method: "POST", body: form });
                    const data = await res.json();
                    if (res.ok) {
                      refreshMedia();
                      setPortfolioUploadStatus("Uploaded.");
                    } else setPortfolioUploadStatus(`Failed: ${data.error ?? res.status}`);
                  } catch (err) {
                    setPortfolioUploadStatus(`Error: ${err instanceof Error ? err.message : "Network error"}`);
                  }
                  e.target.value = "";
                }}
              />
              {portfolioUploadStatus && <p className="text-xs text-cs-silver/50">{portfolioUploadStatus}</p>}
            </div>
            {portfolio.map((p, i) => (
              <div key={p.id} className="surface rounded-xl p-4 border border-white/5 space-y-3">
                <div className="grid gap-2 sm:grid-cols-2">
                  <AdminInput placeholder="Title" value={p.title} onChange={(e) => { const n = [...portfolio]; n[i] = { ...p, title: e.target.value }; setPortfolio(n); }} />
                  <AdminInput placeholder="Category" value={p.category} onChange={(e) => { const n = [...portfolio]; n[i] = { ...p, category: e.target.value }; setPortfolio(n); }} />
                  <AdminInput placeholder="Gradient classes" value={p.gradient} onChange={(e) => { const n = [...portfolio]; n[i] = { ...p, gradient: e.target.value }; setPortfolio(n); }} />
                </div>
                <div>
                  <p className="text-[10px] uppercase tracking-widest text-cs-violet mb-1.5">Image</p>
                  {p.image && (
                    <div className="relative w-full aspect-video rounded-lg overflow-hidden bg-cs-black/40 mb-2">
                      <Image src={p.image} alt={p.title} fill className="object-contain" sizes="400px" />
                    </div>
                  )}
                  {portfolioFiles.length === 0 && <p className="text-cs-silver/40 text-xs">Upload images above first.</p>}
                  <div className="flex flex-wrap gap-1.5">
                    {p.image && (
                      <button
                        type="button"
                        onClick={() => {
                          const n = [...portfolio];
                          n[i] = { ...p, image: undefined };
                          setPortfolio(n);
                        }}
                        className="flex items-center gap-1 rounded-lg border border-cs-neon bg-cs-neon/10 px-2.5 py-1 text-[11px] text-cs-neon"
                      >
                        {p.image.split("/").pop()} ✕
                      </button>
                    )}
                    {portfolioFiles
                      .filter((f) => f.path !== p.image)
                      .map((f) => (
                        <button
                          key={f.path}
                          type="button"
                          onClick={() => {
                            const n = [...portfolio];
                            n[i] = { ...p, image: f.path };
                            setPortfolio(n);
                          }}
                          className="rounded-lg border border-cs-violet/20 bg-white/5 px-2.5 py-1 text-[11px] text-cs-silver/70 hover:border-cs-violet/50 hover:text-cs-silver transition-colors"
                        >
                          {f.name}
                        </button>
                      ))}
                  </div>
                </div>
                <button type="button" onClick={() => setPortfolio(portfolio.filter((_, j) => j !== i))} className="text-xs text-red-400">Remove</button>
              </div>
            ))}
            <button type="button" onClick={() => setPortfolio([...portfolio, { id: `p-${Date.now()}`, title: "New Work", category: "Category", gradient: "from-cs-violet/40 to-black" }])} className="text-xs text-cs-neon">+ Add project</button>
            <SaveBtn onClick={() => { persistPortfolio(portfolio); alert("Portfolio saved."); }} />
          </div>
        )}

        {tab === "Services" && serviceEdit && (
          <div className="space-y-4 max-w-xl">
            <select value={serviceSlug} onChange={(e) => setServiceSlug(e.target.value as ServiceSlug)} className="form-input rounded-xl px-4 py-2 text-cs-silver bg-white/5 w-full">
              {SERVICE_SLUGS.map((s) => <option key={s} value={s}>{SERVICE_DETAILS[s].title}</option>)}
            </select>
            <AdminInput value={serviceEdit.title} onChange={(e) => setServiceEdit({ ...serviceEdit, title: e.target.value })} />
            <AdminInput value={serviceEdit.shortTitle} onChange={(e) => setServiceEdit({ ...serviceEdit, shortTitle: e.target.value })} />
            <AdminTextarea value={serviceEdit.description} rows={2} onChange={(e) => setServiceEdit({ ...serviceEdit, description: e.target.value })} />
            <AdminTextarea value={serviceEdit.longDescription} rows={4} onChange={(e) => setServiceEdit({ ...serviceEdit, longDescription: e.target.value })} />
            <AdminInput value={serviceEdit.heroEyebrow} onChange={(e) => setServiceEdit({ ...serviceEdit, heroEyebrow: e.target.value })} />
            <SaveBtn onClick={() => { setServiceOverride(serviceSlug, serviceEdit); alert("Service page saved."); }} />
          </div>
        )}

        {tab === "Gallery" && (
          <div className="space-y-4 max-w-2xl">
            <select value={gallerySlug} onChange={(e) => setGallerySlug(e.target.value as ServiceSlug)} className="form-input rounded-xl px-4 py-2 w-full text-cs-silver bg-white/5">
              {SERVICE_SLUGS.map((s) => <option key={s} value={s}>{SERVICE_DETAILS[s].title}</option>)}
            </select>
            <div className="glass-premium rounded-xl p-5 space-y-4 stroke-purple">
              <p className="text-xs uppercase tracking-widest text-cs-violet">Upload images</p>
              <div className="grid grid-cols-3 sm:grid-cols-4 gap-2">
                {galleryFiles.length === 0 && <p className="text-cs-silver/40 text-xs col-span-full">No images uploaded yet.</p>}
                {galleryFiles.map((f) => (
                  <button
                    key={f.path}
                    type="button"
                    onClick={() => {
                      setGalleryItems([...galleryItems, { id: `g-${Date.now()}`, alt: f.name.replace(/\.[^.]+$/, ""), aspect: "square", gradient: "from-cs-violet/40 to-black", src: f.path }]);
                    }}
                    className="relative aspect-square rounded-lg overflow-hidden border border-cs-violet/20 bg-cs-black/40 hover:border-cs-violet/60 transition-colors group cursor-pointer"
                    title={`Add ${f.name}`}
                  >
                    <Image src={f.path} alt={f.name} fill className="object-cover" sizes="120px" />
                    <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center text-[10px] text-cs-silver">
                      + Add
                    </div>
                    <span className="absolute bottom-0 left-0 right-0 text-[8px] text-cs-silver/60 bg-cs-black/70 px-1 py-0.5 truncate">{f.name}</span>
                  </button>
                ))}
              </div>
              <input
                ref={galleryInputRef}
                type="file"
                accept="image/png,image/jpeg,image/webp,image/svg+xml,image/gif"
                className="text-xs w-full text-cs-silver/60"
                onChange={async (e) => {
                  const file = e.target.files?.[0];
                  if (!file) return;
                  setGalleryUploadStatus("Uploading…");
                  const form = new FormData();
                  form.append("file", file);
                  form.append("filename", file.name);
                  form.append("folder", "gallery");
                  try {
                    const res = await fetch("/api/admin/media", { method: "POST", body: form });
                    const data = await res.json();
                    if (res.ok) {
                      refreshMedia();
                      setGalleryUploadStatus("Uploaded.");
                    } else setGalleryUploadStatus(`Failed: ${data.error ?? res.status}`);
                  } catch (err) {
                    setGalleryUploadStatus(`Error: ${err instanceof Error ? err.message : "Network error"}`);
                  }
                  e.target.value = "";
                }}
              />
              {galleryUploadStatus && <p className="text-xs text-cs-silver/50">{galleryUploadStatus}</p>}
            </div>
            <p className="text-xs text-cs-silver/45">Click an image above to add it, or edit entries manually below.</p>
            {galleryItems.map((img, i) => (
              <div key={img.id} className="surface rounded-xl p-3 border border-white/5 space-y-2">
                {img.src && (
                  <div className="relative aspect-video w-full rounded-lg overflow-hidden bg-cs-black/40">
                    <Image src={img.src} alt={img.alt} fill className="object-contain" sizes="400px" />
                  </div>
                )}
                <div className="grid gap-2 sm:grid-cols-2">
                  <AdminInput value={img.alt} placeholder="Alt text" onChange={(e) => { const n = [...galleryItems]; n[i] = { ...img, alt: e.target.value }; setGalleryItems(n); }} />
                  <AdminInput value={img.src ?? ""} placeholder="/content/gallery/..." onChange={(e) => { const n = [...galleryItems]; n[i] = { ...img, src: e.target.value }; setGalleryItems(n); }} />
                  <select value={img.aspect} onChange={(e) => { const n = [...galleryItems]; n[i] = { ...img, aspect: e.target.value as GalleryImage["aspect"] }; setGalleryItems(n); }} className="form-input rounded-xl px-3 py-2 text-cs-silver bg-white/5">
                    <option value="wide">Wide</option><option value="tall">Tall</option><option value="square">Square</option>
                  </select>
                  <button type="button" onClick={() => setGalleryItems(galleryItems.filter((_, j) => j !== i))} className="text-xs text-red-400">Remove</button>
                </div>
              </div>
            ))}
            <button type="button" onClick={() => setGalleryItems([...galleryItems, { id: `g-${Date.now()}`, alt: "New", aspect: "square", gradient: "from-cs-violet/40 to-black", src: "" }])} className="text-xs text-cs-neon">+ Add image</button>
            <SaveBtn onClick={() => { setGalleryOverride(gallerySlug, galleryItems); alert("Gallery saved."); }} />
          </div>
        )}

        {tab === "Collaborators" && (
          <div className="space-y-4 max-w-2xl">
            {collabs.map((c, i) => (
              <div key={c.id} className="grid gap-2 sm:grid-cols-[1fr_1fr_auto] items-center">
                <AdminInput value={c.name} onChange={(e) => { const n = [...collabs]; n[i] = { ...c, name: e.target.value }; setCollabs(n); }} />
                <AdminInput value={c.logo} onChange={(e) => { const n = [...collabs]; n[i] = { ...c, logo: e.target.value }; setCollabs(n); }} />
                <button type="button" onClick={() => setCollabs(collabs.filter((_, j) => j !== i))} className="text-xs text-red-400">Remove</button>
              </div>
            ))}
            <button type="button" onClick={() => setCollabs([...collabs, { id: `c-${Date.now()}`, name: "Partner", logo: "/content/collaborators/logo.svg" }])} className="text-xs text-cs-neon">+ Add</button>
            <SaveBtn onClick={() => { setCollaborators(collabs); alert("Collaborators saved."); }} />
          </div>
        )}

        {tab === "Offers" && (
          <div className="space-y-4 max-w-xl">
            <AdminTextarea value={offers.join("\n")} rows={6} onChange={(e) => setOffers(e.target.value.split("\n").filter(Boolean))} />
            <SaveBtn onClick={() => { setOfferMessages(offers); alert("Offers saved."); }} />
          </div>
        )}

        {tab === "Popup" && (
          <div className="space-y-4 max-w-xl">
            <AdminInput value={popup.title} onChange={(e) => setPopup({ ...popup, title: e.target.value })} />
            <AdminInput value={popup.eyebrow} onChange={(e) => setPopup({ ...popup, eyebrow: e.target.value })} />
            <AdminTextarea value={popup.description} rows={4} onChange={(e) => setPopup({ ...popup, description: e.target.value })} />
            <label className="flex items-center gap-2 text-sm text-cs-silver/60"><input type="checkbox" checked={popup.enabled} onChange={(e) => setPopup({ ...popup, enabled: e.target.checked })} /> Enabled</label>
            <SaveBtn onClick={() => { setPopupConfig(popup); alert("Popup saved."); }} />
          </div>
        )}

        {tab === "Payments" && paymentEdit && (
          <div className="space-y-4 max-w-xl">
            <select value={paymentSlug} onChange={(e) => setPaymentSlug(e.target.value as PaymentSlug)} className="form-input rounded-xl px-4 py-2 w-full text-cs-silver bg-white/5">
              {PAYMENT_SLUGS.map((s) => <option key={s} value={s}>{PAYMENT_METHODS_CONFIG[s].name}</option>)}
            </select>
            <AdminTextarea value={paymentEdit.instructions.join("\n")} rows={5} onChange={(e) => setPaymentEdit({ ...paymentEdit, instructions: e.target.value.split("\n").filter(Boolean) })} placeholder="One instruction per line" />
            <AdminInput value={paymentEdit.qrImage ?? ""} onChange={(e) => setPaymentEdit({ ...paymentEdit, qrImage: e.target.value })} placeholder="QR image path" />
            <SaveBtn onClick={() => { setPaymentConfig(paymentSlug, paymentEdit); alert("Payment saved."); }} />
          </div>
        )}
          </div>
        </main>
      </div>
    </div>
  );
}
