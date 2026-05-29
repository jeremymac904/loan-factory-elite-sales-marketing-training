import Link from "next/link";
import { getCoachAccess } from "@/lib/coachAccess";
import CoachCommandNav from "@/components/coach/CoachCommandNav";
import {
  loMasteryScorecardFields,
  allianceScorecardFields,
} from "@/data/coachCommandCenter";

export const dynamic = "force-dynamic";
export const metadata = { title: "Weekly Scorecards · Coach Command Center" };

function ScorecardCard({
  title,
  subtitle,
  fields,
}: {
  title: string;
  subtitle: string;
  fields: string[];
}) {
  return (
    <div className="card">
      <h2 className="h-display text-2xl">{title}</h2>
      <p className="prose-lf mt-1 text-sm">{subtitle}</p>
      <dl className="mt-5 divide-y divide-lf-line border-t border-lf-line">
        {fields.map((field) => (
          <div
            key={field}
            className="flex items-center justify-between gap-4 py-3"
          >
            <dt className="text-sm font-semibold text-lf-charcoal">{field}</dt>
            <dd className="min-w-[8rem] flex-1 border-b border-dashed border-lf-line text-right text-sm text-lf-slate">
              &nbsp;
            </dd>
          </div>
        ))}
      </dl>
    </div>
  );
}

export default async function ScorecardsPage() {
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
            Weekly Scorecards
          </h1>
          <p className="mt-3 max-w-2xl text-lg text-white/85">
            Printable weekly coaching templates to run live with each LO.
          </p>
          {access.viewingAsLabel && (
            <p className="mt-3 inline-block rounded-full bg-white/20 px-3 py-1 text-xs font-semibold">
              View-As preview: {access.viewingAsLabel}
            </p>
          )}
        </div>
      </section>

      <CoachCommandNav
        current="/coach-command-center/scorecards/"
        showAdmin={access.seesAll}
      />

      <section className="container-page py-10">
        <div className="card border-lf-orange/40 bg-lf-orangeSoft/40">
          <p className="text-xs font-semibold uppercase tracking-wide text-lf-orangeDark">
            How to use these
          </p>
          <h2 className="h-display mt-1 text-2xl">
            Weekly coaching scorecards, filled in with the LO.
          </h2>
          <p className="prose-lf mt-2 text-sm">
            These are weekly coaching scorecards — fill them in together with the
            LO during your session, not as a report card after the fact. Print a
            copy or walk the lines on screen, capture what actually happened, and
            close by setting next week&apos;s commitment. Activity here feeds the{" "}
            <Link
              href="/coach-command-center/activity/"
              className="font-semibold text-lf-orange hover:underline"
            >
              Activity Snapshot
            </Link>
            . This is coaching, not compliance.
          </p>
          <p className="prose-lf mt-2 text-sm font-semibold text-lf-charcoal">
            Manual tracking for now. Automation can be connected later.
          </p>
        </div>
      </section>

      <section className="container-page pb-14">
        <div className="grid gap-6 lg:grid-cols-2">
          <ScorecardCard
            title="LO Mastery weekly execution scorecard"
            subtitle="For LO Mastery ($249) members — the core weekly rhythm of conversations, activity, training, and commitments."
            fields={loMasteryScorecardFields}
          />
          <ScorecardCard
            title="Loan Factory Alliance scorecard"
            subtitle="For Loan Factory Alliance ($449) producers — the LO Mastery lines plus market, campaign, leadership, and mastermind execution."
            fields={allianceScorecardFields}
          />
        </div>

        <div className="mt-6 flex flex-wrap gap-3">
          <Link href="/coach-command-center/activity/" className="btn-primary">
            View Activity Snapshot
          </Link>
          <Link href="/coach-command-center/team/" className="btn-secondary">
            See my people
          </Link>
        </div>
      </section>
    </>
  );
}
