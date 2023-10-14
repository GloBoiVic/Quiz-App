import useQuiz from '../hooks/useQuiz';
import { Button } from '@nextui-org/react';
import { MoveRightIcon } from 'lucide-react';

function StartScreen() {
  const { totalQuestions, startQuiz } = useQuiz();

  return (
    <div className="max-w-md p-4 mx-auto mt-5 text-center">
      <div className="w-full">
        <h2 className="pb-2 text-3xl font-semibold tracking-tight">Welcome to the React Quiz</h2>
        <h3 className="text-xl font-semibold tracking-tight text-center">
          {totalQuestions} questions to test your React mastery
        </h3>
        <div className="mt-5 text-center">
          <Button variant={'shadow'} onClick={startQuiz}>
            Let's start
            <span className="ml-2">
              <MoveRightIcon />
            </span>
          </Button>
        </div>
      </div>
    </div>
  );
}

export default StartScreen;
