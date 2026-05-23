import SectionHeading from "@/components/SectionHeading";
import GeminiGemCallout from "@/components/GeminiGemCallout";
import { SkillLevel } from "@/lib/utils";

export const metadata = { title: "AI Coaching Assistant" };

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
      "Today, use the 101 prompts inside your Gemini Gem AI Twin. They are the same starting point.",
    whatItWillDo:
      "Walks a brand new LO through one daily action at a time. Confidence builder, not a feature dump.",
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
      "Today, use the roleplay prompt with your Gemini Gem AI Twin. Push back three times. Then get feedback.",
    whatItWillDo:
      "Runs adaptive roleplay from LO practice notes and targets the specific weakness flagged in the rubric.",
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
      "Today, use the Script Library plus the follow up prompts inside your Gemini Gem AI Twin.",
    whatItWillDo:
      "Personalizes the closest matching library script using LO context, borrower context, and safe content rules.",
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
      "Drafts a weekly content plan from one pillar and one borrower question, then checks clarity before showing the draft.",
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
      "Today, paste your pipeline into the pipeline review prompt in your Gemini Gem AI Twin.",
    whatItWillDo:
      "Turns pipeline notes into the three files to call today, the two files to watch, and one specific improvement for next week.",
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
      "Builds a weekly team scorecard draft and creates Friday review notes for coaching conversations.",
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
      "Today, use the niche plan prompt and the prompt library to plan one repeatable AI routine.",
    whatItWillDo:
      "Helps the LO design a simple AI routine from input, to draft, to human review.",
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
      <section className="relative isolate overflow-hidden bg-lf-navy text-white">
        <video
          aria-hidden
          className="absolute inset-0 h-full w-full object-cover"
          autoPlay
          loop
          muted
          playsInline
          preload="metadata"
          poster="/media/dark-hero-background.png"
        >
          <source src="/media/dark-premium-AI-workflow.mp4" type="video/mp4" />
        </video>
        <div aria-hidden className="absolute inset-0 bg-lf-navyDark/60" />
        <div className="relative container-page py-14">
          <h1 className="mt-5 font-display text-4xl font-semibold tracking-tight">
            AI Coaching Assistant
          </h1>
          <p className="mt-4 max-w-2xl text-lg text-white/85">
            A practical guide for using Gemini Gem AI Twin prompts to coach
            sales practice, roleplays, content drafting, and weekly LO
            development habits.
          </p>
        </div>
      </section>

      <section className="container-page pt-10">
        <GeminiGemCallout compact showWalkthroughLink={false} />
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
                <span className="text-xs font-semibold uppercase tracking-wide text-lf-orange">
                  {m.level}
                </span>
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

        <p className="mt-10 max-w-3xl text-sm leading-6 text-lf-slate">
          Use Gemini Gem AI Twin for the actual draft. Review every output
          before borrower, partner, recruiting, or marketing use.
        </p>
      </section>
    </>
  );
}
