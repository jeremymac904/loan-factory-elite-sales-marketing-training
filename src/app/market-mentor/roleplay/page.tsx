import MarketMentorHero from "@/components/market-mentor/MarketMentorHero";
import MarketMentorAccessGate from "@/components/market-mentor/MarketMentorAccessGate";
import MarketRoleplayCard from "@/components/market-mentor/MarketRoleplayCard";
import { isBetaPreviewEnabled } from "@/lib/betaPreview";
import { getBetaUserSession } from "@/lib/supabase/session";
import { hasMarketMentorAlliance } from "@/data/marketMentor";
import { getRoleplaysByTier } from "@/data/marketMentorRoleplays";

export const dynamic = "force-dynamic";
export const metadata = { title: "Market Roleplay Arena" };

export default async function RoleplayPage() {
  const previewEnabled = await isBetaPreviewEnabled();
  const session = await getBetaUserSession();
  const role = previewEnabled
    ? "master_admin"
    : session.status === "approved"
      ? session.profile.role ?? null
      : null;
  const alliance = hasMarketMentorAlliance(role);
  const roleplays = getRoleplaysByTier(alliance ? "alliance_449" : "mastery_249");

  return (
    <MarketMentorAccessGate>
      <MarketMentorHero
        title="Market Roleplay Arena"
        subtitle="Practice scenarios for market conversations. Use as solo prep or paste the starter prompt into your AI Twin / coaching assistant."
        tierBadge={alliance ? "Alliance" : "Mastery"}
        breadcrumb={[
          { label: "Market Mentor", href: "/market-mentor/" },
          { label: "Roleplay", href: "/market-mentor/roleplay/" },
        ]}
      />

      <section className="container-page py-10">
        <div className="card mb-6 border-yellow-200 bg-yellow-50">
          <p className="text-sm font-semibold text-yellow-900">
            Live AI roleplay connection pending. Launch buttons reveal a
            starter prompt you can copy into your AI Twin or coaching assistant.
            No API call is made until live roleplay is connected.
          </p>
        </div>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {roleplays.map((rp) => (
            <MarketRoleplayCard key={rp.slug} roleplay={rp} />
          ))}
        </div>
      </section>
    </MarketMentorAccessGate>
  );
}
