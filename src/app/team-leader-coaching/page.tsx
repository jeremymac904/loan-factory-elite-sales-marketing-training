import Link from "next/link";
import PageHero from "@/components/PageHero";
import SectionHeading from "@/components/SectionHeading";

export const metadata = { title: "Team Leader Coaching" };

// PUBLIC internal overview page (no extra login; no private data). The Team
// Leader workspace, rosters, and coaching records stay behind sign-in.
const highlights = [
  {
    title: "Coaching for team builders",
    body: "Team Leader Coaching helps loan officers who are building a team lead, coach, and grow their people — not just produce themselves.",
  },
  {
    title: "1+1+1=5 team growth",
    body: "Community, persona, campaign, Realtor outreach, recruiting, and scorecard lanes designed for leaders growing a producing team.",
  },
  {
    title: "Accountability you run",
    body: "Tools to run your own weekly cadence with your team, aligned to the free Sales and Marketing 101-601 path and AI Advantage.",
  },
];

export default function TeamLeaderCoachingOverviewPage() {
  return (
    <>
      <PageHero
        eyebrow="Coaching program"
        title="Team Leader Coaching"
        body={
          <p>
            Team Leader Coaching is for loan officers building a team — lead,
            coach, and grow your people with a repeatable weekly system. This
            overview explains it; the Team Leader workspace and rosters require
            sign-in.
          </p>
        }
        backgroundImage="/media/dark-hero-background.png"
      >
        <div className="flex flex-wrap gap-3">
          <Link href="/coaching/" className="btn-primary">
            Compare coaching programs
          </Link>
          <Link
            href="/one-plus-one-five/"
            className="btn-secondary border-white/30 bg-white/10 text-white hover:border-white hover:bg-white/20"
          >
            Explore 1+1+1=5 team growth
          </Link>
        </div>
      </PageHero>

      <section className="container-page py-14">
        <SectionHeading
          title="What Team Leader Coaching covers"
          description="Coaching for the people growing a producing team."
        />
        <div className="mt-8 grid gap-5 md:grid-cols-3">
          {highlights.map((item) => (
            <article key={item.title} className="card">
              <h2 className="h-display text-lg">{item.title}</h2>
              <p className="prose-lf mt-2 text-sm text-lf-slate">{item.body}</p>
            </article>
          ))}
        </div>
        <p className="mt-8 text-sm text-lf-slate">
          Team rosters, member progress, and coaching notes are private — Team
          Leaders open them after sign-in. Talk to LO Development about leading a
          team.
        </p>
      </section>
    </>
  );
}
