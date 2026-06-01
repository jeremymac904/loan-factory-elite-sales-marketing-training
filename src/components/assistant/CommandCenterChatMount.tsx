import { getBetaUserSession } from "@/lib/supabase/session";
import { getViewAsState } from "@/lib/viewAs";
import { getRoleLabel } from "@/lib/supabase/auth";
import { roleHasAssistant } from "@/lib/supabase/effectiveAccess";
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

  // Hard rule: regular loan_officer gets NO AI assistant — and the Command
  // Center chat reads as one. Gate it through the SAME roleHasAssistant() rule
  // the assistant pill/drawer use (view-as aware via effectiveRole), so a Loan
  // Officer (real or previewed) never sees a chat interface. A non-AI "Platform
  // Help" card could be added for LOs later without reusing this chat.
  if (!roleHasAssistant(effectiveRole)) return null;

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
