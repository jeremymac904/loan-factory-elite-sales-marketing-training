import Link from "next/link";
import { betaPreviewEmail, isBetaPreviewEnabled } from "@/lib/betaPreview";
import { getRoleLabel } from "@/lib/supabase/auth";
import { getBetaUserSession } from "@/lib/supabase/session";

export const dynamic = "force-dynamic";
export const metadata = { title: "Security · Settings" };

export default async function SecuritySettingsPage() {
  const session = await getBetaUserSession();
  const previewEnabled = await isBetaPreviewEnabled();

  if (!previewEnabled && session.status !== "approved") {
    return (
      <section className="container-page py-16">
        <div className="card max-w-2xl">
          <h1 className="h-display text-3xl">Sign in required</h1>
          <p className="prose-lf mt-3">
            Security settings are available to approved Loan Factory users. Sign
            in with your Loan Factory Google account to continue.
          </p>
          <Link href="/login/" className="btn-primary mt-6 inline-block">
            Sign in
          </Link>
        </div>
      </section>
    );
  }

  const profile =
    !previewEnabled && session.status === "approved" ? session.profile : null;
  const email = profile?.email ?? (previewEnabled ? betaPreviewEmail : "");
  const role = previewEnabled ? "Review" : getRoleLabel(profile?.role);
  const accountStatus = previewEnabled
    ? "Review-only"
    : profile?.status === "approved"
      ? "Approved"
      : profile?.status ?? "Pending";

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
              href="/settings/"
              className="text-sm font-semibold text-white/70 hover:text-white"
            >
              Settings
            </Link>
            <span className="text-white/40">/</span>
            <span className="text-sm font-semibold text-white">Security</span>
          </div>
          <h1 className="mt-3 font-display text-4xl font-semibold tracking-tight">
            Security &amp; sign-in
          </h1>
          <p className="mt-3 max-w-2xl text-lg text-white/85">
            How you sign in to the Loan Factory platform and where your identity
            is managed.
          </p>
        </div>
      </section>

      <section className="container-page py-10">
        <div className="grid gap-6 lg:grid-cols-2">
          <div className="card">
            <h2 className="h-display text-2xl">Sign-in details</h2>
            <dl className="mt-5 grid gap-4 text-sm">
              <div>
                <dt className="font-semibold text-lf-slate">Sign-in method</dt>
                <dd className="mt-1 text-lf-charcoal">
                  Google Workspace SSO
                </dd>
              </div>
              <div>
                <dt className="font-semibold text-lf-slate">Email</dt>
                <dd className="mt-1 break-words text-lf-charcoal">{email}</dd>
              </div>
              <div>
                <dt className="font-semibold text-lf-slate">Account status</dt>
                <dd className="mt-1">
                  <span
                    className={`rounded-full px-2.5 py-0.5 text-xs font-semibold ${
                      accountStatus === "Approved"
                        ? "bg-green-100 text-green-800"
                        : "bg-lf-mist text-lf-slate"
                    }`}
                  >
                    {accountStatus}
                  </span>
                </dd>
              </div>
              <div>
                <dt className="font-semibold text-lf-slate">Role</dt>
                <dd className="mt-1 text-lf-charcoal">{role}</dd>
              </div>
            </dl>
          </div>

          <div className="card">
            <h2 className="h-display text-2xl">Identity &amp; password</h2>
            <p className="prose-lf mt-3 text-sm">
              The Loan Factory platform uses Google Workspace single sign-on.
              Your password, two-step verification (2FA), recovery options, and
              connected devices are all managed in your Google Account — there
              is no separate Loan Factory password to maintain.
            </p>
            <div className="mt-5 flex flex-wrap gap-3">
              <a
                href="https://myaccount.google.com/"
                target="_blank"
                rel="noopener noreferrer"
                className="btn-secondary text-sm"
              >
                Manage your Google Account
              </a>
              <Link href="/settings/google/" className="btn-secondary text-sm">
                Google connections
              </Link>
            </div>
          </div>

          <div className="card lg:col-span-2">
            <h2 className="h-display text-2xl">Session</h2>
            <p className="prose-lf mt-3 text-sm">
              Signing out ends your session on this device. You can sign back in
              anytime with your Loan Factory Google account.
            </p>
            <div className="mt-5 flex flex-wrap gap-3">
              <Link
                href="/auth/sign-out/"
                className="btn-secondary border-red-200 text-red-600 hover:border-red-400 hover:text-red-700"
              >
                Sign out
              </Link>
              <Link href="/settings/" className="btn-secondary">
                Back to settings
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
