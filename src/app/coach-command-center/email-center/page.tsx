import Link from "next/link";
import { getCoachAccess } from "@/lib/coachAccess";
import CoachCommandNav from "@/components/coach/CoachCommandNav";
import CopyDraftButton from "@/components/coach/CopyDraftButton";
import { emailTemplates } from "@/data/coachCommandCenter";

export const dynamic = "force-dynamic";
export const metadata = { title: "Email Center · Coach Command Center" };

export default async function CoachEmailCenterPage() {
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
            Email Center
          </h1>
          <p className="mt-3 max-w-2xl text-lg text-white/85">
            Coaching email drafts you can copy and personalize — drafts only,
            never auto-sent and never bulk.
          </p>
          {access.viewingAsLabel && (
            <p className="mt-3 inline-block rounded-full bg-white/20 px-3 py-1 text-xs font-semibold">
              View-As preview: {access.viewingAsLabel}
            </p>
          )}
        </div>
      </section>

      <CoachCommandNav
        current="/coach-command-center/email-center/"
        showAdmin={access.seesAll}
      />

      <section className="container-page py-10">
        <div className="card border-lf-orange/40 bg-lf-orangeSoft/40">
          <h2 className="h-display text-2xl">Drafts only — no bulk send</h2>
          <p className="prose-lf mt-2 text-sm">
            The Email Center never sends email and never sends in bulk. You copy
            a draft, personalize it for one LO, and send it yourself from Gmail.
            Connect Gmail to create these as drafts in your inbox instead of
            copying.
          </p>
          <Link href="/settings/google/" className="btn-secondary mt-4 inline-block">
            Connect Gmail to create drafts
          </Link>
        </div>
      </section>

      <section className="container-page pb-14">
        <h2 className="h-display text-2xl">Email templates</h2>
        <p className="prose-lf mt-2 max-w-2xl text-sm">
          Manual tracking for now. Automation can be connected later. Each
          template copies a ready-to-personalize subject and body.
        </p>
        <div className="mt-6 grid gap-4 md:grid-cols-2">
          {emailTemplates.map((template) => (
            <div key={template.title} className="card flex flex-col gap-4">
              <h3 className="text-base font-semibold text-lf-charcoal">
                {template.title}
              </h3>
              <div>
                <p className="text-xs font-semibold uppercase tracking-wide text-lf-slate">
                  Subject
                </p>
                <p className="mt-1 text-sm font-medium text-lf-charcoal">
                  {template.subject}
                </p>
              </div>
              <div>
                <p className="text-xs font-semibold uppercase tracking-wide text-lf-slate">
                  Body
                </p>
                <pre className="mt-1 whitespace-pre-wrap rounded-lg bg-lf-mist px-4 py-3 font-sans text-sm text-lf-charcoal">
                  {template.body}
                </pre>
              </div>
              <div className="mt-auto">
                <CopyDraftButton
                  text={`Subject: ${template.subject}\n\n${template.body}`}
                  connected={false}
                  draftLabel="Create Draft"
                  copyLabel="Copy Email Draft"
                />
              </div>
            </div>
          ))}
        </div>
      </section>
    </>
  );
}
