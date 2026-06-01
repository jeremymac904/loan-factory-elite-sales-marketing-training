import Link from "next/link";
import type { ReactNode } from "react";
import type { ProtectedAccessStatus } from "@/lib/supabase/protectedAccess";

type Props = {
  surfaceLabel: string;
  status: ProtectedAccessStatus;
  roleLabel?: string | null;
  children: ReactNode;
  actionHref?: string;
  actionLabel?: string;
  secondaryHref?: string;
  secondaryLabel?: string;
};

function getTitle(surfaceLabel: string, status: ProtectedAccessStatus) {
  switch (status) {
    case "not-configured":
      return `${surfaceLabel} sign-in setup needed`;
    case "signed-out":
      return "Sign in required";
    case "pending":
      return `${surfaceLabel} access pending`;
    case "access-denied":
      return `${surfaceLabel} access denied`;
    case "approved":
      return surfaceLabel;
    default:
      return surfaceLabel;
  }
}

function getActionHref(status: ProtectedAccessStatus, actionHref?: string) {
  if (actionHref) return actionHref;
  switch (status) {
    case "not-configured":
    case "signed-out":
      return "/login/";
    case "pending":
      return "/access-pending/";
    case "access-denied":
      return "/";
    default:
      return "/";
  }
}

function getActionLabel(status: ProtectedAccessStatus, actionLabel?: string) {
  if (actionLabel) return actionLabel;
  switch (status) {
    case "not-configured":
      return "Open sign in";
    case "signed-out":
      return "Sign in";
    case "pending":
      return "View pending status";
    case "access-denied":
      return "Back to home";
    default:
      return "Back to home";
  }
}

export default function AccessNotice({
  surfaceLabel,
  status,
  roleLabel,
  children,
  actionHref,
  actionLabel,
  secondaryHref = "/",
  secondaryLabel = "Back to home",
}: Props) {
  return (
    <section className="container-page py-16">
      <div className="card max-w-2xl">
        <span className="text-xs font-semibold uppercase tracking-wide text-lf-orange">
          {surfaceLabel}
        </span>
        <h1 className="h-display mt-1 text-3xl">{getTitle(surfaceLabel, status)}</h1>
        <p className="prose-lf mt-3 text-base">{children}</p>
        {status === "access-denied" && roleLabel && (
          <p className="mt-3 text-sm font-semibold text-lf-slate">
            Current role: {roleLabel}
          </p>
        )}
        <div className="mt-6 flex flex-wrap gap-3">
          <Link href={getActionHref(status, actionHref)} className="btn-primary">
            {getActionLabel(status, actionLabel)}
          </Link>
          <Link href={secondaryHref} className="btn-secondary">
            {secondaryLabel}
          </Link>
        </div>
      </div>
    </section>
  );
}
