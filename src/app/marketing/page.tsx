import RoleDashboardPage from "@/components/RoleDashboardPage";
import RoleGate from "@/components/RoleGate";
import { getRoleDashboard } from "@/data/roleDashboards";

export const dynamic = "force-dynamic";
export const metadata = { title: "Marketing Dashboard" };

export default function MarketingPage() {
  return (
    <RoleGate gate="marketing">
      <RoleDashboardPage dashboard={getRoleDashboard("marketing")} />
    </RoleGate>
  );
}
