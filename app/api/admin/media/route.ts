import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { readdir, stat, writeFile, mkdir } from "fs/promises";
import path from "path";
import { SESSION_COOKIE } from "@/lib/auth-constants";

async function listDir(
  subdir: string,
  extensions: string[]
): Promise<{ name: string; path: string; size: number }[]> {
  const dir = path.join(process.cwd(), "public", "content", subdir);
  try {
    await mkdir(dir, { recursive: true });
    const entries = await readdir(dir);
    const files = await Promise.all(
      entries
        .filter((name) =>
          extensions.some((ext) => name.toLowerCase().endsWith(ext))
        )
        .map(async (name) => {
          const full = path.join(dir, name);
          const s = await stat(full);
          return {
            name,
            path: `/content/${subdir}/${name}`,
            size: s.size,
          };
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

  if (folder === "hero") {
    const files = await listDir("hero", [".mp4", ".webm", ".mov"]);
    return NextResponse.json({ root: "public/content/hero/", files });
  }

  if (folder === "profiles") {
    const files = await listDir("profiles", [".pdf"]);
    return NextResponse.json({ root: "public/content/profiles/", files });
  }

  if (folder === "portfolio") {
    const files = await listDir("portfolio", [".png", ".jpg", ".jpeg", ".webp", ".svg", ".gif"]);
    return NextResponse.json({ root: "public/content/portfolio/", files });
  }

  if (folder === "gallery") {
    const files = await listDir("gallery", [".png", ".jpg", ".jpeg", ".webp", ".svg", ".gif"]);
    return NextResponse.json({ root: "public/content/gallery/", files });
  }

  const [hero, profiles, portfolio, gallery] = await Promise.all([
    listDir("hero", [".mp4", ".webm", ".mov"]),
    listDir("profiles", [".pdf"]),
    listDir("portfolio", [".png", ".jpg", ".jpeg", ".webp", ".svg", ".gif"]),
    listDir("gallery", [".png", ".jpg", ".jpeg", ".webp", ".svg", ".gif"]),
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
    const allowedExts = [".png", ".jpg", ".jpeg", ".webp", ".svg", ".gif"];
    const ext = path.extname(safeName).toLowerCase();
    const finalName = allowedExts.includes(ext) ? safeName : `${safeName}.png`;

    const buffer = Buffer.from(await file.arrayBuffer());
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
