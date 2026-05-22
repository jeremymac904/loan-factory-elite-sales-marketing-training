import Link from "next/link";
import PlatformModulePage from "@/components/PlatformModulePage";
import SectionHeading from "@/components/SectionHeading";
import { getPlatformModule } from "@/data/platform";

export const metadata = { title: "Trackers" };

const trackers = [
  "Weekly activity tracker",
  "Pipeline tracker",
  "Production rhythm tracker",
  "Recruiting tracker",
  "Training completion tracker",
  "Coaching follow-up tracker",
];

export default function TrackersPage() {
  const platformModule = getPlatformModule("trackers");

  return (
    <PlatformModulePage module={platformModule}>
      <section className="container-page py-14">
        <SectionHeading
          eyebrow="Tracker hub"
          title="Track the work without pretending persistence exists."
          description="Only the weekly tracker route exists today. Other trackers require source fields and data decisions."
        />
        <div className="mt-8 grid gap-5 md:grid-cols-3">
          {trackers.map((tracker) => (
            <article key={tracker} className="card">
              <h3 className="h-display text-lg">{tracker}</h3>
              <p className="prose-lf mt-2 text-sm text-lf-slate">
                Static placeholder. Requires source content and data ownership
                before wiring.
              </p>
            </article>
          ))}
        </div>
        <Link href="/tracker/" className="btn-secondary mt-8">
          Open current weekly tracker
        </Link>
      </section>
    </PlatformModulePage>
  );
}
