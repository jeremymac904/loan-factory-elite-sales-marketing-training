import { getBetaUserSession } from "@/lib/supabase/session";
import { getViewAsState } from "@/lib/viewAs";
import { getRoleLabel } from "@/lib/supabase/auth";
import CommandCenterChat from "@/components/assistant/CommandCenterChat";

// Server wrapper that drops the role-aware Command Center chat onto a dashboard.
// Reuses the React cache()-wrapped getBetaUserSession() resolver (no extra
// network-auth pattern) + getViewAsState() so the chat is view-as aware and
// matches the rest of the platform. Renders nothing for non-approved users
// (the dashboards are already gated; this is just a safety net).
export default async function CommandCenterChatMount() {
  const [session, viewAs] = await Promise.all([
    getBetaUserSession(),
    getViewAsState(),
  ]);

  if (session.status !== "approved") return null;

  const effectiveRole = viewAs?.role || session.profile.role;
  if (!effectiveRole) return null;

  const firstName =
    session.profile.full_name?.trim().split(/\s+/)[0] ?? null;

  return (
    <section className="container-page pt-6">
      <CommandCenterChat
        role={effectiveRole}
        roleLabel={getRoleLabel(effectiveRole)}
        firstName={firstName}
      />
    </section>
  );
}
