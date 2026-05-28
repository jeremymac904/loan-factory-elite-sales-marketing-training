import Link from "next/link";
import { isBetaPreviewEnabled } from "@/lib/betaPreview";
import { getRoleLabel } from "@/lib/supabase/auth";
import { getBetaUserSession } from "@/lib/supabase/session";
import { seedAiTwinPersonas } from "@/data/aiTwinPersonas";

export const dynamic = "force-dynamic";
export const metadata = { title: "My AI Twin" };

export default async function MyAiTwinPage() {
  const session = await getBetaUserSession();
  const previewEnabled = await isBetaPreviewEnabled();

  if (!previewEnabled && session.status !== "approved") {
    return (
      <section className="container-page py-16">
        <div className="card max-w-2xl">
          <h1 className="h-display text-3xl">Sign in required</h1>
          <p className="prose-lf mt-3">
            AI Twins are available to approved Loan Factory users.
          </p>
          <Link href="/login/" className="btn-primary mt-6 inline-block">
            Sign in
          </Link>
        </div>
      </section>
    );
  }

  const email = session.status === "approved" ? session.profile.email : null;
  const role = session.status === "approved" ? session.profile.role : null;
  const persona =
    seedAiTwinPersonas.find((p) => p.ownerEmail === email) ?? null;

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
            <span className="text-sm font-semibold text-white">My AI Twin</span>
          </div>
          <h1 className="mt-3 font-display text-4xl font-semibold tracking-tight">
            {persona?.assistantName ?? "My AI Twin"}
          </h1>
          <p className="mt-3 max-w-2xl text-lg text-white/85">
            {persona
              ? `${persona.voice} For ${getRoleLabel(persona.role)}.`
              : "Your personal AI Twin will help you draft, plan, and prepare daily work — based on your voice and your role."}
          </p>
        </div>
      </section>

      <section className="container-page py-10">
        <div className="grid gap-6 lg:grid-cols-2">
          <div className="card">
            <h2 className="h-display text-2xl">Persona</h2>
            <dl className="mt-4 grid gap-3 text-sm">
              <div>
                <dt className="font-semibold text-lf-slate">Voice</dt>
                <dd className="mt-1 text-lf-charcoal">
                  {persona?.voice ?? "Set up your AI Twin to define a voice."}
                </dd>
              </div>
              <div>
                <dt className="font-semibold text-lf-slate">Role</dt>
                <dd className="mt-1 text-lf-charcoal">{getRoleLabel(role)}</dd>
              </div>
              <div>
                <dt className="font-semibold text-lf-slate">Specialties</dt>
                <dd className="mt-1 flex flex-wrap gap-1">
                  {(persona?.specialties ?? [
                    "Daily planning",
                    "Draft writing",
                    "Follow-up prompts",
                  ]).map((s) => (
                    <span
                      key={s}
                      className="rounded-full border border-lf-line bg-lf-mist px-2.5 py-0.5 text-xs font-semibold text-lf-charcoal"
                    >
                      {s}
                    </span>
                  ))}
                </dd>
              </div>
            </dl>
            <div className="mt-5 flex gap-3">
              <Link href="/ai-assistants/persona/" className="btn-primary text-sm">
                Edit persona
              </Link>
              <Link href="/ai-assistants/setup/" className="btn-secondary text-sm">
                Setup wizard
              </Link>
            </div>
          </div>

          <div className="card">
            <h2 className="h-display text-2xl">Connections</h2>
            <div className="mt-4 grid gap-3">
              <ConnectionRow label="Google Workspace" status="connected" />
              <ConnectionRow label="Gmail (draft/send)" status="setup-required" />
              <ConnectionRow label="Google Drive sources" status="setup-required" />
              <ConnectionRow label="Calendar" status="future" />
            </div>
            <div className="mt-5 flex gap-3">
              <Link href="/settings/google/" className="btn-secondary text-sm">
                Manage Google connections
              </Link>
              <Link href="/ai-assistants/knowledge/" className="btn-secondary text-sm">
                Knowledge sources
              </Link>
            </div>
          </div>

          <div className="card">
            <h2 className="h-display text-2xl">Quick actions</h2>
            <div className="mt-4 grid gap-2">
              <Link href="/ai-assistants/email-drafts/" className="rounded-lg border border-lf-line px-4 py-3 text-sm font-semibold hover:border-lf-orange">
                Draft a coaching email
              </Link>
              <Link href="/ai-assistants/tasks/" className="rounded-lg border border-lf-line px-4 py-3 text-sm font-semibold hover:border-lf-orange">
                Set a coaching reminder
              </Link>
              <Link href="/ai-coaching-assistant/" className="rounded-lg border border-lf-line px-4 py-3 text-sm font-semibold hover:border-lf-orange">
                Open coaching assistant
              </Link>
            </div>
          </div>

          <div className="card">
            <h2 className="h-display text-2xl">AI status</h2>
            <p className="prose-lf mt-3 text-sm">
              AI provider connection status is shown in the AI Assistant Hub.
              Until a provider key is connected in production, your AI Twin
              works in demo mode — drafts use seeded templates without burning
              live AI credits.
            </p>
            <Link href="/api/ai/status" className="text-sm font-semibold text-lf-orange hover:underline">
              View AI provider status &rarr;
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}

function ConnectionRow({
  label,
  status,
}: {
  label: string;
  status: "connected" | "setup-required" | "future";
}) {
  const badge =
    status === "connected"
      ? { class: "bg-green-100 text-green-800", text: "Connected" }
      : status === "setup-required"
        ? { class: "bg-yellow-100 text-yellow-800", text: "Setup needed" }
        : { class: "bg-lf-mist text-lf-slate", text: "Coming soon" };

  return (
    <div className="flex items-center justify-between rounded-lg border border-lf-line bg-white px-4 py-2.5 text-sm">
      <span className="font-semibold text-lf-charcoal">{label}</span>
      <span className={`rounded-full px-2.5 py-0.5 text-xs font-semibold ${badge.class}`}>
        {badge.text}
      </span>
    </div>
  );
}
