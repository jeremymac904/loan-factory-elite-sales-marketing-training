import Link from "next/link";
import PageHero from "@/components/PageHero";
import SectionHeading from "@/components/SectionHeading";
import ComplianceCallout from "@/components/ComplianceCallout";

export const metadata = { title: "Assessments" };

const quizCards = [
  {
    title: "Coaching Personality Quiz",
    eyebrow: "For current LOs",
    description:
      "Find your coaching profile across communication style, motivation, follow-through, partner approach, AI adoption, and accountability. Outputs a primary profile, blind spots, recommended training path, and team-leader notes.",
    time: "About 5 minutes",
    href: "/personality-quiz/",
    cta: "Start the Coaching Personality Quiz",
  },
  {
    title: "New LO Aptitude & Personality Quiz",
    eyebrow: "For new and developing LOs",
    description:
      "Get a readiness profile, a 30-day focus, first scripts to practice, AI training recommendations, and support routing. Built for the first 0-180 days in the LO role.",
    time: "About 6 minutes",
    href: "/new-lo-aptitude-quiz/",
    cta: "Start the New LO Quiz",
  },
];

const supportingLinks = [
  {
    title: "Coaching Reports (samples)",
    href: "/coach-reports/",
    description:
      "Sample completed reports so coaches and team leaders can see what a finished profile looks like.",
  },
  {
    title: "Admin Review",
    href: "/admin/quiz-review/",
    description:
      "Role-based overview of how completed reports would be reviewed and routed.",
  },
  {
    title: "Personality Workshop",
    href: "/personality-workshop/",
    description:
      "The deeper live and self-paced workshop on personality and selling styles.",
  },
];

export default function AssessmentsPage() {
  return (
    <>
      <PageHero
        eyebrow="LO Development"
        title="Assessments"
        body={
          <p>
            Two coaching and development quizzes for Loan Factory loan
            officers. Pick your quiz, answer honestly, and get a profile your
            coach and team leader can build a real plan around.
          </p>
        }
        backgroundImage="/media/dark-hero-background.png"
      >
        <div className="flex flex-wrap gap-3">
          <Link href="/personality-quiz/" className="btn-primary">
            Coaching Personality Quiz
          </Link>
          <Link
            href="/new-lo-aptitude-quiz/"
            className="btn-secondary border-white/30 bg-white/10 text-white hover:border-white hover:bg-white/20"
          >
            New LO Aptitude Quiz
          </Link>
        </div>
      </PageHero>

      <section className="container-page py-14">
        <SectionHeading
          eyebrow="Pick your quiz"
          title="Two short paths. One coaching report."
          description="Both quizzes generate a clean Coaching Report and a Team Leader Report. You can copy, print, or download as Markdown. Answers stay in your browser session only."
        />
        <div className="mt-8 grid gap-5 md:grid-cols-2">
          {quizCards.map((card) => (
            <article
              key={card.href}
              className="card flex flex-col gap-4 transition hover:-translate-y-0.5 hover:shadow-lift"
            >
              <p className="text-xs font-semibold uppercase tracking-wide text-lf-orange">
                {card.eyebrow}
              </p>
              <h2 className="h-display text-2xl">{card.title}</h2>
              <p className="prose-lf text-sm text-lf-slate">{card.description}</p>
              <p className="text-xs font-semibold uppercase tracking-wide text-lf-charcoal">
                {card.time}
              </p>
              <Link href={card.href} className="btn-primary mt-auto w-fit">
                {card.cta}
              </Link>
            </article>
          ))}
        </div>
      </section>

      <section className="bg-lf-mist">
        <div className="container-page py-14">
          <SectionHeading
            eyebrow="What you get"
            title="A coaching plan, not a score on a wall."
            description="Each report is built to be reviewed with your team leader. No clinical labels, no employment decisions, no compliance scoring."
          />
          <div className="mt-8 grid gap-5 md:grid-cols-3">
            <div className="card">
              <h3 className="h-display text-lg">LO Development Profile</h3>
              <p className="prose-lf mt-2 text-sm text-lf-slate">
                A primary coaching profile, plain English explanation,
                strengths, and blind spots.
              </p>
            </div>
            <div className="card">
              <h3 className="h-display text-lg">Coaching Report</h3>
              <p className="prose-lf mt-2 text-sm text-lf-slate">
                Coaching recommendations, best training path, suggested
                scripts and resources, and how your coach should talk to you.
              </p>
            </div>
            <div className="card">
              <h3 className="h-display text-lg">Team Leader Report</h3>
              <p className="prose-lf mt-2 text-sm text-lf-slate">
                Notes a team leader can use to adjust check-ins, pair-ups, and
                weekly plan with your style in mind.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="container-page py-14">
        <SectionHeading
          eyebrow="Connected resources"
          title="More places to grow."
        />
        <div className="mt-8 grid gap-5 md:grid-cols-3">
          {supportingLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="card hover:shadow-lift"
            >
              <h3 className="h-display text-lg">{link.title}</h3>
              <p className="prose-lf mt-2 text-sm text-lf-slate">
                {link.description}
              </p>
            </Link>
          ))}
        </div>
      </section>

      <section className="container-page pb-20">
        <ComplianceCallout title="Coaching tool only" variant="default">
          <p>
            Loan Factory Assessments are a coaching and development tool. They
            are not a clinical personality test, an employment test, a
            licensing or compliance decision, an underwriting tool, or a
            substitute for human coaching. They do not store borrower or
            customer data.
          </p>
        </ComplianceCallout>
      </section>
    </>
  );
}
