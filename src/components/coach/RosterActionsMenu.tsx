"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";

export type RosterAction = {
  label: string;
  href: string;
};

// Compact accessible action menu for a roster row (Finding #15). Replaces the
// row of buttons / thick pills with one dropdown of coaching actions.
export default function RosterActionsMenu({
  actions,
  buttonLabel = "Actions",
}: {
  actions: RosterAction[];
  buttonLabel?: string;
}) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;
    function onClickOutside(event: MouseEvent) {
      if (ref.current && !ref.current.contains(event.target as Node)) {
        setOpen(false);
      }
    }
    function onKey(event: KeyboardEvent) {
      if (event.key === "Escape") setOpen(false);
    }
    document.addEventListener("mousedown", onClickOutside);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("mousedown", onClickOutside);
      document.removeEventListener("keydown", onKey);
    };
  }, [open]);

  return (
    <div ref={ref} className="relative inline-block text-left">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-haspopup="menu"
        aria-expanded={open}
        className="inline-flex items-center gap-1 rounded-lg border border-lf-line px-2.5 py-1 text-xs font-semibold text-lf-slate transition hover:border-lf-orange hover:text-lf-orange"
      >
        {buttonLabel}
        <span aria-hidden>▾</span>
      </button>
      {open && (
        <div
          role="menu"
          className="absolute right-0 z-20 mt-1 w-52 overflow-hidden rounded-lg border border-lf-line bg-white py-1 shadow-lift"
        >
          {actions.map((action) => (
            <Link
              key={action.label}
              href={action.href}
              role="menuitem"
              onClick={() => setOpen(false)}
              className="block px-3 py-1.5 text-xs font-semibold text-lf-charcoal transition hover:bg-lf-mist hover:text-lf-orange"
            >
              {action.label}
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
