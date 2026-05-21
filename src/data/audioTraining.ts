import { SkillLevel } from "@/lib/utils";

export type AudioCategoryId =
  | "sales-psychology"
  | "realtor-trust"
  | "broker-value-and-guarantee"
  | "training-blueprint";

export type AudioCategory = {
  id: AudioCategoryId;
  title: string;
  description: string;
};

export const audioCategories: AudioCategory[] = [
  {
    id: "sales-psychology",
    title: "Sales Psychology and Borrower Conversion",
    description:
      "How to lead a borrower conversation with trust, listening, and a clear next step, without sounding salesy.",
  },
  {
    id: "realtor-trust",
    title: "Referral Partner and Realtor Trust",
    description:
      "How to earn referral partner trust with communication, closing certainty, and a real listing agent call.",
  },
  {
    id: "broker-value-and-guarantee",
    title: "Broker Value Proposition and Guarantee Conversations",
    description:
      "How to talk about Loan Factory's wholesale access and the Best Price Guarantee in plain language, without bashing competitors and without overpromising.",
  },
  {
    id: "training-blueprint",
    title: "Training Blueprint and Coaching Strategy",
    description:
      "Bigger picture conversations on the operating system, the training blueprint, and how coaches and team leaders run it.",
  },
];

export type AudioHostedLocation = "local" | "drive" | "external";
export type AudioAssetStatus =
  | "local only"
  | "drive hosted"
  | "needs upload"
  | "needs review";

export type AudioTrainingItem = {
  id: string;
  title: string;
  category: AudioCategoryId;
  description: string;
  skillLevel: SkillLevel[];
  relatedModules: { level: string; href: string; title: string }[];
  duration: string;
  sourceType: "NotebookLM Audio Overview" | "Live Session Replay" | "Coach Recording";
  filePath: string;
  // Optional Drive hosted location for the same audio. When `hostedLocation`
  // is `drive`, the site can read from `driveUrl` or `downloadUrl` instead of
  // the local `filePath`. Today everything still plays from `filePath`.
  driveUrl?: string;
  downloadUrl?: string;
  hostedLocation?: AudioHostedLocation;
  assetStatus?: AudioAssetStatus;
  keyTakeaways: string[];
  suggestedUse: string;
  complianceNote: string;
  transcriptStatus: "Pending" | "Draft" | "Approved";
  transcriptPath: string;
};

