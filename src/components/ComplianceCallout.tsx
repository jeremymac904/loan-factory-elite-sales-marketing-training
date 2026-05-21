import { ReactNode } from "react";

type Variant = "default" | "soft" | "warning";

type Props = {
  title?: string;
  children: ReactNode;
  variant?: Variant;
};

/**
 * Brand palette only. Three intensities of the orange family on light surfaces.
 *   default  soft orange wash. Most callouts.
 *   soft     light gray wash with orange accent border.
 *   warning  stronger orange tint for must-do compliance warnings.
 */
const styles: Record<Variant, string> = {
  default: "border-lf-orange/40 bg-lf-orangeSoft/60 text-lf-charcoal",
  soft: "border-lf-line bg-lf-mist text-lf-charcoal",
  warning: "border-lf-orange bg-lf-orangeSoft text-lf-orangeDark",
};

export default function ComplianceCallout({
  title = "Compliance review",
  children,
  variant = "default",
}: Props) {
  return (
    <aside
      className={`rounded-xl border p-4 text-sm leading-6 ${styles[variant]}`}
    >
      <p className="mb-1 text-xs font-bold uppercase tracking-wide">{title}</p>
      <div className="prose-lf text-sm">{children}</div>
    </aside>
  );
}
