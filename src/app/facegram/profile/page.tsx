import Link from "next/link";
import { redirect } from "next/navigation";

export const metadata = { title: "FaceGram Profile" };

export default function FaceGramProfileRedirect() {
  redirect("/profile/");
  return (
    <section className="container-page py-16">
      <div className="card max-w-2xl">
        <p className="prose-lf">Your FaceGram identity uses your main profile.</p>
        <Link href="/profile/" className="btn-primary mt-6 inline-block">
          Open profile
        </Link>
      </div>
    </section>
  );
}
