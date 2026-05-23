import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { betaPreviewCookieName } from "@/lib/betaPreview";

export const dynamic = "force-dynamic";

function safeNext(searchParams: URLSearchParams) {
  const next = searchParams.get("next");

  if (!next || !next.startsWith("/") || next.startsWith("//")) {
    return "/";
  }

  return next;
}

async function enterPreview(request: Request) {
  const cookieStore = await cookies();
  cookieStore.set(betaPreviewCookieName, "1", {
    httpOnly: true,
    path: "/",
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
  });

  redirect(safeNext(new URL(request.url).searchParams));
}

export async function GET(request: Request) {
  await enterPreview(request);
}

export async function POST(request: Request) {
  await enterPreview(request);
}
