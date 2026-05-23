import Link from "next/link";
import AITwinNav from "@/components/AITwinNav";
import PageHero from "@/components/PageHero";
import SectionHeading from "@/components/SectionHeading";
import { aiTwinProfiles } from "@/data/aiTwins";

export const metadata = { title: "AI Twins" };

export default function AiTwinsPage() {
  return (
    <>
      <PageHero
        eyebrow="AI Twins"
        title="Future AI helpers by role"
        body={
          <p>
            AI Twins will eventually help approved admins, team leaders,
            coaches, marketing reviewers, and LO Development staff plan work,
            review drafts, organize sources, and prepare next steps.
          </p>
        }
        backgroundImage="/media/dark-hero-background.png"
      >
        <div className="flex flex-wrap gap-3">
          <Link href="/ai-twins/my-twin/" className="btn-primary">
            Open My Twin
          </Link>
          <Link
            href="/ai-twins/projects/"
            className="btn-secondary border-white/30 bg-white/10 text-white hover:border-white hover:bg-white/20"
          >
            View project examples
          </Link>
        </div>
      </PageHero>

      <section className="container-page py-5">
        <AITwinNav />
      </section>

      <section className="container-page pb-14">
        <SectionHeading
          title="What this is"
          description="Each Twin is focused on one job role. It should only use the sources and actions that role is allowed to use."
        />
        <div className="mt-8 grid gap-5 md:grid-cols-2">
          {aiTwinProfiles.map((twin) => (
            <article key={twin.id} className="card">
              <h2 className="h-display mt-1 text-2xl">{twin.displayName}</h2>
              <p className="prose-lf mt-2 text-sm text-lf-slate">
                {twin.summary}
              </p>
              <div className="mt-4 grid gap-2 text-sm text-lf-slate">
                {twin.helpsWith.slice(0, 3).map((item) => (
                  <div key={item} className="rounded-lg bg-lf-mist px-3 py-2">
                    {item}
                  </div>
                ))}
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="bg-lf-mist">
        <div className="container-page py-12">
          <div className="card">
            <h2 className="h-display text-2xl">Connected now</h2>
            <p className="prose-lf mt-2 text-sm text-lf-slate">
              Example cards only. Private files, database saving, AI calls,
              automations, email sends, and Loan Factory system changes are not
              connected.
            </p>
          </div>
        </div>
      </section>
    </>
  );
}
