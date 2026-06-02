import Link from "next/link";
import { getCoachingAccess } from "@/lib/coachingAccess";
import LockedResourceCard from "@/components/LockedResourceCard";

export const dynamic = "force-dynamic";
export const metadata = { title: "Loan Factory Alliance · Member Area" };

const sections = [
  {
    title: "Daily Breakfast Club",
    description: "Morning live for Alliance members: wins, blockers, and focus.",
    href: "/coach-command-center/calendar/",
  },
  {
    title: "Weekly coaching",
    description: "Weekly coaching rhythm with stronger accountability.",
    href: "/coach-command-center/",
  },
  {
    title: "Biweekly mastermind",
    description: "Strategy, leadership growth, and next-action clarity.",
    href: "/member-area/mastermind/",
  },
  {
    title: "Advanced certifications",
    description: "Leadership and specialty-track progress for Alliance members.",
    href: "/member-area/certifications/",
  },
  {
    title: "Scorecards",
    description: "Alliance weekly scorecard review and follow-up.",
    href: "/member-area/scorecards/",
  },
  {
    title: "Resources",
    description: "Coaching resources, notes, and member support.",
    href: "/resources/",
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
            Advanced coaching, mastermind-level strategy, and deeper
            accountability for loan officers ready for more touchpoints.
          </p>
          {access.viewingAsLabel && (
            <p className="mt-3 inline-block rounded-full bg-white/20 px-3 py-1 text-xs font-semibold">
              Viewing as: {access.viewingAsLabel}
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
                ? "Alliance adds weekly coaching, the daily Breakfast Club, biweekly mastermind, advanced certifications, and stronger accountability. The premium resources below unlock when you upgrade."
                : "Alliance builds on LO Mastery with weekly coaching, mastermind, Breakfast Club, and leadership growth. Preview what&apos;s included below, then ask Jeremy to approve your access."}
            </p>
            <div className="mt-4 flex flex-wrap gap-3">
              <Link href="/loan-factory-alliance/" className="btn-primary">
                See Alliance
              </Link>
              <Link href="/login/" className="btn-secondary">
                Sign in
              </Link>
            </div>
          </div>
        </section>
      )}

      <section className="container-page py-10">
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {sections.map((s) =>
            fullAccess ? (
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
                message={
                  upgrade
                    ? "Upgrade to Loan Factory Alliance for this resource."
                    : "Join Loan Factory Alliance to unlock this resource."
                }
                ctaHref="/loan-factory-alliance/"
                ctaLabel={upgrade ? "Upgrade to Alliance" : "Join Alliance"}
              />
            ),
          )}
        </div>
      </section>
    </>
  );
}
