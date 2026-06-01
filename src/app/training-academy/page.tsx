import LoFallbackGate from "@/components/access/LoFallbackGate";
import RoleDashboardPage from "@/components/RoleDashboardPage";
import { getRoleDashboard } from "@/data/roleDashboards";

export const dynamic = "force-dynamic";
export const metadata = { title: "Training Academy Dashboard" };

export default function TrainingAcademyPage() {
  return (
    <LoFallbackGate
      gate="training-academy"
      surfaceLabel="Training Academy"
      explanation="The Training Academy dashboard is the internal staff workspace for building and managing curriculum. As a Loan Officer, you do not manage this surface."
      destinations={[
        {
          title: "Training Library",
          description:
            "Your full training library — foundations, workflows, and on-demand lessons.",
          href: "/training-library/",
          cta: "Open Training Library",
        },
        {
          title: "Sales Training",
          description:
            "Sales and Marketing 101-601 and the scripts that move your pipeline forward.",
          href: "/sales-training/",
          cta: "Open Sales Training",
        },
      ]}
    >
      <RoleDashboardPage dashboard={getRoleDashboard("training-academy")} />
    </LoFallbackGate>
  );
}
