import useQuiz from '../hooks/useQuiz';
import Options from './Options';

function Question() {
  const { questions, index } = useQuiz();

  return (
    <div className="max-w-lg mt-10 text-center">
      <h4 className="my-10 text-xl font-semibold tracking-tight md:text-2xl">{questions[index].question}</h4>

      <Options />
    </div>
  );
}

export default Question;
