import Link from "next/link";
import { isBetaPreviewEnabled } from "@/lib/betaPreview";
import { getRoleLabel, isAdminRole } from "@/lib/supabase/auth";
import { getBetaUserSession } from "@/lib/supabase/session";
import { approvedUserSeeds } from "@/data/approvedUsers";
import AdminConsole from "@/components/admin/AdminConsole";

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

      <AdminConsole
        user={{
          name: preview
            ? "Beta preview (no live session)"
            : session?.profile.full_name ?? "Not set",
          email: preview ? "—" : session?.profile.email ?? "",
          roleLabel: preview
            ? "Preview"
            : getRoleLabel(session?.profile.role),
          department: preview ? "—" : session?.profile.department ?? "—",
          status: preview ? "Preview" : session?.profile.status ?? "—",
          preview,
        }}
        stats={[
          { label: "Approved users", value: String(approvedUserSeeds.length) },
          { label: "Roles", value: `${roleGroupCount} active` },
          { label: "Departments", value: String(departmentCount) },
          { label: "Auth", value: "Google OAuth" },
        ]}
      />
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
