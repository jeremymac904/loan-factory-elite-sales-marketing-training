export type TodayField = {
  label: string;
  kind: "text" | "number" | "long";
};

export type TodayDay = {
  key: string;
  day: string;
  theme: string;
  instruction: string;
  fields: TodayField[];
  script: string;
  tracker: string;
  communityPrompt: string;
};

export const todayDays: TodayDay[] = [
  {
    key: "monday",
    day: "Monday",
    theme: "Power Block",
    instruction: "Protect your focused work block before the day gets loud.",
    fields: [
      { label: "Start time", kind: "text" },
      { label: "End time", kind: "text" },
      { label: "Top three calls", kind: "long" },
      { label: "Top three follow ups", kind: "long" },
      { label: "One stuck point", kind: "text" },
      { label: "One win", kind: "text" },
    ],
    script: "Past Client Check In",
    tracker: "Daily Execution Tracker",
    communityPrompt: "Post your Power Block window so another member can hold you to it.",
  },
  {
    key: "tuesday",
    day: "Tuesday",
    theme: "Follow Up",
    instruction: "No lead, borrower, Realtor, or open file should be sitting without a next action.",
    fields: [
      { label: "Borrowers followed up", kind: "number" },
      { label: "Realtors followed up", kind: "number" },
      { label: "Past clients touched", kind: "number" },
      { label: "Open files reviewed", kind: "number" },
      { label: "Next actions created", kind: "number" },
      { label: "Missed opportunities", kind: "long" },
    ],
    script: "Follow Up Restart",
    tracker: "Follow Up Tracker",
    communityPrompt: "What follow-up needs a next action before the day ends?",
  },
  {
    key: "wednesday",
    day: "Wednesday",
    theme: "Realtor Growth",
    instruction: "Build relationships before you need referrals.",
    fields: [
      { label: "Realtors contacted", kind: "number" },
      { label: "Coffee or lunch invites", kind: "number" },
      { label: "Value items sent", kind: "number" },
      { label: "Agent problems heard", kind: "long" },
      { label: "Follow up dates", kind: "long" },
      { label: "Referral opportunities", kind: "long" },
    ],
    script: "Realtor First Call",
    tracker: "Realtor Relationship Tracker",
    communityPrompt: "Share one agent problem you heard today and how you can solve it.",
  },
  {
    key: "thursday",
    day: "Thursday",
    theme: "Pipeline and Conversion",
    instruction: "Know what is moving, what is stuck, and what needs a decision.",
    fields: [
      { label: "Active leads", kind: "number" },
      { label: "Pre approvals", kind: "number" },
      { label: "Contracts", kind: "number" },
      { label: "Stuck files", kind: "long" },
      { label: "Conversion obstacles", kind: "long" },
      { label: "Deals that need coaching", kind: "long" },
    ],
    script: "Rate Shopper Redirect",
    tracker: "Deal Flow Tracker",
    communityPrompt: "Post one stuck file. What is the decision it is waiting on?",
  },
  {
    key: "friday",
    day: "Friday",
    theme: "Scorecard and Coaching Review",
    instruction: "Submit the week so your coach can help you improve next week.",
    fields: [
      { label: "Total real conversations", kind: "number" },
      { label: "Realtor conversations", kind: "number" },
      { label: "Past client touches", kind: "number" },
      { label: "Referrals requested", kind: "number" },
      { label: "Applications taken", kind: "number" },
      { label: "Pre approvals issued", kind: "number" },
      { label: "Contracts received", kind: "number" },
      { label: "Biggest win", kind: "long" },
      { label: "Biggest stuck point", kind: "long" },
      { label: "Next week focus", kind: "long" },
    ],
    script: "Referral Ask",
    tracker: "Daily Execution Tracker",
    communityPrompt: "Post your biggest win of the week in Wins.",
  },
  {
    key: "weekend",
    day: "Weekend",
    theme: "Plan and Reset",
    instruction: "Set the next week before Monday starts.",
    fields: [
      { label: "Next week top goal", kind: "text" },
      { label: "Top five borrower follow ups", kind: "long" },
      { label: "Top five Realtor follow ups", kind: "long" },
      { label: "One script to practice", kind: "text" },
      { label: "One system to fix", kind: "text" },
      { label: "One calendar block to protect", kind: "text" },
    ],
    script: "Buyer Consultation",
    tracker: "Daily Execution Tracker",
    communityPrompt: "Share your top goal for next week so your coach sees it early.",
  },
];

export function currentDayKey(date: Date = new Date()) {
  const index = date.getDay();
  return ["weekend", "monday", "tuesday", "wednesday", "thursday", "friday", "weekend"][index];
}
