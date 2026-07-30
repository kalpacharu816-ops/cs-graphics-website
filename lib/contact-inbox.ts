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
  write([entry, ...read()]);
}

export function markInboxRead(id: string): void {
  write(read().map((m) => (m.id === id ? { ...m, read: true } : m)));
}

export function deleteInboxMessage(id: string): void {
  write(read().filter((m) => m.id !== id));
}

export function unreadInboxCount(): number {
  return read().filter((m) => !m.read).length;
}
