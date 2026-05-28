import { NextRequest, NextResponse } from "next/server";
import { createServerSupabaseClient } from "@/lib/supabase/server";
import { getBetaUserSession } from "@/lib/supabase/session";

export const dynamic = "force-dynamic";
export const runtime = "nodejs";

const allowedUrgencies = new Set(["normal", "urgent", "critical"]);
const allowedIssueCategories = new Set([
  "status_update",
  "conditions",
  "turn_time",
  "communication",
  "other",
]);

function jsonError(status: number, code: string, message: string) {
  return NextResponse.json({ error: code, message }, { status });
}

function getString(value: unknown, max = 2000) {
  if (typeof value !== "string") return "";
  return value.trim().slice(0, max);
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

  const explanation = getString(bodyRecord.explanation, 4000);

  if (!explanation) {
    return jsonError(
      400,
      "missing-explanation",
      "Add the explanation before submitting the escalation.",
    );
  }

  const rawUrgency = getString(bodyRecord.urgency, 32) || "normal";
  const urgency = allowedUrgencies.has(rawUrgency) ? rawUrgency : "normal";
  const rawIssueCategory =
    getString(bodyRecord.issueCategory, 64) || "status_update";
  const issueCategory = allowedIssueCategories.has(rawIssueCategory)
    ? rawIssueCategory
    : "status_update";

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
      "Sign in with your Loan Factory Google account before submitting an escalation.",
    );
  }

  if (session.status === "pending") {
    return jsonError(
      403,
      "access-pending",
      "Your account is not approved yet. Lender escalations can be submitted once approval lands.",
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

  const { data, error } = await supabase
    .from("lender_escalations")
    .insert({
      user_id: session.user.id,
      lo_name: getString(bodyRecord.loName, 200),
      lo_email: getString(bodyRecord.loEmail, 320),
      processor_name: getString(bodyRecord.processorName, 200),
      processor_email: getString(bodyRecord.processorEmail, 320),
      lender_name: getString(bodyRecord.lenderName, 200),
      ae_name: getString(bodyRecord.aeName, 200),
      ae_email: getString(bodyRecord.aeEmail, 320),
      loan_number: getString(bodyRecord.loanNumber, 100),
      urgency,
      issue_category: issueCategory,
      explanation,
      requested_help: getString(bodyRecord.requestedHelp, 4000),
    })
    .select("id, created_at")
    .single();

  if (error) {
    return jsonError(
      500,
      "supabase-insert-failed",
      error.message || "Could not save the lender escalation.",
    );
  }

  return NextResponse.json({
    ok: true,
    id: data?.id ?? null,
    createdAt: data?.created_at ?? null,
  });
}
