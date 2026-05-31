import Link from "next/link";
import ComplianceCallout from "@/components/ComplianceCallout";
import PageHero from "@/components/PageHero";
import SectionHeading from "@/components/SectionHeading";

export const metadata = { title: "Member Leaderboards" };

const leaderboardLanes = [
  {
    title: "Activity consistency",
    description:
      "Weekly calls, partner touches, follow-up blocks, and completed tracker entries.",
  },
  {
    title: "Training completion",
    description:
      "101-601 progress, assigned roleplays, resource reviews, and quiz completion.",
  },
  {
    title: "Coaching follow-through",
    description:
      "Completed coach action items, scorecard updates, and session prep submitted on time.",
  },
  {
    title: "Community contribution",
    description:
      "Useful FaceGram examples, peer support, script improvements, and approved resource shares.",
  },
];

export default function MemberLeaderboardsPage() {
  return (
    <>
      <PageHero
        eyebrow="Member Area"
        title="Leaderboards that reward the controllable work."
        body={
          <p>
            Recognition should focus on effort, consistency, training progress,
            and useful contribution. Production claims stay out of this surface.
          </p>
        }
        backgroundImage="/media/dark-hero-background.png"
      >
        <div className="flex flex-wrap gap-3">
          <Link href="/member-area/lo-mastery/" className="btn-primary">
            LO Mastery
          </Link>
          <Link
            href="/member-area/alliance/"
            className="btn-secondary border-white/30 bg-white/10 text-white hover:border-white hover:bg-white/20"
          >
            Alliance
          </Link>
        </div>
      </PageHero>

      <section className="container-page py-12">
        <SectionHeading
          eyebrow="Score lanes"
          title="Use leaderboards as accountability, not income claims."
          description="These lanes are ready for the production data source when Jeremy approves persistence. Until then, they define the exact score model coaches can review."
        />
        <div className="mt-8 grid gap-5 md:grid-cols-2">
          {leaderboardLanes.map((lane) => (
            <article key={lane.title} className="card">
              <span className="text-xs font-semibold uppercase tracking-wide text-lf-orange">
                Leaderboard lane
              </span>
              <h2 className="h-display mt-2 text-xl">{lane.title}</h2>
              <p className="prose-lf mt-2 text-sm text-lf-slate">
                {lane.description}
              </p>
            </article>
          ))}
        </div>
      </section>

      <section className="container-page pb-16">
        <ComplianceCallout title="Recognition guardrail">
          <p>
            Leaderboards must not imply guaranteed production, income, approval,
            or business outcomes. They should recognize controllable behaviors
            and completed training work only.
          </p>
        </ComplianceCallout>
      </section>
    </>
  );
}
