import Link from "next/link";
import { isBetaPreviewEnabled } from "@/lib/betaPreview";
import { isAdminRole } from "@/lib/supabase/auth";
import { getBetaUserSession } from "@/lib/supabase/session";
import { getPublicAiSandboxStatus } from "@/lib/ai/config";
import { seedAiTwinPersonas } from "@/data/aiTwinPersonas";
import { approvedUserSeeds } from "@/data/approvedUsers";

export const dynamic = "force-dynamic";
export const metadata = { title: "Admin · AI Assistants" };

export default async function AdminAiAssistantsPage() {
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
          <Link href="/" className="btn-primary mt-6 inline-block">
            Back to home
          </Link>
        </div>
      </section>
    );
  }

  const aiStatus = getPublicAiSandboxStatus();
  const providerStatus = aiStatus.openRouterConfigured
    ? `Connected · ${aiStatus.openRouterModel}`
    : "Not connected";

  const tierCounts = approvedUserSeeds.reduce<Record<string, number>>(
    (acc, user) => {
      acc[user.role] = (acc[user.role] ?? 0) + 1;
      return acc;
    },
    {},
  );

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
            <Link href="/admin/" className="text-sm font-semibold text-white/70 hover:text-white">
              Admin
            </Link>
            <span className="text-white/40">/</span>
            <span className="text-sm font-semibold text-white">AI Assistants</span>
          </div>
          <h1 className="mt-3 font-display text-4xl font-semibold tracking-tight">
            AI Assistant Settings
          </h1>
        </div>
      </section>

      <section className="container-page py-10">
        <div className="grid gap-6 lg:grid-cols-2">
          <div className="card">
            <h2 className="h-display text-2xl">Seeded AI Twin personas</h2>
            <p className="prose-lf mt-2 text-sm">
              These personas serve as templates until each user defines their
              own in <code>ai_twins</code>.
            </p>
            <div className="mt-4 grid gap-3">
              {seedAiTwinPersonas.map((p) => (
                <div key={p.ownerEmail} className="rounded-lg border border-lf-line bg-white p-4">
                  <h3 className="text-sm font-semibold text-lf-charcoal">
                    {p.assistantName}
                  </h3>
                  <p className="mt-1 text-xs text-lf-slate">{p.ownerName} · {p.role}</p>
                  <p className="mt-2 text-xs text-lf-charcoal">{p.voice}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="card">
            <h2 className="h-display text-2xl">AI access by role</h2>
            <div className="mt-4 grid gap-2 text-sm">
              <AccessRow role="Master Admin" count={tierCounts.master_admin ?? 0} access="Full AI Twin + Admin" />
              <AccessRow role="Admin" count={tierCounts.admin ?? 0} access="Full AI Twin" />
              <AccessRow role="LO Development Lead" count={tierCounts.lo_development_lead ?? 0} access="LO Development AI Twin" />
              <AccessRow role="LO Development Member" count={tierCounts.lo_development_member ?? 0} access="LO Development Assistant" />
              <AccessRow role="Corporate Coach" count={tierCounts.corporate_coach ?? 0} access="Coaching AI Twin" />
              <AccessRow role="Marketing" count={tierCounts.marketing ?? 0} access="Marketing AI Twin" />
              <AccessRow role="LO Support" count={tierCounts.loan_officer_support ?? 0} access="Support AI assistant" />
              <AccessRow role="Coaching Members $249" count={tierCounts.coaching_member_level_1 ?? 0} access="LO Mastery Assistant" />
              <AccessRow role="Coaching Members $449" count={tierCounts.coaching_member_level_2 ?? 0} access="Alliance Assistant" />
            </div>
          </div>

          <div className="card lg:col-span-2">
            <h2 className="h-display text-2xl">Provider status</h2>
            <div className="mt-4 grid gap-2 sm:grid-cols-3">
              <StatusCard label="AI provider" value={providerStatus} />
              <StatusCard label="Persona store" value="Supabase ai_twins" />
              <StatusCard label="Knowledge index" value="Per-user (activates with Drive scope)" />
            </div>
            <p className="mt-4 text-xs text-lf-slate">
              AI Twin records save to the <code>ai_twins</code> Supabase table.
              Per-user knowledge index becomes active once Drive scope is
              approved per user.
            </p>
          </div>
        </div>
      </section>
    </>
  );
}

function AccessRow({
  role,
  count,
  access,
}: {
  role: string;
  count: number;
  access: string;
}) {
  return (
    <div className="flex items-center justify-between rounded-lg border border-lf-line bg-white px-3 py-2">
      <div>
        <p className="font-semibold text-lf-charcoal">{role}</p>
        <p className="text-xs text-lf-slate">{access}</p>
      </div>
      <span className="rounded-full bg-lf-mist px-2.5 py-0.5 text-xs font-semibold text-lf-charcoal">
        {count}
      </span>
    </div>
  );
}

function StatusCard({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-lg border border-lf-line bg-white p-3">
      <p className="text-xs font-semibold text-lf-slate">{label}</p>
      <p className="mt-1 text-sm font-semibold text-lf-charcoal">{value}</p>
    </div>
  );
}
