import { redirect } from "next/navigation";
import AccessNotice from "@/components/AccessNotice";
import { isBetaPreviewEnabled } from "@/lib/betaPreview";
import { getRoleDashboardHref } from "@/lib/supabase/auth";
import { getBetaUserSession } from "@/lib/supabase/session";

export const dynamic = "force-dynamic";
export const metadata = { title: "Dashboard" };

export default async function DashboardPage() {
  const session = await getBetaUserSession();
  const previewEnabled = await isBetaPreviewEnabled();

  if (previewEnabled) {
    redirect("/admin/");
  }

  if (session.status === "not-configured") {
    return (
      <AccessNotice surfaceLabel="Dashboard" status="not-configured">
        Sign-in setup is not ready in this environment yet.
      </AccessNotice>
    );
  }

  if (session.status === "signed-out") {
    return (
      <AccessNotice surfaceLabel="Dashboard" status="signed-out">
        The dashboard is available after you sign in with an approved Loan
        Factory Google account.
      </AccessNotice>
    );
  }

  if (session.status === "pending") {
    return (
      <AccessNotice surfaceLabel="Dashboard" status="pending">
        Your account is signed in, but it is not approved yet.
      </AccessNotice>
    );
  }

  const target = getRoleDashboardHref(session.profile.role);
  redirect(target);
}
