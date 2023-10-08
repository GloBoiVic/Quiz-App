import { Button } from './ui/button';
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from './ui/card';
import { Progress } from './ui/progress';

interface StartScreenProps {
  totalQuestions: number;
  onStart: () => void;
}

function StartScreen({ totalQuestions, onStart }: StartScreenProps) {
  return (
    <div className="border border-green-400 max-w-lg mx-auto mt-5 p-4 text-center">
      <div className="w-full">
        <h2 className="pb-2 text-3xl font-semibold tracking-tight">Welcome to the React Quiz</h2>
        <h3 className="text-xl font-semibold tracking-tight text-center">Test your React mastery</h3>
        <h5 className="text-lg font-semibold tracking-tight text-center mt-5">Pick your options</h5>
        <div className="flex items-center p-5 w-full">
          <p className="w-1/2">Number of questions:</p>
          <Progress className="w-1/2" />
        </div>
        <p>Difficulty:</p>
        <div>
          <Button className="btn btn-ui" onClick={onStart}>
            Let's start
          </Button>
        </div>
      </div>
    </div>
  );
}

export default StartScreen;
