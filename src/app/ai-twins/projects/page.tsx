import AITwinNav from "@/components/AITwinNav";
import SectionHeading from "@/components/SectionHeading";
import { aiTwinProjectExample } from "@/data/aiTwins";

export const metadata = { title: "AI Twin Projects" };

export default function AiTwinProjectsPage() {
  return (
    <section className="container-page py-12">
      <AITwinNav />
      <SectionHeading
        eyebrow="Project examples"
        title="Turn an idea into a clear project brief."
        description="Use this page to see how a Twin can organize a project: goal, sources, instructions, tasks, needed connections, and a testing checklist."
      />
      <div className="mt-8 grid gap-6 lg:grid-cols-[0.95fr_1.05fr]">
        <article className="card">
          <p className="text-xs font-semibold uppercase tracking-wide text-lf-orange">
            {aiTwinProjectExample.status}
          </p>
          <h2 className="h-display mt-1 text-2xl">
            {aiTwinProjectExample.title}
          </h2>
          <p className="prose-lf mt-2 text-sm text-lf-slate">
            A project builder can turn a rough idea into clear instructions,
            source lists, tasks, and a testing checklist.
          </p>
          <div className="mt-5 grid gap-2">
            {aiTwinProjectExample.sources.map((source) => (
              <div key={source} className="rounded-lg bg-lf-mist px-3 py-2 text-sm font-semibold text-lf-charcoal">
                Source: {source}
              </div>
            ))}
          </div>
        </article>
        <article className="card">
          <h2 className="h-display text-2xl">Generated checklist</h2>
          <ol className="prose-lf mt-4 list-decimal space-y-2 pl-5 text-sm">
            {aiTwinProjectExample.tasks.map((task) => (
              <li key={task}>{task}</li>
            ))}
          </ol>
          <p className="mt-5 rounded-xl border border-lf-orange/30 bg-lf-orangeSoft p-4 text-sm font-semibold text-lf-orangeDark">
            Email, Drive, automations, and external actions stay blocked until
            Jeremy explicitly approves them.
          </p>
        </article>
      </div>
    </section>
  );
}
