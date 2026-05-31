import type { ReactNode } from "react";

type CollapsibleProps = {
  summary: ReactNode;
  children: ReactNode;
  /** Render expanded by default. */
  defaultOpen?: boolean;
  className?: string;
};

/**
 * Collapsible section built on the native <details> element and the
 * .lf-collapsible classes. Works without JavaScript and stays accessible.
 */
export default function Collapsible({
  summary,
  children,
  defaultOpen = false,
  className = "",
}: CollapsibleProps) {
  return (
    <details className={`lf-collapsible ${className}`} open={defaultOpen}>
      <summary>{summary}</summary>
      <div className="lf-collapsible-body">{children}</div>
    </details>
  );
}
