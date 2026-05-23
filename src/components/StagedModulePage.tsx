import ModuleHero from "./ModuleHero";
import ModuleSummarySections from "./ModuleSummarySections";
import ScriptCard from "./ScriptCard";
import PromptCard from "./PromptCard";
import RoleplayCard from "./RoleplayCard";
import RecordingCard from "./RecordingCard";
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
          eyebrow="Lesson guide"
          title="What to practice from this lesson."
        />
        <div className="mt-6 grid gap-5 md:grid-cols-2">
          {module.trainingVideo ? (
            <RecordingCard
              level={module.level}
              title={`${module.level} Live session`}
              description={module.trainingVideo.description}
              videoSrc={module.trainingVideo.embedUrl}
              videoTitle={module.trainingVideo.title}
            />
          ) : (
            <article className="card">
              <p className="text-xs font-semibold uppercase tracking-wide text-lf-orange">
                {module.level}
              </p>
              <h3 className="h-display mt-1 text-lg">Practice focus</h3>
              <p className="prose-lf mt-2 text-sm text-lf-slate">
                {recordingDescription}
              </p>
            </article>
          )}
          <article className="card">
            <p className="text-xs font-semibold uppercase tracking-wide text-lf-orange">
              Lesson handout
            </p>
            <h3 className="h-display mt-1 text-lg">{handoutTitle}</h3>
            <p className="prose-lf mt-2 text-sm text-lf-slate">
              {handoutDescription}
            </p>
          </article>
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
