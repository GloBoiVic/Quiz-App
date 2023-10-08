import Options from './Options';

// type TQuestion = {
//   question: string;
// };

interface QuestionProps {
  question: {
    correctOption: number;
    options: string[];
    points: number;
    question: string;
  };
  answer: null;
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
