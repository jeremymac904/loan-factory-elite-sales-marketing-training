import type { GatedSurface } from "@/lib/roles";

export type BetaRole =
  | "admin"
  | "lo_development"
  | "marketing"
  | "corporate_coach"
  | "team_leader"
  | "loan_officer"
  | "support_staff";

export type ProfileRow = {
  id: string;
  email: string;
  full_name: string | null;
  role: string | null;
  department: string | null;
  title: string | null;
  avatar_url: string | null;
  status: string | null;
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
};

export const roleLabels: Record<string, string> = {
  admin: "Admin",
  lo_development: "LO Development",
  marketing: "Marketing",
  corporate_coach: "Corporate Coach",
  team_leader: "Team Leader",
  loan_officer: "Loan Officer",
  support_staff: "Support Staff",
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

export function canAccessGate(
  gate: GatedSurface,
  profile: ProfileRow | null | undefined,
  permissions: RolePermissionsRow | null | undefined,
): boolean {
  if (!isApprovedProfile(profile)) return false;

  if (permissions?.can_access_admin || profile?.role === "admin") {
    return true;
  }

  if (gate === "coach-guide") {
    return Boolean(permissions?.can_access_coaching);
  }

  if (gate === "team-leader-guide") {
    return ["corporate_coach", "lo_development", "team_leader"].includes(
      profile.role ?? "",
    );
  }

  return false;
}

export function canAccessFaceGram(
  profile: ProfileRow | null | undefined,
  permissions: RolePermissionsRow | null | undefined,
): boolean {
  if (!isApprovedProfile(profile)) return false;

  return profile.role === "admin" || Boolean(permissions?.can_access_facegram);
}

export function canAccessAiAssistants(
  profile: ProfileRow | null | undefined,
  permissions: RolePermissionsRow | null | undefined,
): boolean {
  if (!isApprovedProfile(profile)) return false;

  return (
    profile.role === "admin" || Boolean(permissions?.can_access_ai_assistants)
  );
}

export function getSafeNextPath(next: string | null): string {
  if (!next || !next.startsWith("/") || next.startsWith("//")) {
    return "/";
  }

  return next;
}
