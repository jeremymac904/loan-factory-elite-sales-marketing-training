import type { User } from "@supabase/supabase-js";
import { createClient, type SupabaseClient } from "@supabase/supabase-js";
import { combineChunks, stringFromBase64URL } from "@supabase/ssr";
import { cookies } from "next/headers";
import {
  RolePermissionsRow,
  ProfileRow,
  isApprovedProfile,
} from "@/lib/supabase/auth";
import {
  getSupabasePublicConfig,
  hasSupabasePublicConfig,
} from "@/lib/supabase/config";
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

type CookieSession = {
  access_token?: string;
  refresh_token?: string;
};

function getSupabaseAuthCookieName(supabaseUrl: string) {
  return `sb-${new URL(supabaseUrl).hostname.split(".")[0]}-auth-token`;
}

function parseCookieSession(value: string): CookieSession | null {
  const decoded = value.startsWith("base64-")
    ? stringFromBase64URL(value.substring("base64-".length))
    : value;

  try {
    const session = JSON.parse(decoded) as CookieSession;

    if (typeof session.access_token === "string") {
      return session;
    }
  } catch {
    return null;
  }

  return null;
}

async function readSupabaseCookieSession(supabaseUrl: string) {
  const cookieStore = await cookies();
  const allCookies = cookieStore.getAll();
  const cookieName = getSupabaseAuthCookieName(supabaseUrl);
  const sessionCookie = await combineChunks(cookieName, async (chunkName) => {
    return allCookies.find((cookie) => cookie.name === chunkName)?.value ?? null;
  });

  if (!sessionCookie || typeof sessionCookie !== "string") {
    return null;
  }

  return parseCookieSession(sessionCookie);
}

function createBearerSupabaseClient(accessToken: string) {
  const config = getSupabasePublicConfig();

  if (!hasSupabasePublicConfig(config)) {
    return null;
  }

  return createClient(config.supabaseUrl, config.supabaseAnonKey, {
    auth: {
      autoRefreshToken: false,
      detectSessionInUrl: false,
      persistSession: false,
    },
    global: {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    },
  });
}

async function getCookieBackedUser() {
  const config = getSupabasePublicConfig();

  if (!hasSupabasePublicConfig(config)) {
    return { user: null, supabase: null };
  }

  const session = await readSupabaseCookieSession(config.supabaseUrl);

  if (!session?.access_token) {
    return { user: null, supabase: null };
  }

  const supabase = createBearerSupabaseClient(session.access_token);

  if (!supabase) {
    return { user: null, supabase: null };
  }

  const {
    data: { user },
    error,
  } = await supabase.auth.getUser(session.access_token);

  if (error || !user) {
    return { user: null, supabase: null };
  }

  return { user, supabase };
}

export async function getBetaUserSession(): Promise<BetaUserSession> {
  let supabase: SupabaseClient | null = await createServerSupabaseClient();

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

  let activeUser = user;

  if (error || !activeUser) {
    const cookieBackedSession = await getCookieBackedUser();
    activeUser = cookieBackedSession.user;
    supabase = cookieBackedSession.supabase;
  }

  if (!activeUser || !supabase) {
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
    .eq("id", activeUser.id)
    .maybeSingle<ProfileRow>();

  if (!isApprovedProfile(profile)) {
    return {
      status: "pending",
      user: activeUser,
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
    user: activeUser,
    profile,
    permissions,
  };
}
