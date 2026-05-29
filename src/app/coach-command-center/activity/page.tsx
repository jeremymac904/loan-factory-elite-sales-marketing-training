import Link from "next/link";
import { getCoachAccess } from "@/lib/coachAccess";
import CoachCommandNav from "@/components/coach/CoachCommandNav";
import { activitySnapshot } from "@/data/coachCommandCenter";

export const dynamic = "force-dynamic";
export const metadata = { title: "Activity Snapshot · Coach Command Center" };

export default async function ActivitySnapshotPage() {
  const access = await getCoachAccess();

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
            A coaching read on the activity your LOs are putting in each week.
          </p>
          {access.viewingAsLabel && (
            <p className="mt-3 inline-block rounded-full bg-white/20 px-3 py-1 text-xs font-semibold">
              View-As preview: {access.viewingAsLabel}
            </p>
          )}
        </div>
      </section>

      <CoachCommandNav
        current="/coach-command-center/activity/"
        showAdmin={access.seesAll}
      />

      <section className="container-page py-10">
        <div className="card border-lf-orange/40 bg-lf-orangeSoft/40">
          <p className="text-xs font-semibold uppercase tracking-wide text-lf-orangeDark">
            How activity is captured
          </p>
          <h2 className="h-display mt-1 text-2xl">
            Coaches log activity with LOs during sessions.
          </h2>
          <p className="prose-lf mt-2 text-sm">
            These are coaching signals, not a grade. During your one-on-ones,
            Power Hours, and group calls, you and your LO walk the weekly
            scorecard together and capture what they actually did — real
            conversations, Realtor touches, applications, training, and wins.
            This is coaching, not compliance.
          </p>
          <p className="prose-lf mt-2 text-sm font-semibold text-lf-charcoal">
            Manual tracking for now. Automation can be connected later.
          </p>
        </div>
      </section>

      <section className="container-page pb-10">
        <h2 className="h-display text-2xl">This week at a glance</h2>
        <p className="prose-lf mt-1 text-sm">
          Figures fill in as you log them with each LO. A dash (&mdash;) means
          nothing has been logged yet — not zero activity.
        </p>
        <div className="mt-5 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {activitySnapshot.map((metric) => (
            <div key={metric.label} className="card">
              <p className="text-sm font-semibold text-lf-slate">
                {metric.label}
              </p>
              <p className="mt-2 text-3xl font-semibold text-lf-charcoal">
                {metric.value}
              </p>
              {metric.note && (
                <p className="mt-1 text-xs text-lf-slate">{metric.note}</p>
              )}
            </div>
          ))}
        </div>
        <p className="prose-lf mt-4 text-sm font-semibold text-lf-charcoal">
          Manual tracking for now. Automation can be connected later.
        </p>
      </section>

      <section className="container-page pb-14">
        <div className="card">
          <h2 className="h-display text-2xl">Log activity</h2>
          <p className="prose-lf mt-2 text-sm">
            The fastest way to log activity is to run the weekly coaching
            scorecard live with your LO. Walk each line, capture the number or
            note, and set next week&apos;s commitment together. The scorecard is
            the source of truth for everything you see above.
          </p>
          <div className="mt-4 rounded-lg border border-lf-line bg-lf-mist p-4">
            <p className="text-xs font-semibold uppercase tracking-wide text-lf-slate">
              Manual coaching scorecard prompt
            </p>
            <ol className="prose-lf mt-2 list-decimal space-y-1 pl-5 text-sm">
              <li>Open the weekly execution scorecard with your LO on the call.</li>
              <li>Walk each line: conversations, Realtor touches, applications, prequals, training, wins, and stuck points.</li>
              <li>Capture the real numbers — a dash where nothing happened, not a guess.</li>
              <li>Agree on one focused commitment for next week and write it down.</li>
            </ol>
          </div>
          <div className="mt-5 flex flex-wrap gap-3">
            <Link href="/coach-command-center/scorecards/" className="btn-primary">
              Open weekly scorecards
            </Link>
            <Link href="/coach-command-center/team/" className="btn-secondary">
              See my people
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
