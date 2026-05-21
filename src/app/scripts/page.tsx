import ScriptCard from "@/components/ScriptCard";
import SectionHeading from "@/components/SectionHeading";
import ComplianceCallout from "@/components/ComplianceCallout";
import { scripts, scriptCategories } from "@/data/scripts";

export const metadata = { title: "Script Library" };

export default function ScriptLibraryPage() {
  return (
    <>
      <section className="bg-lf-navy text-white">
        <div className="container-page py-14">
          <span className="rounded-full bg-lf-orange px-3 py-1 text-xs font-bold uppercase tracking-wide">
            Library
          </span>
          <h1 className="mt-5 font-display text-4xl font-semibold tracking-tight">
            Script Library
          </h1>
          <p className="mt-4 max-w-2xl text-lg text-white/85">
            Borrower, Realtor, partner, listing agent, past client, hook, text,
            and email scripts. Use them as a starting point. Personalize before
            you send. Confirm NMLS ID. Compliance review any public, borrower
            facing, or Realtor facing use.
          </p>
        </div>
      </section>

      <section className="container-page py-12">
        <div className="flex flex-wrap gap-2">
          {scriptCategories.map((c) => (
            <a
              key={c}
              href={`#cat-${c.replace(/\s+/g, "-").toLowerCase()}`}
              className="pill hover:border-lf-navy hover:text-lf-navy"
            >
              {c}
            </a>
          ))}
        </div>

        {scriptCategories.map((c) => {
          const list = scripts.filter((s) => s.category === c);
          if (list.length === 0) return null;
          const id = `cat-${c.replace(/\s+/g, "-").toLowerCase()}`;
          return (
            <div key={c} id={id} className="mt-12 scroll-mt-24">
              <SectionHeading eyebrow={c} title={`${c} scripts`} />
              <div className="mt-6 grid gap-5 md:grid-cols-2">
                {list.map((s) => (
                  <ScriptCard key={s.id} script={s} />
                ))}
              </div>
            </div>
          );
        })}

        <div className="mt-12">
          <ComplianceCallout title="Before public use">
            <p>
              Every borrower facing, Realtor facing, or public artifact requires
              compliance review. The scripts here are training starting points,
              not approved marketing copy.
            </p>
          </ComplianceCallout>
        </div>
      </section>
    </>
  );
}
