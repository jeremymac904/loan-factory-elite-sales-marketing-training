import { CommunityFeedView } from "@/components/CoachingPlatformViews";

export const metadata = { title: "Alliance Member Feed" };

export default function AllianceMemberHome() {
  return <CommunityFeedView program="alliance" />;
}
