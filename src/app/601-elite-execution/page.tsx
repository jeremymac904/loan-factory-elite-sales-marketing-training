import StagedModulePage from "@/components/StagedModulePage";
import SectionHeading from "@/components/SectionHeading";
import ComplianceCallout from "@/components/ComplianceCallout";
import { findModule } from "@/data/modules";

export const metadata = { title: "601 Execution System" };

const moduleData = findModule("601-elite-execution")!;

export default function Page() {
  return (
    <>
      <StagedModulePage
        module={moduleData}
        handoutTitle="601 Niche Plan Template"
        handoutDescription="12 week niche plan template, AI prompt checklist, scorecard template, partner roster."
        recordingDescription="Jeremy presents a niche campaign plan and the AI prompts used to support it."
      />
      <section className="container-page py-6">
        <SectionHeading
          eyebrow="Training completion"
          title="Earn the Loan Factory 101-601 completion badge."
          description="The completion badge recognizes finished free internal training work and practice. It does not promise production or business results."
        />
        <ol className="prose-lf mt-6 list-decimal space-y-2 pl-5 text-base">
          <li>All assignments through 101 to 601 completed.</li>
          <li>Two recorded calls scored above the first call rubric threshold.</li>
          <li>One 12 week niche plan submitted.</li>
          <li>One AI prompt routine demonstrated or submitted for review.</li>
          <li>Weekly tracker submitted at least four times during the series.</li>
        </ol>
      </section>
      <section className="container-page pb-16">
        <ComplianceCallout title="No production guarantees">
          <p>
            The completion badge recognizes behavior change and training system
            completion. It does not guarantee production, commission, or
            referral volume. Do not market completion with implied production
            claims.
          </p>
        </ComplianceCallout>
      </section>
    </>
  );
}
