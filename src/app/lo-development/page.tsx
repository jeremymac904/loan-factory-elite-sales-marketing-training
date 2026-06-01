import RoleDashboardPage from "@/components/RoleDashboardPage";
import RoleGate from "@/components/RoleGate";
import { getRoleDashboard } from "@/data/roleDashboards";

export const dynamic = "force-dynamic";
export const metadata = { title: "LO Development Dashboard" };

export default function LoDevelopmentPage() {
  return (
    <RoleGate gate="lo-development">
      <RoleDashboardPage dashboard={getRoleDashboard("lo-development")} />
    </RoleGate>
  );
}
