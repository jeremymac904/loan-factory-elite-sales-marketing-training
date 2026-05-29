import Link from "next/link";
import { getCoachingAccess, type CoachingTier } from "@/lib/coachingAccess";

export const dynamic = "force-dynamic";
export const metadata = { title: "Member Area" };

const tierLabels: Record<CoachingTier, string> = {
  staff: "Full coaching access (staff / admin)",
  alliance: "Loan Factory Alliance ($449)",
  lo_mastery: "LO Mastery Coaching ($249)",
  none: "Not enrolled in a coaching tier yet",
};

export default async function MemberAreaPage() {
  const access = await getCoachingAccess();

  // LO Mastery card state
  const loMastery = access.canLoMastery
    ? { badge: access.tier === "lo_mastery" ? "Your tier" : "Included", cta: "Open LO Mastery" }
    : { badge: "Members only", cta: "Preview & join" };

  // Alliance card state
  const alliance = access.canAlliance
    ? { badge: access.tier === "alliance" ? "Your tier" : "Included", cta: "Open Alliance" }
    : access.isUpgradePreview
      ? { badge: "Upgrade", cta: "Preview & upgrade" }
      : { badge: "Members only", cta: "Preview & join" };

  const tiers = [
    {
      name: "LO Mastery Coaching",
      price: "$249",
      href: "/member-area/lo-mastery/",
      description:
        "Daily rhythm, Power Hour, biweekly group coaching, Certified Mortgage Advisor track, scripts, trackers, AI Mastery Coaching Assistant.",
      ...loMastery,
    },
    {
      name: "Loan Factory Alliance",
      price: "$449",
      href: "/member-area/alliance/",
      description:
        "Everything in LO Mastery plus weekly coaching, daily Breakfast Club, biweekly Mastermind, advanced certifications, leadership/team builder track, Alliance AI Assistant.",
      ...alliance,
    },
  ];

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
            Coaching membership
          </h1>
          <p className="mt-4 max-w-2xl text-lg text-white/85">
            Open coaching resources, recordings, trackers, scripts, and your
            coaching AI assistant for your tier.
          </p>
          {access.viewingAsLabel && (
            <p className="mt-3 inline-block rounded-full bg-white/20 px-3 py-1 text-xs font-semibold">
              View-As preview: {access.viewingAsLabel}
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
          {tiers.map((t) => (
            <Link
              key={t.name}
              href={t.href}
              className="card flex flex-col gap-4 transition hover:-translate-y-0.5 hover:shadow-lift"
            >
              <div className="flex items-center justify-between gap-2">
                <div className="flex items-baseline gap-2">
                  <h2 className="font-display text-2xl font-semibold text-lf-charcoal">
                    {t.name}
                  </h2>
                  <span className="text-sm font-bold text-lf-orange">
                    {t.price}/mo
                  </span>
                </div>
                <span className="rounded-full bg-lf-mist px-2.5 py-0.5 text-xs font-semibold text-lf-slate">
                  {t.badge}
                </span>
              </div>
              <p className="prose-lf text-sm">{t.description}</p>
              <span className="mt-auto inline-flex items-center text-sm font-semibold text-lf-orange">
                {t.cta} <span aria-hidden className="ml-2">&rarr;</span>
              </span>
            </Link>
          ))}
        </div>

        {(access.isMember || access.isStaff) && (
          <div className="mt-8 card max-w-2xl border-lf-orange/30 bg-lf-orangeSoft/30">
            <h2 className="h-display text-xl">Market Mentor Studio</h2>
            <p className="prose-lf mt-2 text-sm">
              Market updates, rate explainers, buy-vs-rent, cost-of-waiting, and
              video scripts to use with borrowers and Realtors. Core tools on LO
              Mastery; advanced tools on Loan Factory Alliance.
            </p>
            <Link href="/market-mentor/" className="btn-primary mt-4 inline-block">
              Open Market Mentor Studio
            </Link>
          </div>
        )}

        {!access.isMember && !access.isStaff && (
          <div className="mt-8 card max-w-2xl">
            <h2 className="h-display text-xl">New to Loan Factory coaching?</h2>
            <p className="prose-lf mt-2 text-sm">
              Coaching membership is optional and separate from your Sales &amp;
              Marketing training. See how LO Mastery and the Loan Factory
              Alliance work, then talk to the coaching team when you&apos;re
              ready.
            </p>
            <div className="mt-4 flex flex-wrap gap-3">
              <Link href="/coaching/" className="btn-primary">
                See coaching overview
              </Link>
              <Link href="/support-routing/" className="btn-secondary">
                Contact the coaching team
              </Link>
            </div>
          </div>
        )}
      </section>
    </>
  );
}
