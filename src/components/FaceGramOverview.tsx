import Link from "next/link";

// PUBLIC FaceGram overview + READ-ONLY sample preview — shown to signed-out /
// not-configured visitors on an internal Loan Factory subdomain. It works like a
// logged-out Facebook page: a visitor can SEE what the community looks like via
// clearly-labeled SAMPLE cards, but every interaction (like/comment/post/upload/
// profile/feed) is locked behind sign-in. It renders NO real posts, NO real
// feed, NO real comments/profiles, and NO private user data — every card below is
// hard-coded demo content. The real personalized workspace stays behind sign-in
// (see /facegram).

const highlights = [
  {
    title: "Team wins & recognition",
    body: "See and celebrate Loan Factory loan officer wins, milestones, and shout-outs in one internal feed.",
  },
  {
    title: "Ask the group",
    body: "Post questions, share what is working, and learn from other approved Loan Factory users.",
  },
  {
    title: "Training & resource drops",
    body: "Catch clips, scripts, and announcements the team shares — tied back to your training and resources.",
  },
];

// SAMPLE-ONLY preview cards. Authored demo content — no real names, posts,
// comments, or user data. Names are generic placeholders, not real members.
type PreviewCard = {
  kind: string;
  author: string;
  meta: string;
  body: string;
  stat: string;
};

const previewFeed: PreviewCard[] = [
  {
    kind: "Team Win",
    author: "Sample · Loan Officer",
    meta: "Recognition",
    body: "“Closed my first self-sourced purchase this week after working the 201 follow-up script. The cadence really works.” — example recognition post.",
    stat: "Sample reactions: 24",
  },
  {
    kind: "Training Drop",
    author: "Sample · Training Academy",
    meta: "AI Advantage",
    body: "New AI Advantage micro-lesson posted: turning a rate question into a follow-up plan. Sales & Marketing 101–601 companion clip attached. (Example.)",
    stat: "Sample views: 86",
  },
  {
    kind: "Ask the Group",
    author: "Sample · Loan Officer",
    meta: "Question",
    body: "“What’s your best opening line when a past client asks about refinancing right now?” — example group question to spark discussion.",
    stat: "Sample replies: 11",
  },
  {
    kind: "Resource Share",
    author: "Sample · LO Development",
    meta: "Resource",
    body: "Dropped an updated Realtor partner outreach checklist + a prompt pack for first-touch messages. Find these in Resources after sign in. (Example.)",
    stat: "Sample saves: 39",
  },
];

// Locked interaction button — looks real, is disabled, says why.
function LockedAction({ label }: { label: string }) {
  return (
    <span
      aria-disabled
      title="Sign in required"
      className="inline-flex cursor-not-allowed items-center gap-1 rounded-lg border border-lf-line bg-lf-mist px-2.5 py-1 text-xs font-semibold text-lf-slate opacity-70"
    >
      🔒 {label} · sign in required
    </span>
  );
}

