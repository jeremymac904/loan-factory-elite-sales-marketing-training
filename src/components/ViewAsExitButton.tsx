"use client";

import { useState } from "react";

export default function ViewAsExitButton() {
  const [loading, setLoading] = useState(false);

  async function exitViewAs() {
    setLoading(true);
    await fetch("/api/view-as", { method: "DELETE" });
    // Full reload back to Master Admin for a clean return — a soft refresh can
    // leave header/dropdown state stale. Matches the documented exit behavior.
    window.location.assign("/admin/");
  }

  return (
    <button
      type="button"
      onClick={exitViewAs}
      disabled={loading}
      className="rounded-md bg-white px-3 py-1 text-xs font-semibold text-lf-orangeDark transition hover:bg-white/90 disabled:opacity-50"
    >
      {loading ? "Exiting..." : "Exit view as role"}
    </button>
  );
}
