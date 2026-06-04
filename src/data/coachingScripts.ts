export type CoachingScriptCategoryId =
  | "member-rhythm"
  | "coach-follow-up"
  | "growth-conversation"
  | "leadership";

export type CoachingScriptCategory = {
  id: CoachingScriptCategoryId;
  title: string;
  description: string;
};

export type CoachingScript = {
  id: string;
  category: CoachingScriptCategoryId;
  title: string;
  whoFor: string;
  purpose: string;
  body: string;
  accessTier: "member" | "alliance" | "coach";
  sourceFolder: "01_Thuan_Slide_Deck" | "02_Complete_Coaching_Program";
  sourceFileName?: string;
  anchor?: string;
};

export const coachingScriptCategories: CoachingScriptCategory[] = [
  {
    id: "member-rhythm",
    title: "Member rhythm",
    description:
      "Short prompts for the weekly rhythm, scorecards, and the next action.",
  },
  {
    id: "coach-follow-up",
    title: "Coach follow-up",
    description:
      "Coach-facing prompts for notes, reminders, and session prep.",
  },
  {
    id: "growth-conversation",
    title: "Growth conversation",
    description:
      "Prompts for business planning, realtor growth, and accountability conversations.",
  },
  {
    id: "leadership",
    title: "Leadership",
    description:
      "Manager and admin prompts for program reviews and next-step planning.",
  },
];

export const coachingScripts: CoachingScript[] = [
  {
    id: "scorecard-reminder",
    category: "member-rhythm",
    title: "Weekly scorecard reminder",
    whoFor: "LO Mastery and Alliance members",
    purpose:
      "Ask for the weekly scorecard before the next coaching review without sounding heavy.",
    body:
      "[Name], your weekly scorecard is due before [date]. Please send conversations, partner touches, past-client touches, pipeline follow-up, wins, stuck points, and the commitment you want to keep for next week. Once I have it, we can focus on decisions instead of reconstruction.",
    accessTier: "member",
    sourceFolder: "02_Complete_Coaching_Program",
    sourceFileName: "LO_Weekly_Activity_Tracker_Form_Spec.md",
    anchor: "scorecard-reminder",
  },
  {
    id: "daily-time-blocker",
    category: "member-rhythm",
    title: "Daily time blocker reset",
    whoFor: "Members and coaches",
    purpose:
      "Recenter the day around one tight block for calls, follow-up, and the next action.",
    body:
      "Protect a focused block before the day gets full. Put calls, follow-up, and the one thing you must finish into that block first. If the calendar fills up before that block is protected, the week will drift.",
    accessTier: "member",
    sourceFolder: "02_Complete_Coaching_Program",
    anchor: "daily-time-blocker",
  },
  {
    id: "theme-days",
    category: "member-rhythm",
    title: "Theme days planner prompt",
    whoFor: "Members and coaches",
    purpose:
      "Keep the week narrow by giving each day one focus and one measurable outcome.",
    body:
      "Pick one theme for each day. Example: Monday = calls, Tuesday = follow-up, Wednesday = partner growth, Thursday = pipeline, Friday = review. The point is not more tasks. The point is a narrow, repeatable week.",
    accessTier: "member",
    sourceFolder: "02_Complete_Coaching_Program",
    anchor: "theme-days-planner",
  },
  {
    id: "weekly-action-plan",
    category: "member-rhythm",
    title: "Weekly action plan",
    whoFor: "Members and coaches",
    purpose:
      "Turn the week into three priorities and the daily actions that support them.",
    body:
      "Keep the plan to three priorities. For each one, write the daily action, the due date, and the follow-up check. If a task does not support one of the three priorities, it does not belong in this week.",
    accessTier: "member",
    sourceFolder: "02_Complete_Coaching_Program",
    anchor: "weekly-action-plan",
  },
  {
    id: "coach-note-opener",
    category: "coach-follow-up",
    title: "Coach note opener",
    whoFor: "Coaches and coaching managers",
    purpose:
      "Open a coaching note with the one thing that mattered most in the session.",
    body:
      "Start with the main observation, then write the evidence, the decision, and the next follow-up date. Keep the note short enough that another coach can understand the next step in under a minute.",
    accessTier: "coach",
    sourceFolder: "02_Complete_Coaching_Program",
    sourceFileName: "Coaching_Session_Notes_Form_Spec.md",
    anchor: "coach-notes",
  },
  {
    id: "missed-scorecard",
    category: "coach-follow-up",
    title: "Missed scorecard nudge",
    whoFor: "Coaches and coaching managers",
    purpose:
      "Reset the scorecard without shaming the member or widening the conversation.",
    body:
      "[Name], I did not get your scorecard yet. Please send the current week before our next call so we can focus on the next decision. If you hit a block, reply with the block and I will help you clear it.",
    accessTier: "coach",
    sourceFolder: "02_Complete_Coaching_Program",
    anchor: "scorecard-reminder",
  },
  {
    id: "session-recap",
    category: "coach-follow-up",
    title: "Session recap",
    whoFor: "Coaches and coaching managers",
    purpose:
      "Summarize the coaching session in a way that keeps the next step obvious.",
    body:
      "Recap the win, the stuck point, the one commitment, and the date you will review it again. If the recap cannot be understood in one read, tighten it.",
    accessTier: "coach",
    sourceFolder: "02_Complete_Coaching_Program",
    anchor: "session-recap",
  },
  {
    id: "business-plan-checkin",
    category: "growth-conversation",
    title: "Business plan check-in",
    whoFor: "Alliance members and coaching managers",
    purpose:
      "Keep the business plan connected to the weekly actions instead of staying theoretical.",
    body:
      "What changed this week, what moved the business forward, and what still needs a tighter plan? If the weekly actions are not moving the plan, the plan is too big or the weekly actions are too vague.",
    accessTier: "alliance",
    sourceFolder: "02_Complete_Coaching_Program",
    anchor: "business-plan-roadmap",
  },
  {
    id: "realtor-growth",
    category: "growth-conversation",
    title: "Realtor growth follow-up",
    whoFor: "Alliance members, coaches, and coaching managers",
    purpose:
      "Make the next partner conversation simple and useful.",
    body:
      "Thanks again for the time. I wanted to follow up on the one thing we discussed and set the next step. If the best next step is a short check-in next week, I can hold that open.",
    accessTier: "alliance",
    sourceFolder: "02_Complete_Coaching_Program",
    anchor: "realtor-growth-system",
  },
  {
    id: "member-accountability",
    category: "growth-conversation",
    title: "Member accountability check-in",
    whoFor: "Coaches and coaching managers",
    purpose:
      "Keep the accountability conversation direct and useful.",
    body:
      "We are only looking for one thing this week: what did you commit to, what got in the way, and what is the next action you are going to finish before our next call?",
    accessTier: "coach",
    sourceFolder: "02_Complete_Coaching_Program",
    anchor: "member-accountability-tracker",
  },
  {
    id: "manager-review",
    category: "leadership",
    title: "Coaching manager review",
    whoFor: "Coaching managers and admin",
    purpose:
      "Summarize program status, participation, and the next priority for leadership review.",
    body:
      "Give the short version: current program status, who needs attention, what is on track, and the single next move that will keep the coaching program simple and focused.",
    accessTier: "coach",
    sourceFolder: "02_Complete_Coaching_Program",
    sourceFileName: "Loan_Factory_Coaching_Platform_Master_Strategy.pdf",
    anchor: "manager-review",
  },
];

export function getCoachingScriptsByCategory() {
  return coachingScriptCategories.map((category) => ({
    ...category,
    scripts: coachingScripts.filter((script) => script.category === category.id),
  }));
}
