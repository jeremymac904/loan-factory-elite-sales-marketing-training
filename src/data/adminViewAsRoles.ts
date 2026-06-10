export type AdminViewAsRole = { value: string; label: string };

/**
 * View As simulates the four BUSINESS experiences, not database permissions.
 * Internal role variants (coaching manager, coach support, supervisors, team
 * leaders, per-program coach roles) are intentionally NOT offered here — they
 * all collapse into the Coach experience for review purposes.
 */
export const adminViewAsRoles: AdminViewAsRole[] = [
  { value: "master_admin", label: "Master Admin" },
  { value: "corporate_coach", label: "Coach" },
  { value: "coaching_member_level_1", label: "LO Mastery Member" },
  { value: "coaching_member_level_2", label: "Loan Factory Alliance Member" },
];

export const allowedViewAsRoleValues = new Set(
  adminViewAsRoles.map((role) => role.value),
);

/**
 * Collapse any internal/database role onto the business experience it
 * represents. Returns null when the role has no coaching business experience
 * (those seeded users are hidden from the View As user picker).
 */
export function normalizeViewAsRole(role: string): string | null {
  if (allowedViewAsRoleValues.has(role)) return role;

  switch (role) {
    case "admin":
      return "master_admin";
    case "coaching_director":
    case "lo_development_lead":
    case "lo_development_member":
    case "corporate_coach_supervisor":
    case "lo_mastery_coach":
    case "loan_factory_alliance_coach":
    case "team_leader":
      return "corporate_coach";
    default:
      return null;
  }
}
