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
  {
    id: "call-prep-partner-meeting",
    category: "Call Prep",
    module: "301",
    level: "Beginner",
    title: "Referral partner call prep.",
    useCase: "Use this before a Realtor, CPA, builder, or attorney call.",
    body: `Prepare me for a 20 minute referral partner call. Partner type: [type]. What I know: [paste only public or non-private context]. Output: one simple opening, five discovery questions, one way I can be useful this week, and one clear next step. No rate, fee, APR, approval, or underwriting claims.`,
    tips:
      "Keep the call about their business first. Do not pitch before you understand what they need.",
  },
  {
    id: "follow-up-text-after-call",
    category: "Follow Up",
    module: "201",
    level: "Beginner",
    title: "After-call text follow-up.",
    useCase: "Send a short text after a borrower or partner conversation.",
    body: `Draft a short follow-up text after my call with [person]. Context: [paste]. Keep it under 55 words, warm, specific, and clear. End with one next step. Do not include rates, fees, APR, payments, approval language, or underwriting decisions.`,
    tips:
      "Text should sound like you. Add one real detail from the conversation before sending.",
  },
  {
    id: "realtor-open-house-follow-up",
    category: "Realtor Outreach",
    module: "301",
    level: "Intermediate",
    title: "Open house follow-up.",
    useCase: "Follow up after seeing a Realtor's open house or listing.",
    body: `Write a peer-to-peer follow-up to [agent] about [listing/open house]. Mention one specific detail I noticed. Offer one useful idea for helping buyers prepare before touring. Keep it under 90 words. No bragging, no rate quotes, no payment examples, no approval claims.`,
    tips:
      "The goal is a useful conversation, not a canned pitch.",
  },
  {
    id: "partner-meeting-recap",
    category: "Partner Meeting",
    module: "301",
    level: "Intermediate",
    title: "Partner meeting recap.",
    useCase: "Turn meeting notes into a clean recap and next-step plan.",
    body: `Summarize these partner meeting notes: [paste]. Output: 1. what I learned about their business, 2. the main opportunity, 3. one useful follow-up item for me, 4. one follow-up item for them, 5. a short recap email draft. No rate, fee, APR, approval, or underwriting claims.`,
    tips:
      "Send recaps quickly while the conversation is still fresh.",
  },
  {
    id: "social-post-past-client",
    category: "Social Post",
    module: "401",
    level: "Beginner",
    title: "Past-client value post.",
    useCase: "Create a simple post that reminds past clients you are still a resource.",
    body: `Draft three social post options for past clients. Topic: [topic]. Keep each under 90 words. Make the post helpful, plain-English, and conversation-starting. No rates, payments, fees, guarantees, approvals, or underwriting advice. End with a soft CTA.`,
    tips:
      "Pick the post that sounds most natural, then edit it before publishing.",
  },
  {
    id: "short-video-realtor-tip",
    category: "Short Video Script",
    module: "401",
    level: "Beginner",
    title: "Realtor partner video tip.",
    useCase: "Write a short video for Realtor relationships.",
    body: `Write a 45 second video script for Realtors about [topic]. Structure: 3 second hook, one practical tip, one example, one soft CTA. Use plain language. No rate, APR, fee, payment, approval, eligibility, or underwriting claims.`,
    tips:
      "Read it out loud. If it sounds like an ad, make it more conversational.",
  },
  {
    id: "gbp-weekly-local-education",
    category: "Google Business Profile",
    module: "401",
    level: "Beginner",
    title: "Local education GBP post.",
    useCase: "Draft one Google Business Profile post for local visibility.",
    body: `Draft a Google Business Profile post for [city/neighborhood]. Topic: [topic]. Keep it under 85 words. Include one locally relevant detail. Make it educational and conversation-focused. No rates, fees, APR, payments, guarantees, approvals, or underwriting claims.`,
    tips:
      "Public posts need review. Validate local details before publishing.",
  },
  {
    id: "past-client-check-in-text",
    category: "Past Client",
    module: "501",
    level: "Beginner",
    title: "Past-client check-in text.",
    useCase: "Send a short relationship-first text to past clients.",
    body: `Draft a short check-in text to a past client. Context I remember: [paste]. Goal: be useful and human, not salesy. Under 55 words. No rates, payments, fees, approval language, or refinance claims. End with a simple question.`,
    tips:
      "Do not send the same text to everyone. Add one personal detail.",
  },
  {
    id: "pipeline-stuck-file-review",
    category: "Pipeline Review",
    module: "501",
    level: "Intermediate",
    title: "Stuck file next-step review.",
    useCase: "Use this when a file has not moved in several days.",
    body: `Review this pipeline note for a stuck file: [paste non-private status, last touch, next step]. Output: likely bottleneck, one call to make, one question to ask, one internal next step, and one borrower-friendly draft update. Do not include approvals, underwriting decisions, rates, fees, APR, or guarantees.`,
    tips:
      "Use TERA and current company process as the source of truth.",
  },
  {
    id: "weekly-summary-team-leader",
    category: "Weekly Summary",
    module: "501",
    level: "Intermediate",
    title: "Team leader weekly summary.",
    useCase: "Summarize a week of team activity for coaching discussion.",
    body: `Create a weekly team summary from these activity notes: [paste]. Output: three wins, three stuck points, one coaching theme, one suggested focus for next week, and one question for the team. Do not include borrower PII or private loan details.`,
    tips:
      "Use this as a coaching prep draft, not a public report.",
  },
  {
    id: "roleplay-realtor-objection",
    category: "Roleplay",
    module: "301",
    level: "Intermediate",
    title: "Realtor objection practice.",
    useCase: "Practice a Realtor conversation without sounding scripted.",
    body: `Roleplay as a busy Realtor who already has three preferred lenders. Push back on me twice. Then pause and coach my response. Focus on curiosity, value, consistency, and a clear next step. No promises, no pricing claims, and no thing-of-value language.`,
    tips:
      "Have the assistant coach your tone after the roleplay.",
  },
  {
    id: "niche-content-calendar",
    category: "Niche Plan",
    module: "601",
    level: "Advanced",
    title: "30 day niche content calendar.",
    useCase: "Turn a niche into weekly content and outreach ideas.",
    body: `Build a 30 day content and outreach calendar for this niche: [niche]. Market: [city]. Output four weekly themes, eight social post ideas, four short video ideas, four partner outreach ideas, and one simple weekly metric. No production guarantees, no rate/payment examples, and no approval claims.`,
    tips:
      "Start with a small niche you can actually serve and talk to every week.",
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
