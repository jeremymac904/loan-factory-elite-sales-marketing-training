import Link from "next/link";
import { isBetaPreviewEnabled } from "@/lib/betaPreview";
import { getRoleLabel, isAdminRole } from "@/lib/supabase/auth";
import { getBetaUserSession } from "@/lib/supabase/session";
import { approvedUserSeeds } from "@/data/approvedUsers";

export const dynamic = "force-dynamic";
export const metadata = { title: "Users & Access" };

export default async function AdminUsersPage() {
  const session = await getBetaUserSession();
  const previewEnabled = await isBetaPreviewEnabled();

  if (!previewEnabled) {
    if (session.status !== "approved") {
      return (
        <section className="container-page py-16">
          <div className="card max-w-2xl">
            <h1 className="h-display text-3xl">Sign in required</h1>
            <p className="prose-lf mt-3">
              Admin access requires an approved Loan Factory Google account.
            </p>
            <Link href="/login/" className="btn-primary mt-6 inline-block">
              Sign in
            </Link>
          </div>
        </section>
      );
    }

    const canAccessAdmin =
      session.permissions?.can_access_admin || isAdminRole(session.profile.role);

    if (!canAccessAdmin) {
      return (
        <section className="container-page py-16">
          <div className="card max-w-2xl">
            <h1 className="h-display text-3xl">Admin role required</h1>
            <p className="prose-lf mt-3">
              Your current role is {getRoleLabel(session.profile.role)}.
            </p>
            <Link href="/" className="btn-primary mt-6 inline-block">
              Back to home
            </Link>
          </div>
        </section>
      );
    }
  }

  const departments = Array.from(
    new Set(approvedUserSeeds.map((u) => u.department).filter(Boolean)),
  ).sort();

  const roleGroups = Array.from(
    new Set(approvedUserSeeds.map((u) => u.role)),
  ).sort();

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
            <Link
              href="/admin/"
              className="text-sm font-semibold text-white/70 hover:text-white"
            >
              Admin
            </Link>
            <span className="text-white/40">/</span>
            <span className="text-sm font-semibold text-white">
              Users &amp; Access
            </span>
          </div>
          <h1 className="mt-5 font-display text-4xl font-semibold tracking-tight">
            Users &amp; Access
          </h1>
          <p className="mt-4 max-w-2xl text-lg text-white/85">
            {approvedUserSeeds.length} approved users across{" "}
            {departments.length} departments and {roleGroups.length} roles.
          </p>
        </div>
      </section>

      <section className="container-page py-10">
        <div className="mb-6 flex flex-wrap gap-2">
          {roleGroups.map((role) => (
            <span
              key={role}
              className="rounded-full border border-lf-line bg-lf-mist px-3 py-1 text-xs font-semibold text-lf-charcoal"
            >
              {getRoleLabel(role)}{" "}
              <span className="text-lf-slate">
                ({approvedUserSeeds.filter((u) => u.role === role).length})
              </span>
            </span>
          ))}
        </div>

        <div className="overflow-x-auto rounded-xl border border-lf-line">
          <table className="w-full text-left text-sm">
            <thead>
              <tr className="border-b border-lf-line bg-lf-mist">
                <th className="px-4 py-3 font-semibold text-lf-charcoal">
                  Name
                </th>
                <th className="px-4 py-3 font-semibold text-lf-charcoal">
                  Email
                </th>
                <th className="px-4 py-3 font-semibold text-lf-charcoal">
                  Role
                </th>
                <th className="px-4 py-3 font-semibold text-lf-charcoal">
                  Department
                </th>
                <th className="px-4 py-3 font-semibold text-lf-charcoal">
                  Title
                </th>
                <th className="px-4 py-3 font-semibold text-lf-charcoal">
                  Multi-Role
                </th>
                <th className="px-4 py-3 font-semibold text-lf-charcoal">
                  Status
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-lf-line">
              {approvedUserSeeds.map((user) => (
                <tr
                  key={user.email}
                  className="transition hover:bg-lf-mist/50"
                >
                  <td className="px-4 py-3 font-medium text-lf-charcoal">
                    {user.full_name}
                  </td>
                  <td className="px-4 py-3 text-lf-slate">{user.email}</td>
                  <td className="px-4 py-3">
                    <span className="inline-block rounded-full bg-lf-navy px-2.5 py-0.5 text-xs font-semibold text-white">
                      {getRoleLabel(user.role)}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-lf-slate">
                    {user.department ?? "—"}
                  </td>
                  <td className="px-4 py-3 text-lf-slate">
                    {user.title ?? "—"}
                  </td>
                  <td className="px-4 py-3">
                    {user.additionalRoles && user.additionalRoles.length > 0 ? (
                      <div className="flex flex-wrap gap-1">
                        {user.additionalRoles.map((r) => (
                          <span
                            key={r}
                            className="inline-block rounded-full border border-lf-orange/30 bg-lf-orangeSoft px-2 py-0.5 text-xs font-semibold text-lf-orangeDark"
                          >
                            {getRoleLabel(r)}
                          </span>
                        ))}
                      </div>
                    ) : (
                      <span className="text-lf-slate">—</span>
                    )}
                  </td>
                  <td className="px-4 py-3">
                    <span className="inline-block rounded-full bg-green-100 px-2.5 py-0.5 text-xs font-semibold text-green-800">
                      Active
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="mt-8 rounded-xl border border-lf-line bg-lf-mist p-5">
          <h2 className="text-sm font-bold uppercase tracking-wide text-lf-slate">
            Access management
          </h2>
          <p className="prose-lf mt-2 text-sm text-lf-charcoal">
            Users are managed through the Supabase role-access system. Approved
            users and roles have been seeded for beta. Full in-app user editing
            is planned for a later phase.
          </p>
        </div>
      </section>
    </>
  );
}
