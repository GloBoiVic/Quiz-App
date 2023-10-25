import { MoveRightIcon } from 'lucide-react';
import { Button } from '@nextui-org/react';
import useQuiz from '../hooks/useQuiz';

function NextButton() {
  const { handleNextQuestion, handleEndScreen, answer, index, totalQuestions } = useQuiz();

  if (answer === null) return null;

  if (index < totalQuestions - 1)
    return (
      <>
        <Button className="rounded-lg" variant={'shadow'} onClick={handleNextQuestion}>
          Next
          <span className="ml-2">
            <MoveRightIcon />
          </span>
        </Button>
      </>
    );

  if (index === totalQuestions - 1) return <Button onClick={handleEndScreen}>Finish</Button>;
}

export default NextButton;
