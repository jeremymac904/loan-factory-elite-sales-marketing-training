import Link from "next/link";
import BrandImage from "@/components/BrandImage";
import PageHero from "@/components/PageHero";
import SectionHeading from "@/components/SectionHeading";
import { brandAssets } from "@/data/brandAssets";

export const metadata = { title: "Coaching Member Area" };

const dashboardCards = [
  {
    title: "This week's coaching focus",
    body: "Prepare for Power Hour, follow up with referral partners, and protect a daily call block.",
    action: "Open Coaching Rhythm",
    href: "#coaching-rhythm",
  },
  {
    title: "Advisor Scorecard",
    body: "See your activity, partner touches, training progress, and weekly accountability notes.",
    action: "View Scorecards",
    href: "#trackers-scorecards",
  },
  {
    title: "Member Resource Library",
    body: "Find recordings, scripts, handouts, tracker links, and useful training channels.",
    action: "Open Resources",
    href: "#member-resources",
  },
];

const memberAreas = [
  {
    title: "Coaching Rhythm",
    body: "Power Hour, group coaching, coaching emails, and Alliance coaching cadence.",
    href: "#coaching-rhythm",
  },
  {
    title: "Resource Library",
    body: "Scripts, handouts, recordings, documents, and coaching references.",
    href: "#member-resources",
  },
  {
    title: "Trackers and Scorecards",
    body: "Track calls, follow-up, partner touches, deal movement, and weekly consistency.",
    href: "#trackers-scorecards",
  },
  {
    title: "Past Recordings",
    body: "Review coaching calls, member trainings, Power Hour examples, and topic replays.",
    href: "/recordings/",
  },
  {
    title: "Scripts and Documents",
    body: "Open call scripts, partner scripts, follow-up templates, PDFs, and coaching handouts.",
    href: "/scripts/",
  },
  {
    title: "Advisor Scorecard",
    body: "Track weekly action, practice, follow-up, and coaching notes.",
    href: "#advisor-scorecard",
  },
  {
    title: "Greatness Tracker",
    body: "Track the daily habits that create better conversations and stronger consistency.",
    href: "#greatness-tracker",
  },
  {
    title: "Deal Flow Tracker",
    body: "Stay clear on active opportunities, follow-up dates, next actions, and pipeline health.",
    href: "#deal-flow-tracker",
  },
  {
    title: "Referral Partner Tracker",
    body: "Track Realtor and referral partner touches, appointments, notes, and next steps.",
    href: "#referral-partner-tracker",
  },
  {
    title: "Leaderboard",
    body: "See LO Mastery and Loan Factory Alliance accountability categories and recognition areas.",
    href: "/apex-leaderboards/",
  },
  {
    title: "Certifications",
    body: "Track Certified Mortgage Advisor designation progress and specialty-track requirements.",
    href: "/apex-certifications/",
  },
  {
    title: "Calendar",
    body: "Review coaching calls, Breakfast Club, Power Hour, training windows, and member events.",
    href: "/apex-calendar/",
  },
];

const coachingRhythm = [
  "Biweekly LO Mastery group coaching calls",
  "Daily Power Hour Smile and Dial lunch-themed call",
  "Daily motivational coaching email",
  "Weekly Loan Factory Alliance coaching calls",
  "Daily Breakfast Club call for Alliance members",
  "Priority accountability rhythm for Alliance members",
];

const resourceGroups = [
  {
    title: "Recordings",
    items: ["Past coaching calls", "Power Hour examples", "Training replays"],
  },
  {
    title: "Scripts",
    items: ["First-call scripts", "Referral partner scripts", "Follow-up scripts"],
  },
  {
    title: "Documents",
    items: ["PDF handouts", "Coaching worksheets", "Favorite YouTube channel library"],
  },
];

const trackers = [
  {
    id: "advisor-scorecard",
    title: "Advisor Scorecard",
    body: "Weekly scorecard for activity, practice, consistency, training progress, and accountability.",
  },
  {
    id: "greatness-tracker",
    title: "Greatness Tracker",
    body: "Daily habit tracker for calls, follow-up, partner touches, learning, and execution rhythm.",
  },
  {
    id: "deal-flow-tracker",
    title: "Deal Flow Tracker",
    body: "Pipeline clarity for opportunities, next steps, dates, borrower conversations, and deal movement.",
  },
  {
    id: "referral-partner-tracker",
    title: "Referral Partner Tracker",
    body: "Relationship tracker for Realtor touches, partner meetings, referral sources, and follow-up cadence.",
  },
];

