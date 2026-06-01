import { redirect } from "next/navigation";
import AccessNotice from "@/components/AccessNotice";
import { isBetaPreviewEnabled } from "@/lib/betaPreview";
import { canAccessGate, getRoleLabel } from "@/lib/supabase/auth";
import { getBetaUserSession } from "@/lib/supabase/session";

export const dynamic = "force-dynamic";
export const metadata = { title: "Support" };

export default async function SupportPage() {
  const session = await getBetaUserSession();
  const previewEnabled = await isBetaPreviewEnabled();

  if (previewEnabled) {
    redirect("/loan-officer-support/");
  }

  if (session.status === "not-configured") {
    return (
      <AccessNotice surfaceLabel="Support" status="not-configured">
        Sign-in setup is not ready in this environment yet.
      </AccessNotice>
    );
  }

  if (session.status === "signed-out") {
    return (
      <AccessNotice surfaceLabel="Support" status="signed-out">
        Support routing is available after you sign in with an approved Loan
        Factory Google account.
      </AccessNotice>
    );
  }

  if (session.status === "pending") {
    return (
      <AccessNotice surfaceLabel="Support" status="pending">
        Your account is signed in, but it is not approved yet.
      </AccessNotice>
    );
  }

  const allowed = canAccessGate("support", session.profile, session.permissions);

  if (!allowed) {
    return (
      <AccessNotice
        surfaceLabel="Support"
        status="access-denied"
        roleLabel={getRoleLabel(session.profile.role)}
      >
        Your current role does not include support routing access.
      </AccessNotice>
    );
  }

  redirect("/loan-officer-support/");
}
