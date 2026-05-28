import { cookies } from "next/headers";

export const VIEW_AS_COOKIE = "lf_view_as";

export type ViewAsState = {
  role: string;
  email?: string;
  name?: string;
};

function parseViewAsValue(value: string | undefined): ViewAsState | null {
  if (!value) return null;
  try {
    const decoded = decodeURIComponent(value);
    const parsed = JSON.parse(decoded) as ViewAsState;
    if (typeof parsed.role === "string" && parsed.role.trim()) {
      return parsed;
    }
  } catch {
    return null;
  }
  return null;
}

export async function getViewAsState(): Promise<ViewAsState | null> {
  const cookieStore = await cookies();
  return parseViewAsValue(cookieStore.get(VIEW_AS_COOKIE)?.value);
}

export function encodeViewAsValue(state: ViewAsState): string {
  return encodeURIComponent(JSON.stringify(state));
}
