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
      </section>
    </>
  );
}
