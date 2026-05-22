import { NextResponse } from "next/server";
import {
  getAiSandboxConfig,
  getPublicAiSandboxStatus,
} from "@/lib/ai/config";

export const dynamic = "force-dynamic";
export const runtime = "nodejs";

export async function GET() {
  return NextResponse.json(getPublicAiSandboxStatus(getAiSandboxConfig()), {
    headers: { "Cache-Control": "no-store" },
  });
}
