import MarketMentorHero from "@/components/market-mentor/MarketMentorHero";
import MarketMentorAccessGate from "@/components/market-mentor/MarketMentorAccessGate";
import MarketScenarioBuilder from "@/components/market-mentor/MarketScenarioBuilder";
import MarketPromptCard from "@/components/market-mentor/MarketPromptCard";
import { getPromptsByCategory } from "@/data/marketMentorPrompts";

export const dynamic = "force-dynamic";
export const metadata = { title: "Buy vs Rent Advisory Lab" };

const fields = [
  { name: "rent", label: "Current rent", placeholder: "$2,800" },
  { name: "rentIncrease", label: "Annual rent increase %", placeholder: "4" },
  { name: "price", label: "Target purchase price", placeholder: "$525,000" },
  { name: "down", label: "Down payment %", placeholder: "5" },
  { name: "rate", label: "Estimated rate %", placeholder: "6.75" },
  { name: "horizon", label: "How long they'd stay (years)", placeholder: "5" },
];

const outputs = [
  {
    heading: "Educational talking points",
    body: "Renting has flexibility and lower commitment. Buying has fixed housing cost (PI) and equity build, with maintenance and taxes. Neither is automatically better — it depends on time horizon and stability.",
  },
  {
    heading: "Realtor value angle",
    body: "For your buyer on the fence, the right framing is time horizon. A 5+ year stay smooths a lot of market noise. A 1–2 year horizon usually favors renting.",
  },
  {
    heading: "First-time buyer script",
    body: "Hey [NAME], renting is the right call for some buyers right now — and that includes you if [SHORT TIME HORIZON / JOB UNCERTAIN]. If your horizon is 5+ years and you're settled, the math usually shifts. Want to walk through both?",
  },
  {
    heading: "Video template (60s)",
    body: "Hook: Buy or rent right now? Honest answer: it depends. Middle: 3 questions to ask yourself before deciding (time horizon, stability, monthly comfort). Close: DM me your scenario and I'll run both.",
  },
  {
    heading: "Objection roleplay",
    body: "Buyer says: 'I'd rather just keep renting.' Response: validate, ask one curious question (what would change your mind), set follow-up. Do not argue.",
  },
];

export default function BuyVsRentPage() {
  const prompts = getPromptsByCategory("buy_vs_rent");

  return (
    <MarketMentorAccessGate>
      <MarketMentorHero
        title="Buy vs Rent Advisory Lab"
        subtitle="Help a borrower think through rent vs ownership. Educational only. No guarantees, no wealth promise."
        tierBadge="Mastery"
        breadcrumb={[
          { label: "Market Mentor", href: "/market-mentor/" },
          { label: "Buy vs Rent", href: "/market-mentor/buy-vs-rent/" },
        ]}
      />

      <section className="container-page py-10">
        <MarketScenarioBuilder
          fields={fields}
          outputHeading="Scenario outputs"
          outputs={outputs}
          responsibleLabel="Educational. Do not promise appreciation. Do not guarantee savings. Use as a conversation starter."
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
