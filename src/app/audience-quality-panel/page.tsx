import ComplianceCallout from "@/components/ComplianceCallout";
import PlatformModulePage from "@/components/PlatformModulePage";
import SectionHeading from "@/components/SectionHeading";
import { audiencePanels, getPlatformModule } from "@/data/platform";

export const metadata = { title: "Audience Quality Panel" };

export default function AudienceQualityPanelPage() {
  const platformModule = getPlatformModule("audience-quality-panel");

  return (
    <PlatformModulePage module={platformModule}>
      <section className="container-page py-14">
        <ComplianceCallout title="AI panel review is not final approval" variant="warning">
          <p>
            AI panel review improves content quality and flags risk. It does not
            replace Loan Factory marketing, compliance, legal, or leadership
            review.
          </p>
        </ComplianceCallout>
      </section>

      <section className="bg-lf-mist">
        <div className="container-page py-14">
          <SectionHeading
            eyebrow="Five panels"
            title="Every panel returns the same review structure"
            description="This is a static demo surface. No OpenRouter, model provider, or external API is called."
          />
          <div className="mt-8 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
            {audiencePanels.map((panel) => (
              <article key={panel.name} className="card">
                <h3 className="h-display text-lg">{panel.name}</h3>
                <ul className="prose-lf mt-3 list-disc space-y-1 pl-5 text-sm">
                  {panel.output.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="container-page py-14">
        <SectionHeading
          eyebrow="Demo report structure"
          title="What an eventual panel report should show"
          description="The values below are examples of fields, not generated scores."
        />
        <div className="mt-8 grid gap-5 md:grid-cols-2">
          {[
            ["Score 0-100", "Numeric quality signal for the selected panel."],
            ["Audience reaction", "Plain-English simulated reaction."],
            ["What works", "Specific strengths to preserve."],
            ["What does not work", "Weaknesses and confusing spots."],
            ["Risk flags", "Issues requiring human review."],
            ["Rewrite recommendation", "Concrete improvement direction."],
            ["Approval status", "Ready for Internal Use, Needs Edits, Needs Human Review, or Not Suitable."],
          ].map(([title, body]) => (
            <article key={title} className="card">
              <h3 className="h-display text-lg">{title}</h3>
              <p className="prose-lf mt-2 text-sm text-lf-slate">{body}</p>
            </article>
          ))}
        </div>
      </section>
    </PlatformModulePage>
  );
}
