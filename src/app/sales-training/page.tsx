import Link from "next/link";
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
          title="The six-part Sales & Marketing training series"
          description="This is the 101 through 601 training series for Loan Factory LOs. It is training content, scripts, prompts, roleplays, trackers, and resources. It is separate from Apex Advisor paid coaching."
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
            </Link>
          ))}
        </div>
      </section>
    </PlatformModulePage>
  );
}
