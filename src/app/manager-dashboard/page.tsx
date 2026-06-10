import { redirect } from "next/navigation";

export const metadata = { title: "Manager Dashboard" };

export default function ManagerDashboardRedirect() {
  redirect("/dashboard/");
}
