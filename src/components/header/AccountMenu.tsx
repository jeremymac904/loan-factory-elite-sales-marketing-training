"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";

export type AccountMenuItem = {
  href: string;
  label: string;
  tone?: "default" | "danger";
};

type Props = {
  email: string;
  roleLabel: string;
  items: AccountMenuItem[];
};

/**
 * Client island for the desktop account dropdown.
 *
 * Replaces the previous native <details> element, which never closed on role
 * change, navigation, or item click. This version closes on:
 *  - outside click (pointerdown anywhere outside the menu)
 *  - Escape key
 *  - route change (usePathname effect) — covers View-as set/exit reloads and
 *    any client navigation
 *  - any menu item click
 *
 * The panel layers at z-[60] so it sits ABOVE the sticky orange View-as banner
 * (z-40) and the header (z-30) and never clips behind them. Links keep
 * prefetch={false} for the same auth-sensitivity reason as before: a prefetch
 * during a transient auth-resolution miss could cache a signed-out RSC payload.
 */
export default function AccountMenu({ email, roleLabel, items }: Props) {
  const [open, setOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const pathname = usePathname();

  // Close on any route change (View-as set/exit reloads, client navigation).
  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect -- closing a transient menu in response to navigation is a legitimate UI-sync effect
    setOpen(false);
  }, [pathname]);

  // Close on outside click + Escape while open.
  useEffect(() => {
    if (!open) return;

    function handlePointerDown(event: MouseEvent) {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target as Node)
      ) {
        setOpen(false);
      }
    }

    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") setOpen(false);
    }

    document.addEventListener("pointerdown", handlePointerDown);
    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("pointerdown", handlePointerDown);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [open]);

  return (
    <div ref={containerRef} className="relative">
      <button
        type="button"
        aria-haspopup="menu"
        aria-expanded={open}
        onClick={() => setOpen((prev) => !prev)}
        className="inline-flex cursor-pointer items-center gap-2 whitespace-nowrap rounded-lg border border-lf-line bg-white px-3 py-2 text-sm font-semibold text-lf-charcoal transition hover:border-lf-orange hover:text-lf-orange"
      >
        <span>{roleLabel}</span>
        <span
          aria-hidden
          className={`text-xs text-lf-slate transition ${open ? "rotate-180" : ""}`}
        >
          &#9662;
        </span>
      </button>

      {open && (
        <div
          role="menu"
          className="absolute right-0 z-[60] mt-2 w-60 overflow-hidden rounded-xl border border-lf-line bg-white py-2 shadow-lift"
        >
          <div className="border-b border-lf-line px-4 pb-2">
            <p className="truncate text-sm font-semibold text-lf-charcoal">
              {email}
            </p>
            <p className="text-xs font-semibold uppercase tracking-wide text-lf-orange">
              {roleLabel}
            </p>
          </div>
          {items.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              role="menuitem"
              // Auth-sensitive route: never prefetch. A prefetch that runs during
              // a transient auth-resolution miss would cache a signed-out RSC
              // payload and client navigation would reuse it (header shows the
              // user, page body shows "Sign in required"). prefetch={false}
              // forces a fresh cookie-present fetch at click time.
              prefetch={false}
              onClick={() => setOpen(false)}
              className={
                item.tone === "danger"
                  ? "block px-4 py-2 text-sm font-semibold text-red-600 transition hover:bg-red-50"
                  : "block px-4 py-2 text-sm font-semibold text-lf-charcoal transition hover:bg-lf-mist hover:text-lf-orange"
              }
            >
              {item.label}
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