export const audioTraining: AudioTrainingItem[] = [
  // Sales Psychology and Borrower Conversion
  {
    id: "mortgage-sales-psychology-and-ai-systems",
    title: "Mortgage Sales Psychology and AI Systems",
    category: "sales-psychology",
    description:
      "A conversational overview of sales psychology, borrower trust, AI assisted workflows, and how LOs can use practical systems instead of relying on motivation. Useful pre work before the 201 and 501 modules.",
    skillLevel: ["Intermediate", "Advanced"],
    relatedModules: [
      { level: "201", href: "/201-borrower-conversion/", title: "201 Borrower Conversion" },
      { level: "501", href: "/501-pipeline-and-sales-systems/", title: "501 Pipeline and Sales Systems" },
      { level: "601", href: "/601-elite-execution/", title: "601 Elite Execution" },
    ],
    duration: "Duration not yet logged",
    sourceType: "NotebookLM Audio Overview",
    filePath: "/audio/mortgage_sales_psychology_and_ai_systems.m4a",
    keyTakeaways: [
      "Trust is built through better questions, not more questions.",
      "Systems beat motivation. The weekly rhythm is the asset.",
      "AI is a leverage tool for prep, follow up, and roleplay. Drafts are always LO reviewed.",
    ],
    suggestedUse:
      "Listen before 201 or 501 to set the mindset behind better sales conversations and follow up.",
    complianceNote:
      "Supplemental training only. Not borrower or Realtor facing. Anything you create from the ideas in this audio still needs compliance review before public use.",
    transcriptStatus: "Pending",
    transcriptPath:
      "docs/audio-transcripts/mortgage_sales_psychology_and_ai_systems_transcript.md",
  },
  {
    id: "psychological-judo-in-mortgage-sales",
    title: "Psychological Judo in Mortgage Sales",
    category: "sales-psychology",
    description:
      "A conversational training on how to handle borrower resistance without arguing, overexplaining, or sounding defensive. Focuses on listening, redirecting, and keeping the borrower moving toward a clear next step.",
    skillLevel: ["Beginner", "Intermediate", "Advanced"],
    relatedModules: [
      { level: "201", href: "/201-borrower-conversion/", title: "201 Borrower Conversion" },
      { level: "601", href: "/601-elite-execution/", title: "601 Elite Execution" },
    ],
    duration: "Duration not yet logged",
    sourceType: "NotebookLM Audio Overview",
    filePath: "/audio/psychological_judo_in_mortgage_sales.m4a",
    keyTakeaways: [
      "Do not fight the objection.",
      "Slow down and listen first.",
      "Redirect to the plan, not the pitch.",
      "Use questions to lower resistance.",
    ],
    suggestedUse:
      "Listen before 201 if you struggle with rate shoppers, nervous buyers, credit concerns, or borrowers who are hesitant to move forward.",
    complianceNote:
      "Internal sales training only. Do not use AI generated objection responses externally without review.",
    transcriptStatus: "Pending",
    transcriptPath:
      "docs/audio-transcripts/psychological_judo_in_mortgage_sales_transcript.md",
  },
  {
    id: "stop-killing-deals-with-the-link-drop",
    title: "Stop Killing Deals With the Link Drop",
    category: "sales-psychology",
    description:
      "A practical training on why sending only an application link can hurt conversion and how a real phone conversation helps build trust, uncover issues, set expectations, and create cleaner files.",
    skillLevel: ["Beginner", "Intermediate"],
    relatedModules: [
      { level: "101", href: "/101-foundation/", title: "101 Foundation" },
      { level: "201", href: "/201-borrower-conversion/", title: "201 Borrower Conversion" },
    ],
    duration: "Duration not yet logged",
    sourceType: "NotebookLM Audio Overview",
    filePath: "/audio/stop_killing_deals_with_the_link_drop.m4a",
    keyTakeaways: [
      "The application link is not the relationship.",
      "The call builds trust and uncovers problems early.",
      "Borrowers need guidance, not just a link.",
      "A better application call creates cleaner files.",
    ],
    suggestedUse:
      "Listen before 101 or 201 if you tend to send the application link too early or skip the application call.",
    complianceNote:
      "Internal training only. Borrower facing scripts and document request language need review before use.",
    transcriptStatus: "Pending",
    transcriptPath:
      "docs/audio-transcripts/stop_killing_deals_with_the_link_drop_transcript.md",
  },

  // Referral Partner and Realtor Trust
  {
    id: "earn-realtor-trust-with-closing-certainty",
    title: "Earn Realtor Trust With Closing Certainty",
    category: "realtor-trust",
    description:
      "A practical audio training on how loan officers can build stronger Realtor trust by focusing on communication, clean pre approvals, listing agent confidence calls, and closing certainty.",
    skillLevel: ["Intermediate", "Advanced"],
    relatedModules: [
      { level: "301", href: "/301-referral-partner-growth/", title: "301 Referral Partner Growth" },
      { level: "501", href: "/501-pipeline-and-sales-systems/", title: "501 Pipeline and Sales Systems" },
    ],
    duration: "Duration not yet logged",
    sourceType: "NotebookLM Audio Overview",
    filePath: "/audio/earn_realtor_trust_with_closing_certainty.m4a",
    keyTakeaways: [
      "Realtors care about certainty, speed, and communication.",
      "The listing agent call is a trust builder.",
      "Clean pre approvals create confidence.",
      "Follow up has to feel useful, not needy.",
    ],
    suggestedUse:
      "Listen before 301 if you are working on Realtor outreach, partner follow up, or listing agent conversations.",
    complianceNote:
      "This is internal training only. Any Realtor facing script, co marketing idea, or public claim needs review before use.",
    transcriptStatus: "Pending",
    transcriptPath:
      "docs/audio-transcripts/earn_realtor_trust_with_closing_certainty_transcript.md",
  },

  // Broker Value Proposition and Guarantee Conversations
  {
    id: "the-master-key-to-240-wholesale-lenders",
    title: "The Master Key to 240 Wholesale Lenders",
    category: "broker-value-and-guarantee",
    description:
      "A training conversation about how to explain Loan Factory's access to 240 plus wholesale lenders in simple borrower friendly language without bashing banks or retail lenders.",
    skillLevel: ["Beginner", "Intermediate"],
    relatedModules: [
      { level: "101", href: "/101-foundation/", title: "101 Foundation" },
      { level: "201", href: "/201-borrower-conversion/", title: "201 Borrower Conversion" },
    ],
    duration: "Duration not yet logged",
    sourceType: "NotebookLM Audio Overview",
    filePath: "/audio/the_master_key_to_240_wholesale_lenders.m4a",
    keyTakeaways: [
      "More lender access means more options.",
      "Do not attack banks or retail lenders.",
      "Explain choice, fit, and flexibility.",
      "Keep the broker value proposition simple.",
    ],
    suggestedUse:
      "Listen before 101 if you need a better way to explain the broker model and why having more lender options matters.",
    complianceNote:
      "Internal training only. Do not claim a specific savings amount or guarantee better pricing without approved support and required review.",
    transcriptStatus: "Pending",
    transcriptPath:
      "docs/audio-transcripts/the_master_key_to_240_wholesale_lenders_transcript.md",
  },
  {
    id: "how-to-explain-the-two-thousand-dollar-best-price-guarantee",
    title: "How to Explain the Two Thousand Dollar Best Price Guarantee",
    category: "broker-value-and-guarantee",
    description:
      "A compliance aware training on how to explain the Two Thousand Dollar Best Price Guarantee clearly, including why the borrower needs a same day locked Loan Estimate from a competitor and why the comparison has to be apples to apples.",
    skillLevel: ["Intermediate", "Advanced", "Compliance Review"],
    relatedModules: [
      { level: "201", href: "/201-borrower-conversion/", title: "201 Borrower Conversion" },
      { level: "601", href: "/601-elite-execution/", title: "601 Elite Execution" },
    ],
    duration: "Duration not yet logged",
    sourceType: "NotebookLM Audio Overview",
    filePath:
      "/audio/how_to_explain_the_two_thousand_dollar_best_price_guarantee.m4a",
    keyTakeaways: [
      "Use Best Price Guarantee language unless leadership has approved different wording.",
      "A same day locked Loan Estimate is required for comparison.",
      "The comparison must be apples to apples.",
      "Do not overpromise or make unsupported claims.",
      "Lead with clarity, not gimmicks.",
    ],
    suggestedUse:
      "Listen before using the guarantee in a borrower conversation or coaching another LO on how to explain it.",
    complianceNote:
      "Internal training only. Guarantee language is compliance sensitive and must match approved company wording before any borrower facing use.",
    transcriptStatus: "Pending",
    transcriptPath:
      "docs/audio-transcripts/how_to_explain_the_two_thousand_dollar_best_price_guarantee_transcript.md",
  },

  // Training Blueprint and Coaching Strategy
  {
    id: "elite-mortgage-sales-operating-system",
    title: "The Elite Mortgage Sales Operating System",
    category: "training-blueprint",
    description:
      "A practical conversation about turning daily activity, partner outreach, follow up, and pipeline review into a repeatable operating system for loan officers. Best starting point for new or inconsistent LOs.",
    skillLevel: ["Beginner", "Intermediate"],
    relatedModules: [
      { level: "101", href: "/101-foundation/", title: "101 Foundation" },
      { level: "301", href: "/301-referral-partner-growth/", title: "301 Referral Partner Growth" },
      { level: "501", href: "/501-pipeline-and-sales-systems/", title: "501 Pipeline and Sales Systems" },
    ],
    duration: "Duration not yet logged",
    sourceType: "NotebookLM Audio Overview",
    filePath: "/audio/elite_mortgage_sales_operating_system.m4a",
    keyTakeaways: [
      "5 to 8 real conversations a day is the foundation.",
      "Five named priority partners beats a list of fifty cold names.",
      "Friday production review is non negotiable.",
    ],
    suggestedUse:
      "Start here if you are new, overwhelmed, or inconsistent. Pair with the 101 Foundation page and the Beginner Path.",
    complianceNote:
      "Supplemental training only. Treat ideas as starting points, not approved scripts. Compliance review required before any borrower or public facing use.",
    transcriptStatus: "Pending",
    transcriptPath:
      "docs/audio-transcripts/elite_mortgage_sales_operating_system_transcript.md",
  },
  {
    id: "loan-factory-training-blueprint",
    title: "Upgrading the Loan Factory Training Blueprint",
    category: "training-blueprint",
    description:
      "A strategic discussion about improving the training blueprint, using audio and video assets, building better lessons, and supporting team leaders and coaches across the series.",
    skillLevel: ["Advanced", "Team Leader", "Coach"],
    relatedModules: [
      { level: "401", href: "/401-content-and-marketing/", title: "401 Content and Marketing" },
      { level: "601", href: "/601-elite-execution/", title: "601 Elite Execution" },
      { level: "Coach", href: "/coach-guide/", title: "Coach Guide" },
      { level: "TL", href: "/team-leader-guide/", title: "Team Leader Guide" },
    ],
    duration: "Duration not yet logged",
    sourceType: "NotebookLM Audio Overview",
    filePath: "/audio/loan_factory_training_blueprint.m4a",
    keyTakeaways: [
      "Audio and video assets make the curriculum repeatable across teams.",
      "Coaches and team leaders need their own discussion and review rituals.",
      "Better blueprints come from pilot, refine, then expand.",
    ],
    suggestedUse:
      "Best for coaches, team leaders, and advanced users helping others implement the series. Pair with the Coach Guide and Team Leader Guide.",
    complianceNote:
      "Internal training discussion. Not a compliance or policy document. Decisions referenced still require leadership approval before rollout.",
    transcriptStatus: "Pending",
    transcriptPath:
      "docs/audio-transcripts/loan_factory_training_blueprint_transcript.md",
  },
];
