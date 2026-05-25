import Link from "next/link";
import BrandImage from "@/components/BrandImage";
import PageHero from "@/components/PageHero";
import SectionHeading from "@/components/SectionHeading";
import ComplianceCallout from "@/components/ComplianceCallout";
import { brandAssets } from "@/data/brandAssets";
import { apexTiers } from "@/data/apex";

export const metadata = { title: "Loan Factory Alliance" };

const proBenefits = [
  {
    title: "Weekly coaching calls",
    body: "A tighter weekly coaching rhythm for Alliance members who want more frequent accountability and review.",
  },
  {
    title: "Daily Breakfast Club call",
    body: "A daily Alliance call for rhythm, accountability, mindset, and execution planning.",
  },
  {
    title: "More specific daily coaching email",
    body: "A stronger daily coaching email with more specific prompts, accountability, and tactical direction.",
  },
  {
    title: "Advanced certifications",
    body: "Military Housing Specialist, Investor Specialist, and future specialty tracks as they are approved.",
  },
  {
    title: "Priority accountability",
    body: "More frequent check-ins and a deeper operating rhythm for members who want to be pushed.",
  },
  {
    title: "Advanced group coaching access",
    body: "Deeper peer review, Alliance leaderboard visibility, and advanced group coaching access.",
  },
];

export default function ApexAdvisorProPage() {
  const pro = apexTiers.find((t) => t.id === "pro")!;
  return (
    <>
      <PageHero
        eyebrow="Tier 2 . Loan Factory Alliance"
        title="A deeper coaching rhythm for serious producers."
        body={
          <p>
            Loan Factory Alliance includes everything in LO Mastery, then adds
            weekly coaching calls, the daily Breakfast Club call, more specific
            coaching email, advanced certifications, priority accountability,
            and deeper group coaching access.
          </p>
        }
        backgroundImage="/media/dark-hero-background.png"
      >
        <div className="mb-6 inline-flex rounded-xl bg-white/95 p-2 shadow-card">
          <BrandImage
            asset={brandAssets["loan-factory-alliance"]}
            heightClass="h-16 md:h-20"
          />
        </div>
        <div className="flex flex-wrap items-center gap-3">
          <Link href={pro.ctaHref} className="btn-primary">
            {pro.ctaLabel}
          </Link>
          <Link
            href="/apex-advisor/"
            className="btn-secondary border-white/30 bg-white/10 text-white hover:bg-white/20 hover:border-white"
          >
            Compare with LO Mastery
          </Link>
          <span className="rounded-full bg-white/10 px-3 py-1 text-sm font-semibold text-white">
            {pro.price} {pro.priceSuffix}
          </span>
        </div>
      </PageHero>

      <section className="container-page py-14">
        <SectionHeading
          eyebrow="What you get"
          title="Everything in LO Mastery, plus six Alliance upgrades."
          description="Alliance adds a stronger weekly coaching cadence, Breakfast Club, advanced certifications, priority accountability, the Alliance leaderboard, and deeper group coaching access."
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
            <Link href="/member-area/" className="btn-secondary">
              Open member area
            </Link>
          </div>
        </div>
      </section>

      <section className="container-page py-14">
        <SectionHeading
          eyebrow="Best for"
          title="Producers and team leaders who want accountability."
          description="Pro is for loan officers who want a tighter coaching rhythm, stronger accountability, advanced specialty-track development, and a community of peers who will push them."
        />
      </section>

      <section className="container-page pb-20">
        <ComplianceCallout title="Compliance review" variant="default">
          <p>
            Alliance benefits and live sessions are training. They are not a
            guarantee of production, income, or business results. Anything
            created for borrowers, Realtors, or the public from Alliance sessions
            still requires Loan Factory compliance review before use.
          </p>
        </ComplianceCallout>
      </section>
    </>
  );
}
