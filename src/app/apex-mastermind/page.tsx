import Link from "next/link";
import PageHero from "@/components/PageHero";
import SectionHeading from "@/components/SectionHeading";
import ComplianceCallout from "@/components/ComplianceCallout";

export const metadata = { title: "Alliance Mastermind" };

const callAgenda = [
  {
    block: "0 to 5",
    topic: "Welcome and one win from the last 30 days.",
  },
  {
    block: "5 to 25",
    topic: "Live coaching block. Two members bring a deal, partner, or content challenge.",
  },
  {
    block: "25 to 45",
    topic: "Theme of the month. Advanced TERA workflows, partner plays, or content systems.",
  },
  {
    block: "45 to 55",
    topic: "Open Q and A.",
  },
  {
    block: "55 to 60",
    topic: "One commitment for the next 30 days.",
  },
];

const communityValues = [
  {
    title: "Closed door",
    body: "Loan Factory Alliance members only. What gets shared in the mastermind stays in the mastermind.",
  },
  {
    title: "Bring the work",
    body: "Bring a deal, a partner, a script, a campaign. Not a hot take.",
  },
  {
    title: "Broker positive",
    body: "We respect the broker model and the lenders we work with. We do not trash competitors.",
  },
  {
    title: "Compliance aware",
    body: "If you share borrower or Realtor facing material, get Loan Factory compliance review before using it in the market.",
  },
];

export default function ApexMastermindPage() {
  return (
    <>
      <PageHero
        eyebrow="Alliance only"
        title="The Alliance Mastermind."
        body={
          <p>
            The Loan Factory Alliance community where serious loan officers
            share work, share wins, and hold each other to a higher standard.
            Monthly live mastermind calls. A closed community. One commitment a
            month.
          </p>
        }
        backgroundImage="/media/dark-hero-background.png"
      >
        <span className="inline-flex items-center gap-2 rounded-full bg-lf-orange px-3 py-1 text-xs font-bold uppercase tracking-wide text-white">
          Loan Factory Alliance . $449/mo
        </span>
      </PageHero>

      <section className="container-page py-12">
        <SectionHeading
          eyebrow="What it is"
          title="A mastermind, not a webinar."
          description="The Alliance Mastermind is a live coaching and peer community for Loan Factory Alliance members. Smaller cohort, live coaching, real deals, real partners, real content."
        />
      </section>

      <section className="bg-lf-mist">
        <div className="container-page py-12">
          <SectionHeading
            eyebrow="Call format"
            title="One 60 minute call every month."
          />
          <div className="mt-8 overflow-x-auto">
            <table className="w-full min-w-[480px] border-collapse text-left">
              <thead>
                <tr className="border-b border-lf-line text-xs uppercase tracking-wide text-lf-slate">
                  <th className="py-3 pr-4">Minutes</th>
                  <th className="py-3 pr-4">Block</th>
                </tr>
              </thead>
              <tbody>
                {callAgenda.map((a) => (
                  <tr key={a.block} className="border-b border-lf-line text-sm">
                    <td className="py-3 pr-4 font-semibold text-lf-navy">
                      {a.block}
                    </td>
                    <td className="py-3 pr-4">{a.topic}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      <section className="container-page py-12">
        <SectionHeading
          eyebrow="How we operate"
          title="Community values."
        />
        <div className="mt-8 grid gap-5 md:grid-cols-2">
          {communityValues.map((v) => (
            <div key={v.title} className="card">
              <h3 className="h-display text-lg">{v.title}</h3>
              <p className="prose-lf mt-2 text-sm text-lf-slate">{v.body}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="bg-lf-mist">
        <div className="container-page py-12">
          <SectionHeading
            eyebrow="Access"
            title="Mastermind access is included in Loan Factory Alliance."
          />
          <div className="mt-6 flex flex-wrap gap-3">
            <Link href="/apex-launch-call/" className="btn-primary">
              Join Loan Factory Alliance
            </Link>
            <Link href="/apex-advisor-pro/" className="btn-secondary">
              See the full Alliance tier
            </Link>
          </div>
        </div>
      </section>

      <section className="container-page pb-20 pt-10">
        <ComplianceCallout title="Compliance review" variant="default">
          <p>
            The Alliance Mastermind is a coaching and community program. It is not
            a guarantee of production, income, or business results. Anything
            created in or shared from the mastermind for borrowers, Realtors,
            or the public still requires Loan Factory compliance review before
            use.
          </p>
        </ComplianceCallout>
      </section>
    </>
  );
}
