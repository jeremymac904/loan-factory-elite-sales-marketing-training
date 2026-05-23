import PageHero from "@/components/PageHero";
import ComplianceCallout from "@/components/ComplianceCallout";
import QuizRunner from "@/components/QuizRunner";
import {
  newLoAptitudeQuiz,
  aptitudeCategories,
  aptitudeQuestions,
} from "@/data/newLoAptitudeQuiz";

export const metadata = { title: "New LO Aptitude & Personality Quiz" };

export default function NewLoAptitudeQuizPage() {
  return (
    <>
      <PageHero
        eyebrow="LO Development"
        title="New LO Aptitude & Personality Quiz"
        body={
          <p>
            For new and developing loan officers. You will get a development
            stage profile, a 30-day focus, first scripts to practice, AI
            training recommendations, and support routing.
          </p>
        }
        backgroundImage="/media/dark-hero-background.png"
      />

      <section className="container-page py-12">
        <QuizRunner
          quizKind="new-lo"
          quizName={newLoAptitudeQuiz.name}
          timeEstimate={newLoAptitudeQuiz.timeEstimate}
          categories={aptitudeCategories}
          questions={aptitudeQuestions}
          resultsHref="/quiz-results/"
        />
      </section>

      <section className="container-page pb-20">
        <ComplianceCallout title="Coaching tool only" variant="default">
          <p>
            This quiz is a coaching and development tool only. It is not a
            clinical personality test, an employment test, a licensing or
            compliance decision, or an underwriting tool. Results live in your
            browser session and are not stored or sent anywhere.
          </p>
        </ComplianceCallout>
      </section>
    </>
  );
}
