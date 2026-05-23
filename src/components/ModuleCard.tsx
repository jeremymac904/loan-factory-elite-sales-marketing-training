import Link from "next/link";
import { ModuleStatus, SkillLevel } from "@/lib/utils";

type Props = {
  level: string;
  title: string;
  promise: string;
  href: string;
  status: ModuleStatus;
  levels?: SkillLevel[];
};

export default function ModuleCard({
  level,
  title,
  promise,
  href,
}: Props) {
  return (
    <Link
      href={href}
      className="card group flex h-full flex-col gap-3 transition hover:shadow-lift"
    >
      <div className="flex items-center justify-between">
        <span className="text-xs font-semibold uppercase tracking-wide text-lf-orange">
          {level}
        </span>
      </div>
      <h3 className="h-display text-xl">{title}</h3>
      <p className="prose-lf text-sm text-lf-slate">{promise}</p>
      <span className="mt-auto inline-flex items-center text-sm font-semibold text-lf-navy group-hover:text-lf-orange">
        Start lesson
        <span aria-hidden className="ml-1 transition group-hover:translate-x-0.5">
          &rarr;
        </span>
      </span>
    </Link>
  );
}
