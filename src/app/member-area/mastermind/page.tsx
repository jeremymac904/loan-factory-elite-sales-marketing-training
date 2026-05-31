import Link from "next/link";
import PageHero from "@/components/PageHero";
import SectionHeading from "@/components/SectionHeading";

export const metadata = { title: "Alliance Mastermind" };

const agenda = [
  {
    title: "Hot seat prep",
    description:
      "Bring one real blocker, one measurable goal, and the action you already tried.",
  },
  {
    title: "Scorecard review",
    description:
      "Review activity, partner follow-up, pipeline friction, and training progress before strategy.",
  },
  {
    title: "Strategy sprint",
    description:
      "Turn coach and peer feedback into one next action with an owner and due date.",
  },
  {
    title: "Resource assignment",
    description:
      "Leave with one script, module, tracker, or AI draft workflow to complete before the next session.",
  },
];

export default function AllianceMastermindPage() {
  return (
    <>
      <PageHero
        eyebrow="Loan Factory Alliance"
        title="Mastermind prep, session rhythm, and follow-through."
        body={
          <p>
            The Alliance mastermind is for focused strategy, accountability,
            leadership growth, and next-action clarity. It is not a promise of
            production results.
          </p>
        }
        backgroundImage="/media/dark-hero-background.png"
      >
        <div className="flex flex-wrap gap-3">
          <Link href="/member-area/alliance/" className="btn-primary">
            Alliance dashboard
          </Link>
          <Link
            href="/coach-command-center/"
            className="btn-secondary border-white/30 bg-white/10 text-white hover:border-white hover:bg-white/20"
          >
            Coach center
          </Link>
        </div>
      </PageHero>

      <section className="container-page py-12">
        <SectionHeading
          eyebrow="Session structure"
          title="Every mastermind should end with one accountable next action."
          description="Use this page as the operating structure for Alliance sessions until a live calendar or database-backed workflow is approved."
        />
        <div className="mt-8 grid gap-5 md:grid-cols-2">
          {agenda.map((item) => (
            <article key={item.title} className="card">
              <span className="text-xs font-semibold uppercase tracking-wide text-lf-orange">
                Mastermind step
              </span>
              <h2 className="h-display mt-2 text-xl">{item.title}</h2>
              <p className="prose-lf mt-2 text-sm text-lf-slate">
                {item.description}
              </p>
            </article>
          ))}
        </div>
      </section>

      <section className="container-page pb-16">
        <div className="rounded-2xl border border-lf-orange/30 bg-lf-orangeSoft/60 p-6">
          <p className="text-xs font-bold uppercase tracking-wide text-lf-orangeDark">
            Coach handoff
          </p>
          <p className="prose-lf mt-3 max-w-3xl text-sm">
            After each session, the coach should capture the blocker, decision,
            assigned resource, due date, and next check-in inside the Coach
            Command Center. Do not create external calendar invites, outbound
            messages, or production automations from this page.
          </p>
        </div>
      </section>
    </>
  );
}
