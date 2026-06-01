import Link from "next/link";
import { getRoleDashboardHref, getRoleLabel, isAdminRole } from "@/lib/supabase/auth";
import { roleCanCoach } from "@/lib/coachAccess";
import { getBetaUserSession } from "@/lib/supabase/session";

type Props = {
  variant?: "desktop" | "mobile";
};

type MenuItem = {
  href: string;
  label: string;
  tone?: "default" | "danger";
};

export default async function HeaderAuthStatus({ variant = "desktop" }: Props) {
  const session = await getBetaUserSession();

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

  const approved = session.status === "approved";
  const role = approved ? session.profile.role : undefined;
  const roleLabel = approved ? getRoleLabel(role) : "Pending approval";
  const email =
    (approved ? session.profile.email : session.user.email) ?? "Signed in";
  const dashboardHref = approved ? getRoleDashboardHref(role) : "/profile/";
  const canCoach = approved && roleCanCoach(role);
  const canAdmin = approved && isAdminRole(role);

  const items: MenuItem[] = [
    { href: dashboardHref, label: "My dashboard" },
  ];
  if (canCoach) items.push({ href: "/coach-command-center/", label: "Coach Center" });
  if (canAdmin) items.push({ href: "/admin/", label: "Admin tools" });
  items.push({ href: "/profile/", label: "Profile" });
  items.push({ href: "/settings/", label: "Settings" });
  items.push({ href: "/auth/sign-out/", label: "Sign out", tone: "danger" });

  if (variant === "mobile") {
    return (
      <div className="grid gap-2 rounded-xl border border-lf-line bg-lf-mist p-3">
        <div className="px-1 pb-1">
          <p className="truncate text-sm font-semibold text-lf-charcoal">
            {email}
          </p>
          <p className="text-xs font-semibold uppercase tracking-wide text-lf-orange">
            {roleLabel}
          </p>
        </div>
        {items.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            // Auth-sensitive route: never prefetch. A prefetch that runs during a
            // transient auth-resolution miss would cache a signed-out RSC payload
            // and client navigation would reuse it (header shows the user, page
            // body shows "Sign in required"). prefetch={false} forces a fresh
            // cookie-present fetch at click time.
            prefetch={false}
            className={
              item.tone === "danger"
                ? "rounded-lg border border-red-200 bg-white px-3 py-2 text-sm font-semibold text-red-600 hover:border-red-400 hover:text-red-700"
                : "rounded-lg bg-white px-3 py-2 text-sm font-semibold text-lf-charcoal hover:text-lf-orange"
            }
          >
            {item.label}
          </Link>
        ))}
      </div>
    );
  }

  return (
    <details className="group relative">
      <summary className="inline-flex cursor-pointer list-none items-center gap-2 whitespace-nowrap rounded-lg border border-lf-line bg-white px-3 py-2 text-sm font-semibold text-lf-charcoal transition hover:border-lf-orange hover:text-lf-orange [&::-webkit-details-marker]:hidden">
        <span>{roleLabel}</span>
        <span aria-hidden className="text-xs text-lf-slate transition group-open:rotate-180">
          &#9662;
        </span>
      </summary>
      <div className="absolute right-0 z-50 mt-2 w-60 overflow-hidden rounded-xl border border-lf-line bg-white py-2 shadow-lift">
        <div className="border-b border-lf-line px-4 pb-2">
          <p className="truncate text-sm font-semibold text-lf-charcoal">
            {email}
          </p>
          <p className="text-xs font-semibold uppercase tracking-wide text-lf-orange">
            {roleLabel}
          </p>
        </div>
        {items.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            // Auth-sensitive route: never prefetch. A prefetch that runs during a
            // transient auth-resolution miss would cache a signed-out RSC payload
            // and client navigation would reuse it (header shows the user, page
            // body shows "Sign in required"). prefetch={false} forces a fresh
            // cookie-present fetch at click time.
            prefetch={false}
            className={
              item.tone === "danger"
                ? "block px-4 py-2 text-sm font-semibold text-red-600 transition hover:bg-red-50"
                : "block px-4 py-2 text-sm font-semibold text-lf-charcoal transition hover:bg-lf-mist hover:text-lf-orange"
            }
          >
            {item.label}
          </Link>
        ))}
      </div>
    </details>
  );
}
