import Link from "next/link";
import PageHero from "@/components/PageHero";
import SectionHeading from "@/components/SectionHeading";
import ComplianceCallout from "@/components/ComplianceCallout";

export const metadata = { title: "Apex Calendar" };

type SampleEvent = {
  date: string;
  title: string;
  type: "Live Q&A" | "Mastermind" | "Summit" | "Workshop";
  tier: "All Members" | "Pro Only";
  description: string;
};

const sampleEvents: SampleEvent[] = [
  {
    date: "Monthly . 1st Tuesday . 11 AM PT",
    title: "Apex Advisor Live Q and A",
    type: "Live Q&A",
    tier: "All Members",
    description:
      "Monthly open Q and A for all Apex Advisor members. Bring a deal, a partner question, or a content problem.",
  },
  {
    date: "Monthly . 3rd Thursday . 11 AM PT",
    title: "Apex Mastermind Call",
    type: "Mastermind",
    tier: "Pro Only",
    description:
      "Live Pro mastermind. Coaching, deal review, pipeline review, and accountability.",
  },
  {
    date: "Annual . Date TBD",
    title: "Apex Summit",
    type: "Summit",
    tier: "Pro Only",
    description:
      "Live annual Apex Summit. Cohort networking, advanced sessions, and the year's themes.",
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
        title="Apex Calendar."
        body={
          <p>
            Monthly live Q and A for all members. Monthly mastermind calls for
            Pro. An annual Apex Summit. The calendar below previews the cadence
            for the platform.
          </p>
        }
        backgroundImage="/media/dark-hero-background.png"
      />

      <section className="container-page py-10">
        <ComplianceCallout title="Calendar placeholder" variant="soft">
          <p>
            Live calendar integration is a future build. The schedule below is
            the planned cadence and is subject to change. Specific dates and
            times will be confirmed before each event.
          </p>
        </ComplianceCallout>
      </section>

      <section className="container-page pb-10">
        <SectionHeading
          eyebrow="Cadence"
          title="What to expect each month."
        />
        <div className="mt-8 space-y-5">
          {sampleEvents.map((e) => (
            <article key={e.title} className="card flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
              <div className="md:max-w-2xl">
                <div className="flex flex-wrap items-center gap-2">
                  <span className="pill">{e.type}</span>
                  <span
                    className={`pill ${
                      e.tier === "Pro Only"
                        ? "border-lf-orange/40 text-lf-orangeDark"
                        : ""
                    }`}
                  >
                    {e.tier}
                  </span>
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
            description="Sign in to your Apex Member Area for the next event link, the replay archive, and your RSVP."
          />
          <div className="mt-6 flex flex-wrap gap-3">
            <Link href="/apex-member-area/" className="btn-primary">
              Open the Member Area
            </Link>
            <Link href="/apex-advisor-pro/" className="btn-secondary">
              See Pro tier benefits
            </Link>
          </div>
        </div>
      </section>

      <section className="container-page pb-20 pt-10">
        <ComplianceCallout title="Compliance review" variant="default">
          <p>
            Live sessions are training and coaching. They are not a guarantee
            of production, income, or business results. Any borrower facing,
            Realtor facing, or public material referenced in a live call still
            requires Loan Factory compliance review before use.
          </p>
        </ComplianceCallout>
      </section>
    </>
  );
}
