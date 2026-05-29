import MarketMentorHero from "@/components/market-mentor/MarketMentorHero";
import MarketMentorAccessGate from "@/components/market-mentor/MarketMentorAccessGate";
import MarketScenarioBuilder from "@/components/market-mentor/MarketScenarioBuilder";
import MarketPromptCard from "@/components/market-mentor/MarketPromptCard";
import { getPromptsByCategory } from "@/data/marketMentorPrompts";

export const dynamic = "force-dynamic";
export const metadata = { title: "Cost of Waiting Builder" };

const fields = [
  { name: "price", label: "Purchase price", placeholder: "$650,000", required: true },
  { name: "down", label: "Down payment %", placeholder: "10" },
  { name: "rate", label: "Estimated rate %", placeholder: "6.875" },
  { name: "rent", label: "Estimated monthly rent if waiting", placeholder: "$3,400" },
  { name: "appreciation", label: "Appreciation assumption % / yr (educational only)", placeholder: "3" },
  { name: "wait", label: "Waiting period in months", placeholder: "12" },
];

const outputs = [
  {
    heading: "Borrower talking points",
    body: "Three things to weigh: (1) what the monthly looks like at today's rate vs your rent, (2) what 12 months of rent adds up to, and (3) what could change if you're ready when your window opens. All numbers are educational estimates only.",
  },
  {
    heading: "Realtor talking points",
    body: "For your buyers on the fence: the math isn't 'now vs later' — it's 'what does each scenario cost.' Happy to run a scenario with their real numbers any time.",
  },
  {
    heading: "Video script (45s)",
    body: "Hook: Waiting to buy? Here's how to think about the cost. Middle: Compare your rent over the waiting period to what your monthly would be if you bought. Don't forget appreciation isn't guaranteed. Close: DM me to run yours.",
  },
  {
    heading: "Text follow-up",
    body: "Hey — quick thought on the wait conversation. Want me to run your numbers both ways so you have the real picture? No pressure either way.",
  },
  {
    heading: "FaceGram post idea",
    body: "When buyers ask 'should I wait?' — the honest answer is 'it depends.' But running the math both ways gives a clear picture. Sharing the framework I use in case it helps anyone this week.",
  },
];

export default function CostOfWaitingPage() {
  const prompts = getPromptsByCategory("cost_of_waiting");

  return (
    <MarketMentorAccessGate>
      <MarketMentorHero
        title="Cost of Waiting Builder"
        subtitle="Build an educational scenario for the cost-of-waiting conversation. Outputs are starting points — always review."
        tierBadge="Mastery"
        breadcrumb={[
          { label: "Market Mentor", href: "/market-mentor/" },
          { label: "Cost of Waiting", href: "/market-mentor/cost-of-waiting/" },
        ]}
      />

      <section className="container-page py-10">
        <MarketScenarioBuilder
          fields={fields}
          outputHeading="Scenario outputs"
          outputs={outputs}
          responsibleLabel="Inputs are for educational scenarios only. The estimate model will be connected to the AI Twin / coaching assistant. Until then this view shows static template outputs."
          submitLabel="Build scenario"
        />
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
