type Props = {
  items: string[];
};

export default function DoThisToday({ items }: Props) {
  return (
    <section className="rounded-2xl border border-lf-orange/40 bg-lf-orangeSoft/40 p-6">
      <div className="flex items-center gap-3">
        <span className="rounded-full bg-lf-orange px-3 py-1 text-xs font-bold uppercase tracking-wide text-white">
          Do this today
        </span>
        <span className="text-xs uppercase tracking-wide text-lf-slate">
          One action at a time.
        </span>
      </div>
      <ol className="prose-lf mt-3 list-decimal space-y-2 pl-5 text-base">
        {items.map((item) => (
          <li key={item}>{item}</li>
        ))}
      </ol>
    </section>
  );
}
