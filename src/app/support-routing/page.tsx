import ComplianceCallout from "@/components/ComplianceCallout";
import PlatformModulePage from "@/components/PlatformModulePage";
import SectionHeading from "@/components/SectionHeading";
import { getPlatformModule } from "@/data/platform";

export const metadata = { title: "Support Routing" };

const routes = [
  ["Training question", "Route to module owner, coach guide, or Training Library."],
  ["Apex Advisor question", "Route to Apex Advisor owner or member support path."],
  ["AI draft review", "Route to AI Assistant Hub guardrails and human reviewer."],
  ["Creator Network flag", "Route to moderation queue concept and marketing reviewer."],
  ["TERA workflow question", "Route to approved TERA training references. No writeback."],
  ["Compliance-sensitive content", "Route to human review before external use."],
];

export default function SupportRoutingPage() {
  const platformModule = getPlatformModule("support-routing");

  return (
    <PlatformModulePage module={platformModule}>
      <section className="container-page py-14">
        <ComplianceCallout title="No workflow automation wired" variant="warning">
          <p>
            This page does not send email, trigger n8n, open a ticket, write to
            TERA, or notify anyone. It is the static routing playbook shell.
          </p>
        </ComplianceCallout>
      </section>

      <section className="bg-lf-mist">
        <div className="container-page py-14">
          <SectionHeading
            eyebrow="Routing matrix"
            title="Right help, right now"
            description="Andre and LO Development need to confirm the operational playbook before this becomes an action workflow."
          />
          <div className="mt-8 grid gap-5 md:grid-cols-2">
            {routes.map(([title, body]) => (
              <article key={title} className="card">
                <h3 className="h-display text-lg">{title}</h3>
                <p className="prose-lf mt-2 text-sm text-lf-slate">{body}</p>
              </article>
            ))}
          </div>
        </div>
      </section>
    </PlatformModulePage>
  );
}
