import { ScriptItem } from "@/data/scripts";
import ComplianceCallout from "./ComplianceCallout";

type Props = {
  script: ScriptItem;
};

export default function ScriptCard({ script }: Props) {
  return (
    <article
      id={script.id}
      className="card flex flex-col gap-3 scroll-mt-24"
    >
      <div className="flex flex-wrap items-center gap-2">
        <span className="text-xs font-semibold uppercase tracking-wide text-lf-orange">
          {script.category}
        </span>
        {script.module && <span className="pill">{script.module}</span>}
      </div>
      <h3 className="h-display text-lg">{script.title}</h3>
      <p className="prose-lf text-sm text-lf-slate">{script.purpose}</p>
      <pre className="code-block">{script.body}</pre>
      {script.complianceNote && (
        <ComplianceCallout title="Compliance review" variant="soft">
          {script.complianceNote}
        </ComplianceCallout>
      )}
    </article>
  );
}
