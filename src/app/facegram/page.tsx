import FaceGramExperience from "@/components/FaceGramExperience";
import FaceGramAccessNotice from "@/components/FaceGramAccessNotice";
import { canAccessFaceGram, getRoleLabel } from "@/lib/supabase/auth";
import { getBetaUserSession } from "@/lib/supabase/session";

export const metadata = { title: "FaceGram" };
export const dynamic = "force-dynamic";

export default async function FaceGramPage() {
  const session = await getBetaUserSession();

  if (session.status === "not-configured") {
    return <FaceGramAccessNotice status="not-configured" />;
  }

  if (session.status === "signed-out") {
    return <FaceGramAccessNotice status="signed-out" />;
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
