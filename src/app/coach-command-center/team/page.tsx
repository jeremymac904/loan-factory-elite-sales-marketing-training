import Link from "next/link";
import { getCoachAccess } from "@/lib/coachAccess";
import CoachCommandNav from "@/components/coach/CoachCommandNav";
import PersonActionDropdown from "@/components/coach/PersonActionDropdown";
import { peopleForScope, statusMeta } from "@/data/coachCommandCenter";

export const dynamic = "force-dynamic";
export const metadata = { title: "My People · Coach Command Center" };

export default async function CoachTeamPage() {
  const access = await getCoachAccess();
  const people = peopleForScope(access.scope);

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
            My People
          </h1>
          <p className="mt-4 max-w-2xl text-lg text-white/85">
            The LOs, members, and team you coach — with their next coaching step
            at a glance.
          </p>
          {access.viewingAsLabel && (
            <p className="mt-4 inline-block rounded-full bg-white/20 px-3 py-1 text-xs font-semibold">
              Viewing as: {access.viewingAsLabel}
            </p>
          )}
        </div>
      </section>

      <CoachCommandNav
        current="/coach-command-center/team/"
        showAdmin={access.seesAll}
      />

      <section className="container-page py-12">
        {people.length === 0 ? (
          <div className="card max-w-2xl">
            <span className="text-xs font-semibold uppercase tracking-wide text-lf-orange">
              No one assigned yet
            </span>
            <h2 className="h-display mt-1 text-2xl">
              You don&apos;t have anyone assigned to coach right now.
            </h2>
            <p className="prose-lf mt-3 text-sm">
              When LOs, members, or team members are assigned to you, they show
              up here with their last activity, next coaching step, and quick
              actions. If you should have people assigned, ask Jeremy or LO
              Development to set up your assignments.
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              <Link href="/coach-command-center/" className="btn-primary">
                Command Center overview
              </Link>
              <Link href="/coaching/" className="btn-secondary">
                Coaching overview
              </Link>
            </div>
          </div>
        ) : (
          <>
            <div className="flex flex-wrap items-end justify-between gap-3">
              <div>
                <h2 className="h-display text-2xl">
                  {people.length} {people.length === 1 ? "person" : "people"} you
                  coach
                </h2>
              <p className="prose-lf mt-1 text-sm">
                  Coaching status reflects engagement, not compliance. Use one
                  action menu per person to keep the page compact.
                </p>
              </div>
            </div>

            {/* Desktop / tablet table */}
            <div className="card mt-6 hidden overflow-x-auto p-0 lg:block">
              <table className="w-full text-left text-sm">
                <thead className="border-b border-lf-line bg-lf-mist/60 text-xs uppercase tracking-wide text-lf-slate">
                  <tr>
                    <th className="px-4 py-3 font-semibold">Name</th>
                    <th className="px-3 py-2 font-semibold">Role</th>
                    <th className="px-3 py-2 font-semibold">Program</th>
                    <th className="px-3 py-2 font-semibold">Last</th>
                    <th className="px-3 py-2 font-semibold">Next task</th>
                    <th className="px-3 py-2 font-semibold">Scorecard</th>
                    <th className="px-3 py-2 font-semibold">Next call</th>
                    <th className="px-3 py-2 font-semibold">Status</th>
                    <th className="px-3 py-2 font-semibold">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-lf-line">
                  {people.map((p) => (
                    <tr key={p.id} className="align-middle hover:bg-lf-mist/40">
                      <td className="px-3 py-2">
                        <div className="font-semibold text-lf-charcoal">
                          {p.name}
                        </div>
                        <a
                          href={`mailto:${p.email}`}
                          className="text-xs text-lf-orange hover:underline"
                        >
                          {p.email}
                        </a>
                      </td>
                      <td className="px-3 py-2 text-lf-slate">{p.role}</td>
                      <td className="px-3 py-2 text-lf-slate">{p.program}</td>
                      <td className="px-3 py-2 text-lf-slate">
                        {p.lastActivity}
                      </td>
                      <td className="px-3 py-2 text-lf-charcoal">{p.nextTask}</td>
                      <td className="px-3 py-2 text-lf-slate">
                        {p.scorecardStatus.replace("_", " ")}
                      </td>
                      <td className="px-3 py-2 text-lf-slate">{p.nextCall}</td>
                      <td className="px-3 py-2">
                        <span
                          className={`rounded-full px-2.5 py-0.5 text-xs font-semibold ${statusMeta[p.status].class}`}
                        >
                          {statusMeta[p.status].label}
                        </span>
                      </td>
                      <td className="px-3 py-2">
                        <PersonActionDropdown person={p} />
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Mobile / small screen cards */}
            <div className="mt-6 grid gap-4 md:grid-cols-2 lg:hidden">
              {people.map((p) => (
                <div key={p.id} className="card flex flex-col gap-3">
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <h3 className="text-base font-semibold text-lf-charcoal">
                        {p.name}
                      </h3>
                      <a
                        href={`mailto:${p.email}`}
                        className="text-xs text-lf-orange hover:underline"
                      >
                        {p.email}
                      </a>
                    </div>
                    <span
                      className={`shrink-0 rounded-full px-2.5 py-0.5 text-xs font-semibold ${statusMeta[p.status].class}`}
                    >
                      {statusMeta[p.status].label}
                    </span>
                  </div>
                  <dl className="grid grid-cols-2 gap-x-4 gap-y-2 text-sm">
                    <div>
                      <dt className="text-xs font-semibold text-lf-slate">
                        Role
                      </dt>
                      <dd className="text-lf-charcoal">{p.role}</dd>
                    </div>
                    <div>
                      <dt className="text-xs font-semibold text-lf-slate">
                        Program / tier
                      </dt>
                      <dd className="text-lf-charcoal">{p.program}</dd>
                    </div>
                    <div>
                      <dt className="text-xs font-semibold text-lf-slate">
                        Coach
                      </dt>
                      <dd className="text-lf-charcoal">{p.coach}</dd>
                    </div>
                    <div>
                      <dt className="text-xs font-semibold text-lf-slate">
                        Last activity
                      </dt>
                      <dd className="text-lf-charcoal">{p.lastActivity}</dd>
                    </div>
                    <div className="col-span-2">
                      <dt className="text-xs font-semibold text-lf-slate">
                        Next task
                      </dt>
                      <dd className="text-lf-charcoal">{p.nextTask}</dd>
                    </div>
                  </dl>
                  <div className="mt-auto flex flex-wrap gap-2 border-t border-lf-line pt-3">
                    <PersonActionDropdown person={p} />
                  </div>
                </div>
              ))}
            </div>

            <p className="prose-lf mt-6 text-xs text-lf-slate">
              Manual tracking for now. Automation can be connected later.
            </p>
          </>
        )}
      </section>
    </>
  );
}
