import RoleDashboardPage from "@/components/RoleDashboardPage";
import { getRoleDashboard } from "@/data/roleDashboards";

export const metadata = { title: "Loan Officer Dashboard" };

export default function NormalLoPage() {
  return <RoleDashboardPage dashboard={getRoleDashboard("normal-lo")} />;
}
