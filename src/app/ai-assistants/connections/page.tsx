import Link from "next/link";
import { isBetaPreviewEnabled } from "@/lib/betaPreview";
import { getBetaUserSession } from "@/lib/supabase/session";

export const dynamic = "force-dynamic";
export const metadata = { title: "AI Twin Connections" };

type ConnectionStatus = "connected" | "not-enabled";

const connections: {
  name: string;
  description: string;
  status: ConnectionStatus;
}[] = [
  {
    name: "Google Workspace",
    description:
      "Connected through your Loan Factory Google Sign-In. This is your identity for every per-user scope below.",
    status: "connected",
  },
  {
    name: "Gmail Draft",
    description:
      "Lets your AI Twin write drafts into your Gmail Drafts folder. You review and send manually — your AI Twin never auto-sends.",
    status: "not-enabled",
  },
  {
    name: "Gmail Read",
    description:
      "Lets your AI Twin summarize threads you point it to. Read-only — no replies or sends happen on your behalf.",
    status: "not-enabled",
  },
  {
    name: "Drive Read",
    description:
      "Lets your AI Twin reference Drive docs you choose as knowledge sources. Read-only — files are never edited or shared.",
    status: "not-enabled",
  },
  {
    name: "Calendar",
    description:
      "Lets your AI Twin prepare reminder drafts from your schedule. Stays draft-only until approved — no events created automatically.",
    status: "not-enabled",
  },
];

const statusBadges: Record<ConnectionStatus, { label: string; class: string }> =
  {
    connected: { label: "Connected", class: "bg-green-100 text-green-800" },
    "not-enabled": { label: "Not enabled", class: "bg-lf-mist text-lf-slate" },
  };

export default async function AiTwinConnectionsPage() {
  const session = await getBetaUserSession();
  const previewEnabled = await isBetaPreviewEnabled();

  if (!previewEnabled && session.status !== "approved") {
    return (
      <section className="container-page py-16">
        <div className="card max-w-2xl">
          <h1 className="h-display text-3xl">Sign in required</h1>
          <p className="prose-lf mt-3">
            AI Twin connections are available to approved Loan Factory users.
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
        <div className="relative container-page py-12">
          <div className="flex items-center gap-3">
            <Link
              href="/ai-assistants/"
              className="text-sm font-semibold text-white/70 hover:text-white"
            >
              AI Assistants
            </Link>
            <span className="text-white/40">/</span>
            <span className="text-sm font-semibold text-white">Connections</span>
          </div>
          <h1 className="mt-3 font-display text-4xl font-semibold tracking-tight">
            AI Twin Connections
          </h1>
          <p className="mt-3 max-w-2xl text-lg text-white/85">
            See exactly which Google services your AI Twin can use. Each scope
            is per-user and never enabled by default. Until a scope is approved,
            your AI Twin works draft-only and read-only — it never sends or
            shares anything on your behalf.
          </p>
        </div>
      </section>

      <section className="container-page py-10">
        <div className="grid gap-3">
          {connections.map((connection) => {
            const badge = statusBadges[connection.status];
            return (
              <div
                key={connection.name}
                className="card flex flex-wrap items-start justify-between gap-4"
              >
                <div className="max-w-xl">
                  <h2 className="text-base font-semibold text-lf-charcoal">
                    {connection.name}
                  </h2>
                  <p className="mt-1 text-sm text-lf-slate">
                    {connection.description}
                  </p>
                </div>
                <div className="flex items-center gap-3">
                  <span
                    className={`rounded-full px-2.5 py-0.5 text-xs font-semibold ${badge.class}`}
                  >
                    {badge.label}
                  </span>
                  {connection.status === "not-enabled" && (
                    <Link
                      href="/settings/google/"
                      className="btn-secondary text-sm"
                    >
                      Manage in Google settings
                    </Link>
                  )}
                </div>
              </div>
            );
          })}
        </div>

        <div className="mt-8 rounded-xl border border-lf-line bg-lf-mist p-5 text-sm">
          <h2 className="font-semibold text-lf-charcoal">
            How your AI Twin uses these connections
          </h2>
          <ul className="mt-2 list-disc space-y-1 pl-5 text-lf-slate">
            <li>
              Gmail, Drive, and Calendar actions stay draft-only and read-only
              until the matching scope is approved.
            </li>
            <li>
              Your AI Twin never auto-sends email and never sends in bulk.
            </li>
            <li>
              Each scope is approved per-user from{" "}
              <Link
                href="/settings/google/"
                className="font-semibold text-lf-orange hover:underline"
              >
                Google settings
              </Link>
              , and you can revoke any scope at any time there.
            </li>
          </ul>
        </div>

        <div className="mt-8 flex flex-wrap gap-3">
          <Link href="/settings/google/" className="btn-primary">
            Manage in Google settings
          </Link>
          <Link href="/ai-assistants/my-ai-twin/" className="btn-secondary">
            Back to My AI Twin
          </Link>
          <Link href="/ai-assistants/" className="btn-secondary">
            AI Assistant Hub
          </Link>
        </div>
      </section>
    </>
  );
}
