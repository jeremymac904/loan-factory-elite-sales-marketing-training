import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";

// Internal Review access has been retired. This route no longer sets the
// lf_beta_preview cookie. Both GET and POST simply redirect to /login/ so the
// preview bypass can no longer be entered. isBetaPreviewEnabled() and its call
// sites are intentionally left in place elsewhere; those branches are now
// unreachable because this cookie is never set here.
function redirectToLogin(request: Request) {
  return NextResponse.redirect(new URL("/login/", request.url));
}

export function GET(request: Request) {
  return redirectToLogin(request);
}

export function POST(request: Request) {
  return redirectToLogin(request);
}
