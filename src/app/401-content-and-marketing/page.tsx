import StagedModulePage from "@/components/StagedModulePage";
import ComplianceCallout from "@/components/ComplianceCallout";
import SectionHeading from "@/components/SectionHeading";
import { safeContentDecisionTree } from "@/data/complianceRules";
import { findModule } from "@/data/modules";

export const metadata = { title: "401 Content and Marketing" };

const moduleData = findModule("401-content-and-marketing")!;

export default function Page() {
  return (
    <>
      <StagedModulePage
        module={moduleData}
        handoutTitle="401 Compliance Safe Content Decision Tree"
        handoutDescription="A one page checklist every LO runs before publishing borrower facing content."
        recordingDescription="Jeremy shoots a 60 second Reel end to end on his phone, then breaks down the hook and CTA."
      />

      <section className="container-page py-6">
        <SectionHeading
          eyebrow="Safe content decision tree"
          title="Run every public post through these steps."
          description="If any step says rewrite, rewrite. If any step says compliance review, send it to review."
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
      </section>

      <section className="container-page pb-16">
        <ComplianceCallout title="Reg Z reminder" variant="warning">
          <p>
            A specific rate, a payment period, a specific payment amount, or a
            specific finance charge in a public post triggers full Reg Z
            disclosures. When in doubt, rewrite or route to compliance review.
          </p>
        </ComplianceCallout>
      </section>
    </>
  );
}
