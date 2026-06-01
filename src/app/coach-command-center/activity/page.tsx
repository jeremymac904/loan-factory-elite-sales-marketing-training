import Link from "next/link";
import { getCoachAccess } from "@/lib/coachAccess";
import CoachCommandNav from "@/components/coach/CoachCommandNav";
import {
  computeActivitySnapshot,
  peopleForScope,
  statusMeta,
  shortName,
} from "@/data/coachCommandCenter";

export const dynamic = "force-dynamic";
export const metadata = { title: "Activity Snapshot · Coach Command Center" };

// Real activity snapshot (Finding #16): counts derived from the roster, with an
// honest empty state when no one is assigned.
export default async function ActivitySnapshotPage() {
  const access = await getCoachAccess();
  const people = peopleForScope(access.scope);
  const snapshot = computeActivitySnapshot(people);
  const needAttention = people.filter((p) => p.status !== "active");

  return (
    <>
      <section className="relative isolate overflow-hidden bg-lf-navy text-white">
        <div
          aria-hidden
          className="absolute inset-0 bg-cover bg-center opacity-35"
          style={{ backgroundImage: "url(/media/dark-hero-background.png)" }}
        />
        <div className="relative container-page py-12">
          <p className="text-xs font-bold uppercase tracking-wide text-lf-orange">
            Coach Command Center
          </p>
          <h1 className="mt-4 font-display text-4xl font-semibold tracking-tight">
            Activity Snapshot
          </h1>
          <p className="mt-3 max-w-2xl text-lg text-white/85">
            A real read on your roster this week — who submitted, who&apos;s
            missing, and who needs attention.
          </p>
          {access.viewingAsLabel && (
            <p className="mt-3 inline-block rounded-full bg-white/20 px-3 py-1 text-xs font-semibold">
              Viewing as: {access.viewingAsLabel}
            </p>
          )}
        </div>
      </section>

      <CoachCommandNav
        current="/coach-command-center/activity/"
        showAdmin={access.seesAll}
      />

      {people.length === 0 ? (
        <section className="container-page py-12">
          <div className="card max-w-2xl">
            <h2 className="h-display text-2xl">Nothing to show yet</h2>
            <p className="prose-lf mt-2 text-sm">
              You have no one assigned in this view, so there&apos;s no activity
              to summarize. Once LOs are assigned to you and start submitting
              scorecards, real counts appear here. Check{" "}
              <Link
                href="/coach-command-center/team/"
                className="font-semibold text-lf-orange hover:underline"
              >
                My People
              </Link>
              .
            </p>
          </div>
        </section>
      ) : (
        <>
          <section className="container-page py-10">
            <h2 className="h-display text-2xl">This week at a glance</h2>
            <p className="prose-lf mt-1 text-sm">
              Counts come straight from your roster and the scorecards your LOs
              submitted.
            </p>
            <div className="mt-5 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
              {snapshot.map((metric) => (
                <Link
                  key={metric.key}
                  href={metric.href ?? "/coach-command-center/"}
                  className="card transition hover:-translate-y-0.5 hover:shadow-lift"
                >
                  <p className="text-3xl font-semibold text-lf-charcoal">
                    {metric.value}
                  </p>
                  <p className="mt-1 text-sm font-semibold text-lf-slate">
                    {metric.label}
                  </p>
                  <p className="mt-0.5 text-xs text-lf-slate">{metric.note}</p>
                </Link>
              ))}
            </div>
          </section>

          <section className="container-page pb-14">
            <div className="card">
              <div className="flex flex-wrap items-center justify-between gap-3">
                <h2 className="h-display text-xl">Members needing attention</h2>
                <Link
                  href="/coach-command-center/team/"
                  className="text-sm font-semibold text-lf-orange hover:underline"
                >
                  Open My People <span aria-hidden>&rarr;</span>
                </Link>
              </div>
              {needAttention.length === 0 ? (
                <p className="prose-lf mt-3 text-sm">
                  Everyone in your view is active this week. Nice.
                </p>
              ) : (
                <ul className="mt-4 divide-y divide-lf-line">
                  {needAttention.map((p) => (
                    <li
                      key={p.id}
                      className="flex flex-wrap items-center justify-between gap-3 py-3"
                    >
                      <div className="min-w-0">
                        <p className="text-sm font-semibold text-lf-charcoal">
                          {shortName(p.name)}
                        </p>
                        <p className="text-xs text-lf-slate">
                          {p.recentActivity} · Next: {p.nextTask}
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

            <p className="prose-lf mt-4 text-xs text-lf-slate">
              Live activity tracking is planned — see the integration plan.
            </p>
          </section>
        </>
      )}
    </>
  );
}
