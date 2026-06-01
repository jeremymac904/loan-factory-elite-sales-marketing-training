"use client";

import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";

type Props = {
  /** Rendered nav links + mobile account section (server-rendered children). */
  children: React.ReactNode;
};

/**
 * Client island for the mobile (lg:hidden) header menu.
 *
 * Replaces the previous native <details> wrapper, which never closed on role
 * change, navigation, or item click. This version closes on:
 *  - trigger toggle
 *  - outside click (pointerdown outside the menu/trigger)
 *  - Escape key
 *  - route change (usePathname effect) — covers View-as set/exit reloads
 *  - any click inside the panel (covers nav links and account-menu items;
 *    those links navigate and we want the sheet to dismiss immediately)
 *
 * Children are passed through unchanged so the existing primaryNav mapping and
 * the server-rendered mobile account section keep their exact markup/behavior
 * (including prefetch={false} on auth links).
 */
export default function MobileMenu({ children }: Props) {
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
    <div ref={containerRef} className="lg:hidden">
      <button
        type="button"
        aria-haspopup="menu"
        aria-expanded={open}
        onClick={() => setOpen((prev) => !prev)}
        className="btn-primary cursor-pointer"
      >
        Menu
      </button>
      {open && (
        <nav
          className="fixed left-5 right-5 top-[4.5rem] z-[60] max-w-[calc(100vw-2.5rem)] rounded-xl border border-lf-line bg-white p-3 shadow-lift"
          aria-label="Primary navigation"
          // Any click inside that lands on a link should dismiss the sheet.
          // Using onClick (bubbling) keeps this resilient to nested markup.
          onClick={(event) => {
            const target = event.target as HTMLElement;
            if (target.closest("a")) setOpen(false);
          }}
        >
          {children}
        </nav>
      )}
    </div>
  );
}
