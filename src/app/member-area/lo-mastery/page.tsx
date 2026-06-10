import { redirect } from "next/navigation";

export const metadata = { title: "LO Mastery" };

export default function LoMasteryRedirect() {
  redirect("/member-area/");
}
