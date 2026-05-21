import { ModuleStatus, moduleStatusLabel } from "@/lib/utils";

type Props = {
  status: ModuleStatus;
};

/**
 * Status reads either `Live` or `Coming Soon`. Colors are brand only.
 *   Live          orange dot + orange text. The signal color.
 *   Coming Soon   silver chip. Quiet.
 */
const styles: Record<ModuleStatus, string> = {
  full: "bg-lf-orangeSoft text-lf-orangeDark border-lf-orange/40",
  summary: "bg-lf-mist text-lf-slate border-lf-line",
  "coming-soon": "bg-lf-mist text-lf-slate border-lf-line",
};

export default function StatusBadge({ status }: Props) {
  const isLive = status === "full";
  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full border px-2.5 py-0.5 text-xs font-semibold ${styles[status]}`}
    >
      {isLive && (
        <span
          aria-hidden
          className="inline-block h-1.5 w-1.5 rounded-full bg-lf-orange"
        />
      )}
      {moduleStatusLabel[status]}
    </span>
  );
}
