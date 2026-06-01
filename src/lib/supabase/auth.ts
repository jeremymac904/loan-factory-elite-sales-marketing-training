import type { GatedSurface } from "@/lib/roles";

export type BetaRole =
  | "master_admin"
  | "admin"
  | "lo_development_lead"
  | "lo_development_member"
  | "lo_development"
  | "training_academy"
  | "loan_officer_support"
  | "corporate_coach"
  | "corporate_coach_supervisor"
  | "lo_mastery_coach"
  | "loan_factory_alliance_coach"
  | "coaching_director"
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
  lo_development_member: "LO Development Member",
  // Legacy alias: a 20260527 migration seeds 'lo_development'. Keep this key so
  // those rows resolve; treat it the same as lo_development_member. Canonical
  // going forward is lo_development_lead + lo_development_member.
  // See docs/role-model/role-aliases.md.
  lo_development: "LO Development",
  training_academy: "Training Academy",
  loan_officer_support: "Loan Officer Support",
  corporate_coach: "Corporate Coach",
  corporate_coach_supervisor: "Corporate Coach Supervisor",
  lo_mastery_coach: "LO Mastery Coach",
  loan_factory_alliance_coach: "Loan Factory Alliance Coach",
  coaching_director: "Coaching Director",
  marketing: "Marketing",
  team_leader: "Team Leader",
  coaching_member_level_1: "LO Mastery Member",
  coaching_member_level_2: "Loan Factory Alliance Member",
  loan_officer: "Loan Officer",
  support_staff: "Support Staff",
  vendor_partner_future: "Vendor Partner (Future)",
};

export const roleDashboardHrefs: Record<string, string> = {
  master_admin: "/admin/",
  admin: "/admin/",
  lo_development_lead: "/lo-development/",
  lo_development_member: "/lo-development/",
  lo_development: "/lo-development/",
  training_academy: "/training-academy/",
  loan_officer_support: "/loan-officer-support/",
  corporate_coach: "/coach-command-center/",
  corporate_coach_supervisor: "/coach-command-center/",
  lo_mastery_coach: "/coach-command-center/",
  loan_factory_alliance_coach: "/coach-command-center/",
  coaching_director: "/coach-command-center/",
  marketing: "/marketing/",
  team_leader: "/team-leader-guide/",
  coaching_member_level_1: "/member-area/lo-mastery/",
  coaching_member_level_2: "/member-area/alliance/",
  loan_officer: "/normal-lo/",
  support_staff: "/loan-officer-support/",
  vendor_partner_future: "/access-pending/",
};

export function getRoleLabel(role: string | null | undefined): string {
  if (!role) return "Pending";
  return roleLabels[role] ?? role.replaceAll("_", " ");
}

export function getRoleDashboardHref(role: string | null | undefined): string {
  if (!role) return "/profile/";
  return roleDashboardHrefs[role] ?? "/profile/";
}

export function isApprovedProfile(
  profile: ProfileRow | null | undefined,
): profile is ProfileRow & { role: string; status: "approved" } {
  return profile?.status === "approved" && Boolean(profile.role);
}

const ADMIN_ROLES = ["master_admin", "admin", "lo_development_lead"];
const COACH_ROLES = [
  "corporate_coach",
  "corporate_coach_supervisor",
  "lo_mastery_coach",
  "loan_factory_alliance_coach",
  "coaching_director",
  "team_leader",
  "lo_development_member",
  "training_academy",
];
const COACH_LEADERSHIP_ROLES = [
  "corporate_coach_supervisor",
  "lo_mastery_coach",
  "loan_factory_alliance_coach",
  "coaching_director",
];

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
    return (
      Boolean(permissions?.can_access_coaching) ||
      COACH_ROLES.includes(profile.role ?? "") ||
      COACH_LEADERSHIP_ROLES.includes(profile.role ?? "")
    );
  }

  if (gate === "team-leader-guide") {
    return [
      "corporate_coach",
      "corporate_coach_supervisor",
      "coaching_director",
      "lo_mastery_coach",
      "loan_factory_alliance_coach",
      "lo_development",
      "lo_development_member",
      "lo_development_lead",
      "training_academy",
      "team_leader",
    ].includes(profile.role ?? "");
  }

  if (gate === "admin") {
    return Boolean(permissions?.can_access_admin || isAdminRole(profile.role));
  }

  if (gate === "dashboard" || gate === "resources") {
    return true;
  }

  if (gate === "coach-center") {
    return (
      COACH_ROLES.includes(profile.role ?? "") ||
      Boolean(permissions?.can_access_coaching)
    );
  }

  if (gate === "member-area") {
    return [
      "coaching_member_level_1",
      "coaching_member_level_2",
      "lo_development_lead",
      "lo_development_member",
      "training_academy",
      "corporate_coach",
      "corporate_coach_supervisor",
      "coaching_director",
      "lo_mastery_coach",
      "loan_factory_alliance_coach",
    ].includes(profile.role ?? "");
  }

  if (gate === "lo-development") {
    return [
      "lo_development",
      "lo_development_lead",
      "lo_development_member",
      "training_academy",
      "loan_officer_support",
      "master_admin",
      "admin",
    ].includes(profile.role ?? "");
  }

  if (gate === "training-academy") {
    return [
      "training_academy",
      "lo_development_lead",
      "lo_development_member",
      "master_admin",
      "admin",
    ].includes(profile.role ?? "");
  }

  if (gate === "loan-officer-support" || gate === "support") {
    return [
      "loan_officer_support",
      "lo_development_lead",
      "lo_development_member",
      "master_admin",
      "admin",
    ].includes(profile.role ?? "");
  }

  if (gate === "support-routing") {
    return [
      "loan_officer",
      "loan_officer_support",
      "support_staff",
      "lo_development",
      "lo_development_lead",
      "lo_development_member",
      "master_admin",
      "admin",
    ].includes(profile.role ?? "");
  }

  if (gate === "marketing") {
    return (
      Boolean(permissions?.can_review_marketing) ||
      [
        "marketing",
        "lo_development",
        "lo_development_lead",
        "lo_development_member",
        "master_admin",
        "admin",
      ].includes(profile.role ?? "")
    );
  }

  if (gate === "normal-lo") {
    return [
      "loan_officer",
      "loan_officer_support",
      "lo_development_lead",
      "master_admin",
      "admin",
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
