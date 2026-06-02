import Link from "next/link";
import { getCoachingAccess, type CoachingTier } from "@/lib/coachingAccess";

export const dynamic = "force-dynamic";
export const metadata = { title: "Member Area" };

const tierLabels: Record<CoachingTier, string> = {
  staff: "Coach / admin access",
  alliance: "Loan Factory Alliance ($449)",
  lo_mastery: "LO Mastery Coaching ($249)",
  none: "No paid coaching tier yet",
};

const quickLinks = [
  {
    title: "Weekly scorecards",
    description: "Submit the work you actually did this week.",
    href: "/member-area/scorecards/",
  },
  {
    title: "Member resources",
    description: "Open the coaching resource hub and member tools.",
    href: "/resources/",
  },
  {
    title: "Coaching calendar",
    description: "See the call schedule and coaching event drafts.",
    href: "/coach-command-center/calendar/",
  },
  {
    title: "Leaderboards",
    description: "See accountability and coaching follow-through lanes.",
    href: "/member-area/leaderboards/",
  },
];

export default async function MemberAreaPage() {
  const access = await getCoachingAccess();

  const loMasteryBadge = access.canLoMastery
    ? access.tier === "lo_mastery"
      ? "Your tier"
      : "Included"
    : "Members only";

  const allianceBadge = access.canAlliance
    ? access.tier === "alliance"
      ? "Your tier"
      : "Included"
    : access.isUpgradePreview
      ? "Upgrade"
      : "Members only";

  return (
    <>
      <section className="relative isolate overflow-hidden bg-lf-navy text-white">
        <div
          aria-hidden
          className="absolute inset-0 bg-cover bg-center opacity-35"
          style={{ backgroundImage: "url(/media/dark-hero-background.png)" }}
        />
        <div className="relative container-page py-14">
          <p className="text-xs font-bold uppercase tracking-wide text-lf-orange">
            Coaching Member Area
          </p>
          <h1 className="mt-5 font-display text-4xl font-semibold tracking-tight">
            Your coaching dashboard
          </h1>
          <p className="mt-4 max-w-2xl text-lg text-white/85">
            Open the tier that matches your paid coaching program, then keep up
            with scorecards, resources, and your next coaching step.
          </p>
          {access.viewingAsLabel && (
            <p className="mt-3 inline-block rounded-full bg-white/20 px-3 py-1 text-xs font-semibold">
              Viewing as: {access.viewingAsLabel}
            </p>
          )}
        </div>
      </section>

      <section className="container-page py-10">
        <div className="card mb-6 max-w-xl border-lf-orange/30 bg-lf-orangeSoft/30">
          <p className="text-xs font-semibold uppercase tracking-wide text-lf-orangeDark">
            Your coaching access
          </p>
          <p className="mt-1 text-base font-semibold text-lf-charcoal">
            {tierLabels[access.tier]}
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          <Link
            href="/member-area/lo-mastery/"
            className="card flex flex-col gap-4 transition hover:-translate-y-0.5 hover:shadow-lift"
          >
            <div className="flex items-center justify-between gap-2">
              <div className="flex items-baseline gap-2">
                <h2 className="font-display text-2xl font-semibold text-lf-charcoal">
                  LO Mastery Coaching
                </h2>
                <span className="text-sm font-bold text-lf-orange">$249/mo</span>
              </div>
              <span className="rounded-full bg-lf-mist px-2.5 py-0.5 text-xs font-semibold text-lf-slate">
                {loMasteryBadge}
              </span>
            </div>
            <p className="prose-lf text-sm">
              Simple weekly coaching, scorecards, accountability, and member
              resources for loan officers who want consistency.
            </p>
            <span className="mt-auto inline-flex items-center text-sm font-semibold text-lf-orange">
              Open LO Mastery <span aria-hidden className="ml-2">&rarr;</span>
            </span>
          </Link>

          <Link
            href="/member-area/alliance/"
            className="card flex flex-col gap-4 transition hover:-translate-y-0.5 hover:shadow-lift"
          >
            <div className="flex items-center justify-between gap-2">
              <div className="flex items-baseline gap-2">
                <h2 className="font-display text-2xl font-semibold text-lf-charcoal">
                  Loan Factory Alliance
                </h2>
                <span className="text-sm font-bold text-lf-orange">$449/mo</span>
              </div>
              <span className="rounded-full bg-lf-mist px-2.5 py-0.5 text-xs font-semibold text-lf-slate">
                {allianceBadge}
              </span>
            </div>
            <p className="prose-lf text-sm">
              More frequent coaching, deeper accountability, mastermind prep,
              and advanced member support for Loan Factory Alliance.
            </p>
            <span className="mt-auto inline-flex items-center text-sm font-semibold text-lf-orange">
              Open Alliance <span aria-hidden className="ml-2">&rarr;</span>
            </span>
          </Link>
        </div>
      </section>

      <section className="container-page py-6">
        <div className="card">
          <h2 className="h-display text-xl">What opens next</h2>
          <div className="mt-4 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
            {quickLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="rounded-xl border border-lf-line bg-lf-mist/40 p-4 transition hover:border-lf-orange hover:bg-white hover:shadow-lift"
              >
                <h3 className="text-base font-semibold text-lf-charcoal">
                  {link.title}
                </h3>
                <p className="mt-1 text-sm text-lf-slate">{link.description}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
