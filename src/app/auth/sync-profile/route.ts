import { NextResponse, type NextRequest } from "next/server";
import type { PostgrestError, User } from "@supabase/supabase-js";
import { getSafeNextPath } from "@/lib/supabase/auth";
import { createSupabaseAdminClient } from "@/lib/supabase/admin";
import { isLoanFactoryEmail } from "@/lib/supabase/config";
import { createServerSupabaseClient } from "@/lib/supabase/server";

export const dynamic = "force-dynamic";

type ApprovedUserRow = {
  email: string;
  role: string;
  full_name: string | null;
  department: string | null;
  title: string | null;
  active: boolean;
};

function logSupabaseSyncError(context: string, error: PostgrestError | null) {
  if (!error) return;

  console.error(context, {
    code: error.code,
    message: error.message,
    details: error.details,
    hint: error.hint,
  });
}

function pending(reason: string, status = 200) {
  return NextResponse.json(
    {
      reason,
      redirectTo: `/access-pending/?reason=${encodeURIComponent(reason)}`,
    },
    { status },
  );
}

function getMetadataValue(
  user: User,
  keys: Array<"full_name" | "name" | "avatar_url" | "picture">,
) {
  const metadata = user.user_metadata ?? {};

  for (const key of keys) {
    const value = metadata[key];

    if (typeof value === "string" && value.trim()) {
      return value;
    }
  }

  return null;
}

export async function POST(request: NextRequest) {
  const supabase = await createServerSupabaseClient();

  if (!supabase) {
    return pending("setup", 503);
  }

  let next = "/";

  try {
    const body = (await request.json()) as { next?: string | null };
    next = getSafeNextPath(body.next ?? null);
  } catch {
    next = "/";
  }

  const {
    data: { user },
  } = await supabase.auth.getUser();

  const email = user?.email?.toLowerCase().trim();

  if (!user || !email) {
    return pending("missing-user", 401);
  }

  if (!isLoanFactoryEmail(email)) {
    await supabase.auth.signOut();
    return pending("domain", 403);
  }

  const admin = createSupabaseAdminClient();

  if (!admin) {
    return pending("setup", 503);
  }

  const { data: approvedUser, error: approvalError } = await admin
    .from("approved_users")
    .select("email,role,full_name,department,title,active")
    .eq("email", email)
    .eq("active", true)
    .maybeSingle<ApprovedUserRow>();

  if (approvalError) {
    logSupabaseSyncError("Supabase approved user lookup failed", approvalError);
    return pending("approval-sync", 500);
  }

  const profileStatus = approvedUser ? "approved" : "pending";

  const { error: profileError } = await admin.from("profiles").upsert(
    {
      id: user.id,
      email,
      full_name:
        approvedUser?.full_name ?? getMetadataValue(user, ["full_name", "name"]),
      role: approvedUser?.role ?? null,
      department: approvedUser?.department ?? null,
      title: approvedUser?.title ?? null,
      avatar_url: getMetadataValue(user, ["avatar_url", "picture"]),
      status: profileStatus,
      updated_at: new Date().toISOString(),
    },
    { onConflict: "email" },
  );

  if (profileError) {
    logSupabaseSyncError("Supabase profile upsert failed", profileError);
    return pending("profile-sync", 500);
  }

  if (!approvedUser) {
    return pending("pending");
  }

  return NextResponse.json({
    status: "approved",
    role: approvedUser.role,
    redirectTo: next,
  });
}
