export const loanFactoryEmailDomain = "@loanfactory.com";

export type SupabasePublicConfig = {
  supabaseUrl: string;
  supabaseAnonKey: string;
};

function trimTrailingSlash(value: string) {
  return value.replace(/\/+$/, "");
}

export function getSupabasePublicConfig(): SupabasePublicConfig {
  return {
    supabaseUrl: process.env.NEXT_PUBLIC_SUPABASE_URL ?? "",
    supabaseAnonKey: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ?? "",
  };
}

export function hasSupabasePublicConfig(
  config = getSupabasePublicConfig(),
): boolean {
  return Boolean(config.supabaseUrl && config.supabaseAnonKey);
}

export function getSiteUrl(): string {
  const configuredUrl = process.env.NEXT_PUBLIC_SITE_URL;

  if (configuredUrl) {
    return trimTrailingSlash(configuredUrl);
  }

  if (typeof window !== "undefined" && window.location.origin) {
    return trimTrailingSlash(window.location.origin);
  }

  return "http://localhost:3000";
}

export function getAuthCallbackUrl(): string {
  return `${getSiteUrl()}/auth/callback`;
}

export function isLoanFactoryEmail(email: string | null | undefined): boolean {
  return Boolean(
    email?.toLowerCase().trim().endsWith(loanFactoryEmailDomain),
  );
}
