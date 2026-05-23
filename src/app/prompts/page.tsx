import PromptCard from "@/components/PromptCard";
import SectionHeading from "@/components/SectionHeading";
import { prompts, promptCategories } from "@/data/prompts";

export const metadata = { title: "AI Prompt Library" };

export default function PromptLibraryPage() {
  return (
    <>
      <section className="bg-lf-navy text-white">
        <div className="container-page py-14">
          <p className="text-xs font-bold uppercase tracking-wide text-lf-orange">
            Library
          </p>
          <h1 className="mt-5 font-display text-4xl font-semibold tracking-tight">
            Prompt Library
          </h1>
          <p className="mt-4 max-w-2xl text-lg text-white/85">
            Copy a prompt when you need help with call prep, follow-up,
            partner outreach, content, roleplay, or weekly review. Every AI
            answer is only a draft. Read it, edit it, and review anything
            borrower-facing or public before use.
          </p>
        </div>
      </section>

      <section className="container-page py-12">
        <div className="flex flex-wrap gap-2">
          {promptCategories.map((c) => (
            <a
              key={c}
              href={`#cat-${c.replace(/\s+/g, "-").toLowerCase()}`}
              className="pill hover:border-lf-navy hover:text-lf-navy"
            >
              {c}
            </a>
          ))}
        </div>

        {promptCategories.map((c) => {
          const list = prompts.filter((p) => p.category === c);
          if (list.length === 0) return null;
          const id = `cat-${c.replace(/\s+/g, "-").toLowerCase()}`;
          return (
            <div key={c} id={id} className="mt-12 scroll-mt-24">
              <SectionHeading eyebrow={c} title={`${c} prompts`} />
              <div className="mt-6 grid gap-5 md:grid-cols-2">
                {list.map((p) => (
                  <PromptCard key={p.id} prompt={p} />
                ))}
              </div>
            </div>
          );
        })}
      </section>
    </>
  );
}
