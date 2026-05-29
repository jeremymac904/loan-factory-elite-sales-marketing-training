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
            Where each member stands across onboarding, training path,
            certification, and their AI Twin — with the next coaching step.
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
          <h2 className="h-display text-lg">Reading the activity indicator</h2>
          <p className="prose-lf mt-2 text-sm">
            The badge on each member is a <strong>coaching activity</strong>{" "}
            indicator — how engaged they are right now — so you know where to
            spend your coaching time. It is not a compliance or performance
            score.
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
              As members begin onboarding, complete training, and submit
              scorecards, their progress appears here so you can coach the next
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
            <div className="mt-8 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
              {memberProgress.map((m) => (
                <div key={m.id} className="card flex flex-col gap-4">
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <h3 className="text-base font-semibold text-lf-charcoal">
                        {m.name}
                      </h3>
                      <p className="text-xs font-semibold uppercase tracking-wide text-lf-slate">
                        {m.tier}
                      </p>
                    </div>
                    <span
                      className={`shrink-0 rounded-full px-2.5 py-0.5 text-xs font-semibold ${statusMeta[m.status].class}`}
                    >
                      {statusMeta[m.status].label}
                    </span>
                  </div>

                  <p className="rounded-lg bg-lf-mist px-3 py-2 text-xs text-lf-slate">
                    {activityNote[m.status]}
                  </p>

                  <dl className="grid grid-cols-2 gap-x-4 gap-y-3 text-sm">
                    <ProgressField label="Onboarding" value={m.onboarding} />
                    <ProgressField label="Training path" value={m.path} />
                    <ProgressField
                      label="Last scorecard"
                      value={m.lastScorecard}
                    />
                    <ProgressField
                      label="Certification"
                      value={m.certification}
                    />
                    <ProgressField
                      label="Training progress"
                      value={m.trainingProgress}
                    />
                    <ProgressField label="AI Twin" value={m.aiTwin} />
                  </dl>

                  <div className="mt-auto border-t border-lf-line pt-3">
                    <p className="text-xs font-semibold text-lf-slate">
                      Next coaching action
                    </p>
                    <p className="mt-1 text-sm font-semibold text-lf-charcoal">
                      {m.nextAction}
                    </p>
                    <div className="mt-3 flex flex-wrap gap-2">
                      <Link
                        href="/coach-command-center/scorecards/"
                        className="rounded-lg border border-lf-line px-2.5 py-1 text-xs font-semibold text-lf-slate transition hover:border-lf-orange hover:text-lf-orange"
                      >
                        Scorecard
                      </Link>
                      <Link
                        href="/coach-command-center/training-plan/"
                        className="rounded-lg border border-lf-line px-2.5 py-1 text-xs font-semibold text-lf-slate transition hover:border-lf-orange hover:text-lf-orange"
                      >
                        Training plan
                      </Link>
                      <Link
                        href="/coach-command-center/coaching-notes/"
                        className="rounded-lg border border-lf-line px-2.5 py-1 text-xs font-semibold text-lf-slate transition hover:border-lf-orange hover:text-lf-orange"
                      >
                        Notes
                      </Link>
                    </div>
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

function ProgressField({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <dt className="text-xs font-semibold text-lf-slate">{label}</dt>
      <dd className="mt-0.5 text-lf-charcoal">{value}</dd>
    </div>
  );
}
