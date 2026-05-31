import { NextResponse, type NextRequest } from "next/server";
import { updateSession } from "@/lib/supabase/proxy";

// The one production host that auth cookies + Google OAuth redirects are bound to.
const CANONICAL_HOST = "loan-factory-elite-sales-marketing-tr.netlify.app";

export async function proxy(request: NextRequest) {
  // Netlify gives every deploy a permalink/preview/branch host such as
  // "<hash>--loan-factory-elite-sales-marketing-tr.netlify.app". Sign-in cookies
  // are locked to a single hostname, so landing on one of those hosts shows an
  // endless "sign in required" loop. Bounce any non-canonical *.netlify.app host
  // to the canonical production host, preserving the exact path + query string.
  // Local dev (localhost) and any future custom domain are left untouched.
  const hostname = (request.headers.get("host") ?? "").split(":")[0].toLowerCase();

  if (hostname.endsWith(".netlify.app") && hostname !== CANONICAL_HOST) {
    const target = new URL(
      `${request.nextUrl.pathname}${request.nextUrl.search}`,
      `https://${CANONICAL_HOST}`,
    );
    return NextResponse.redirect(target, 308);
  }

  return updateSession(request);
}

export const config = {
  matcher: [
    "/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp|ico|css|js|mp4|mp3|wav|pdf|md)$).*)",
  ],
};
