import Link from "next/link";
import PageHero from "@/components/PageHero";
import SectionHeading from "@/components/SectionHeading";
import ComplianceCallout from "@/components/ComplianceCallout";
import { isBetaPreviewEnabled } from "@/lib/betaPreview";
import { isAdminRole } from "@/lib/supabase/auth";
import { getBetaUserSession } from "@/lib/supabase/session";
import {
  sampleReports,
  statusLabel,
  statusToneClass,
} from "@/data/sampleQuizReports";
import { coachingProfiles, newLoReadinessProfiles } from "@/data/coachingProfiles";

export const dynamic = "force-dynamic";
export const metadata = { title: "Admin Quiz Review" };

const roleViews = [
  {
    role: "Team Leader",
    description:
      "See their own pod's completed reports, with quick links to coaching recommendations and pair-up suggestions. Cannot edit compliance or licensing data.",
  },
  {
    role: "Coach",
    description:
      "Sees assigned LOs across teams. Can mark reports as reviewed, leave a coach note, and queue the next training step from the platform.",
  },
  {
    role: "LO Development Admin",
    description:
      "Oversight view of all completed quizzes. Can roll up by team, profile mix, and readiness band. No editing of LO answers — those stay LO-owned.",
  },
];

export default async function AdminQuizReviewPage() {
  const session = await getBetaUserSession();
  const previewEnabled = await isBetaPreviewEnabled();

  const isAdmin =
    previewEnabled ||
    (session.status === "approved" &&
      (session.permissions?.can_access_admin ||
        isAdminRole(session.profile.role)));

  if (!isAdmin) {
    return (
      <section className="container-page py-16">
        <div className="card max-w-2xl">
          <h1 className="h-display text-3xl">Admin access required</h1>
          <p className="prose-lf mt-3">
            Quiz Review is for approved Loan Factory admins. Ask Jeremy or LO
            Development to review your access.
          </p>
          <Link href="/" className="btn-primary mt-6 inline-block">
            Back to home
          </Link>
        </div>
      </section>
    );
  }

  const totals = {
    personality: sampleReports.filter((r) => r.kind === "personality").length,
    newLo: sampleReports.filter((r) => r.kind === "new-lo").length,
    needsReview: sampleReports.filter((r) => r.status === "needs-review").length,
    inCoaching: sampleReports.filter((r) => r.status === "in-coaching").length,
    reviewed: sampleReports.filter((r) => r.status === "reviewed").length,
  };

  return (
    <>
      <PageHero
        eyebrow="LO Development · Admin"
        title="Admin Quiz Review"
        body={
          <p>
            How completed reports would be reviewed across roles. Local
            preview only — there are no database writes, no live LO data, and
            no compliance, licensing, or employment decisions on this page.
          </p>
        }
        backgroundImage="/media/dark-hero-background.png"
      >
        <div className="flex flex-wrap gap-3">
          <Link href="/coach-reports/" className="btn-primary">
            View sample reports
          </Link>
          <Link
            href="/assessments/"
            className="btn-secondary border-white/30 bg-white/10 text-white hover:border-white hover:bg-white/20"
          >
            See the quizzes
          </Link>
        </div>
      </PageHero>

      <section className="container-page py-12">
        <SectionHeading
          eyebrow="At a glance"
          title="Sample roll-up across both quizzes."
        />
        <div className="mt-6 grid gap-4 md:grid-cols-2 lg:grid-cols-5">
          <Stat label="Coaching Personality" value={totals.personality} />
          <Stat label="New LO Aptitude" value={totals.newLo} />
          <Stat label="Needs review" value={totals.needsReview} accent />
          <Stat label="In coaching" value={totals.inCoaching} />
          <Stat label="Reviewed" value={totals.reviewed} />
        </div>
      </section>

      <section className="bg-lf-mist">
        <div className="container-page py-12">
          <SectionHeading
            eyebrow="Role-based views"
            title="Three viewing roles, one shared report shape."
            description="Each role sees the same underlying report with role-specific controls and routing."
          />
          <div className="mt-8 grid gap-5 md:grid-cols-3">
            {roleViews.map((view) => (
              <article key={view.role} className="card">
                <h3 className="h-display text-lg">{view.role}</h3>
                <p className="prose-lf mt-2 text-sm text-lf-slate">
                  {view.description}
                </p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="container-page py-12">
        <SectionHeading
          eyebrow="Review queue"
          title="Fictional review queue for alignment practice."
          description="Use the queue to align coaches and team leaders on tone and pacing before the live rollout."
        />
        <div className="mt-8 overflow-hidden rounded-2xl border border-lf-line bg-white shadow-card">
          <div className="grid gap-0 divide-y divide-lf-line">
            {sampleReports.map((report) => (
              <article
                key={report.id}
                className="grid gap-3 p-5 lg:grid-cols-[1fr_1fr_0.75fr]"
              >
                <div>
                  <p className="text-xs font-semibold uppercase tracking-wide text-lf-orange">
                    {report.kind === "personality"
                      ? "Coaching Personality"
                      : "New LO Aptitude"}{" "}
                    · {report.team}
                  </p>
                  <h3 className="h-display mt-1 text-lg">{report.loName}</h3>
                  <p className="mt-1 text-xs text-lf-slate">
                    Submitted {report.submittedAt} · ID {report.id}
                  </p>
                </div>
                <div className="text-sm leading-6 text-lf-charcoal">
                  {report.kind === "personality" ? (
                    <p>
                      Primary:{" "}
                      <strong>
                        {coachingProfiles[report.primaryProfile].name}
                      </strong>
                      {report.secondaryProfile && (
                        <>
                          {" "}· secondary{" "}
                          <strong>
                            {coachingProfiles[report.secondaryProfile].name}
                          </strong>
                        </>
                      )}
                    </p>
                  ) : (
                    <p>
                      Stage:{" "}
                      <strong>
                        {newLoReadinessProfiles[report.readinessProfile].name}
                      </strong>{" "}
                      · {report.readinessScore.toFixed(2)} / 3
                    </p>
                  )}
                  <p className="mt-2 text-sm text-lf-slate">{report.coachNote}</p>
                </div>
                <div className="flex flex-col items-start gap-2">
                  <span
                    className={`rounded-full border px-3 py-1 text-xs font-semibold ${statusToneClass[report.status]}`}
                  >
                    {statusLabel[report.status]}
                  </span>
                  <button
                    type="button"
                    className="btn-secondary text-xs"
                    disabled
                    title="Local preview only"
                  >
                    Assign next training
                  </button>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="container-page pb-20">
        <ComplianceCallout title="Local preview only" variant="default">
          <p>
            This page is a static preview for coaching alignment. No database
            writes, no live LO data, no compliance, employment, or licensing
            decisions are made here. Role-based controls are conceptual only
            until access wiring is added later.
          </p>
        </ComplianceCallout>
      </section>
    </>
  );
}

function Stat({
  label,
  value,
  accent,
}: {
  label: string;
  value: number;
  accent?: boolean;
}) {
  return (
    <div
      className={`card flex flex-col gap-1 ${accent ? "border-lf-orange/40 bg-lf-orangeSoft/50" : ""}`}
    >
      <p className="text-xs font-semibold uppercase tracking-wide text-lf-slate">
        {label}
      </p>
      <p className="font-display text-3xl font-semibold text-lf-navy">{value}</p>
    </div>
  );
}
