import Link from "next/link";
import PageHero from "@/components/PageHero";
import SectionHeading from "@/components/SectionHeading";

export const metadata = { title: "Apex Member Area" };

const lockedBlocks = [
  {
    title: "Coaching rhythm",
    body: "See upcoming coaching calls, daily coaching prompts, and accountability actions.",
  },
  {
    title: "Resource library",
    body: "Access past training recordings, scripts, documents, PDF handouts, and favorite YouTube channels.",
  },
  {
    title: "Trackers and scorecards",
    body: "Use the Greatness Tracker, Deal Flow Tracker, Referral Partner Tracker, and Advisor Scorecard.",
  },
  {
    title: "Certification status",
    body: "Track Certified Mortgage Advisor progress and approved specialty-track requirements.",
  },
  {
    title: "Leaderboards",
    body: "View Apex Advisor and Apex Advisor Pro leaderboard progress.",
  },
  {
    title: "Pro mastermind access",
    body: "Pro members get advanced mastermind access and deeper accountability rhythm.",
  },
];

export default function ApexMemberAreaPage() {
  return (
    <>
      <PageHero
        eyebrow="Members only"
        title="Apex Member Area."
        body={
          <p>
            Sign in to your Apex Advisor portal. Track your progress, access
            coaching resources, review scorecards, and manage your membership
            rhythm.
          </p>
        }
        backgroundImage="/media/dark-hero-background.png"
      >
        <div className="flex flex-wrap gap-3">
          <Link
            href="/apex-launch-call/"
            className="btn-primary"
          >
            Join Now
          </Link>
        </div>
      </PageHero>

      <section className="container-page pb-10">
        <SectionHeading
          eyebrow="What members see"
          title="Apex Advisor member resources."
        />
        <div className="mt-8 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {lockedBlocks.map((b) => (
            <article
              key={b.title}
              className="relative card overflow-hidden"
            >
              <span className="absolute right-3 top-3 inline-flex items-center gap-1 rounded-full border border-lf-line bg-white px-2 py-0.5 text-[10px] font-bold uppercase tracking-wide text-lf-slate">
                Locked
              </span>
              <h3 className="h-display text-lg">{b.title}</h3>
              <p className="prose-lf mt-2 text-sm text-lf-slate">{b.body}</p>
              <div className="mt-4 h-1.5 w-full rounded-full bg-lf-mist">
                <div className="h-1.5 w-0 rounded-full bg-lf-orange" />
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="bg-lf-mist">
        <div className="container-page py-12">
          <SectionHeading
            eyebrow="Not a member yet"
            title="Choose your Apex tier."
          />
          <div className="mt-6 flex flex-wrap gap-3">
            <Link href="/apex-advisor/" className="btn-primary">
              Join Apex Advisor ($249/mo)
            </Link>
            <Link href="/apex-advisor-pro/" className="btn-secondary">
              Go Pro ($449/mo)
            </Link>
          </div>
        </div>
      </section>

      <section className="container-page pb-20 pt-10">
        <p className="max-w-3xl text-sm leading-6 text-lf-slate">
          Member resources support coaching, training, and accountability.
          Results vary by LO, market, and execution.
        </p>
      </section>
    </>
  );
}
