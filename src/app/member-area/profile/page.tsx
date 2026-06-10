import { ProfileView } from "@/components/CoachingPlatformViews";
import { getCoachingAccess } from "@/lib/coachingAccess";

export const dynamic = "force-dynamic";
export const metadata = { title: "Profile" };

export default async function ProfilePage() {
  const access = await getCoachingAccess();
  const program = access.tier === "alliance" ? "alliance" : "mastery";
  return <ProfileView program={program} />;
}
