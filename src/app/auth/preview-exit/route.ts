import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { betaPreviewCookieName } from "@/lib/betaPreview";

export const dynamic = "force-dynamic";

async function exitPreview() {
  const cookieStore = await cookies();
  cookieStore.set(betaPreviewCookieName, "", {
    httpOnly: true,
    maxAge: 0,
    path: "/",
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
  });

  redirect("/");
}

export async function GET() {
  await exitPreview();
}

export async function POST() {
  await exitPreview();
}
