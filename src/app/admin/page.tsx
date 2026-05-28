import Link from "next/link";
import { betaPreviewEmail, isBetaPreviewEnabled } from "@/lib/betaPreview";
import { getRoleLabel, isAdminRole } from "@/lib/supabase/auth";
import { getBetaUserSession } from "@/lib/supabase/session";

export const dynamic = "force-dynamic";
export const metadata = { title: "Admin" };

export default async function AdminPage() {
  const session = await getBetaUserSession();
  const previewEnabled = await isBetaPreviewEnabled();

  if (previewEnabled) {
    return <AdminShell preview />;
  }

  if (session.status === "not-configured") {
    return <AdminNotice title="Admin sign-in setup needed" actionHref="/login/" actionLabel="Open sign in">
      Google sign-in setup is not ready in this environment, so admin access
      cannot be checked yet.
    </AdminNotice>;
  }

  if (session.status === "signed-out") {
    return <AdminNotice title="Sign in required" actionHref="/login/" actionLabel="Sign in">
      Admin access requires an approved Loan Factory Google account.
    </AdminNotice>;
  }

  if (session.status === "pending") {
    return <AdminNotice title="Access pending" actionHref="/access-pending/" actionLabel="View pending status">
      Your account is signed in, but it is not approved for admin access.
    </AdminNotice>;
  }

  const canAccessAdmin =
    session.permissions?.can_access_admin || isAdminRole(session.profile.role);

  if (!canAccessAdmin) {
    return <AdminNotice title="Admin role required" actionHref="/" actionLabel="Back to home">
      Your current role is {getRoleLabel(session.profile.role)}. Ask Jeremy or
      LO Development to review admin access.
    </AdminNotice>;
  }

  return <AdminShell session={session} />;
}

const adminLinks = [
  { label: "Users & Access", href: "/admin/users" },
  { label: "Feedback", href: "/admin/quiz-review" },
  { label: "Lender Escalations", href: "/lender-escalation/" },
  { label: "FaceGram Moderation", href: "/facegram/" },
  { label: "AI Assistants", href: "/ai-assistants/" },
  { label: "Coaching Members", href: "/coaching/" },
  { label: "Platform Status", href: "/auth/status/" },
];

function AdminShell({
  session,
  preview = false,
}: {
  session?: Extract<Awaited<ReturnType<typeof getBetaUserSession>>, { status: "approved" }>;
  preview?: boolean;
}) {
  const email = preview ? betaPreviewEmail : session?.profile.email ?? "";
  const name = preview ? "Internal Review" : session?.profile.full_name ?? "Not set";
  const role = preview ? "Review Admin" : getRoleLabel(session?.profile.role);
  const status = preview ? "review-only" : session?.profile.status ?? "";

  return (
    <>
      <section className="relative isolate overflow-hidden bg-lf-navy text-white">
        <div
          aria-hidden
          className="absolute inset-0 bg-cover bg-center opacity-35"
          style={{ backgroundImage: "url(/media/dark-hero-background.png)" }}
        />
        <div className="relative container-page py-14">
          <p className="text-xs font-bold uppercase tracking-wide text-lf-orange">
            Admin beta
          </p>
          <h1 className="mt-5 font-display text-4xl font-semibold tracking-tight">
            Admin Access
          </h1>
          <p className="mt-4 max-w-2xl text-lg text-white/85">
            {preview
              ? "Internal review context for UI review. This does not change real users or permissions."
              : "Current beta user context. Full user management stays in the approved access list during beta."}
          </p>
        </div>
      </section>

      <section className="container-page py-12">
        <div className="grid gap-6 lg:grid-cols-2">
          <div className="card">
            <h2 className="h-display text-2xl">Current user</h2>
            <dl className="mt-5 grid gap-3 text-sm">
              <div>
                <dt className="font-semibold text-lf-slate">Email</dt>
                <dd className="mt-1 text-lf-charcoal">{email}</dd>
              </div>
              <div>
                <dt className="font-semibold text-lf-slate">Name</dt>
                <dd className="mt-1 text-lf-charcoal">{name}</dd>
              </div>
              <div>
                <dt className="font-semibold text-lf-slate">Role</dt>
                <dd className="mt-1 text-lf-charcoal">{role}</dd>
              </div>
              <div>
                <dt className="font-semibold text-lf-slate">Status</dt>
                <dd className="mt-1 text-lf-charcoal">{status}</dd>
              </div>
            </dl>
          </div>

          <div className="card">
            <h2 className="h-display text-2xl">Admin tools</h2>
            <nav className="mt-4 grid gap-2">
              {adminLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="flex items-center justify-between rounded-lg border border-lf-line px-4 py-3 text-sm font-semibold text-lf-charcoal transition hover:border-lf-orange hover:text-lf-orange"
                >
                  <span>{link.label}</span>
                  <span aria-hidden className="text-lf-slate">&rarr;</span>
                </Link>
              ))}
            </nav>
          </div>
        </div>
      </section>
    </>
  );
}

function AdminNotice({
  title,
  children,
  actionHref,
  actionLabel,
}: {
  title: string;
  children: React.ReactNode;
  actionHref: string;
  actionLabel: string;
}) {
  return (
    <section className="container-page py-16">
      <div className="card max-w-2xl">
        <span className="text-xs font-semibold uppercase tracking-wide text-lf-orange">
          Admin
        </span>
        <h1 className="h-display mt-1 text-3xl">{title}</h1>
        <p className="prose-lf mt-3 text-base">{children}</p>
        <div className="mt-6 flex flex-wrap gap-3">
          <Link href={actionHref} className="btn-primary">
            {actionLabel}
          </Link>
          <Link href="/" className="btn-secondary">
            Back to home
          </Link>
        </div>
      </div>
    </section>
  );
}
