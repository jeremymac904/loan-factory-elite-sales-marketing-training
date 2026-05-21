import { ReactNode } from "react";

type Variant = "default" | "soft" | "warning";

type Props = {
  title?: string;
  children: ReactNode;
  variant?: Variant;
};

const styles: Record<Variant, string> = {
  default:
    "border-lf-orange/40 bg-lf-orangeSoft/60 text-lf-charcoal",
  soft: "border-amber-200 bg-amber-50 text-amber-900",
  warning: "border-red-200 bg-red-50 text-red-900",
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
