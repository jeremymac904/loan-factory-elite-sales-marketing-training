export type RoleId =
  | "master-admin"
  | "admin"
  | "lo-development-lead"
  | "lo-development-member"
  | "training-academy"
  | "corporate-coach"
  | "corporate-coach-supervisor"
  | "lo-mastery-coach"
  | "loan-factory-alliance-coach"
  | "coaching-director"
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
    dashboardHref: "/lo-development/",
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
    dashboardHref: "/lo-development/",
    highlights: [
      "Assigned sections",
      "Training resources",
      "Support tools",
      "Coaching resources",
    ],
  },
  {
    id: "training-academy",
    name: "Training Academy",
    group: "LO Development",
    description:
      "Training Academy access for module assignments, lesson resources, quizzes, video reviews, and recommended next training.",
    dashboardHref: "/training-academy/",
    highlights: [
      "Training Academy dashboard",
      "Module assignments",
      "Video and resource library",
      "Assessments and handoffs",
    ],
  },
  {
    id: "corporate-coach",
    name: "Corporate Coach",
    group: "Corporate Coach",
    description:
      "Coaching resources, member progress, recordings, scripts, scorecards, and trackers.",
    dashboardHref: "/coach-command-center/",
    highlights: [
      "Coach Command Center",
      "Recordings and scripts",
      "Trackers and scorecards",
      "Coach guide",
    ],
  },
  {
    id: "corporate-coach-supervisor",
    name: "Corporate Coach Supervisor",
    group: "Coach Leadership",
    description:
      "Leadership access for corporate coach oversight, coverage, and performance review.",
    dashboardHref: "/coach-command-center/",
    highlights: [
      "Coach coverage",
      "Performance review",
      "Member progress",
      "Scorecard trends",
    ],
  },
  {
    id: "lo-mastery-coach",
    name: "LO Mastery Coach",
    group: "Coach Leadership",
    description:
      "Coach access for the LO Mastery $249 tier, weekly accountability, and member progress.",
    dashboardHref: "/coach-command-center/",
    highlights: [
      "LO Mastery coaching",
      "Weekly accountability",
      "Member progress",
      "Scorecards and notes",
    ],
  },
  {
    id: "loan-factory-alliance-coach",
    name: "Loan Factory Alliance Coach",
    group: "Coach Leadership",
    description:
      "Coach access for the Loan Factory Alliance $449 tier, advanced accountability, and member progress.",
    dashboardHref: "/coach-command-center/",
    highlights: [
      "Alliance coaching",
      "Advanced accountability",
      "Member progress",
      "Scorecards and notes",
    ],
  },
  {
    id: "coaching-director",
    name: "Coaching Director",
    group: "Coach Leadership",
    description:
      "Leadership access for coaching coverage, coach performance, scorecard trends, and roster oversight.",
    dashboardHref: "/coach-command-center/",
    highlights: [
      "Coach coverage",
      "Performance trends",
      "Roster oversight",
      "Member progress",
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
    dashboardHref: "/marketing/",
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
    name: "LO Mastery Member",
    group: "Coaching Member",
    description:
      "LO Mastery Coaching member resources at the $249 access level.",
    dashboardHref: "/member-area/lo-mastery/",
    highlights: [
      "LO Mastery resources",
      "Coaching sessions",
      "Sales & Marketing training",
      "AI Advantage",
    ],
  },
  {
    id: "coaching-member-level-2",
    name: "Loan Factory Alliance Member",
    group: "Coaching Member",
    description:
      "Loan Factory Alliance member resources at the $449 access level.",
    dashboardHref: "/member-area/alliance/",
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
    dashboardHref: "/normal-lo/",
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
  "corporate-coach-supervisor",
  "lo-mastery-coach",
  "loan-factory-alliance-coach",
  "coaching-director",
  "marketing",
];

const TEAM_LEADER_GUIDE_ACCESS: RoleId[] = [
  "admin",
  "corporate-coach",
  "corporate-coach-supervisor",
  "lo-mastery-coach",
  "loan-factory-alliance-coach",
  "coaching-director",
  "team-leader",
  "marketing",
];

const CLIP_LIBRARY_ACCESS: RoleId[] = roles.map((role) => role.id);

export type GatedSurface =
  | "admin"
  | "coach-guide"
  | "coach-center"
  | "dashboard"
  | "lo-development"
  | "loan-officer-support"
  | "member-area"
  | "normal-lo"
  | "resources"
  | "support"
  | "training-academy"
  | "team-leader-guide"
  | "clip-library";

const accessByGate: Record<GatedSurface, RoleId[]> = {
  admin: ["admin", "master-admin", "lo-development-lead"],
  "coach-guide": COACH_GUIDE_ACCESS,
  "coach-center": [
    "admin",
    "master-admin",
    "lo-development-lead",
    "lo-development-member",
    "training-academy",
    "corporate-coach",
    "corporate-coach-supervisor",
    "lo-mastery-coach",
    "loan-factory-alliance-coach",
    "coaching-director",
    "team-leader",
  ],
  dashboard: roles.map((role) => role.id),
  "lo-development": [
    "admin",
    "master-admin",
    "lo-development-lead",
    "lo-development-member",
    "training-academy",
    "loan-officer-support",
  ],
  "loan-officer-support": [
    "admin",
    "master-admin",
    "lo-development-lead",
    "lo-development-member",
    "loan-officer-support",
  ],
  "member-area": [
    "admin",
    "master-admin",
    "lo-development-lead",
    "corporate-coach",
    "corporate-coach-supervisor",
    "lo-mastery-coach",
    "loan-factory-alliance-coach",
    "coaching-director",
    "training-academy",
    "coaching-member-level-1",
    "coaching-member-level-2",
  ],
  "normal-lo": [
    "admin",
    "master-admin",
    "lo-development-lead",
    "loan-officer-support",
    "loan-officer",
  ],
  resources: roles.map((role) => role.id),
  support: [
    "admin",
    "master-admin",
    "lo-development-lead",
    "loan-officer-support",
  ],
  "training-academy": [
    "admin",
    "master-admin",
    "lo-development-lead",
    "lo-development-member",
    "training-academy",
  ],
  "team-leader-guide": TEAM_LEADER_GUIDE_ACCESS,
  "clip-library": CLIP_LIBRARY_ACCESS,
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
