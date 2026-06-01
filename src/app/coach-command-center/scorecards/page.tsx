import Link from "next/link";
import { getCoachAccess } from "@/lib/coachAccess";
import CoachCommandNav from "@/components/coach/CoachCommandNav";
import {
  loMasteryScorecardFields,
  allianceScorecardFields,
  scorecardReviews,
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
  const submitted = scorecardReviews.filter((s) => s.status === "submitted");
  const missing = scorecardReviews.filter((s) => s.status === "missing");

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
            LOs submit scorecards. Coaches review trends, commitments, and
            follow-up actions.
          </p>
          {access.viewingAsLabel && (
            <p className="mt-3 inline-block rounded-full bg-white/20 px-3 py-1 text-xs font-semibold">
              Viewing as: {access.viewingAsLabel}
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
            Ownership model
          </p>
          <h2 className="h-display mt-1 text-2xl">
            LO submits. Coach reviews. Commitments drive follow-up.
          </h2>
          <p className="prose-lf mt-2 text-sm">
            The coach view shows what was submitted, what is missing, where the
            activity trend is moving, and which follow-up action the coach owns.
            Sales and Marketing 101 through 601 remains free internal training
            and is not counted as paid coaching progress here. Activity detail
            feeds the{" "}
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

      <section className="container-page pb-4">
        <div className="flex flex-wrap items-center gap-2 rounded-lg border border-lf-line bg-lf-mist/60 px-4 py-3">
          <span className="lf-chip bg-lf-orangeSoft text-lf-orangeDark">
            Sample data
          </span>
          <p className="prose-lf text-xs">
            The counts and the review queue below use a sample roster (
            <span className="font-mono text-lf-charcoal">
              src/data/coachCommandCenter.ts
            </span>
            ), not live submissions. They become live once{" "}
            <code className="font-mono text-lf-charcoal">coaching_scorecards</code>{" "}
            is connected.
          </p>
        </div>
      </section>

      <section className="container-page pb-10">
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          <div className="card">
            <p className="text-xs font-semibold uppercase tracking-wide text-lf-slate">
              Submitted <span className="text-lf-orange">(sample)</span>
            </p>
            <p className="mt-2 text-3xl font-semibold text-lf-charcoal">
              {submitted.length}
            </p>
          </div>
          <div className="card">
            <p className="text-xs font-semibold uppercase tracking-wide text-lf-slate">
              Missing <span className="text-lf-orange">(sample)</span>
            </p>
            <p className="mt-2 text-3xl font-semibold text-lf-orange">
              {missing.length}
            </p>
          </div>
          <div className="card">
            <p className="text-xs font-semibold uppercase tracking-wide text-lf-slate">
              Up trends <span className="text-lf-orange">(sample)</span>
            </p>
            <p className="mt-2 text-3xl font-semibold text-lf-charcoal">
              {scorecardReviews.filter((s) => s.trend === "up").length}
            </p>
          </div>
          <div className="card">
            <p className="text-xs font-semibold uppercase tracking-wide text-lf-slate">
              Coach actions <span className="text-lf-orange">(sample)</span>
            </p>
            <p className="mt-2 text-3xl font-semibold text-lf-charcoal">
              {scorecardReviews.length}
            </p>
          </div>
        </div>
      </section>

      <section className="container-page pb-10">
        <div className="card overflow-hidden p-0">
          <div className="border-b border-lf-line px-4 py-3">
            <div className="flex flex-wrap items-center gap-2">
              <h2 className="h-display text-xl">Coach review queue</h2>
              <span className="lf-chip bg-lf-orangeSoft text-lf-orangeDark">
                Sample data
              </span>
            </div>
            <p className="mt-1 text-xs text-lf-slate">
              This is a sample queue that shows how submitted and missing
              scorecards surface for review. Submitted scorecards are ready for
              coaching review; missing scorecards need a draft reminder before
              the next call. Live rows replace this once{" "}
              <code className="font-mono text-lf-charcoal">
                coaching_scorecards
              </code>{" "}
              is connected.
            </p>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead className="border-b border-lf-line bg-lf-mist/60 text-xs uppercase tracking-wide text-lf-slate">
                <tr>
                  <th className="px-4 py-2 font-semibold">Member</th>
                  <th className="px-4 py-2 font-semibold">Status</th>
                  <th className="px-4 py-2 font-semibold">Trend</th>
                  <th className="px-4 py-2 font-semibold">Conversation activity</th>
                  <th className="px-4 py-2 font-semibold">Realtor</th>
                  <th className="px-4 py-2 font-semibold">Past clients</th>
                  <th className="px-4 py-2 font-semibold">Pipeline follow-up</th>
                  <th className="px-4 py-2 font-semibold">Commitments</th>
                  <th className="px-4 py-2 font-semibold">Coach follow-up</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-lf-line">
                {scorecardReviews.map((scorecard) => (
                  <tr key={scorecard.id} className="align-top hover:bg-lf-mist/40">
                    <td className="px-4 py-2">
                      <p className="font-semibold text-lf-charcoal">
                        {scorecard.memberName}
                      </p>
                      <p className="text-xs text-lf-slate">{scorecard.tier}</p>
                    </td>
                    <td className="px-4 py-2">
                      <span
                        className={`rounded-full px-2 py-0.5 text-xs font-semibold ${
                          scorecard.status === "submitted"
                            ? "bg-green-100 text-green-800"
                            : "bg-lf-orangeSoft text-lf-orangeDark"
                        }`}
                      >
                        {scorecard.status}
                      </span>
                    </td>
                    <td className="px-4 py-2 text-lf-slate">{scorecard.trend}</td>
                    <td className="px-4 py-2 text-lf-charcoal">
                      <p>{scorecard.conversationActivity}</p>
                      <p className="mt-1 text-xs text-lf-slate">
                        Conversations: {scorecard.conversations ?? "missing"}
                      </p>
                    </td>
                    <td className="px-4 py-2 text-lf-slate">
                      {scorecard.realtorActivity ?? "missing"}
                    </td>
                    <td className="px-4 py-2 text-lf-slate">
                      {scorecard.pastClientTouches ?? "missing"}
                    </td>
                    <td className="px-4 py-2 text-lf-slate">
                      {scorecard.pipelineFollowUp}
                    </td>
                    <td className="px-4 py-2 text-lf-charcoal">
                      {scorecard.commitments}
                    </td>
                    <td className="px-4 py-2 text-lf-orangeDark">
                      {scorecard.coachFollowUp}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      <section className="container-page pb-14">
        <h2 className="h-display text-2xl">Scorecard field reference</h2>
        <p className="prose-lf mt-2 max-w-3xl text-sm">
          These are the lines LOs submit for paid coaching and team coaching
          review. Coaches use them for review and follow-up; they do not fill
          these in as paid coaching progress for the LO.
        </p>
        <div className="grid gap-6 lg:grid-cols-2">
          <ScorecardCard
            title="LO Mastery weekly execution scorecard"
            subtitle="For LO Mastery ($249) members — the core weekly rhythm of conversations, activity, coaching resources, and commitments."
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
