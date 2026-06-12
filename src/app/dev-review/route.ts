import { NextResponse } from "next/server";
import { betaPreviewCookieName } from "@/lib/betaPreview";

export const dynamic = "force-dynamic";

// LOCAL REVIEW ONLY: sets the beta preview cookie so member surfaces render
// without a session. Hard-disabled outside `next dev` — in production this
// route only redirects to /login/ and never sets the cookie.
export function GET(request: Request) {
  if (process.env.NODE_ENV !== "development") {
    return NextResponse.redirect(new URL("/login/", request.url));
  }
  const url = new URL(request.url);
  const next = url.searchParams.get("next") ?? "/member-area/";
  const target = next.startsWith("/") ? next : "/member-area/";
  const response = NextResponse.redirect(new URL(target, request.url));
  response.cookies.set(betaPreviewCookieName, "1", { path: "/" });
  return response;
}
