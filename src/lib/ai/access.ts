import "server-only";

import { isLoanFactoryEmail } from "@/lib/supabase/config";
import { getBetaUserSession } from "@/lib/supabase/session";
import type { AiSandboxConfig } from "@/lib/ai/config";

export type AiSandboxAccess =
  | {
      allowed: true;
      userId: string | null;
      email: string | null;
      status: "approved" | "pending" | "sandbox-unsigned";
    }
  | {
      allowed: false;
      status:
        | "not-configured"
        | "signed-out"
        | "domain"
        | "permission"
        | "pending";
      message: string;
    };

export async function getAiSandboxAccess(
  config: AiSandboxConfig,
): Promise<AiSandboxAccess> {
  const session = await getBetaUserSession();

  if (!config.requireAuth) {
    return {
      allowed: true,
      userId: session.status === "approved" || session.status === "pending"
        ? session.user.id
        : null,
      email: session.status === "approved" || session.status === "pending"
        ? session.user.email?.toLowerCase().trim() ?? null
        : null,
      status:
        session.status === "approved" || session.status === "pending"
          ? session.status
          : "sandbox-unsigned",
    };
  }

  if (
    config.allowUnsignedSandbox &&
    (session.status === "not-configured" || session.status === "signed-out")
  ) {
    return {
      allowed: true,
      userId: null,
      email: null,
      status: "sandbox-unsigned",
    };
  }

  if (session.status === "not-configured") {
    return {
      allowed: false,
      status: "not-configured",
      message: "Supabase auth is not configured for this environment.",
    };
  }

  if (session.status === "signed-out") {
    return {
      allowed: false,
      status: "signed-out",
      message: "Sign in with a Loan Factory Google account to use AI Assistants.",
    };
  }

  const email = session.user.email?.toLowerCase().trim() ?? null;

  if (!isLoanFactoryEmail(email)) {
    return {
      allowed: false,
      status: "domain",
      message: "AI Assistants are limited to Loan Factory email accounts.",
    };
  }

  if (session.status === "pending") {
    return {
      allowed: true,
      userId: session.user.id,
      email,
      status: "pending",
    };
  }

  if (
    session.profile.role !== "admin" &&
    session.permissions?.can_access_ai_assistants === false
  ) {
    return {
      allowed: false,
      status: "permission",
      message: "Your role is not enabled for AI Assistants.",
    };
  }

  return {
    allowed: true,
    userId: session.user.id,
    email,
    status: "approved",
  };
}
