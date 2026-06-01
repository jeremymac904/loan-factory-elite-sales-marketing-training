import FaceGramExperience from "@/components/FaceGramExperience";
import FaceGramAccessNotice from "@/components/FaceGramAccessNotice";
import FaceGramOverview from "@/components/FaceGramOverview";
import { betaPreviewEmail, isBetaPreviewEnabled } from "@/lib/betaPreview";
import { canAccessFaceGram, getRoleLabel } from "@/lib/supabase/auth";
import { getBetaUserSession } from "@/lib/supabase/session";

export const metadata = { title: "FaceGram" };
export const dynamic = "force-dynamic";

export default async function FaceGramPage() {
  const session = await getBetaUserSession();
  const previewEnabled = await isBetaPreviewEnabled();

  if (previewEnabled) {
    return (
      <FaceGramExperience
        initialApprovedEmail={betaPreviewEmail}
        previewMode
      />
    );
  }

  // Signed-out / not-configured visitors get the PUBLIC overview (what FaceGram
  // is + sign-in CTA), NOT a bare "sign in required" gate. No feed/posts/private
  // data render here — the personalized workspace is below, after auth.
  if (session.status === "not-configured" || session.status === "signed-out") {
    return <FaceGramOverview />;
  }

  if (session.status === "pending") {
    return <FaceGramAccessNotice status="pending" />;
  }

  if (!canAccessFaceGram(session.profile, session.permissions)) {
    return (
      <FaceGramAccessNotice
        status="role"
        roleLabel={getRoleLabel(session.profile.role)}
      />
    );
  }

  return <FaceGramExperience initialApprovedEmail={session.profile.email} />;
}
