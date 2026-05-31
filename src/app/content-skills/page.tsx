import Link from "next/link";
import PageHero from "@/components/PageHero";
import SectionHeading from "@/components/SectionHeading";

export const metadata = { title: "Content Skills" };

const contentSkills = [
  {
    title: "Loan Factory Brand Output Rules",
    path: "loan-factory-content-skills/LOAN_FACTORY_BRAND_OUTPUT_RULES.md",
    purpose:
      "Global language, compliance, naming, and output rules for every generated asset.",
  },
  {
    title: "Sales and Marketing 101-601 Skill",
    path: "loan-factory-content-skills/SALES_MARKETING_101_601_SKILL.md",
    purpose:
      "Curriculum-specific instructions for lesson assets, scripts, roleplays, prompts, and handouts.",
  },
  {
    title: "LO Mastery Skill",
    path: "loan-factory-content-skills/LO_MASTERY_SKILL.md",
    purpose:
      "Output rules for LO Mastery coaching resources, daily rhythm, and member-facing support.",
  },
  {
    title: "Loan Factory Alliance Skill",
    path: "loan-factory-content-skills/LOAN_FACTORY_ALLIANCE_SKILL.md",
    purpose:
      "Output rules for Alliance coaching, mastermind prep, advanced resources, and leadership content.",
  },
  {
    title: "AI Advantage Skill",
    path: "loan-factory-content-skills/AI_ADVANTAGE_SKILL.md",
    purpose:
      "Rules for AI training lessons, safe prompt practice, review habits, and assistant education.",
  },
  {
    title: "FaceGram Post Style Guide",
    path: "loan-factory-content-skills/FACEGRAM_POST_STYLE_GUIDE.md",
    purpose:
      "Internal community post structure, tone, review labels, and content promotion guidance.",
  },
  {
    title: "Email Template Style Guide",
    path: "loan-factory-content-skills/EMAIL_TEMPLATE_STYLE_GUIDE.md",
    purpose:
      "Internal and draft email output rules with compliance-safe language and review footer guidance.",
  },
  {
    title: "HeyGen Video Script Style Guide",
    path: "loan-factory-content-skills/HEYGEN_VIDEO_SCRIPT_STYLE_GUIDE.md",
    purpose:
      "Presenter script structure for internal training and draft borrower/Realtor education videos.",
  },
  {
    title: "PDF Style Guide",
    path: "loan-factory-content-skills/PDF_STYLE_GUIDE.md",
    purpose:
      "Rules for polished PDFs, handouts, checklists, worksheets, and downloadable resources.",
  },
  {
    title: "Slide Deck Style Guide",
    path: "loan-factory-content-skills/SLIDE_DECK_STYLE_GUIDE.md",
    purpose:
      "Deck structure, slide language, speaker notes, and visual hierarchy rules.",
  },
  {
    title: "Master Content Skill Index",
    path: "loan-factory-content-skills/MASTER_CONTENT_SKILL_INDEX.md",
    purpose:
      "Router for choosing the correct skill file before creating or rewriting content.",
  },
];

export default function ContentSkillsPage() {
  return (
    <>
      <PageHero
        eyebrow="LO Development"
        title="Content skills and output rules"
        body={
          <p>
            These files are the source rules for building emails, decks, PDFs,
            videos, FaceGram posts, AI lessons, and coaching resources. Use them
            before generating new content.
          </p>
        }
        backgroundImage="/media/dark-hero-background.png"
      >
        <div className="flex flex-wrap gap-3">
          <Link href="/training-academy/" className="btn-primary">
            Training Academy
          </Link>
          <Link
            href="/lo-development/"
            className="btn-secondary border-white/30 bg-white/10 text-white hover:border-white hover:bg-white/20"
          >
            LO Development
          </Link>
        </div>
      </PageHero>

      <section className="container-page py-12">
        <SectionHeading
          eyebrow="Skill inventory"
          title="Use the right rule file before creating content."
          description="This page is intentionally a registry. The actual source files stay in the repo so agents can read them directly during content production."
        />
        <div className="mt-8 grid gap-5 md:grid-cols-2">
          {contentSkills.map((skill) => (
            <article key={skill.path} className="card">
              <span className="text-xs font-semibold uppercase tracking-wide text-lf-orange">
                Content skill
              </span>
              <h2 className="h-display mt-2 text-xl">{skill.title}</h2>
              <p className="prose-lf mt-2 text-sm text-lf-slate">
                {skill.purpose}
              </p>
              <p className="mt-4 rounded-lg border border-lf-line bg-lf-mist px-3 py-2 font-mono text-xs text-lf-charcoal">
                {skill.path}
              </p>
            </article>
          ))}
        </div>
      </section>
    </>
  );
}
