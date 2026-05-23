import { NextResponse } from "next/server";
import { betaPreviewCookieName } from "@/lib/betaPreview";

export const dynamic = "force-dynamic";

function exitPreview(request: Request) {
  const requestUrl = new URL(request.url);
  const response = NextResponse.redirect(new URL("/", requestUrl));

  response.cookies.set(betaPreviewCookieName, "", {
    httpOnly: true,
    maxAge: 0,
    path: "/",
    sameSite: "lax",
    secure: requestUrl.protocol === "https:",
  });

  return response;
}

export function GET(request: Request) {
  return exitPreview(request);
}

export function POST(request: Request) {
  return exitPreview(request);
}
