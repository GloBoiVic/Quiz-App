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
          className={clsx(
            'justify-start rounded-full py-2 px-6 text-lg transition duration-500   inline-flex text-white/90 ',
            {
              'hover:translate-x-3 hover:bg-accent': !hasAnswered,
              'translate-x-3': index === answer,
              'bg-green-600/90 ': hasAnswered && index === question.correctOption,
              'bg-red-700/90': index === answer && index !== question.correctOption,
              // 'bg-red-500': hasAnswered && answer !== question.correctOption,
            },
          )}
          disabled={answer !== null}
          onClick={() => handleAnswer(index)}
        >
          {option}
        </Button>
      ))}
    </div>
  );
}

export default Options;
