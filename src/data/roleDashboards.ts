export type RoleDashboardId =
  | "master-admin"
  | "lo-development"
  | "corporate-coach"
  | "loan-officer-support"
  | "training-academy"
  | "marketing"
  | "lo-mastery-member"
  | "loan-factory-alliance-member"
  | "normal-lo";

export type RoleDashboardCard = {
  title: string;
  description: string;
  href: string;
  owner: string;
  status: "Live" | "Ready" | "Needs review" | "Sandbox first";
};

export type RoleDashboardSection = {
  title: string;
  description: string;
  cards: RoleDashboardCard[];
};

export type RoleDashboardMetric = {
  label: string;
  value: string;
};

export type RoleDashboard = {
  id: RoleDashboardId;
  eyebrow: string;
  title: string;
  description: string;
  primaryHref: string;
  primaryLabel: string;
  secondaryHref: string;
  secondaryLabel: string;
  metrics: RoleDashboardMetric[];
  sections: RoleDashboardSection[];
  nextActions: string[];
};

export const roleDashboards: RoleDashboard[] = [
  {
    id: "master-admin",
    eyebrow: "Master Admin",
    title: "Full LO Development operating console",
    description:
      "User access, role routing, content readiness, coaching operations, support ownership, and launch QA in one control layer.",
    primaryHref: "/admin/",
    primaryLabel: "Open admin",
    secondaryHref: "/admin/qa-checklist/",
    secondaryLabel: "Review launch QA",
    metrics: [
      { label: "Access model", value: "Supabase RLS" },
      { label: "Role views", value: "9 dashboards" },
      { label: "Deployment", value: "Preview first" },
    ],
    sections: [
      {
        title: "Access and operations",
        description: "Control who can enter each role surface.",
        cards: [
          {
            title: "Users and roles",
            description:
              "Review approved users, role labels, departments, and View-As walkthroughs.",
            href: "/admin/users/",
            owner: "Jeremy / Thuan",
            status: "Live",
          },
          {
            title: "Role dashboards",
            description:
              "Confirm each role lands on the correct operational dashboard.",
            href: "/admin/view-as/",
            owner: "LO Development",
            status: "Live",
          },
          {
            title: "Department routing",
            description:
              "Validate handoffs across LO Development, Support, Training Academy, Marketing, and Coaches.",
            href: "/department-routing/",
            owner: "LO Development",
            status: "Ready",
          },
        ],
      },
      {
        title: "Launch readiness",
        description: "Keep production actions behind review and approval.",
        cards: [
          {
            title: "Platform status",
            description:
              "See active launch status, environment notes, and open validation items.",
            href: "/admin/platform-status/",
            owner: "Admin",
            status: "Live",
          },
          {
            title: "QA checklist",
            description:
              "Run the final local validation checklist before any push or deploy approval.",
            href: "/admin/qa-checklist/",
            owner: "Codex / LO Development",
            status: "Ready",
          },
          {
            title: "Feedback queue",
            description:
              "Review submitted suggestions, confusing pages, and launch blockers.",
            href: "/admin/feedback/",
            owner: "LO Development",
            status: "Live",
          },
        ],
      },
    ],
    nextActions: [
      "Run local lint, typecheck, and build before handoff.",
      "Use View-As to walk every role before approving a deploy.",
      "Keep Supabase, Google, n8n, and outbound actions sandbox-first.",
    ],
  },
  {
    id: "lo-development",
    eyebrow: "LO Development",
    title: "LO Development command center",
    description:
      "The working desk for program direction, content readiness, support routing, coaching visibility, and launch follow-through.",
    primaryHref: "/training-academy/",
    primaryLabel: "Open Training Academy",
    secondaryHref: "/department-routing/",
    secondaryLabel: "Review departments",
    metrics: [
      { label: "Program", value: "101-601" },
      { label: "Libraries", value: "Scripts + clips" },
      { label: "Workflow", value: "Review gated" },
    ],
    sections: [
      {
        title: "Program buildout",
        description: "Own the training paths and source material.",
        cards: [
          {
            title: "Training Academy",
            description:
              "Assign modules, review lesson packs, and route missing resources.",
            href: "/training-academy/",
            owner: "Training Academy",
            status: "Ready",
          },
          {
            title: "Sales and Marketing 101-601",
            description:
              "Review the six-part LO training path and all companion resources.",
            href: "/sales-training/",
            owner: "LO Development",
            status: "Live",
          },
          {
            title: "Content skills",
            description:
              "Open the brand, email, PDF, deck, FaceGram, AI Advantage, and coaching output rules.",
            href: "/content-skills/",
            owner: "Jeremy",
            status: "Ready",
          },
        ],
      },
      {
        title: "Operating support",
        description: "Keep humans, resources, and QA in the loop.",
        cards: [
          {
            title: "Support routing",
            description:
              "Route common issues, first-file questions, system access, and escalation guidance.",
            href: "/loan-officer-support/",
            owner: "LO Support",
            status: "Ready",
          },
          {
            title: "Coach Command Center",
            description:
              "Review member progress, scorecards, coach notes, and assignments.",
            href: "/coach-command-center/",
            owner: "Corporate Coaches",
            status: "Live",
          },
          {
            title: "Asset readiness",
            description:
              "Use the library and checklist to identify uploads, replays, clips, and handouts still awaiting review.",
            href: "/training-library/",
            owner: "LO Development",
            status: "Needs review",
          },
        ],
      },
    ],
    nextActions: [
      "Confirm owners for every support category before live rollout.",
      "Review all public-facing copy for compliance-safe language.",
      "Promote approved internal examples into FaceGram and the library.",
    ],
  },
  {
    id: "corporate-coach",
    eyebrow: "Corporate Coach",
    title: "Coach operating dashboard",
    description:
      "A focused coach view for assignments, member progress, coaching notes, scorecards, action items, and session prep.",
    primaryHref: "/coach-command-center/",
    primaryLabel: "Open Coach Command Center",
    secondaryHref: "/member-area/",
    secondaryLabel: "Review member area",
    metrics: [
      { label: "Members", value: "Scoped" },
      { label: "Cadence", value: "Weekly" },
      { label: "Outputs", value: "Notes + actions" },
    ],
    sections: [
      {
        title: "Coach workflow",
        description: "Run the coaching rhythm without leaving the platform.",
        cards: [
          {
            title: "Member progress",
            description:
              "Review assignments, scorecards, attendance, and completion snapshots.",
            href: "/coach-command-center/member-progress/",
            owner: "Corporate Coaches",
            status: "Live",
          },
          {
            title: "Coaching notes",
            description:
              "Prepare notes, decisions, blockers, and follow-up items for each member.",
            href: "/coach-command-center/coaching-notes/",
            owner: "Corporate Coaches",
            status: "Live",
          },
          {
            title: "Training plan",
            description:
              "Recommend lessons, scripts, roleplays, and next resources by member need.",
            href: "/coach-command-center/training-plan/",
            owner: "Corporate Coaches",
            status: "Live",
          },
        ],
      },
      {
        title: "Member resources",
        description: "Open the correct tier resources during coaching.",
        cards: [
          {
            title: "LO Mastery",
            description:
              "Daily rhythm, Power Hour, scorecards, scripts, trackers, and certification path.",
            href: "/member-area/lo-mastery/",
            owner: "LO Mastery",
            status: "Live",
          },
          {
            title: "Loan Factory Alliance",
            description:
              "Breakfast Club, weekly coaching, mastermind prep, leadership track, and advanced resources.",
            href: "/member-area/alliance/",
            owner: "Alliance",
            status: "Live",
          },
          {
            title: "Recordings",
            description:
              "Find replay references, training clips, and approved coaching resources.",
            href: "/recordings/",
            owner: "Training Academy",
            status: "Live",
          },
        ],
      },
    ],
    nextActions: [
      "Use scorecards to choose the next coaching action.",
      "Assign one training resource and one activity tracker after each review.",
      "Route public or borrower-facing claims through compliance review.",
    ],
  },
  {
    id: "loan-officer-support",
    eyebrow: "Loan Officer Support",
    title: "Support triage dashboard",
    description:
      "A practical support desk for access issues, first-file questions, common workflow blockers, escalation routing, and recommended training.",
    primaryHref: "/support-routing/",
    primaryLabel: "Open support routing",
    secondaryHref: "/resources/",
    secondaryLabel: "Open resources",
    metrics: [
      { label: "Triage", value: "Issue lanes" },
      { label: "Escalation", value: "Human owned" },
      { label: "Training", value: "Linked" },
    ],
    sections: [
      {
        title: "Request lanes",
        description: "Start support in the safest lane.",
        cards: [
          {
            title: "System access issues",
            description:
              "Route sign-in, approved user, profile, View-As, and permission problems.",
            href: "/support-routing/#system-access",
            owner: "LO Support",
            status: "Ready",
          },
          {
            title: "First-file support",
            description:
              "Point new LOs to onboarding resources, first-file guidance, and escalation steps.",
            href: "/support-routing/#first-file",
            owner: "LO Support",
            status: "Ready",
          },
          {
            title: "Lender escalation",
            description:
              "Use the escalation page when a lender issue needs tracking and review.",
            href: "/lender-escalation/",
            owner: "LO Support",
            status: "Live",
          },
        ],
      },
      {
        title: "Recommended resources",
        description: "Give the LO a next step, not just an answer.",
        cards: [
          {
            title: "Training Library",
            description:
              "Send users to scripts, clips, roleplays, recordings, and prompt examples.",
            href: "/training-library/",
            owner: "Training Academy",
            status: "Live",
          },
          {
            title: "AI Assistants",
            description:
              "Use draft-only assistants for checklists, email drafts, and support summaries.",
            href: "/ai-assistants/",
            owner: "LO Development",
            status: "Sandbox first",
          },
          {
            title: "Department routing",
            description:
              "Confirm whether the issue belongs with Support, Training, Marketing, Coaching, or Admin.",
            href: "/department-routing/",
            owner: "LO Development",
            status: "Ready",
          },
        ],
      },
    ],
    nextActions: [
      "Classify every request before escalating.",
      "Link one recommended training item when closing support.",
      "Do not send borrower-visible or partner-visible messages from this platform without approval.",
    ],
  },
  {
    id: "training-academy",
    eyebrow: "Training Academy",
    title: "Training Academy dashboard",
    description:
      "Module assignments, lesson resources, completion checks, quizzes, handouts, videos, and recommended next training.",
    primaryHref: "/training-library/",
    primaryLabel: "Open library",
    secondaryHref: "/recordings/",
    secondaryLabel: "Open recordings",
    metrics: [
      { label: "Path", value: "101-601" },
      { label: "Assessments", value: "Quizzes" },
      { label: "Assets", value: "Review gated" },
    ],
    sections: [
      {
        title: "Curriculum",
        description: "Organize the LO learning path.",
        cards: [
          {
            title: "Sales and Marketing 101-601",
            description:
              "Open the full training path from Foundation through Execution System.",
            href: "/sales-training/",
            owner: "Training Academy",
            status: "Live",
          },
          {
            title: "Training path",
            description:
              "Review the suggested sequence for new LOs, experienced LOs, and coaches.",
            href: "/training-path/",
            owner: "Training Academy",
            status: "Live",
          },
          {
            title: "Assessments",
            description:
              "Use quizzes, aptitude checks, personality work, and coach review signals.",
            href: "/assessments/",
            owner: "Training Academy",
            status: "Live",
          },
        ],
      },
      {
        title: "Resource production",
        description: "Make missing assets obvious and reviewable.",
        cards: [
          {
            title: "Video library",
            description:
              "Review published YouTube embeds and training video metadata.",
            href: "/ai-training/video-library/",
            owner: "Training Academy",
            status: "Live",
          },
          {
            title: "Clip library",
            description:
              "Search short support and training clips awaiting final embeds or approval.",
            href: "/training-library/clips/",
            owner: "Training Academy",
            status: "Needs review",
          },
          {
            title: "Content skills",
            description:
              "Use output rules when creating emails, decks, PDFs, FaceGram posts, and AI training content.",
            href: "/content-skills/",
            owner: "Jeremy",
            status: "Ready",
          },
        ],
      },
    ],
    nextActions: [
      "Turn every incomplete lesson into a named asset slot.",
      "Keep missing videos and handouts visible instead of hiding them.",
      "Assign recommended next training after quizzes and support requests.",
    ],
  },
  {
    id: "marketing",
    eyebrow: "Marketing",
    title: "Marketing and content review dashboard",
    description:
      "Approved examples, FaceGram review, content skill rules, Audience Quality Panel concepts, and safe draft handling.",
    primaryHref: "/facegram/",
    primaryLabel: "Open FaceGram",
    secondaryHref: "/audience-quality-panel/",
    secondaryLabel: "Open quality panel",
    metrics: [
      { label: "Drafts", value: "Review first" },
      { label: "Channels", value: "Internal" },
      { label: "Rules", value: "Brand safe" },
    ],
    sections: [
      {
        title: "Review queues",
        description: "Keep marketing examples controlled and useful.",
        cards: [
          {
            title: "FaceGram moderation",
            description:
              "Review internal posts, group examples, saved ideas, and marketing feedback.",
            href: "/facegram/",
            owner: "Marketing",
            status: "Live",
          },
          {
            title: "Audience Quality Panel",
            description:
              "Score draft content before it becomes a public-facing marketing asset.",
            href: "/audience-quality-panel/",
            owner: "Marketing",
            status: "Ready",
          },
          {
            title: "Content skills",
            description:
              "Use the brand, email, FaceGram, deck, PDF, and video script style guides.",
            href: "/content-skills/",
            owner: "Jeremy / Marketing",
            status: "Ready",
          },
        ],
      },
      {
        title: "Creation support",
        description: "Draft internally, then review before use.",
        cards: [
          {
            title: "AI Assistant Hub",
            description:
              "Create draft-only content ideas, emails, and checklists with review labels.",
            href: "/ai-assistants/",
            owner: "Marketing",
            status: "Sandbox first",
          },
          {
            title: "Market Mentor Studio",
            description:
              "Create market updates, Realtor updates, and borrower education drafts for review.",
            href: "/market-mentor/",
            owner: "Marketing",
            status: "Ready",
          },
          {
            title: "Recommended channels",
            description:
              "Reference approved YouTube and learning channels for internal inspiration.",
            href: "/recommended-channels/",
            owner: "LO Development",
            status: "Live",
          },
        ],
      },
    ],
    nextActions: [
      "Keep draft outputs labeled as draft-only until reviewed.",
      "Promote approved examples into the Training Library.",
      "Avoid unsupported performance or income claims.",
    ],
  },
  {
    id: "lo-mastery-member",
    eyebrow: "LO Mastery Member",
    title: "LO Mastery member dashboard",
    description:
      "The $249 coaching member home for daily rhythm, group coaching, scripts, trackers, resources, and the certification path.",
    primaryHref: "/member-area/lo-mastery/",
    primaryLabel: "Open LO Mastery",
    secondaryHref: "/lo-mastery-coaching/",
    secondaryLabel: "Review program",
    metrics: [
      { label: "Membership", value: "$249/mo" },
      { label: "Cadence", value: "Biweekly" },
      { label: "Focus", value: "Consistency" },
    ],
    sections: [
      {
        title: "Daily execution",
        description: "Make the member rhythm easy to follow.",
        cards: [
          {
            title: "Power Hour",
            description:
              "Open daily prospecting rhythm, prompts, calls, and follow-up guidance.",
            href: "/calendar/",
            owner: "LO Mastery",
            status: "Ready",
          },
          {
            title: "Scripts",
            description:
              "Use approved call, follow-up, Realtor, and borrower conversation scripts.",
            href: "/scripts/",
            owner: "Training Academy",
            status: "Live",
          },
          {
            title: "Trackers",
            description:
              "Track activity, pipeline, referral partner work, and weekly accountability.",
            href: "/trackers/",
            owner: "LO Mastery",
            status: "Live",
          },
        ],
      },
      {
        title: "Coaching resources",
        description: "Everything a $249 member should reach quickly.",
        cards: [
          {
            title: "Certifications",
            description:
              "Review the Certified Mortgage Advisor path and approved display rules.",
            href: "/member-area/certifications/",
            owner: "LO Mastery",
            status: "Ready",
          },
          {
            title: "Recordings",
            description:
              "Open coaching and training recordings with clear review status.",
            href: "/member-area/recordings/",
            owner: "LO Mastery",
            status: "Live",
          },
          {
            title: "AI coaching assistant",
            description:
              "Prepare Power Hour prompts, follow-up drafts, and accountability check-ins.",
            href: "/ai-assistants/my-ai-twin/",
            owner: "LO Mastery",
            status: "Sandbox first",
          },
        ],
      },
    ],
    nextActions: [
      "Start with one daily Power Hour action.",
      "Use one approved script before creating new content.",
      "Log activity in trackers for coach review.",
    ],
  },
  {
    id: "loan-factory-alliance-member",
    eyebrow: "Loan Factory Alliance Member",
    title: "Alliance member dashboard",
    description:
      "The $449 coaching member home for weekly coaching, Breakfast Club, mastermind work, leadership growth, and advanced resources.",
    primaryHref: "/member-area/alliance/",
    primaryLabel: "Open Alliance",
    secondaryHref: "/loan-factory-alliance/",
    secondaryLabel: "Review program",
    metrics: [
      { label: "Membership", value: "$449/mo" },
      { label: "Cadence", value: "Weekly" },
      { label: "Focus", value: "Advanced" },
    ],
    sections: [
      {
        title: "Alliance rhythm",
        description: "Keep advanced coaching practical and accountable.",
        cards: [
          {
            title: "Breakfast Club",
            description:
              "Daily morning focus for wins, blockers, execution, and next steps.",
            href: "/calendar/",
            owner: "Alliance",
            status: "Ready",
          },
          {
            title: "Mastermind",
            description:
              "Prepare for biweekly mastermind sessions, hot seats, and scorecard review.",
            href: "/member-area/mastermind/",
            owner: "Alliance",
            status: "Ready",
          },
          {
            title: "Leadership track",
            description:
              "Use 1+1+1=5 planning for team growth, recruiting, and referral partner lanes.",
            href: "/one-plus-one-five/",
            owner: "Alliance",
            status: "Live",
          },
        ],
      },
      {
        title: "Advanced support",
        description: "Give Alliance members the upgraded resource path.",
        cards: [
          {
            title: "Advanced certifications",
            description:
              "Review approved specialty tracks and certification completion requirements.",
            href: "/member-area/certifications/",
            owner: "Alliance",
            status: "Ready",
          },
          {
            title: "Leaderboards",
            description:
              "Track activity and wins without unsupported production guarantees.",
            href: "/member-area/leaderboards/",
            owner: "Alliance",
            status: "Ready",
          },
          {
            title: "Market Mentor Studio",
            description:
              "Build education drafts for borrower and Realtor conversations with review gates.",
            href: "/market-mentor/",
            owner: "Alliance",
            status: "Ready",
          },
        ],
      },
    ],
    nextActions: [
      "Use mastermind prep before weekly coaching.",
      "Turn coach feedback into one measurable next action.",
      "Route borrower-facing claims through review before use.",
    ],
  },
  {
    id: "normal-lo",
    eyebrow: "Loan Officer",
    title: "Loan officer dashboard",
    description:
      "The everyday LO home for training, coaching options, AI help, FaceGram, resources, support, and safe content creation.",
    primaryHref: "/sales-training/",
    primaryLabel: "Start 101-601",
    secondaryHref: "/support-routing/",
    secondaryLabel: "Get support",
    metrics: [
      { label: "Start", value: "101" },
      { label: "Practice", value: "Scripts" },
      { label: "Help", value: "Support" },
    ],
    sections: [
      {
        title: "Core training",
        description: "Start with the fundamentals before advanced systems.",
        cards: [
          {
            title: "Sales and Marketing 101-601",
            description:
              "Follow the core path from foundation through execution system.",
            href: "/sales-training/",
            owner: "Training Academy",
            status: "Live",
          },
          {
            title: "AI Advantage",
            description:
              "Learn safe draft habits, prompt practice, and review workflows.",
            href: "/ai-training/",
            owner: "LO Development",
            status: "Live",
          },
          {
            title: "Training Library",
            description:
              "Find scripts, roleplays, prompts, recordings, clips, and handouts.",
            href: "/training-library/",
            owner: "Training Academy",
            status: "Live",
          },
        ],
      },
      {
        title: "Daily help",
        description: "Use support and community before getting stuck.",
        cards: [
          {
            title: "Support routing",
            description:
              "Find the right person for access, first-file, training, coaching, or marketing help.",
            href: "/loan-officer-support/",
            owner: "LO Support",
            status: "Ready",
          },
          {
            title: "FaceGram",
            description:
              "Use the internal community for examples, questions, wins, and approved sharing.",
            href: "/facegram/",
            owner: "Marketing",
            status: "Live",
          },
          {
            title: "Coaching options",
            description:
              "Compare LO Mastery and Loan Factory Alliance membership options.",
            href: "/coaching/",
            owner: "Corporate Coaches",
            status: "Live",
          },
        ],
      },
    ],
    nextActions: [
      "Start with the 101 Foundation lesson if you are new.",
      "Use scripts and roleplays before improvising new borrower language.",
      "Ask support or a coach when a workflow is unclear.",
    ],
  },
];

export function getRoleDashboard(id: RoleDashboardId): RoleDashboard {
  const dashboard = roleDashboards.find((item) => item.id === id);
  if (!dashboard) {
    throw new Error(`Missing role dashboard: ${id}`);
  }

  return dashboard;
}
