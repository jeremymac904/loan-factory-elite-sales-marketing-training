import Link from "next/link";
import { getCoachAccess } from "@/lib/coachAccess";
import AccessNotice from "@/components/AccessNotice";
import {
  assignedPeople,
  buildSupervisorCoverageSummary,
  coachCoverage,
  coverageCoachTypeLabels,
  memberProgress,
  scorecardReviews,
  statusMeta,
  trendMeta,
} from "@/data/coachCommandCenter";

export const dynamic = "force-dynamic";
export const metadata = { title: "Coaching Manager Dashboard" };

function countByTier(tier: "lo_mastery" | "alliance") {
  return assignedPeople.filter((p) => p.tier === tier);
}

function countByProgress(
  tier: "LO Mastery ($249)" | "Loan Factory Alliance ($449)",
  status: "active" | "needs_nudge" | "stuck" | "inactive",
) {
  return memberProgress.filter(
    (member) => member.tier === tier && member.status === status,
  ).length;
}

export default async function DashboardPage() {
  const access = await getCoachAccess();

  if (access.status === "not-configured") {
    return (
      <AccessNotice surfaceLabel="Manager Dashboard" status="not-configured">
        Sign-in setup is not ready in this environment yet.
      </AccessNotice>
    );
  }

  if (access.status === "signed-out") {
    return (
      <AccessNotice surfaceLabel="Manager Dashboard" status="signed-out">
        The manager dashboard is for approved Loan Factory coaching leadership.
      </AccessNotice>
    );
  }

  if (access.status === "pending") {
    return (
      <AccessNotice surfaceLabel="Manager Dashboard" status="pending">
        Your account is signed in, but it is not approved for manager access
        yet.
      </AccessNotice>
    );
  }

  if (!access.seesAll) {
    return (
      <AccessNotice
        surfaceLabel="Manager Dashboard"
        status="access-denied"
        roleLabel={access.effectiveRoleLabel}
      >
        Your current role does not include manager dashboard access.
      </AccessNotice>
    );
  }

  const summary = buildSupervisorCoverageSummary();
  const masteryMembers = countByTier("lo_mastery");
  const allianceMembers = countByTier("alliance");
  const submittedScorecards = scorecardReviews.filter(
    (scorecard) => scorecard.status === "submitted",
  );
  const missingScorecards = scorecardReviews.filter(
    (scorecard) => scorecard.status === "missing",
  );
  const attentionMembers = assignedPeople.filter(
    (person) => person.status !== "active",
  );

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
            Manager Dashboard
          </p>
          <h1 className="mt-5 font-display text-4xl font-semibold tracking-tight">
            Coaching Manager Dashboard
          </h1>
          <p className="mt-4 max-w-3xl text-lg text-white/85">
            All coaches, members, and program status in one place for the paid
            coaching platform.
          </p>
          <div className="mt-6 flex flex-wrap gap-3">
            <Link href="/coach-command-center/" className="btn-primary">
              Open Coach Command Center
            </Link>
            <Link href="/resources/" className="btn-secondary border-white/30 bg-white/10 text-white hover:border-white hover:bg-white/20">
              Open Resources
            </Link>
          </div>
          {access.viewingAsLabel && (
            <p className="mt-4 inline-block rounded-full bg-white/20 px-3 py-1 text-xs font-semibold">
              Viewing as: {access.viewingAsLabel}
            </p>
          )}
        </div>
      </section>

      <section className="container-page py-10">
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6">
          {[
            { label: "All coaches", value: String(summary.coaches) },
            { label: "Assigned members", value: String(summary.assignedLOs) },
            { label: "Need attention", value: String(summary.needsAttention) },
            { label: "Scorecards submitted", value: String(summary.scorecardsSubmitted) },
            { label: "Scorecards missing", value: String(summary.scorecardsMissing) },
            { label: "Coverage at risk", value: String(summary.coverageAtRisk) },
          ].map((item) => (
            <div key={item.label} className="card">
              <p className="text-xs font-semibold uppercase tracking-wide text-lf-slate">
                {item.label}
              </p>
              <p className="mt-2 text-3xl font-semibold text-lf-charcoal">
                {item.value}
              </p>
            </div>
          ))}
        </div>
      </section>

      <section className="container-page pb-10">
        <div className="grid gap-4 lg:grid-cols-2">
          <div className="card">
            <h2 className="h-display text-xl">Program status</h2>
            <div className="mt-4 grid gap-3 sm:grid-cols-2">
              <ProgramCard
                title="LO Mastery"
                subtitle="$249 tier"
                count={masteryMembers.length}
                details={[
                  `${countByProgress("LO Mastery ($249)", "active")} active`,
                  `${countByProgress("LO Mastery ($249)", "needs_nudge")} need a nudge`,
                  `${countByProgress("LO Mastery ($249)", "stuck")} stuck`,
                ]}
              />
              <ProgramCard
                title="Loan Factory Alliance"
                subtitle="$449 tier"
                count={allianceMembers.length}
                details={[
                  `${countByProgress("Loan Factory Alliance ($449)", "active")} active`,
                  `${countByProgress("Loan Factory Alliance ($449)", "needs_nudge")} need a nudge`,
                  `${countByProgress("Loan Factory Alliance ($449)", "stuck")} stuck`,
                ]}
              />
            </div>
          </div>

          <div className="card">
            <h2 className="h-display text-xl">Participation summary</h2>
            <p className="prose-lf mt-2 text-sm">
              Quick read on weekly engagement across the paid coaching member
              base.
            </p>
            <div className="mt-4 grid gap-3 sm:grid-cols-2">
              {[
                { label: "Active members", value: String(memberProgress.filter((m) => m.status === "active").length) },
                { label: "Need a nudge", value: String(memberProgress.filter((m) => m.status === "needs_nudge").length) },
                { label: "Stuck", value: String(memberProgress.filter((m) => m.status === "stuck").length) },
                { label: "Inactive", value: String(memberProgress.filter((m) => m.status === "inactive").length) },
              ].map((item) => (
                <div key={item.label} className="rounded-lg border border-lf-line bg-white px-4 py-3">
                  <p className="text-xs font-semibold uppercase tracking-wide text-lf-slate">{item.label}</p>
                  <p className="mt-1 text-2xl font-semibold text-lf-charcoal">{item.value}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="container-page pb-10">
        <div className="card overflow-hidden p-0">
          <div className="border-b border-lf-line px-4 py-3">
            <h2 className="h-display text-xl">All coaches</h2>
            <p className="mt-1 text-xs text-lf-slate">
              Coaching coverage, attention signals, scorecards, and follow-up
              activity.
            </p>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead className="border-b border-lf-line bg-lf-mist/60 text-xs uppercase tracking-wide text-lf-slate">
                <tr>
                  <th className="px-4 py-2 font-semibold">Coach</th>
                  <th className="px-4 py-2 font-semibold">Type</th>
                  <th className="px-4 py-2 font-semibold">Assigned</th>
                  <th className="px-4 py-2 font-semibold">Needs attention</th>
                  <th className="px-4 py-2 font-semibold">Scorecards</th>
                  <th className="px-4 py-2 font-semibold">Coverage</th>
                  <th className="px-4 py-2 font-semibold">Follow-up</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-lf-line">
                {coachCoverage.map((coach) => (
                  <tr key={coach.id} className="align-top hover:bg-lf-mist/40">
                    <td className="px-4 py-2">
                      <p className="font-semibold text-lf-charcoal">{coach.coachName}</p>
                      <p className="text-xs text-lf-slate">{coach.lastReview}</p>
                    </td>
                    <td className="px-4 py-2 text-lf-slate">
                      {coverageCoachTypeLabels[coach.coachType]}
                    </td>
                    <td className="px-4 py-2 text-lf-slate">{coach.assignedCount}</td>
                    <td className="px-4 py-2 text-lf-slate">{coach.needsAttention}</td>
                    <td className="px-4 py-2 text-lf-slate">
                      {coach.scorecardsSubmitted} submitted / {coach.scorecardsMissing} missing
                    </td>
                    <td className="px-4 py-2">
                      <span
                        className={`rounded-full px-2.5 py-0.5 text-xs font-semibold ${{
                          on_track: "bg-green-100 text-green-800",
                          watch: "bg-yellow-100 text-yellow-800",
                          at_risk: "bg-lf-orangeSoft text-lf-orangeDark",
                        }[coach.coverageStatus]}`}
                      >
                        {coach.coverageStatus.replace("_", " ")}
                      </span>
                    </td>
                    <td className="px-4 py-2 text-lf-slate">{coach.followUpActivity}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      <section className="container-page pb-10">
        <div className="grid gap-4 lg:grid-cols-2">
          <div className="card overflow-hidden p-0">
            <div className="border-b border-lf-line px-4 py-3">
              <h2 className="h-display text-xl">Scorecard completion</h2>
            </div>
            <ul className="divide-y divide-lf-line">
              {scorecardReviews.map((scorecard) => (
                <li key={scorecard.id} className="px-4 py-3">
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <p className="text-sm font-semibold text-lf-charcoal">
                        {scorecard.memberName}
                      </p>
                      <p className="text-xs text-lf-slate">
                        {scorecard.tier} · {scorecard.weekOf}
                      </p>
                    </div>
                    <span
                      className={`rounded-full px-2.5 py-0.5 text-xs font-semibold ${
                        scorecard.status === "submitted"
                          ? "bg-green-100 text-green-800"
                          : "bg-lf-orangeSoft text-lf-orangeDark"
                      }`}
                    >
                      {scorecard.status}
                    </span>
                  </div>
                  <div className="mt-2 flex flex-wrap items-center gap-2 text-xs text-lf-slate">
                    <span>
                      {scorecard.trend === "unknown"
                        ? "? Unknown"
                        : `${trendMeta[scorecard.trend].symbol} ${trendMeta[scorecard.trend].label}`}
                    </span>
                    <span>·</span>
                    <span>{scorecard.conversationActivity}</span>
                  </div>
                </li>
              ))}
            </ul>
          </div>

          <div className="card overflow-hidden p-0">
            <div className="border-b border-lf-line px-4 py-3">
              <h2 className="h-display text-xl">Items needing attention</h2>
            </div>
            <ul className="divide-y divide-lf-line">
              {attentionMembers.map((person) => (
                <li key={person.id} className="px-4 py-3">
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <p className="text-sm font-semibold text-lf-charcoal">
                        {person.name}
                      </p>
                      <p className="text-xs text-lf-slate">
                        {person.program} · Coach: {person.coach}
                      </p>
                    </div>
                    <span
                      className={`rounded-full px-2.5 py-0.5 text-xs font-semibold ${statusMeta[person.status].class}`}
                    >
                      {statusMeta[person.status].label}
                    </span>
                  </div>
                  <p className="mt-2 text-sm text-lf-charcoal">
                    Next: {person.nextTask}
                  </p>
                  <p className="mt-1 text-xs text-lf-slate">
                    Last activity: {person.lastActivity}
                  </p>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <section className="container-page pb-14">
        <div className="grid gap-4 lg:grid-cols-2">
          <div className="card">
            <h2 className="h-display text-xl">Member progress</h2>
            <div className="mt-4 space-y-3">
              {memberProgress.map((member) => (
                <div key={member.id} className="rounded-lg border border-lf-line bg-white px-4 py-3">
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <p className="text-sm font-semibold text-lf-charcoal">{member.name}</p>
                      <p className="text-xs text-lf-slate">{member.tier}</p>
                    </div>
                    <span
                      className={`rounded-full px-2.5 py-0.5 text-xs font-semibold ${statusMeta[member.status].class}`}
                    >
                      {statusMeta[member.status].label}
                    </span>
                  </div>
                  <div className="mt-3 grid gap-2 text-xs text-lf-slate sm:grid-cols-2">
                    <p>Attendance: {member.coachingAttendance}</p>
                    <p>Commitments: {member.weeklyCommitments}</p>
                    <p>Activity tracker: {member.activityTracker}</p>
                    <p>Program progress: {member.progressSnapshot}</p>
                    <p>Accountability: {member.accountabilityScore}</p>
                    <p>Resources: {member.resourceCompletion}</p>
                  </div>
                  <p className="mt-2 text-sm text-lf-charcoal">Next action: {member.nextAction}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="card">
            <h2 className="h-display text-xl">Simple reporting view</h2>
            <p className="prose-lf mt-2 text-sm">
              A quick executive read for paid coaching leadership.
            </p>
            <dl className="mt-4 space-y-3 text-sm">
              <SummaryRow label="Total members" value={String(assignedPeople.length)} />
              <SummaryRow label="LO Mastery members" value={String(masteryMembers.length)} />
              <SummaryRow label="Alliance members" value={String(allianceMembers.length)} />
              <SummaryRow label="Submitted scorecards" value={String(submittedScorecards.length)} />
              <SummaryRow label="Missing scorecards" value={String(missingScorecards.length)} />
              <SummaryRow label="Needs attention" value={String(attentionMembers.length)} />
            </dl>
            <div className="mt-5 flex flex-wrap gap-3">
              <Link href="/admin/view-as/" className="btn-primary">
                View as role
              </Link>
              <Link href="/coach-command-center/" className="btn-secondary">
                Coach Command Center
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

function ProgramCard({
  title,
  subtitle,
  count,
  details,
}: {
  title: string;
  subtitle: string;
  count: number;
  details: string[];
}) {
  return (
    <div className="rounded-xl border border-lf-line bg-lf-mist/50 p-4">
      <p className="text-xs font-semibold uppercase tracking-wide text-lf-slate">
        {subtitle}
      </p>
      <h3 className="mt-1 text-lg font-semibold text-lf-charcoal">{title}</h3>
      <p className="mt-2 text-3xl font-semibold text-lf-navy">{count}</p>
      <ul className="mt-3 space-y-1 text-sm text-lf-slate">
        {details.map((detail) => (
          <li key={detail}>{detail}</li>
        ))}
      </ul>
    </div>
  );
}

function SummaryRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-center justify-between rounded-lg border border-lf-line bg-lf-mist/40 px-4 py-2.5">
      <dt className="font-semibold text-lf-slate">{label}</dt>
      <dd className="font-semibold text-lf-charcoal">{value}</dd>
    </div>
  );
}
