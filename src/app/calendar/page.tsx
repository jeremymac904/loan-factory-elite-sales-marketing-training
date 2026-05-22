import Link from "next/link";
import PlatformModulePage from "@/components/PlatformModulePage";
import SectionHeading from "@/components/SectionHeading";
import { getPlatformModule } from "@/data/platform";

export const metadata = { title: "Calendar" };

const eventTypes = [
  "Power Hour",
  "Breakfast Club",
  "Apex Mastermind",
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
          eyebrow="Static schedule model"
          title="Calendar is visible, not integrated."
          description="No Google Calendar, email reminders, or scheduling automation is wired."
        />
        <div className="mt-8 grid gap-5 md:grid-cols-3">
          {eventTypes.map((eventType) => (
            <article key={eventType} className="card">
              <h3 className="h-display text-lg">{eventType}</h3>
              <p className="prose-lf mt-2 text-sm text-lf-slate">
                Planned calendar category. Requires source schedule and sandbox
                wiring before any integration.
              </p>
            </article>
          ))}
        </div>
        <Link href="/apex-calendar/" className="btn-secondary mt-8">
          Open current Apex calendar
        </Link>
      </section>
    </PlatformModulePage>
  );
}