export default function ApexMemberAreaPage() {
  return (
    <>
      <PageHero
        title="Coaching Member Area"
        body={
          <p>
            Your paid coaching home for LO Mastery and Loan Factory Alliance
            resources, recordings, scripts, trackers, scorecards,
            certifications, and leaderboards.
          </p>
        }
        backgroundImage="/media/dark-hero-background.png"
      >
        <div className="mb-6 flex flex-wrap items-center gap-3">
          <div className="inline-flex rounded-xl bg-white/95 p-2 shadow-card">
            <BrandImage
              asset={brandAssets["lo-mastery"]}
              heightClass="h-14 md:h-16"
            />
          </div>
          <div className="inline-flex rounded-xl bg-white/95 p-2 shadow-card">
            <BrandImage
              asset={brandAssets["loan-factory-alliance"]}
              heightClass="h-14 md:h-16"
            />
          </div>
        </div>
        <div className="flex flex-wrap gap-3">
          <Link href="/login/" className="btn-primary">
            Sign In
          </Link>
          <Link
            href="/coaching/"
            className="btn-secondary border-white/30 bg-white/10 text-white hover:border-white hover:bg-white/20"
          >
            View Coaching Tiers
          </Link>
        </div>
      </PageHero>

      <section className="container-page py-14">
        <SectionHeading
          title="Start here"
          description="Use these cards when you need the next coaching action, the right resource, or your weekly accountability view."
        />
        <div className="mt-8 grid gap-5 lg:grid-cols-3">
          {dashboardCards.map((card) => (
            <a key={card.title} href={card.href} className="card block hover:shadow-lift">
              <h2 className="h-display text-xl">{card.title}</h2>
              <p className="prose-lf mt-2 text-sm text-lf-slate">{card.body}</p>
              <span className="mt-5 inline-flex text-sm font-semibold text-lf-orange">
                {card.action} &rarr;
              </span>
            </a>
          ))}
        </div>
      </section>

      <section className="bg-lf-mist">
        <div className="container-page py-14">
        <SectionHeading
          title="Coaching member areas"
          description="Each area supports paid coaching. Sales & Marketing 101-601 remains its own training path."
          />
          <div className="mt-8 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {memberAreas.map((area) => (
              <Link key={area.title} href={area.href} className="card hover:shadow-lift">
                <h2 className="h-display text-lg">{area.title}</h2>
                <p className="prose-lf mt-2 text-sm text-lf-slate">
                  {area.body}
                </p>
                <span className="mt-5 inline-flex text-sm font-semibold text-lf-orange">
                  Go there &rarr;
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section id="coaching-rhythm" className="container-page py-14">
        <div className="grid gap-8 lg:grid-cols-[0.85fr_1.15fr]">
          <div>
            <SectionHeading
              title="Coaching Rhythm"
              description="LO Mastery gives members a steady coaching rhythm with daily and weekly accountability built around action."
            />
            <div className="mt-6 flex flex-wrap gap-3">
              <Link href="/apex-calendar/" className="btn-primary">
                Open Calendar
              </Link>
              <Link href="/apex-mastermind/" className="btn-secondary">
                Open Mastermind
              </Link>
            </div>
          </div>
          <div className="grid gap-3">
            {coachingRhythm.map((item) => (
              <div
                key={item}
                className="rounded-xl border border-lf-line bg-white p-4 text-sm font-semibold text-lf-charcoal shadow-card"
              >
                {item}
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="member-resources" className="bg-lf-navy text-white">
        <div className="container-page py-14">
          <div className="max-w-2xl">
            <h2 className="font-display text-3xl font-semibold">
              Member Resources
            </h2>
            <p className="mt-3 text-base leading-7 text-white/75">
              Coaching members can work from recordings, scripts, documents,
              handouts, tracker links, and favorite training references.
            </p>
          </div>
          <div className="mt-8 grid gap-5 md:grid-cols-3">
            {resourceGroups.map((group) => (
              <article
                key={group.title}
                className="rounded-2xl border border-white/15 bg-white/[0.08] p-6"
              >
                <h3 className="font-display text-xl font-semibold">
                  {group.title}
                </h3>
                <ul className="mt-4 space-y-3 text-sm text-white/75">
                  {group.items.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section id="trackers-scorecards" className="container-page py-14">
        <SectionHeading
          title="Trackers and Scorecards"
          description="Use these tools to keep activity, partner development, deal movement, and coaching rhythm easy to see."
        />
        <div className="mt-8 grid gap-5 md:grid-cols-2">
          {trackers.map((tracker) => (
            <article key={tracker.id} id={tracker.id} className="card">
              <h3 className="h-display text-xl">{tracker.title}</h3>
              <p className="prose-lf mt-2 text-sm text-lf-slate">
                {tracker.body}
              </p>
              <div className="mt-5 grid gap-2 text-sm text-lf-slate">
                <div className="rounded-lg bg-lf-mist px-3 py-2">
                  This week&apos;s focus
                </div>
                <div className="rounded-lg bg-lf-mist px-3 py-2">
                  Current score
                </div>
                <div className="rounded-lg bg-lf-mist px-3 py-2">
                  Next action
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="container-page pb-20">
        <div className="rounded-2xl border border-lf-line bg-lf-orangeSoft p-6 shadow-card">
          <h2 className="h-display text-2xl">Membership path</h2>
          <p className="prose-lf mt-2 max-w-3xl text-sm text-lf-slate">
            LO Mastery is the Level I paid coaching program. LO Mastery
            includes biweekly group coaching, Power Hour, member resources,
            daily motivational email, Certified Mortgage Advisor designation,
            and accountability tools. Loan Factory Alliance adds weekly
            coaching, Daily Breakfast Club, advanced certifications, deeper
            coaching rhythm, Alliance leaderboard, and advanced mastermind
            access.
          </p>
          <div className="mt-6 flex flex-wrap gap-3">
            <Link href="/coaching/" className="btn-primary">
              Compare Tiers
            </Link>
            <Link href="/loan-factory-alliance/" className="btn-secondary">
              View Loan Factory Alliance
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
