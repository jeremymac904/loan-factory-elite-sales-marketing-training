import Link from "next/link";
import { getCoachAccess } from "@/lib/coachAccess";
import CoachCommandNav from "@/components/coach/CoachCommandNav";
import { memberProgress, statusMeta } from "@/data/coachCommandCenter";

export const dynamic = "force-dynamic";
export const metadata = { title: "Member Progress · Coach Command Center" };

// Coaching activity indicators — engagement signals, never compliance language.
const activityNote: Record<string, string> = {
  active: "Engaged and moving — keep the momentum going.",
  needs_nudge: "A little quiet — a quick coaching nudge will help.",
  stuck: "Hit a stuck point — worth a focused 1:1 to reset.",
  inactive: "No recent engagement — reach out and re-engage.",
};

export default async function CoachMemberProgressPage() {
  const access = await getCoachAccess();

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
            Member Progress
          </h1>
          <p className="mt-4 max-w-2xl text-lg text-white/85">
            Paid coaching progress for LO Mastery and Loan Factory Alliance,
            separate from free internal Sales and Marketing 101 through 601.
          </p>
          {access.viewingAsLabel && (
            <p className="mt-4 inline-block rounded-full bg-white/20 px-3 py-1 text-xs font-semibold">
              View-As preview: {access.viewingAsLabel}
            </p>
          )}
        </div>
      </section>

      <CoachCommandNav
        current="/coach-command-center/member-progress/"
        showAdmin={access.seesAll}
      />

      <section className="container-page py-12">
        <div className="card border-lf-orange/40 bg-lf-orangeSoft/30">
          <h2 className="h-display text-lg">Paid coaching progress only</h2>
          <p className="prose-lf mt-2 text-sm">
            LO Mastery is the $249 tier. Loan Factory Alliance is the $449 tier.
            This view tracks coaching attendance, weekly commitments, activity
            tracker status, certification progress, accountability score, coach
            notes, resource completion, and next action. It intentionally does
            not mix Sales and Marketing 101 through 601 completion into paid
            coaching progress.
          </p>
          <div className="mt-4 flex flex-wrap gap-3 text-xs">
            {(["active", "needs_nudge", "stuck", "inactive"] as const).map(
              (s) => (
                <span
                  key={s}
                  className={`rounded-full px-2.5 py-0.5 font-semibold ${statusMeta[s].class}`}
                >
                  {statusMeta[s].label}
                </span>
              ),
            )}
          </div>
        </div>

        {memberProgress.length === 0 ? (
          <div className="card mt-8 max-w-2xl">
            <span className="text-xs font-semibold uppercase tracking-wide text-lf-orange">
              No progress to show yet
            </span>
            <h2 className="h-display mt-1 text-2xl">
              No member progress is available right now.
            </h2>
            <p className="prose-lf mt-3 text-sm">
              As members attend coaching, complete commitments, and submit
              scorecards, their activity appears here so you can coach the next
              step.
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              <Link href="/coach-command-center/" className="btn-primary">
                Command Center overview
              </Link>
              <Link href="/coach-command-center/team/" className="btn-secondary">
                My People
              </Link>
            </div>
          </div>
        ) : (
          <>
            <div className="card mt-8 overflow-x-auto p-0">
              <table className="w-full text-left text-sm">
                <thead className="border-b border-lf-line bg-lf-mist/60 text-xs uppercase tracking-wide text-lf-slate">
                  <tr>
                    <th className="px-4 py-2 font-semibold">Member</th>
                    <th className="px-4 py-2 font-semibold">Tier</th>
                    <th className="px-4 py-2 font-semibold">Attendance</th>
                    <th className="px-4 py-2 font-semibold">Commitments</th>
                    <th className="px-4 py-2 font-semibold">Activity tracker</th>
                    <th className="px-4 py-2 font-semibold">Certification</th>
                    <th className="px-4 py-2 font-semibold">Accountability</th>
                    <th className="px-4 py-2 font-semibold">Resources</th>
                    <th className="px-4 py-2 font-semibold">Coach notes</th>
                    <th className="px-4 py-2 font-semibold">Next action</th>
                    <th className="px-4 py-2 font-semibold">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-lf-line">
                  {memberProgress.map((m) => (
                    <tr key={m.id} className="align-top hover:bg-lf-mist/40">
                      <td className="px-4 py-2">
                        <p className="font-semibold text-lf-charcoal">{m.name}</p>
                        <p className="mt-1 text-xs text-lf-slate">
                          {activityNote[m.status]}
                        </p>
                      </td>
                      <td className="px-4 py-2 text-lf-slate">{m.tier}</td>
                      <td className="px-4 py-2 text-lf-slate">
                        {m.coachingAttendance}
                      </td>
                      <td className="px-4 py-2 text-lf-slate">
                        {m.weeklyCommitments}
                      </td>
                      <td className="px-4 py-2 text-lf-slate">
                        {m.activityTracker}
                      </td>
                      <td className="px-4 py-2 text-lf-slate">
                        {m.certification}
                      </td>
                      <td className="px-4 py-2 font-semibold text-lf-charcoal">
                        {m.accountabilityScore}
                      </td>
                      <td className="px-4 py-2 text-lf-slate">
                        {m.resourceCompletion}
                      </td>
                      <td className="px-4 py-2 text-lf-slate">{m.coachNotes}</td>
                      <td className="px-4 py-2 text-lf-orangeDark">
                        {m.nextAction}
                      </td>
                      <td className="px-4 py-2">
                        <span
                          className={`shrink-0 rounded-full px-2.5 py-0.5 text-xs font-semibold ${statusMeta[m.status].class}`}
                        >
                          {statusMeta[m.status].label}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
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
