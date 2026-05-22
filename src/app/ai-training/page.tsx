import Link from "next/link";
import PageHero from "@/components/PageHero";
import SectionHeading from "@/components/SectionHeading";

export const metadata = { title: "AI Training" };

const driveResources = [
  {
    title: "AI LO Training Drive",
    href: "https://drive.google.com/drive/folders/133w74YcUtK4w8g2Xa8Ttp7j2W7RVw1vz?usp=sharing",
    items: [
      "Apr 28th Custom GPTs",
      "April 14th Google Workspace Automation",
      "Class 1 Docs & Resources",
      "Class 2 NotebookLM",
      "March 31st Gemini NotebookLM",
      "Loan Factory AI Takeoff Guide",
      "NotebookLM slide deck",
    ],
  },
  {
    title: "Jeremy and Andre BD Folder",
    href: "https://drive.google.com/drive/folders/164oRV4Vn1XRh6UTySL52USyXDugfQp6a?usp=sharing",
    items: [
      "AI Training Roadmap",
      "Marketing & Recruiting Project Folder",
      "Training Knowledge",
      "TERA priority analysis",
      "Group growth marketing plan",
    ],
  },
];

const trainingPaths = [
  {
    title: "Start with safe AI habits",
    body: "Learn what context to provide, how to ask for drafts, and how to review the answer before anyone else sees it.",
  },
  {
    title: "Build your Gemini Gem AI Twin",
    body: "Use the setup resources to shape a personal drafting assistant that understands your tone and weekly workflow.",
  },
  {
    title: "Practice with NotebookLM",
    body: "Turn approved training notes into study guides, summaries, questions, and call-prep material.",
  },
  {
    title: "Use AI for content QA",
    body: "Run posts, scripts, emails, and video ideas through a review pass before sending them to a human reviewer.",
  },
];

const promptLibrary = [
  "Rewrite this follow-up so it is clear, short, and conversational.",
  "Turn this training note into a roleplay between an LO and a borrower.",
  "Create a checklist for my next referral partner touch.",
  "Review this content for clarity, unsupported claims, and missing context.",
];

const practiceWeek = [
  "Create one Gemini Gem AI Twin draft for a follow-up message.",
  "Use NotebookLM to summarize one training handout.",
  "Ask AI Assistants for one roleplay and practice it out loud.",
  "Run one content idea through the Audience Quality Panel page before human review.",
];

