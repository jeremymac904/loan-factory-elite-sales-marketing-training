import RoleDashboardPage from "@/components/RoleDashboardPage";
import { getRoleDashboard } from "@/data/roleDashboards";

export const metadata = { title: "Marketing Dashboard" };

export default function MarketingPage() {
  return <RoleDashboardPage dashboard={getRoleDashboard("marketing")} />;
}
