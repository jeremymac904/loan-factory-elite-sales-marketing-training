import { redirect } from "next/navigation";
import { CommunityFeedView } from "@/components/CoachingPlatformViews";
import { getCoachingAccess } from "@/lib/coachingAccess";
import { isBetaPreviewEnabled } from "@/lib/betaPreview";

export const dynamic = "force-dynamic";
export const metadata = { title: "Member Feed" };

export default async function MemberAreaPage() {
  const previewEnabled = await isBetaPreviewEnabled();
  if (!previewEnabled) {
    const access = await getCoachingAccess();
    if (access.status === "approved" && access.tier === "alliance") {
      redirect("/member-area/alliance/");
    }
  }
  return <CommunityFeedView program="mastery" />;
}
