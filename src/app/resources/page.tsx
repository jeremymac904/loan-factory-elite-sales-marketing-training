import Link from "next/link";
import ClipLibraryRail from "@/components/ClipLibraryRail";
import SectionHeading from "@/components/SectionHeading";
import RoleGate from "@/components/RoleGate";
import { marketingTrainingAssets } from "@/data/marketingTrainingAssets";

export const metadata = { title: "Resources" };

const resources = [
  {
    title: "Recommended Channels",
    description: "Find useful learning channels and trusted training references.",
    href: "/recommended-channels/",
  },
  {
    title: "Compliance Notes",
    description: "Check language reminders before using anything with borrowers, Realtors, or the public.",
    href: "/compliance/",
  },
  {
    title: "Recordings",
    description: "Watch class recordings, replays, and training video references.",
    href: "/recordings/",
  },
  {
    title: "LO Development Clip Library",
    description:
      "Find short support and training clips staged for approved Loan Factory users.",
    href: "/training-library/clips/",
  },
  {
    title: "LO Development Resources",
    description:
      "Open the staging hub for source videos, manual review, Drive fallback, and automation scaffolding.",
    href: "/lo-development/resources/",
  },
  {
    title: "Marketing Setup Assets",
    description:
      "Open Facebook Ads, Google Ads, visitor audiences, lead widgets, and QM Pricer guides.",
    href: "/training-library/marketing-assets/",
  },
  {
    title: "LO Development Support Team",
    description: "Find LO Development, corporate coach, and marketing review contacts.",
    href: "/support-routing/#lo-development-support-team",
  },
  {
    title: "Anonymous Complaints & Suggestions",
    description:
      "Use Send Feedback for suggestions, broken links, complaints, and beta notes.",
    href: "#feedback",
  },
  {
    title: "Lender Escalation",
    description:
      "Request help with a lender issue and keep the details organized for review.",
    href: "/lender-escalation/",
  },
  {
    title: "1+1+1=5 Team Growth",
    description:
      "Plan community, persona, campaign, Realtor, recruiting, and scorecard lanes for Team Leaders.",
    href: "/one-plus-one-five/",
  },
];

export default function ResourcesPage() {
  return (
    <RoleGate gate="resources">
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
            Resources
          </h1>
          <p className="mt-5 max-w-3xl text-lg leading-8 text-white/85">
            Find training references, support contacts, compliance reminders,
            recordings, feedback, and manual lender escalation.
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
          title="What do you need help with?"
          description="Pick the resource area that matches your question right now."
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

      <section className="bg-lf-mist">
        <div className="container-page py-14">
          <SectionHeading
            eyebrow="Marketing training cards"
            title="Source-backed setup resources."
            description="Use these internal resource cards to find the new marketing setup assets. They connect to free Sales and Marketing lessons and AI Advantage, not paid coaching progress."
          />
          <div className="mt-8 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
            {marketingTrainingAssets.map((asset) => (
              <article key={asset.id} className="card flex flex-col gap-4">
                <div>
                  <p className="text-xs font-semibold uppercase tracking-wide text-lf-orange">
                    {asset.track}
                  </p>
                  <h3 className="h-display mt-1 text-xl">{asset.title}</h3>
                </div>
                <p className="prose-lf text-sm text-lf-slate">
                  {asset.description}
                </p>
                <div className="flex flex-wrap gap-2">
                  {asset.tags.slice(0, 4).map((tag) => (
                    <span
                      key={tag}
                      className="rounded-full bg-lf-orangeSoft px-2.5 py-1 text-xs font-semibold text-lf-orangeDark"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
                <div className="grid gap-3 text-sm">
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-wide text-lf-slate">
                      Related lessons
                    </p>
                    <p className="mt-1 text-lf-charcoal">
                      {asset.relatedLessons.join(", ")}
                    </p>
                  </div>
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-wide text-lf-slate">
                      What to do next
                    </p>
                    <p className="mt-1 text-lf-charcoal">{asset.nextAction}</p>
                  </div>
                </div>
                <Link
                  href={`/training-library/#${asset.id}`}
                  className="mt-auto inline-flex text-sm font-semibold text-lf-orange"
                >
                  {asset.buttonText} &rarr;
                </Link>
              </article>
            ))}
          </div>
        </div>
      </section>

      <ClipLibraryRail
        title="Resource clips for common LO questions"
        description="Internal training cutdowns that help approved Loan Factory users find practical answers faster."
        section="Loan Officer Support"
      />
      <section id="feedback" className="container-page pb-14">
        <div className="rounded-2xl border border-lf-orange/30 bg-lf-orangeSoft p-6 shadow-card">
          <h2 className="h-display text-2xl">Send Feedback</h2>
          <p className="prose-lf mt-2 max-w-3xl text-sm text-lf-slate">
            Use the floating Send Feedback button on any page. Signed-in users
            can submit feedback. If saving is unavailable, the note stays in
            this browser so you can copy it to LO Development.
          </p>
        </div>
      </section>
    </RoleGate>
  );
}
