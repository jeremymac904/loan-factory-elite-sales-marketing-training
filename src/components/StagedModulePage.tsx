import ModuleHero from "./ModuleHero";
import ModuleSummarySections from "./ModuleSummarySections";
import ScriptCard from "./ScriptCard";
import PromptCard from "./PromptCard";
import RoleplayCard from "./RoleplayCard";
import RecordingPlaceholder from "./RecordingPlaceholder";
import DownloadPlaceholder from "./DownloadPlaceholder";
import SectionHeading from "./SectionHeading";
import DoThisToday from "./DoThisToday";
import AudioCompanionCard from "./audio/AudioCompanionCard";
import { getAudioCompanionByRoute } from "@/data/audioCompanions";
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
  const audioCompanion = getAudioCompanionByRoute(module.href);
  const assetSlots = [
    {
      label: "Video",
      status: module.trainingVideo ? "Ready" : "Coming Soon",
      body: module.trainingVideo?.description ?? recordingDescription,
    },
    {
      label: "Audio",
      status: "Needs Upload",
      body: "Audio lesson for LOs who want to review this training while driving or walking.",
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
      body: "Class slides will appear here after the final deck is uploaded.",
    },
    {
      label: "Scripts",
      status: moduleScripts.length ? "Ready" : "Coming Soon",
      body: "Start with these words, then make them sound like you before using them.",
    },
    {
      label: "Prompts",
      status: modulePrompts.length ? "Ready" : "Coming Soon",
      body: "Use these prompts to get a first draft. Read and edit before using anything.",
    },
    {
      label: "Roleplays and trackers",
      status: moduleRoleplays.length ? "Ready" : "Coming Soon",
      body: "Practice the conversation and track the activity that creates more follow-up.",
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
          title="Watch the lesson and grab the handout."
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

      {audioCompanion && (
        <section className="container-page py-6">
          <SectionHeading
            title="Audio companion"
            description="Use this when you want to review the lesson while driving, walking, or preparing for coaching."
          />
          <div className="mt-6 max-w-3xl">
            <AudioCompanionCard companion={audioCompanion} />
          </div>
        </section>
      )}

      <section className="container-page py-6">
        <SectionHeading
          eyebrow="Training materials"
          title={`${module.level} materials.`}
          description="Each training page has a clear place for videos, audio, handouts, scripts, prompts, roleplays, and trackers. Missing files are marked clearly."
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
          description="Use these as starting points. Add your NMLS ID where required. Send public, borrower-facing, or Realtor-facing language through the right review path."
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
          description="Use these to ask AI for a first draft. Remove private borrower details. Read, edit, and review before using the result."
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
          description="Practice with a partner for 8 to 12 minutes. Keep the feedback simple: what worked, what sounded unclear, and what to try next."
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
