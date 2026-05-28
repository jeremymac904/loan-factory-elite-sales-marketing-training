import { NextRequest, NextResponse } from "next/server";
import { createServerSupabaseClient } from "@/lib/supabase/server";
import { getBetaUserSession } from "@/lib/supabase/session";

export const dynamic = "force-dynamic";
export const runtime = "nodejs";

const allowedTopics = new Set([
  "platform",
  "content",
  "broken_link",
  "feature",
  "other",
]);

function jsonError(status: number, code: string, message: string) {
  return NextResponse.json({ error: code, message }, { status });
}

function getString(value: unknown, max = 4000) {
  if (typeof value !== "string") return "";
  return value.trim().slice(0, max);
}

function getBoolean(value: unknown) {
  return value === true;
}

export async function POST(request: NextRequest) {
  let body: unknown;

  try {
    body = await request.json();
  } catch {
    return jsonError(400, "invalid-json", "Request body must be valid JSON.");
  }

  const bodyRecord =
    body && typeof body === "object" ? (body as Record<string, unknown>) : {};

  const feedback = getString(bodyRecord.feedback);

  if (!feedback) {
    return jsonError(
      400,
      "missing-feedback",
      "Add feedback before submitting.",
    );
  }

  const anonymous = getBoolean(bodyRecord.anonymous);
  const rawTopic = getString(bodyRecord.topic, 64);
  const category = allowedTopics.has(rawTopic) ? rawTopic : "platform";
  const name = getString(bodyRecord.name, 200);
  const email = getString(bodyRecord.email, 320);

  const session = await getBetaUserSession();

  if (session.status === "not-configured") {
    return jsonError(
      503,
      "supabase-not-configured",
      "Supabase is not configured in this environment. The form will fall back to local save.",
    );
  }

  if (session.status === "signed-out") {
    return jsonError(
      401,
      "signed-out",
      "Sign in with your Loan Factory Google account to submit feedback.",
    );
  }

  if (session.status === "pending") {
    return jsonError(
      403,
      "access-pending",
      "Your account is not approved yet. Feedback can be submitted once approval lands.",
    );
  }

  const supabase = await createServerSupabaseClient();

  if (!supabase) {
    return jsonError(
      503,
      "supabase-unavailable",
      "Supabase server client could not be created.",
    );
  }

  const message = [
    `Name: ${anonymous ? "Anonymous" : name || "Not provided"}`,
    `Email: ${anonymous ? "Anonymous" : email || session.profile.email}`,
    "",
    feedback,
  ].join("\n");

  const { data, error } = await supabase
    .from("suggestions")
    .insert({
      user_id: anonymous ? null : session.user.id,
      anonymous,
      category,
      message,
    })
    .select("id, created_at")
    .single();

  if (error) {
    return jsonError(
      500,
      "supabase-insert-failed",
      error.message || "Could not save feedback.",
    );
  }

  return NextResponse.json({
    ok: true,
    id: data?.id ?? null,
    createdAt: data?.created_at ?? null,
  });
}
