import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { mkdir, writeFile, readdir, stat } from "fs/promises";
import path from "path";
import { SESSION_COOKIE } from "@/lib/auth-constants";
const HERO_DIR = path.join(process.cwd(), "public", "content", "hero");

export async function GET() {
  const cookieStore = await cookies();
  if (!cookieStore.get(SESSION_COOKIE)?.value) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    await mkdir(HERO_DIR, { recursive: true });
    const entries = await readdir(HERO_DIR);
    const files = await Promise.all(
      entries
        .filter((n) => /\.(mp4|webm|mov)$/i.test(n))
        .map(async (name) => {
          const full = path.join(HERO_DIR, name);
          const s = await stat(full);
          return {
            name,
            path: `/content/hero/${name}`,
            size: s.size,
            localPath: `public/content/hero/${name}`,
          };
        })
    );
    return NextResponse.json({
      root: "public/content/hero/",
      files: files.sort((a, b) => a.name.localeCompare(b.name)),
    });
  } catch {
    return NextResponse.json({ root: "public/content/hero/", files: [] });
  }
}

export async function POST(request: Request) {
  const cookieStore = await cookies();
  if (!cookieStore.get(SESSION_COOKIE)?.value) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const formData = await request.formData();
  const file = formData.get("video");
  if (!file || !(file instanceof Blob)) {
    return NextResponse.json({ error: "No video file" }, { status: 400 });
  }

  const buffer = Buffer.from(await file.arrayBuffer());
  await mkdir(HERO_DIR, { recursive: true });
  const rawName = (formData.get("filename") as string) || "hero-bg.mp4";
  const filename = rawName.replace(/[^a-zA-Z0-9._-]/g, "_");
  const finalName = /\.(mp4|webm|mov)$/i.test(filename)
    ? filename
    : `${filename}.mp4`;
  await writeFile(path.join(HERO_DIR, finalName), buffer);

  const url = `/content/hero/${finalName}?v=${Date.now()}`;
  return NextResponse.json({
    ok: true,
    url,
    path: `/content/hero/${finalName}`,
    localPath: `public/content/hero/${finalName}`,
  });
}

export async function DELETE() {
  const cookieStore = await cookies();
  if (!cookieStore.get(SESSION_COOKIE)?.value) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  return NextResponse.json({ ok: true });
}
