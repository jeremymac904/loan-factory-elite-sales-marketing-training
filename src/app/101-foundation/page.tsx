import ModuleHero from "@/components/ModuleHero";
import ModuleSummarySections from "@/components/ModuleSummarySections";
import ScriptCard from "@/components/ScriptCard";
import PromptCard from "@/components/PromptCard";
import RecordingPlaceholder from "@/components/RecordingPlaceholder";
import DownloadPlaceholder from "@/components/DownloadPlaceholder";
import ComplianceCallout from "@/components/ComplianceCallout";
import SectionHeading from "@/components/SectionHeading";
import DoThisToday from "@/components/DoThisToday";
import ClassRegistration from "@/components/ClassRegistration";
import GeminiGemCallout from "@/components/GeminiGemCallout";
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
          title="Session materials."
        />
        <div className="mt-6 grid gap-5 md:grid-cols-2">
          <RecordingPlaceholder
            level="101"
            title="The Loan Factory Operating System. Live walkthrough."
            description="Jeremy runs one full Loan Factory LO day from 8 a.m. to 5 p.m. Activity standard, weekly rhythm, first follow ups, AI assisted drafting."
          />
          <DownloadPlaceholder
            title="101 Mortgage Sales Foundation handout"
            format="Word"
            description="Purpose, what you will learn, broker value prop, first call script, tracker basics, today's assignment, compliance notes, next step."
            downloadHref="/downloads/101_foundation_handout.docx"
          />
        </div>
      </section>

      <section className="container-page py-12">
        <SectionHeading
          eyebrow="Broker value proposition"
          title="The 30 second intro every LO uses."
          description="Use this anywhere. Lead with what 240+ wholesale lenders means for the borrower in plain English. Confirm NMLS ID before public use."
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
        <SectionHeading
          eyebrow="Sales math"
          title="Work backward from your income goal."
          description="The math gets to one number. The number of real conversations you need to run every business day."
        />
        <ol className="prose-lf mt-4 list-decimal space-y-2 pl-5 text-base">
          <li>
            Annual income goal divided by average revenue per closing equals
            closings needed.
          </li>
          <li>
            Closings needed divided by your closing rate equals applications
            needed.
          </li>
          <li>
            Applications needed divided by pre qual to app conversion equals pre
            quals needed.
          </li>
          <li>
            Pre quals needed divided by conversation to pre qual conversion
            equals conversations needed.
          </li>
          <li>Divide by 50 working weeks to get a weekly conversation target.</li>
        </ol>
        <p className="prose-lf mt-3 text-base">
          For most new Loan Factory LOs, the answer lands at 5 to 8 real
          conversations per business day.
        </p>
      </section>

      <section className="container-page py-6">
        <SectionHeading
          eyebrow="Weekly operating rhythm"
          title="The week, in one page."
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
          description="The fastest path to 25 logged conversations this week is the people who already know you, the people you already serve, and the partners who already touch the same clients."
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
          title="Your first Gemini Gem AI Twin prompt."
          description="Paste your context into your Gemini Gem AI Twin. Read the draft. Make it sound like you. Send."
        />
        <div className="mt-6">
          <GeminiGemCallout />
        </div>
        <div className="mt-6 grid gap-5 md:grid-cols-2">
          {module101Prompts.map((p) => (
            <PromptCard key={p.id} prompt={p} />
          ))}
        </div>
      </section>

      <ModuleSummarySections module={module101} />

      <section className="container-page pb-16">
        <ComplianceCallout title="Before you send anything public">
          <p>
            Public, borrower facing, and Realtor facing artifacts require
            compliance review. The 101 daily messages keep you safe by avoiding
            any specific rate, payment, down payment dollar amount, or fee.
          </p>
        </ComplianceCallout>
      </section>
    </>
  );
}
