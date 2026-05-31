"use client";

import { useEffect } from "react";

// The one production host that auth cookies + Google OAuth redirects are bound to.
const CANONICAL_HOST = "loan-factory-elite-sales-marketing-tr.netlify.app";

// Netlify deploy permalinks ("<deploy-id>--site.netlify.app") and branch
// subdomains ("main--site.netlify.app") all contain the "--" delimiter; the
// canonical primary host never does. Matching that delimiter is loop-proof:
// the canonical host can never satisfy it.
const NETLIFY_ALIAS_PATTERN = /--[^.]*\.netlify\.app$/i;

/**
 * Netlify's Next runtime normalizes the server-side Host header to the primary
 * domain, so middleware can't detect a deploy-permalink/branch host. The true
 * host only survives in the browser address bar — where the auth cookie is
 * actually mis-scoped, causing an endless "sign in required" loop. This client
 * guard runs once on load and bounces any Netlify alias host to the canonical
 * host, preserving the exact path + query + hash. localhost and any future
 * custom domain never match and are untouched. Renders nothing.
 */
export default function CanonicalHostGuard() {
  useEffect(() => {
    const host = window.location.hostname.toLowerCase();

    if (host !== CANONICAL_HOST && NETLIFY_ALIAS_PATTERN.test(host)) {
      const { pathname, search, hash } = window.location;
      window.location.replace(
        `https://${CANONICAL_HOST}${pathname}${search}${hash}`,
      );
    }
  }, []);

  return null;
}
