import Link from "next/link";
import { getCoachingAccess } from "@/lib/coachingAccess";
import LockedResourceCard from "@/components/LockedResourceCard";

export const dynamic = "force-dynamic";
export const metadata = { title: "LO Mastery Coaching · Member Area" };

const sections = [
  {
    title: "Daily Power Hour",
    description: "Morning focus block with prompts, prospecting plan, and follow-up.",
    href: "/coach-command-center/calendar/",
  },
  {
    title: "Weekly scorecards",
    description: "Submit the week&apos;s activity and let your coach review it.",
    href: "/member-area/scorecards/",
  },
  {
    title: "Resources",
    description: "Scripts, guides, scorecard tools, and member references.",
    href: "/resources/",
  },
  {
    title: "Leaderboards",
    description: "Recognition for controllable work, consistency, and follow-through.",
    href: "/member-area/leaderboards/",
  },
  {
    title: "Member progress",
    description: "Attendance, commitments, accountability, and next action.",
    href: "/coach-command-center/member-progress/",
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
            Daily rhythm, accountability, and coaching tools for loan officers
            who want a simpler weekly plan.
          </p>
          {access.viewingAsLabel && (
            <p className="mt-3 inline-block rounded-full bg-white/20 px-3 py-1 text-xs font-semibold">
              Viewing as: {access.viewingAsLabel}
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
              LO Mastery gives you the daily Power Hour rhythm, group coaching,
              the Certified Mortgage Advisor track, scorecards, and member
              resources. Preview what&apos;s included below, then ask Jeremy to
              approve your access.
            </p>
            <div className="mt-4 flex flex-wrap gap-3">
              <Link href="/lo-mastery-coaching/" className="btn-primary">
                See LO Mastery
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
          {open
            ? sections.map((s) => (
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
              ))
            : sections.map((s) => (
                <LockedResourceCard
                  key={s.href}
                  title={s.title}
                  description={s.description}
                  message="Join LO Mastery Coaching to unlock this resource."
                  ctaHref="/lo-mastery-coaching/"
                  ctaLabel="Join LO Mastery"
                />
              ))}
        </div>
      </section>
    </>
  );
}
