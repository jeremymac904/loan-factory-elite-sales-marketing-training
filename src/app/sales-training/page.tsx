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
          title="Six lessons to help you create more business"
          description="Use 101 through 601 for sales training, scripts, prompts, roleplays, trackers, and resources. This training path is separate from paid coaching."
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
        <div className="mt-8 rounded-2xl border border-lf-line bg-lf-mist p-6 md:flex md:items-center md:justify-between md:gap-6">
          <div>
            <h2 className="h-display text-2xl">Team Leader planning</h2>
            <p className="prose-lf mt-2 max-w-3xl text-sm text-lf-slate">
              Use 1+1+1=5 after the 101-601 lessons to assign buyer, Realtor,
              recruiting, and community campaign lanes for the team.
            </p>
          </div>
          <Link href="/one-plus-one-five/" className="btn-primary mt-5 md:mt-0">
            Open 1+1+1=5
          </Link>
        </div>
      </section>
    </PlatformModulePage>
  );
}
