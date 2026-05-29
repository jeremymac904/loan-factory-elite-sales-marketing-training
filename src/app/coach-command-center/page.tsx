import Link from "next/link";
import { getCoachAccess, type CoachScope } from "@/lib/coachAccess";
import CoachCommandNav from "@/components/coach/CoachCommandNav";
import {
  statusMeta,
  peopleForScope,
  todaysActions,
  activitySnapshot,
} from "@/data/coachCommandCenter";

export const dynamic = "force-dynamic";
export const metadata = { title: "Coach Command Center" };

const scopeIntro: Record<CoachScope, string> = {
  all: "You see every coach, team leader, and assigned member across Loan Factory — org-wide coaching at a glance.",
  corporate_coach:
    "You coach new LOs through corporate onboarding — welcome calls, first-file survival, and foundation training.",
  lo_development:
    "You run LO Development — corporate onboarding plus paid coaching members moving through the mastery path.",
  team_leader:
    "You lead your team — the LOs assigned to you for day-to-day coaching, accountability, and pipeline focus.",
  none: "You can open the Coach Command Center to review coaching tools and resources.",
};

const quickTools: { title: string; description: string; href: string }[] = [
  {
    title: "Messages",
    description: "Draft coaching nudges and check-ins to copy and send.",
    href: "/coach-command-center/messages/",
  },
  {
    title: "Email center",
    description: "Coaching email drafts — copy or create a Gmail draft.",
    href: "/coach-command-center/email-center/",
  },
  {
    title: "Calendar",
    description: "Coaching sessions, Power Hours, and training invites.",
    href: "/coach-command-center/calendar/",
  },
  {
    title: "Training plan",
    description: "Assign lessons, clips, scripts, and roleplays.",
    href: "/coach-command-center/training-plan/",
  },
  {
    title: "Scorecards",
    description: "Review weekly execution and next-week commitments.",
    href: "/coach-command-center/scorecards/",
  },
  {
    title: "Coaching notes",
    description: "Capture wins, blockers, and follow-ups per LO.",
    href: "/coach-command-center/coaching-notes/",
  },
  {
    title: "Member progress",
    description: "Onboarding, path, certification, and AI Twin status.",
    href: "/coach-command-center/member-progress/",
  },
  {
    title: "Market Mentor Studio",
    description:
      "Use Market Mentor with a coaching member — market updates, rate explainers, buy-vs-rent, and video scripts.",
    href: "/market-mentor/",
  },
];

