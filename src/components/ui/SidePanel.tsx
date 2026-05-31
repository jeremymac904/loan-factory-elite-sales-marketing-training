"use client";

import { useEffect } from "react";
import type { ReactNode } from "react";

type SidePanelProps = {
  open: boolean;
  onClose: () => void;
  title: ReactNode;
  children: ReactNode;
  /** Optional footer actions row, pinned to the bottom of the panel. */
  footer?: ReactNode;
};

/**
 * Slide-out side panel with overlay. Locks body scroll while open and closes
 * on Escape. Built on the .lf-panel / .lf-overlay classes.
 */
export default function SidePanel({
  open,
  onClose,
  title,
  children,
  footer,
}: SidePanelProps) {
  useEffect(() => {
    if (!open) return;

    function onKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") onClose();
    }

    document.addEventListener("keydown", onKeyDown);
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.body.style.overflow = previousOverflow;
    };
  }, [open, onClose]);

  if (!open) return null;

  return (
    <>
      <div
        className="lf-overlay"
        aria-hidden
        onClick={onClose}
      />
      <aside className="lf-panel" role="dialog" aria-modal="true">
        <header className="lf-panel-header">
          <h2 className="h-display text-base">{title}</h2>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close panel"
            className="rounded-md p-1 text-lf-slate transition hover:bg-lf-mist hover:text-lf-navy"
          >
            <span aria-hidden className="text-xl leading-none">
              &times;
            </span>
          </button>
        </header>
        <div className="lf-panel-body">{children}</div>
        {footer ? (
          <footer className="border-t border-lf-line px-5 py-4">{footer}</footer>
        ) : null}
      </aside>
    </>
  );
}
