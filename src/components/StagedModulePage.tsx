import ModuleHero from "./ModuleHero";
import ModuleSummarySections from "./ModuleSummarySections";
import ScriptCard from "./ScriptCard";
import PromptCard from "./PromptCard";
import RoleplayCard from "./RoleplayCard";
import RecordingPlaceholder from "./RecordingPlaceholder";
import DownloadPlaceholder from "./DownloadPlaceholder";
import SectionHeading from "./SectionHeading";
import DoThisToday from "./DoThisToday";
import { ModuleSummary } from "@/data/modules";
import { scripts } from "@/data/scripts";
import { prompts } from "@/data/prompts";
import { roleplays } from "@/data/roleplays";

type Props = {
  module: ModuleSummary;
  handoutTitle: string;
  handoutDescription: string;
  recordingDescription: string;
};

export default function StagedModulePage({
  module,
  handoutTitle,
  handoutDescription,
  recordingDescription,
}: Props) {
  const moduleScripts = scripts.filter((s) => s.module === module.level);
  const modulePrompts = prompts.filter((p) => p.module === module.level);
  const moduleRoleplays = roleplays.filter((r) => r.module === module.level);
  const assetSlots = [
    {
      label: "Video",
      status: module.trainingVideo ? "Ready" : "Coming Soon",
      body: module.trainingVideo?.description ?? recordingDescription,
    },
    {
      label: "Audio",
      status: "Needs Upload",
      body: "Audio-only lesson slot for the module replay or podcast cutdown.",
    },
    {
      label: "Podcast/tutorial clips",
      status: "Coming Soon",
      body: "Short practical clips for review between live classes.",
    },
    {
      label: "Handouts",
      status: "Coming Soon",
      body: handoutDescription,
    },
    {
      label: "Slide decks",
      status: "Needs Upload",
      body: "Deck slot for the approved module presentation.",
    },
    {
      label: "Scripts",
      status: moduleScripts.length ? "Ready" : "Coming Soon",
      body: "Use scripts as starting points and review borrower-facing language.",
    },
    {
      label: "Prompts",
      status: modulePrompts.length ? "Ready" : "Coming Soon",
      body: "Draft-only AI prompts for practice, planning, and review.",
    },
    {
      label: "Roleplays and trackers",
      status: moduleRoleplays.length ? "Ready" : "Coming Soon",
      body: "Practice drills and tracker slots for weekly accountability.",
    },
  ];

  return (
    <>
      <ModuleHero
        level={module.level}
        title={module.title}
        promise={module.corePromise}
        audience={module.audience}
        status={module.status}
        outcomes={module.outcomes}
        levels={module.levels}
      />

      <section className="container-page pt-10">
        <DoThisToday items={module.doThisToday} />
      </section>

      <section className="container-page py-12">
        <SectionHeading
          eyebrow="Replay and handout"
          title="Coming with the live session."
        />
        <div className="mt-6 grid gap-5 md:grid-cols-2">
          <RecordingPlaceholder
            level={module.level}
            title={`${module.level} Live session`}
            description={recordingDescription}
          />
          <DownloadPlaceholder
            title={handoutTitle}
            description={handoutDescription}
          />
        </div>
      </section>

      <section className="container-page py-6">
        <SectionHeading
          eyebrow="Module assets"
          title={`${module.level} resource slots.`}
          description="Every module has a clean place for the core materials. Missing files are clearly marked for beta upload instead of appearing broken."
        />
        <div className="mt-6 grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          {assetSlots.map((slot) => (
            <article key={slot.label} className="card p-5">
              <div className="flex items-start justify-between gap-3">
                <h3 className="h-display text-base">{slot.label}</h3>
                <span className="rounded-full border border-lf-line bg-lf-mist px-2 py-1 text-[11px] font-semibold uppercase tracking-wide text-lf-slate">
                  {slot.status}
                </span>
              </div>
              <p className="mt-3 text-sm leading-6 text-lf-slate">
                {slot.body}
              </p>
            </article>
          ))}
        </div>
      </section>

      {moduleScripts.length > 0 && (
        <section className="container-page py-6">
          <SectionHeading
            eyebrow="Scripts"
            title={`${module.level} scripts.`}
            description="Starting points. Customize the language. Confirm NMLS ID. Compliance review any public, borrower facing, or Realtor facing use."
          />
          <div className="mt-6 grid gap-5 md:grid-cols-2">
            {moduleScripts.map((s) => (
              <ScriptCard key={s.id} script={s} />
            ))}
          </div>
        </section>
      )}

      {modulePrompts.length > 0 && (
        <section className="container-page py-6">
          <SectionHeading
            eyebrow="AI prompts"
            title={`${module.level} AI prompts.`}
            description="Use these inside your Gemini Gem AI Twin. Paste context. Read the draft. Personalize. Send."
          />
          <div className="mt-6 grid gap-5 md:grid-cols-2">
            {modulePrompts.map((p) => (
              <PromptCard key={p.id} prompt={p} />
            ))}
          </div>
        </section>
      )}

      {moduleRoleplays.length > 0 && (
        <section className="container-page py-6">
          <SectionHeading
            eyebrow="Roleplay"
            title={`${module.level} practice block.`}
            description="Run with a partner. 8 to 12 minutes including feedback. Coach to the lowest two areas each week."
          />
          <div className="mt-6 grid gap-5 md:grid-cols-2">
            {moduleRoleplays.map((r) => (
              <RoleplayCard key={r.id} roleplay={r} />
            ))}
          </div>
        </section>
      )}

      <ModuleSummarySections module={module} />
    </>
  );
}
