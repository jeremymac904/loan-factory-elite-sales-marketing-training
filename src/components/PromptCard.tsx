import { PromptItem } from "@/data/prompts";

type Props = {
  prompt: PromptItem;
};

export default function PromptCard({ prompt }: Props) {
  return (
    <article
      id={prompt.id}
      className="card flex flex-col gap-3 scroll-mt-24"
    >
      <div className="flex flex-wrap items-center gap-2">
        <span className="text-xs font-semibold uppercase tracking-wide text-lf-orange">
          {prompt.category}
        </span>
        {prompt.module && <span className="pill">{prompt.module}</span>}
      </div>
      <h3 className="h-display text-lg">{prompt.title}</h3>
      <p className="prose-lf text-sm text-lf-slate">{prompt.useCase}</p>
      <pre className="code-block">{prompt.body}</pre>
      {prompt.tips && (
        <div className="prose-lf text-sm text-lf-slate">
          <strong className="text-lf-navy">How to use it: </strong>
          {prompt.tips}
        </div>
      )}
    </article>
  );
}
