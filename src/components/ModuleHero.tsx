import StatusBadge from "./StatusBadge";
import { LevelTagGroup } from "./LevelTag";
import { ModuleStatus, SkillLevel } from "@/lib/utils";

type Props = {
  level: string;
  title: string;
  promise: string;
  audience: string;
  status: ModuleStatus;
  outcomes: string[];
  levels?: SkillLevel[];
};

export default function ModuleHero({
  level,
  title,
  promise,
  audience,
  status,
  outcomes,
  levels = [],
}: Props) {
  return (
    <section className="bg-lf-navy text-white">
      <div className="container-page py-14 md:py-20">
        <div className="flex flex-wrap items-center gap-3">
          <span className="rounded-full bg-lf-orange px-3 py-1 text-xs font-bold uppercase tracking-wide">
            {level}
          </span>
          <StatusBadge status={status} />
          {levels.length > 0 && <LevelTagGroup levels={levels} />}
        </div>
        <h1 className="mt-5 font-display text-4xl font-semibold tracking-tight md:text-5xl">
          {title}
        </h1>
        <p className="mt-4 max-w-2xl text-lg text-white/85">{promise}</p>
        <p className="mt-3 text-sm uppercase tracking-wide text-white/60">
          Audience: {audience}
        </p>
        {outcomes.length > 0 && (
          <div className="mt-8 grid gap-3 md:grid-cols-2">
            {outcomes.map((o) => (
              <div
                key={o}
                className="rounded-xl border border-white/10 bg-white/5 p-4 text-sm leading-6 text-white/90"
              >
                <span className="mr-2 font-semibold text-lf-orange">&#10003;</span>
                {o}
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
