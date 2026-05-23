import { cookies } from "next/headers";

export const betaPreviewCookieName = "lf_beta_preview";
export const betaPreviewEmail = "beta-preview@loanfactory.local";

export async function isBetaPreviewEnabled() {
  const cookieStore = await cookies();
  return cookieStore.get(betaPreviewCookieName)?.value === "1";
}
