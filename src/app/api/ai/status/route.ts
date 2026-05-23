import { NextResponse } from "next/server";
import { getAiSandboxAccess } from "@/lib/ai/access";
import {
  getAiSandboxConfig,
  getPublicAiSandboxStatus,
} from "@/lib/ai/config";

export const dynamic = "force-dynamic";
export const runtime = "nodejs";

export async function GET() {
  const access = await getAiSandboxAccess();

  if (!access.allowed) {
    return NextResponse.json(
      {
        error: access.status,
        message: access.message,
        externalActionsEnabled: false,
      },
      { status: 403, headers: { "Cache-Control": "no-store" } },
    );
  }

  return NextResponse.json(getPublicAiSandboxStatus(getAiSandboxConfig()), {
    headers: { "Cache-Control": "no-store" },
  });
}
