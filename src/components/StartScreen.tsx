import { Button } from './ui/button';
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { MoveRightIcon } from 'lucide-react';

interface StartScreenProps {
  totalQuestions: number;
  userSelection: number;
  difficulty: string;
  onUserSelect: (data: number) => void;
  onUserDifficulty: (data: string) => void;
  onStart: () => void;
}

function StartScreen({
  userSelection,
  difficulty,
  onUserSelect,
  onUserDifficulty,
  totalQuestions,
  onStart,
}: StartScreenProps) {
  // const [userSelection, setUserSelection] = useState(totalQuestions);
  // const [difficulty, setDifficulty] = useState('hard');
  return (
    <div className="max-w-md p-4 mx-auto mt-5 text-center">
      <div className="w-full">
        <h2 className="pb-2 text-3xl font-semibold tracking-tight">Welcome to the React Quiz</h2>
        <h3 className="text-xl font-semibold tracking-tight text-center">Test your React mastery</h3>
        <h5 className="mt-5 text-lg font-semibold tracking-tight text-center">Pick your options</h5>
        <div className="flex items-center w-full p-5">
          <p className="w-1/2">Number of questions:</p>
          <input
            type="range"
            min={2}
            max={totalQuestions}
            onChange={(e) => {
              onUserSelect(Number(e.target.value));
            }}
            className="w-1/2 h-3 rounded-lg appearance-none cursor-pointer bg-accent"
          />
          <span className="pl-2">{userSelection}</span>
        </div>
        <div className="flex items-center justify-center w-full">
          <Select
            value={difficulty}
            onValueChange={(e) => {
              onUserDifficulty(e);
            }}
          >
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Select a difficulty" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectItem value="easy">Easy</SelectItem>
                <SelectItem value="medium">Medium</SelectItem>
                <SelectItem value="hard">Hard</SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>
        <div className="mt-5 text-center">
          <Button variant={'ghost'} onClick={onStart}>
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
