export type TrackerSection = {
  name: string;
  description: string;
  fields: { label: string; type: "number" | "yes_no" | "text" | "list" }[];
};

export const trackerSections: TrackerSection[] = [
  {
    name: "Activity",
    description:
      "Raw activity drives everything. Track the inputs you can control.",
    fields: [
      { label: "Conversations this week", type: "number" },
      { label: "Pre quals started", type: "number" },
      { label: "Applications submitted", type: "number" },
      { label: "Pre approvals issued", type: "number" },
      { label: "Closings", type: "number" },
    ],
  },
  {
    name: "Content output",
    description: "What you published this week.",
    fields: [
      { label: "Short videos posted", type: "number" },
      { label: "Social posts published", type: "number" },
      { label: "Google Business Profile posts", type: "number" },
      { label: "Newsletter sent", type: "yes_no" },
      { label: "Reviews requested", type: "number" },
      { label: "Reviews received", type: "number" },
    ],
  },
  {
    name: "Partner outreach",
    description: "The partner pipeline that drives the next 90 days.",
    fields: [
      { label: "New partner outreaches", type: "number" },
      { label: "Partner meetings booked", type: "number" },
      { label: "Partner meetings held", type: "number" },
      { label: "Active deals from named partners", type: "number" },
    ],
  },
  {
    name: "Borrower follow up",
    description: "The follow up cadence that protects the pipeline.",
    fields: [
      { label: "Follow up touches sent", type: "number" },
      { label: "Replies received", type: "number" },
      {
        label: "Top reasons for no response (your best guess)",
        type: "list",
      },
    ],
  },
  {
    name: "AI workflow usage",
    description: "Which prompts you actually ran this week.",
    fields: [
      { label: "Prompts used this week", type: "list" },
      { label: "One specific time AI saved you time", type: "text" },
      { label: "One specific time AI sounded off and you rewrote it", type: "text" },
    ],
  },
  {
    name: "Assignment completion",
    description: "Did you finish this week's module work.",
    fields: [
      { label: "101 assignment", type: "yes_no" },
      { label: "Current week module assignment", type: "yes_no" },
    ],
  },
  {
    name: "Next week commitments",
    description: "Three commitments. No more.",
    fields: [
      { label: "One activity change", type: "text" },
      { label: "One process change", type: "text" },
      { label: "One personal commitment", type: "text" },
    ],
  },
];

export const trackerCsvHeaders = [
  "week_ending",
  "lo_name",
  "team",
  "conversations",
  "pre_quals_started",
  "applications_submitted",
  "pre_approvals_issued",
  "closings",
  "short_videos_posted",
  "social_posts",
  "gbp_posts",
  "newsletter_sent",
  "reviews_requested",
  "reviews_received",
  "partner_outreaches",
  "partner_meetings_booked",
  "partner_meetings_held",
  "active_partner_deals",
  "follow_up_touches",
  "replies_received",
  "prompts_used",
  "ai_save_example",
  "ai_off_example",
  "assignment_101",
  "assignment_current_module",
  "next_week_activity_change",
  "next_week_process_change",
  "next_week_personal_commitment",
];
