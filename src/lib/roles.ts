export type RoleId =
  | "admin"
  | "corporate-coach"
  | "team-leader"
  | "marketing"
  | "loan-officer"
  | "support-staff";

export type Role = {
  id: RoleId;
  name: string;
  group:
    | "Admin"
    | "Corporate Coach"
    | "Team Leader"
    | "Marketing"
    | "Loan Officer"
    | "Support Staff";
  description: string;
  dashboardHref: string;
  highlights: string[];
};

export const roles: Role[] = [
  {
    id: "admin",
    name: "Admin",
    group: "Admin",
    description:
      "Platform overview for Jeremy, Andre, Tara, Benjamin, Edward, Kevin, and approved admin users.",
    dashboardHref: "/resources/",
    highlights: [
      "Platform overview",
      "Content and admin links",
      "Moderation and review concepts",
      "User and support directory",
    ],
  },
  {
    id: "corporate-coach",
    name: "Corporate Coach",
    group: "Corporate Coach",
    description:
      "Coaching resources, Apex coaching area, recordings, scripts, and trackers.",
    dashboardHref: "/apex-member-area/",
    highlights: [
      "Apex coaching area",
      "Recordings and scripts",
      "Trackers and scorecards",
      "Coach guide",
    ],
  },
  {
    id: "team-leader",
    name: "Team Leader",
    group: "Team Leader",
    description:
      "Team growth, 1+1+1=5 planning, training progress, and resource sharing.",
    dashboardHref: "/team-leader-guide/",
    highlights: [
      "Team Leader Guide",
      "1+1+1=5 growth",
      "Training progress",
      "Resource sharing",
    ],
  },
  {
    id: "marketing",
    name: "Marketing",
    group: "Marketing",
    description:
      "Review queue concepts, FaceGram content review, and approved adaptation resources.",
    dashboardHref: "/creator-network/",
    highlights: [
      "FaceGram content review",
      "Approved adaptation concepts",
      "Compliance notes",
      "Marketing resource paths",
    ],
  },
  {
    id: "loan-officer",
    name: "Loan Officer",
    group: "Loan Officer",
    description:
      "Apex Advisor, Sales & Marketing, AI Training, FaceGram, AI Assistants, and Resources.",
    dashboardHref: "/",
    highlights: [
      "Sales & Marketing 101-601",
      "Apex Advisor",
      "AI Training",
      "FaceGram",
    ],
  },
  {
    id: "support-staff",
    name: "Support Staff",
    group: "Support Staff",
    description:
      "Support routing, resource directory, and request intake concepts.",
    dashboardHref: "/support-routing/",
    highlights: [
      "Support routing",
      "Resource directory",
      "Platform suggestions",
      "Anonymous feedback path",
    ],
  },
];

const COACH_GUIDE_ACCESS: RoleId[] = [
  "admin",
  "corporate-coach",
  "marketing",
];

const TEAM_LEADER_GUIDE_ACCESS: RoleId[] = [
  "admin",
  "corporate-coach",
  "team-leader",
  "marketing",
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

export function isRoleId(value: string | null): value is RoleId {
  return roles.some((role) => role.id === value);
}

export const ROLE_STORAGE_KEY = "lf_role_preview";

export const ROLE_PREVIEW_DISCLAIMER =
  "This sign-in is a local role preview for this browser. Real account security will be added later.";
