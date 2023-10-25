import useQuiz from '../hooks/useQuiz';

import { Progress as UiProgress } from '@nextui-org/react';

function Progress() {
  const { index, totalQuestions, points, totalPoints, answer } = useQuiz();
  return (
    <>
      <UiProgress
        size="lg"
        maxValue={totalQuestions}
        color="primary"
        aria-label="progress"
        value={index + Number(answer !== null)}
      />
      <p className="mt-3 leading-7">
        Question <strong>{index + 1}</strong> / {totalQuestions}
      </p>
      <p className="leading-7">
        <strong>{points}</strong> / {totalPoints}
      </p>
    </>
  );
}

export default Progress;
