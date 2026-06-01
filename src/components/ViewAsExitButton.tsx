"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

export default function ViewAsExitButton() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  async function exitViewAs() {
    setLoading(true);
    await fetch("/api/view-as", { method: "DELETE" });
    router.refresh();
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
