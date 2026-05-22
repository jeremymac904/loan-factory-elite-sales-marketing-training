import Link from "next/link";
import PageHero from "@/components/PageHero";
import SectionHeading from "@/components/SectionHeading";
import ComplianceCallout from "@/components/ComplianceCallout";
import { apexTiers } from "@/data/apex";

export const metadata = { title: "Apex Advisor Pro" };

const proBenefits = [
  {
    title: "Monthly live mastermind calls",
    body: "One live call every month with Jeremy and the Pro cohort. Live coaching, deal review, pipeline review, and a Q and A.",
  },
  {
    title: "Direct coaching access",
    body: "Bring a specific deal, a partner challenge, or a content problem and get a working answer. Not a generic webinar.",
  },
  {
    title: "Advanced TERA workflows",
    body: "Advanced workflows inside TERA — Loan Factory's loan origination software, point of sale, and CRM platform — for borrower journeys, partner workflows, and pipeline review.",
  },
  {
    title: "Priority content requests",
    body: "Pro members can request specific scripts, prompts, or roleplays. Pro requests go to the front of the line.",
  },
  {
    title: "Apex Summit access",
    body: "Access to the live annual Apex Summit. Cohort networking, advanced sessions, and the year's themes.",
  },
  {
    title: "Apex Mastermind community",
    body: "The Pro tier community where members share wins, share work, and hold each other to a higher standard.",
  },
];

export default function ApexAdvisorProPage() {
  const pro = apexTiers.find((t) => t.id === "pro")!;
  return (
    <>
      <PageHero
        eyebrow="Tier 2 . Apex Advisor Pro"
        title="Live coaching, mastermind, and the Apex Summit."
        body={
          <p>
            Apex Advisor Pro is for loan officers who want live coaching and a
            tighter community on top of the full Apex Advisor Track. Everything
            in Apex Advisor, plus the live elements that turn a curriculum into
            a habit.
          </p>
        }
        backgroundImage="/media/dark-hero-background.png"
      >
        <div className="flex flex-wrap items-center gap-3">
          <Link href={pro.ctaHref} className="btn-primary">
            {pro.ctaLabel}
          </Link>
          <Link
            href="/apex-advisor/"
            className="btn-secondary border-white/30 bg-white/10 text-white hover:bg-white/20 hover:border-white"
          >
            Compare with Apex Advisor
          </Link>
          <span className="rounded-full bg-white/10 px-3 py-1 text-sm font-semibold text-white">
            {pro.price} {pro.priceSuffix}
          </span>
        </div>
      </PageHero>

      <section className="container-page py-14">
        <SectionHeading
          eyebrow="What you get"
          title="Everything in Apex Advisor, plus six Pro upgrades."
          description="Pro keeps the full Apex Advisor Track and resource libraries, then adds the live elements: monthly coaching, mastermind community, advanced TERA workflows, priority requests, and Apex Summit access."
        />
        <div className="mt-8 grid gap-5 md:grid-cols-2">
          {proBenefits.map((b) => (
            <div key={b.title} className="card">
              <h3 className="h-display text-lg">{b.title}</h3>
              <p className="prose-lf mt-2 text-sm text-lf-slate">{b.body}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="bg-lf-mist">
        <div className="container-page py-14">
          <SectionHeading
            eyebrow="What is included"
            title="The full Pro feature list."
          />
          <ul className="prose-lf mt-6 grid list-disc gap-2 pl-5 text-sm md:grid-cols-2">
            {pro.includes.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link href={pro.ctaHref} className="btn-primary">
              {pro.ctaLabel}
            </Link>
            <Link href="/apex-mastermind/" className="btn-secondary">
              See the Apex Mastermind
            </Link>
          </div>
        </div>
      </section>

      <section className="container-page py-14">
        <SectionHeading
          eyebrow="Best for"
          title="Producers and team leaders who want accountability."
          description="Pro is for loan officers who already know what to do most days, but want live coaching, advanced TERA workflows, and a community of peers who will push them."
        />
      </section>

      <section className="container-page pb-20">
        <ComplianceCallout title="Compliance review" variant="default">
          <p>
            Pro tier benefits and live sessions are training. They are not a
            guarantee of production, income, or business results. Anything
            created for borrowers, Realtors, or the public from Pro sessions
            still requires Loan Factory compliance review before use.
          </p>
        </ComplianceCallout>
      </section>
    </>
  );
}
