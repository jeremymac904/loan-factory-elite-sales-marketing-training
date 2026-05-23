"use client";

import { useEffect, useState } from "react";
import { createBrowserSupabaseClient } from "@/lib/supabase/client";
import {
  type AuthDebugTrail,
  mergeAuthDebugTrail,
  readAuthDebugTrail,
} from "@/lib/supabase/debug";

type Props = {
  serverSessionExists: boolean;
  serverStatus: string;
  serverProfileEmail?: string | null;
  serverProfileRole?: string | null;
  serverProfileStatus?: string | null;
};

type BrowserCheck = {
  browserSessionExists: boolean;
  profileEmail: string | null;
  profileRole: string | null;
  profileStatus: string | null;
};

export default function AuthDebugTrailView({
  serverSessionExists,
  serverStatus,
  serverProfileEmail = null,
  serverProfileRole = null,
  serverProfileStatus = null,
}: Props) {
  const [trail, setTrail] = useState<AuthDebugTrail>({});
  const [browserCheck, setBrowserCheck] = useState<BrowserCheck>({
    browserSessionExists: false,
    profileEmail: null,
    profileRole: null,
    profileStatus: null,
  });

  useEffect(() => {
    let active = true;

    async function loadDebug() {
      const supabase = createBrowserSupabaseClient();
      const storedTrail = readAuthDebugTrail();

      if (!supabase) {
        if (active) setTrail(storedTrail);
        return;
      }

      const {
        data: { session },
      } = await supabase.auth.getSession();

      let profileRole: string | null = null;
      let profileStatus: string | null = null;

      if (session?.user) {
        const { data: profile } = await supabase
          .from("profiles")
          .select("role,status")
          .eq("id", session.user.id)
          .maybeSingle<{ role: string | null; status: string | null }>();

        profileRole = profile?.role ?? null;
        profileStatus = profile?.status ?? null;
      }

      const nextBrowserCheck = {
        browserSessionExists: Boolean(session?.user),
        profileEmail: session?.user.email ?? null,
        profileRole,
        profileStatus,
      };

      mergeAuthDebugTrail({
        browserSessionExists: nextBrowserCheck.browserSessionExists,
        profileEmail:
          nextBrowserCheck.profileEmail ?? storedTrail.profileEmail ?? null,
        profileRole:
          nextBrowserCheck.profileRole ?? storedTrail.profileRole ?? null,
        profileStatus:
          nextBrowserCheck.profileStatus ?? storedTrail.profileStatus ?? null,
        serverSessionExists,
      });

      if (!active) return;

      setTrail(readAuthDebugTrail());
      setBrowserCheck(nextBrowserCheck);
    }

    void loadDebug();

    return () => {
      active = false;
    };
  }, [serverSessionExists]);

  const profileEmail =
    serverProfileEmail ?? browserCheck.profileEmail ?? trail.profileEmail ?? null;
  const profileRole =
    serverProfileRole ?? browserCheck.profileRole ?? trail.profileRole ?? null;
  const profileStatus =
    serverProfileStatus ??
    browserCheck.profileStatus ??
    trail.profileStatus ??
    null;

  return (
    <div className="card lg:col-span-2">
      <h2 className="h-display text-2xl">Safe auth debug trail</h2>
      <p className="prose-lf mt-2 text-sm">
        Stage names and booleans only. This does not show token, cookie, API
        key, or service role values.
      </p>
      <dl className="mt-5 grid gap-3 text-sm sm:grid-cols-2">
        <StatusLine label="hasCode" value={formatBoolean(trail.hasCode)} />
        <StatusLine
          label="callbackStage"
          value={trail.callbackStage ?? "Not recorded"}
        />
        <StatusLine
          label="oauthStartAttempted"
          value={formatBoolean(trail.oauthStartAttempted)}
        />
        <StatusLine
          label="oauthStartSucceeded"
          value={formatBoolean(trail.oauthStartSucceeded)}
        />
        <StatusLine
          label="browserExchangeAttempted"
          value={formatBoolean(trail.browserExchangeAttempted)}
        />
        <StatusLine
          label="browserExchangeSucceeded"
          value={formatBoolean(trail.browserExchangeSucceeded)}
        />
        <StatusLine
          label="browserSessionExists"
          value={formatBoolean(
            browserCheck.browserSessionExists || trail.browserSessionExists,
          )}
        />
        <StatusLine
          label="syncProfileAttempted"
          value={formatBoolean(trail.syncProfileAttempted)}
        />
        <StatusLine
          label="syncProfileReceivedSession"
          value={formatBoolean(trail.syncProfileReceivedSession)}
        />
        <StatusLine
          label="syncProfileSucceeded"
          value={formatBoolean(trail.syncProfileSucceeded)}
        />
        <StatusLine
          label="syncProfileCookieWriteAttempted"
          value={formatBoolean(trail.syncProfileCookieWriteAttempted)}
        />
        <StatusLine
          label="syncProfileCookieCount"
          value={
            typeof trail.syncProfileCookieCount === "number"
              ? String(trail.syncProfileCookieCount)
              : "Not recorded"
          }
        />
        <StatusLine
          label="serverSessionExists"
          value={formatBoolean(serverSessionExists)}
        />
        <StatusLine label="serverStatus" value={serverStatus} />
        <StatusLine label="profileEmail" value={profileEmail ?? "Not visible"} />
        <StatusLine label="profileRole" value={profileRole ?? "Not visible"} />
        <StatusLine
          label="profileStatus"
          value={profileStatus ?? "Not visible"}
        />
        <StatusLine
          label="lastErrorCode"
          value={trail.lastErrorCode ?? "None"}
        />
        <StatusLine
          label="lastErrorMessage"
          value={trail.lastErrorMessage ?? "None"}
        />
        <StatusLine label="updatedAt" value={trail.updatedAt ?? "Not recorded"} />
      </dl>
    </div>
  );
}

function StatusLine({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <dt className="font-semibold text-lf-slate">{label}</dt>
      <dd className="mt-1 break-words text-lf-charcoal">{value}</dd>
    </div>
  );
}

function formatBoolean(value: boolean | undefined) {
  if (typeof value !== "boolean") return "Not recorded";
  return value ? "Yes" : "No";
}
