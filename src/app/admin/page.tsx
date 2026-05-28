import Link from "next/link";
import { isBetaPreviewEnabled } from "@/lib/betaPreview";
import { getRoleLabel, isAdminRole } from "@/lib/supabase/auth";
import { getBetaUserSession } from "@/lib/supabase/session";
import { approvedUserSeeds } from "@/data/approvedUsers";

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
  { label: "View-As Mode", href: "/admin/view-as" },
  { label: "Feedback", href: "/admin/quiz-review" },
  { label: "Lender Escalations", href: "/lender-escalation/" },
  { label: "FaceGram Moderation", href: "/facegram/" },
  { label: "AI Assistant Settings", href: "/admin/ai-assistants" },
  { label: "Coaching Members", href: "/coaching/" },
  { label: "Platform Status", href: "/auth/status/" },
];

const roleGroupCount = new Set(approvedUserSeeds.map((u) => u.role)).size;
const departmentCount = new Set(
  approvedUserSeeds.map((u) => u.department).filter(Boolean),
).size;

function AdminShell({
  session,
  preview = false,
}: {
  session?: Extract<Awaited<ReturnType<typeof getBetaUserSession>>, { status: "approved" }>;
  preview?: boolean;
}) {
  return (
    <>
      <section className="relative isolate overflow-hidden bg-lf-navy text-white">
        <div
          aria-hidden
          className="absolute inset-0 bg-cover bg-center opacity-35"
          style={{ backgroundImage: "url(/media/dark-hero-background.png)" }}
        />
        <div className="relative container-page py-14">
          <div className="flex items-center gap-3">
            <p className="text-xs font-bold uppercase tracking-wide text-lf-orange">
              Admin
            </p>
            {preview && (
              <span className="rounded-full border border-lf-orange/40 bg-lf-orange/20 px-2.5 py-0.5 text-xs font-bold uppercase tracking-wide text-lf-orange">
                Beta Preview Mode
              </span>
            )}
          </div>
          <h1 className="mt-5 font-display text-4xl font-semibold tracking-tight">
            Admin Dashboard
          </h1>
          <p className="mt-4 max-w-2xl text-lg text-white/85">
            {preview
              ? "You are viewing this page in beta preview mode. No real user session is active. This is for internal UI review only."
              : `Signed in as ${session?.profile.full_name ?? session?.profile.email ?? "admin"}.`}
          </p>
        </div>
      </section>

      <section className="container-page py-12">
        <div className="grid gap-6 lg:grid-cols-2">
          {preview ? (
            <div className="card border-lf-orange/30 bg-lf-orangeSoft/30">
              <div className="flex items-center gap-2">
                <h2 className="h-display text-2xl">Beta Preview Mode</h2>
                <span className="rounded-full bg-lf-orange px-2.5 py-0.5 text-xs font-bold text-white">
                  Preview
                </span>
              </div>
              <p className="prose-lf mt-3 text-sm text-lf-charcoal">
                You are browsing in beta preview mode. This does not represent a
                real user session. No data is being read from or written to
                Supabase. Sign in with your Loan Factory Google account to see
                your real profile and permissions.
              </p>
              <div className="mt-4">
                <Link href="/login/" className="btn-primary text-sm">
                  Sign in with Google
                </Link>
              </div>
            </div>
          ) : (
            <div className="card">
              <div className="flex items-center gap-2">
                <h2 className="h-display text-2xl">Current user</h2>
                <span className="rounded-full bg-green-100 px-2.5 py-0.5 text-xs font-semibold text-green-800">
                  Google Authenticated
                </span>
              </div>
              <dl className="mt-5 grid gap-3 text-sm">
                <ProfileField label="Name" value={session?.profile.full_name ?? "Not set"} />
                <ProfileField label="Email" value={session?.profile.email ?? ""} />
                <div>
                  <dt className="font-semibold text-lf-slate">Role</dt>
                  <dd className="mt-1">
                    <span className="inline-block rounded-full bg-lf-navy px-2.5 py-0.5 text-xs font-semibold text-white">
                      {getRoleLabel(session?.profile.role)}
                    </span>
                  </dd>
                </div>
                <ProfileField label="Department" value={session?.profile.department ?? "—"} />
                <ProfileField label="Status" value={session?.profile.status ?? "—"} />
              </dl>
            </div>
          )}

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

        <div className="mt-8 rounded-xl border border-lf-line bg-lf-mist p-5">
          <h2 className="text-sm font-bold uppercase tracking-wide text-lf-slate">
            Platform status
          </h2>
          <div className="mt-3 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            <StatusItem label="Approved users" value={String(approvedUserSeeds.length)} />
            <StatusItem label="Roles" value={`${roleGroupCount} active`} />
            <StatusItem label="Departments" value={String(departmentCount)} />
            <StatusItem label="Auth" value="Google OAuth" />
          </div>
          <p className="prose-lf mt-4 text-xs text-lf-slate">
            Role access is managed through Supabase. Beta preview mode is
            available for internal UI review without a live session.
          </p>
        </div>
      </section>
    </>
  );
}

function ProfileField({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <dt className="font-semibold text-lf-slate">{label}</dt>
      <dd className="mt-1 text-lf-charcoal">{value}</dd>
    </div>
  );
}

function StatusItem({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-lg border border-lf-line bg-white px-4 py-3">
      <p className="text-xs font-semibold text-lf-slate">{label}</p>
      <p className="mt-1 text-lg font-bold text-lf-charcoal">{value}</p>
    </div>
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
