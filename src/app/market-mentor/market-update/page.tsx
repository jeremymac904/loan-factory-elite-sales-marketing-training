import MarketMentorHero from "@/components/market-mentor/MarketMentorHero";
import MarketUpdateInterpreter from "@/components/market-mentor/MarketUpdateInterpreter";
import MarketMentorAccessGate from "@/components/market-mentor/MarketMentorAccessGate";

export const dynamic = "force-dynamic";
export const metadata = { title: "Market Update Interpreter" };

export default function MarketUpdatePage() {
  return (
    <MarketMentorAccessGate>
      <MarketMentorHero
        title="Market Update Interpreter"
        subtitle="Paste a market headline, rate report, or internal note. Get borrower, Realtor, social, video, and email versions you can edit."
        tierBadge="Mastery"
        breadcrumb={[
          { label: "Market Mentor", href: "/market-mentor/" },
          { label: "Market Update", href: "/market-mentor/market-update/" },
        ]}
      />

      <section className="container-page py-10">
        <MarketUpdateInterpreter />
      </section>
    </MarketMentorAccessGate>
  );
}
