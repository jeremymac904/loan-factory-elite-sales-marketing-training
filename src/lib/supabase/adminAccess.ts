import { isBetaPreviewEnabled } from "@/lib/betaPreview";
import { createSupabaseAdminClient } from "@/lib/supabase/admin";
import { isAdminRole } from "@/lib/supabase/auth";
import { getBetaUserSession } from "@/lib/supabase/session";

export type AdminAccessResult =
  | {
      allowed: true;
      reason: "preview" | "profile" | "approved_users" | "user_roles";
      resolvedRole: string | null;
      resolvedEmail: string | null;
    }
  | {
      allowed: false;
      reason:
        | "signed-out"
        | "no-email"
        | "not-configured"
        | "not-admin";
      resolvedRole: string | null;
      resolvedEmail: string | null;
    };

/**
 * Resolves admin access by checking multiple sources in order:
 * 1. Beta preview mode (internal review)
 * 2. session.profile.role from getBetaUserSession()
 * 3. approved_users table by email (case-insensitive)
 * 4. user_roles join table (multi-role)
 *
 * This makes the guard robust against transient session/cookie issues
 * that can cause the standard session lookup to return "pending" even
 * when the user is approved in the database.
 */
export async function resolveAdminAccess(): Promise<AdminAccessResult> {
  const previewEnabled = await isBetaPreviewEnabled();
  if (previewEnabled) {
    return {
      allowed: true,
      reason: "preview",
      resolvedRole: "preview_admin",
      resolvedEmail: null,
    };
  }

  const session = await getBetaUserSession();

  if (session.status === "not-configured") {
    return {
      allowed: false,
      reason: "not-configured",
      resolvedRole: null,
      resolvedEmail: null,
    };
  }

  if (session.status === "signed-out") {
    return {
      allowed: false,
      reason: "signed-out",
      resolvedRole: null,
      resolvedEmail: null,
    };
  }

  const userEmail = session.user?.email?.toLowerCase().trim() ?? null;

  if (!userEmail) {
    return {
      allowed: false,
      reason: "no-email",
      resolvedRole: null,
      resolvedEmail: null,
    };
  }

  if (session.status === "approved" && isAdminRole(session.profile.role)) {
    return {
      allowed: true,
      reason: "profile",
      resolvedRole: session.profile.role,
      resolvedEmail: userEmail,
    };
  }

  const admin = createSupabaseAdminClient();

  if (admin) {
    const { data: approvedUser } = await admin
      .from("approved_users")
      .select("email,role,active")
      .ilike("email", userEmail)
      .eq("active", true)
      .maybeSingle<{ email: string; role: string; active: boolean }>();

    if (approvedUser && isAdminRole(approvedUser.role)) {
      return {
        allowed: true,
        reason: "approved_users",
        resolvedRole: approvedUser.role,
        resolvedEmail: userEmail,
      };
    }

    const { data: userRoles } = await admin
      .from("user_roles")
      .select("role")
      .ilike("user_email", userEmail);

    const adminRow = userRoles?.find((r) => isAdminRole(r.role));
    if (adminRow) {
      return {
        allowed: true,
        reason: "user_roles",
        resolvedRole: adminRow.role,
        resolvedEmail: userEmail,
      };
    }
  }

  const profileRole =
    session.status === "approved" ? session.profile.role : null;

  return {
    allowed: false,
    reason: "not-admin",
    resolvedRole: profileRole,
    resolvedEmail: userEmail,
  };
}
