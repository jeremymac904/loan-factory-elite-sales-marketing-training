import MarketMentorHero from "@/components/market-mentor/MarketMentorHero";
import MarketMentorAccessGate from "@/components/market-mentor/MarketMentorAccessGate";
import MarketPromptCard from "@/components/market-mentor/MarketPromptCard";
import { getPromptsByCategory } from "@/data/marketMentorPrompts";

export const dynamic = "force-dynamic";
export const metadata = { title: "Rate Movement Explainer" };

const lessons = [
  {
    title: "Inflation",
    body: "Higher inflation usually pushes bond yields higher, which pushes mortgage rates higher. Cooling inflation typically does the opposite. Always say 'usually' — never guarantee direction.",
  },
  {
    title: "Jobs report",
    body: "Strong jobs reports can signal a stronger economy, which can put upward pressure on rates. Weak jobs reports can do the opposite. Bond markets react before consumers see the news.",
  },
  {
    title: "Fed vs mortgage rates",
    body: "The Fed sets short-term rates (Fed funds rate). Mortgage rates follow long-term bond demand. They are cousins, not twins. A Fed cut does not mean mortgage rates automatically drop.",
  },
  {
    title: "Treasury vs mortgage rates",
    body: "Mortgage rates tend to move with the 10-year Treasury yield, with a spread on top. The spread can widen or narrow based on mortgage-bond demand.",
  },
  {
    title: "Mortgage bonds",
    body: "Mortgage rates ultimately come from demand for mortgage-backed bonds. Higher demand = lower rates. Lower demand = higher rates. Borrowers don't have to understand the bond layer, but LOs should.",
  },
  {
    title: "Lock vs float",
    body: "Lock = price certainty in exchange for giving up upside. Float = potential upside in exchange for risk. The right call depends on the borrower's timeline, risk tolerance, and what's between now and close.",
  },
  {
    title: "Why rates can move even on 'positive' news",
    body: "Bond markets often price news in before it happens. By the time a 'positive' headline lands, the move may already be done — or reverse if expectations missed.",
  },
  {
    title: "How to avoid predicting rates",
    body: "Use language like 'usually,' 'historically,' 'could,' 'one possible outcome.' Replace 'will go down' with 'is one possibility.' If a client wants certainty, redirect to what is within their control.",
  },
];

const sayThisNotThat: { sayThis: string; notThat: string }[] = [
  { sayThis: "Rates have been moving on inflation data.", notThat: "Rates are going down next month." },
  { sayThis: "Locking gives you certainty.", notThat: "You should lock — rates are about to spike." },
  { sayThis: "When the Fed cuts, mortgage rates don't always follow.", notThat: "The Fed cut means rates will drop." },
  { sayThis: "Bond markets often price news in early.", notThat: "Wait for the next Fed meeting and rates will fall." },
];

export default function RateExplainerPage() {
  const prompts = getPromptsByCategory("rate_explainer");

  return (
    <MarketMentorAccessGate>
      <MarketMentorHero
        title="Rate Movement Explainer"
        subtitle="Plain-English lessons on what moves mortgage rates and how to talk about it without predicting."
        tierBadge="Mastery"
        breadcrumb={[
          { label: "Market Mentor", href: "/market-mentor/" },
          { label: "Rate Explainer", href: "/market-mentor/rate-explainer/" },
        ]}
      />

      <section className="container-page py-10">
        <h2 className="h-display text-2xl">Plain-English lessons</h2>
        <div className="mt-6 grid gap-4 md:grid-cols-2">
          {lessons.map((lesson) => (
            <article key={lesson.title} className="card">
              <h3 className="h-display text-base">{lesson.title}</h3>
              <p className="prose-lf mt-2 text-sm">{lesson.body}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="container-page pb-10">
        <h2 className="h-display text-2xl">Say this, not that</h2>
        <div className="mt-4 overflow-x-auto rounded-xl border border-lf-line">
          <table className="w-full text-left text-sm">
            <thead>
              <tr className="border-b border-lf-line bg-lf-mist">
                <th className="px-4 py-3 font-semibold text-lf-charcoal">
                  Say this
                </th>
                <th className="px-4 py-3 font-semibold text-lf-charcoal">
                  Not that
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-lf-line">
              {sayThisNotThat.map((row) => (
                <tr key={row.sayThis}>
                  <td className="px-4 py-3 text-lf-charcoal">{row.sayThis}</td>
                  <td className="px-4 py-3 text-lf-slate">{row.notThat}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      <section className="container-page pb-12">
        <h2 className="h-display text-2xl">AI Twin prompts</h2>
        <p className="prose-lf mt-2 max-w-3xl text-sm text-lf-slate">
          Copy any prompt into your AI Twin to draft borrower or Realtor
          explanations. Drafts only — review before sending.
        </p>
        <div className="mt-6 grid gap-4 md:grid-cols-2">
          {prompts.map((prompt) => (
            <MarketPromptCard key={prompt.slug} prompt={prompt} />
          ))}
        </div>
      </section>
    </MarketMentorAccessGate>
  );
}
