
import MaxWidthContainer from "@/components/container/max-width-container";
import FrequencyTabs from "@/components/frequency/frequency-tabs";
import { QuestionsTable } from "@/components/table/leetcode-table";
import { loadQuestions } from "@/lib/load-questions";

export default function Home() {
  const questions = loadQuestions();
  return (
    <div className="pt-32">
      <MaxWidthContainer>
        <h2 className="text-2xl font-bold">Problem Pattern Frequency</h2>
        <FrequencyTabs questions={questions} />
      <QuestionsTable questions={questions} />
      </MaxWidthContainer >
    </div>
  );
}
