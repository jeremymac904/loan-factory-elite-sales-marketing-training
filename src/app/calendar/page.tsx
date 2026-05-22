import Link from "next/link";
import PlatformModulePage from "@/components/PlatformModulePage";
import SectionHeading from "@/components/SectionHeading";
import { getPlatformModule } from "@/data/platform";

export const metadata = { title: "Calendar" };

const eventTypes = [
  "Power Hour",
  "Breakfast Club",
  "Alliance Mastermind",
  "101 to 601 training sessions",
  "Friday tracker review",
  "Certification review windows",
];

export default function CalendarPage() {
  const platformModule = getPlatformModule("calendar");

  return (
    <PlatformModulePage module={platformModule}>
      <section className="container-page py-14">
        <SectionHeading
          eyebrow="Training calendar"
          title="Plan the coaching and training rhythm."
          description="Use this view to understand the key training categories and where they fit in the week."
        />
        <div className="mt-8 grid gap-5 md:grid-cols-3">
          {eventTypes.map((eventType) => (
            <article key={eventType} className="card">
              <h3 className="h-display text-lg">{eventType}</h3>
              <p className="prose-lf mt-2 text-sm text-lf-slate">
                Training and coaching category for planning your weekly LO
                Development rhythm.
              </p>
            </article>
          ))}
        </div>
        <Link href="/apex-calendar/" className="btn-secondary mt-8">
          Open current coaching calendar
        </Link>
      </section>
    </PlatformModulePage>
  );
}
