import Link from "next/link";

export const metadata = { title: "Access Pending" };

const reasonMessages: Record<string, string> = {
  domain:
    "This beta is limited to Google accounts using the loanfactory.com domain.",
  setup:
    "The sign-in approval check is not ready yet. Ask Jeremy or LO Development to review setup.",
  "approval-sync":
    "Your Google login worked, but the approved user list could not be checked. Ask Jeremy or LO Development to review your access.",
  "profile-sync":
    "Your Google login worked, but your profile could not be saved. Ask Jeremy or LO Development to review your access.",
  pending:
    "Your Loan Factory Google account is signed in, but your email is not on the approved beta list yet.",
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
            Your sign-in was received. We still need to confirm that your Loan
            Factory email is approved for beta access.
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
