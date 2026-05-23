import Link from "next/link";
import GrowthLoops from "@/components/GrowthLoops";
import SectionHeading from "@/components/SectionHeading";

export const metadata = { title: "Resources" };

const resources = [
  {
    title: "Recommended Channels",
    description: "Find approved channels, learning references, and useful internal resource paths.",
    href: "/recommended-channels/",
  },
  {
    title: "Compliance Notes",
    description: "Review language reminders and escalation points before external-facing use.",
    href: "/compliance/",
  },
  {
    title: "Recordings",
    description: "Open class recordings, replays, and training video references.",
    href: "/recordings/",
  },
  {
    title: "LO Development Support Team",
    description: "Find LO Development, corporate coach, and marketing review contacts.",
    href: "/support-routing/#lo-development-support-team",
  },
  {
    title: "Anonymous Complaints & Suggestions",
    description:
      "Use the global Send Feedback button for suggestions, broken links, complaints, and beta notes.",
    href: "#feedback",
  },
  {
    title: "Lender Escalation",
    description:
      "Manual-review escalation form shell. No email sends or automation during beta.",
    href: "/lender-escalation/",
  },
];

export default function ResourcesPage() {
  return (
    <>
      <section className="relative isolate overflow-hidden bg-lf-navy text-white">
        <div
          aria-hidden
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: "url(/media/dark-hero-background.png)" }}
        />
        <div aria-hidden className="absolute inset-0 bg-black/72" />
        <div
          aria-hidden
          className="absolute inset-0 bg-[radial-gradient(circle_at_18%_22%,rgba(242,106,31,0.28),transparent_30%),linear-gradient(90deg,rgba(0,0,0,0.92),rgba(17,17,17,0.64),rgba(0,0,0,0.9))]"
        />
        <div className="relative container-page py-16 md:py-20">
          <h1 className="max-w-3xl font-display text-4xl font-semibold tracking-tight md:text-5xl">
            Resources
          </h1>
          <p className="mt-5 max-w-3xl text-lg leading-8 text-white/85">
            A simple hub for recommended channels, compliance notes,
            recordings, support contacts, and LO Development feedback.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link href="/support-routing/#lo-development-support-team" className="btn-primary">
              Find support team
            </Link>
            <Link
              href="/sales-training/"
              className="btn-secondary border-white/30 bg-white/10 text-white hover:border-white hover:bg-white/20"
            >
              Sales &amp; Marketing
            </Link>
          </div>
        </div>
      </section>

      <section className="container-page py-14">
        <SectionHeading
          title="What do you need?"
          description="Pick the resource area that matches the question in front of you."
        />
        <div className="mt-8 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {resources.map((resource) => (
            <Link key={resource.href} href={resource.href} className="card hover:shadow-lift">
              <h3 className="h-display text-lg">{resource.title}</h3>
              <p className="prose-lf mt-2 text-sm text-lf-slate">
                {resource.description}
              </p>
            </Link>
          ))}
        </div>
      </section>
      <section id="feedback" className="container-page pb-14">
        <div className="rounded-2xl border border-lf-orange/30 bg-lf-orangeSoft p-6 shadow-card">
          <h2 className="h-display text-2xl">Send Feedback</h2>
          <p className="prose-lf mt-2 max-w-3xl text-sm text-lf-slate">
            Use the floating Send Feedback button on any page. Feedback never
            sends email from the app. Signed-in users can save to Supabase;
            preview users see a local/demo confirmation.
          </p>
        </div>
      </section>
      <GrowthLoops />
    </>
  );
}
