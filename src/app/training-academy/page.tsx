import RoleDashboardPage from "@/components/RoleDashboardPage";
import RoleGate from "@/components/RoleGate";
import { getRoleDashboard } from "@/data/roleDashboards";

export const metadata = { title: "Training Academy Dashboard" };

export default function TrainingAcademyPage() {
  return (
    <RoleGate gate="training-academy">
      <RoleDashboardPage dashboard={getRoleDashboard("training-academy")} />
    </RoleGate>
  );
}
