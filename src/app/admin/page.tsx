import Link from "next/link";
import { getRoleLabel } from "@/lib/supabase/auth";
import { getBetaUserSession } from "@/lib/supabase/session";

export const dynamic = "force-dynamic";
export const metadata = { title: "Admin" };

export default async function AdminPage() {
  const session = await getBetaUserSession();

  if (session.status === "not-configured") {
    return <AdminNotice title="Supabase setup needed" actionHref="/login/" actionLabel="Open sign in">
      Supabase public env vars are missing in this environment. Add the
      Netlify/Supabase env vars before beta authentication can run.
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
    session.permissions?.can_access_admin || session.profile.role === "admin";

  if (!canAccessAdmin) {
    return <AdminNotice title="Admin role required" actionHref="/" actionLabel="Back to home">
      Your current role is {getRoleLabel(session.profile.role)}. Supabase admin
      access is limited to users with can_access_admin.
    </AdminNotice>;
  }

  return (
    <>
      <section className="relative isolate overflow-hidden bg-lf-navy text-white">
        <div
          aria-hidden
          className="absolute inset-0 bg-cover bg-center opacity-35"
          style={{ backgroundImage: "url(/media/dark-hero-background.png)" }}
        />
        <div className="relative container-page py-14">
          <span className="rounded-full bg-lf-orange px-3 py-1 text-xs font-bold uppercase tracking-wide">
            Admin beta
          </span>
          <h1 className="mt-5 font-display text-4xl font-semibold tracking-tight">
            User Access
          </h1>
          <p className="mt-4 max-w-2xl text-lg text-white/85">
            Current beta user context. Full user management stays in Supabase
            while the platform is in beta.
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
                <dd className="mt-1 text-lf-charcoal">{session.profile.email}</dd>
              </div>
              <div>
                <dt className="font-semibold text-lf-slate">Name</dt>
                <dd className="mt-1 text-lf-charcoal">
                  {session.profile.full_name ?? "Not set"}
                </dd>
              </div>
              <div>
                <dt className="font-semibold text-lf-slate">Role</dt>
                <dd className="mt-1 text-lf-charcoal">
                  {getRoleLabel(session.profile.role)}
                </dd>
              </div>
              <div>
                <dt className="font-semibold text-lf-slate">Status</dt>
                <dd className="mt-1 text-lf-charcoal">{session.profile.status}</dd>
              </div>
            </dl>
          </div>

          <div className="card">
            <h2 className="h-display text-2xl">How to manage users</h2>
            <p className="prose-lf mt-3 text-base">
              Add, deactivate, or change beta roles in Supabase by editing the
              approved_users table. The OAuth callback syncs approved records
              into profiles after sign-in.
            </p>
            <p className="prose-lf mt-3 text-sm text-lf-slate">
              Do not put the Supabase service role key in browser code. The app
              only uses it in the server-side callback to sync approved users.
            </p>
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
