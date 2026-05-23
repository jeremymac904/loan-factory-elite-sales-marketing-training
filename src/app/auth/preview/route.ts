import { NextResponse } from "next/server";
import { betaPreviewCookieName } from "@/lib/betaPreview";

export const dynamic = "force-dynamic";

function safeNext(searchParams: URLSearchParams) {
  const next = searchParams.get("next");

  if (!next || !next.startsWith("/") || next.startsWith("//")) {
    return "/";
  }

  return next;
}

function enterPreview(request: Request) {
  const requestUrl = new URL(request.url);
  const response = NextResponse.redirect(new URL(safeNext(requestUrl.searchParams), requestUrl));

  response.cookies.set(betaPreviewCookieName, "1", {
    httpOnly: true,
    path: "/",
    sameSite: "lax",
    secure: requestUrl.protocol === "https:",
  });

  return response;
}

export function GET(request: Request) {
  return enterPreview(request);
}

export function POST(request: Request) {
  return enterPreview(request);
}
