import { redirect } from "next/navigation";
import { CommunityFeedView } from "@/components/CoachingPlatformViews";
import { getCoachingAccess } from "@/lib/coachingAccess";
import { isBetaPreviewEnabled } from "@/lib/betaPreview";

export const dynamic = "force-dynamic";
export const metadata = { title: "Alliance Member Feed" };

// Strict program separation: Mastery members cannot open the Alliance feed.
// (Data is also enforced by RLS — this is the navigation-level gate.)
export default async function AllianceMemberHome() {
  const previewEnabled = await isBetaPreviewEnabled();
  if (!previewEnabled) {
    const access = await getCoachingAccess();
    if (access.status === "approved" && !access.isStaff && access.tier !== "alliance") {
      redirect("/member-area/");
    }
  }
  return <CommunityFeedView program="alliance" />;
}
