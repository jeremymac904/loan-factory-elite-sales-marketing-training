import Link from "next/link";
import { getCoachingAccess } from "@/lib/coachingAccess";
import LockedResourceCard from "@/components/LockedResourceCard";

export const dynamic = "force-dynamic";
export const metadata = { title: "LO Mastery Coaching · Member Area" };

const sections = [
  {
    title: "Daily Power Hour",
    description: "Morning focus block with prompts, prospecting plan, and follow-up.",
    href: "/calendar/",
  },
  {
    title: "Biweekly group coaching",
    description: "Live group coaching with Edward and the LO Mastery team.",
    href: "/coaching/",
  },
  {
    title: "Daily coaching email",
    description: "Daily action prompt delivered to your inbox.",
    href: "/ai-assistants/email-drafts/",
  },
  {
    title: "Certified Mortgage Advisor track",
    description: "Progress through the CMA certification path.",
    href: "/apex-certifications/",
  },
  {
    title: "Scripts library",
    description: "Internal scripts for calls, follow-up, and Realtor conversations.",
    href: "/scripts/",
  },
  {
    title: "Trackers",
    description: "Daily and weekly trackers for activity, pipeline, and follow-up.",
    href: "/trackers/",
  },
  {
    title: "Resource library",
    description: "Sales & Marketing 101-601, AI Advantage, and coaching resources.",
    href: "/resources/",
  },
  {
    title: "Leaderboard",
    description: "Team and member leaderboard for coaching activity and wins.",
    href: "/apex-leaderboards/",
  },
  {
    title: "LO Mastery Coaching Assistant",
    description: "Your daily AI coaching assistant — Power Hour prompts, follow-up drafts, accountability check-ins.",
    href: "/ai-assistants/my-ai-twin/",
  },
  {
    title: "Market Mentor Studio",
    description: "Market updates, rate explainers, buy-vs-rent, and cost-of-waiting tools to use with borrowers and Realtors.",
    href: "/market-mentor/",
  },
];

export default async function LoMasteryMemberAreaPage() {
  const access = await getCoachingAccess();
  const open = access.canLoMastery;

  return (
    <>
      <section className="relative isolate overflow-hidden bg-lf-navy text-white">
        <div
          aria-hidden
          className="absolute inset-0 bg-cover bg-center opacity-35"
          style={{ backgroundImage: "url(/media/dark-hero-background.png)" }}
        />
        <div className="relative container-page py-12">
          <div className="flex items-center gap-3">
            <Link href="/member-area/" className="text-sm font-semibold text-white/70 hover:text-white">
              Member Area
            </Link>
            <span className="text-white/40">/</span>
            <span className="text-sm font-semibold text-white">LO Mastery Coaching</span>
          </div>
          <h1 className="mt-3 font-display text-4xl font-semibold tracking-tight">
            LO Mastery Coaching · $249
          </h1>
          <p className="mt-3 max-w-2xl text-lg text-white/85">
            Daily rhythm, accountability, and coaching to grow your business.
          </p>
          {access.viewingAsLabel && (
            <p className="mt-3 inline-block rounded-full bg-white/20 px-3 py-1 text-xs font-semibold">
              View-As preview: {access.viewingAsLabel}
            </p>
          )}
        </div>
      </section>

      {!open && (
        <section className="container-page pt-8">
          <div className="card border-lf-orange/40 bg-lf-orangeSoft/40">
            <p className="text-xs font-semibold uppercase tracking-wide text-lf-orangeDark">
              Coaching membership
            </p>
            <h2 className="h-display mt-1 text-2xl">
              LO Mastery Coaching is a paid coaching membership.
            </h2>
            <p className="prose-lf mt-2 text-sm">
              LO Mastery ($249/mo) gives you the daily Power Hour rhythm, biweekly
              group coaching, the Certified Mortgage Advisor track, scripts,
              trackers, and your coaching AI assistant. Preview what&apos;s
              included below, then talk to the coaching team to join.
            </p>
            <div className="mt-4 flex flex-wrap gap-3">
              <Link href="/lo-mastery-coaching/" className="btn-primary">
                See LO Mastery & join
              </Link>
              <Link href="/support-routing/" className="btn-secondary">
                Contact the coaching team
              </Link>
            </div>
          </div>
        </section>
      )}

      <section className="container-page py-10">
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {sections.map((s) =>
            open ? (
              <Link
                key={s.href}
                href={s.href}
                className="card flex flex-col gap-2 transition hover:-translate-y-0.5 hover:shadow-lift"
              >
                <h2 className="text-base font-semibold text-lf-charcoal">
                  {s.title}
                </h2>
                <p className="text-sm text-lf-slate">{s.description}</p>
                <span className="mt-auto inline-flex items-center text-sm font-semibold text-lf-orange">
                  Open <span aria-hidden className="ml-2">&rarr;</span>
                </span>
              </Link>
            ) : (
              <LockedResourceCard
                key={s.href}
                title={s.title}
                description={s.description}
                message="Join LO Mastery Coaching to unlock this resource."
                ctaHref="/lo-mastery-coaching/"
                ctaLabel="Join LO Mastery"
              />
            ),
          )}
        </div>
      </section>
    </>
  );
}
