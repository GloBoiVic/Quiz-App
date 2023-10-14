import useQuiz from '../hooks/useQuiz';
import { Button } from '@nextui-org/react';

function EndScreen() {
  const { points, totalPoints, highScore, handleRestart } = useQuiz();

  const percentage = (points / totalPoints) * 100;

  let emoji;
  if (percentage === 100) emoji = '🥇';
  if (percentage >= 80 && percentage < 100) emoji = '🎉';
  if (percentage >= 50 && percentage < 80) emoji = '🙃';
  if (percentage >= 0 && percentage < 50) emoji = '🤨';
  if (percentage === 0) emoji = '🤦‍♂️';

  return (
    <div className="max-w-md p-4 mx-auto mt-5 text-center">
      <p className="p-6 text-xl border rounded-full bg-primary">
        <span>{emoji}</span> You scored <strong>{points}</strong> out of {totalPoints}({Math.ceil(percentage)}%)
      </p>
      <p className="mt-4 text-lg">(Highscore: {highScore} points)</p>
      <Button className="mt-4" variant={'shadow'} onClick={handleRestart}>
        Restart Quiz
      </Button>
    </div>
  );
}

export default EndScreen;
