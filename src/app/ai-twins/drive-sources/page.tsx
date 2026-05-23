import AITwinNav from "@/components/AITwinNav";
import SectionHeading from "@/components/SectionHeading";

export const metadata = { title: "AI Twin Drive Sources" };

const steps = [
  "You choose which Drive folder should be considered.",
  "You select the folders or files you want used.",
  "The system reads safe summaries and file details.",
  "The Twin creates a source map so the project has clear context.",
  "You attach approved sources to a Twin or project.",
];

export default function DriveSourcesPage() {
  return (
    <section className="container-page py-12">
      <AITwinNav />
      <SectionHeading
        eyebrow="Drive sources"
        title="Drive source workflow"
        description="Use this workflow to map selected folders into source maps, project briefs, and reusable knowledge packs."
      />
      <div className="mt-8 grid gap-6 lg:grid-cols-[0.8fr_1.2fr]">
        <article className="card">
          <h2 className="h-display text-2xl">Source rules</h2>
          <p className="prose-lf mt-3 text-sm text-lf-slate">
            Private files stay isolated by user and role. Only approved source
            folders should be used for a Twin or project.
          </p>
        </article>
        <article className="card">
          <h2 className="h-display text-2xl">Workflow</h2>
          <ol className="prose-lf mt-4 list-decimal space-y-2 pl-5 text-sm">
            {steps.map((step) => (
              <li key={step}>{step}</li>
            ))}
          </ol>
        </article>
      </div>
    </section>
  );
}
