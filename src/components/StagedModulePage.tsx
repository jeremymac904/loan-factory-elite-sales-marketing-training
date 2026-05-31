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
import { getMarketingAssetsForModule } from "@/data/marketingTrainingAssets";
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
  const marketingAssets = getMarketingAssetsForModule(module.level);

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

      {marketingAssets.length > 0 && (
        <section className="container-page py-8">
          <SectionHeading
            eyebrow="Marketing training assets"
            title={`${module.level} source-backed setup lessons.`}
            description="These are free internal Sales and Marketing training resources from Jeremy's downloaded asset package. They are not paid coaching progress."
          />
          <div className="mt-6 grid gap-5 lg:grid-cols-2">
            {marketingAssets.map((asset) => (
              <article
                key={asset.id}
                id={asset.id}
                className="card flex flex-col gap-5"
              >
                <div>
                  <p className="text-xs font-semibold uppercase tracking-wide text-lf-orange">
                    {asset.track}
                  </p>
                  <h3 className="h-display mt-1 text-xl">{asset.title}</h3>
                  <p className="prose-lf mt-2 text-sm text-lf-slate">
                    {asset.description}
                  </p>
                </div>

                <div className="grid gap-3 text-sm md:grid-cols-2">
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-wide text-lf-slate">
                      Estimated time
                    </p>
                    <p className="mt-1 text-lf-charcoal">
                      {asset.estimatedTime}
                    </p>
                  </div>
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-wide text-lf-slate">
                      Next action
                    </p>
                    <p className="mt-1 text-lf-charcoal">{asset.nextAction}</p>
                  </div>
                </div>

                {asset.complianceCaution && (
                  <div className="rounded-xl border border-lf-orange/30 bg-lf-orangeSoft p-4 text-sm text-lf-charcoal">
                    <strong>Compliance caution:</strong>{" "}
                    {asset.complianceCaution}
                  </div>
                )}

                <div>
                  <h4 className="text-sm font-semibold text-lf-charcoal">
                    AI Advantage tie-in
                  </h4>
                  <p className="prose-lf mt-1 text-sm text-lf-slate">
                    {asset.aiAdvantageTieIn.useCase}
                  </p>
                </div>

                <div>
                  <h4 className="text-sm font-semibold text-lf-charcoal">
                    90 second walkthrough script
                  </h4>
                  <p className="prose-lf mt-1 text-sm text-lf-slate">
                    <strong>Hook:</strong> {asset.walkthroughScript.hook}
                  </p>
                  <p className="prose-lf mt-1 text-sm text-lf-slate">
                    <strong>Steps:</strong> {asset.walkthroughScript.steps}
                  </p>
                  <p className="prose-lf mt-1 text-sm text-lf-slate">
                    <strong>Warning:</strong> {asset.walkthroughScript.warning}
                  </p>
                  <p className="prose-lf mt-1 text-sm text-lf-slate">
                    <strong>Close:</strong> {asset.walkthroughScript.close}
                  </p>
                </div>

                <div>
                  <h4 className="text-sm font-semibold text-lf-charcoal">
                    Quiz and answer key
                  </h4>
                  <ol className="prose-lf mt-2 list-decimal space-y-2 pl-5 text-sm text-lf-slate">
                    {asset.quiz.map((item) => (
                      <li key={item.question}>
                        <span>{item.question}</span>
                        <br />
                        <strong>Answer:</strong> {item.answer}
                      </li>
                    ))}
                  </ol>
                </div>

                <div className="grid gap-4 md:grid-cols-2">
                  <div>
                    <h4 className="text-sm font-semibold text-lf-charcoal">
                      Success checklist
                    </h4>
                    <ul className="prose-lf mt-2 list-disc space-y-1 pl-5 text-sm">
                      {asset.successChecklist.map((item) => (
                        <li key={item}>{item}</li>
                      ))}
                    </ul>
                  </div>
                  <div>
                    <h4 className="text-sm font-semibold text-lf-charcoal">
                      Common mistakes
                    </h4>
                    <ul className="prose-lf mt-2 list-disc space-y-1 pl-5 text-sm">
                      {asset.commonMistakes.map((item) => (
                        <li key={item}>{item}</li>
                      ))}
                    </ul>
                  </div>
                </div>

                <div className="rounded-xl bg-lf-mist p-4 text-sm text-lf-slate">
                  <strong>When to contact support:</strong>{" "}
                  {asset.contactGuidance}
                </div>
              </article>
            ))}
          </div>
        </section>
      )}

      <ModuleSummarySections module={module} />
    </>
  );
}
