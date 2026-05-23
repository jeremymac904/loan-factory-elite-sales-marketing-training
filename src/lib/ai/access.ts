import "server-only";

import { canAccessAiAssistants } from "@/lib/supabase/auth";
import { isLoanFactoryEmail } from "@/lib/supabase/config";
import { getBetaUserSession } from "@/lib/supabase/session";

export type AiSandboxAccess =
  | {
      allowed: true;
      userId: string;
      email: string | null;
      status: "approved";
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

export async function getAiSandboxAccess(): Promise<AiSandboxAccess> {
  const session = await getBetaUserSession();

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
      allowed: false,
      status: "pending",
      message: "Your account is signed in, but beta access is still pending.",
    };
  }

  if (!canAccessAiAssistants(session.profile, session.permissions)) {
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
