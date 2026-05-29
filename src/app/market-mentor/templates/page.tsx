import MarketMentorHero from "@/components/market-mentor/MarketMentorHero";
import MarketMentorAccessGate from "@/components/market-mentor/MarketMentorAccessGate";
import MarketPromptCard from "@/components/market-mentor/MarketPromptCard";
import MarketVideoTemplateCard from "@/components/market-mentor/MarketVideoTemplateCard";
import {
  marketMentorPrompts,
} from "@/data/marketMentorPrompts";
import {
  videoTemplates,
  scriptTemplates,
  marketObjectionGenome,
} from "@/data/marketMentorTemplates";

export const dynamic = "force-dynamic";
export const metadata = { title: "Market Mentor Template Library" };

export default function TemplatesPage() {
  return (
    <MarketMentorAccessGate>
      <MarketMentorHero
        title="Template Library"
        subtitle="Every reusable script, talking point, prompt card, and HeyGen video template across Market Mentor Studio."
        tierBadge="Mastery"
        breadcrumb={[
          { label: "Market Mentor", href: "/market-mentor/" },
          { label: "Templates", href: "/market-mentor/templates/" },
        ]}
      />

      <section className="container-page py-10">
        <h2 className="h-display text-2xl">Script templates</h2>
        <p className="prose-lf mt-2 text-sm text-lf-slate">
          Drop-in starting points for borrower calls, texts, emails, and Realtor
          updates.
        </p>
        <div className="mt-6 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {scriptTemplates.map((script) => (
            <article key={script.slug} className="card">
              <h3 className="h-display text-base">{script.title}</h3>
              <p className="text-xs font-semibold uppercase tracking-wide text-lf-slate">
                {script.channel.replaceAll("_", " ")}
              </p>
              <pre className="mt-3 overflow-x-auto rounded-lg border border-lf-line bg-lf-mist p-3 text-xs leading-relaxed whitespace-pre-wrap">
                {script.body}
              </pre>
            </article>
          ))}
        </div>
      </section>

      <section className="container-page pb-10">
        <h2 className="h-display text-2xl">Video templates</h2>
        <div className="mt-6 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {videoTemplates.map((template) => (
            <MarketVideoTemplateCard
              key={template.slug}
              template={template}
              heygenConnected={false}
            />
          ))}
        </div>
      </section>

      <section className="container-page pb-10">
        <h2 className="h-display text-2xl">AI prompt library</h2>
        <div className="mt-6 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {marketMentorPrompts.map((prompt) => (
            <MarketPromptCard key={prompt.slug} prompt={prompt} />
          ))}
        </div>
      </section>

      <section className="container-page pb-12">
        <h2 className="h-display text-2xl">Market Objection Genome</h2>
        <p className="prose-lf mt-2 text-sm text-lf-slate">
          Common market and rate objections with borrower response, Realtor
          response, short text, call script, video script, roleplay scenario,
          and AI Twin prompt.
        </p>
        <div className="mt-6 grid gap-4">
          {marketObjectionGenome.map((entry) => (
            <article key={entry.slug} className="card">
              <header className="flex flex-wrap items-start justify-between gap-2">
                <h3 className="h-display text-base">{entry.objection}</h3>
                <span className="rounded-full bg-lf-mist px-2 py-0.5 text-[11px] font-semibold text-lf-charcoal">
                  {entry.category}
                </span>
              </header>
              <details className="mt-3">
                <summary className="cursor-pointer text-xs font-semibold uppercase tracking-wide text-lf-charcoal">
                  See all responses
                </summary>
                <div className="mt-3 grid gap-3 text-sm">
                  <div>
                    <p className="text-[11px] font-semibold uppercase tracking-wide text-lf-slate">
                      Borrower response
                    </p>
                    <p className="prose-lf mt-1">{entry.response.borrower}</p>
                  </div>
                  <div>
                    <p className="text-[11px] font-semibold uppercase tracking-wide text-lf-slate">
                      Realtor response
                    </p>
                    <p className="prose-lf mt-1">{entry.response.realtor}</p>
                  </div>
                  <div>
                    <p className="text-[11px] font-semibold uppercase tracking-wide text-lf-slate">
                      Short text
                    </p>
                    <p className="prose-lf mt-1">{entry.response.textResponse}</p>
                  </div>
                  <div>
                    <p className="text-[11px] font-semibold uppercase tracking-wide text-lf-slate">
                      Call script
                    </p>
                    <p className="prose-lf mt-1">{entry.response.callScript}</p>
                  </div>
                  <div>
                    <p className="text-[11px] font-semibold uppercase tracking-wide text-lf-slate">
                      Video script
                    </p>
                    <p className="prose-lf mt-1">{entry.response.videoScript}</p>
                  </div>
                  <div>
                    <p className="text-[11px] font-semibold uppercase tracking-wide text-lf-slate">
                      Roleplay scenario
                    </p>
                    <p className="prose-lf mt-1">{entry.response.roleplayScenario}</p>
                  </div>
                  <div>
                    <p className="text-[11px] font-semibold uppercase tracking-wide text-lf-slate">
                      AI Twin prompt
                    </p>
                    <pre className="mt-1 overflow-x-auto rounded-lg border border-lf-line bg-lf-mist p-3 text-xs whitespace-pre-wrap">
                      {entry.response.aiTwinPrompt}
                    </pre>
                  </div>
                </div>
              </details>
            </article>
          ))}
        </div>
      </section>
    </MarketMentorAccessGate>
  );
}
