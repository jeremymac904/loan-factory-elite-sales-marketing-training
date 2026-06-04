import Link from "next/link";
import { getCoachAccess } from "@/lib/coachAccess";
import CoachCommandNav from "@/components/coach/CoachCommandNav";
import PageHero from "@/components/PageHero";
import SectionHeading from "@/components/SectionHeading";

const coachResources = [
  {
    title: "Members",
    description: "Open the compact roster and action menu for each assigned member.",
    href: "/coach-command-center/team/",
  },
  {
    title: "Member progress",
    description:
      "See attendance, accountability, resource completion, and next action in one view.",
    href: "/coach-command-center/member-progress/",
  },
  {
    title: "Weekly scorecards",
    description:
      "Review submitted and missing scorecards, trends, and follow-up actions.",
    href: "/coach-command-center/scorecards/",
  },
  {
    title: "Coaching notes",
    description:
      "Capture wins, stuck points, note types, follow-up dates, and action items.",
    href: "/coach-command-center/coaching-notes/",
  },
  {
    title: "Coaching calendar",
    description:
      "Draft calls, Power Hours, group sessions, and next call reminders.",
    href: "/coach-command-center/calendar/",
  },
  {
    title: "Member area",
    description:
      "Jump into LO Mastery or Loan Factory Alliance to check the member experience.",
    href: "/member-area/",
  },
];

export const metadata = { title: "Coach Command Center Resources" };

export default async function CoachCommandCenterResourcesPage() {
  const access = await getCoachAccess();

  return (
    <>
      <PageHero
        eyebrow="Coach Command Center"
        title="Coaching resources"
        body={
          <p>
            Use this hub for the tools that support your coaching day: members,
            scorecards, notes, progress, and call planning.
          </p>
        }
        backgroundImage="/media/dark-hero-background.png"
      >
        {access.viewingAsLabel && (
          <p className="inline-block rounded-full bg-white/20 px-3 py-1 text-xs font-semibold text-white">
            Viewing as: {access.viewingAsLabel}
          </p>
        )}
      </PageHero>

      <CoachCommandNav current="/coach-command-center/resources/" showAdmin={access.seesAll} />

      <section className="container-page py-12">
        <SectionHeading
          eyebrow="Open next"
          title="Coach-first tools."
          description="The live coaching platform keeps the resource set simple and focused."
        />
        <div className="mt-8 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {coachResources.map((resource) => (
            <Link key={resource.href} href={resource.href} className="card hover:shadow-lift">
              <h3 className="h-display text-lg">{resource.title}</h3>
              <p className="prose-lf mt-2 text-sm text-lf-slate">
                {resource.description}
              </p>
            </Link>
          ))}
        </div>
      </section>
    </>
  );
}
