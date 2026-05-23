import ModuleHero from "@/components/ModuleHero";
import ModuleSummarySections from "@/components/ModuleSummarySections";
import ScriptCard from "@/components/ScriptCard";
import PromptCard from "@/components/PromptCard";
import RecordingPlaceholder from "@/components/RecordingPlaceholder";
import DownloadPlaceholder from "@/components/DownloadPlaceholder";
import SectionHeading from "@/components/SectionHeading";
import DoThisToday from "@/components/DoThisToday";
import ClassRegistration from "@/components/ClassRegistration";
import AudioCompanionCard from "@/components/audio/AudioCompanionCard";
import SalesMathCalculator from "@/components/SalesMathCalculator";
import { getAudioCompanionByRoute } from "@/data/audioCompanions";
import { findModule } from "@/data/modules";
import { scripts } from "@/data/scripts";
import { prompts } from "@/data/prompts";
import { conversationSources } from "@/data/conversationSources";

export const metadata = {
  title: "101 Foundation",
};

const module101 = findModule("101-foundation")!;
const module101Scripts = scripts.filter((s) => s.module === "101");
const module101Prompts = prompts.filter((p) => p.module === "101");
const module101Audio = getAudioCompanionByRoute("/101-foundation/");

export default function Module101Page() {
  return (
    <>
      <ModuleHero
        level={module101.level}
        title={module101.title}
        promise={module101.corePromise}
        audience={module101.audience}
        status={module101.status}
        outcomes={module101.outcomes}
        levels={module101.levels}
        backgroundImage="/media/dark-hero-background.png"
      />

      <section className="container-page pt-10">
        <DoThisToday items={module101.doThisToday} />
      </section>

      <section className="container-page py-12">
        <ClassRegistration />
      </section>

      <section className="container-page py-6">
        <SectionHeading
          eyebrow="Replay and handout"
          title="Watch the lesson and download the handouts."
        />
        <div className="mt-6 grid gap-5 md:grid-cols-3">
          <RecordingPlaceholder
            level="101"
            title="101 live walkthrough"
            description="Jeremy walks through a full Loan Factory LO day: activity standard, weekly rhythm, first follow-ups, and AI-assisted drafting."
            videoSrc={module101.trainingVideo?.embedUrl}
            videoTitle={module101.trainingVideo?.title}
          />
          <DownloadPlaceholder
            title="101 Live class deck"
            format="PPTX"
            description="Class slides for the 101 Foundation lesson."
            downloadHref="/downloads/Elite_Sales_Marketing_Training_101_REVISED.pptx"
          />
          <DownloadPlaceholder
            title="101 Mortgage Sales Foundation handout"
            format="Word"
            description="What you will learn, first-call script, tracker basics, today's assignment, safety notes, and next step."
            downloadHref="/downloads/101_foundation_handout.docx"
          />
        </div>
      </section>

      {module101Audio && (
        <section className="container-page py-6">
          <SectionHeading
            title="Audio companion"
            description="Use this when you want to review the 101 lesson while driving, walking, or preparing for coaching."
          />
          <div className="mt-6 max-w-3xl">
            <AudioCompanionCard companion={module101Audio} />
          </div>
        </section>
      )}

      <section className="container-page py-12">
        <SectionHeading
          eyebrow="Broker value proposition"
          title="The 30 second intro every LO uses."
          description="Use this to explain what you do in plain English. Confirm your NMLS ID before public use."
        />
        <div className="mt-6">
          {module101Scripts
            .filter((s) => s.id === "broker-value-prop-30s")
            .map((s) => (
              <ScriptCard key={s.id} script={s} />
            ))}
        </div>
      </section>

      <section className="container-page py-6">
        <div className="grid gap-8 lg:grid-cols-[0.82fr_1.18fr] lg:items-start">
          <div>
            <SectionHeading
              eyebrow="Sales math"
              title="Work backward from your income goal."
              description="The math gets to one number: how many real conversations you need each business day."
            />
            <ol className="prose-lf mt-4 list-decimal space-y-2 pl-5 text-base">
              <li>
                Start with your income goal and average loan amount.
              </li>
              <li>
                Choose the compensation model that matches your role.
              </li>
              <li>
                Adjust closing, application, prequal, and conversation
                assumptions.
              </li>
              <li>
                Use the weekly and daily conversation targets to plan your
                calendar.
              </li>
            </ol>
            <p className="prose-lf mt-3 text-base">
              For most newer LOs, the output often points to a clear daily
              conversation target. Use it for planning, not promises.
            </p>
          </div>
          <SalesMathCalculator />
        </div>
      </section>

      <section className="container-page py-6">
        <SectionHeading
          eyebrow="Weekly operating rhythm"
          title="Your week, in one page."
        />
        <div className="mt-6 grid gap-5 md:grid-cols-3">
          <div className="card">
            <h3 className="h-display text-lg">Monday. Plan the week.</h3>
            <p className="prose-lf mt-2 text-sm">
              30 minutes. Review pipeline, name 5 priority partners, list 20 past
              clients to touch, pick the week's content topic.
            </p>
          </div>
          <div className="card">
            <h3 className="h-display text-lg">Tuesday to Thursday. Execute.</h3>
            <p className="prose-lf mt-2 text-sm">
              Block 8 to 10 a.m. for outbound. 10 to 12 for applications and pre
              quals. Afternoons for active deals and partner meetings.
            </p>
          </div>
          <div className="card">
            <h3 className="h-display text-lg">Friday. Review.</h3>
            <p className="prose-lf mt-2 text-sm">
              15 minute production review with coach or team leader. What
              worked, what did not, what is the one improvement next week.
            </p>
          </div>
        </div>
      </section>

      <section
        id="first-conversations"
        className="container-page py-12 scroll-mt-24"
      >
        <SectionHeading
          eyebrow="Where to find your first 25 conversations"
          title="Practical sources, grouped by warmth."
          description="Start with people who already know you, people you already serve, and partners who already help the same clients."
        />
        <div className="mt-6 grid gap-5 md:grid-cols-2">
          {conversationSources.map((group) => (
            <article key={group.group} className="card">
              <h3 className="h-display text-lg">{group.group}</h3>
              <p className="prose-lf mt-1 text-sm text-lf-slate">
                {group.description}
              </p>
              <ul className="prose-lf mt-3 list-disc space-y-1 pl-5 text-sm">
                {group.examples.map((e) => (
                  <li key={e}>{e}</li>
                ))}
              </ul>
            </article>
          ))}
        </div>
      </section>

      <section className="container-page py-12">
        <SectionHeading
          eyebrow="Scripts"
          title="First follow up scripts."
          description="Use these starting Monday. Confirm your NMLS ID is in your signature. No specific rates, payments, or fees in any 101 outbound message."
        />
        <div className="mt-6 grid gap-5 md:grid-cols-2">
          {module101Scripts
            .filter((s) => s.id !== "broker-value-prop-30s")
            .map((s) => (
              <ScriptCard key={s.id} script={s} />
            ))}
        </div>
      </section>

      <section className="container-page py-12">
        <SectionHeading
          eyebrow="AI prompt"
          title="Your first AI draft helper prompt."
          description="Paste simple context into AI. Read the draft. Make it sound like you before using it."
        />
        <div className="mt-6 grid gap-5 md:grid-cols-2">
          {module101Prompts.map((p) => (
            <PromptCard key={p.id} prompt={p} />
          ))}
        </div>
      </section>

      <ModuleSummarySections module={module101} />

      <section className="container-page pb-16">
        <p className="max-w-3xl text-sm leading-6 text-lf-slate">
          Borrower-facing, Realtor-facing, and marketing use should follow the
          proper Loan Factory review path. Keep 101 messages simple and avoid
          specific rate, payment, down payment dollar amount, or fee language.
        </p>
      </section>
    </>
  );
}
