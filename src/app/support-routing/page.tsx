import Link from "next/link";
import ClipLibraryRail from "@/components/ClipLibraryRail";
import RoleGate from "@/components/RoleGate";
import SectionHeading from "@/components/SectionHeading";
import SupportTeamDirectory from "@/components/SupportTeamDirectory";

export const dynamic = "force-dynamic";
export const metadata = { title: "Support Routing" };

const supportSections = [
  {
    title: "LO Development Support",
    description:
      "Training questions, onboarding help, resource questions, and LO Development program support.",
    href: "/support-routing/#lo-development",
    cta: "View LO Development contacts",
  },
  {
    title: "Corporate Coaches",
    description:
      "Coaching rhythm, accountability questions, LO Mastery support, and loan officer development.",
    href: "/support-routing/#corporate-coaches",
    cta: "View corporate coaches",
  },
  {
    title: "Marketing Review",
    description:
      "Content review, campaign questions, internal examples, and approved marketing feedback.",
    href: "/support-routing/#marketing",
    cta: "View marketing contacts",
  },
];

const requestLanes = [
  {
    id: "system-access",
    title: "System access issues",
    description:
      "Sign-in, approved-user, role, view as role, profile, Google OAuth, or permission questions.",
    route: "Start with Loan Officer Support. Escalate to Admin only after the user, role, and environment are confirmed.",
    training: "/login/",
  },
  {
    id: "first-file",
    title: "First-file support",
    description:
      "New LO onboarding, first active file questions, document expectations, and where to find the right training.",
    route: "Start with LO Support. Assign 101 Foundation and the relevant script before escalating.",
    training: "/101-foundation/",
  },
  {
    id: "common-workflow",
    title: "Common workflow blockers",
    description:
      "Pipeline, follow-up, partner outreach, content, or training workflow confusion.",
    route: "Route to Training Academy for curriculum questions or Corporate Coaches for accountability/coaching questions.",
    training: "/training-library/",
  },
  {
    id: "escalation-guidance",
    title: "Escalation guidance",
    description:
      "Lender issues, support blockers, review-sensitive questions, or anything borrower/partner-facing.",
    route: "Use the human escalation lane. Do not send outbound messages or trigger automations from this platform.",
    training: "/lender-escalation/",
  },
];

export default function SupportRoutingPage() {
  return (
    <RoleGate gate="support-routing">
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
          <h1 className="metal-title-dark max-w-3xl text-4xl md:text-5xl">
            Find the Right Support Person
          </h1>
          <p className="mt-5 max-w-3xl text-lg leading-8 text-white/85">
            Choose the right internal contact for training, coaching,
            marketing review, resources, or LO Development support.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link href="/support-routing/#lo-development-support-team" className="btn-primary">
              Find support contacts
            </Link>
            <Link
              href="/resources/"
              className="btn-secondary border-white/30 bg-white/10 text-white hover:border-white hover:bg-white/20"
            >
              Resources
            </Link>
          </div>
        </div>
      </section>

      <section className="container-page py-14">
        <SectionHeading
          title="Start with the right lane"
          description="Choose the support path that matches what you need. Email links open your mail app when you are ready to reach out."
        />
        <div className="mt-8 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
          {supportSections.map((section) => (
            <Link key={section.href} href={section.href} className="card hover:shadow-lift">
              <h2 className="h-display text-xl">{section.title}</h2>
              <p className="prose-lf mt-2 text-sm text-lf-slate">
                {section.description}
              </p>
              <span className="mt-5 inline-flex text-sm font-semibold text-lf-orange">
                {section.cta} &rarr;
              </span>
            </Link>
          ))}

        </div>
      </section>

      <section className="container-page pb-14">
        <SectionHeading
          eyebrow="Support Request Queue"
          title="Triage the issue before you escalate it."
          description="These lanes define the first response, the escalation path, and the training resource to send with the answer."
        />
        <div className="mt-8 grid gap-5 md:grid-cols-2">
          {requestLanes.map((lane) => (
            <article
              key={lane.id}
              id={lane.id}
              className="scroll-mt-28 rounded-2xl border border-lf-line bg-white p-5 shadow-soft"
            >
              <span className="text-xs font-semibold uppercase tracking-wide text-lf-orange">
                Support lane
              </span>
              <h2 className="h-display mt-2 text-xl">{lane.title}</h2>
              <p className="prose-lf mt-2 text-sm text-lf-slate">
                {lane.description}
              </p>
              <div className="mt-4 rounded-xl border border-lf-line bg-lf-mist p-4">
                <p className="text-xs font-bold uppercase tracking-wide text-lf-slate">
                  Route
                </p>
                <p className="prose-lf mt-1 text-sm text-lf-charcoal">
                  {lane.route}
                </p>
              </div>
              <Link href={lane.training} className="mt-4 inline-flex text-sm font-semibold text-lf-orange">
                Recommended resource -&gt;
              </Link>
            </article>
          ))}
        </div>
      </section>

      <ClipLibraryRail
        title="Support routing clips"
        description="Short clips that answer common support-routing, system, Marketplace, and ticket questions."
        section="Loan Officer Support"
      />

      <SupportTeamDirectory />
    </RoleGate>
  );
}
