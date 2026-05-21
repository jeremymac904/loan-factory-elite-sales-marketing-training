import PromptCard from "@/components/PromptCard";
import SectionHeading from "@/components/SectionHeading";
import GeminiGemCallout from "@/components/GeminiGemCallout";
import { prompts, promptCategories } from "@/data/prompts";

export const metadata = { title: "AI Prompt Library" };

export default function PromptLibraryPage() {
  return (
    <>
      <section className="bg-lf-navy text-white">
        <div className="container-page py-14">
          <span className="rounded-full bg-lf-orange px-3 py-1 text-xs font-bold uppercase tracking-wide">
            Library
          </span>
          <h1 className="mt-5 font-display text-4xl font-semibold tracking-tight">
            AI Prompt Library
          </h1>
          <p className="mt-4 max-w-2xl text-lg text-white/85">
            Gemini Gem AI Twin ready prompts for call prep, follow up, partner outreach,
            content, roleplay, and weekly review. Every output is a draft. Read
            it. Personalize it. Compliance review anything borrower or public
            facing.
          </p>
        </div>
      </section>

      <section className="container-page pt-10">
        <GeminiGemCallout />
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
