import RoleDashboardPage from "@/components/RoleDashboardPage";
import { getRoleDashboard } from "@/data/roleDashboards";

export const metadata = { title: "Loan Officer Support Dashboard" };

export default function LoanOfficerSupportPage() {
  return (
    <RoleDashboardPage dashboard={getRoleDashboard("loan-officer-support")} />
  );
}
