import { SkillLevel } from "@/lib/utils";

export type AudioTrainingItem = {
  id: string;
  title: string;
  description: string;
  skillLevel: SkillLevel[];
  relatedModules: { level: string; href: string; title: string }[];
  duration: string;
  sourceType: "NotebookLM Audio Overview" | "Live Session Replay" | "Coach Recording";
  filePath: string;
  keyTakeaways: string[];
  suggestedUse: string;
  complianceNote: string;
  transcriptStatus: "Pending" | "Draft" | "Approved";
  transcriptPath: string;
};

export const audioTraining: AudioTrainingItem[] = [
  {
    id: "mortgage-sales-psychology-and-ai-systems",
    title: "Mortgage Sales Psychology and AI Systems",
    description:
      "A conversational overview of sales psychology, borrower trust, AI assisted workflows, and how LOs can use practical systems instead of relying on motivation. Useful pre work before the 201 and 501 modules.",
    skillLevel: ["Intermediate", "Advanced"],
    relatedModules: [
      {
        level: "201",
        href: "/201-borrower-conversion/",
        title: "201 Borrower Conversion",
      },
      {
        level: "501",
        href: "/501-pipeline-and-sales-systems/",
        title: "501 Pipeline and Sales Systems",
      },
      {
        level: "601",
        href: "/601-elite-execution/",
        title: "601 Elite Execution",
      },
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
    id: "elite-mortgage-sales-operating-system",
    title: "The Elite Mortgage Sales Operating System",
    description:
      "A practical conversation about turning daily activity, partner outreach, follow up, and pipeline review into a repeatable operating system for loan officers. Best starting point for new or inconsistent LOs.",
    skillLevel: ["Beginner", "Intermediate"],
    relatedModules: [
      {
        level: "101",
        href: "/101-foundation/",
        title: "101 Foundation",
      },
      {
        level: "301",
        href: "/301-referral-partner-growth/",
        title: "301 Referral Partner Growth",
      },
      {
        level: "501",
        href: "/501-pipeline-and-sales-systems/",
        title: "501 Pipeline and Sales Systems",
      },
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
    description:
      "A strategic discussion about improving the training blueprint, using audio and video assets, building better lessons, and supporting team leaders and coaches across the series.",
    skillLevel: ["Advanced", "Team Leader", "Coach"],
    relatedModules: [
      {
        level: "401",
        href: "/401-content-and-marketing/",
        title: "401 Content and Marketing",
      },
      {
        level: "601",
        href: "/601-elite-execution/",
        title: "601 Elite Execution",
      },
      {
        level: "Coach",
        href: "/coach-guide/",
        title: "Coach Guide",
      },
      {
        level: "TL",
        href: "/team-leader-guide/",
        title: "Team Leader Guide",
      },
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
