"use client";

import { useEffect, useId, useRef, useState } from "react";

export type DropdownItem = {
  label: string;
  value: string;
  disabled?: boolean;
};

type DropdownProps = {
  /** Visible button label. */
  label: string;
  items: DropdownItem[];
  /** Optional currently-selected value (controlled or uncontrolled display). */
  value?: string;
  onSelect?: (value: string) => void;
  className?: string;
  align?: "left" | "right";
};

/**
 * Accessible details-free dropdown menu. Closes on outside click and Escape.
 * Purely presentational state held locally — safe to drop anywhere.
 */
export default function Dropdown({
  label,
  items,
  value,
  onSelect,
  className = "",
  align = "left",
}: DropdownProps) {
  const [open, setOpen] = useState(false);
  const rootRef = useRef<HTMLDivElement>(null);
  const menuId = useId();

  useEffect(() => {
    if (!open) return;

    function onPointerDown(event: MouseEvent) {
      if (rootRef.current && !rootRef.current.contains(event.target as Node)) {
        setOpen(false);
      }
    }

    function onKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") setOpen(false);
    }

    document.addEventListener("mousedown", onPointerDown);
    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.removeEventListener("mousedown", onPointerDown);
      document.removeEventListener("keydown", onKeyDown);
    };
  }, [open]);

  const selectedLabel =
    value != null
      ? items.find((item) => item.value === value)?.label ?? label
      : label;

  return (
    <div ref={rootRef} className={`relative inline-block ${className}`}>
      <button
        type="button"
        aria-haspopup="menu"
        aria-expanded={open}
        aria-controls={menuId}
        onClick={() => setOpen((prev) => !prev)}
        className="inline-flex items-center gap-2 rounded-lg border border-lf-line bg-white px-3 py-2 text-sm font-semibold text-lf-navy shadow-sm transition hover:border-lf-navy focus:outline-none focus:ring-2 focus:ring-lf-orange/40"
      >
        <span className="truncate">{selectedLabel}</span>
        <span aria-hidden className="text-lf-slate">
          &#9662;
        </span>
      </button>
      {open ? (
        <div
          id={menuId}
          role="menu"
          className={`absolute z-30 mt-1 min-w-[12rem] overflow-hidden rounded-lg border border-lf-line bg-white py-1 shadow-lift ${
            align === "right" ? "right-0" : "left-0"
          }`}
        >
          {items.map((item) => (
            <button
              key={item.value}
              type="button"
              role="menuitem"
              disabled={item.disabled}
              onClick={() => {
                if (item.disabled) return;
                onSelect?.(item.value);
                setOpen(false);
              }}
              className={`flex w-full items-center px-3 py-2 text-left text-sm transition ${
                item.value === value
                  ? "bg-lf-orangeSoft font-semibold text-lf-orangeDark"
                  : "text-lf-charcoal hover:bg-lf-mist"
              } ${item.disabled ? "cursor-not-allowed opacity-50" : ""}`}
            >
              {item.label}
            </button>
          ))}
        </div>
      ) : null}
    </div>
  );
}
