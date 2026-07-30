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

const STORAGE_KEY = "cs-client-reviews";

export function loadStoredReviews(): ClientReview[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];
    return JSON.parse(raw) as ClientReview[];
  } catch {
    return [];
  }
}

function persist(reviews: ClientReview[]): void {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(reviews));
}

export function saveReview(review: ClientReview): void {
  persist([review, ...loadStoredReviews()]);
}

export function getApprovedReviews(): ClientReview[] {
  return loadStoredReviews()
    .filter((r) => r.status === "approved")
    .sort((a, b) => Number(b.featured) - Number(a.featured));
}

export function getPendingReviews(): ClientReview[] {
  return loadStoredReviews().filter((r) => r.status === "pending");
}

export function updateReview(id: string, patch: Partial<ClientReview>): void {
  persist(
    loadStoredReviews().map((r) => (r.id === id ? { ...r, ...patch } : r))
  );
}

export function approveReview(id: string): void {
  updateReview(id, { status: "approved" });
}

export function rejectReview(id: string): void {
  updateReview(id, { status: "rejected" });
}

export function deleteReview(id: string): void {
  persist(loadStoredReviews().filter((r) => r.id !== id));
}

export function toggleFeaturedReview(id: string): void {
  const r = loadStoredReviews().find((x) => x.id === id);
  if (r) updateReview(id, { featured: !r.featured });
}

export function createReviewId(): string {
  return `rev-${Date.now()}-${Math.random().toString(36).slice(2, 9)}`;
}
