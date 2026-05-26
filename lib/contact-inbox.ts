import type { ContactMessage } from "@/lib/cms/types";
import { CMS_KEYS } from "@/lib/cms/keys";

function read(): ContactMessage[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = localStorage.getItem(CMS_KEYS.inbox);
    return raw ? (JSON.parse(raw) as ContactMessage[]) : [];
  } catch {
    return [];
  }
}

function write(messages: ContactMessage[]): void {
  localStorage.setItem(CMS_KEYS.inbox, JSON.stringify(messages));
}

async function writeApi(messages: ContactMessage[]): Promise<void> {
  try {
    await fetch("/api/admin/cms", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ type: "inbox", data: messages }),
    });
  } catch {
  }
}

export async function syncInboxFromApi(): Promise<void> {
  try {
    const res = await fetch("/api/admin/cms?type=inbox");
    if (!res.ok) return;
    const result: { type: string; data: ContactMessage[] } = await res.json();
    if (result.data) write(result.data);
  } catch {
  }
}

export function loadInbox(): ContactMessage[] {
  return read().sort(
    (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
  );
}

export function saveContactMessage(msg: Omit<ContactMessage, "id" | "createdAt" | "read">): void {
  const entry: ContactMessage = {
    ...msg,
    id: `msg-${Date.now()}`,
    createdAt: new Date().toISOString(),
    read: false,
  };
  const all = [entry, ...read()];
  write(all);
  writeApi(all);
}

export function markInboxRead(id: string): void {
  const all = read().map((m) => (m.id === id ? { ...m, read: true } : m));
  write(all);
  writeApi(all);
}

export function deleteInboxMessage(id: string): void {
  const all = read().filter((m) => m.id !== id);
  write(all);
  writeApi(all);
}

export function unreadInboxCount(): number {
  return read().filter((m) => !m.read).length;
}
