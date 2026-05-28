export type RoleId =
  | "master-admin"
  | "admin"
  | "lo-development-lead"
  | "lo-development-member"
  | "corporate-coach"
  | "team-leader"
  | "marketing"
  | "loan-officer-support"
  | "coaching-member-level-1"
  | "coaching-member-level-2"
  | "loan-officer"
  | "support-staff";

export type Role = {
  id: RoleId;
  name: string;
  group: string;
  description: string;
  dashboardHref: string;
  highlights: string[];
};

export const roles: Role[] = [
  {
    id: "master-admin",
    name: "Master Admin",
    group: "Admin",
    description:
      "Full platform access including user management, all admin areas, and system settings.",
    dashboardHref: "/admin/",
    highlights: [
      "Full platform access",
      "User and role management",
      "All admin controls",
      "System settings",
    ],
  },
  {
    id: "admin",
    name: "Admin",
    group: "Admin",
    description:
      "Platform overview for senior admins with near-full operational access.",
    dashboardHref: "/admin/",
    highlights: [
      "Platform overview",
      "Content and admin links",
      "Moderation and review",
      "User directory",
    ],
  },
  {
    id: "lo-development-lead",
    name: "LO Development Lead",
    group: "LO Development",
    description:
      "LO Development leadership access with coaching visibility and training direction.",
    dashboardHref: "/resources/",
    highlights: [
      "LO Development resources",
      "Feedback review",
      "Coaching visibility",
      "Training direction",
    ],
  },
  {
    id: "lo-development-member",
    name: "LO Development",
    group: "LO Development",
    description:
      "LO Development contributor access for assigned sections and resources.",
    dashboardHref: "/resources/",
    highlights: [
      "Assigned sections",
      "Training resources",
      "Support tools",
      "Coaching resources",
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
    dashboardHref: "/facegram/",
    highlights: [
      "FaceGram content review",
      "Approved adaptation concepts",
      "Compliance notes",
      "Marketing resource paths",
    ],
  },
  {
    id: "loan-officer-support",
    name: "Loan Officer Support",
    group: "Loan Officer Support",
    description:
      "Support resources, lender escalation review, and help area access.",
    dashboardHref: "/support-routing/",
    highlights: [
      "Support routing",
      "Lender escalation review",
      "Help areas",
      "User support tools",
    ],
  },
  {
    id: "coaching-member-level-1",
    name: "LO Mastery Coaching",
    group: "Coaching Member",
    description:
      "LO Mastery Coaching member resources at the $249 access level.",
    dashboardHref: "/lo-mastery-coaching/",
    highlights: [
      "LO Mastery resources",
      "Coaching sessions",
      "Sales & Marketing training",
      "AI Advantage",
    ],
  },
  {
    id: "coaching-member-level-2",
    name: "Loan Factory Alliance",
    group: "Coaching Member",
    description:
      "Loan Factory Alliance member resources at the $449 access level.",
    dashboardHref: "/loan-factory-alliance/",
    highlights: [
      "Alliance resources",
      "Advanced coaching",
      "Full training library",
      "AI Advantage",
    ],
  },
  {
    id: "loan-officer",
    name: "Loan Officer",
    group: "Loan Officer",
    description:
      "Coaching, Sales & Marketing, AI Advantage, FaceGram, AI Assistants, and Resources.",
    dashboardHref: "/",
    highlights: [
      "Sales & Marketing 101-601",
      "LO Mastery Coaching",
      "AI Advantage",
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
  "This sign-in is a local role view for this browser. Real account security remains the production path.";
