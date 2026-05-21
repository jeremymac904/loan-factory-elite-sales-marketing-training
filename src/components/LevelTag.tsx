import { SkillLevel, skillLevelStyles } from "@/lib/utils";

type Props = {
  level: SkillLevel | "All Levels";
};

const allLevelsStyle = "bg-white text-lf-charcoal border-lf-line";

export default function LevelTag({ level }: Props) {
  const style =
    level === "All Levels"
      ? allLevelsStyle
      : skillLevelStyles[level as SkillLevel];
  return (
    <span
      className={`inline-flex items-center rounded-full border px-2 py-0.5 text-[11px] font-semibold uppercase tracking-wide ${style}`}
    >
      {level}
    </span>
  );
}

type GroupProps = {
  levels: Array<SkillLevel | "All Levels">;
};

export function LevelTagGroup({ levels }: GroupProps) {
  if (levels.length === 0) return null;
  return (
    <div className="flex flex-wrap gap-1.5">
      {levels.map((l) => (
        <LevelTag key={l} level={l} />
      ))}
    </div>
  );
}
