import Link from "next/link";
import { isBetaPreviewEnabled } from "@/lib/betaPreview";
import { getBetaUserSession } from "@/lib/supabase/session";
import FaceGramMessagesView from "@/components/FaceGramMessagesView";
import { approvedUserSeeds } from "@/data/approvedUsers";

export const dynamic = "force-dynamic";
export const metadata = { title: "FaceGram Messages" };

export default async function FaceGramMessagesPage() {
  const session = await getBetaUserSession();
  const previewEnabled = await isBetaPreviewEnabled();

  if (!previewEnabled && session.status !== "approved") {
    return (
      <section className="container-page py-16">
        <div className="card max-w-2xl">
          <h1 className="h-display text-3xl">Sign in required</h1>
          <p className="prose-lf mt-3">
            FaceGram messages are for approved Loan Factory users only.
          </p>
          <Link href="/login/" className="btn-primary mt-6 inline-block">
            Sign in
          </Link>
        </div>
      </section>
    );
  }

  const currentEmail =
    session.status === "approved" ? session.profile.email : null;

  const recipients = approvedUserSeeds
    .filter((u) => u.email !== currentEmail)
    .map((u) => ({
      email: u.email,
      name: u.full_name,
      role: u.role,
      department: u.department,
    }));

  return (
    <>
      <section className="relative isolate overflow-hidden bg-lf-navy text-white">
        <div
          aria-hidden
          className="absolute inset-0 bg-cover bg-center opacity-35"
          style={{ backgroundImage: "url(/media/dark-hero-background.png)" }}
        />
        <div className="relative container-page py-10">
          <div className="flex items-center gap-3">
            <Link
              href="/facegram/"
              className="text-sm font-semibold text-white/70 hover:text-white"
            >
              FaceGram
            </Link>
            <span className="text-white/40">/</span>
            <span className="text-sm font-semibold text-white">Messages</span>
          </div>
          <h1 className="mt-3 font-display text-3xl font-semibold tracking-tight">
            Internal Messages
          </h1>
          <p className="mt-2 max-w-2xl text-sm text-white/80">
            Direct messages between approved Loan Factory users. Internal only —
            not Gmail.
          </p>
        </div>
      </section>

      <section className="container-page py-8">
        <FaceGramMessagesView
          previewMode={previewEnabled}
          recipients={recipients}
        />
      </section>
    </>
  );
}
