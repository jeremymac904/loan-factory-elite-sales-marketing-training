import Link from "next/link";
import ClipLibraryRail from "@/components/ClipLibraryRail";
import PlatformModulePage from "@/components/PlatformModulePage";
import SectionHeading from "@/components/SectionHeading";
import { modules } from "@/data/modules";
import { getPlatformModule } from "@/data/platform";

export const metadata = { title: "Sales & Marketing" };

export default function SalesTrainingPage() {
  const platformModule = getPlatformModule("elite-sales-marketing");

  return (
    <PlatformModulePage module={platformModule}>
      <section className="container-page py-14">
        <SectionHeading
          eyebrow="101 to 601"
          title="Six lessons to help you create more business"
          description="Use 101 through 601 for free internal sales training, scripts, prompts, roleplays, trackers, and resources. This training path is separate from paid coaching."
        />
        <div className="mt-8 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {modules.map((item) => (
            <Link key={item.slug} href={item.href} className="card hover:shadow-lift">
              <p className="text-xs font-semibold uppercase tracking-wide text-lf-orange">
                {item.level}
              </p>
              <h3 className="h-display mt-2 text-lg">{item.title}</h3>
              <p className="prose-lf mt-2 text-sm text-lf-slate">
                {item.corePromise}
              </p>
              <span className="mt-5 inline-flex text-sm font-semibold text-lf-orange">
                Start lesson &rarr;
              </span>
            </Link>
          ))}
        </div>
      </section>
      <ClipLibraryRail
        title="Sales and marketing training clips"
        description="Short internal clips covering leads, follow-up, Google reviews, marketing materials, and campaign tools."
        section="Sales & Marketing"
      />
    </PlatformModulePage>
  );
}
