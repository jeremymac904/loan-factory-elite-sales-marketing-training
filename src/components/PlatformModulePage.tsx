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
          <h1 className="max-w-3xl font-display text-4xl font-semibold tracking-tight md:text-5xl">
            {module.title}
          </h1>
          <p className="mt-5 max-w-3xl text-lg leading-8 text-white/85">
            {module.summary}
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link href="/" className="btn-primary">
              Home
            </Link>
            <Link
              href="/support-routing/"
              className="btn-secondary border-white/30 bg-white/10 text-white hover:border-white hover:bg-white/20"
            >
              Support Routing
            </Link>
          </div>
        </div>
      </section>

      <section className="container-page py-14">
        <SectionHeading
          eyebrow="Module Overview"
          title="What this module does"
          description={module.summary}
        />
        <div className="mt-8 grid gap-5 lg:grid-cols-3">
          <ListCard title="Who it is for" items={module.whoFor} />
          <ListCard title="Tools included" items={module.tools} />
          <ListCard title="Resources included" items={module.resources} />
        </div>
      </section>

      {children}

      <section className="container-page py-14">
        <SectionHeading
          eyebrow="Platform connection"
          title="How this connects to the rest of LO Development"
        />
        <div className="mt-8 grid gap-5 md:grid-cols-3">
          {module.connections.map((connection) => (
            <article key={connection} className="card">
              <p className="prose-lf text-sm text-lf-slate">{connection}</p>
            </article>
          ))}
        </div>
      </section>

    </>
  );
}
