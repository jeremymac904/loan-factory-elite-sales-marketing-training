import Link from "next/link";
import PageHero from "@/components/PageHero";
import QuizResultsView from "@/components/QuizResultsView";

export const metadata = { title: "Coaching Report" };

export default function QuizResultsPage() {
  return (
    <>
      <PageHero
        eyebrow="LO Development"
        title="Your Coaching Report"
        body={
          <p>
            Use this report with your team leader or coach. Copy, print, or
            download it. Take it again any time your role or pipeline shifts.
          </p>
        }
        backgroundImage="/media/dark-hero-background.png"
      >
        <div className="flex flex-wrap gap-3">
          <Link
            href="/assessments/"
            className="btn-secondary border-white/30 bg-white/10 text-white hover:border-white hover:bg-white/20"
          >
            All assessments
          </Link>
          <Link
            href="/coach-reports/"
            className="btn-secondary border-white/30 bg-white/10 text-white hover:border-white hover:bg-white/20"
          >
            See sample reports
          </Link>
        </div>
      </PageHero>

      <section className="container-page py-12">
        <QuizResultsView />
      </section>
    </>
  );
}
