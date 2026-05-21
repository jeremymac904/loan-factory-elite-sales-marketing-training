import { SkillLevel } from "@/lib/utils";

export type ScriptItem = {
  id: string;
  category:
    | "Borrower"
    | "Realtor"
    | "Partner"
    | "Listing Agent"
    | "Past Client"
    | "Video Hook"
    | "Text Follow Up"
    | "Email Follow Up";
  module?: string;
  level: SkillLevel;
  title: string;
  purpose: string;
  body: string;
  complianceNote?: string;
};

export const scripts: ScriptItem[] = [
  {
    id: "broker-value-prop-30s",
    category: "Borrower",
    module: "101",
    level: "Beginner",
    title: "Broker value prop. 30 second intro.",
    purpose:
      "A clean, broker positive way to introduce yourself anywhere. Lead with what 240+ wholesale lenders means for the borrower, not a sales pitch.",
    body: `Hi, I'm [Name] with Loan Factory. We're a mortgage brokerage, which means I'm not stuck with one lender's products or pricing. I have access to more than 240 wholesale lenders, so I can shop the file across many options and bring back what actually fits the client. My job is to make the loan part feel simple, communicate clearly with everyone in the deal, and close on time. NMLS [ID].`,
    complianceNote:
      "Confirm NMLS ID and brokerage NMLS appear in any printed or posted use. Avoid any specific rate, payment, or fee in this intro.",
  },
  {
    id: "borrower-first-text",
    category: "Borrower",
    module: "101",
    level: "Beginner",
    title: "Borrower first text after inbound lead.",
    purpose:
      "Speed to lead matters. Most lost leads were never lost on price. They were lost in the first hour. Send this fast.",
    body: `Hi [First name], this is [Name] with Loan Factory. Got your request. I'd love a quick 10 minute call to understand what you're trying to do so I can be useful. Do you have a few minutes today, or would tomorrow morning work better? NMLS [ID].`,
    complianceNote:
      "No specific rate, payment, down payment dollar amount, or fee. Confirm NMLS ID.",
  },
  {
    id: "borrower-voicemail-no-answer",
    category: "Borrower",
    module: "101",
    level: "Beginner",
    title: "Borrower voicemail. No answer.",
    purpose: "Leave a useful message, then text right after.",
    body: `Hi [First name], this is [Name] at Loan Factory, NMLS [ID]. I'm following up on your request. Goal is to understand your plans and answer any questions. I'll send you a text right after this with a quick way to schedule. Talk soon.`,
    complianceNote: "Confirm NMLS ID. No rate or payment claims.",
  },
  {
    id: "borrower-first-call-open",
    category: "Borrower",
    module: "201",
    level: "Intermediate",
    title: "Borrower first call open.",
    purpose:
      "Open warm, set the agenda, ask permission. 60 seconds. Then move into discovery.",
    body: `Hi [First name], this is [Name] at Loan Factory. Got 10 minutes? Goal of this call is simple. I want to understand what you're trying to do, share what's possible, and figure out the next right step. Sound good?`,
  },
  {
    id: "credit-concern",
    category: "Borrower",
    module: "201",
    level: "Intermediate",
    title: "Credit concern.",
    purpose:
      "Pull the conversation toward action without alarming the borrower. Offer a soft check.",
    body: `Totally fair concern. Credit is one of three or four things lenders look at, and it's the one that's the most workable. I'd rather pull a soft check with your permission, see exactly where you stand, and build the plan from there. If there's something to fix, I'd rather find it now than at the closing table. Want to do that?`,
  },
  {
    id: "down-payment-concern",
    category: "Borrower",
    module: "201",
    level: "Intermediate",
    title: "Down payment concern.",
    purpose:
      "Most buyers overestimate how much they need. Open them up to real options without quoting specifics.",
    body: `Most buyers think they need 20% down. They don't. There are real loan options as low as 3% and in some cases zero down, depending on what you qualify for. Let's look at your actual numbers and your goal, and I'll show you what's realistic for your file.`,
    complianceNote:
      "Live conversation only. Putting specific down payment dollar amounts in writing in a public message triggers Reg Z disclosures.",
  },
  {
    id: "rate-question",
    category: "Borrower",
    module: "201",
    level: "Intermediate",
    title: "Rate question redirect.",
    purpose:
      "Move the conversation from a headline rate to a real options conversation on the borrower's actual file.",
    body: `Great question. Rates move daily and depend on your file. I'd rather show you real options on your real file than quote you a headline rate that may not be the rate you actually get. Let's do a quick pre qual and I'll walk you through it Wednesday.`,
    complianceNote: "No teaser rate language in any borrower facing artifact.",
  },
  {
    id: "fee-question",
    category: "Borrower",
    module: "201",
    level: "Intermediate",
    title: "Fee question redirect.",
    purpose: "Anchor on the Loan Estimate. Avoid guessing in writing.",
    body: `Fair question. On a Loan Factory file, you'll see a clear Loan Estimate within three business days of application. I'd rather show you the actual numbers than guess. Want to do the quick app today so I can show you Wednesday?`,
  },
  {
    id: "realtor-cold-outreach",
    category: "Realtor",
    module: "301",
    level: "Intermediate",
    title: "Realtor first outreach. Text or DM.",
    purpose:
      "Lead with what Realtors actually care about. Speed, fully vetted pre approvals, listing agent calls.",
    body: `Hi [Agent], saw your listing on [property]. Quick note. I'm [Name] at Loan Factory. We're a mortgage brokerage with access to a wide lender network, our pre approvals are fully underwritten, and we call the listing agent on every offer. Open to a 15 minute coffee or virtual this week to see if it would be useful to know each other? NMLS [ID].`,
  },
  {
    id: "realtor-follow-up",
    category: "Realtor",
    module: "301",
    level: "Intermediate",
    title: "Realtor follow up.",
    purpose: "Re engage without pressure. Stay useful.",
    body: `Hi [Agent], following up. No pressure either way. If it's helpful, I'd love a quick 15 minute virtual to share how we structure pre approvals and listing agent calls. If now isn't the time, I'll check back next quarter. NMLS [ID].`,
  },
  {
    id: "partner-meeting-request",
    category: "Partner",
    module: "301",
    level: "Intermediate",
    title: "Partner meeting request. CPA, financial advisor, attorney.",
    purpose:
      "Position as a peer professional building a trusted referral circle, not chasing leads.",
    body: `Hi [Partner], I'm building a short list of professionals I trust to refer clients into. I'd love 20 minutes to learn how you work and share how we work. Coffee, your office, or virtual. NMLS [ID].`,
  },
  {
    id: "listing-agent-call",
    category: "Listing Agent",
    module: "301",
    level: "Intermediate",
    title: "Listing agent confidence call.",
    purpose:
      "Project competence in under 90 seconds. Make the listing agent confident in the offer.",
    body: `Hi [Listing Agent], this is [Name] with Loan Factory, NMLS [ID]. I'm the lender on the offer for [property]. I wanted to call you personally so you can tell your seller this is a fully vetted file. We've reviewed credit, income, and assets. We're closing on time. Anything you want me to know about the timeline or the property? You'll have my cell.`,
  },
  {
    id: "past-client-re-engagement",
    category: "Past Client",
    module: "501",
    level: "Intermediate",
    title: "Past client re engagement call open.",
    purpose:
      "Lead with care, not a refi pitch. The reason matters more than the offer.",
    body: `Hi [Name], [Name] from Loan Factory. Long time. Quick reason for the call. Wanted to check in on the house, share a quick equity update on your area, and answer any questions about the financial picture. Got 5 minutes this week?`,
    complianceNote:
      "Any past client outreach that quotes a specific rate or payment is a Reg Z advertisement.",
  },
  {
    id: "hook-1",
    category: "Video Hook",
    module: "401",
    level: "Intermediate",
    title: "Hook 1. Bold contrarian.",
    purpose: "Open a short form video by challenging a common belief.",
    body: `Most buyers think the lowest rate wins. It doesn't.`,
  },
  {
    id: "hook-2",
    category: "Video Hook",
    module: "401",
    level: "Intermediate",
    title: "Hook 2. Specific question.",
    purpose: "Open with a question your exact audience would type.",
    body: `If you're self employed and shopping for a mortgage, here's the one document that fixes everything.`,
  },
  {
    id: "hook-3",
    category: "Video Hook",
    module: "401",
    level: "Intermediate",
    title: "Hook 3. Problem solution.",
    purpose: "Name a problem your audience feels right now.",
    body: `Your pre approval is not pre approved. Here's what is.`,
  },
  {
    id: "hook-4",
    category: "Video Hook",
    module: "401",
    level: "Intermediate",
    title: "Hook 4. Mistake reveal.",
    purpose: "Pull the viewer in with a real mistake to avoid.",
    body: `The number one reason deals fall apart in the last two weeks.`,
  },
  {
    id: "hook-5",
    category: "Video Hook",
    module: "401",
    level: "Intermediate",
    title: "Hook 5. Broker value.",
    purpose: "Open with the broker model in plain English.",
    body: `Working with a mortgage broker means I'm not locked into one lender's box.`,
  },
  {
    id: "text-cadence-7-touch",
    category: "Text Follow Up",
    module: "101",
    level: "Beginner",
    title: "7 touch text cadence over 14 days.",
    purpose:
      "Most replies happen between touches 5 and 8. Most LOs quit at touch 2. Run the full cadence.",
    body: `Touch 1 (Day 0): Hi [Name], [Name] at Loan Factory. Got your request. When's a good time today for a quick call?
Touch 2 (Day 1): [Name], following up. Want me to send a short list of what to gather so the call is fast?
Touch 3 (Day 3): No rush at all. If this is still on your radar, here's a 5 minute slot tomorrow morning.
Touch 4 (Day 7): Quick check, [Name]. Still planning to move on this in the next 90 days?
Touch 5 (Day 10): If timing changed, totally fine. I'll move you to a monthly check in. Let me know.
Touch 6 (Day 14): Final note. I'll stop the texts here. If anything changes, you've got my cell.`,
    complianceNote:
      "No specific rate, payment, down payment dollar amount, or fee. NMLS ID on file in your text signature.",
  },
  {
    id: "email-first-call-recap",
    category: "Email Follow Up",
    module: "201",
    level: "Intermediate",
    title: "First call recap email.",
    purpose:
      "Lock in the plan and the next step within an hour of hanging up.",
    body: `Subject: Quick recap and next step

Hi [Name],

Great talking. Here's what I heard. Goal: [paraphrase]. Timeline: [paraphrase]. Next step: I'll send a doc checklist today. Once I have those, I'll put two or three real options together for our call Wednesday at 11.

Let me know if I missed anything.

[Name], NMLS [ID]`,
  },
  {
    id: "email-doc-nudge",
    category: "Email Follow Up",
    module: "201",
    level: "Intermediate",
    title: "Document nudge email.",
    purpose: "Move the file forward with a short, useful nudge.",
    body: `Subject: Quick nudge on the docs

Hi [Name],

Following up on the doc checklist. Three items would unlock everything: most recent paystubs, last two months of bank statements, and the most recent W 2. Upload here: [link].

[Name], NMLS [ID]`,
  },
];

export const scriptCategories = [
  "Borrower",
  "Realtor",
  "Partner",
  "Listing Agent",
  "Past Client",
  "Video Hook",
  "Text Follow Up",
  "Email Follow Up",
] as const;
