import Link from "next/link";

export const metadata = { title: "AI Twin Email Drafts" };

const templates = [
  {
    name: "Coaching weekly recap",
    audience: "Coaching member",
    body: "Recap of last week's commitments, this week's focus, and the next coaching session.",
  },
  {
    name: "First-call follow-up",
    audience: "New borrower lead",
    body: "Thank-you, recap of what we discussed, clear next step.",
  },
  {
    name: "Realtor partner touch",
    audience: "Realtor",
    body: "Local market note + how I help your buyers + one specific ask.",
  },
  {
    name: "Mastermind prep",
    audience: "Alliance member",
    body: "Personal wins, top blocker, ask for the room.",
  },
  {
    name: "Power Hour kick-off",
    audience: "Coaching member",
    body: "Morning prompt + today's three priorities + accountability check.",
  },
];

export default function EmailDraftsPage() {
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
            <span className="text-sm font-semibold text-white">Email Drafts</span>
          </div>
          <h1 className="mt-3 font-display text-4xl font-semibold tracking-tight">
            Email Drafts
          </h1>
          <p className="mt-3 max-w-2xl text-lg text-white/85">
            Generate coaching, follow-up, and Realtor partner email drafts. All
            drafts go to Gmail Drafts — you send manually.
          </p>
        </div>
      </section>

      <section className="container-page py-10">
        <div className="grid gap-4 md:grid-cols-2">
          {templates.map((t) => (
            <div key={t.name} className="card">
              <h2 className="h-display text-xl">{t.name}</h2>
              <p className="mt-2 text-xs font-semibold uppercase tracking-wide text-lf-slate">
                Audience: {t.audience}
              </p>
              <p className="prose-lf mt-3 text-sm">{t.body}</p>
              <div className="mt-4 flex gap-2">
                <Link href="/settings/google/" className="btn-secondary text-sm">
                  Connect Gmail to enable drafts
                </Link>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-8 rounded-xl border border-lf-orange/30 bg-lf-orangeSoft p-5 text-sm">
          <p className="font-semibold text-lf-orangeDark">Send safety</p>
          <p className="prose-lf mt-2 text-lf-charcoal">
            Send buttons are intentionally disabled until your Gmail connection
            is explicitly approved. The platform always prefers Create Draft
            over Send. Bulk sending is never enabled — drafts only.
          </p>
        </div>
      </section>
    </>
  );
}
