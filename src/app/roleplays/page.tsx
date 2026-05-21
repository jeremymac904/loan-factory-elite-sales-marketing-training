import RoleplayCard from "@/components/RoleplayCard";
import SectionHeading from "@/components/SectionHeading";
import { roleplays } from "@/data/roleplays";

export const metadata = { title: "Roleplay Library" };

export default function RoleplayLibraryPage() {
  return (
    <>
      <section className="bg-lf-navy text-white">
        <div className="container-page py-14">
          <span className="rounded-full bg-lf-orange px-3 py-1 text-xs font-bold uppercase tracking-wide">
            Practice
          </span>
          <h1 className="mt-5 font-display text-4xl font-semibold tracking-tight">
            Roleplay Library
          </h1>
          <p className="mt-4 max-w-2xl text-lg text-white/85">
            Ten short structured roleplays. 8 to 12 minutes each, including
            feedback. Pair up by experience level. Rotate weekly. Coach to the
            lowest two areas every week.
          </p>
        </div>
      </section>

      <section className="container-page py-12">
        <SectionHeading
          eyebrow="How to run a roleplay"
          title="The 4 step block."
        />
        <ol className="prose-lf mt-4 list-decimal space-y-2 pl-5 text-base">
          <li>Set the scene. 60 seconds.</li>
          <li>Run the scenario. 5 to 7 minutes.</li>
          <li>Pause and coach. One specific suggestion only.</li>
          <li>Run it again with the fix. 2 to 3 minutes.</li>
        </ol>

        <div className="mt-10 grid gap-5 md:grid-cols-2">
          {roleplays.map((r) => (
            <RoleplayCard key={r.id} roleplay={r} />
          ))}
        </div>
      </section>
    </>
  );
}
