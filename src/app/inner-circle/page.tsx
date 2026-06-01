import Link from "next/link";
import PageHero from "@/components/PageHero";
import SectionHeading from "@/components/SectionHeading";

export const metadata = { title: "Inner Circle" };

// PUBLIC internal overview page (no extra login; no private data). The private
// member workspace + coaching records stay behind sign-in.
const highlights = [
  {
    title: "Top-tier coaching community",
    body: "Inner Circle is the highest-touch Loan Factory coaching community for committed producers who want direct access and a tight peer group.",
  },
  {
    title: "Mastermind + direct access",
    body: "Peer mastermind, advanced strategy, and closer access to senior coaches and LO Development leadership.",
  },
  {
    title: "For established producers",
    body: "Best for loan officers already running a consistent weekly rhythm who want to accelerate. Pairs with the free 101-601 training and AI Advantage.",
  },
];

export default function InnerCircleOverviewPage() {
  return (
    <>
      <PageHero
        eyebrow="Coaching program"
        title="Inner Circle"
        body={
          <p>
            Inner Circle is Loan Factory&apos;s highest-touch coaching community —
            mastermind, advanced strategy, and direct access for committed
            producers. This overview explains the program; sign in to open your
            member workspace once enrolled.
          </p>
        }
        backgroundImage="/media/dark-hero-background.png"
      >
        <div className="flex flex-wrap gap-3">
          <Link href="/coaching/" className="btn-primary">
            Compare coaching programs
          </Link>
          <Link
            href="/member-area/"
            className="btn-secondary border-white/30 bg-white/10 text-white hover:border-white hover:bg-white/20"
          >
            Sign in to your member area
          </Link>
        </div>
      </PageHero>

      <section className="container-page py-14">
        <SectionHeading
          title="What Inner Circle offers"
          description="The top of the Loan Factory coaching ladder."
        />
        <div className="mt-8 grid gap-5 md:grid-cols-3">
          {highlights.map((item) => (
            <article key={item.title} className="card">
              <h2 className="h-display text-lg">{item.title}</h2>
              <p className="prose-lf mt-2 text-sm text-lf-slate">{item.body}</p>
            </article>
          ))}
        </div>
        <p className="mt-8 text-sm text-lf-slate">
          Program availability, enrollment, and billing are handled with Loan
          Factory outside this platform. Talk to LO Development or your coach for
          current details.
        </p>
      </section>
    </>
  );
}
