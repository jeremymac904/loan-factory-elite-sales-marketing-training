import AITwinNav from "@/components/AITwinNav";
import SectionHeading from "@/components/SectionHeading";
import { aiTwinProfiles } from "@/data/aiTwins";

export const metadata = { title: "My AI Twin" };

export default function MyTwinPage() {
  return (
    <section className="container-page py-12">
      <AITwinNav />
      <SectionHeading
        eyebrow="My Twin"
        title="Choose a role to review."
        description="Later, sign-in will choose the right Twin automatically. For beta review, this page shows each role example."
      />
      <div className="mt-8 grid gap-5 lg:grid-cols-2">
        {aiTwinProfiles.map((twin) => (
          <article key={twin.id} className="card">
            <h2 className="h-display text-2xl">{twin.displayName}</h2>
            <p className="prose-lf mt-2 text-sm text-lf-slate">
              {twin.summary}
            </p>
            <div className="mt-5">
              <p className="text-xs font-semibold uppercase tracking-wide text-lf-orange">
                Example things to ask
              </p>
              <div className="mt-3 grid gap-2">
                {twin.starterPrompts.map((prompt) => (
                  <div key={prompt} className="rounded-lg border border-lf-line bg-lf-mist px-3 py-2 text-sm text-lf-charcoal">
                    {prompt}
                  </div>
                ))}
              </div>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
