import Link from "next/link";
import PageHero from "@/components/PageHero";
import SectionHeading from "@/components/SectionHeading";
import { coachingTiers } from "@/data/coaching";

const memberBenefits = [
  {
    title: "Coaching calls",
    description:
      "Regular coaching rhythm for LO Mastery and Loan Factory Alliance members.",
  },
  {
    title: "Accountability",
    description:
      "Weekly commitments, follow-up, and clear next actions that keep the week on track.",
  },
  {
    title: "Scorecards",
    description:
      "Measure conversations, follow-up, pipeline activity, and commitments you actually completed.",
  },
  {
    title: "Leaderboards",
    description:
      "Recognize consistent work, coaching follow-through, and visible progress.",
  },
  {
    title: "Resources",
    description:
      "Scripts, recordings, trackers, and member resources organized for the paid coaching experience.",
  },
  {
    title: "Coach support",
    description:
      "Direct help from your coach or leadership team when you need a next step.",
  },
];

export default function PaidCoachingLanding() {
  return (
    <>
      <PageHero
        eyebrow="Loan Factory Paid Coaching"
        title="LO Mastery and Loan Factory Alliance"
        body={
          <p>
            Paid coaching for Loan Factory loan officers who want a clear weekly
            plan, real accountability, scorecards, leaderboards, resources, and
            direct coach support.
          </p>
        }
        backgroundImage="/media/dark-hero-background.png"
      >
        <div className="flex flex-wrap gap-3">
          <Link href="/lo-mastery-coaching/" className="btn-primary">
            Explore LO Mastery
          </Link>
          <Link
            href="/loan-factory-alliance/"
            className="btn-secondary border-white/30 bg-white/10 text-white hover:border-white hover:bg-white/20"
          >
            Explore Alliance
          </Link>
          <Link
            href="/login/"
            className="btn-secondary border-white/30 bg-white/10 text-white hover:border-white hover:bg-white/20"
          >
            Sign in
          </Link>
          <Link
            href="#request-access"
            className="btn-secondary border-white/30 bg-white/10 text-white hover:border-white hover:bg-white/20"
          >
            Request access
          </Link>
        </div>
      </PageHero>

      <section className="container-page py-14">
        <SectionHeading
          eyebrow="What members get"
          title="A tighter weekly rhythm for paid coaching members."
          description="Everything here is coaching-specific. The public landing keeps LO Mastery and Loan Factory Alliance front and center."
        />
        <div className="mt-8 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {memberBenefits.map((benefit) => (
            <article key={benefit.title} className="card">
              <h3 className="h-display text-lg">{benefit.title}</h3>
              <p className="prose-lf mt-2 text-sm text-lf-slate">
                {benefit.description}
              </p>
            </article>
          ))}
        </div>
      </section>

      <section className="bg-lf-mist">
        <div className="container-page py-14">
          <SectionHeading
            eyebrow="Choose your program"
            title="Two paid coaching programs. One simpler platform."
            description="LO Mastery is the $249 coaching tier. Loan Factory Alliance is the $449 coaching tier."
          />
          <div className="mt-8 grid gap-6 md:grid-cols-2">
            {coachingTiers.map((tier) => (
              <article key={tier.id} className="card flex h-full flex-col gap-4">
                <div>
                  <span className="text-xs font-semibold uppercase tracking-wide text-lf-orange">
                    {tier.id === "alliance" ? "Level II" : "Level I"}
                  </span>
                  <h3 className="metal-title mt-2 text-2xl">{tier.shortName}</h3>
                  <p className="mt-1 text-sm text-lf-slate">{tier.tagline}</p>
                </div>
                <div>
                  <span className="font-display text-4xl font-semibold text-lf-navy">
                    {tier.price}
                  </span>
                  <span className="ml-2 text-sm text-lf-slate">
                    {tier.priceSuffix}
                  </span>
                </div>
                <p className="prose-lf text-sm">{tier.description}</p>
                <p className="text-sm text-lf-slate">
                  <strong className="text-lf-charcoal">Best for:</strong>{" "}
                  {tier.bestFor}
                </p>
                <div className="mt-auto flex flex-wrap gap-3 pt-2">
                  <Link href={tier.href} className="btn-primary">
                    Learn more
                  </Link>
                  <Link href="/member-area/" className="btn-secondary">
                    Open member area
                  </Link>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section id="request-access" className="container-page py-14">
        <SectionHeading
          eyebrow="Next step"
          title="Sign in if you are approved. Request access if you are not."
          description="Approved members go straight to their coaching area. Everyone else can review the programs, sign in with their Loan Factory Google account, and ask Jeremy to approve coaching access."
        />
        <div className="mt-8 flex flex-wrap gap-3">
          <Link href="/login/" className="btn-primary">
            Sign in
          </Link>
          <div className="rounded-lg border border-lf-line bg-white px-4 py-2 text-sm text-lf-slate">
            Request access through Jeremy after you sign in with your Loan
            Factory Google account.
          </div>
        </div>
      </section>
    </>
  );
}
