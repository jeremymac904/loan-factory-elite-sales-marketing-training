import Link from "next/link";
import PlatformModulePage from "@/components/PlatformModulePage";
import SectionHeading from "@/components/SectionHeading";
import { getPlatformModule } from "@/data/platform";

export const metadata = { title: "Resources" };

const resources = [
  { title: "Recommended Channels", href: "/recommended-channels/" },
  { title: "Personality Workshop", href: "/personality-workshop/" },
  { title: "Brand Preview", href: "/brand-preview/" },
  { title: "Coach Guide", href: "/coach-guide/" },
  { title: "Team Leader Guide", href: "/team-leader-guide/" },
  {
    title: "LO Development Support Team",
    href: "/support-routing/#lo-development-support-team",
  },
  { title: "Compliance Notes", href: "/compliance/" },
  { title: "Recordings", href: "/recordings/" },
];

export default function ResourcesPage() {
  const platformModule = getPlatformModule("resources");

  return (
    <PlatformModulePage module={platformModule}>
      <section className="container-page py-14">
        <SectionHeading
          eyebrow="Quick access"
          title="Resource pages that support the whole platform"
          description="These are grouped here so the top-level navigation feels like one operating system."
        />
        <div className="mt-8 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {resources.map((resource) => (
            <Link key={resource.href} href={resource.href} className="card hover:shadow-lift">
              <h3 className="h-display text-lg">{resource.title}</h3>
              <p className="prose-lf mt-2 text-sm text-lf-slate">
                Open the current resource page.
              </p>
            </Link>
          ))}
        </div>
      </section>
    </PlatformModulePage>
  );
}
