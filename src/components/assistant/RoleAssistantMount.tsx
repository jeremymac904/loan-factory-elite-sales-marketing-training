import { getRoleLabel } from "@/lib/supabase/auth";
import {
  getEffectiveAccess,
  roleHasAssistant,
} from "@/lib/supabase/effectiveAccess";
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
  const effective = await getEffectiveAccess();

  // Only approved users. (Beta preview without view-as is not an approved
  // session here; the assistant is for real/previewed roles only.)
  if (effective.status !== "approved") return null;

  const effectiveRole = effective.effectiveRole;
  if (!effectiveRole) return null;

  // HARD RULE: regular loan_officer gets NO assistant — no pill, no drawer, no
  // overlay. This is view-as aware: a master_admin previewing Loan Officer is
  // treated as Loan Officer here and the assistant is hidden. Only the roles in
  // ASSISTANT_ROLES (paid coaching members + operational/coach roles) see it.
  if (!roleHasAssistant(effectiveRole)) return null;

  return (
    <RoleAssistantPanel
      role={effectiveRole}
      roleLabel={getRoleLabel(effectiveRole)}
    />
  );
}
