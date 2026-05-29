import MarketMentorHero from "@/components/market-mentor/MarketMentorHero";
import MarketMentorAccessGate from "@/components/market-mentor/MarketMentorAccessGate";
import MarketPromptCard from "@/components/market-mentor/MarketPromptCard";
import { getPromptsByCategory } from "@/data/marketMentorPrompts";
import { scriptTemplates } from "@/data/marketMentorTemplates";

export const dynamic = "force-dynamic";
export const metadata = { title: "Realtor Market Expert Kit" };

const realtorScripts = scriptTemplates.filter((s) =>
  s.channel.startsWith("realtor") || s.channel === "social_post" || s.channel === "facegram_post",
);

const buildSections = [
  {
    title: "Weekly Realtor market update builder",
    body: "Pick one datapoint, one buyer angle, one listing angle. Keep under 100 words. Make it forwardable.",
  },
  {
    title: "Open house talking points",
    body: "4 talking points for the agent to use at an open house this weekend. Include one buyer-financing question they can use to qualify warm-but-shy attendees.",
  },
  {
    title: "Buyer urgency talking points",
    body: "Frame urgency through time horizon, not market timing. Avoid 'rates are about to spike' language.",
  },
  {
    title: "Seller / listing support angle",
    body: "Frame for the listing agent: market datapoint that helps them have a productive seller conversation this week.",
  },
];

export default function RealtorUpdatePage() {
  const prompts = getPromptsByCategory("realtor");

  return (
    <MarketMentorAccessGate>
      <MarketMentorHero
        title="Realtor Market Expert Kit"
        subtitle="Be more useful to your Realtor partners — weekly update builders, open house talking points, email, text, social drafts, FaceGram seed posts."
        tierBadge="Mastery"
        breadcrumb={[
          { label: "Market Mentor", href: "/market-mentor/" },
          { label: "Realtor Update", href: "/market-mentor/realtor-update/" },
        ]}
      />

      <section className="container-page py-10">
        <h2 className="h-display text-2xl">Build sections</h2>
        <div className="mt-6 grid gap-4 md:grid-cols-2">
          {buildSections.map((section) => (
            <article key={section.title} className="card">
              <h3 className="h-display text-base">{section.title}</h3>
              <p className="prose-lf mt-2 text-sm">{section.body}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="container-page pb-10">
        <h2 className="h-display text-2xl">Script templates</h2>
        <div className="mt-6 grid gap-4 md:grid-cols-2">
          {realtorScripts.map((script) => (
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

      <section className="container-page pb-12">
        <h2 className="h-display text-2xl">AI Twin prompts</h2>
        <div className="mt-6 grid gap-4 md:grid-cols-2">
          {prompts.map((prompt) => (
            <MarketPromptCard key={prompt.slug} prompt={prompt} />
          ))}
        </div>
      </section>
    </MarketMentorAccessGate>
  );
}
