import MarketMentorHero from "@/components/market-mentor/MarketMentorHero";
import MarketMentorAccessGate from "@/components/market-mentor/MarketMentorAccessGate";
import MarketCertificationProgress from "@/components/market-mentor/MarketCertificationProgress";
import { marketMentorCertificationSteps } from "@/data/marketMentor";

export const dynamic = "force-dynamic";
export const metadata = { title: "Market Mentor Certification" };

export default function CertificationPage() {
  return (
    <MarketMentorAccessGate>
      <MarketMentorHero
        title="Market Mentor Certification"
        subtitle="Internal recognition track. Complete each step at your own pace. Progress is stored locally until a Supabase tracking record is connected."
        tierBadge="Mastery"
        breadcrumb={[
          { label: "Market Mentor", href: "/market-mentor/" },
          { label: "Certification", href: "/market-mentor/certification/" },
        ]}
      />

      <section className="container-page py-10">
        <MarketCertificationProgress steps={marketMentorCertificationSteps} />
      </section>
    </MarketMentorAccessGate>
  );
}
