import Link from "next/link";
import { isBetaPreviewEnabled } from "@/lib/betaPreview";
import { getBetaUserSession } from "@/lib/supabase/session";

export const dynamic = "force-dynamic";
export const metadata = { title: "FaceGram Saved" };

const seedSaved = [
  {
    title: "First-call follow-up script for new realtors",
    author: "Andre King",
    group: "Team Leaders",
    time: "2 days ago",
  },
  {
    title: "30-day local marketing rhythm",
    author: "Jeremy McDonald",
    group: "Marketing & Content",
    time: "5 days ago",
  },
  {
    title: "Coaching call recap — Power Hour wins",
    author: "Edward Arvizo",
    group: "LO Mastery Coaching",
    time: "1 week ago",
  },
];

export default async function FaceGramSavedPage() {
  const session = await getBetaUserSession();
  const previewEnabled = await isBetaPreviewEnabled();

  if (!previewEnabled && session.status !== "approved") {
    return (
      <section className="container-page py-16">
        <div className="card max-w-2xl">
          <h1 className="h-display text-3xl">Sign in required</h1>
          <p className="prose-lf mt-3">
            Saved FaceGram posts are tied to your approved account.
          </p>
          <Link href="/login/" className="btn-primary mt-6 inline-block">
            Sign in
          </Link>
        </div>
      </section>
    );
  }

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
            <span className="text-sm font-semibold text-white">Saved</span>
          </div>
          <h1 className="mt-3 font-display text-3xl font-semibold tracking-tight">
            Saved Posts
          </h1>
          <p className="mt-2 max-w-2xl text-sm text-white/80">
            Posts you saved from the internal Loan Factory community feed.
          </p>
        </div>
      </section>

      <section className="container-page py-8">
        <div className="grid gap-3">
          {seedSaved.map((post, idx) => (
            <div key={idx} className="card flex flex-wrap items-start justify-between gap-3">
              <div>
                <p className="text-sm font-semibold text-lf-charcoal">
                  {post.title}
                </p>
                <p className="mt-1 text-xs text-lf-slate">
                  {post.author} · {post.group} · {post.time}
                </p>
              </div>
              <Link
                href="/facegram/"
                className="text-sm font-semibold text-lf-orange hover:underline"
              >
                Open in FaceGram &rarr;
              </Link>
            </div>
          ))}
        </div>

        <div className="mt-6 flex gap-3">
          <Link href="/facegram/" className="btn-secondary">
            Back to FaceGram
          </Link>
        </div>
      </section>
    </>
  );
}
