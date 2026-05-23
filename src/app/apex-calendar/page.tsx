import Link from "next/link";
import PageHero from "@/components/PageHero";
import SectionHeading from "@/components/SectionHeading";

export const metadata = { title: "Coaching Calendar" };

type SampleEvent = {
  date: string;
  title: string;
  type: "Group Coaching" | "Mastermind" | "Breakfast Club" | "Workshop";
  tier: "All Members" | "Alliance Only";
  description: string;
};

const sampleEvents: SampleEvent[] = [
  {
    date: "Biweekly . Time TBD",
    title: "LO Mastery Group Coaching",
    type: "Group Coaching",
    tier: "All Members",
    description:
      "Biweekly group coaching for LO Mastery members. Bring a deal, partner question, content question, or accountability item.",
  },
  {
    date: "Weekly . Time TBD",
    title: "Loan Factory Alliance Coaching Call",
    type: "Mastermind",
    tier: "Alliance Only",
    description:
      "Weekly Alliance coaching call for deeper accountability, deal flow review, and production rhythm.",
  },
  {
    date: "Daily . Time TBD",
    title: "Breakfast Club",
    type: "Breakfast Club",
    tier: "Alliance Only",
    description:
      "Daily Alliance rhythm call for focus, mindset, accountability, and execution planning.",
  },
  {
    date: "Quarterly . Date TBD",
    title: "Personality Workshop Live Debrief",
    type: "Workshop",
    tier: "All Members",
    description:
      "Live debrief of the Personality Workshop. Apply communication and selling style insights to your real pipeline.",
  },
];

export default function ApexCalendarPage() {
  return (
    <>
      <PageHero
        eyebrow="Live events and sessions"
        title="Coaching Calendar."
        body={
          <p>
            Biweekly group coaching for LO Mastery members. Weekly coaching
            and daily Breakfast Club for Loan Factory Alliance members. The
            calendar below shows the coaching cadence.
          </p>
        }
        backgroundImage="/media/dark-hero-background.png"
      />

      <section className="container-page pb-10">
        <SectionHeading
          eyebrow="Cadence"
          title="What to expect each month."
          description="Specific dates and times are confirmed through the coaching communication channel."
        />
        <div className="mt-8 space-y-5">
          {sampleEvents.map((e) => (
            <article key={e.title} className="card flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
              <div className="md:max-w-2xl">
                <div className="flex flex-wrap items-center gap-3 text-xs font-semibold uppercase tracking-wide text-lf-orange">
                  <span>{e.type}</span>
                  <span>{e.tier}</span>
                </div>
                <h3 className="h-display mt-2 text-lg">{e.title}</h3>
                <p className="prose-lf mt-1 text-sm text-lf-slate">
                  {e.description}
                </p>
              </div>
              <div className="text-sm font-semibold text-lf-navy md:text-right">
                {e.date}
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="bg-lf-mist">
        <div className="container-page py-12">
          <SectionHeading
            eyebrow="How to attend"
            title="Live events run inside the member area."
            description="Sign in to your coaching member area for the next event link, the replay archive, and your RSVP."
          />
          <div className="mt-6 flex flex-wrap gap-3">
            <Link href="/apex-member-area/" className="btn-primary">
              Open the Member Area
            </Link>
            <Link href="/apex-advisor-pro/" className="btn-secondary">
              See Alliance benefits
            </Link>
          </div>
        </div>
      </section>

      <section className="container-page pb-20 pt-10">
        <p className="max-w-3xl text-sm leading-6 text-lf-slate">
          Live sessions are training and coaching. Borrower-facing,
          Realtor-facing, or marketing material referenced in a live call still
          needs the proper Loan Factory review before use.
        </p>
      </section>
    </>
  );
}
