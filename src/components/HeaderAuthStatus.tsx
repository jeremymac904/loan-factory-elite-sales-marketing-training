import Link from "next/link";
import { isBetaPreviewEnabled } from "@/lib/betaPreview";
import { getRoleDashboardHref, getRoleLabel } from "@/lib/supabase/auth";
import { roleCanCoach } from "@/lib/coachAccess";
import { getBetaUserSession } from "@/lib/supabase/session";

type Props = {
  variant?: "desktop" | "mobile";
};

export default async function HeaderAuthStatus({ variant = "desktop" }: Props) {
  const session = await getBetaUserSession();
  const previewEnabled = await isBetaPreviewEnabled();

  if (previewEnabled) {
    return (
      <div
        className={
          variant === "mobile"
            ? "grid gap-2 rounded-xl border border-lf-orange/30 bg-lf-orangeSoft p-3"
            : "flex items-center gap-2"
        }
      >
        <Link
          href="/admin/"
          className={
            variant === "mobile"
              ? "rounded-lg bg-white px-3 py-2 text-sm font-semibold text-lf-charcoal hover:text-lf-orange"
              : "inline-flex items-center justify-center whitespace-nowrap rounded-lg border border-lf-orange/30 bg-lf-orangeSoft px-3 py-2 text-sm font-semibold text-lf-orangeDark transition hover:border-lf-orange"
          }
        >
          Internal Review
        </Link>
        <Link
          href="/coach-command-center/"
          className={
            variant === "mobile"
              ? "rounded-lg bg-white px-3 py-2 text-sm font-semibold text-lf-charcoal hover:text-lf-orange"
              : "inline-flex items-center justify-center whitespace-nowrap rounded-lg border border-lf-orange/30 bg-lf-orangeSoft px-3 py-2 text-sm font-semibold text-lf-orangeDark transition hover:border-lf-orange"
          }
        >
          Coach Center
        </Link>
        <Link
          href="/auth/preview-exit/"
          className={
            variant === "mobile"
              ? "rounded-lg border border-lf-line bg-white px-3 py-2 text-sm font-semibold text-lf-slate hover:text-lf-orange"
              : "inline-flex items-center justify-center whitespace-nowrap rounded-lg px-3 py-2 text-sm font-semibold text-lf-slate transition hover:bg-lf-mist hover:text-lf-orange"
          }
        >
          Exit
        </Link>
      </div>
    );
  }

  if (session.status !== "approved" && session.status !== "pending") {
    return (
      <Link
        href="/login/"
        className={
          variant === "mobile"
            ? "rounded-lg bg-lf-navy px-3 py-3 text-center text-base font-semibold text-white hover:bg-lf-orange"
            : "inline-flex items-center justify-center whitespace-nowrap rounded-lg bg-lf-navy px-4 py-2 text-sm font-semibold text-white transition hover:bg-lf-orange"
        }
      >
        Sign In
      </Link>
    );
  }

  const profile = session.profile;
  const roleLabel =
    session.status === "approved" ? getRoleLabel(session.profile.role) : "Pending";
  const email = profile?.email ?? session.user.email ?? "Signed in";
  const destination =
    session.status === "approved"
      ? getRoleDashboardHref(session.profile.role)
      : "/profile/";
  const showCoach =
    session.status === "approved" && roleCanCoach(session.profile.role);

  return (
    <div
      className={
        variant === "mobile"
          ? "grid gap-2 rounded-xl border border-lf-line bg-lf-mist p-3"
          : "flex items-center gap-2"
      }
    >
      {showCoach && (
        <Link
          href="/coach-command-center/"
          className={
            variant === "mobile"
              ? "rounded-lg bg-white px-3 py-2 text-sm font-semibold text-lf-charcoal hover:text-lf-orange"
              : "inline-flex items-center justify-center whitespace-nowrap rounded-lg border border-lf-line bg-white px-3 py-2 text-sm font-semibold text-lf-charcoal transition hover:border-lf-orange hover:text-lf-orange"
          }
        >
          Coach Center
        </Link>
      )}
      <Link
        href={destination}
        className={
          variant === "mobile"
            ? "rounded-lg bg-white px-3 py-2 text-sm font-semibold text-lf-charcoal hover:text-lf-orange"
            : "inline-flex items-center justify-center whitespace-nowrap rounded-lg border border-lf-line bg-white px-3 py-2 text-sm font-semibold text-lf-charcoal transition hover:border-lf-orange hover:text-lf-orange"
        }
      >
        {variant === "mobile" ? `${email} · ${roleLabel}` : roleLabel}
      </Link>
      <Link
        href="/auth/sign-out/"
        className={
          variant === "mobile"
            ? "rounded-lg border border-lf-line bg-white px-3 py-2 text-sm font-semibold text-lf-slate hover:text-lf-orange"
            : "inline-flex items-center justify-center whitespace-nowrap rounded-lg px-3 py-2 text-sm font-semibold text-lf-slate transition hover:bg-lf-mist hover:text-lf-orange"
        }
      >
        Sign Out
      </Link>
    </div>
  );
}
