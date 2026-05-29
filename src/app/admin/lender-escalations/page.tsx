import Link from "next/link";
import { isBetaPreviewEnabled } from "@/lib/betaPreview";
import { isAdminRole } from "@/lib/supabase/auth";
import { getBetaUserSession } from "@/lib/supabase/session";
import { createSupabaseAdminClient } from "@/lib/supabase/admin";

export const dynamic = "force-dynamic";
export const metadata = { title: "Admin · Lender Escalations" };

type LenderEscalationRow = {
  id: string;
  user_id: string | null;
  lo_name: string | null;
  lo_email: string | null;
  processor_name: string | null;
  processor_email: string | null;
  lender_name: string | null;
  ae_name: string | null;
  ae_email: string | null;
  loan_number: string | null;
  urgency: string | null;
  issue_category: string | null;
  explanation: string | null;
  requested_help: string | null;
  created_at: string | null;
};

const escalationSelect =
  "id,user_id,lo_name,lo_email,processor_name,processor_email,lender_name,ae_name,ae_email,loan_number,urgency,issue_category,explanation,requested_help,created_at";

const issueCategoryLabels: Record<string, string> = {
  status_update: "Status update",
  conditions: "Conditions",
  turn_time: "Turn time",
  communication: "Communication",
  other: "Other",
};

function issueCategoryLabel(category: string | null): string {
  if (!category) return "Other";
  return issueCategoryLabels[category] ?? category.replaceAll("_", " ");
}

function urgencyTone(urgency: string | null): string {
  switch ((urgency ?? "normal").toLowerCase()) {
    case "critical":
      return "bg-red-100 text-red-800";
    case "urgent":
      return "bg-yellow-100 text-yellow-800";
    default:
      return "bg-lf-mist text-lf-slate";
  }
}

function formatDate(value: string | null): string {
  if (!value) return "—";
  const parsed = new Date(value);
  if (Number.isNaN(parsed.getTime())) return value;
  return parsed.toLocaleString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
    hour: "numeric",
    minute: "2-digit",
  });
}

export default async function AdminLenderEscalationsPage() {
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
            Lender escalation review is for approved Loan Factory admins. Ask
            Jeremy or LO Development to review your access.
          </p>
          <Link href="/" className="btn-primary mt-6 inline-block">
            Back to home
          </Link>
        </div>
      </section>
    );
  }

  const supabase = createSupabaseAdminClient();
  let escalations: LenderEscalationRow[] = [];

  if (supabase) {
    const { data } = await supabase
      .from("lender_escalations")
      .select(escalationSelect)
      .order("created_at", { ascending: false })
      .limit(200);

    escalations = (data as LenderEscalationRow[] | null) ?? [];
  }

  const criticalCount = escalations.filter(
    (e) => (e.urgency ?? "").toLowerCase() === "critical",
  ).length;
  const urgentCount = escalations.filter(
    (e) => (e.urgency ?? "").toLowerCase() === "urgent",
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
              Lender Escalations
            </span>
          </div>
          <h1 className="mt-3 font-display text-4xl font-semibold tracking-tight">
            Lender Escalation Review
          </h1>
          <p className="mt-3 max-w-2xl text-lg text-white/85">
            LO Development reviews each escalation and reaches out manually.
            Nothing on this page auto-sends to a lender or AE — outreach stays a
            human decision.
          </p>
        </div>
      </section>

      <section className="container-page py-10">
        <div className="grid gap-3 sm:grid-cols-3">
          <StatCard label="Escalations" value={String(escalations.length)} />
          <StatCard label="Urgent" value={String(urgentCount)} />
          <StatCard label="Critical" value={String(criticalCount)} />
        </div>

        {escalations.length === 0 ? (
          <div className="card mt-8 max-w-2xl">
            <h2 className="h-display text-2xl">No escalations submitted yet.</h2>
            <p className="prose-lf mt-3 text-sm">
              Escalations submitted from the lender escalation form save to the{" "}
              <code>lender_escalations</code> table. As approved Loan Factory
              users submit them, each request will appear here for LO
              Development to review and follow up manually.
            </p>
            <Link
              href="/lender-escalation/"
              className="btn-secondary mt-5 inline-block text-sm"
            >
              Open the escalation form
            </Link>
          </div>
        ) : (
          <div className="mt-8 grid gap-4 lg:grid-cols-2">
            {escalations.map((escalation) => (
              <article key={escalation.id} className="card flex flex-col gap-3">
                <div className="flex flex-wrap items-center gap-2">
                  <span
                    className={`rounded-full px-2.5 py-0.5 text-xs font-semibold capitalize ${urgencyTone(
                      escalation.urgency,
                    )}`}
                  >
                    {escalation.urgency ?? "normal"}
                  </span>
                  <span className="rounded-full border border-lf-line bg-lf-mist px-2.5 py-0.5 text-xs font-semibold text-lf-charcoal">
                    {issueCategoryLabel(escalation.issue_category)}
                  </span>
                  {escalation.lender_name ? (
                    <span className="rounded-full border border-lf-line px-2.5 py-0.5 text-xs font-semibold text-lf-slate">
                      {escalation.lender_name}
                    </span>
                  ) : null}
                </div>

                <p className="whitespace-pre-line text-sm text-lf-charcoal">
                  {escalation.explanation ?? "No explanation provided."}
                </p>

                {escalation.requested_help ? (
                  <div className="rounded-lg border border-lf-line bg-lf-mist p-3">
                    <p className="text-xs font-semibold uppercase tracking-wide text-lf-slate">
                      Requested help
                    </p>
                    <p className="mt-1 whitespace-pre-line text-sm text-lf-charcoal">
                      {escalation.requested_help}
                    </p>
                  </div>
                ) : null}

                <dl className="grid gap-2 text-xs sm:grid-cols-2">
                  <DetailField label="LO" value={escalation.lo_name} sub={escalation.lo_email} />
                  <DetailField
                    label="Processor"
                    value={escalation.processor_name}
                    sub={escalation.processor_email}
                  />
                  <DetailField label="Account exec" value={escalation.ae_name} sub={escalation.ae_email} />
                  <DetailField label="Loan number" value={escalation.loan_number} />
                </dl>

                <p className="mt-auto text-xs text-lf-slate">
                  Submitted {formatDate(escalation.created_at)}
                </p>
              </article>
            ))}
          </div>
        )}
      </section>
    </>
  );
}

function DetailField({
  label,
  value,
  sub,
}: {
  label: string;
  value: string | null;
  sub?: string | null;
}) {
  return (
    <div>
      <dt className="font-semibold text-lf-slate">{label}</dt>
      <dd className="mt-0.5 text-lf-charcoal">{value || "—"}</dd>
      {sub ? <dd className="text-lf-slate">{sub}</dd> : null}
    </div>
  );
}

function StatCard({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-lg border border-lf-line bg-white p-4">
      <p className="text-xs font-semibold uppercase tracking-wide text-lf-slate">
        {label}
      </p>
      <p className="mt-1 font-display text-2xl font-semibold text-lf-navy">
        {value}
      </p>
    </div>
  );
}
