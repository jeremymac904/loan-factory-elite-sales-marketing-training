import MarketMentorHero from "@/components/market-mentor/MarketMentorHero";
import MarketMentorAccessGate from "@/components/market-mentor/MarketMentorAccessGate";
import MarketScenarioBuilder from "@/components/market-mentor/MarketScenarioBuilder";
import MarketPromptCard from "@/components/market-mentor/MarketPromptCard";
import { getPromptsByCategory } from "@/data/marketMentorPrompts";

export const dynamic = "force-dynamic";
export const metadata = { title: "Debt Consolidation Builder" };

const fields = [
  { name: "balance", label: "Current mortgage balance", placeholder: "$420,000" },
  { name: "currentRate", label: "Current mortgage rate %", placeholder: "3.875" },
  { name: "newRate", label: "Estimated new rate %", placeholder: "6.875" },
  { name: "consumerDebt", label: "Non-mortgage debt to consolidate", placeholder: "$48,000" },
  { name: "consumerPayment", label: "Current monthly consumer debt payment", placeholder: "$1,150" },
  { name: "closingCosts", label: "Estimated refi closing costs", placeholder: "$8,500" },
];

const outputs = [
  {
    heading: "Borrower conversation script",
    body: "I want to walk you through this honestly. Consolidating debt into the mortgage can lower your monthly payment, but it's not free money — you're moving unsecured debt onto your home, often over 30 years. Let's look at monthly cashflow, total interest, and breakeven together.",
  },
  {
    heading: "'This is not free money' framing",
    body: "When we consolidate, we're not erasing debt — we're restructuring it. The monthly comes down because we're stretching the payoff over a longer time. Total interest can be higher unless we keep paying extra. We have to be clear-eyed about that.",
  },
  {
    heading: "Monthly cashflow talking points",
    body: "If consolidating frees up $X/month in cashflow, what's the plan for that cashflow? Apply it back to the mortgage? Build emergency savings? If it just disappears into spending, the move usually doesn't pay off long-term.",
  },
  {
    heading: "Debt risk reminders",
    body: "Two real risks: (1) unsecured debt is now secured by your home, (2) if spending habits don't change, the consumer debt rebuilds. We talk about both upfront, not after.",
  },
  {
    heading: "Refinance breakeven reminder",
    body: "Refinance breakeven in months = closing costs ÷ monthly savings. If you sell or refi again before that, the move didn't pay off. Always compare breakeven to how long you plan to stay.",
  },
  {
    heading: "HeyGen video template (60s)",
    body: "Hook: Thinking about consolidating debt into your mortgage? Middle: 3 honest questions to ask before you do it. (1) what's your plan for the freed cashflow, (2) what's your breakeven, (3) are you committed to not rebuilding the consumer debt. Close: DM me to walk through your scenario.",
  },
];

export default function DebtConsolidationPage() {
  const prompts = getPromptsByCategory("debt_consolidation");

  return (
    <MarketMentorAccessGate>
      <MarketMentorHero
        title="Debt Consolidation Conversation Builder"
        subtitle="Responsible cash-out / consolidation framing. Risk reminders, breakeven, monthly cashflow."
        tierBadge="Mastery"
        breadcrumb={[
          { label: "Market Mentor", href: "/market-mentor/" },
          { label: "Debt Consolidation", href: "/market-mentor/debt-consolidation/" },
        ]}
      />

      <section className="container-page py-10">
        <MarketScenarioBuilder
          fields={fields}
          outputHeading="Scenario outputs"
          outputs={outputs}
          responsibleLabel="Use responsibly. This conversation moves unsecured debt onto a home. Always frame risk honestly."
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
