import Link from "next/link";
import SectionHeading from "@/components/SectionHeading";
import SupportTeamDirectory from "@/components/SupportTeamDirectory";

export const metadata = { title: "Support Routing" };

const supportSections = [
  {
    title: "LO Development Support",
    description:
      "Training questions, onboarding help, resource questions, and LO Development program support.",
    href: "#lo-development",
    cta: "View LO Development contacts",
  },
  {
    title: "Corporate Coaches",
    description:
      "Coaching rhythm, accountability questions, LO Mastery support, and loan officer development.",
    href: "#corporate-coaches",
    cta: "View corporate coaches",
  },
  {
    title: "Marketing Review",
    description:
      "Content review, campaign questions, internal examples, and approved marketing feedback.",
    href: "#marketing",
    cta: "View marketing contacts",
  },
];

export default function SupportRoutingPage() {
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
            Find the Right Support Person
          </h1>
          <p className="mt-5 max-w-3xl text-lg leading-8 text-white/85">
            Choose the right internal contact for training, coaching,
            marketing review, resources, or LO Development support.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link href="#lo-development-support-team" className="btn-primary">
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

      <SupportTeamDirectory />
    </>
  );
}
