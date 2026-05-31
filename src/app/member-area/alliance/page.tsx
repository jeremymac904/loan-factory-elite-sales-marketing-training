import Link from "next/link";
import { getCoachingAccess } from "@/lib/coachingAccess";
import LockedResourceCard from "@/components/LockedResourceCard";

export const dynamic = "force-dynamic";
export const metadata = { title: "Loan Factory Alliance · Member Area" };

const sections = [
  {
    title: "Daily Breakfast Club",
    description: "Daily morning live with the Alliance — wins, blockers, focus.",
    href: "/calendar/",
    premium: true,
  },
  {
    title: "Weekly coaching",
    description: "Weekly live coaching with the Alliance coach team.",
    href: "/coaching/",
    premium: true,
  },
  {
    title: "Biweekly Mastermind",
    description: "Mastermind sessions for advanced producers and team leaders.",
    href: "/member-area/mastermind/",
    premium: true,
  },
  {
    title: "Advanced certifications",
    description: "Advanced certifications including leadership and team builder track.",
    href: "/member-area/certifications/",
    premium: true,
  },
  {
    title: "Priority coaching",
    description: "Priority access to coaching support and reviews.",
    href: "/coaching/",
    premium: true,
  },
  {
    title: "Leadership / team builder track",
    description: "1+1+1=5 team growth content for team leaders inside the Alliance.",
    href: "/one-plus-one-five/",
    premium: true,
  },
  {
    title: "Mastermind resources",
    description: "Mastermind prep docs, scorecards, and recordings.",
    href: "/member-area/mastermind/",
    premium: true,
  },
  {
    title: "Alliance AI Coaching Assistant",
    description: "Strategy, mastermind prep, leadership coaching, and follow-up at the Alliance level.",
    href: "/ai-assistants/my-ai-twin/",
    premium: true,
  },
  {
    title: "Market Mentor Studio (advanced)",
    description: "Advanced Market Mentor tools — debt consolidation, Realtor market updates, roleplay, and the video studio.",
    href: "/market-mentor/",
    premium: true,
  },
  {
    title: "Everything in LO Mastery",
    description: "All LO Mastery Coaching content plus the upgrades above.",
    href: "/member-area/lo-mastery/",
    premium: false,
  },
];

export default async function AllianceMemberAreaPage() {
  const access = await getCoachingAccess();
  const fullAccess = access.canAlliance;
  const upgrade = access.isUpgradePreview;

  return (
    <>
      <section className="relative isolate overflow-hidden bg-lf-orange text-white">
        <div
          aria-hidden
          className="absolute inset-0 bg-cover bg-center opacity-25"
          style={{ backgroundImage: "url(/media/dark-hero-background.png)" }}
        />
        <div className="relative container-page py-12">
          <div className="flex items-center gap-3">
            <Link href="/member-area/" className="text-sm font-semibold text-white/80 hover:text-white">
              Member Area
            </Link>
            <span className="text-white/60">/</span>
            <span className="text-sm font-semibold text-white">Loan Factory Alliance</span>
          </div>
          <h1 className="mt-3 font-display text-4xl font-semibold tracking-tight">
            Loan Factory Alliance · $449
          </h1>
          <p className="mt-3 max-w-2xl text-lg text-white/90">
            Advanced coaching, mastermind-level strategy, leadership growth.
          </p>
          {access.viewingAsLabel && (
            <p className="mt-3 inline-block rounded-full bg-white/20 px-3 py-1 text-xs font-semibold">
              View-As preview: {access.viewingAsLabel}
            </p>
          )}
        </div>
      </section>

      {!fullAccess && (
        <section className="container-page pt-8">
          <div className="card border-lf-orange/40 bg-lf-orangeSoft/40">
            <p className="text-xs font-semibold uppercase tracking-wide text-lf-orangeDark">
              {upgrade ? "Upgrade preview" : "Alliance membership"}
            </p>
            <h2 className="h-display mt-1 text-2xl">
              {upgrade
                ? "You're on LO Mastery. Loan Factory Alliance is the next step."
                : "Loan Factory Alliance is a premium coaching membership."}
            </h2>
            <p className="prose-lf mt-2 text-sm">
              {upgrade
                ? "Alliance adds weekly coaching, the daily Breakfast Club, biweekly Mastermind, advanced certifications, and the Alliance AI Coaching Assistant. The premium resources below unlock when you upgrade."
                : "Alliance ($449/mo) builds on LO Mastery with weekly coaching, Mastermind, Breakfast Club, and leadership tracks. Preview what's included below, then talk to the coaching team to join."}
            </p>
            <div className="mt-4 flex flex-wrap gap-3">
              <Link href="/loan-factory-alliance/" className="btn-primary">
                {upgrade ? "Upgrade to Alliance" : "See Alliance & join"}
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
          {sections.map((s) => {
            const locked = !fullAccess && (s.premium || !upgrade);
            if (locked) {
              return (
                <LockedResourceCard
                  key={s.title}
                  title={s.title}
                  description={s.description}
                  message={
                    upgrade
                      ? "Upgrade to Loan Factory Alliance for this resource."
                      : "Join Loan Factory Alliance to unlock this resource."
                  }
                  ctaHref="/loan-factory-alliance/"
                  ctaLabel={upgrade ? "Upgrade to Alliance" : "Join Alliance"}
                />
              );
            }
            return (
              <Link
                key={s.title}
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
            );
          })}
        </div>
      </section>
    </>
  );
}
