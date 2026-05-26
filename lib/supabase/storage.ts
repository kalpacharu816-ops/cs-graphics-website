import { getClient, SUPABASE_URL, isSupabaseConfigured } from "./server";

export { SUPABASE_URL };
export const isStorageConfigured = isSupabaseConfigured;

const BUCKET = "portfolio";

export function publicUrl(folder: string, filename: string): string {
  return `${SUPABASE_URL}/storage/v1/object/public/${BUCKET}/${folder}/${filename}`;
}

type StorageFile = {
  name: string;
  path: string;
  size: number;
};

export async function listFiles(folder: string): Promise<StorageFile[]> {
  const sb = getClient();
  if (!sb) return [];
  const { data, error } = await sb.storage.from(BUCKET).list(folder, {
    sortBy: { column: "name", order: "asc" },
  });
  if (error || !data) return [];
  return data
    .filter((f) => f.id && !f.id.endsWith("/"))
    .map((f) => ({
      name: f.name,
      path: publicUrl(folder, f.name),
      size: f.metadata?.size ?? 0,
    }));
}

export async function uploadFile(
  folder: string,
  filename: string,
  buffer: Buffer,
  contentType: string
): Promise<{ path: string; name: string; size: number } | null> {
  const sb = getClient();
  if (!sb) return null;
  const { data, error } = await sb.storage
    .from(BUCKET)
    .upload(`${folder}/${filename}`, buffer, {
      contentType,
      upsert: true,
    });
  if (error || !data) return null;
  return {
    path: publicUrl(folder, filename),
    name: filename,
    size: buffer.length,
  };
}

export async function deleteFile(folder: string, filename: string): Promise<boolean> {
  const sb = getClient();
  if (!sb) return false;
  const { error } = await sb.storage.from(BUCKET).remove([`${folder}/${filename}`]);
  return !error;
}

export function mimeFromExt(filename: string): string {
  const ext = filename.split(".").pop()?.toLowerCase() ?? "";
  const map: Record<string, string> = {
    png: "image/png",
    jpg: "image/jpeg",
    jpeg: "image/jpeg",
    webp: "image/webp",
    svg: "image/svg+xml",
    gif: "image/gif",
    mp4: "video/mp4",
    webm: "video/webm",
    mov: "video/quicktime",
    pdf: "application/pdf",
  };
  return map[ext] ?? "application/octet-stream";
}
