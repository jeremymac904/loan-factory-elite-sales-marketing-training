import RoleDashboardPage from "@/components/RoleDashboardPage";
import RoleGate from "@/components/RoleGate";
import { getRoleDashboard } from "@/data/roleDashboards";

export const metadata = { title: "Loan Officer Support Dashboard" };

export default function LoanOfficerSupportPage() {
  return (
    <RoleGate gate="loan-officer-support">
      <RoleDashboardPage dashboard={getRoleDashboard("loan-officer-support")} />
    </RoleGate>
  );
}
