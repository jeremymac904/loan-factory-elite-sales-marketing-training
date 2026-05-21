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
