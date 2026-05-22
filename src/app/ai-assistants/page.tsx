import ComplianceCallout from "@/components/ComplianceCallout";
import PlatformModulePage from "@/components/PlatformModulePage";
import SectionHeading from "@/components/SectionHeading";
import { aiAssistants, getPlatformModule } from "@/data/platform";

export const metadata = { title: "AI Assistants" };

export default function AIAssistantsPage() {
  const platformModule = getPlatformModule("ai-assistants");

  return (
    <PlatformModulePage module={platformModule}>
      <section className="container-page py-14">
        <ComplianceCallout title="Draft-only assistant outputs" variant="warning">
          <p>
            Every assistant output is draft only. Review before external use.
            Assistants do not make final underwriting, pricing, compliance,
            TERA, or publication decisions.
          </p>
        </ComplianceCallout>
      </section>

      <section className="bg-lf-mist">
        <div className="container-page py-14">
          <SectionHeading
            eyebrow="Assistant catalog"
            title="Internal support assistants for LO development"
            description="This is a static catalog. No live AI calls or model provider calls are wired."
          />
          <div className="mt-8 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
            {aiAssistants.map((assistant) => (
              <article key={assistant.name} className="card flex h-full flex-col">
                <span className="text-xs font-semibold uppercase tracking-wide text-lf-orange">
                  Static concept
                </span>
                <h3 className="h-display mt-2 text-lg">{assistant.name}</h3>
                <p className="prose-lf mt-3 text-sm text-lf-slate">
                  Helps draft, coach, structure, review, or route work inside
                  the LO Development Platform. The live assistant is not wired
                  yet and requires source grounding plus human review gates.
                </p>
                <p className="mt-auto pt-4 text-xs font-bold uppercase tracking-wide text-lf-orangeDark">
                  {assistant.label}
                </p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="container-page py-14">
        <SectionHeading
          eyebrow="Guardrails"
          title="What assistants are not allowed to do"
        />
        <div className="mt-8 grid gap-5 md:grid-cols-2">
          {[
            "No direct TERA reads or writes.",
            "No borrower data exposure.",
            "No automatic sending, posting, or publishing.",
            "No final underwriting decisions.",
            "No rate, payment, fee, or approval claims.",
            "No claim of a public Loan Factory API.",
          ].map((rule) => (
            <article key={rule} className="card">
              <p className="prose-lf text-sm text-lf-slate">{rule}</p>
            </article>
          ))}
        </div>
      </section>
    </PlatformModulePage>
  );
}