export default function AITrainingPage() {
  return (
    <>
      <PageHero
        title="AI Training"
        body={
          <p>
            Practical AI training for Loan Factory loan officers: prompt habits,
            Gemini Gem AI Twin setup, NotebookLM study workflows, content QA,
            and safer draft review.
          </p>
        }
        backgroundImage="/media/dark-hero-background.png"
        overlayOpacity={0.68}
      >
        <div className="flex flex-wrap gap-3">
          <a href="#start-here" className="btn-primary">
            Start here
          </a>
          <Link
            href="/ai-assistants/"
            className="btn-secondary border-white/30 bg-white/10 text-white hover:border-white hover:bg-white/20"
          >
            Open AI Assistants
          </Link>
        </div>
      </PageHero>

      <section id="start-here" className="container-page py-14">
        <SectionHeading
          eyebrow="Start here"
          title="Use AI as a training partner, not an autopilot."
          description="The goal is simple: write better prompts, use approved source material, review every draft, and keep human judgment in charge."
        />
        <div className="mt-8 grid gap-5 lg:grid-cols-3">
          <article className="card">
            <h3 className="h-display text-lg">What this is</h3>
            <p className="prose-lf mt-2 text-sm text-lf-slate">
              A practical path for using AI to draft, practice, summarize,
              coach, and review LO Development work.
            </p>
          </article>
          <article className="card">
            <h3 className="h-display text-lg">Who it is for</h3>
            <p className="prose-lf mt-2 text-sm text-lf-slate">
              Loan officers, team leaders, corporate coaches, marketing
              reviewers, and internal support teams.
            </p>
          </article>
          <article className="card">
            <h3 className="h-display text-lg">How to begin</h3>
            <p className="prose-lf mt-2 text-sm text-lf-slate">
              Start with one approved training resource, ask for one useful
              draft, and review it before using it anywhere else.
            </p>
          </article>
        </div>
      </section>

      <section className="bg-lf-mist">
        <div className="container-page py-14">
          <SectionHeading
            eyebrow="Training paths"
            title="Four practical ways to use AI this week"
          />
          <div className="mt-8 grid gap-5 md:grid-cols-2">
            {trainingPaths.map((path) => (
              <article key={path.title} className="card">
                <h3 className="h-display text-xl">{path.title}</h3>
                <p className="prose-lf mt-2 text-sm text-lf-slate">
                  {path.body}
                </p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="container-page py-14">
        <div className="grid gap-8 lg:grid-cols-[1fr_1fr]">
          <div>
            <SectionHeading
              eyebrow="Prompt library"
              title="Prompts LOs can practice immediately"
              description="These are starter prompts. Add real context, then review the output before sharing it."
            />
            <div className="mt-6 grid gap-3">
              {promptLibrary.map((prompt) => (
                <div key={prompt} className="rounded-xl border border-lf-line bg-white p-4 text-sm font-semibold text-lf-charcoal shadow-card">
                  {prompt}
                </div>
              ))}
            </div>
          </div>
          <div className="rounded-2xl border border-lf-line bg-lf-navy p-6 text-white shadow-card">
            <p className="text-xs font-semibold uppercase tracking-wide text-lf-orange">
              Gemini Gem AI Twin
            </p>
            <h3 className="mt-2 font-display text-2xl font-semibold">
              Build one assistant around your voice and weekly rhythm.
            </h3>
            <p className="mt-3 text-sm leading-6 text-white/75">
              Use the Gemini setup resources to teach a private drafting helper
              how you explain Loan Factory, how you follow up, and how you want
              content to sound before review.
            </p>
            <div className="mt-5 flex flex-wrap gap-3">
              <Link href="/prompts/" className="btn-primary">
                Open prompt library
              </Link>
              <Link
                href="/ai-coaching-assistant/"
                className="btn-secondary border-white/30 bg-white/10 text-white hover:border-white hover:bg-white/20"
              >
                AI coaching guide
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-lf-mist">
        <div className="container-page py-14">
          <SectionHeading
            eyebrow="Review workflow"
            title="Draft, score, improve, then send to a human reviewer"
            description="The AI Training workflow connects drafting practice to content QA and the Audience Quality Panel before anything sensitive leaves the platform."
          />
          <div className="mt-8 grid gap-5 md:grid-cols-3">
            {[
              ["Draft", "Use the AI Assistants page to create a first draft, checklist, summary, or roleplay."],
              ["Score", "Use the Audience Quality Panel to inspect clarity, audience reaction, and risk flags."],
              ["Improve", "Rewrite the draft with source material, plain language, and a clear next action."],
            ].map(([title, body]) => (
              <article key={title} className="card">
                <h3 className="h-display text-lg">{title}</h3>
                <p className="prose-lf mt-2 text-sm text-lf-slate">{body}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="container-page py-14">
        <div className="grid gap-8 lg:grid-cols-[0.9fr_1.1fr]">
          <div>
            <SectionHeading
              eyebrow="Safe AI usage"
              title="Checklist before using any draft"
            />
            <ul className="mt-6 space-y-3">
              {[
                "Use approved source material when asking for training, coaching, or content help.",
                "Remove borrower data and private file details from prompts.",
                "Check for unsupported claims before sharing any draft.",
                "Use TERA as the system of record. AI does not read from or write to it.",
                "Treat loan scenarios as coaching context for qualified human review.",
              ].map((item) => (
                <li key={item} className="rounded-xl border border-lf-line bg-white p-4 text-sm font-semibold text-lf-charcoal shadow-card">
                  {item}
                </li>
              ))}
            </ul>
          </div>
          <div>
            <SectionHeading
              eyebrow="Google Drive resources"
              title="Training folders Jeremy shared"
              description="Open the folders for source material. Large videos and files stay in Drive."
            />
            <div className="mt-6 grid gap-5">
              {driveResources.map((folder) => (
                <a
                  key={folder.href}
                  href={folder.href}
                  className="card block transition hover:-translate-y-0.5 hover:shadow-lift"
                >
                  <div className="flex items-start justify-between gap-3">
                    <h3 className="h-display text-xl">{folder.title}</h3>
                    <span aria-hidden className="text-lf-orange">↗</span>
                  </div>
                  <ul className="prose-lf mt-3 list-disc space-y-1 pl-5 text-sm text-lf-slate">
                    {folder.items.map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ul>
                </a>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="container-page pb-16">
        <div className="rounded-2xl border border-lf-orange/30 bg-lf-orangeSoft/50 p-6">
          <h2 className="h-display text-2xl">What to practice this week</h2>
          <div className="mt-5 grid gap-3 md:grid-cols-2">
            {practiceWeek.map((item) => (
              <div key={item} className="rounded-xl bg-white p-4 text-sm font-semibold text-lf-charcoal shadow-card">
                {item}
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