export default function FaceGramOverview() {
  return (
    <>
      <section className="relative isolate overflow-hidden bg-lf-navy text-white">
        <div
          aria-hidden
          className="absolute inset-0 bg-cover bg-center opacity-40"
          style={{ backgroundImage: "url(/media/dark-hero-background.png)" }}
        />
        <div className="relative container-page py-14 md:py-16">
          <p className="text-xs font-bold uppercase tracking-[0.22em] text-lf-orange">
            FaceGram
          </p>
          <h1 className="mt-3 max-w-3xl font-display text-4xl font-semibold tracking-tight md:text-5xl">
            The internal Loan Factory community
          </h1>
          <p className="mt-5 max-w-2xl text-lg leading-8 text-white/85">
            FaceGram is the internal-only feed for approved Loan Factory users —
            wins, questions, recognition, and training drops in one place. Take a
            look around below, then sign in to post, comment, and open your
            workspace.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link href="/login/" className="btn-primary">
              Sign in to post, comment, and open your FaceGram workspace
            </Link>
            <Link
              href="/resources/"
              className="btn-secondary border-white/30 bg-white/10 text-white hover:border-white hover:bg-white/20"
            >
              Explore resources
            </Link>
          </div>
        </div>
      </section>

      <section className="container-page py-12">
        <div className="grid gap-5 md:grid-cols-3">
          {highlights.map((item) => (
            <div key={item.title} className="card">
              <h2 className="h-display text-xl">{item.title}</h2>
              <p className="prose-lf mt-2 text-sm text-lf-slate">{item.body}</p>
            </div>
          ))}
        </div>
      </section>

      {/* READ-ONLY sample preview feed. Sample content only — interactions locked. */}
      <section className="container-page pb-14">
        <div className="mb-5 flex flex-wrap items-center justify-between gap-3">
          <div>
            <h2 className="h-display text-2xl">Community preview</h2>
            <p className="prose-lf mt-1 text-sm text-lf-slate">
              A read-only look at the kind of posts inside FaceGram.
            </p>
          </div>
          <span className="rounded-full border border-lf-orange/30 bg-lf-orangeSoft px-3 py-1 text-xs font-bold uppercase tracking-wide text-lf-orangeDark">
            Sample preview · not real posts
          </span>
        </div>

        <div className="grid gap-5 lg:grid-cols-2">
          {previewFeed.map((card) => (
            <article
              key={card.kind}
              className="flex flex-col rounded-2xl border border-lf-line bg-white p-5 shadow-soft"
            >
              <div className="flex items-center justify-between gap-3">
                <div className="flex items-center gap-3">
                  <span
                    aria-hidden
                    className="grid h-9 w-9 place-items-center rounded-full bg-lf-navy text-sm font-bold text-white"
                  >
                    LF
                  </span>
                  <div>
                    <p className="text-sm font-semibold text-lf-charcoal">
                      {card.author}
                    </p>
                    <p className="text-xs text-lf-slate">{card.meta}</p>
                  </div>
                </div>
                <span className="rounded-full bg-lf-orangeSoft px-2.5 py-1 text-xs font-bold uppercase tracking-wide text-lf-orangeDark">
                  {card.kind}
                </span>
              </div>

              <p className="prose-lf mt-3 flex-1 text-sm text-lf-charcoal">
                {card.body}
              </p>

              <p className="mt-3 text-xs font-semibold text-lf-slate">
                {card.stat}
              </p>

              <div className="mt-3 flex flex-wrap gap-2 border-t border-lf-line pt-3">
                <LockedAction label="Like" />
                <LockedAction label="Comment" />
                <LockedAction label="Save" />
              </div>
            </article>
          ))}
        </div>

        {/* Locked composer — shows where posting lives, disabled until sign-in. */}
        <div className="mt-6 rounded-2xl border border-lf-line bg-lf-mist/50 p-5">
          <div className="flex items-center gap-3">
            <span
              aria-hidden
              className="grid h-9 w-9 place-items-center rounded-full bg-lf-line text-sm font-bold text-lf-slate"
            >
              +
            </span>
            <p className="flex-1 rounded-full border border-lf-line bg-white px-4 py-2 text-sm text-lf-slate">
              Share a win, ask the group, or drop a resource…
            </p>
          </div>
          <div className="mt-3 flex flex-wrap items-center justify-between gap-3">
            <div className="flex flex-wrap gap-2">
              <LockedAction label="Post" />
              <LockedAction label="Upload" />
              <LockedAction label="Create profile" />
            </div>
            <Link href="/login/" className="btn-primary text-sm">
              Sign in to interact
            </Link>
          </div>
        </div>

        <p className="mt-6 text-sm text-lf-slate">
          This preview shows sample content only. FaceGram is internal-audience
          only and for approved Loan Factory users — the real feed, posting,
          comments, profiles, messaging, and notifications open after you sign in.
        </p>
      </section>
    </>
  );
}
