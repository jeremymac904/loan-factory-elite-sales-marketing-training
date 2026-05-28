import Link from "next/link";
import { isBetaPreviewEnabled } from "@/lib/betaPreview";
import { getBetaUserSession } from "@/lib/supabase/session";

export const dynamic = "force-dynamic";
export const metadata = { title: "Google Connections" };

const scopes = [
  {
    name: "Sign-in (basic)",
    scope: "openid email profile",
    status: "connected",
    description: "Required for Google Sign-In. Already approved.",
  },
  {
    name: "Gmail Draft",
    scope: "https://www.googleapis.com/auth/gmail.compose",
    status: "setup-required",
    description: "Lets your AI Twin create drafts in your Gmail Drafts folder. You send manually.",
  },
  {
    name: "Gmail Read",
    scope: "https://www.googleapis.com/auth/gmail.readonly",
    status: "setup-required",
    description: "Lets the AI Twin summarize threads. Optional.",
  },
  {
    name: "Gmail Send",
    scope: "https://www.googleapis.com/auth/gmail.send",
    status: "future",
    description: "Lets your AI Twin send emails directly. Off by default. Bulk send always off.",
  },
  {
    name: "Drive (Read)",
    scope: "https://www.googleapis.com/auth/drive.readonly",
    status: "setup-required",
    description: "Lets your AI Twin reference Drive docs you pick.",
  },
  {
    name: "Calendar",
    scope: "https://www.googleapis.com/auth/calendar",
    status: "future",
    description: "Lets your AI Twin schedule reminders on your calendar.",
  },
];

const statusBadges: Record<string, { label: string; class: string }> = {
  connected: { label: "Connected", class: "bg-green-100 text-green-800" },
  "setup-required": {
    label: "Setup needed",
    class: "bg-yellow-100 text-yellow-800",
  },
  future: { label: "Coming soon", class: "bg-lf-mist text-lf-slate" },
};

export default async function GoogleSettingsPage() {
  const session = await getBetaUserSession();
  const previewEnabled = await isBetaPreviewEnabled();

  if (!previewEnabled && session.status !== "approved") {
    return (
      <section className="container-page py-16">
        <div className="card max-w-2xl">
          <h1 className="h-display text-3xl">Sign in required</h1>
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
        <div className="relative container-page py-12">
          <div className="flex items-center gap-3">
            <Link href="/profile/" className="text-sm font-semibold text-white/70 hover:text-white">
              Profile
            </Link>
            <span className="text-white/40">/</span>
            <span className="text-sm font-semibold text-white">Google connections</span>
          </div>
          <h1 className="mt-3 font-display text-4xl font-semibold tracking-tight">
            Google Connections
          </h1>
          <p className="mt-3 max-w-2xl text-lg text-white/85">
            Control which Google services your AI Twin can use. Each scope is
            per-user, revocable, and never enabled by default.
          </p>
        </div>
      </section>

      <section className="container-page py-10">
        <div className="grid gap-3">
          {scopes.map((s) => {
            const badge = statusBadges[s.status];
            return (
              <div key={s.scope} className="card flex flex-wrap items-start justify-between gap-4">
                <div className="max-w-xl">
                  <h2 className="text-base font-semibold text-lf-charcoal">
                    {s.name}
                  </h2>
                  <p className="mt-1 text-sm text-lf-slate">{s.description}</p>
                  <code className="mt-2 inline-block rounded bg-lf-mist px-2 py-0.5 text-[11px] text-lf-charcoal">
                    {s.scope}
                  </code>
                </div>
                <div className="flex items-center gap-3">
                  <span className={`rounded-full px-2.5 py-0.5 text-xs font-semibold ${badge.class}`}>
                    {badge.label}
                  </span>
                  {s.status === "setup-required" && (
                    <button type="button" disabled className="btn-secondary text-sm opacity-60">
                      Approve (setup needed)
                    </button>
                  )}
                </div>
              </div>
            );
          })}
        </div>

        <div className="mt-8 rounded-xl border border-lf-line bg-lf-mist p-5 text-sm">
          <h2 className="font-semibold text-lf-charcoal">How connections work</h2>
          <ul className="mt-2 list-disc space-y-1 pl-5 text-lf-slate">
            <li>Each scope requires explicit approval from your Google account.</li>
            <li>Scope approvals store in <code>google_connections</code> in Supabase.</li>
            <li>Send permission requires an additional safety confirmation.</li>
            <li>Bulk sending is never enabled in beta.</li>
            <li>You can revoke any scope at any time.</li>
          </ul>
        </div>
      </section>
    </>
  );
}
