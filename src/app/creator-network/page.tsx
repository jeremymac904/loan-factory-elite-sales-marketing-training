import Link from "next/link";
import ComplianceCallout from "@/components/ComplianceCallout";
import PlatformModulePage from "@/components/PlatformModulePage";
import SectionHeading from "@/components/SectionHeading";
import { getPlatformModule } from "@/data/platform";

export const metadata = { title: "Creator Network" };

const concepts = [
  {
    title: "Internal feed",
    body: "A private team feed for scripts, prompts, video ideas, wins, referral partner plays, and training examples. Static demo only.",
  },
  {
    title: "LO profiles",
    body: "Internal profiles can eventually show role, market focus, contributions, and saved resources. No public profile surface exists.",
  },
  {
    title: "Post composer",
    body: "Draft title, body, media/link reference, categories, and save/publish-internally actions. Not wired to storage yet.",
  },
  {
    title: "Likes, comments, saves",
    body: "Engagement concepts for internal learning and resource discovery. No real interaction state is persisted in this version.",
  },
  {
    title: "Moderation queue",
    body: "Marketing reviewers and admins can later review flagged posts and queue approved internal resources.",
  },
  {
    title: "Compliance and risk flags",
    body: "Risk patterns route to human review. The site does not approve content for external use.",
  },
];

const categories = [
  "Referral Partner Strategy",
  "Borrower Conversion",
  "Social Media Ideas",
  "Open House Marketing",
  "Realtor Scripts",
  "Video Scripts",
  "Email Templates",
  "AI Prompts",
  "Success Stories",
  "Objection Handling",
  "Events",
  "Recruiting",
  "Apex Advisor",
  "Elite Sales & Marketing",
  "1+1+1=5",
  "AI Training",
];

export default function CreatorNetworkPage() {
  const platformModule = getPlatformModule("creator-network");

  return (
    <PlatformModulePage module={platformModule}>
      <section className="container-page py-14">
        <ComplianceCallout title="Employee-only internal network" variant="warning">
          <p>
            Creator Network is employee-only and internal-only. It is not a
            public feed, public profile system, external social publishing tool,
            borrower portal, Realtor portal, or partner portal.
          </p>
        </ComplianceCallout>
      </section>

      <section className="bg-lf-mist">
        <div className="container-page py-14">
          <SectionHeading
            eyebrow="Visible v1"
            title="First internal Creator Network shell"
            description="This page shows the product shape without pretending the backend exists."
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
          description="Categories are shown as static taxonomy, not a live filter."
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
              Status language
            </p>
            <h3 className="h-display mt-2 text-xl">
              Approved for External Adaptation
            </h3>
            <p className="prose-lf mt-3 text-sm text-lf-slate">
              This is a queue marker for further human review. It does not
              publish content externally, bypass marketing review, or bypass
              compliance review.
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
