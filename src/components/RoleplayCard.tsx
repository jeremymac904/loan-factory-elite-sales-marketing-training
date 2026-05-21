import { RoleplayItem } from "@/data/roleplays";

type Props = {
  roleplay: RoleplayItem;
};

export default function RoleplayCard({ roleplay }: Props) {
  return (
    <article id={roleplay.id} className="card flex flex-col gap-3 scroll-mt-24">
      <div className="flex flex-wrap items-center gap-2">
        <span className="text-xs font-semibold uppercase tracking-wide text-lf-orange">
          {roleplay.module}
        </span>
        <span className="pill">{roleplay.duration}</span>
      </div>
      <h3 className="h-display text-lg">{roleplay.title}</h3>
      <p className="prose-lf text-sm text-lf-slate">{roleplay.setup}</p>
      <div>
        <p className="text-xs font-semibold uppercase tracking-wide text-lf-slate">
          Goal
        </p>
        <p className="prose-lf text-sm">{roleplay.goal}</p>
      </div>
      <div>
        <p className="text-xs font-semibold uppercase tracking-wide text-lf-slate">
          Coach watch outs
        </p>
        <ul className="prose-lf text-sm">
          {roleplay.watchOuts.map((w) => (
            <li key={w}>{w}</li>
          ))}
        </ul>
      </div>
    </article>
  );
}
