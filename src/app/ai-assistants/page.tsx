import Link from "next/link";
import AIAssistantHub from "@/components/AIAssistantHub";
import { canAccessAiAssistants, getRoleLabel } from "@/lib/supabase/auth";
import { getBetaUserSession } from "@/lib/supabase/session";

export const metadata = { title: "AI Assistants" };
export const dynamic = "force-dynamic";

export default async function AIAssistantsPage() {
  const session = await getBetaUserSession();

  if (session.status === "not-configured") {
    return (
      <AIAssistantNotice
        title="AI Assistant setup needed"
        actionHref="/login/"
        actionLabel="Open sign in"
      >
        Supabase auth must be configured before beta users can use AI
        Assistants.
      </AIAssistantNotice>
    );
  }

  if (session.status === "signed-out") {
    return (
      <AIAssistantNotice
        title="Sign in required"
        actionHref="/login/"
        actionLabel="Sign in"
      >
        AI Assistants are only for approved Loan Factory beta users. Sign in
        with your Loan Factory Google account to continue.
      </AIAssistantNotice>
    );
  }

  if (session.status === "pending") {
    return (
      <AIAssistantNotice
        title="AI Assistant access pending"
        actionHref="/access-pending/"
        actionLabel="View pending status"
      >
        Your Google sign-in was received, but your account is not approved for
        AI Assistants yet.
      </AIAssistantNotice>
    );
  }

  if (!canAccessAiAssistants(session.profile, session.permissions)) {
    return (
      <AIAssistantNotice
        title="AI Assistant role required"
        actionHref="/resources/"
        actionLabel="Open resources"
      >
        Your current role is {getRoleLabel(session.profile.role)}. Ask Jeremy or
        LO Development to review your Supabase role permissions.
      </AIAssistantNotice>
    );
  }

  return <AIAssistantHub />;
}

function AIAssistantNotice({
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
          AI Assistants
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
