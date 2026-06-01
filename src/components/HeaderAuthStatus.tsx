import Link from "next/link";
import { getRoleDashboardHref, getRoleLabel, isAdminRole } from "@/lib/supabase/auth";
import { roleCanCoach } from "@/lib/coachAccess";
import { getBetaUserSession } from "@/lib/supabase/session";
import AccountMenu, { type AccountMenuItem } from "./header/AccountMenu";

type Props = {
  variant?: "desktop" | "mobile";
};

type MenuItem = AccountMenuItem;

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

  // Desktop: hand the resolved session + role-gated items to the client island,
  // which closes the dropdown on role change, route change, outside click,
  // Escape, and item click (the native <details> never did). prefetch={false}
  // is preserved inside AccountMenu.
  return <AccountMenu email={email} roleLabel={roleLabel} items={items} />;
}
