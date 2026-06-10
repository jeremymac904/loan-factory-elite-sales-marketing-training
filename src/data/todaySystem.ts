export type TodayDay = {
  key: string;
  day: string;
  theme: string;
  instruction: string;
  script: string;
};

/**
 * Today is the ONLY place activity is entered. Every weekday collects the same
 * count fields — one per scorecard metric — so a saved day IS that day's
 * scorecard column. Labels must match scorecard metric names exactly.
 */
export const dailyCountFields = [
  "Real conversations",
  "Realtor conversations",
  "Past client touches",
  "Referrals requested",
  "Applications taken",
  "Pre approvals issued",
  "Contracts received",
  "Closings",
] as const;

export const NOTE_FIELD = "Notes";
export const STUCK_FIELD = "Stuck point";
export const WIN_FIELD = "Biggest win";
export const FOCUS_FIELD = "Next week focus";
export const PLAN_FIELD = "Next week plan";

export const todayDays: TodayDay[] = [
  {
    key: "monday",
    day: "Monday",
    theme: "Power Block",
    instruction: "Protect your focused block before the day gets loud, then log the numbers.",
    script: "Past Client Check In",
  },
  {
    key: "tuesday",
    day: "Tuesday",
    theme: "Follow Up",
    instruction: "No lead, borrower, Realtor, or open file sits without a next action.",
    script: "Follow Up Restart",
  },
  {
    key: "wednesday",
    day: "Wednesday",
    theme: "Realtor Growth",
    instruction: "Build relationships before you need referrals.",
    script: "Realtor First Call",
  },
  {
    key: "thursday",
    day: "Thursday",
    theme: "Pipeline and Conversion",
    instruction: "Know what is moving, what is stuck, and what needs a decision.",
    script: "Rate Shopper Redirect",
  },
  {
    key: "friday",
    day: "Friday",
    theme: "Scorecard and Coaching Review",
    instruction: "Log today, add your win and next week focus, then submit the week from the scorecard.",
    script: "Referral Ask",
  },
  {
    key: "weekend",
    day: "Weekend",
    theme: "Plan and Reset",
    instruction: "Set the next week before Monday starts.",
    script: "Buyer Consultation",
  },
];

export function currentDayKey(date: Date = new Date()) {
  const index = date.getDay();
  return ["weekend", "monday", "tuesday", "wednesday", "thursday", "friday", "weekend"][index];
}
