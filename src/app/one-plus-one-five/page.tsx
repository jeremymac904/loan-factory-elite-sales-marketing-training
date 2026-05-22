import PlatformModulePage from "@/components/PlatformModulePage";
import SectionHeading from "@/components/SectionHeading";
import { getPlatformModule } from "@/data/platform";

export const metadata = { title: "1+1+1=5" };

const areas = [
  "Partner strategy and co-branded campaign planning.",
  "Recruiting kit concepts that require Victoria review before external use.",
  "Team leader cadence and scorecard planning.",
  "Content kit planning tied back to approved training themes.",
];

export default function OnePlusOneFivePage() {
  const platformModule = getPlatformModule("one-plus-one-five");

  return (
    <PlatformModulePage module={platformModule}>
      <section className="container-page py-14">
        <SectionHeading
          eyebrow="Team Growth"
          title="Build teams that multiply without skipping review gates."
          description="Use this page to organize partner strategy, recruiting support, content planning, and team leader cadence."
        />
        <div className="mt-8 grid gap-5 md:grid-cols-2">
          {areas.map((area) => (
            <article key={area} className="card">
              <p className="prose-lf text-sm text-lf-slate">{area}</p>
            </article>
          ))}
        </div>
      </section>
    </PlatformModulePage>
  );
}
