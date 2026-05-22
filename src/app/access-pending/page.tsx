import Link from "next/link";

export const metadata = { title: "Access Pending" };

const reasonMessages: Record<string, string> = {
  domain:
    "This beta is limited to Google accounts using the loanfactory.com domain.",
  setup:
    "Supabase server env vars are not fully configured yet, so approval status cannot be checked.",
  "approval-sync":
    "Your Google login worked, but the approved user list could not be checked. Ask Jeremy to run the Supabase beta schema and grant SQL.",
  "profile-sync":
    "Your Google login worked, but the profile record could not be synced. Ask Jeremy to run the Supabase profile sync grant SQL and check the profiles table.",
  pending:
    "Your Loan Factory Google account is signed in, but your email is not active in approved_users yet.",
};

type Props = {
  searchParams?: Promise<{ reason?: string }> | { reason?: string };
};

export default async function AccessPendingPage({ searchParams }: Props) {
  const params = searchParams ? await searchParams : {};
  const reason = params.reason ?? "pending";
  const message = reasonMessages[reason] ?? reasonMessages.pending;

  return (
    <>
      <section className="relative isolate overflow-hidden bg-lf-navy text-white">
        <div
          aria-hidden
          className="absolute inset-0 bg-cover bg-center opacity-35"
          style={{ backgroundImage: "url(/media/dark-hero-background.png)" }}
        />
        <div className="relative container-page py-14">
          <h1 className="font-display text-4xl font-semibold tracking-tight">
            Access Pending
          </h1>
          <p className="mt-4 max-w-2xl text-lg text-white/85">
            Your sign-in was received. The beta platform checks both your Loan
            Factory email domain and the Supabase approved user list before
            opening protected areas.
          </p>
        </div>
      </section>

      <section className="container-page py-12">
        <div className="card max-w-2xl">
          <h2 className="h-display text-2xl">What happened</h2>
          <p className="prose-lf mt-3 text-base">{message}</p>
          <div className="mt-6 flex flex-wrap gap-3">
            <Link href="/login/" className="btn-primary">
              Try sign in again
            </Link>
            <Link href="/" className="btn-secondary">
              Back to home
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
