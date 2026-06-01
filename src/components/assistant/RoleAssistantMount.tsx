import { getBetaUserSession } from "@/lib/supabase/session";
import { getViewAsState } from "@/lib/viewAs";
import { getRoleLabel } from "@/lib/supabase/auth";
import RoleAssistantPanel from "@/components/assistant/RoleAssistantPanel";

// Server wrapper mounted ONCE in src/app/layout.tsx. It reuses the React
// cache()-wrapped getBetaUserSession() resolver (no second network-auth pattern)
// plus getViewAsState(), resolves the EFFECTIVE role (view-as aware), and renders
// the universal RoleAssistantPanel for every approved/preview user across roles.
//
// View-as is honored: when an admin is viewing as another role, the assistant
// assists as that role. When not viewing-as, it uses the signed-in profile role.
// Only rendered for approved users; signed-out / pending / not-configured render
// nothing.
export default async function RoleAssistantMount() {
  const [session, viewAs] = await Promise.all([
    getBetaUserSession(),
    getViewAsState(),
  ]);

  // Only show the assistant to approved users.
  if (session.status !== "approved") return null;

  // View-as role wins when active; otherwise the user's real profile role.
  const effectiveRole = viewAs?.role || session.profile.role;
  if (!effectiveRole) return null;

  const effectiveRoleLabel = getRoleLabel(effectiveRole);

  return (
    <RoleAssistantPanel role={effectiveRole} roleLabel={effectiveRoleLabel} />
  );
}
