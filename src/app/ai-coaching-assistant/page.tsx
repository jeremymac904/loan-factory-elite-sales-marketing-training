import SectionHeading from "@/components/SectionHeading";
import ComplianceCallout from "@/components/ComplianceCallout";
import LevelTag from "@/components/LevelTag";
import { SkillLevel } from "@/lib/utils";

export const metadata = { title: "AI Coaching Assistant (planned)" };

type AssistantMode = {
  name: string;
  level: SkillLevel;
  whatItDoesNow: string;
  whatItWillDo: string;
  exampleAsks: string[];
};

const modes: AssistantMode[] = [
  {
    name: "Beginner Coach",
    level: "Beginner",
    whatItDoesNow:
      "Today, use the 101 prompts inside TERA. They are the same starting point.",
    whatItWillDo:
      "Future. Walks a brand new LO through one daily action at a time. Confidence builder, not a feature dump.",
    exampleAsks: [
      "Help me practice my 30 second broker intro.",
      "Draft my first follow up text to a new lead.",
      "Give me three people to start a conversation with today.",
    ],
  },
  {
    name: "Sales Roleplay Coach",
    level: "Intermediate",
    whatItDoesNow:
      "Today, use the roleplay prompt with TERA. Push back three times. Then get feedback.",
    whatItWillDo:
      "Future. Adaptive roleplay based on the LO's last recorded call. Targets the specific weakness flagged in the rubric.",
    exampleAsks: [
      "Roleplay a rate shopper. Push back three times.",
      "Roleplay a nervous first time buyer.",
      "Score me on the first call rubric for the call I just ran.",
    ],
  },
  {
    name: "Script Builder",
    level: "Intermediate",
    whatItDoesNow:
      "Today, use the Script Library plus the follow up prompts inside TERA.",
    whatItWillDo:
      "Future. Personalizes the closest matching library script using LO context, borrower context, and the compliance safe content rules.",
    exampleAsks: [
      "Personalize the realtor first outreach for [agent and brokerage].",
      "Draft a past client check in for [name] who closed in 2023.",
      "Rewrite this borrower email so it sounds more like me.",
    ],
  },
  {
    name: "Content Coach",
    level: "Intermediate",
    whatItDoesNow:
      "Today, use the social post and short video prompts. Run every output through the safe content decision tree.",
    whatItWillDo:
      "Future. Drafts a weekly content plan from one pillar and one borrower question. Pre runs the safe content decision tree before showing the draft.",
    exampleAsks: [
      "Draft three social post options on first time buyer down payment myths.",
      "Write a 60 second video script with the contrarian hook.",
      "Draft a Google Business Profile post about my city this week.",
    ],
  },
  {
    name: "Pipeline Review Coach",
    level: "Intermediate",
    whatItDoesNow:
      "Today, paste your pipeline into the pipeline review prompt in TERA.",
    whatItWillDo:
      "Future. Reads pipeline rows, flags the three files to call today, the two files at risk, and the process gap across the pipeline. Suggests one specific change for next week.",
    exampleAsks: [
      "Run my Friday pipeline review.",
      "Which past clients should I call this week and why.",
      "Find files without a dated next step.",
    ],
  },
  {
    name: "Team Leader Coach",
    level: "Team Leader",
    whatItDoesNow:
      "Today, use the team leader guide plus the weekly summary prompt for the team rollup.",
    whatItWillDo:
      "Future. Builds the weekly team scorecard, flags the bottom 20% on each category, and drafts the Friday review notes for each LO.",
    exampleAsks: [
      "Build this week's team scorecard.",
      "Flag the LOs behind on assignments.",
      "Draft this week's Monday team kickoff.",
    ],
  },
  {
    name: "Advanced AI Workflow Coach",
    level: "Advanced",
    whatItDoesNow:
      "Today, use the niche plan prompt and the prompt library. Build workflows in TERA, n8n, Claude Code, or Codex.",
    whatItWillDo:
      "Future. Helps the LO design an AI workflow stack from inputs to outputs to LO review steps. Documents the workflow for compliance review.",
    exampleAsks: [
      "Design a self employed niche workflow with prep, follow up, and content.",
      "Build a roleplay loop that scores me against the first call rubric.",
      "Document this workflow for compliance review.",
    ],
  },
];

export default function AICoachingAssistantPage() {
  return (
    <>
      <section className="bg-lf-navy text-white">
        <div className="container-page py-14">
          <span className="rounded-full bg-lf-orange px-3 py-1 text-xs font-bold uppercase tracking-wide">
            Planned
          </span>
          <h1 className="mt-5 font-display text-4xl font-semibold tracking-tight">
            AI Coaching Assistant
          </h1>
          <p className="mt-4 max-w-2xl text-lg text-white/85">
            A future feature. Today this page is a placeholder. In version one
            of the portal, the AI prompts run inside TERA. A built in coaching
            assistant is planned for a later release. Each mode below is tagged
            by skill level so you know where it fits.
          </p>
        </div>
      </section>

      <section className="container-page py-12">
        <SectionHeading
          eyebrow="Assistant modes"
          title="What the assistant will do, by mode."
          description="Each mode maps to a job an LO, team leader, or coach already does. The assistant will do them faster and more consistently. Outputs will always be drafts."
        />
        <div className="mt-8 grid gap-5 md:grid-cols-2">
          {modes.map((m) => (
            <article key={m.name} className="card flex flex-col gap-3">
              <div className="flex items-center justify-between">
                <h3 className="h-display text-lg">{m.name}</h3>
                <LevelTag level={m.level} />
              </div>
              <p className="prose-lf text-sm">
                <strong>What it will do: </strong>
                {m.whatItWillDo}
              </p>
              <p className="prose-lf text-sm text-lf-slate">
                <strong>What works today: </strong>
                {m.whatItDoesNow}
              </p>
              <div>
                <p className="text-xs font-semibold uppercase tracking-wide text-lf-slate">
                  Example asks
                </p>
                <ul className="prose-lf mt-2 list-disc space-y-1 pl-5 text-sm">
                  {m.exampleAsks.map((a) => (
                    <li key={a}>{a}</li>
                  ))}
                </ul>
              </div>
            </article>
          ))}
        </div>

        <div className="mt-10">
          <ComplianceCallout title="No AI is wired into this portal today">
            <p>
              The AI coaching assistant is a documented placeholder for the team
              and leadership. Version one of the site has no live AI
              integration. All AI work happens inside TERA. Drafts are always
              reviewed by the LO before any borrower or public use.
            </p>
          </ComplianceCallout>
        </div>
      </section>
    </>
  );
}
