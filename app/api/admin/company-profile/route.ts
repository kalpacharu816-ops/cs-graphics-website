import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { mkdir, writeFile } from "fs/promises";
import path from "path";
import { SESSION_COOKIE } from "@/lib/auth-constants";

export async function POST(request: Request) {
  const cookieStore = await cookies();
  if (!cookieStore.get(SESSION_COOKIE)?.value) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const formData = await request.formData();
  const file = formData.get("pdf");
  if (!file || !(file instanceof Blob)) {
    return NextResponse.json({ error: "No PDF file" }, { status: 400 });
  }

  const original = (formData.get("filename") as string) || "company-profile.pdf";
  const safe = original.replace(/[^a-zA-Z0-9._-]/g, "_").toLowerCase();
  const filename = safe.endsWith(".pdf") ? safe : `${safe}.pdf`;

  const buffer = Buffer.from(await file.arrayBuffer());
  const dir = path.join(process.cwd(), "public", "content", "profiles");
  await mkdir(dir, { recursive: true });
  await writeFile(path.join(dir, filename), buffer);

  const url = `/content/profiles/${filename}`;
  return NextResponse.json({ ok: true, path: url, filename });
}
