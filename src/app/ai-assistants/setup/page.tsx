import Link from "next/link";

export const metadata = { title: "AI Twin Setup" };

const steps = [
  {
    n: 1,
    title: "Confirm your profile",
    body: "Your AI Twin uses your real Loan Factory profile — name, role, team brand, NMLS, and bio.",
    href: "/profile/edit/",
    cta: "Edit profile",
  },
  {
    n: 2,
    title: "Define your voice",
    body: "Tell your AI Twin how you talk — direct, supportive, technical, coach-style, etc.",
    href: "/ai-assistants/persona/",
    cta: "Open persona",
  },
  {
    n: 3,
    title: "Connect Google Workspace",
    body: "Approve Gmail draft and Drive source access for your AI Twin. Connection is per-user and revocable.",
    href: "/settings/google/",
    cta: "Manage connections",
  },
  {
    n: 4,
    title: "Pick knowledge sources",
    body: "Choose Drive folders, training docs, and coaching scripts your AI Twin can reference.",
    href: "/ai-assistants/knowledge/",
    cta: "Pick sources",
  },
  {
    n: 5,
    title: "Set coaching tasks",
    body: "Add recurring reminders — daily Power Hour, follow-up prompts, weekly coaching nudges.",
    href: "/ai-assistants/tasks/",
    cta: "Set tasks",
  },
];

export default function AiTwinSetupPage() {
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
            <span className="text-sm font-semibold text-white">Setup</span>
          </div>
          <h1 className="mt-3 font-display text-4xl font-semibold tracking-tight">
            AI Twin Setup
          </h1>
          <p className="mt-3 max-w-2xl text-lg text-white/85">
            Five steps to a working AI Twin. Move at your own pace — each step
            is editable later.
          </p>
        </div>
      </section>

      <section className="container-page py-10">
        <div className="grid gap-4">
          {steps.map((step) => (
            <div key={step.n} className="card flex flex-wrap items-start justify-between gap-4">
              <div className="flex items-start gap-4">
                <span className="flex h-10 w-10 items-center justify-center rounded-full bg-lf-navy font-display text-lg font-semibold text-white">
                  {step.n}
                </span>
                <div>
                  <h2 className="h-display text-xl">{step.title}</h2>
                  <p className="prose-lf mt-2 text-sm">{step.body}</p>
                </div>
              </div>
              <Link href={step.href} className="btn-primary text-sm whitespace-nowrap">
                {step.cta}
              </Link>
            </div>
          ))}
        </div>
      </section>
    </>
  );
}
