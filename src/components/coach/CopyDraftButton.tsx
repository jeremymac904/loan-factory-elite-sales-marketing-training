"use client";

import { useState } from "react";

type Props = {
  /** The draft text to copy (email body, message, invite details, post, etc). */
  text: string;
  /** True only when the matching integration (Gmail/Calendar) is connected. */
  connected?: boolean;
  /** Label when connected (e.g. "Create Draft"). */
  draftLabel?: string;
  /** Label when not connected (e.g. "Copy Email Draft"). */
  copyLabel?: string;
  className?: string;
};

// Copy-or-draft action. Until an integration is connected, this performs a real
// safe action — copy the ready-to-use draft to the clipboard — and never sends
// anything. When `connected` is true the label changes to the draft wording;
// the click still copies (no auto-send) until a send/draft API is wired.
export default function CopyDraftButton({
  text,
  connected = false,
  draftLabel = "Create Draft",
  copyLabel = "Copy Email Draft",
  className = "",
}: Props) {
  const [copied, setCopied] = useState(false);

  async function handleClick() {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 2000);
    } catch {
      // Clipboard may be blocked; the text remains visible on the page.
    }
  }

  return (
    <button
      type="button"
      onClick={handleClick}
      className={`btn-secondary text-sm ${className}`}
    >
      {copied ? "Copied ✓" : connected ? draftLabel : copyLabel}
    </button>
  );
}
