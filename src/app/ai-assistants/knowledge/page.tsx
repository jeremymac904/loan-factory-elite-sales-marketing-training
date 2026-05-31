import Link from "next/link";

export const metadata = { title: "AI Twin Knowledge" };

const knowledgeSources = [
  {
    name: "Coaching playbooks",
    description: "Corporate coaching playbooks, certification standards, session templates.",
    status: "drive-pending",
  },
  {
    name: "Sales & Marketing 101-601",
    description: "Internal training paths from foundation through advanced execution.",
    status: "in-platform",
  },
  {
    name: "Scripts and templates",
    description: "Internal scripts for calls, follow-up, and Realtor conversations.",
    status: "in-platform",
  },
  {
    name: "FaceGram approved adaptations",
    description: "Marketing-reviewed examples for internal adaptation.",
    status: "in-platform",
  },
  {
    name: "Drive: training docs",
    description: "Google Drive folder for training documents.",
    status: "drive-pending",
  },
  {
    name: "Drive: coaching docs",
    description: "Google Drive folder for coaching session materials.",
    status: "drive-pending",
  },
];

const statusBadges: Record<string, { label: string; class: string }> = {
  "in-platform": { label: "In platform", class: "bg-green-100 text-green-800" },
  "drive-pending": {
    label: "Drive connection needed",
    class: "bg-yellow-100 text-yellow-800",
  },
};

export default function AiTwinKnowledgePage() {
  return (
    <>
      <section className="relative isolate overflow-hidden bg-lf-navy text-white">
        <div
          aria-hidden
          className="absolute inset-0 bg-cover bg-center opacity-35"
          style={{ backgroundImage: "url(/media/dark-hero-background.png)" }}
        />
        <div className="relative container-page py-12">
          <div className="flex items-center gap-3">
            <Link href="/ai-assistants/" className="text-sm font-semibold text-white/70 hover:text-white">
              AI Assistants
            </Link>
            <span className="text-white/40">/</span>
            <span className="text-sm font-semibold text-white">Knowledge</span>
          </div>
          <h1 className="mt-3 font-display text-4xl font-semibold tracking-tight">
            Knowledge Sources
          </h1>
          <p className="mt-3 max-w-2xl text-lg text-white/85">
            Pick what your AI Twin can reference. Platform sources are always
            available. Drive sources need a per-user Google connection.
          </p>
        </div>
      </section>

      <section className="container-page py-10">
        <div className="grid gap-3">
          {knowledgeSources.map((source) => {
            const badge = statusBadges[source.status];
            return (
              <div key={source.name} className="card flex flex-wrap items-center justify-between gap-3">
                <div>
                  <h2 className="text-base font-semibold text-lf-charcoal">
                    {source.name}
                  </h2>
                  <p className="mt-1 text-sm text-lf-slate">{source.description}</p>
                </div>
                <span className={`rounded-full px-2.5 py-0.5 text-xs font-semibold ${badge.class}`}>
                  {badge.label}
                </span>
              </div>
            );
          })}
        </div>

        <div className="mt-8 flex flex-wrap gap-3">
          <Link href="/settings/google/" className="btn-primary">
            Connect Google Drive
          </Link>
          <Link href="/ai-assistants/my-ai-twin/" className="btn-secondary">
            Back to My AI Twin
          </Link>
        </div>
      </section>
    </>
  );
}
