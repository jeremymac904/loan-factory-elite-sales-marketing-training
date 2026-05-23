import Link from "next/link";
import AuthDebugTrailView from "@/components/AuthDebugTrail";
import AuthClientStatus from "@/components/AuthClientStatus";
import { betaPreviewEmail, isBetaPreviewEnabled } from "@/lib/betaPreview";
import { getRoleLabel } from "@/lib/supabase/auth";
import { getBetaUserSession } from "@/lib/supabase/session";

export const dynamic = "force-dynamic";
export const metadata = { title: "Auth Status" };

export default async function AuthStatusPage() {
  const session = await getBetaUserSession();
  const previewEnabled = await isBetaPreviewEnabled();
  const canAccessAdmin =
    previewEnabled ||
    session.status === "approved" &&
    (session.permissions?.can_access_admin || session.profile.role === "admin");
  const serverSessionExists =
    session.status === "approved" || session.status === "pending";
  const serverProfile =
    session.status === "approved" || session.status === "pending"
      ? session.profile
      : null;

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
            Supabase beta
          </span>
          <h1 className="mt-5 font-display text-4xl font-semibold tracking-tight">
            Auth Status
          </h1>
          <p className="mt-4 max-w-2xl text-lg text-white/85">
            Safe session diagnostics for Google Auth, profile sync, and beta
            role access. This page does not display API keys or token values.
          </p>
        </div>
      </section>

      <section className="container-page py-12">
        <div className="grid gap-6 lg:grid-cols-2">
          <div className="card">
            <h2 className="h-display text-2xl">Server session</h2>
            <dl className="mt-5 grid gap-3 text-sm">
              <StatusLine label="Server status" value={session.status} />
              {previewEnabled && (
                <>
                  <StatusLine label="Internal review access" value="Enabled" />
                  <StatusLine label="Review email" value={betaPreviewEmail} />
                  <StatusLine label="Admin access" value="Review only" />
                </>
              )}
              {session.status === "approved" && (
                <>
                  <StatusLine label="Email" value={session.profile.email} />
                  <StatusLine
                    label="Profile status"
                    value={session.profile.status ?? "Not set"}
                  />
                  <StatusLine
                    label="Role"
                    value={getRoleLabel(session.profile.role)}
                  />
                  <StatusLine
                    label="Admin access"
                    value={canAccessAdmin ? "Yes" : "No"}
                  />
                </>
              )}
              {session.status === "pending" && (
                <>
                  <StatusLine
                    label="Email"
                    value={session.user.email ?? "Signed in user"}
                  />
                  <StatusLine
                    label="Profile status"
                    value={session.profile?.status ?? "No profile row visible"}
                  />
                  <StatusLine
                    label="Role"
                    value={getRoleLabel(session.profile?.role)}
                  />
                </>
              )}
            </dl>
          </div>

          <AuthClientStatus />

          <AuthDebugTrailView
            serverSessionExists={serverSessionExists}
            serverStatus={session.status}
            serverProfileEmail={serverProfile?.email}
            serverProfileRole={serverProfile?.role}
            serverProfileStatus={serverProfile?.status}
          />
        </div>

        <div className="mt-8 flex flex-wrap gap-3">
          <Link href="/login/" className="btn-primary">
            Sign in
          </Link>
          <Link href="/admin/" className="btn-secondary">
            Open admin
          </Link>
          <Link href="/auth/sign-out/" className="btn-secondary">
            Sign out
          </Link>
        </div>
      </section>
    </>
  );
}

function StatusLine({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <dt className="font-semibold text-lf-slate">{label}</dt>
      <dd className="mt-1 break-words text-lf-charcoal">{value}</dd>
    </div>
  );
}
