import { createClient } from "@supabase/supabase-js";

export const SUPABASE_URL = process.env.SUPABASE_URL ?? "";
const SUPABASE_ANON_KEY = process.env.SUPABASE_ANON_KEY ?? "";
const SUPABASE_SERVICE_ROLE = process.env.SUPABASE_SERVICE_ROLE_KEY ?? "";

export function isSupabaseConfigured(): boolean {
  const key = SUPABASE_SERVICE_ROLE || SUPABASE_ANON_KEY;
  return !!(SUPABASE_URL && key);
}

export function getClient() {
  const key = SUPABASE_SERVICE_ROLE || SUPABASE_ANON_KEY;
  if (!SUPABASE_URL || !key) return null;
  return createClient(SUPABASE_URL, key, {
    db: { schema: "public" },
  });
}

export type CmsRow = {
  id: string;
  data: unknown;
  updated_at: string;
};

export async function getCmsData(id: string): Promise<unknown | null> {
  const sb = getClient();
  if (!sb) return null;
  const { data } = await sb.from("cms_data").select("data").eq("id", id).single();
  return (data as CmsRow | null)?.data ?? null;
}

export async function setCmsData(id: string, data: unknown): Promise<boolean> {
  const sb = getClient();
  if (!sb) return false;
  const { error } = await sb.from("cms_data").upsert(
    { id, data, updated_at: new Date().toISOString() },
    { onConflict: "id" }
  );
  return !error;
}

export async function deleteCmsData(id: string): Promise<boolean> {
  const sb = getClient();
  if (!sb) return false;
  const { error } = await sb.from("cms_data").delete().eq("id", id);
  return !error;
}
