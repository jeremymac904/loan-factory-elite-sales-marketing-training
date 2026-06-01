import Link from "next/link";
import { getCoachAccess, type CoachScope } from "@/lib/coachAccess";
import CoachCommandNav from "@/components/coach/CoachCommandNav";
import PersonActionDropdown from "@/components/coach/PersonActionDropdown";
import {
  statusMeta,
  peopleForScope,
  todaysActions,
  scorecardReviews,
  canSeeCoverage,
  coverageVisibilityRule,
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
    description:
      "Coaching attendance, commitments, certifications, resources, and next action.",
    href: "/coach-command-center/member-progress/",
  },
  {
    title: "Market Mentor Studio",
    description:
      "Use Market Mentor with a coaching member — market updates, rate explainers, buy-vs-rent, and video scripts.",
    href: "/market-mentor/",
  },
];

const dashboardTabs = [
  { label: "Needs attention", href: "/coach-command-center/team/" },
  { label: "Scorecards", href: "/coach-command-center/scorecards/" },
  { label: "Notes", href: "/coach-command-center/coaching-notes/" },
  { label: "Training", href: "/coach-command-center/training-plan/" },
];

export default async function CoachCommandCenterPage() {
  const access = await getCoachAccess();
  const people = peopleForScope(access.scope);
  // Finding #12: coverage / overview-of-all-coaches is restricted to
  // master_admin, LO Development, and Edward Arvizo (corporate coach lead).
  const showCoverage = canSeeCoverage(access.seesAll, access.effectiveRoleLabel);
  const visiblePeople = people.slice(0, 6);
  const attentionPeople = people.filter(
    (p) => p.status === "needs_nudge" || p.status === "stuck" || p.status === "inactive",
  );
  const submittedScorecards = scorecardReviews.filter(
    (s) => s.status === "submitted" && people.some((p) => p.id === s.memberId),
  );
  const missingScorecards = scorecardReviews.filter(
    (s) => s.status === "missing" && people.some((p) => p.id === s.memberId),
  );
  const dashboardStats = [
    { label: "Assigned LOs", value: people.length.toString(), href: "/coach-command-center/team/" },
    { label: "Need attention", value: attentionPeople.length.toString(), href: "/coach-command-center/team/" },
    { label: "Scorecards submitted", value: submittedScorecards.length.toString(), href: "/coach-command-center/scorecards/" },
    { label: "Scorecards missing", value: missingScorecards.length.toString(), href: "/coach-command-center/scorecards/" },
    { label: "Follow-ups due", value: "3", href: "/coach-command-center/messages/" },
    { label: "Next calls", value: people.filter((p) => !p.nextCall.toLowerCase().includes("needs") && p.nextCall !== "Not scheduled").length.toString(), href: "/coach-command-center/calendar/" },
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
              Viewing as: {access.viewingAsLabel}
            </p>
          )}
        </div>
      </section>

      <CoachCommandNav
        current="/coach-command-center/"
        showAdmin={access.seesAll}
      />

      <section className="container-page py-8">
        <div className="grid gap-4 lg:grid-cols-[1fr,22rem]">
          <div className="card border-lf-orange/30 bg-lf-orangeSoft/30">
            <p className="text-xs font-semibold uppercase tracking-wide text-lf-orangeDark">
              {access.effectiveRoleLabel}
            </p>
            <p className="prose-lf mt-1 text-sm text-lf-charcoal">
              {scopeIntro[access.scope]}
            </p>
            <div className="mt-4 flex flex-wrap gap-2">
              {dashboardTabs.map((tab) => (
                <Link
                  key={tab.href}
                  href={tab.href}
                  className="rounded-lg border border-lf-line bg-white px-3 py-1.5 text-xs font-semibold text-lf-charcoal transition hover:border-lf-orange hover:text-lf-orange"
                >
                  {tab.label}
                </Link>
              ))}
            </div>
          </div>
          <div className="card">
            <p className="text-xs font-semibold uppercase tracking-wide text-lf-slate">
              Next coaching call
            </p>
            <p className="mt-2 text-xl font-semibold text-lf-charcoal">
              {visiblePeople.find((p) => p.nextCall !== "Not scheduled" && p.nextCall !== "Needs scheduling")?.nextCall ?? "No call scheduled"}
            </p>
            <p className="mt-1 text-sm text-lf-slate">
              Draft calendar events only until Google Calendar integration is active.
            </p>
            <Link href="/coach-command-center/calendar/" className="mt-3 inline-flex text-sm font-semibold text-lf-orange hover:underline">
              Open training schedule
            </Link>
          </div>
        </div>
      </section>

      <section className="container-page pb-8">
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-6">
          {dashboardStats.map((stat) => (
            <Link
              key={stat.label}
              href={stat.href}
              className="card p-4 transition hover:-translate-y-0.5 hover:shadow-lift"
            >
              <p className="text-2xl font-semibold text-lf-charcoal">
                {stat.value}
              </p>
              <p className="mt-1 text-xs font-semibold uppercase tracking-wide text-lf-slate">
                {stat.label}
              </p>
            </Link>
          ))}
        </div>
      </section>

      <section className="container-page pb-8">
        <div className="grid gap-4 xl:grid-cols-[1.6fr,1fr]">
          <div className="card overflow-hidden p-0">
            <div className="flex items-center justify-between gap-4 border-b border-lf-line px-4 py-3">
              <h2 className="h-display text-xl">Assigned LOs</h2>
              <Link
                href="/coach-command-center/team/"
                className="text-sm font-semibold text-lf-orange hover:underline"
              >
                View all
              </Link>
            </div>
            {visiblePeople.length === 0 ? (
            <div className="px-5 py-6">
              <p className="prose-lf text-sm">
                No people are assigned to you yet. Coaching assignments appear
                here once they&apos;re set up.
              </p>
            </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full text-left text-sm">
                  <thead className="border-b border-lf-line bg-lf-mist/60 text-xs uppercase tracking-wide text-lf-slate">
                    <tr>
                      <th className="px-4 py-2 font-semibold">Name</th>
                      <th className="px-4 py-2 font-semibold">Status</th>
                      <th className="px-4 py-2 font-semibold">Next</th>
                      <th className="px-4 py-2 font-semibold">Scorecard</th>
                      <th className="px-4 py-2 font-semibold">Call</th>
                      <th className="px-4 py-2 font-semibold">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-lf-line">
                    {visiblePeople.map((p) => (
                      <tr key={p.id} className="hover:bg-lf-mist/40">
                        <td className="px-4 py-2">
                          <p className="font-semibold text-lf-charcoal">{p.name}</p>
                          <p className="text-xs text-lf-slate">{p.program}</p>
                        </td>
                        <td className="px-4 py-2">
                          <span className={`rounded-full px-2 py-0.5 text-xs font-semibold ${statusMeta[p.status].class}`}>
                            {statusMeta[p.status].label}
                          </span>
                        </td>
                        <td className="px-4 py-2 text-xs text-lf-charcoal">{p.nextTask}</td>
                        <td className="px-4 py-2 text-xs text-lf-slate">{p.scorecardStatus.replace("_", " ")}</td>
                        <td className="px-4 py-2 text-xs text-lf-slate">{p.nextCall}</td>
                        <td className="px-4 py-2">
                          <PersonActionDropdown person={p} />
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>

          <div className="card overflow-hidden p-0">
            <div className="border-b border-lf-line px-4 py-3">
              <h2 className="h-display text-xl">Needs attention</h2>
              <p className="mt-1 text-xs text-lf-slate">
                Follow-ups, missing scorecards, stuck points, and overdue calls.
              </p>
            </div>
            <ul className="divide-y divide-lf-line">
              {attentionPeople.slice(0, 5).map((p) => (
                <li key={p.id} className="px-4 py-3">
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <p className="text-sm font-semibold text-lf-charcoal">{p.name}</p>
                      <p className="mt-0.5 text-xs text-lf-slate">{p.recentActivity}</p>
                    </div>
                    <span className={`rounded-full px-2 py-0.5 text-xs font-semibold ${statusMeta[p.status].class}`}>
                      {statusMeta[p.status].label}
                    </span>
                  </div>
                  <p className="mt-2 text-xs font-semibold text-lf-charcoal">
                    Next: {p.nextTask}
                  </p>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <section className="container-page pb-8">
        <div className="grid gap-4 xl:grid-cols-2">
          <div className="card overflow-hidden p-0">
            <div className="border-b border-lf-line px-4 py-3">
              <h2 className="h-display text-xl">Today&apos;s workflow</h2>
            </div>
            <ul className="divide-y divide-lf-line">
              {todaysActions.slice(0, 5).map((action) => (
                <li key={action.label}>
                  <Link
                    href={action.href ?? "/coach-command-center/"}
                    className="flex items-start gap-3 px-4 py-3 transition hover:bg-lf-mist"
                  >
                    <span className="min-w-0">
                      <span className="block text-sm font-semibold text-lf-charcoal">
                        {action.label}
                      </span>
                      <span className="block text-xs text-lf-slate">
                        {action.detail}
                      </span>
                    </span>
                    <span aria-hidden className="ml-auto self-center text-lf-orange">
                      &rarr;
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="card overflow-hidden p-0">
            <div className="border-b border-lf-line px-4 py-3">
              <h2 className="h-display text-xl">Recent activity</h2>
              <p className="mt-1 text-xs text-lf-slate">
                Manual coaching signals. Automation can be connected later.
              </p>
            </div>
            <ul className="divide-y divide-lf-line">
              {visiblePeople.slice(0, 5).map((p) => (
                <li key={p.id} className="px-4 py-3">
                  <p className="text-sm font-semibold text-lf-charcoal">{p.name}</p>
                  <p className="mt-0.5 text-xs text-lf-slate">{p.recentActivity}</p>
                  <p className="mt-1 text-xs text-lf-orangeDark">
                    Resource: {p.resourceAssignment}
                  </p>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <section className="container-page pb-10">
        <h2 className="h-display text-2xl">Quick tools</h2>
        <div className="mt-4 grid gap-3 md:grid-cols-2 lg:grid-cols-4">
          {quickTools.slice(0, 8).map((tool) => (
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

      {showCoverage && (
        <section className="container-page pb-14">
          <div className="card flex flex-wrap items-center justify-between gap-4 border-lf-line bg-lf-mist">
            <div className="max-w-2xl">
              <h2 className="h-display text-xl">Coaching coverage</h2>
              <p className="prose-lf mt-1 text-sm">
                Org-wide view of every coach, team leader, and assigned member —
                manage which coaches and team leaders cover each member across
                Loan Factory.
              </p>
              <p className="mt-2 text-xs text-lf-slate">{coverageVisibilityRule}</p>
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
