import { MoveRightIcon } from 'lucide-react';
import { Button } from './ui/button';

function NextButton({ onNextQuestion, onEndScreen, answer, index, totalQuestions }) {
  if (answer === null) return null;

  if (index < totalQuestions - 1)
    return (
      <>
        <Button className="mt-4 rounded-lg" variant={'ghost'} onClick={onNextQuestion}>
          Next
          <span className="ml-2">
            <MoveRightIcon />
          </span>
        </Button>
        <Button className="mt-4 rounded-lg" variant={'ghost'} onClick={onNextQuestion}>
          Next
          <span className="ml-2">
            <MoveRightIcon />
          </span>
        </Button>
      </>
    );

  if (index === totalQuestions - 1)
    return (
      <button className="btn btn-ui" onClick={onEndScreen}>
        Finish
      </button>
    );
}

export default NextButton;
