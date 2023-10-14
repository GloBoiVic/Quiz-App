import { Button } from '@nextui-org/react';
import clsx from 'clsx';
import useQuiz from '../hooks/useQuiz';

function Options() {
  const { questions, index, handleAnswer, answer } = useQuiz();

  const question = questions[index];

  const hasAnswered = answer !== null;

  return (
    <div className="flex flex-col gap-4 p-2">
      {question.options.map((option, index) => (
        <Button
          key={option}
          className={clsx('justify-start rounded-full py-4 px-4 text-md transition duration-500 inline-flex', {
            'hover:translate-x-3 hover:bg-primary': !hasAnswered,
            'translate-x-3': index === answer,
            'bg-green-600/90 ': hasAnswered && index === question.correctOption,
            'bg-red-600/90': index === answer && index !== question.correctOption,
            // 'bg-red-500': hasAnswered && answer !== question.correctOption,
          })}
          disabled={answer !== null}
          onClick={() => handleAnswer!(index)}
        >
          {option}
        </Button>
      ))}
    </div>
  );
}

export default Options;
