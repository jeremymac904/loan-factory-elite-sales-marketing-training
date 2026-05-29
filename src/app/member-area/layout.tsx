import Link from "next/link";
import { ReactNode } from "react";
import { isBetaPreviewEnabled } from "@/lib/betaPreview";
import { getBetaUserSession } from "@/lib/supabase/session";

// Gate the entire /member-area subtree (including /member-area/lo-mastery and
// /member-area/alliance) in one place. Without this, the child pages render
// their own content with no session check, so the parent's sign-in gate could
// be bypassed by navigating directly to a child URL.
export default async function MemberAreaLayout({
  children,
}: {
  children: ReactNode;
}) {
  const session = await getBetaUserSession();
  const previewEnabled = await isBetaPreviewEnabled();

  if (!previewEnabled && session.status !== "approved") {
    const pending = session.status === "pending";
    return (
      <section className="container-page py-16">
        <div className="card max-w-2xl">
          <h1 className="h-display text-3xl">
            {pending ? "Access pending" : "Sign in required"}
          </h1>
          <p className="prose-lf mt-3">
            {pending
              ? "Your account is signed in, but it is not approved for the coaching Member Area yet."
              : "The Member Area is for approved Loan Factory coaching members."}
          </p>
          <Link
            href={pending ? "/access-pending/" : "/login/"}
            className="btn-primary mt-6 inline-block"
          >
            {pending ? "View pending status" : "Sign in"}
          </Link>
        </div>
      </section>
    );
  }

  return <>{children}</>;
}
