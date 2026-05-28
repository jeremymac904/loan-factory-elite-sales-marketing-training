import type { GatedSurface } from "@/lib/roles";

export type BetaRole =
  | "master_admin"
  | "admin"
  | "lo_development_lead"
  | "lo_development_member"
  | "lo_development"
  | "loan_officer_support"
  | "corporate_coach"
  | "marketing"
  | "team_leader"
  | "coaching_member_level_1"
  | "coaching_member_level_2"
  | "loan_officer"
  | "support_staff"
  | "vendor_partner_future";

export type ProfileRow = {
  id: string;
  email: string;
  full_name: string | null;
  role: string | null;
  department: string | null;
  title: string | null;
  avatar_url: string | null;
  status: string | null;
  phone?: string | null;
  secondary_phone?: string | null;
  profile_url?: string | null;
  team_brand?: string | null;
  primary_role?: string | null;
  notes?: string | null;
  last_sign_in_at?: string | null;
  bio?: string | null;
  nmls?: string | null;
  states_licensed?: string[] | null;
  preferred_language?: string | null;
  timezone?: string | null;
  coaching_tier?: string | null;
  ai_twin_enabled?: boolean | null;
  profile_visibility?: string | null;
};

export type RolePermissionsRow = {
  role: string;
  can_access_admin: boolean;
  can_access_coaching: boolean;
  can_access_facegram: boolean;
  can_access_ai_assistants: boolean;
  can_access_resources: boolean;
  can_moderate_facegram: boolean;
  can_review_marketing: boolean;
  can_access_lo_development?: boolean;
  can_access_support?: boolean;
  can_access_team_leader?: boolean;
  can_manage_users?: boolean;
};

export const roleLabels: Record<string, string> = {
  master_admin: "Master Admin",
  admin: "Admin",
  lo_development_lead: "LO Development Lead",
  lo_development_member: "LO Development",
  lo_development: "LO Development",
  loan_officer_support: "Loan Officer Support",
  corporate_coach: "Corporate Coach",
  marketing: "Marketing",
  team_leader: "Team Leader",
  coaching_member_level_1: "LO Mastery Coaching",
  coaching_member_level_2: "Loan Factory Alliance",
  loan_officer: "Loan Officer",
  support_staff: "Support Staff",
  vendor_partner_future: "Vendor Partner (Future)",
};

export function getRoleLabel(role: string | null | undefined): string {
  if (!role) return "Pending";
  return roleLabels[role] ?? role.replaceAll("_", " ");
}

export function isApprovedProfile(
  profile: ProfileRow | null | undefined,
): profile is ProfileRow & { role: string; status: "approved" } {
  return profile?.status === "approved" && Boolean(profile.role);
}

const ADMIN_ROLES = ["master_admin", "admin", "lo_development_lead"];

export function isAdminRole(role: string | null | undefined): boolean {
  return Boolean(role && ADMIN_ROLES.includes(role));
}

export function canAccessGate(
  gate: GatedSurface,
  profile: ProfileRow | null | undefined,
  permissions: RolePermissionsRow | null | undefined,
): boolean {
  if (!isApprovedProfile(profile)) return false;

  if (permissions?.can_access_admin || isAdminRole(profile.role)) {
    return true;
  }

  if (gate === "coach-guide") {
    return Boolean(permissions?.can_access_coaching);
  }

  if (gate === "team-leader-guide") {
    return [
      "corporate_coach",
      "lo_development",
      "lo_development_member",
      "lo_development_lead",
      "team_leader",
    ].includes(profile.role ?? "");
  }

  if (gate === "clip-library") {
    return true;
  }

  return false;
}

export function canAccessFaceGram(
  profile: ProfileRow | null | undefined,
  permissions: RolePermissionsRow | null | undefined,
): boolean {
  if (!isApprovedProfile(profile)) return false;

  return isAdminRole(profile.role) || Boolean(permissions?.can_access_facegram);
}

export function canAccessAiAssistants(
  profile: ProfileRow | null | undefined,
  permissions: RolePermissionsRow | null | undefined,
): boolean {
  if (!isApprovedProfile(profile)) return false;

  return (
    isAdminRole(profile.role) || Boolean(permissions?.can_access_ai_assistants)
  );
}

export function getSafeNextPath(next: string | null): string {
  if (!next || !next.startsWith("/") || next.startsWith("//")) {
    return "/";
  }

  return next;
}
