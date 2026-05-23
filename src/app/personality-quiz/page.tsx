import PageHero from "@/components/PageHero";
import ComplianceCallout from "@/components/ComplianceCallout";
import QuizRunner from "@/components/QuizRunner";
import {
  personalityQuiz,
  personalityQuizCategories,
  personalityQuizQuestions,
} from "@/data/personalityQuiz";

export const metadata = { title: "Coaching Personality Quiz" };

export default function PersonalityQuizPage() {
  return (
    <>
      <PageHero
        eyebrow="LO Development"
        title="Coaching Personality Quiz"
        body={
          <p>
            Answer honestly. You will get a Coaching Personality profile, a
            best-fit training path, and team leader notes a coach can build a
            real plan around.
          </p>
        }
        backgroundImage="/media/dark-hero-background.png"
      />

      <section className="container-page py-12">
        <QuizRunner
          quizKind="personality"
          quizName={personalityQuiz.name}
          timeEstimate={personalityQuiz.timeEstimate}
          categories={personalityQuizCategories}
          questions={personalityQuizQuestions}
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
