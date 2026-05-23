"use client";

import { useSyncExternalStore } from "react";

/**
 * SSR-safe sessionStorage subscription hook.
 *
 * Returns the raw string under `key` (or null). Updates when:
 *   - the active tab writes via setSessionItem() in this util, OR
 *   - another tab writes via the storage event.
 *
 * Server snapshot returns null so SSR + first client render match, then
 * the live value swaps in on the next render. This avoids the lint rule
 * against synchronous setState inside useEffect.
 */
export function useSessionItem(key: string): string | null {
  return useSyncExternalStore(
    (cb) => subscribe(key, cb),
    () => getClient(key),
    () => null,
  );
}

const listeners = new Map<string, Set<() => void>>();

function subscribe(key: string, cb: () => void): () => void {
  if (typeof window === "undefined") return () => undefined;
  let set = listeners.get(key);
  if (!set) {
    set = new Set();
    listeners.set(key, set);
  }
  set.add(cb);

  const onStorage = (e: StorageEvent) => {
    if (e.key === key) cb();
  };
  window.addEventListener("storage", onStorage);

  return () => {
    window.removeEventListener("storage", onStorage);
    const s = listeners.get(key);
    if (s) {
      s.delete(cb);
      if (s.size === 0) listeners.delete(key);
    }
  };
}

function getClient(key: string): string | null {
  if (typeof window === "undefined") return null;
  return window.sessionStorage.getItem(key);
}

/** Same-tab write that notifies subscribers. The native storage event only
 *  fires across tabs, so we synthesize a local notification here. */
export function setSessionItem(key: string, value: string): void {
  if (typeof window === "undefined") return;
  window.sessionStorage.setItem(key, value);
  notify(key);
}

export function removeSessionItem(key: string): void {
  if (typeof window === "undefined") return;
  window.sessionStorage.removeItem(key);
  notify(key);
}

function notify(key: string): void {
  const set = listeners.get(key);
  if (!set) return;
  for (const cb of set) cb();
}
