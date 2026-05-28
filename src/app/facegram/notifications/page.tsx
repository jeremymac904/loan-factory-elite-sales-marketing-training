import Link from "next/link";
import { isBetaPreviewEnabled } from "@/lib/betaPreview";
import { getBetaUserSession } from "@/lib/supabase/session";

export const dynamic = "force-dynamic";
export const metadata = { title: "FaceGram Notifications" };

const seedNotifications = [
  {
    actor: "Andre King",
    action: "commented on your first-call follow-up thread.",
    time: "1h ago",
    type: "comment",
  },
  {
    actor: "Edward Arvizo",
    action: "shared a coaching recap in Team Leaders group.",
    time: "3h ago",
    type: "share",
  },
  {
    actor: "Duyen Nguyen",
    action: "approved your FaceGram marketing post.",
    time: "5h ago",
    type: "approval",
  },
  {
    actor: "Tara Bartoli",
    action: "tagged you in a new LO onboarding question.",
    time: "yesterday",
    type: "mention",
  },
  {
    actor: "Kevin Truong",
    action: "saved your script for follow-up calls.",
    time: "2 days ago",
    type: "save",
  },
  {
    actor: "Marketing",
    action: "added 3 new approved adaptation examples in FaceGram.",
    time: "3 days ago",
    type: "system",
  },
];

const typeBadge: Record<string, string> = {
  comment: "bg-blue-100 text-blue-800",
  share: "bg-purple-100 text-purple-800",
  approval: "bg-green-100 text-green-800",
  mention: "bg-orange-100 text-orange-800",
  save: "bg-yellow-100 text-yellow-800",
  system: "bg-lf-mist text-lf-charcoal",
};

export default async function FaceGramNotificationsPage() {
  const session = await getBetaUserSession();
  const previewEnabled = await isBetaPreviewEnabled();

  if (!previewEnabled && session.status !== "approved") {
    return (
      <section className="container-page py-16">
        <div className="card max-w-2xl">
          <h1 className="h-display text-3xl">Sign in required</h1>
          <p className="prose-lf mt-3">
            FaceGram notifications are for approved Loan Factory users.
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
            <span className="text-sm font-semibold text-white">Notifications</span>
          </div>
          <h1 className="mt-3 font-display text-3xl font-semibold tracking-tight">
            Notifications
          </h1>
        </div>
      </section>

      <section className="container-page py-8">
        <div className="card">
          <div className="grid gap-1">
            {seedNotifications.map((n, idx) => (
              <div
                key={idx}
                className="flex items-start gap-3 rounded-lg border-b border-lf-line py-3 last:border-0"
              >
                <span
                  className={`mt-0.5 rounded-full px-2 py-0.5 text-xs font-semibold ${typeBadge[n.type] ?? "bg-lf-mist text-lf-charcoal"}`}
                >
                  {n.type}
                </span>
                <div className="flex-1">
                  <p className="text-sm text-lf-charcoal">
                    <span className="font-semibold">{n.actor}</span> {n.action}
                  </p>
                  <p className="mt-0.5 text-xs text-lf-slate">{n.time}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-4 flex flex-wrap gap-3">
          <Link href="/facegram/" className="btn-secondary">
            Back to FaceGram
          </Link>
          <Link href="/facegram/messages/" className="btn-secondary">
            Messages
          </Link>
        </div>
      </section>
    </>
  );
}
