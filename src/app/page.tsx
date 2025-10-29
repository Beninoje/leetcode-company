
import MaxWidthContainer from "@/components/container/max-width-container";
import FrequencyTabs from "@/components/frequency/frequency-tabs";
import MyToolTip from "@/components/my-tool-tip/my-tool-tip";
import { QuestionsDataTable } from "@/components/table/leetcode-table";

import { loadQuestions } from "@/lib/load-questions";
import Image from "next/image";

export default function Home() {
  const questions = loadQuestions();
  return (
    <div className="pt-32 dark:bg-zinc-900">
      <MaxWidthContainer>
        <h2 className="text-2xl font-bold">Problem Pattern Frequency</h2>
        <FrequencyTabs questions={questions} />
      <QuestionsDataTable questions={questions} />
      </MaxWidthContainer >
      <MyToolTip />
    </div>
  );
}
