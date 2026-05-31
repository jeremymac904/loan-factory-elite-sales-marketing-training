import { redirect } from "next/navigation";

export default function LeaderboardsLegacyRedirect() {
  redirect("/member-area/leaderboards/");
}
