"use client";

import { usePathname } from "next/navigation";
import type { ReactNode } from "react";

// The member/coach/admin workspaces behave like an app — no marketing footer.
const APP_PREFIXES = ["/member-area", "/coach-command-center", "/admin", "/dashboard"];

export default function ConditionalFooter({ children }: { children: ReactNode }) {
  const pathname = usePathname() ?? "";
  if (APP_PREFIXES.some((prefix) => pathname.startsWith(prefix))) return null;
  return <>{children}</>;
}
