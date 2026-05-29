import Link from "next/link";
import { getCoachAccess } from "@/lib/coachAccess";
import CoachCommandNav from "@/components/coach/CoachCommandNav";
import CopyDraftButton from "@/components/coach/CopyDraftButton";
import { messageTemplates } from "@/data/coachCommandCenter";

export const dynamic = "force-dynamic";
export const metadata = { title: "Communication Center · Coach Command Center" };

// Map the shared message templates to the three coaching sends this page leads
// with. These reuse the same messageTemplates source — no separate copy.
const announcementTemplate =
  messageTemplates.find((t) => t.title === "Win recognition") ??
  messageTemplates[0];
const individualNoteTemplate =
  messageTemplates.find((t) => t.title === "Coaching nudge") ??
  messageTemplates[0];
const followUpTemplate =
  messageTemplates.find((t) => t.title === "Weekly check-in") ??
  messageTemplates[0];

export default async function CoachMessagesPage() {
  const access = await getCoachAccess();

  return (
    <>
      <section className="relative isolate overflow-hidden bg-lf-navy text-white">
        <div
          aria-hidden
          className="absolute inset-0 bg-cover bg-center opacity-35"
          style={{ backgroundImage: "url(/media/dark-hero-background.png)" }}
        />
        <div className="relative container-page py-12">
          <p className="text-xs font-bold uppercase tracking-wide text-lf-orange">
            Coach Command Center
          </p>
          <h1 className="mt-4 font-display text-4xl font-semibold tracking-tight">
            Communication Center
          </h1>
          <p className="mt-3 max-w-2xl text-lg text-white/85">
            Ready-to-send coaching messages — copy one, personalize the
            [Name], and send it from your own messaging.
          </p>
          {access.viewingAsLabel && (
            <p className="mt-3 inline-block rounded-full bg-white/20 px-3 py-1 text-xs font-semibold">
              View-As preview: {access.viewingAsLabel}
            </p>
          )}
        </div>
      </section>

      <CoachCommandNav
        current="/coach-command-center/messages/"
        showAdmin={access.seesAll}
      />

      <section className="container-page py-10">
        <div className="card border-lf-orange/40 bg-lf-orangeSoft/40">
          <h2 className="h-display text-2xl">Three quick coaching sends</h2>
          <p className="prose-lf mt-2 text-sm">
            Start here. Each send copies a ready draft to your clipboard so you
            can paste it into your message, swap [Name], and send. To post to a
            whole group, take the announcement to FaceGram.
          </p>
          <div className="mt-5 grid gap-4 md:grid-cols-3">
            <QuickSend
              eyebrow="Group announcement"
              template={announcementTemplate}
              footer={
                <Link
                  href="/facegram/"
                  className="mt-3 inline-flex items-center text-sm font-semibold text-lf-orange"
                >
                  Post to a group on FaceGram
                  <span aria-hidden className="ml-2">
                    &rarr;
                  </span>
                </Link>
              }
            />
            <QuickSend
              eyebrow="Individual note"
              template={individualNoteTemplate}
            />
            <QuickSend
              eyebrow="Follow-up reminder"
              template={followUpTemplate}
            />
          </div>
        </div>
      </section>

      <section className="container-page pb-12">
        <h2 className="h-display text-2xl">Message templates</h2>
        <p className="prose-lf mt-2 max-w-2xl text-sm">
          Manual tracking for now. Automation can be connected later. Copy any
          template, personalize it, and send it from your own messaging tool.
        </p>
        <div className="mt-6 grid gap-4 md:grid-cols-2">
          {messageTemplates.map((template) => (
            <div key={template.title} className="card flex flex-col gap-4">
              <h3 className="text-base font-semibold text-lf-charcoal">
                {template.title}
              </h3>
              <pre className="whitespace-pre-wrap rounded-lg bg-lf-mist px-4 py-3 font-sans text-sm text-lf-charcoal">
                {template.body}
              </pre>
              <div className="mt-auto">
                <CopyDraftButton text={template.body} copyLabel="Copy message" />
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="container-page pb-14">
        <div className="card">
          <h2 className="h-display text-2xl">Post to a group</h2>
          <p className="prose-lf mt-2 text-sm">
            For a message to your whole team or coaching cohort, share it in the
            group on FaceGram so everyone sees it in one place.
          </p>
          <Link href="/facegram/" className="btn-secondary mt-4 inline-block">
            Open FaceGram
          </Link>
        </div>
      </section>
    </>
  );
}

function QuickSend({
  eyebrow,
  template,
  footer,
}: {
  eyebrow: string;
  template: { title: string; body: string };
  footer?: React.ReactNode;
}) {
  return (
    <div className="flex flex-col rounded-lg border border-lf-line bg-white p-4">
      <p className="text-xs font-semibold uppercase tracking-wide text-lf-orange">
        {eyebrow}
      </p>
      <h3 className="mt-1 text-base font-semibold text-lf-charcoal">
        {template.title}
      </h3>
      <pre className="mt-3 whitespace-pre-wrap rounded-lg bg-lf-mist px-3 py-3 font-sans text-sm text-lf-charcoal">
        {template.body}
      </pre>
      <div className="mt-3">
        <CopyDraftButton text={template.body} copyLabel="Copy message" />
      </div>
      {footer}
    </div>
  );
}
