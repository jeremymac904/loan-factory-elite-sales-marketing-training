import PlatformModulePage from "@/components/PlatformModulePage";
import SectionHeading from "@/components/SectionHeading";
import { getPlatformModule } from "@/data/platform";

export const metadata = { title: "AI Training" };

const practices = [
  "Use approved source material before asking for a draft.",
  "Label outputs as draft only when they could leave the platform.",
  "Route compliance-sensitive content to human review.",
  "Never imply the platform can take final action inside TERA.",
];

export default function AITrainingPage() {
  const platformModule = getPlatformModule("ai-training");

  return (
    <PlatformModulePage module={platformModule}>
      <section className="container-page py-14">
        <SectionHeading
          eyebrow="AI usage habits"
          title="AI-powered. Human-led."
          description="This module teaches safe AI use as a working habit, not as an unchecked automation layer."
        />
        <div className="mt-8 grid gap-5 md:grid-cols-2">
          {practices.map((practice) => (
            <article key={practice} className="card">
              <p className="prose-lf text-sm text-lf-slate">{practice}</p>
            </article>
          ))}
        </div>
      </section>
    </PlatformModulePage>
  );
}
