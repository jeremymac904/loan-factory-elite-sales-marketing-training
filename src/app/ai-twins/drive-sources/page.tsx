import AITwinNav from "@/components/AITwinNav";
import SectionHeading from "@/components/SectionHeading";

export const metadata = { title: "AI Twin Drive Sources" };

const steps = [
  "You choose to connect a Drive folder in the future.",
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
        title="Future help organizing Drive files"
        description="Drive is not connected. This page shows how selected folders could later become source maps, project briefs, and reusable knowledge packs."
      />
      <div className="mt-8 grid gap-6 lg:grid-cols-[0.8fr_1.2fr]">
        <article className="card">
          <h2 className="h-display text-2xl">Connected now</h2>
          <p className="prose-lf mt-3 text-sm text-lf-slate">
            Nothing. This page only shows the future idea. Private files stay
            isolated by user and role.
          </p>
        </article>
        <article className="card">
          <h2 className="h-display text-2xl">Workflow preview</h2>
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
