import GoogleSignInButton from "@/components/GoogleSignInButton";
import Link from "next/link";

export const metadata = { title: "Sign In" };

export default function LoginPage() {
  return (
    <>
      <section className="relative isolate overflow-hidden bg-lf-navy text-white">
        <div
          aria-hidden
          className="absolute inset-0 bg-cover bg-center opacity-40"
          style={{ backgroundImage: "url(/media/dark-hero-background.png)" }}
        />
        <div className="relative container-page py-14">
          <h1 className="mt-5 font-display text-4xl font-semibold tracking-tight">
            Sign in to LO Development.
          </h1>
          <p className="mt-4 max-w-2xl text-lg text-white/85">
            Use your Loan Factory Google account. Access is limited to approved
            beta users with a loanfactory.com email address.
          </p>
        </div>
      </section>

      <section className="container-page py-12">
        <div className="grid gap-6 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)]">
          <div className="card">
            <h2 className="h-display text-2xl">Google authentication</h2>
            <p className="prose-lf mt-3 text-base">
              Supabase handles the Google OAuth session and Postgres role
              checks. If your account is approved, you will return to the
              platform with your beta role applied.
            </p>
            <div className="mt-6">
              <GoogleSignInButton />
            </div>
          </div>

          <div className="card">
            <h2 className="h-display text-xl">Access rules</h2>
            <ul className="prose-lf mt-3 list-disc space-y-1 pl-5 text-base">
              <li>Only loanfactory.com Google accounts are allowed.</li>
              <li>Approved beta users are matched in Supabase.</li>
              <li>Unapproved users land on Access Pending.</li>
              <li>User management stays in Supabase during beta.</li>
            </ul>
            <div className="mt-5 flex flex-wrap gap-3">
              <Link href="/" className="btn-secondary">
                Back to home
              </Link>
              <Link href="/auth/status/" className="btn-secondary">
                Check auth status
              </Link>
            </div>
          </div>
        </div>

        <div className="mt-6 rounded-2xl border border-lf-orange/30 bg-lf-orangeSoft p-6 shadow-card">
          <h2 className="h-display text-xl">Internal beta preview</h2>
          <p className="prose-lf mt-2 max-w-3xl text-sm text-lf-slate">
            Use this when Google/Supabase auth is not ready and Jeremy needs to
            review the live UI. Preview mode is a session-only review bypass. It
            is not production auth, does not create real permissions, does not
            send email, and does not connect Gmail, Drive, n8n, TERA, or AI
            providers.
          </p>
          <Link href="/auth/preview/?next=/" className="btn-primary mt-5">
            Enter Beta Preview
          </Link>
        </div>
      </section>
    </>
  );
}
