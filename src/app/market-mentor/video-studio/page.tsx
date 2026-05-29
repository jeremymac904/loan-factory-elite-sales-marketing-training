import Link from "next/link";
import MarketMentorHero from "@/components/market-mentor/MarketMentorHero";
import MarketMentorAccessGate from "@/components/market-mentor/MarketMentorAccessGate";
import MarketVideoTemplateCard from "@/components/market-mentor/MarketVideoTemplateCard";
import { videoTemplates } from "@/data/marketMentorTemplates";

export const dynamic = "force-dynamic";
export const metadata = { title: "AI Avatar Video Studio" };

// Connection status is wired into a future google_connections / ai_twins
// record. For now, default to disconnected and show setup UX.
const heygenConnected = false;

const setupChecklist = [
  {
    label: "Loan Factory HeyGen connection",
    status: heygenConnected ? "ready" : "setup",
    description: "Per-user HeyGen connection. Created by admin or AI Assistant Settings.",
  },
  {
    label: "My Avatar",
    status: "setup",
    description: "Upload or select an avatar in HeyGen Studio before generating video.",
  },
  {
    label: "My Voice",
    status: "setup",
    description: "Approve your AI voice clone in HeyGen Studio before generating bilingual or branded videos.",
  },
  {
    label: "Generated video history",
    status: "future",
    description: "Generated drafts will appear here once HeyGen is connected.",
  },
];

const statusBadges: Record<string, { label: string; className: string }> = {
  ready: { label: "Ready", className: "bg-green-100 text-green-800" },
  setup: { label: "Setup needed", className: "bg-yellow-100 text-yellow-800" },
  future: { label: "Coming soon", className: "bg-lf-mist text-lf-slate" },
};

export default function VideoStudioPage() {
  return (
    <MarketMentorAccessGate>
      <MarketMentorHero
        title="AI Avatar Video Studio"
        subtitle="Powered by HeyGen connection. Market update, Realtor weekly, coaching recap, training nugget, buyer education, bilingual, leadership briefing, and mastermind templates."
        tierBadge="Mastery"
        breadcrumb={[
          { label: "Market Mentor", href: "/market-mentor/" },
          { label: "Video Studio", href: "/market-mentor/video-studio/" },
        ]}
      >
        <div className="flex flex-wrap gap-2">
          <Link href="/settings/google/" className="btn-secondary border-white/30 bg-white/10 text-sm text-white hover:border-white">
            Connections
          </Link>
          <Link href="/market-mentor/templates/" className="btn-secondary border-white/30 bg-white/10 text-sm text-white hover:border-white">
            All templates
          </Link>
        </div>
      </MarketMentorHero>

      <section className="container-page py-10">
        <h2 className="h-display text-2xl">Connection status</h2>
        <p className="prose-lf mt-2 text-sm text-lf-slate">
          AI Avatar Video Studio supports a future HeyGen MCP architecture or a
          direct HeyGen API integration. No live API call is made yet — generate
          buttons stay disabled until your per-user connection is approved.
        </p>
        <div className="mt-6 grid gap-3">
          {setupChecklist.map((item) => {
            const badge = statusBadges[item.status];
            return (
              <div
                key={item.label}
                className="card flex flex-wrap items-center justify-between gap-3"
              >
                <div>
                  <h3 className="text-base font-semibold text-lf-charcoal">
                    {item.label}
                  </h3>
                  <p className="mt-1 text-sm text-lf-slate">
                    {item.description}
                  </p>
                </div>
                <span
                  className={`rounded-full px-2.5 py-0.5 text-xs font-semibold ${badge.className}`}
                >
                  {badge.label}
                </span>
              </div>
            );
          })}
        </div>
      </section>

      <section className="container-page pb-12">
        <h2 className="h-display text-2xl">Video templates</h2>
        <p className="prose-lf mt-2 text-sm text-lf-slate">
          Bilingual, leadership briefing, and mastermind prompt templates are
          Loan Factory Alliance.
        </p>
        <div className="mt-6 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {videoTemplates.map((template) => (
            <MarketVideoTemplateCard
              key={template.slug}
              template={template}
              heygenConnected={heygenConnected}
            />
          ))}
        </div>
      </section>
    </MarketMentorAccessGate>
  );
}
