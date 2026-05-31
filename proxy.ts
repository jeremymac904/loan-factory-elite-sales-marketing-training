import { NextResponse, type NextRequest } from "next/server";
import { updateSession } from "@/lib/supabase/proxy";

// The one production host that auth cookies + Google OAuth redirects are bound to.
const CANONICAL_HOST = "loan-factory-elite-sales-marketing-tr.netlify.app";

// Netlify deploy permalinks ("<deploy-id>--site.netlify.app") and branch
// subdomains ("main--site.netlify.app") all contain the "--" delimiter; the
// canonical primary host never does. Match that delimiter so the rule is
// loop-proof: the canonical host can never satisfy it.
const NETLIFY_ALIAS_PATTERN = /--[^.]*\.netlify\.app$/i;

export async function proxy(request: NextRequest) {
  // Sign-in cookies + Google OAuth redirects are bound to CANONICAL_HOST only.
  // Landing on a deploy-permalink / branch / preview host shows an endless
  // "sign in required" loop. Redirect those to the canonical host, preserving
  // the exact path + query string. Behind Netlify's edge the incoming alias
  // host arrives in x-forwarded-host (the `host` header is often already
  // normalized to the primary domain), so check x-forwarded-host first.
  // localhost and any future custom domain never match and are untouched.
  const rawHost =
    request.headers.get("x-forwarded-host") ?? request.headers.get("host") ?? "";
  const hostname = rawHost.split(",")[0].split(":")[0].trim().toLowerCase();

  if (
    hostname &&
    hostname !== CANONICAL_HOST &&
    NETLIFY_ALIAS_PATTERN.test(hostname)
  ) {
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
