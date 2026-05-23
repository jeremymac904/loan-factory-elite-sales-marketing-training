import AITwinNav from "@/components/AITwinNav";
import SectionHeading from "@/components/SectionHeading";

export const metadata = { title: "AI Twin Drive Sources" };

const steps = [
  "User authorizes a future Drive read-only connection.",
  "User selects approved folders or files.",
  "System indexes metadata and safe document summaries.",
  "AI creates source maps and knowledge packs.",
  "User attaches approved sources to a Twin or project.",
];

export default function DriveSourcesPage() {
  return (
    <section className="container-page py-12">
      <AITwinNav />
      <SectionHeading
        eyebrow="Drive sources"
        title="Future Drive knowledge workflow"
        description="This is a static workflow shell only. No Google Drive API, OAuth scope, folder read, file ingest, or Supabase write is wired."
      />
      <div className="mt-8 grid gap-6 lg:grid-cols-[0.8fr_1.2fr]">
        <article className="card">
          <h2 className="h-display text-2xl">Connected now</h2>
          <p className="prose-lf mt-3 text-sm text-lf-slate">
            Nothing. This page shows how Drive sources should work later while
            keeping private files isolated by user and role.
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
