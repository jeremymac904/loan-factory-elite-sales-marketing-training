import MarketMentorCard from "./MarketMentorCard";
import type { MarketMentorTool } from "@/data/marketMentor";

type Props = {
  tools: MarketMentorTool[];
  hasFullAccess: boolean;
  hasAlliance: boolean;
};

const statusBadge: Record<
  MarketMentorTool["status"],
  { label: string; tone: "neutral" | "orange" | "green" | "yellow" | "purple" }
> = {
  live: { label: "Live", tone: "green" },
  staged: { label: "Staged", tone: "orange" },
  needs_ai_connection: { label: "AI setup needed", tone: "yellow" },
};

export default function MarketMentorToolGrid({
  tools,
  hasFullAccess,
  hasAlliance,
}: Props) {
  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
      {tools.map((tool) => {
        const isAllianceLocked = tool.tier === "alliance_449" && !hasAlliance;
        const isLocked = !hasFullAccess || isAllianceLocked;
        const badge = statusBadge[tool.status];
        return (
          <MarketMentorCard
            key={tool.slug}
            title={tool.title}
            description={tool.description}
            href={isLocked ? undefined : tool.href}
            badge={isAllianceLocked ? "Alliance only" : badge.label}
            badgeTone={isAllianceLocked ? "purple" : badge.tone}
            locked={isLocked}
          />
        );
      })}
    </div>
  );
}
