import { ReactNode } from "react";
import { isBetaPreviewEnabled } from "@/lib/betaPreview";
import { getCoachingAccess } from "@/lib/coachingAccess";
import AccessNotice from "@/components/AccessNotice";

// Gate the entire /member-area subtree (including /member-area/lo-mastery and
// /member-area/alliance) in one place. Without this, the child pages render
// their own content with no session check, so the parent's sign-in gate could
// be bypassed by navigating directly to a child URL.
export default async function MemberAreaLayout({
  children,
}: {
  children: ReactNode;
}) {
  const access = await getCoachingAccess();
  const previewEnabled = await isBetaPreviewEnabled();

  if (!previewEnabled) {
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

    if (!access.isMember && !access.isStaff) {
      return (
        <AccessNotice
          surfaceLabel="Member Area"
          status="access-denied"
          roleLabel={access.effectiveRoleLabel}
        >
          Your current role does not include coaching member area access yet.
        </AccessNotice>
      );
    }
  }

  return <>{children}</>;
}
