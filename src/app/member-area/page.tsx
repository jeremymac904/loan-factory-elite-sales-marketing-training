import { redirect } from "next/navigation";
import AccessNotice from "@/components/AccessNotice";
import { getCoachingAccess } from "@/lib/coachingAccess";
import { getRoleDashboardHref } from "@/lib/supabase/auth";

export const dynamic = "force-dynamic";
export const metadata = { title: "Member Area" };

export default async function MemberAreaPage() {
  const access = await getCoachingAccess();

  if (access.status === "not-configured") {
    return (
      <AccessNotice surfaceLabel="Member Area" status="not-configured">
        Sign-in setup is not ready in this environment yet.
      </AccessNotice>
    );
  }

  if (access.status === "signed-out") {
    return (
      <AccessNotice surfaceLabel="Member Area" status="signed-out">
        The Member Area is for approved Loan Factory coaching members.
      </AccessNotice>
    );
  }

  if (access.status === "pending") {
    return (
      <AccessNotice surfaceLabel="Member Area" status="pending">
        Your account is signed in, but it is not approved for the coaching
        Member Area yet.
      </AccessNotice>
    );
  }

  if (access.canAlliance) {
    redirect("/member-area/alliance/");
  }

  if (access.canLoMastery) {
    redirect("/member-area/lo-mastery/");
  }

  redirect(getRoleDashboardHref(access.effectiveRole));
}
