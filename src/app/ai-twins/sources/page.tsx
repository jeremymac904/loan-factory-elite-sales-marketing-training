import AITwinNav from "@/components/AITwinNav";
import SectionHeading from "@/components/SectionHeading";
import { aiTwinProfiles } from "@/data/aiTwins";

export const metadata = { title: "AI Twin Sources" };

export default function AiTwinSourcesPage() {
  return (
    <section className="container-page py-12">
      <AITwinNav />
      <SectionHeading
        eyebrow="Connected sources"
        title="Knowledge source map"
        description="Phase 1 shows which sources each Twin should eventually use. No private Gmail or Drive content is connected in beta preview."
      />
      <div className="mt-8 grid gap-5 md:grid-cols-2">
        {aiTwinProfiles.map((twin) => (
          <article key={twin.id} className="card">
            <h2 className="h-display text-xl">{twin.displayName}</h2>
            <div className="mt-4 grid gap-2">
              {twin.defaultKnowledgeSources.map((source) => (
                <div key={source} className="rounded-lg bg-lf-mist px-3 py-2 text-sm text-lf-charcoal">
                  {source}
                </div>
              ))}
            </div>
            <p className="mt-4 text-xs font-semibold uppercase tracking-wide text-lf-orange">
              Connected now
            </p>
            <p className="mt-1 text-sm text-lf-slate">
              Local example source list only. OAuth and document ingestion are
              future work.
            </p>
          </article>
        ))}
      </div>
    </section>
  );
}
