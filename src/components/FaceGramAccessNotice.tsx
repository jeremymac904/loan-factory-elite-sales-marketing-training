import Link from "next/link";

type Props = {
  status: "not-configured" | "signed-out" | "pending" | "role";
  roleLabel?: string;
};

const copyByStatus = {
  "not-configured": {
    title: "FaceGram setup needed",
    body: "FaceGram is Loan Factory's internal community. Supabase auth must be configured before the internal feed can open.",
    actionHref: "/login/",
    actionLabel: "Open sign in",
  },
  "signed-out": {
    title: "Sign in required",
    body: "FaceGram is only for approved Loan Factory beta users. Sign in with your Loan Factory Google account to continue.",
    actionHref: "/login/",
    actionLabel: "Sign in",
  },
  pending: {
    title: "FaceGram access pending",
    body: "Your Google sign-in was received, but your account is not approved for FaceGram yet.",
    actionHref: "/access-pending/",
    actionLabel: "View pending status",
  },
  role: {
    title: "FaceGram role required",
    body: "Your current beta role is not enabled for FaceGram. Ask Jeremy or LO Development to review your Supabase role permissions.",
    actionHref: "/resources/",
    actionLabel: "Open resources",
  },
};

export default function FaceGramAccessNotice({ status, roleLabel }: Props) {
  const copy = copyByStatus[status];

  return (
    <section className="container-page py-16">
      <div className="card max-w-2xl">
        <span className="text-xs font-semibold uppercase tracking-wide text-lf-orange">
          FaceGram
        </span>
        <h1 className="h-display mt-1 text-3xl">{copy.title}</h1>
        <p className="prose-lf mt-3 text-base">{copy.body}</p>
        {status === "role" && roleLabel && (
          <p className="mt-3 text-sm font-semibold text-lf-slate">
            Current role: {roleLabel}
          </p>
        )}
        <div className="mt-6 flex flex-wrap gap-3">
          <Link href={copy.actionHref} className="btn-primary">
            {copy.actionLabel}
          </Link>
          <Link href="/" className="btn-secondary">
            Back to home
          </Link>
        </div>
      </div>
    </section>
  );
}
