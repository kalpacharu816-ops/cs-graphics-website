import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { createHash, randomBytes } from "crypto";
import { SESSION_COOKIE, ADMIN_PASSWORD_ENV } from "@/lib/auth-constants";

function signToken(): string {
  const secret = process.env[ADMIN_PASSWORD_ENV] ?? "csgraphics-admin";
  const nonce = randomBytes(16).toString("hex");
  const hash = createHash("sha256").update(`${secret}:${nonce}`).digest("hex");
  return `${nonce}.${hash}`;
}

function verifyToken(token: string): boolean {
  const parts = token.split(".");
  if (parts.length !== 2) return false;
  const [nonce, hash] = parts;
  const secret = process.env[ADMIN_PASSWORD_ENV] ?? "csgraphics-admin";
  const expected = createHash("sha256").update(`${secret}:${nonce}`).digest("hex");
  return hash === expected;
}

export async function POST(request: Request) {
  const body = (await request.json()) as { password?: string };
  const expected = process.env[ADMIN_PASSWORD_ENV];

  if (!expected) {
    return NextResponse.json(
      { error: "Admin password not configured. Set ADMIN_PASSWORD in Vercel environment variables." },
      { status: 500 }
    );
  }

  if (body.password !== expected) {
    return NextResponse.json({ error: "Invalid password" }, { status: 401 });
  }

  const token = signToken();
  const response = NextResponse.json({ ok: true });
  response.cookies.set(SESSION_COOKIE, token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: 60 * 60 * 8,
  });
  return response;
}

export async function GET() {
  const cookieStore = await cookies();
  const token = cookieStore.get(SESSION_COOKIE)?.value;
  if (!token || !verifyToken(token)) {
    return NextResponse.json({ authenticated: false });
  }
  return NextResponse.json({ authenticated: true });
}

export async function DELETE() {
  const response = NextResponse.json({ ok: true });
  response.cookies.delete(SESSION_COOKIE);
  return response;
}
