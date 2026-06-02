import Link from "next/link";
import PageHero from "@/components/PageHero";
import SectionHeading from "@/components/SectionHeading";

const resourceCards = [
  {
    title: "LO Mastery dashboard",
    description:
      "Open the $249 member area for weekly scorecards, resources, and coaching tools.",
    href: "/member-area/lo-mastery/",
  },
  {
    title: "Loan Factory Alliance dashboard",
    description:
      "Open the $449 member area for advanced coaching, mastermind, and accountability tools.",
    href: "/member-area/alliance/",
  },
  {
    title: "Weekly scorecards",
    description:
      "Use the coaching scorecard to track conversations, follow-up, and commitments.",
    href: "/member-area/scorecards/",
  },
  {
    title: "Member progress",
    description:
      "Review coaching attendance, accountability, resource completion, and next action.",
    href: "/coach-command-center/member-progress/",
  },
  {
    title: "Coaching calendar",
    description:
      "See the call schedule and draft coaching calendar events when you need a next step.",
    href: "/coach-command-center/calendar/",
  },
  {
    title: "Sign in",
    description:
      "Approved Loan Factory Google accounts can open the coaching platform immediately.",
    href: "/login/",
  },
];

export default function ResourcesPage() {
  return (
    <>
      <PageHero
        eyebrow="Loan Factory Paid Coaching"
        title="Coaching resources"
        body={
          <p>
            Everything here supports the paid coaching platform. If you are
            approved, open your member area. If not, sign in and ask Jeremy for
            access.
          </p>
        }
        backgroundImage="/media/dark-hero-background.png"
      />

      <section className="container-page py-12">
        <SectionHeading
          eyebrow="What to open"
          title="Coaching resources only."
          description="The live build no longer surfaces the broader LO Development training library, AI tools, FaceGram, or support routing."
        />
        <div className="mt-8 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {resourceCards.map((card) => (
            <Link key={card.href} href={card.href} className="card hover:shadow-lift">
              <h3 className="h-display text-lg">{card.title}</h3>
              <p className="prose-lf mt-2 text-sm text-lf-slate">
                {card.description}
              </p>
            </Link>
          ))}
        </div>
      </section>
    </>
  );
}
