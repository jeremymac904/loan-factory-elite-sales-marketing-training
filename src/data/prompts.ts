import { SkillLevel } from "@/lib/utils";

export type PromptItem = {
  id: string;
  category:
    | "Call Prep"
    | "Follow Up"
    | "Realtor Outreach"
    | "Partner Meeting"
    | "Social Post"
    | "Short Video Script"
    | "Google Business Profile"
    | "Past Client"
    | "Pipeline Review"
    | "Weekly Summary"
    | "Roleplay"
    | "Niche Plan";
  module?: string;
  level: SkillLevel;
  title: string;
  useCase: string;
  body: string;
  tips?: string;
};

export const prompts: PromptItem[] = [
  {
    id: "borrower-call-prep",
    category: "Call Prep",
    module: "201",
    level: "Intermediate",
    title: "Borrower first call prep.",
    useCase:
      "Run this 5 minutes before every first call. Paste any context you have. The output is a short brief, not a script.",
    body: `You are my mortgage pre call assistant. Borrower context: [paste lead form details, any text history, any docs they've shared]. Goal: prepare me for a 15 minute first call. Deliver:
1. The three most important questions to ask first.
2. Likely concerns based on this context.
3. Two specific options I should be ready to discuss in plain language. Do not include any specific rates, payments, or fees.
4. Suggested next step to confirm before we hang up.
Tone: professional, calm, helpful.`,
    tips:
      "Run this inside your Gemini Gem AI Twin. Read the brief once before the call. Do not read from it.",
  },
  {
    id: "follow-up-email",
    category: "Follow Up",
    module: "101",
    level: "Beginner",
    title: "Personalized follow up email.",
    useCase: "Draft a clean follow up email after a borrower or partner call.",
    body: `Draft a follow up email from me to [borrower or partner]. Context: [paste]. Tone: warm, professional, no salesy language. Under 120 words. No specific rate, payment, or fee. End with one clear next step. Sign as [Name], NMLS [ID].`,
    tips: "Always review the draft. Add one specific personal detail by hand.",
  },
  {
    id: "realtor-outreach",
    category: "Realtor Outreach",
    module: "301",
    level: "Intermediate",
    title: "Personalized Realtor outreach.",
    useCase:
      "Send 5 personalized Realtor outreach messages per week. Reference something specific.",
    body: `Personalize a Realtor outreach text from me to [agent name] at [brokerage]. Context I know: [paste]. Tone: peer to peer. Lead with one specific thing about their business. Offer 15 minutes. No bragging. Under 90 words. Add NMLS [ID].`,
    tips: "Public research first. Do not use anything you cannot verify.",
  },
  {
    id: "partner-meeting-agenda",
    category: "Partner Meeting",
    module: "301",
    level: "Intermediate",
    title: "Partner first meeting agenda.",
    useCase: "Build a 20 minute meeting agenda for a new partner.",
    body: `Build a 20 minute partner meeting agenda for me and [partner]. Partner type: [Realtor or CPA or attorney or builder]. My goal: learn their business and find one specific way to be useful in the next 30 days. Output: 5 bullet agenda, three discovery questions, one suggested test we could run together.`,
  },
  {
    id: "social-post",
    category: "Social Post",
    module: "401",
    level: "Intermediate",
    title: "Social post drafts.",
    useCase:
      "Get three on brand social post drafts for one topic. Pick one, polish it, post it.",
    body: `Draft 3 short social post options for me. Topic: [topic]. Audience: [persona]. Hook formula: [bold contrarian, problem solution, or mistake reveal]. Under 100 words each. No rate, payment, or fee. Add NMLS [ID] at the end. Add a clear CTA like "DM me [keyword]".`,
    tips:
      "Run every post through the compliance safe content decision tree before publishing.",
  },
  {
    id: "short-video-script",
    category: "Short Video Script",
    module: "401",
    level: "Intermediate",
    title: "60 second video script.",
    useCase: "Generate one tight 60 second video script from a topic.",
    body: `Write a 60 second video script for me. Topic: [topic]. Audience: [persona]. Open with a 3 second hook in the [bold contrarian | specific question | problem solution] style. Middle delivers one concrete example. End with a CTA. Plain spoken language. No rate, payment, or fee. Caption friendly.`,
    tips:
      "The first three seconds drive about 80% of completion. Cut anything that does not earn its place.",
  },
  {
    id: "gbp-post",
    category: "Google Business Profile",
    module: "401",
    level: "Intermediate",
    title: "Weekly Google Business Profile post.",
    useCase: "Publish one local market post per week to your GBP.",
    body: `Draft a weekly Google Business Profile post for my mortgage broker business in [city]. Topic: [topic]. Under 80 words. Include one local detail. End with a soft CTA. No rate, payment, or fee.`,
  },
  {
    id: "past-client-email",
    category: "Past Client",
    module: "501",
    level: "Intermediate",
    title: "Personalized past client check in.",
    useCase: "Draft a real check in, not a refi blast.",
    body: `Draft a personalized check in email to a past client. Their loan closed [date]. Context I remember: [paste]. Goal: be helpful first, not transactional. Under 120 words. No rate, payment, or fee. Add NMLS [ID].`,
  },
  {
    id: "pipeline-review",
    category: "Pipeline Review",
    module: "501",
    level: "Intermediate",
    title: "Pipeline triage.",
    useCase: "Run this every Friday. Paste your pipeline rows.",
    body: `You are my pipeline coach. Below is my current pipeline [paste rows: borrower name, status, last touch, next step, days in stage]. Output:
1. The three files I should call today.
2. The two files at risk of dying and what to do.
3. One process gap you can see across the pipeline.`,
  },
  {
    id: "weekly-summary",
    category: "Weekly Summary",
    module: "501",
    level: "Intermediate",
    title: "Weekly accountability summary.",
    useCase:
      "Drop your logged activity in once a week. Get a one page accountability summary.",
    body: `You are my weekly accountability coach. Inputs: [paste my logged conversations, partner touches, content posted, past client touches, calls recorded]. Output a 1 page summary with: what went well, what slipped, one specific change for next week, one specific win to celebrate.`,
  },
  {
    id: "roleplay-objection",
    category: "Roleplay",
    module: "201",
    level: "Intermediate",
    title: "Objection handling roleplay.",
    useCase:
      "Run a 10 minute roleplay drill on real borrower objections. Then get coaching feedback.",
    body: `Roleplay as a [rate shopper | nervous first time buyer | self employed borrower | borrower who just got denied elsewhere]. Push back on me 3 times. Then break character and give me feedback on my answers. Focus areas: listening, redirecting from teaser rates, plan first language, and clear next step.`,
  },
  {
    id: "niche-plan",
    category: "Niche Plan",
    module: "601",
    level: "Advanced",
    title: "90 day niche plan.",
    useCase: "Build the first draft of your 12 week niche plan.",
    body: `Build me a 90 day niche plan. Niche: [niche]. My market: [city]. My current strengths: [paste]. Output:
1. Buyer persona summary.
2. Three content pillars.
3. Six referral partner types with sample outreach.
4. Weekly content cadence (video, post, GBP, newsletter).
5. One starter benchmark to track at day 30, 60, 90. No production guarantees.`,
  },
];

export const promptCategories = [
  "Call Prep",
  "Follow Up",
  "Realtor Outreach",
  "Partner Meeting",
  "Social Post",
  "Short Video Script",
  "Google Business Profile",
  "Past Client",
  "Pipeline Review",
  "Weekly Summary",
  "Roleplay",
  "Niche Plan",
] as const;
