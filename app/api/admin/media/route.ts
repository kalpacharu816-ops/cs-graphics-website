import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { readdir, stat } from "fs/promises";
import path from "path";

const SESSION_COOKIE = "cs-admin-token";

async function listDir(
  subdir: string,
  extensions: string[]
): Promise<{ name: string; path: string; size: number }[]> {
  const dir = path.join(process.cwd(), "public", "content", subdir);
  try {
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
    return NextResponse.json({
      root: "public/content/hero/",
      files,
    });
  }

  if (folder === "profiles") {
    const files = await listDir("profiles", [".pdf"]);
    return NextResponse.json({
      root: "public/content/profiles/",
      files,
    });
  }

  const [hero, profiles] = await Promise.all([
    listDir("hero", [".mp4", ".webm", ".mov"]),
    listDir("profiles", [".pdf"]),
  ]);

  return NextResponse.json({
    hero: { root: "public/content/hero/", files: hero },
    profiles: { root: "public/content/profiles/", files: profiles },
  });
}
