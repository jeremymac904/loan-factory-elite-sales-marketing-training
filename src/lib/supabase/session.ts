import type { User } from "@supabase/supabase-js";
import {
  RolePermissionsRow,
  ProfileRow,
  isApprovedProfile,
} from "@/lib/supabase/auth";
import { createServerSupabaseClient } from "@/lib/supabase/server";

export type BetaUserSession =
  | { status: "not-configured"; user: null; profile: null; permissions: null }
  | { status: "signed-out"; user: null; profile: null; permissions: null }
  | {
      status: "pending";
      user: User;
      profile: ProfileRow | null;
      permissions: null;
    }
  | {
      status: "approved";
      user: User;
      profile: ProfileRow;
      permissions: RolePermissionsRow | null;
    };

const profileSelect =
  "id,email,full_name,role,department,title,avatar_url,status";

const permissionSelect =
  "role,can_access_admin,can_access_coaching,can_access_facegram,can_access_ai_assistants,can_access_resources,can_moderate_facegram,can_review_marketing";

export async function getBetaUserSession(): Promise<BetaUserSession> {
  const supabase = await createServerSupabaseClient();

  if (!supabase) {
    return {
      status: "not-configured",
      user: null,
      profile: null,
      permissions: null,
    };
  }

  const {
    data: { user },
    error,
  } = await supabase.auth.getUser();

  if (error || !user) {
    return {
      status: "signed-out",
      user: null,
      profile: null,
      permissions: null,
    };
  }

  const { data: profile } = await supabase
    .from("profiles")
    .select(profileSelect)
    .eq("id", user.id)
    .maybeSingle<ProfileRow>();

  if (!isApprovedProfile(profile)) {
    return {
      status: "pending",
      user,
      profile,
      permissions: null,
    };
  }

  const { data: permissions } = await supabase
    .from("role_permissions")
    .select(permissionSelect)
    .eq("role", profile.role)
    .maybeSingle<RolePermissionsRow>();

  return {
    status: "approved",
    user,
    profile,
    permissions,
  };
}
