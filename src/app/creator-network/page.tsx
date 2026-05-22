import Link from "next/link";
import ComplianceCallout from "@/components/ComplianceCallout";
import PlatformModulePage from "@/components/PlatformModulePage";
import SectionHeading from "@/components/SectionHeading";
import { getPlatformModule } from "@/data/platform";

export const metadata = { title: "Creator Network" };

const concepts = [
  {
    title: "Daily internal posts",
    body: "LOs, AEs, approved vendors, coaches, and internal teams can share ideas, questions, examples, wins, videos, and feedback requests.",
  },
  {
    title: "Community groups",
    body: "State groups, language groups, new loan officer groups, topic groups, and approved AE/vendor participation help the right people find each other.",
  },
  {
    title: "Marketing examples",
    body: "Members can share scripts, posts, videos, event ideas, and partner plays for feedback and learning inside Loan Factory.",
  },
  {
    title: "Questions and answers",
    body: "Loan officers can ask practical questions, get peer feedback, and learn from coaches and internal teams.",
  },
  {
    title: "Wins and field notes",
    body: "Teams can post wins, lessons learned, and examples that help other Loan Factory employees improve.",
  },
  {
    title: "Review support",
    body: "Marketing and risk reviewers can help flag sensitive content before anything is adapted outside the internal community.",
  },
];

const categories = [
  "Daily Posts",
  "Questions",
  "Marketing Ideas",
  "Scripts",
  "Videos",
  "Wins",
  "Feedback Requests",
  "State Groups",
  "Language Groups",
  "New Loan Officer Groups",
  "Topic Groups",
  "AE and Vendor Ideas",
  "Referral Partner Strategy",
  "Borrower Conversion",
];

export default function CreatorNetworkPage() {
  const platformModule = getPlatformModule("creator-network");

  return (
    <PlatformModulePage module={platformModule}>
      <section className="container-page py-14">
        <ComplianceCallout title="Employee-only internal community" variant="warning">
          <p>
            Creator Network is an internal Loan Factory community feed where
            loan officers, AEs, approved vendors, coaches, and internal teams
            can share ideas, ask questions, post marketing examples, get
            feedback, and learn from each other. It is not public social media
            and it does not publish to external social channels.
          </p>
        </ComplianceCallout>
      </section>

      <section className="bg-lf-mist">
        <div className="container-page py-14">
          <SectionHeading
            eyebrow="Internal community"
            title="A Facebook or Instagram-style feed for Loan Factory employees"
            description="The goal is simple: help Loan Factory people learn from each other without turning this into public social media."
          />
          <div className="mt-8 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {concepts.map((item) => (
              <article key={item.title} className="card">
                <h3 className="h-display text-lg">{item.title}</h3>
                <p className="prose-lf mt-2 text-sm text-lf-slate">
                  {item.body}
                </p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="container-page py-14">
        <SectionHeading
          eyebrow="Categories and tags"
          title="How internal posts will be organized"
          description="Posts can be grouped by topic, state, language, role, and learning need."
        />
        <div className="mt-8 flex flex-wrap gap-2">
          {categories.map((category) => (
            <span
              key={category}
              className="rounded-full border border-lf-line bg-white px-3 py-1 text-sm font-semibold text-lf-charcoal"
            >
              {category}
            </span>
          ))}
        </div>
      </section>

      <section className="container-page py-10">
        <div className="grid gap-5 lg:grid-cols-2">
          <article className="card">
            <p className="text-xs font-semibold uppercase tracking-wide text-lf-orange">
              Review language
            </p>
            <h3 className="h-display mt-2 text-xl">
              Ready for human review
            </h3>
            <p className="prose-lf mt-3 text-sm text-lf-slate">
              Internal examples can be flagged for marketing or compliance
              review before anyone adapts them outside the community.
            </p>
          </article>
          <article className="card">
            <p className="text-xs font-semibold uppercase tracking-wide text-lf-orange">
              Related QA layer
            </p>
            <h3 className="h-display mt-2 text-xl">Audience Quality Panel</h3>
            <p className="prose-lf mt-3 text-sm text-lf-slate">
              Static panel review explains how content quality and risk flags
              can be improved before a human reviews the draft.
            </p>
            <Link href="/audience-quality-panel/" className="btn-secondary mt-4">
              Open Audience Quality Panel
            </Link>
          </article>
        </div>
      </section>
    </PlatformModulePage>
  );
}
