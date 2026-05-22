import SectionHeading from "@/components/SectionHeading";
import RoleGate from "@/components/RoleGate";

export const dynamic = "force-dynamic";
export const metadata = { title: "Coach Guide" };

export default function CoachGuidePage() {
  return (
    <>
      <section className="relative isolate overflow-hidden bg-lf-navy text-white">
        <div
          aria-hidden
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: "url(/media/dark-hero-background.png)" }}
        />
        <div aria-hidden className="absolute inset-0 bg-lf-navyDark/60" />
        <div className="relative container-page py-14">
          <span className="rounded-full bg-lf-orange px-3 py-1 text-xs font-bold uppercase tracking-wide">
            For coaches
          </span>
          <h1 className="mt-5 font-display text-4xl font-semibold tracking-tight">
            Coach Guide
          </h1>
          <p className="mt-4 max-w-2xl text-lg text-white/85">
            How corporate coaches teach the modules, reinforce one specific
            behavior per week, and review recorded calls against a clean rubric.
          </p>
        </div>
      </section>

      <RoleGate gate="coach-guide">
      <section className="container-page py-12 space-y-12">
        <div>
          <SectionHeading
            eyebrow="Teach"
            title="Lead the 45 minute module live or on demand."
            description="Run a follow on 30 minute office hour the same week to answer questions and run one live roleplay."
          />
        </div>

        <div>
          <SectionHeading
            eyebrow="Reinforce"
            title="One behavior. One week."
          />
          <ol className="prose-lf mt-4 list-decimal space-y-2 pl-5 text-base">
            <li>Pick one behavior the LO is missing.</li>
            <li>Tie it to a trigger that already exists in their day.</li>
            <li>Send a short Loom or text reminder daily.</li>
            <li>Score one recorded call against that behavior at week end.</li>
            <li>Celebrate the small completion publicly.</li>
          </ol>
        </div>

        <div>
          <SectionHeading
            eyebrow="Review"
            title="The first call rubric."
          />
          <div className="mt-4 overflow-hidden rounded-2xl border border-lf-line shadow-card">
            <table className="w-full text-sm">
              <thead className="bg-lf-mist text-left text-xs uppercase tracking-wide text-lf-slate">
                <tr>
                  <th className="px-5 py-3">Area</th>
                  <th className="px-5 py-3">What strong looks like</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-t border-lf-line">
                  <td className="px-5 py-3 font-semibold text-lf-navy">Open</td>
                  <td className="px-5 py-3">Warm, agenda set, permission asked. 60 seconds or less.</td>
                </tr>
                <tr className="border-t border-lf-line">
                  <td className="px-5 py-3 font-semibold text-lf-navy">Discovery</td>
                  <td className="px-5 py-3">15 to 16 quality questions. Listened more than talked. Target 43:57.</td>
                </tr>
                <tr className="border-t border-lf-line">
                  <td className="px-5 py-3 font-semibold text-lf-navy">Plan</td>
                  <td className="px-5 py-3">Summarized in plain English. No jargon.</td>
                </tr>
                <tr className="border-t border-lf-line">
                  <td className="px-5 py-3 font-semibold text-lf-navy">Options</td>
                  <td className="px-5 py-3">Framed as paths and tradeoffs. No teaser specifics.</td>
                </tr>
                <tr className="border-t border-lf-line">
                  <td className="px-5 py-3 font-semibold text-lf-navy">Next step</td>
                  <td className="px-5 py-3">Dated, confirmed, written down on the call.</td>
                </tr>
              </tbody>
            </table>
          </div>
          <p className="prose-lf mt-3 text-sm">
            Score 1 to 5 in each area. Coach to the lowest two each week.
          </p>
        </div>

        <div>
          <SectionHeading
            eyebrow="Cadence"
            title="What a strong coach week looks like."
          />
          <ul className="prose-lf mt-4 list-disc space-y-1 pl-5 text-base">
            <li>Monday: 10 minute kickoff with the module's one behavior focus.</li>
            <li>Tuesday and Wednesday: pull two recorded calls per LO.</li>
            <li>Thursday: deliver scored feedback by Loom or written notes.</li>
            <li>Friday: 15 minute LO review. Decide next week's one specific change.</li>
          </ul>
        </div>
      </section>
      </RoleGate>
    </>
  );
}
