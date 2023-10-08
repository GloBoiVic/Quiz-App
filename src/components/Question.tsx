import Options from './Options';
import { TQuestion } from './utils/types';

// type TQuestion = {
//   question: string;
// };

interface QuestionProps {
  question: TQuestion;
  answer: number | null;
  onAnswer: (data: number) => void;
}

function Question({ question, onAnswer, answer }: QuestionProps) {
  console.log(question);
  return (
    <div className="max-w-lg mx-auto mt-10 text-center">
      <h4 className="my-10 text-2xl font-semibold tracking-tight text-center">{question.question}</h4>

      <Options question={question} onAnswer={onAnswer} answer={answer} />
    </div>
  );
}

export default Question;
