

import { QuestionsTableProps } from '@/types'


const FrequencyTabs = ({questions}: QuestionsTableProps) => {
    const patternFrequency: Record<string, number> = {};

  questions.forEach((q) => {
    q.pattern.forEach((p) => {
      // assuming pattern is a string like "Arrays" or "Bit Manipulation"
      if (!patternFrequency[p]) {
        patternFrequency[p] = 1;
      } else {
        patternFrequency[p] += 1;
      }
    });
  });

  // Convert object to array for rendering (optional)
  const patternsArray = Object.entries(patternFrequency).sort(
    (a, b) => b[1] - a[1] // sort descending by count
  );

  return (
    
    <div className="">
        <div className=''>
            <ul className='flex flex-wrap gap-2 mt-4 mb-6'>
                {patternsArray.map(([pattern, count]) => (
                <li key={pattern} className='bg-gray-50 dark:bg-zinc-800 inline-block  mb-2 px-3 py-1 rounded-lg text-sm text-zinc-700 dark:text-zinc-100 border border-zinc-200 dark:border-zinc-700'>
                    {pattern}: <b>{count}</b>
                </li>
                ))}
            </ul>
        </div>
    </div>
  )
}

export default FrequencyTabs