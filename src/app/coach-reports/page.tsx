import Link from "next/link";
import PageHero from "@/components/PageHero";
import SectionHeading from "@/components/SectionHeading";
import ComplianceCallout from "@/components/ComplianceCallout";
import {
  sampleReports,
  statusLabel,
  statusToneClass,
} from "@/data/sampleQuizReports";
import { coachingProfiles, newLoReadinessProfiles } from "@/data/coachingProfiles";

export const metadata = { title: "Coach Reports (samples)" };

export default function CoachReportsPage() {
  return (
    <>
      <PageHero
        eyebrow="LO Development"
        title="Coach Reports"
        body={
          <p>
            Sample completed reports a coach or team leader would review. Use
            this page to see what a finished Coaching Report or Team Leader
            Report looks like before rolling the quizzes out to your team.
          </p>
        }
        backgroundImage="/media/dark-hero-background.png"
      >
        <div className="flex flex-wrap gap-3">
          <Link href="/assessments/" className="btn-primary">
            View assessments
          </Link>
          <Link
            href="/admin/quiz-review/"
            className="btn-secondary border-white/30 bg-white/10 text-white hover:border-white hover:bg-white/20"
          >
            Open admin review
          </Link>
        </div>
      </PageHero>

      <section className="container-page py-14">
        <SectionHeading
          eyebrow="Sample reports"
          title="Six fictional reports for review practice."
          description="No real LO data is shown. Use these to align coaches on how to read a profile and what to do next."
        />
        <div className="mt-8 grid gap-5 lg:grid-cols-2">
          {sampleReports.map((report) => (
            <article key={report.id} className="card flex flex-col gap-3">
              <div className="flex flex-wrap items-center justify-between gap-2">
                <div>
                  <p className="text-xs font-semibold uppercase tracking-wide text-lf-orange">
                    {report.kind === "personality"
                      ? "Coaching Personality"
                      : "New LO Aptitude"}{" "}
                    · {report.team}
                  </p>
                  <h2 className="h-display mt-1 text-xl">{report.loName}</h2>
                </div>
                <span
                  className={`rounded-full border px-3 py-1 text-xs font-semibold ${statusToneClass[report.status]}`}
                >
                  {statusLabel[report.status]}
                </span>
              </div>

              {report.kind === "personality" ? (
                <>
                  <p className="prose-lf text-sm text-lf-charcoal">
                    Primary profile:{" "}
                    <strong>{coachingProfiles[report.primaryProfile].name}</strong>
                    {report.secondaryProfile && (
                      <>
                        {" "}— secondary{" "}
                        <strong>
                          {coachingProfiles[report.secondaryProfile].name}
                        </strong>
                      </>
                    )}
                    .
                  </p>
                  <p className="prose-lf text-sm text-lf-slate">
                    {coachingProfiles[report.primaryProfile].tagline}
                  </p>
                </>
              ) : (
                <>
                  <p className="prose-lf text-sm text-lf-charcoal">
                    Development stage:{" "}
                    <strong>
                      {newLoReadinessProfiles[report.readinessProfile].name}
                    </strong>{" "}
                    · readiness {report.readinessScore.toFixed(2)} / 3
                  </p>
                  <p className="prose-lf text-sm text-lf-slate">
                    {newLoReadinessProfiles[report.readinessProfile].tagline}
                  </p>
                </>
              )}

              <div className="rounded-xl border border-lf-line bg-lf-mist p-3 text-sm leading-6 text-lf-charcoal">
                <p>
                  <strong className="text-lf-navy">Coach note:</strong>{" "}
                  {report.coachNote}
                </p>
              </div>

              <div className="mt-1 flex flex-wrap gap-2 text-xs text-lf-slate">
                <span>Submitted {report.submittedAt}</span>
                <span aria-hidden>·</span>
                <span>Report ID {report.id}</span>
              </div>

              <div className="mt-2 flex flex-wrap gap-2">
                <button
                  type="button"
                  className="btn-secondary text-xs"
                  disabled
                  title="Local preview only — wiring deferred"
                >
                  Review with coach
                </button>
                <button
                  type="button"
                  className="btn-secondary text-xs"
                  disabled
                  title="Local preview only — wiring deferred"
                >
                  Assign next training path
                </button>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="container-page pb-20">
        <ComplianceCallout title="Local preview only" variant="default">
          <p>
            Coach Reports is a static preview using fictional data so coaches
            can align on how to read a profile. No database writes, no real
            LO data, and no compliance, employment, or licensing decisions are
            made on this page.
          </p>
        </ComplianceCallout>
      </section>
    </>
  );
}
