import { redirect } from "next/navigation";

export const metadata = { title: "Apply" };

// The application IS the Google Form — this route exists only so old links
// and the nav land in the right place.
export default function ApplyRedirect() {
  redirect("https://forms.gle/LiJmtVoJ8wKW7wEJ8");
}
