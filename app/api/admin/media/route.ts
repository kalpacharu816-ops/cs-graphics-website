import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { readdir, stat, writeFile, mkdir } from "fs/promises";
import path from "path";
import { SESSION_COOKIE } from "@/lib/auth-constants";
import {
  isStorageConfigured,
  listFiles,
  uploadFile,
  publicUrl,
} from "@/lib/supabase/storage";

const ALLOWED_IMAGE_EXTS = [".png", ".jpg", ".jpeg", ".webp", ".svg", ".gif"];

async function listLocal(
  subdir: string,
  extensions: string[]
): Promise<{ name: string; path: string; size: number }[]> {
  const dir = path.join(process.cwd(), "public", "content", subdir);
  try {
    await mkdir(dir, { recursive: true });
    const entries = await readdir(dir);
    const files = await Promise.all(
      entries
        .filter((name) => extensions.some((ext) => name.toLowerCase().endsWith(ext)))
        .map(async (name) => {
          const full = path.join(dir, name);
          const s = await stat(full);
          return { name, path: `/content/${subdir}/${name}`, size: s.size };
        })
    );
    return files.sort((a, b) => a.name.localeCompare(b.name));
  } catch {
    return [];
  }
}

export async function GET(request: Request) {
  const cookieStore = await cookies();
  if (!cookieStore.get(SESSION_COOKIE)?.value) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { searchParams } = new URL(request.url);
  const folder = searchParams.get("folder");
  const useSupabase = isStorageConfigured();

  if (folder === "hero") {
    const files = useSupabase
      ? await listFiles("hero")
      : await listLocal("hero", [".mp4", ".webm", ".mov"]);
    return NextResponse.json({ root: "public/content/hero/", files });
  }

  if (folder === "profiles") {
    const files = useSupabase
      ? await listFiles("profiles")
      : await listLocal("profiles", [".pdf"]);
    return NextResponse.json({ root: "public/content/profiles/", files });
  }

  if (folder === "portfolio") {
    const files = useSupabase
      ? await listFiles("portfolio")
      : await listLocal("portfolio", ALLOWED_IMAGE_EXTS);
    return NextResponse.json({ root: "public/content/portfolio/", files });
  }

  if (folder === "gallery") {
    const files = useSupabase
      ? await listFiles("gallery")
      : await listLocal("gallery", ALLOWED_IMAGE_EXTS);
    return NextResponse.json({ root: "public/content/gallery/", files });
  }

  const [hero, profiles, portfolio, gallery] = useSupabase
    ? await Promise.all([
        listFiles("hero"),
        listFiles("profiles"),
        listFiles("portfolio"),
        listFiles("gallery"),
      ])
    : await Promise.all([
        listLocal("hero", [".mp4", ".webm", ".mov"]),
        listLocal("profiles", [".pdf"]),
        listLocal("portfolio", ALLOWED_IMAGE_EXTS),
        listLocal("gallery", ALLOWED_IMAGE_EXTS),
      ]);

  return NextResponse.json({ hero, profiles, portfolio, gallery });
}

export async function POST(request: Request) {
  try {
    const cookieStore = await cookies();
    if (!cookieStore.get(SESSION_COOKIE)?.value) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const form = await request.formData();
    const file = form.get("file");
    if (!file || !(file instanceof Blob)) {
      return NextResponse.json({ error: "No file provided" }, { status: 400 });
    }

    const folder = (form.get("folder") as string) || "portfolio";
    const allowedFolders = ["portfolio", "gallery"];
    if (!allowedFolders.includes(folder)) {
      return NextResponse.json({ error: "Invalid folder" }, { status: 400 });
    }

    const rawName = (form.get("filename") as string) || "image.png";
    const safeName = rawName.replace(/[^a-zA-Z0-9._-]/g, "_");
    const ext = path.extname(safeName).toLowerCase();
    const finalName = ALLOWED_IMAGE_EXTS.includes(ext) ? safeName : `${safeName}.png`;

    const buffer = Buffer.from(await file.arrayBuffer());

    const supabaseOk = isStorageConfigured();

    if (supabaseOk) {
      const contentType = ext === ".svg" ? "image/svg+xml" : `image/${ext.replace(".", "")}`;
      const result = await uploadFile(folder, finalName, buffer, contentType);
      if (result) {
        return NextResponse.json({
          ok: true,
          path: result.path,
          name: result.name,
          size: result.size,
        });
      }
      return NextResponse.json({ error: "Supabase upload failed" }, { status: 500 });
    }

    const dir = path.join(process.cwd(), "public", "content", folder);
    await mkdir(dir, { recursive: true });
    await writeFile(path.join(dir, finalName), buffer);

    return NextResponse.json({
      ok: true,
      path: `/content/${folder}/${finalName}`,
      name: finalName,
      size: buffer.length,
    });
  } catch (err) {
    const message = err instanceof Error ? err.message : "Unknown error";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
