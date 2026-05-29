import Link from "next/link";
import { isBetaPreviewEnabled } from "@/lib/betaPreview";
import { isAdminRole } from "@/lib/supabase/auth";
import { getBetaUserSession } from "@/lib/supabase/session";
import { getPublicAiSandboxStatus } from "@/lib/ai/config";
import { hasSupabaseAdminConfig } from "@/lib/supabase/admin";
import { approvedUserSeeds } from "@/data/approvedUsers";

export const dynamic = "force-dynamic";
export const metadata = { title: "Admin · Platform Status" };

export default async function AdminPlatformStatusPage() {
  const session = await getBetaUserSession();
  const previewEnabled = await isBetaPreviewEnabled();

  const isAdmin =
    previewEnabled ||
    (session.status === "approved" &&
      (session.permissions?.can_access_admin ||
        isAdminRole(session.profile.role)));

  if (!isAdmin) {
    return (
      <section className="container-page py-16">
        <div className="card max-w-2xl">
          <h1 className="h-display text-3xl">Admin access required</h1>
          <p className="prose-lf mt-3">
            The platform status dashboard is for approved Loan Factory admins.
            Ask Jeremy or LO Development to review your access.
          </p>
          <Link href="/" className="btn-primary mt-6 inline-block">
            Back to home
          </Link>
        </div>
      </section>
    );
  }

  const aiStatus = getPublicAiSandboxStatus();
  const providerValue = aiStatus.openRouterConfigured
    ? `Connected · ${aiStatus.openRouterModel}`
    : "Not connected";
  const transcriptionValue = aiStatus.groqConfigured
    ? `Connected · ${aiStatus.groqWhisperModel}`
    : "Not connected";
  const supabaseConfigured = hasSupabaseAdminConfig();

  const roleCount = new Set(approvedUserSeeds.map((u) => u.role)).size;
  const departmentCount = new Set(
    approvedUserSeeds.map((u) => u.department).filter(Boolean),
  ).size;
  const adminRoleCount = approvedUserSeeds.filter((u) =>
    isAdminRole(u.role),
  ).length;

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
              href="/admin/"
              className="text-sm font-semibold text-white/70 hover:text-white"
            >
              Admin
            </Link>
            <span className="text-white/40">/</span>
            <span className="text-sm font-semibold text-white">
              Platform Status
            </span>
          </div>
          <h1 className="mt-3 font-display text-4xl font-semibold tracking-tight">
            Platform Status
          </h1>
          <p className="mt-3 max-w-2xl text-lg text-white/85">
            A read-only view of how the platform is wired right now —
            integrations, the role system, deployment, and counts derived from
            the current configuration.
          </p>
        </div>
      </section>

      <section className="container-page py-10">
        <div className="grid gap-6 lg:grid-cols-2">
          <div className="card">
            <h2 className="h-display text-2xl">Integrations</h2>
            <div className="mt-4 grid gap-2">
              <StatusRow
                label="AI provider (OpenRouter)"
                value={providerValue}
                connected={aiStatus.openRouterConfigured}
              />
              <StatusRow
                label="Voice transcription (Groq Whisper)"
                value={transcriptionValue}
                connected={aiStatus.groqConfigured}
              />
              <StatusRow
                label="Supabase (data + auth)"
                value={supabaseConfigured ? "Configured" : "Not configured"}
                connected={supabaseConfigured}
              />
              <StatusRow
                label="External sends / uploads"
                value="Disabled (draft-only)"
                connected={false}
                neutral
              />
            </div>
            <p className="mt-4 text-xs text-lf-slate">
              External actions stay disabled platform-wide. AI features run in
              draft-only mode and do not send or upload on a user&apos;s behalf.
            </p>
          </div>

          <div className="card">
            <h2 className="h-display text-2xl">Role system</h2>
            <p className="prose-lf mt-2 text-sm">
              Access is resolved through Supabase roles and{" "}
              <code>role_permissions</code>. <strong>master_admin</strong> is
              the top role and carries full access across every gated surface.
            </p>
            <div className="mt-4 grid gap-2 sm:grid-cols-2">
              <MetricCard label="Approved users (seed)" value={String(approvedUserSeeds.length)} />
              <MetricCard label="Distinct roles" value={String(roleCount)} />
              <MetricCard label="Admin-tier roles" value={String(adminRoleCount)} />
              <MetricCard label="Departments" value={String(departmentCount)} />
            </div>
            <Link
              href="/admin/users"
              className="mt-4 inline-block text-sm font-semibold text-lf-orange hover:underline"
            >
              Manage users &amp; access &rarr;
            </Link>
          </div>

          <div className="card">
            <h2 className="h-display text-2xl">Deployment</h2>
            <dl className="mt-4 grid gap-3 text-sm">
              <DetailRow label="Host" value="Netlify" />
              <DetailRow label="Deploy source" value="Netlify from main" />
              <DetailRow label="Framework" value="Next.js (App Router)" />
              <DetailRow label="Authentication" value="Google OAuth via Supabase" />
            </dl>
          </div>

          <div className="card">
            <h2 className="h-display text-2xl">Review queues</h2>
            <p className="prose-lf mt-2 text-sm">
              Submission queues are reviewed manually by LO Development. Open
              each queue to see live rows from Supabase.
            </p>
            <div className="mt-4 grid gap-2">
              <Link
                href="/admin/feedback"
                className="flex items-center justify-between rounded-lg border border-lf-line px-4 py-3 text-sm font-semibold text-lf-charcoal transition hover:border-lf-orange hover:text-lf-orange"
              >
                <span>Feedback &amp; Suggestions</span>
                <span aria-hidden className="text-lf-slate">&rarr;</span>
              </Link>
              <Link
                href="/admin/lender-escalations"
                className="flex items-center justify-between rounded-lg border border-lf-line px-4 py-3 text-sm font-semibold text-lf-charcoal transition hover:border-lf-orange hover:text-lf-orange"
              >
                <span>Lender Escalations</span>
                <span aria-hidden className="text-lf-slate">&rarr;</span>
              </Link>
              <Link
                href="/admin/ai-assistants"
                className="flex items-center justify-between rounded-lg border border-lf-line px-4 py-3 text-sm font-semibold text-lf-charcoal transition hover:border-lf-orange hover:text-lf-orange"
              >
                <span>AI Assistant Settings</span>
                <span aria-hidden className="text-lf-slate">&rarr;</span>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

function StatusRow({
  label,
  value,
  connected,
  neutral = false,
}: {
  label: string;
  value: string;
  connected: boolean;
  neutral?: boolean;
}) {
  const badgeClass = neutral
    ? "bg-lf-mist text-lf-slate"
    : connected
      ? "bg-green-100 text-green-800"
      : "bg-yellow-100 text-yellow-800";

  return (
    <div className="flex items-center justify-between gap-3 rounded-lg border border-lf-line bg-white px-4 py-3 text-sm">
      <span className="font-semibold text-lf-charcoal">{label}</span>
      <span className={`rounded-full px-2.5 py-0.5 text-xs font-semibold ${badgeClass}`}>
        {value}
      </span>
    </div>
  );
}

function MetricCard({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-lg border border-lf-line bg-white px-4 py-3">
      <p className="text-xs font-semibold text-lf-slate">{label}</p>
      <p className="mt-1 font-display text-2xl font-semibold text-lf-navy">
        {value}
      </p>
    </div>
  );
}

function DetailRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-center justify-between rounded-lg border border-lf-line bg-white px-4 py-2.5">
      <dt className="font-semibold text-lf-slate">{label}</dt>
      <dd className="font-semibold text-lf-charcoal">{value}</dd>
    </div>
  );
}
