import type { User } from "@supabase/supabase-js";
import type { ProfileRow } from "@/lib/supabase/auth";

export type ApprovedUserRow = {
  email: string;
  role: string;
  full_name: string | null;
  department: string | null;
  title: string | null;
  active: boolean;
};

function getMetadataValue(
  user: User,
  keys: Array<"full_name" | "name" | "avatar_url" | "picture">,
) {
  const metadata = user.user_metadata ?? {};

  for (const key of keys) {
    const value = metadata[key];

    if (typeof value === "string" && value.trim()) {
      return value;
    }
  }

  return null;
}

export function buildApprovedProfile(
  user: User,
  approvedUser: ApprovedUserRow,
): ProfileRow {
  return {
    id: user.id,
    email: user.email?.toLowerCase().trim() ?? approvedUser.email,
    full_name:
      approvedUser.full_name ?? getMetadataValue(user, ["full_name", "name"]),
    role: approvedUser.role,
    department: approvedUser.department,
    title: approvedUser.title,
    avatar_url: getMetadataValue(user, ["avatar_url", "picture"]),
    status: "approved",
  } as ProfileRow;
}
