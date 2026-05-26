export type ReviewStatus = "pending" | "approved" | "rejected";

export type ClientReview = {
  id: string;
  name: string;
  role: string;
  quote: string;
  rating: number;
  lang: "en" | "si";
  status: ReviewStatus;
  featured?: boolean;
  createdAt: string;
};

export type { ClientReview as ReviewCms };

const STORAGE_KEY = "cs-client-reviews";

function readLocal(): ClientReview[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? (JSON.parse(raw) as ClientReview[]) : [];
  } catch {
    return [];
  }
}

function writeLocal(reviews: ClientReview[]): void {
  if (typeof window === "undefined") return;
  localStorage.setItem(STORAGE_KEY, JSON.stringify(reviews));
}

async function writeApi(reviews: ClientReview[]): Promise<void> {
  try {
    await fetch("/api/admin/cms", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ type: "reviews", data: reviews }),
    });
  } catch {
  }
}

export async function syncReviewsFromApi(): Promise<void> {
  try {
    const res = await fetch("/api/admin/cms?type=reviews");
    if (!res.ok) return;
    const result: { type: string; data: ClientReview[] } = await res.json();
    if (result.data) writeLocal(result.data);
  } catch {
  }
}

export function loadStoredReviews(): ClientReview[] {
  return readLocal();
}

export function saveReview(review: ClientReview): void {
  const all = [review, ...readLocal()];
  writeLocal(all);
  writeApi(all);
}

export function getApprovedReviews(): ClientReview[] {
  return readLocal()
    .filter((r) => r.status === "approved")
    .sort((a, b) => Number(b.featured) - Number(a.featured));
}

export function getPendingReviews(): ClientReview[] {
  return readLocal().filter((r) => r.status === "pending");
}

export function updateReview(id: string, patch: Partial<ClientReview>): void {
  const all = readLocal().map((r) => (r.id === id ? { ...r, ...patch } : r));
  writeLocal(all);
  writeApi(all);
}

export function approveReview(id: string): void {
  updateReview(id, { status: "approved" });
}

export function rejectReview(id: string): void {
  updateReview(id, { status: "rejected" });
}

export function deleteReview(id: string): void {
  const all = readLocal().filter((r) => r.id !== id);
  writeLocal(all);
  writeApi(all);
}

export function toggleFeaturedReview(id: string): void {
  const r = readLocal().find((x) => x.id === id);
  if (r) updateReview(id, { featured: !r.featured });
}

export function createReviewId(): string {
  return `rev-${Date.now()}-${Math.random().toString(36).slice(2, 9)}`;
}
