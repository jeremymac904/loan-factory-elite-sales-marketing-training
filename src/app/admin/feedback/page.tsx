import Link from "next/link";
import { isBetaPreviewEnabled } from "@/lib/betaPreview";
import { isAdminRole } from "@/lib/supabase/auth";
import { getBetaUserSession } from "@/lib/supabase/session";
import { createSupabaseAdminClient } from "@/lib/supabase/admin";
import AccessNotice from "@/components/AccessNotice";
import { resolveProtectedAccess } from "@/lib/supabase/protectedAccess";

export const dynamic = "force-dynamic";
export const metadata = { title: "Admin · Feedback & Suggestions" };

type SuggestionRow = {
  id: string;
  user_id: string | null;
  anonymous: boolean | null;
  category: string | null;
  message: string | null;
  status: string | null;
  created_at: string | null;
};

const categoryLabels: Record<string, string> = {
  platform: "Platform",
  content: "Content",
  broken_link: "Broken link",
  feature: "Feature request",
  other: "Other",
};

function categoryLabel(category: string | null): string {
  if (!category) return "General";
  return categoryLabels[category] ?? category.replaceAll("_", " ");
}

function statusTone(status: string | null): string {
  switch ((status ?? "").toLowerCase()) {
    case "resolved":
    case "closed":
      return "bg-green-100 text-green-800";
    case "in_progress":
    case "reviewing":
      return "bg-yellow-100 text-yellow-800";
    case "new":
    case "open":
      return "bg-lf-navy text-white";
    default:
      return "bg-lf-mist text-lf-slate";
  }
}

function statusLabel(status: string | null): string {
  if (!status) return "New";
  return status.replaceAll("_", " ");
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

export default async function AdminFeedbackPage() {
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
        surfaceLabel="Feedback & Suggestions"
        status={access.status}
        roleLabel={access.roleLabel}
      >
        {access.status === "signed-out" &&
          "Feedback review is for approved Loan Factory admins."}
        {access.status === "pending" &&
          "Your account is signed in, but it is not approved for admin access yet."}
        {access.status === "access-denied" &&
          "Your current role does not include admin access."}
      </AccessNotice>
    );
  }

  const supabase = createSupabaseAdminClient();
  let suggestions: SuggestionRow[] = [];

  if (supabase) {
    const { data } = await supabase
      .from("suggestions")
      .select("id,user_id,anonymous,category,message,status,created_at")
      .order("created_at", { ascending: false })
      .limit(200);

    suggestions = (data as SuggestionRow[] | null) ?? [];
  }

  const openCount = suggestions.filter((s) => {
    const status = (s.status ?? "new").toLowerCase();
    return status !== "resolved" && status !== "closed";
  }).length;
  const anonymousCount = suggestions.filter((s) => s.anonymous).length;

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
              Feedback &amp; Suggestions
            </span>
          </div>
          <h1 className="mt-3 font-display text-4xl font-semibold tracking-tight">
            Feedback &amp; Suggestions
          </h1>
          <p className="mt-3 max-w-2xl text-lg text-white/85">
            Submissions arrive from the global Send Feedback button. Review
            them here, then route follow-ups manually — nothing auto-replies.
          </p>
        </div>
      </section>

      <section className="container-page py-10">
        <div className="grid gap-3 sm:grid-cols-3">
          <StatCard label="Submissions" value={String(suggestions.length)} />
          <StatCard label="Open" value={String(openCount)} />
          <StatCard label="Anonymous" value={String(anonymousCount)} />
        </div>

        {suggestions.length === 0 ? (
          <div className="card mt-8 max-w-2xl">
            <h2 className="h-display text-2xl">No suggestions submitted yet.</h2>
            <p className="prose-lf mt-3 text-sm">
              Submissions arrive from the global Send Feedback button in the
              site footer. As approved Loan Factory users send feedback, each
              entry will appear here as a card with its category, message,
              status, and submitted time.
            </p>
          </div>
        ) : (
          <div className="mt-8 grid gap-4 lg:grid-cols-2">
            {suggestions.map((suggestion) => (
              <article key={suggestion.id} className="card flex flex-col gap-3">
                <div className="flex flex-wrap items-center gap-2">
                  <span className="rounded-full border border-lf-line bg-lf-mist px-2.5 py-0.5 text-xs font-semibold text-lf-charcoal">
                    {categoryLabel(suggestion.category)}
                  </span>
                  <span
                    className={`rounded-full px-2.5 py-0.5 text-xs font-semibold capitalize ${statusTone(
                      suggestion.status,
                    )}`}
                  >
                    {statusLabel(suggestion.status)}
                  </span>
                  {suggestion.anonymous ? (
                    <span className="rounded-full border border-lf-line px-2.5 py-0.5 text-xs font-semibold text-lf-slate">
                      Anonymous
                    </span>
                  ) : null}
                </div>
                <p className="whitespace-pre-line text-sm text-lf-charcoal">
                  {suggestion.message ?? "No message provided."}
                </p>
                <p className="mt-auto text-xs text-lf-slate">
                  Submitted {formatDate(suggestion.created_at)}
                </p>
              </article>
            ))}
          </div>
        )}
      </section>
    </>
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
