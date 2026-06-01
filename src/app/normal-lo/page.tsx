import RoleDashboardPage from "@/components/RoleDashboardPage";
import RoleGate from "@/components/RoleGate";
import { getRoleDashboard } from "@/data/roleDashboards";

export const metadata = { title: "Loan Officer Dashboard" };

export default function NormalLoPage() {
  return (
    <RoleGate gate="normal-lo">
      <RoleDashboardPage dashboard={getRoleDashboard("normal-lo")} />
    </RoleGate>
  );
}
