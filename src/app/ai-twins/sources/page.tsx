import AITwinNav from "@/components/AITwinNav";
import SectionHeading from "@/components/SectionHeading";
import { aiTwinProfiles } from "@/data/aiTwins";

export const metadata = { title: "AI Twin Sources" };

export default function AiTwinSourcesPage() {
  return (
    <section className="container-page py-12">
      <AITwinNav />
      <SectionHeading
        eyebrow="Sources"
        title="What each Twin should be allowed to use"
        description="Review the training notes, docs, and review rules each Twin can use when building drafts and plans."
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
              Approved source types
            </p>
            <p className="mt-1 text-sm text-lf-slate">
              Use only sources approved for the user's role. Private email,
              Drive files, and documents stay isolated by user.
            </p>
          </article>
        ))}
      </div>
    </section>
  );
}
