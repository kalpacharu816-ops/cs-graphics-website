import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

const SESSION_COOKIE = "cs-admin-token";

export function middleware(request: NextRequest) {
  if (request.nextUrl.pathname.startsWith("/studio/control/dashboard")) {
    const token = request.cookies.get(SESSION_COOKIE)?.value;
    if (!token) {
      return NextResponse.redirect(new URL("/studio/control", request.url));
    }
  }
  return NextResponse.next();
}

export const config = {
  matcher: ["/studio/control/dashboard/:path*"],
};
