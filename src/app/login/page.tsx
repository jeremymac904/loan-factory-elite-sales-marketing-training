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
            Sign in to LO Development
          </h1>
          <p className="mt-4 max-w-2xl text-lg text-white/85">
            Use your Loan Factory Google account to open your training,
            coaching, FaceGram, resources, and AI help.
          </p>
        </div>
      </section>

      <section className="container-page py-12">
        <div className="grid gap-6 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)]">
          <div className="card">
            <h2 className="h-display text-2xl">Sign in with Google</h2>
            <p className="prose-lf mt-3 text-base">
              Click the button below and choose your Loan Factory Google
              account. If your email is approved, you will come back to the
              site signed in.
            </p>
            <div className="mt-6">
              <GoogleSignInButton />
            </div>
          </div>

          <div className="card">
            <h2 className="h-display text-xl">Who can get in?</h2>
            <ul className="prose-lf mt-3 list-disc space-y-1 pl-5 text-base">
              <li>Only loanfactory.com Google accounts are allowed.</li>
              <li>Your email must be on the approved beta list.</li>
              <li>If you are not approved yet, you will see Access Pending.</li>
              <li>Ask Jeremy or LO Development if you need access.</li>
            </ul>
            <div className="mt-5 flex flex-wrap gap-3">
              <Link href="/" className="btn-secondary">
                Back to home
              </Link>
              <Link href="/auth/status/" className="btn-secondary">
                Check sign-in status
              </Link>
            </div>
          </div>
        </div>

        <div className="mt-6 rounded-2xl border border-lf-orange/30 bg-lf-orangeSoft p-6 shadow-card">
          <h2 className="h-display text-xl">Internal review access</h2>
          <p className="prose-lf mt-2 max-w-3xl text-sm text-lf-slate">
            Use this only when Jeremy needs to review the site and Google sign
            in is not ready. Internal review access opens the pages, but it is
            not real production security and does not change real systems.
          </p>
          <Link href="/auth/preview/?next=/" className="btn-primary mt-5">
            Enter Internal Review
          </Link>
        </div>
      </section>
    </>
  );
}
