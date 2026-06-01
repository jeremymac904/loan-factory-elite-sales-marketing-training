import Link from "next/link";
import { isBetaPreviewEnabled } from "@/lib/betaPreview";
import { isAdminRole } from "@/lib/supabase/auth";
import { getBetaUserSession } from "@/lib/supabase/session";
import { getPublicAiSandboxStatus } from "@/lib/ai/config";
import { hasSupabaseAdminConfig } from "@/lib/supabase/admin";
import { approvedUserSeeds } from "@/data/approvedUsers";
import AccessNotice from "@/components/AccessNotice";
import { resolveProtectedAccess } from "@/lib/supabase/protectedAccess";

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
    const access = resolveProtectedAccess(session, isAdmin);
    return (
      <AccessNotice
        surfaceLabel="Platform Status"
        status={access.status}
        roleLabel={access.roleLabel}
      >
        {access.status === "signed-out" &&
          "The platform status dashboard is for approved Loan Factory admins."}
        {access.status === "pending" &&
          "Your account is signed in, but it is not approved for admin access yet."}
        {access.status === "access-denied" &&
          "Your current role does not include admin access."}
      </AccessNotice>
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
            integrations, database and storage readiness, the role system,
            deployment, and counts derived from the current configuration.
          </p>
        </div>
      </section>

      <section className="container-page py-10">
        {/* Role-system metric strip above the fold */}
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          <MetricCard label="Approved users (seed)" value={String(approvedUserSeeds.length)} />
          <MetricCard label="Distinct roles" value={String(roleCount)} />
          <MetricCard label="Admin-tier roles" value={String(adminRoleCount)} />
          <MetricCard label="Departments" value={String(departmentCount)} />
        </div>

        <div className="mt-6 grid gap-6 lg:grid-cols-2">
          <div className="card">
            <h2 className="h-display text-xl">Integrations</h2>
            <div className="mt-3 grid gap-2">
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
                label="Supabase database + auth"
                value={supabaseConfigured ? "Configured" : "Not configured"}
                connected={supabaseConfigured}
              />
              <StatusRow
                label="Storage / uploads"
                value="Disabled (draft-only)"
                connected={false}
                neutral
              />
              <StatusRow
                label="External sends / uploads"
                value="Disabled (draft-only)"
                connected={false}
                neutral
              />
            </div>
            <p className="mt-3 text-xs text-lf-slate">
              External actions stay disabled platform-wide. AI features run in
              draft-only mode and do not send or upload on a user&apos;s behalf.
            </p>
          </div>

          <div className="card">
            <h2 className="h-display text-xl">Role system &amp; deployment</h2>
            <p className="prose-lf mt-2 text-sm">
              Access is resolved through Supabase roles and{" "}
              <code>role_permissions</code>. <strong>master_admin</strong> is
              the top role and carries full access across every gated surface.
            </p>
            <dl className="mt-3 grid gap-2 text-sm">
              <DetailRow label="Host" value="Netlify" />
              <DetailRow label="Deploy source" value="Netlify from main" />
              <DetailRow label="Framework" value="Next.js (App Router)" />
              <DetailRow label="Authentication" value="Google OAuth via Supabase" />
            </dl>
            <Link
              href="/admin/users"
              className="mt-3 inline-block text-sm font-semibold text-lf-orange hover:underline"
            >
              Manage users &amp; access &rarr;
            </Link>
          </div>
        </div>

        {/* Review queues as a compact dropdown navigator */}
        <div className="mt-6 rounded-xl border border-lf-line bg-lf-mist p-5">
          <h2 className="text-sm font-bold uppercase tracking-wide text-lf-slate">
            Review queues
          </h2>
          <p className="prose-lf mt-1 text-xs text-lf-slate">
            Reviewed manually by LO Development. Open a queue to see live rows
            from Supabase.
          </p>
          <div className="mt-3 grid gap-2 sm:grid-cols-3">
            <QueueLink href="/admin/feedback" label="Feedback & Suggestions" />
            <QueueLink href="/admin/lender-escalations" label="Lender Escalations" />
            <QueueLink href="/admin/ai-assistants" label="AI Assistant Settings" />
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

function QueueLink({ href, label }: { href: string; label: string }) {
  return (
    <Link
      href={href}
      className="flex items-center justify-between rounded-lg border border-lf-line bg-white px-4 py-3 text-sm font-semibold text-lf-charcoal transition hover:border-lf-orange hover:text-lf-orange"
    >
      <span>{label}</span>
      <span aria-hidden className="text-lf-slate">&rarr;</span>
    </Link>
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
