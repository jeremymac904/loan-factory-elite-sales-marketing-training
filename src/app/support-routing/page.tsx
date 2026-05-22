import PlatformModulePage from "@/components/PlatformModulePage";
import SectionHeading from "@/components/SectionHeading";
import SupportTeamDirectory from "@/components/SupportTeamDirectory";
import { getPlatformModule } from "@/data/platform";

export const metadata = { title: "Support Routing" };

const routes = [
  ["Training question", "Route to module owner, coach guide, or Training Library."],
  ["Apex Advisor question", "Route to Apex Advisor owner or member support path."],
  ["AI draft review", "Route to AI Assistant Hub review notes and human reviewer."],
  ["FaceGram flag", "Route to FaceGram review path and marketing reviewer."],
  ["TERA workflow question", "Route to approved TERA training references and human owner."],
  ["Compliance-sensitive content", "Route to human review before external use."],
];

export default function SupportRoutingPage() {
  const platformModule = getPlatformModule("support-routing");

  return (
    <PlatformModulePage module={platformModule}>
      <section className="bg-lf-mist">
        <div className="container-page py-14">
          <SectionHeading
            eyebrow="Routing matrix"
            title="Right help, right now"
            description="Use this page to find the right internal owner, coach, reviewer, or resource path."
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

      <SupportTeamDirectory />
    </PlatformModulePage>
  );
}
