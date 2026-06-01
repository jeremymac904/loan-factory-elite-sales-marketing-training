import FaceGramExperience from "@/components/FaceGramExperience";
import FaceGramAccessNotice from "@/components/FaceGramAccessNotice";
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

  // Signed-out / not-configured visitors land INSIDE FaceGram — the real app
  // shell + sample feed in READ-ONLY mode (Facebook-style), NOT a marketing
  // landing page. Every interaction is locked behind a sign-in prompt. Sample
  // content only; no real posts/comments/profiles/private data (readOnly forces
  // canPost=false and the feed renders the bundled faceGramPosts sample set).
  if (session.status === "not-configured" || session.status === "signed-out") {
    return <FaceGramExperience readOnly />;
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
