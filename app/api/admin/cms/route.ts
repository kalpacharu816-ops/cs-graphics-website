import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { SESSION_COOKIE } from "@/lib/auth-constants";
import { getCmsData, setCmsData } from "@/lib/supabase/server";

const VALID_TYPES = [
  "hero",
  "offers",
  "popup",
  "collaborators",
  "payments",
  "gallery",
  "socials",
  "portfolio",
  "services",
  "inbox",
  "reviews",
  "siteSettings",
] as const;

type CmsType = (typeof VALID_TYPES)[number];

export async function GET(request: Request) {
  const cookieStore = await cookies();
  if (!cookieStore.get(SESSION_COOKIE)?.value) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { searchParams } = new URL(request.url);
  const type = searchParams.get("type");

  if (type && !VALID_TYPES.includes(type as CmsType)) {
    return NextResponse.json({ error: "Invalid type" }, { status: 400 });
  }

  if (type) {
    const data = await getCmsData(type);
    return NextResponse.json({ type, data: data ?? null });
  }

  const results: Record<string, unknown> = {};
  for (const t of VALID_TYPES) {
    const data = await getCmsData(t);
    if (data !== null) results[t] = data;
  }
  return NextResponse.json(results);
}

export async function POST(request: Request) {
  const cookieStore = await cookies();
  if (!cookieStore.get(SESSION_COOKIE)?.value) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  let body: { type: string; data: unknown };
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  }

  if (!body.type || !VALID_TYPES.includes(body.type as CmsType)) {
    return NextResponse.json({ error: "Invalid or missing type" }, { status: 400 });
  }

  const ok = await setCmsData(body.type, body.data);
  if (!ok) {
    return NextResponse.json({ error: "Database write failed" }, { status: 500 });
  }

  return NextResponse.json({ ok: true, type: body.type });
}
