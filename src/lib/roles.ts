export type RoleId =
  | "jeremy-owner-admin"
  | "andre-leadership"
  | "tara-lo-development"
  | "kevin-lo-development"
  | "benjamin-lo-development"
  | "corporate-coach"
  | "team-leader"
  | "loan-officer"
  | "marketing-reviewer";

export type Role = {
  id: RoleId;
  name: string;
  group:
    | "Owner Admin"
    | "Leadership"
    | "LO Development"
    | "Corporate Coach"
    | "Team Leader"
    | "Loan Officer"
    | "Marketing Reviewer";
  description: string;
};

export const roles: Role[] = [
  {
    id: "jeremy-owner-admin",
    name: "Jeremy McDonald",
    group: "Owner Admin",
    description: "Owner admin. Full access to every page and surface.",
  },
  {
    id: "andre-leadership",
    name: "Andre King",
    group: "Leadership",
    description: "Leadership view. Curriculum oversight and approvals.",
  },
  {
    id: "tara-lo-development",
    name: "Tara, LO Development",
    group: "LO Development",
    description: "LO Development access to coach and team leader views.",
  },
  {
    id: "kevin-lo-development",
    name: "Kevin, LO Development",
    group: "LO Development",
    description: "LO Development access to coach and team leader views.",
  },
  {
    id: "benjamin-lo-development",
    name: "Benjamin, LO Development",
    group: "LO Development",
    description: "LO Development access to coach and team leader views.",
  },
  {
    id: "corporate-coach",
    name: "Corporate Coach",
    group: "Corporate Coach",
    description: "Coach Guide access. Reviews and reinforces with LOs.",
  },
  {
    id: "team-leader",
    name: "Team Leader",
    group: "Team Leader",
    description: "Team Leader Guide access. Runs the team's weekly cadence.",
  },
  {
    id: "loan-officer",
    name: "Loan Officer",
    group: "Loan Officer",
    description: "Standard LO view. Modules, scripts, prompts, tracker, audio.",
  },
  {
    id: "marketing-reviewer",
    name: "Marketing Reviewer, Duyen",
    group: "Marketing Reviewer",
    description: "Reviews public content for compliance and brand voice.",
  },
];

const COACH_GUIDE_ACCESS: RoleId[] = [
  "jeremy-owner-admin",
  "andre-leadership",
  "tara-lo-development",
  "kevin-lo-development",
  "benjamin-lo-development",
  "corporate-coach",
  "marketing-reviewer",
];

const TEAM_LEADER_GUIDE_ACCESS: RoleId[] = [
  "jeremy-owner-admin",
  "andre-leadership",
  "tara-lo-development",
  "kevin-lo-development",
  "benjamin-lo-development",
  "corporate-coach",
  "team-leader",
  "marketing-reviewer",
];

export type GatedSurface = "coach-guide" | "team-leader-guide";

const accessByGate: Record<GatedSurface, RoleId[]> = {
  "coach-guide": COACH_GUIDE_ACCESS,
  "team-leader-guide": TEAM_LEADER_GUIDE_ACCESS,
};

export function isAllowed(gate: GatedSurface, role: RoleId | null): boolean {
  if (!role) return false;
  return accessByGate[gate].includes(role);
}

export function findRole(id: RoleId | null): Role | undefined {
  if (!id) return undefined;
  return roles.find((r) => r.id === id);
}

export const ROLE_STORAGE_KEY = "lf_role_preview";

export const ROLE_PREVIEW_DISCLAIMER =
  "Version one uses a local role preview only. Real login and role based access will be added when this moves into Loan Factory AI Advantage.";
