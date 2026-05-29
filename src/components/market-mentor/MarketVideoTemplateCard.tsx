import type { VideoTemplate } from "@/data/marketMentorTemplates";

type Props = {
  template: VideoTemplate;
  heygenConnected?: boolean;
};

const audienceLabel: Record<VideoTemplate["audience"], string> = {
  borrower: "Borrower",
  realtor: "Realtor",
  coaching_member: "Coaching member",
  team_leader: "Team leader",
  broad_internal: "All Loan Factory users",
};

export default function MarketVideoTemplateCard({
  template,
  heygenConnected = false,
}: Props) {
  return (
    <article className="card flex flex-col gap-3">
      <header className="flex flex-wrap items-start justify-between gap-2">
        <div>
          <h3 className="h-display text-base">{template.title}</h3>
          <p className="text-xs font-semibold uppercase tracking-wide text-lf-slate">
            {audienceLabel[template.audience]} ·{" "}
            {Math.round(template.durationSeconds)}s
            {template.bilingual && " · Bilingual"}
          </p>
        </div>
        <span
          className={`rounded-full px-2 py-0.5 text-[11px] font-semibold ${
            template.tier === "alliance_449"
              ? "bg-purple-100 text-purple-800"
              : "bg-lf-mist text-lf-charcoal"
          }`}
        >
          {template.tier === "alliance_449" ? "Alliance" : "Mastery"}
        </span>
      </header>

      <div>
        <p className="text-xs font-semibold uppercase tracking-wide text-lf-slate">
          Structure
        </p>
        <p className="prose-lf mt-1 text-sm">{template.structure}</p>
      </div>

      <div>
        <p className="text-xs font-semibold uppercase tracking-wide text-lf-slate">
          CTA style
        </p>
        <p className="prose-lf mt-1 text-sm">{template.ctaStyle}</p>
      </div>

      {template.reviewNotes.length > 0 && (
        <div>
          <p className="text-xs font-semibold uppercase tracking-wide text-lf-slate">
            Review notes
          </p>
          <ul className="mt-1 list-disc pl-5 text-xs">
            {template.reviewNotes.map((note) => (
              <li key={note}>{note}</li>
            ))}
          </ul>
        </div>
      )}

      <div className="flex flex-wrap items-center gap-2 pt-2">
        <button
          type="button"
          disabled={!heygenConnected}
          className="btn-primary text-xs disabled:cursor-not-allowed disabled:opacity-60"
          title={
            heygenConnected
              ? "Generate video draft via HeyGen"
              : "HeyGen connection required"
          }
        >
          {heygenConnected ? "Generate draft" : "Generate (HeyGen setup needed)"}
        </button>
        <button
          type="button"
          className="rounded-md border border-lf-line bg-white px-3 py-1.5 text-xs font-semibold text-lf-charcoal hover:border-lf-orange"
        >
          Copy structure
        </button>
      </div>
    </article>
  );
}
