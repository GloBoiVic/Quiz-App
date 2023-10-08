interface ProgressProps {
  answer: number | null;
  index: number;
  points: number;
  totalPoints: number;
  totalQuestions: number;
}

function Progress({ index, totalQuestions, points, totalPoints, answer }: ProgressProps) {
  return (
    <header className="grid gap-4 border place-content-between ">
      <progress
        max={totalQuestions}
        className="w-full overflow-hidden rounded [&::-webkit-progress-bar]:bg-secondary border-gray-500 shadow-md [&::-webkit-progress-value]:bg-accent [&::-moz-progress-bar] col-span-2 "
        value={index + Number(answer !== null)}
      />
      <p className="leading-7">
        Question <strong>{index + 1}</strong> / {totalQuestions}
      </p>
      <p className="leading-7">
        <strong>{points}</strong> / {totalPoints}
      </p>
    </header>
  );
}

export default Progress;