export default async function CoachCommandCenterPage() {
  const access = await getCoachAccess();
  const people = peopleForScope(access.scope).slice(0, 5);

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
            Coach Command Center
          </p>
          <h1 className="mt-5 font-display text-4xl font-semibold tracking-tight">
            Your coaching dashboard
          </h1>
          <p className="mt-4 max-w-2xl text-lg text-white/85">
            One place to coach your people, plan your day, and keep your team
            moving forward.
          </p>
          {access.viewingAsLabel && (
            <p className="mt-4 inline-block rounded-full bg-white/20 px-3 py-1 text-xs font-semibold">
              View-As preview: {access.viewingAsLabel}
            </p>
          )}
        </div>
      </section>

      <CoachCommandNav
        current="/coach-command-center/"
        showAdmin={access.seesAll}
      />

      <section className="container-page py-10">
        <div className="card border-lf-orange/30 bg-lf-orangeSoft/40">
          <p className="text-xs font-semibold uppercase tracking-wide text-lf-orangeDark">
            {access.effectiveRoleLabel}
          </p>
          <p className="prose-lf mt-1 text-base text-lf-charcoal">
            {scopeIntro[access.scope]}
          </p>
        </div>
      </section>

      <section className="container-page pb-10">
        <div className="flex items-center justify-between gap-4">
          <h2 className="h-display text-2xl">My People</h2>
          <Link
            href="/coach-command-center/team/"
            className="text-sm font-semibold text-lf-orange hover:underline"
          >
            View all <span aria-hidden>&rarr;</span>
          </Link>
        </div>
        <div className="card mt-4 overflow-hidden p-0">
          {people.length === 0 ? (
            <div className="px-5 py-6">
              <p className="prose-lf text-sm">
                No people are assigned to you yet. Coaching assignments appear
                here once they&apos;re set up.
              </p>
            </div>
          ) : (
            <ul className="divide-y divide-lf-line">
              {people.map((p) => (
                <li
                  key={p.id}
                  className="flex flex-wrap items-center justify-between gap-3 px-5 py-4"
                >
                  <div className="min-w-0">
                    <p className="truncate text-sm font-semibold text-lf-charcoal">
                      {p.name}
                    </p>
                    <p className="truncate text-xs text-lf-slate">
                      {p.program} · Next: {p.nextTask}
                    </p>
                  </div>
                  <span
                    className={`rounded-full px-2.5 py-0.5 text-xs font-semibold ${statusMeta[p.status].class}`}
                  >
                    {statusMeta[p.status].label}
                  </span>
                </li>
              ))}
            </ul>
          )}
        </div>
      </section>

      <section className="container-page pb-10">
        <h2 className="h-display text-2xl">Today&apos;s Command Center</h2>
        <p className="prose-lf mt-1 text-sm">
          Work the list top to bottom — each item opens the tool you need.
        </p>
        <div className="card mt-4 overflow-hidden p-0">
          <ul className="divide-y divide-lf-line">
            {todaysActions.map((action) => (
              <li key={action.label}>
                <Link
                  href={action.href ?? "/coach-command-center/"}
                  className="flex items-start gap-3 px-5 py-4 transition hover:bg-lf-mist"
                >
                  <span
                    aria-hidden
                    className="mt-0.5 flex h-5 w-5 flex-none items-center justify-center rounded-md border border-lf-line text-lf-orange"
                  >
                    ✓
                  </span>
                  <span className="min-w-0">
                    <span className="block text-sm font-semibold text-lf-charcoal">
                      {action.label}
                    </span>
                    <span className="block text-xs text-lf-slate">
                      {action.detail}
                    </span>
                  </span>
                  <span
                    aria-hidden
                    className="ml-auto self-center text-lf-orange"
                  >
                    &rarr;
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="container-page pb-10">
        <h2 className="h-display text-2xl">Activity snapshot</h2>
        <p className="prose-lf mt-1 text-sm">
          Manual tracking for now. Automation can be connected later.
        </p>
        <div className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {activitySnapshot.map((stat) => (
            <div key={stat.label} className="card">
              <p className="text-3xl font-semibold text-lf-charcoal">
                {stat.value}
              </p>
              <p className="mt-1 text-sm font-semibold text-lf-slate">
                {stat.label}
              </p>
              {stat.note && (
                <p className="mt-1 text-xs text-lf-slate">{stat.note}</p>
              )}
            </div>
          ))}
        </div>
      </section>

      <section className="container-page pb-10">
        <h2 className="h-display text-2xl">Quick tools</h2>
        <div className="mt-4 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {quickTools.map((tool) => (
            <Link
              key={tool.href}
              href={tool.href}
              className="card flex flex-col gap-2 transition hover:-translate-y-0.5 hover:shadow-lift"
            >
              <h3 className="text-base font-semibold text-lf-charcoal">
                {tool.title}
              </h3>
              <p className="text-sm text-lf-slate">{tool.description}</p>
              <span className="mt-auto inline-flex items-center text-sm font-semibold text-lf-orange">
                Open <span aria-hidden className="ml-2">&rarr;</span>
              </span>
            </Link>
          ))}
        </div>
      </section>

      {access.seesAll && (
        <section className="container-page pb-14">
          <div className="card flex flex-wrap items-center justify-between gap-4 border-lf-line bg-lf-mist">
            <div>
              <h2 className="h-display text-xl">Coach assignments</h2>
              <p className="prose-lf mt-1 text-sm">
                Manage which coaches and team leaders are assigned to each member
                across Loan Factory.
              </p>
            </div>
            <Link href="/admin/coach-assignments/" className="btn-primary">
              Manage assignments
            </Link>
          </div>
        </section>
      )}
    </>
  );
}
