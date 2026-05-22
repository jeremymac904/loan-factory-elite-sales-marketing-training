import { redirect } from "next/navigation";
import { type NextRequest } from "next/server";
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

export async function GET(request: NextRequest) {
  const requestUrl = new URL(request.url);
  const code = requestUrl.searchParams.get("code");
  const next = getSafeNextPath(requestUrl.searchParams.get("next"));

  if (!code) {
    redirect("/login/?error=missing-code");
  }

  const supabase = await createServerSupabaseClient();

  if (!supabase) {
    redirect("/login/?error=supabase-not-configured");
  }

  const { error: exchangeError } = await supabase.auth.exchangeCodeForSession(
    code,
  );

  if (exchangeError) {
    redirect("/login/?error=auth-callback");
  }

  const {
    data: { user },
  } = await supabase.auth.getUser();

  const email = user?.email?.toLowerCase().trim();

  if (!user || !email) {
    redirect("/login/?error=missing-user");
  }

  if (!isLoanFactoryEmail(email)) {
    await supabase.auth.signOut();
    redirect("/access-pending/?reason=domain");
  }

  const admin = createSupabaseAdminClient();

  if (!admin) {
    redirect("/access-pending/?reason=setup");
  }

  const { data: approvedUser, error: approvalError } = await admin
    .from("approved_users")
    .select("email,role,full_name,department,title,active")
    .eq("email", email)
    .eq("active", true)
    .maybeSingle<ApprovedUserRow>();

  const userMetadata = user.user_metadata ?? {};
  const metadataName =
    typeof userMetadata.full_name === "string"
      ? userMetadata.full_name
      : typeof userMetadata.name === "string"
        ? userMetadata.name
        : null;
  const metadataAvatar =
    typeof userMetadata.avatar_url === "string"
      ? userMetadata.avatar_url
      : typeof userMetadata.picture === "string"
        ? userMetadata.picture
        : null;

  const profileStatus = approvedUser && !approvalError ? "approved" : "pending";

  const { error: profileError } = await admin.from("profiles").upsert(
    {
      id: user.id,
      email,
      full_name: approvedUser?.full_name ?? metadataName,
      role: approvedUser?.role ?? null,
      department: approvedUser?.department ?? null,
      title: approvedUser?.title ?? null,
      avatar_url: metadataAvatar,
      status: profileStatus,
      updated_at: new Date().toISOString(),
    },
    { onConflict: "id" },
  );

  if (profileError) {
    redirect("/access-pending/?reason=profile-sync");
  }

  if (!approvedUser || approvalError) {
    redirect("/access-pending/?reason=pending");
  }

  redirect(next);
}
