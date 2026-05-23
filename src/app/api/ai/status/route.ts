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
  const status = getPublicAiSandboxStatus(getAiSandboxConfig());

  if (!access.allowed) {
    return NextResponse.json(
      {
        ...status,
        accessAllowed: false,
        accessStatus: access.status,
        message: access.message,
      },
      { headers: { "Cache-Control": "no-store" } },
    );
  }

  return NextResponse.json({
    ...status,
    accessAllowed: true,
    accessStatus: access.status,
  }, {
    headers: { "Cache-Control": "no-store" },
  });
}
