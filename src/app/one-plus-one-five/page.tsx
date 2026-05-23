import Link from "next/link";
import {
  ComplianceNotice,
  ListBlock,
  PersonaShell,
  ReadOnlyCallout,
  TextBlock,
} from "@/components/persona-intelligence/PersonaModule";
import {
  boardroomReviewCategories,
  personaCommunities,
  personaTemplates,
  teamLaneAssignments,
} from "@/data/personaIntelligence";

export const metadata = { title: "1+1+1=5 Team Growth Platform" };

const moduleCards = [
  {
    title: "Persona Library",
    href: "/one-plus-one-five/personas/",
    description: "Pick buyer, Realtor, or recruiting templates before planning a campaign.",
  },
  {
    title: "Community Intelligence",
    href: "/one-plus-one-five/communities/",
    description: "Review local planning notes for all 29 community profiles.",
  },
  {
    title: "Campaign Builder",
    href: "/one-plus-one-five/campaign-builder/",
    description: "Build a Team Leader campaign lane for weekly execution.",
  },
  {
    title: "Funnel Strategy",
    href: "/one-plus-one-five/funnel-strategy/",
    description: "See awareness, consideration, application, and follow-up ideas.",
  },
  {
    title: "Realtor Outreach",
    href: "/one-plus-one-five/realtor-outreach/",
    description: "Plan partner education and Realtor value assets.",
  },
  {
    title: "Recruiting Strategy",
    href: "/one-plus-one-five/recruiting/",
    description: "Use internal recruiting angles for new, producing, and bilingual LOs.",
  },
  {
    title: "AI Boardroom Review",
    href: "/one-plus-one-five/ai-boardroom/",
    description: "Use review categories before a campaign leaves planning.",
  },
  {
    title: "Team Leader Playbook",
    href: "/one-plus-one-five/team-leader-playbook/",
    description: "Assign LO lanes and run a simple weekly execution rhythm.",
  },
  {
    title: "Scorecards",
    href: "/one-plus-one-five/scorecards/",
    description: "Track tags, review status, fit score, and localization risk.",
  },
];

export default function OnePlusOneFivePage() {
  return (
    <PersonaShell
      title="1+1+1=5 Team Growth Platform"
      description="A Team Leader planning tool that helps teams stop marketing alone, choose a community, choose an audience, and assign clear campaign lanes."
    >
      <section className="container-page py-14">
        <div className="grid gap-5 lg:grid-cols-[minmax(0,1.2fr)_minmax(280px,0.8fr)]">
          <TextBlock title="Stop marketing alone">
            <p>
              1+1+1=5 helps a Team Leader turn one idea into multiple useful
              team lanes: buyer education, Realtor outreach, recruiting,
              community events, and follow-up.
            </p>
            <p>
              Start with one community, one audience, and one campaign goal.
              Then assign each LO a lane for the week.
            </p>
          </TextBlock>
          <ListBlock
            title="What should I do this week?"
            items={[
              "Pick one community to review.",
              "Choose buyer, Realtor, or recruiting audience.",
              "Assign one LO to one content lane.",
              "Draft only internal ideas until review is complete.",
              "Track conversations, meetings, and next steps.",
            ]}
          />
        </div>

        <div className="mt-8 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {moduleCards.map((card) => (
            <Link
              key={card.href}
              href={card.href}
              className="card flex h-full flex-col transition hover:-translate-y-0.5 hover:shadow-lift"
            >
              <h2 className="h-display text-xl">{card.title}</h2>
              <p className="prose-lf mt-3 text-sm text-lf-slate">
                {card.description}
              </p>
              <span className="mt-auto pt-5 text-sm font-semibold text-lf-orange">
                Open &rarr;
              </span>
            </Link>
          ))}
        </div>
      </section>

      <section className="container-page pb-14">
        <div className="grid gap-5 lg:grid-cols-3">
          <ListBlock
            title="Current planning data"
            items={[
              `${personaCommunities.length} community profiles`,
              `${personaTemplates.length} persona templates`,
              `${teamLaneAssignments.length} sample team lanes`,
              `${boardroomReviewCategories.length} review categories`,
            ]}
          />
          <ListBlock
            title="How this helps a Team Leader"
            items={[
              "Clarifies who the team is trying to reach.",
              "Turns strategy into weekly LO assignments.",
              "Keeps campaign ideas tied to review gates.",
              "Shows how future scorecards will measure the work.",
            ]}
          />
          <ListBlock
            title="Where this connects"
            items={[
              "Campaign Builder",
              "Funnel recommendations",
              "AI Boardroom review",
              "Team scorecards",
              "LO Development reporting",
            ]}
          />
        </div>
        <div className="mt-8">
          <ReadOnlyCallout>
            Keep this as an internal planning worksheet. Human review is
            required before any public campaign, ad, post, or email.
          </ReadOnlyCallout>
        </div>
        <div className="mt-6">
          <ComplianceNotice />
        </div>
      </section>
    </PersonaShell>
  );
}
