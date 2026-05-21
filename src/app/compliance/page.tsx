import SectionHeading from "@/components/SectionHeading";
import ComplianceCallout from "@/components/ComplianceCallout";
import {
  complianceRules,
  safeContentDecisionTree,
  bannedTermsForContent,
} from "@/data/complianceRules";

export const metadata = { title: "Compliance Notes" };

export default function CompliancePage() {
  return (
    <>
      <section className="bg-lf-navy text-white">
        <div className="container-page py-14">
          <span className="rounded-full bg-lf-orange px-3 py-1 text-xs font-bold uppercase tracking-wide">
            Compliance
          </span>
          <h1 className="mt-5 font-display text-4xl font-semibold tracking-tight">
            Compliance Notes
          </h1>
          <p className="mt-4 max-w-2xl text-lg text-white/85">
            These notes are training references for Loan Factory loan officers
            and team leaders. They are not legal advice. Anything borrower
            facing, Realtor facing, or public must be reviewed by compliance
            before use.
          </p>
        </div>
      </section>

      <section className="container-page py-12 space-y-10">
        <div className="space-y-5">
          {complianceRules.map((r) => (
            <article key={r.id} id={r.id} className="card scroll-mt-24">
              <div className="flex flex-wrap items-center gap-2">
                <span className="text-xs font-semibold uppercase tracking-wide text-lf-orange">
                  {r.category}
                </span>
              </div>
              <h2 className="h-display mt-1 text-xl">{r.title}</h2>
              <p className="prose-lf mt-2 text-sm">{r.summary}</p>
              <p className="prose-lf mt-3 text-sm">
                <strong>The rule:</strong> {r.rule}
              </p>
              <div className="prose-lf mt-3 text-sm">
                <strong>What this looks like in real life:</strong>
                <ul className="mt-2 list-disc space-y-1 pl-5">
                  {r.whatThisLooksLike.map((w) => (
                    <li key={w}>{w}</li>
                  ))}
                </ul>
              </div>
            </article>
          ))}
        </div>

        <div>
          <SectionHeading
            eyebrow="Decision tree"
            title="Compliance safe content decision tree."
          />
          <ol className="prose-lf mt-6 space-y-3 text-base">
            {safeContentDecisionTree.map((s) => (
              <li key={s.step} className="card">
                <p className="text-xs font-semibold uppercase tracking-wide text-lf-orange">
                  Step {s.step}
                </p>
                <p className="mt-1 font-semibold text-lf-navy">{s.question}</p>
                {s.ifYes && (
                  <p className="mt-1 text-sm">
                    <strong>If yes: </strong>
                    {s.ifYes}
                  </p>
                )}
                {s.ifNo && (
                  <p className="text-sm">
                    <strong>If no: </strong>
                    {s.ifNo}
                  </p>
                )}
              </li>
            ))}
          </ol>
        </div>

        <div>
          <SectionHeading
            eyebrow="Banned content phrases"
            title="Do not use these in public content."
          />
          <ul className="prose-lf mt-3 list-disc space-y-1 pl-5 text-base">
            {bannedTermsForContent.map((b) => (
              <li key={b}>{b}</li>
            ))}
          </ul>
        </div>

        <ComplianceCallout title="Final reminder" variant="warning">
          <p>
            This page is training reference, not legal advice. When in doubt,
            route the artifact to compliance review.
          </p>
        </ComplianceCallout>
      </section>
    </>
  );
}
