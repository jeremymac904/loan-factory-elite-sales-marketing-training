import LoFallbackGate from "@/components/access/LoFallbackGate";
import RoleDashboardPage from "@/components/RoleDashboardPage";
import { getRoleDashboard } from "@/data/roleDashboards";

export const dynamic = "force-dynamic";
export const metadata = { title: "LO Development Dashboard" };

export default function LoDevelopmentPage() {
  return (
    <LoFallbackGate
      gate="lo-development"
      surfaceLabel="LO Development"
      explanation="The LO Development command center is for the internal LO Development team. As a Loan Officer, you do not manage this surface."
      destinations={[
        {
          title: "Resources",
          description:
            "Scripts, guides, and downloadable tools to support your pipeline and partner outreach.",
          href: "/resources/",
          cta: "Open Resources",
        },
        {
          title: "Find support",
          description:
            "Route training, coaching, and system questions to the right internal contact.",
          href: "/support-routing/",
          cta: "Find the right support person",
        },
      ]}
    >
      <RoleDashboardPage dashboard={getRoleDashboard("lo-development")} />
    </LoFallbackGate>
  );
}
