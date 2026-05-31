import RoleDashboardPage from "@/components/RoleDashboardPage";
import { getRoleDashboard } from "@/data/roleDashboards";

export const metadata = { title: "Training Academy Dashboard" };

export default function TrainingAcademyPage() {
  return <RoleDashboardPage dashboard={getRoleDashboard("training-academy")} />;
}
