"use client";

import { useSyncExternalStore } from "react";
import { ROLE_STORAGE_KEY, RoleId, isRoleId } from "@/lib/roles";

function getStoredRole(): RoleId | null {
  if (typeof window === "undefined") return null;

  try {
    const stored = window.localStorage.getItem(ROLE_STORAGE_KEY);
    return isRoleId(stored) ? stored : null;
  } catch {
    return null;
  }
}

function subscribeToRoleChanges(callback: () => void) {
  window.addEventListener("storage", callback);
  window.addEventListener("lf-role-changed", callback);

  return () => {
    window.removeEventListener("storage", callback);
    window.removeEventListener("lf-role-changed", callback);
  };
}

export function useRolePreview(): RoleId | null {
  return useSyncExternalStore(subscribeToRoleChanges, getStoredRole, () => null);
}

export function setRolePreview(id: RoleId | null) {
  try {
    if (id) {
      window.localStorage.setItem(ROLE_STORAGE_KEY, id);
    } else {
      window.localStorage.removeItem(ROLE_STORAGE_KEY);
    }

    window.dispatchEvent(new Event("lf-role-changed"));
  } catch {
    // localStorage may be unavailable in restricted browser contexts.
  }
}
