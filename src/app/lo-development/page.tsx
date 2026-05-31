import RoleDashboardPage from "@/components/RoleDashboardPage";
import { getRoleDashboard } from "@/data/roleDashboards";

export const metadata = { title: "LO Development Dashboard" };

export default function LoDevelopmentPage() {
  return <RoleDashboardPage dashboard={getRoleDashboard("lo-development")} />;
}
