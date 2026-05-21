import { ModuleStatus, moduleStatusLabel } from "@/lib/utils";

type Props = {
  status: ModuleStatus;
};

const styles: Record<ModuleStatus, string> = {
  full: "bg-emerald-50 text-emerald-700 border-emerald-200",
  summary: "bg-amber-50 text-amber-700 border-amber-200",
  "coming-soon": "bg-slate-100 text-slate-600 border-slate-200",
};

export default function StatusBadge({ status }: Props) {
  return (
    <span
      className={`inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold ${styles[status]}`}
    >
      {moduleStatusLabel[status]}
    </span>
  );
}
