type Props = {
  title?: string;
  items: string[];
  dueBy?: string;
};

export default function AssignmentBox({
  title = "Weekly assignment",
  items,
  dueBy = "By end of Friday",
}: Props) {
  return (
    <section className="rounded-2xl border border-lf-navy bg-lf-navy/[0.03] p-6">
      <div className="flex items-center justify-between">
        <h3 className="h-display text-lg">{title}</h3>
        <span className="text-sm font-semibold text-lf-navy">{dueBy}</span>
      </div>
      <ol className="prose-lf mt-3 list-decimal space-y-2 pl-5 text-sm">
        {items.map((item) => (
          <li key={item}>{item}</li>
        ))}
      </ol>
    </section>
  );
}
