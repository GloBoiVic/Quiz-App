import { useEffect } from 'react';
import useQuiz from '../hooks/useQuiz';

function Timer() {
  const { secondsRemaining, handleTimeRemaining } = useQuiz();

  const mins = Math.floor(secondsRemaining! / 60);
  const seconds = secondsRemaining! % 60;
  useEffect(() => {
    const timerId = setInterval(() => {
      handleTimeRemaining();
    }, 1000);

    return () => clearInterval(timerId); // Cancel timer in clean up function
  }, [handleTimeRemaining]);
  return (
    <div className="timer">
      {mins < 10 && '0'}
      {mins}:{seconds < 10 && '0'}
      {seconds}
    </div>
  );
}

export default Timer;
