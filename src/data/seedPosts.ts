import type { CommunityPost, ProgramKey } from "./coachingPlatform";

/**
 * Seeded Questions and Scripts feed posts — practical Q&A about how the
 * platform works plus pointers into the script library. Client-side seeds
 * merged like Coach Picks (kind "qa" / "script-tip"); they appear under the
 * Questions and Scripts filter pills in both programs.
 *
 * Content rule: group coaching model only — keep language about the weekly
 * coaching call, never private sessions.
 */

export type SeedPost = CommunityPost & { kind: "qa" | "script-tip"; refKey: string };

function qa(refKey: string, title: string, body: string): SeedPost {
  return {
    author: "Loan Factory Coaching",
    role: "Coach",
    category: "Questions",
    title,
    body,
    comments: [],
    kind: "qa",
    refKey,
  };
}

function scriptTip(refKey: string, title: string, body: string): SeedPost {
  return {
    author: "Loan Factory Coaching",
    role: "Coach",
    category: "Scripts",
    title,
    body,
    comments: [],
    kind: "script-tip",
    refKey,
  };
}

export function getSeedPosts(program: ProgramKey): SeedPost[] {
  const programName = program === "alliance" ? "Loan Factory Alliance" : "LO Mastery";

  const questions: SeedPost[] = [
    qa(
      "qa-platform-start",
      `Q: I just joined ${programName} — where do I start?`,
      "Start with the pinned \"Start Here\" video at the top of this feed. Then open Today and log your numbers for the day. That's the whole rhythm: watch the daily coaching post here, work your plan, log it in Today. Everything else (scripts, tools, training, podcast) lives in Resources.",
    ),
    qa(
      "qa-daily-entry",
      "Q: What exactly do I enter in Today each day?",
      "Today asks for the numbers you control: conversations, Realtor touches, past-client touches, follow-ups, and your time blocks. Enter them at the end of each call block or end of day — it takes under two minutes. If a day goes sideways, log zeros honestly. The point is the trend, not a perfect week.",
    ),
    qa(
      "qa-today-scorecard",
      "Q: How does Today feed my Friday scorecard?",
      "Everything you log in Today rolls up automatically into your weekly scorecard — daily numbers, time blocks, all of it. On Friday you review the totals, answer the four reflection questions (what worked, what didn't, where you're stuck, next week's focus), and submit. No double entry.",
    ),
    qa(
      "qa-what-coaches-review",
      "Q: What do coaches actually look at when I submit?",
      "Coaches review your weekly scorecard: activity totals against goals, time blocks, and your reflection answers. They leave coach notes you'll see on your profile, and recurring stuck points become topics for the weekly group coaching call. Submitted scorecards are the main way coaches know where you are.",
    ),
    qa(
      "qa-group-coaching",
      "Q: How does group coaching work?",
      "Coaching happens in the weekly group call, the daily coaching posts in this feed, and coach feedback on your scorecard. The live call schedule comes by Google Calendar invite. Bring one win and one stuck point to every call — the recording is posted to the matching week in Training after the call.",
    ),
    qa(
      "qa-when-stuck",
      "Q: What should I do when I'm stuck?",
      "Three moves, in order: post the question in this feed (someone has hit it before), put it in the \"where are you stuck\" box on your Friday scorecard so your coach sees it, and bring it to the weekly group coaching call. Don't sit on a stuck point for more than a day — that's what this community is for.",
    ),
    qa(
      "qa-scripts-on-calls",
      "Q: How do I actually use the scripts during live calls?",
      "Open Resources > Scripts and use the Expand button on the script you need — keep it on screen during the call. Don't read it word for word; hit the structure: opener, the two or three key questions, and the close. Practice it out loud once before the call block. The script categories match the situations in your weekly assignments.",
    ),
    qa(
      "qa-realtor-tracker",
      "Q: How should I use the Realtor Relationship Tracker?",
      "Resources > Tools > Realtor Relationship Tracker. Add every agent you're building with: tier (A/B/C), last contact, next action, and notes after each conversation. The rule that makes it work: no agent row without a next action. Review it before your weekly partner outreach block and export CSV if you want a backup.",
    ),
    qa(
      "qa-deal-tracker",
      "Q: How should I use the Deal Flow Tracker?",
      "Resources > Tools > Deal Flow Tracker. One row per active file: borrower, status, contract date, next action. Update it when a file moves stages — not at midnight on Friday. It's a lightweight list to keep next to your LOS, not a second CRM. If a row has no next action, that deal is drifting.",
    ),
    qa(
      "qa-podcast",
      "Q: What's the Podcast section for and when should I listen?",
      "Resources > Podcast — 26 audio coaching episodes organized by category (sales psychology, pipeline systems, community marketing, AI, mindset). They're built for drive time and pre-call-block warmups. Each episode has key takeaways and one action item. Pick by the category you're working on this week; transcripts are attached if you'd rather read.",
    ),
    qa(
      "qa-prep-weekly-call",
      "Q: How do I prepare for the weekly coaching call?",
      "Three things: submit your Friday scorecard before the call, watch the current week's overview video (Resources > Course Overview), and write down one win and one stuck point to share. Members who show up with those three get the most out of every call.",
    ),
    qa(
      "qa-submit-scorecard",
      "Q: How do I submit the Friday scorecard, step by step?",
      "Open Scorecard from the left nav. Your weekly totals are already there from Today. Check the numbers, fill in the four reflection questions, and hit submit. Do it Friday afternoon while the week is fresh — coaches review submissions before the next group call.",
    ),
    qa(
      "qa-post-wins",
      "Q: What should I post in this feed — and what gets the best response?",
      "Post wins with the number attached (\"3 agent conversations today, one wants to meet\") under Wins, and post questions with enough context to answer (what you tried, where it broke) under Questions. Specific beats vague in both directions. One good post per week is a great rhythm — this feed is the community half of your coaching.",
    ),
    qa(
      "qa-missed-week",
      "Q: I missed a week. Do I try to catch up or skip ahead?",
      "Don't try to do two weeks at once. Submit a short honest scorecard for the missed week (even with low numbers), watch the current week's overview, and rejoin at the current week. The program is built on consistency, not perfection — one missed week with an honest reset beats two weeks of catch-up stress.",
    ),
    qa(
      "qa-feed-filters",
      "Q: What do the feed filter pills at the top do?",
      "They cut the feed to one lane: Daily shows the six daily coaching posts, Weekly shows the course week posts, Coach Picks shows curated training videos, Questions and Scripts show exactly what they say, Wins shows member wins, and Pinned shows what's pinned plus today's and this week's coaching. All puts everything back.",
    ),
    qa(
      "qa-coach-feedback",
      "Q: How do I get feedback from a coach on something specific?",
      "Put it on your scorecard (the stuck box goes straight to coach review), post it here under Questions, or bring it to the weekly group coaching call. Coach notes from your scorecard reviews show up on your profile — check there after you submit.",
    ),
  ];

  const scriptTips: SeedPost[] = [
    scriptTip(
      "st-realtor-first-call",
      "Script spotlight: Realtor First Call",
      "Use this the moment you have a new agent's number. It's a discovery call, not a pitch: two questions about their business, real listening, and one specific follow-up within 24 hours. Find it in Resources > Scripts > Realtor Outreach. Pair it with a new row in your Realtor Relationship Tracker.\n\nWhen to use: your weekly partner outreach block.",
    ),
    scriptTip(
      "st-past-client",
      "Script spotlight: Past Client Check-In",
      "Your database is your warmest market, and this script keeps it warm without feeling like a sales call. No agenda, one genuine question about them, and let the conversation come to you. Resources > Scripts > Database.\n\nWhen to use: your past-client touch block — every touch counts on Today.",
    ),
    scriptTip(
      "st-rate-shopper",
      "Script spotlight: Rate Shopper Redirect",
      "When the first question is \"what's your rate?\", this script answers it honestly in one sentence and pivots to fit: timeline, goals, and what the payment needs to do for their life. Never quote terms you can't stand behind. Resources > Scripts > Objections.\n\nWhen to use: any inbound where price leads the conversation.",
    ),
    scriptTip(
      "st-referral-ask",
      "Script spotlight: The Referral Ask",
      "The ask works when it's earned and specific. This script times it right after a win (clear to close, smooth closing) and names the kind of person you can help. Resources > Scripts > Referrals.\n\nWhen to use: within 48 hours of any closing or milestone the client is happy about.",
    ),
    scriptTip(
      "st-buyer-consult",
      "Script spotlight: Buyer Consultation",
      "The first 5 minutes are questions, not pitching: family, timeline, what this home changes for them. Then the numbers confirm the plan they helped build. Resources > Scripts > Buyer Process.\n\nWhen to use: every new buyer conversation — practice it out loud before your first consult of the week.",
    ),
    scriptTip(
      "st-friday-update",
      "Script spotlight: Friday Status Update",
      "One proactive update to every active borrower and their agent every Friday — even when the update is \"no change, here's what's next.\" Five minutes of work that kills the weekend panic calls and makes agents brag about you. Resources > Scripts > Communication.\n\nWhen to use: Friday, right before you submit your scorecard.",
    ),
    scriptTip(
      "st-agent-objection",
      "Script spotlight: Agent Objection Handling",
      "\"I already have a lender\" is the start of the conversation, not the end. This script respects the incumbent, plants one specific differentiator, and asks for the backup slot. Resources > Scripts > Realtor Outreach.\n\nWhen to use: every agent conversation that stalls — bring the result to the weekly coaching call.",
    ),
  ];

  return [...questions, ...scriptTips];
}
