import { redirect } from "next/navigation";

export default function Page() {
  redirect("/member-area/resources/?tab=tools");
}
