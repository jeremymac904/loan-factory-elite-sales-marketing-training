import Link from "next/link";
import SectionHeading from "@/components/SectionHeading";
import { PlatformModule } from "@/data/platform";

type Props = {
  module: PlatformModule;
  children?: React.ReactNode;
};

function ListCard({ title, items }: { title: string; items: string[] }) {
  return (
    <article className="card h-full">
      <h3 className="h-display text-lg">{title}</h3>
      <ul className="prose-lf mt-3 list-disc space-y-1 pl-5 text-sm">
        {items.map((item) => (
          <li key={item}>{item}</li>
        ))}
      </ul>
    </article>
  );
}

export default function PlatformModulePage({ module, children }: Props) {
  return (
    <>
      <section className="relative isolate overflow-hidden bg-lf-navy text-white">
        <div
          aria-hidden
          className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(242,106,31,0.24),transparent_34%),linear-gradient(135deg,#000000_0%,#111111_46%,#2b2b2b_100%)]"
        />
        <div className="relative container-page py-16 md:py-20">
          <h1 className="metal-title-dark max-w-3xl text-4xl md:text-5xl">
            {module.title}
          </h1>
          <p className="mt-5 max-w-3xl text-lg leading-8 text-white/85">
            {module.summary}
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link href="/" className="btn-primary">
              Back to home
            </Link>
          </div>
        </div>
      </section>

      <section className="container-page py-14">
        <SectionHeading
          eyebrow="Start here"
          title="What you will find here"
          description={module.summary}
        />
        <div className="mt-8 grid gap-5 lg:grid-cols-3">
          <ListCard title="Best for" items={module.whoFor} />
          <ListCard title="What you can use" items={module.tools} />
          <ListCard title="What to open next" items={module.resources} />
        </div>
      </section>

      {children}
    </>
  );
}
