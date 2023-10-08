import { useEffect, useReducer } from 'react';
import { ThemeProvider } from './theme-provider';
import Header from './components/Header';
import Main from './components/Main';
import Loader from './components/Loader';
import Error from './components/Error';
import StartScreen from './components/StartScreen';
import Question from './components/Question';
import { motion } from 'framer-motion';
import Footer from './components/Footer';
import NextButton from './components/NextButton';
import Progress from './components/Progress';
import { TQuestion } from './components/utils/types';
import EndScreen from './components/EndScreen';

interface State {
  // questions: Array<{
  //   question: string;
  //   correctOption: number;
  //   points: number;
  // }>;
  questions: TQuestion[];
  status: 'loading' | 'error' | 'ready' | 'active' | 'finished';
  index: number;
  points: number;
  userSelection: number;
  difficulty: string;
  answer: number | null;
  highScore: number;
}

type ACTIONTYPE =
  | { type: 'intro' }
  | { type: 'dataReceived'; payload: State['questions'] }
  | { type: 'dataFailed' }
  | { type: 'startQuiz' }
  | { type: 'userSelect'; payload: number }
  | { type: 'userDifficulty'; payload: string }
  | { type: 'answer'; payload: number }
  | { type: 'nextQuestion' }
  | { type: 'finish' }
  | { type: 'restart' };

const initialState: State = {
  questions: [],
  status: 'loading',
  index: 0,
  points: 0,
  userSelection: 15,
  difficulty: 'easy',
  answer: null,
  highScore: 0,
};

function reducer(state: State, action: ACTIONTYPE): typeof initialState {
  const question = state.questions.at(state.index);

  switch (action.type) {
    case 'dataReceived':
      return { ...state, questions: action.payload, status: 'ready' };

    case 'dataFailed':
      return { ...state, status: 'error' };

    case 'startQuiz': {
      return { ...state, status: 'active' };
    }

    case 'userSelect':
      return { ...state, userSelection: action.payload, questions: state.questions.slice(0, state.userSelection) };

    case 'userDifficulty':
      return { ...state, difficulty: action.payload };

    case 'answer':
      return {
        ...state,
        answer: action.payload,
        points: action.payload === question.correctOption ? state.points + question.points : state.points,
      };

    case 'nextQuestion':
      return { ...state, index: state.index++, answer: null };

    case 'finish': {
      return {
        ...state,
        status: 'finished',
        highScore: state.points > state.highScore ? state.points : state.highScore,
      };
    }

    case 'restart':
      // return { ...state, status: 'ready', index: 0, answer: null, points: 0 };
      return { ...initialState, questions: state.questions, status: 'ready' };
    default:
      return state;
  }
}

function App() {
  const [{ questions, status, points, index, userSelection, difficulty, answer, highScore }, dispatch] = useReducer(
    reducer,
    initialState,
  );

  console.log(questions);

  const totalQuestions = questions?.length;

  // const totalPoints = questions.map((question) => question.points).reduce((cur, acc) => cur + acc, 0);
  const totalPoints = questions.reduce((acc, cur) => acc + cur.points, 0);

  useEffect(() => {
    async function fetchQuestions() {
      try {
        const res = await fetch('http://localhost:8000/questions');
        const data = await res.json();
        dispatch({ type: 'dataReceived', payload: data });
      } catch (error) {
        dispatch({ type: 'dataFailed' });
      }
    }

    fetchQuestions();
  }, []);

  console.log(questions);
  // console.log(questions.question.filter((value) => value < 10));

  const startQuiz = () => {
    dispatch({ type: 'startQuiz' });
  };

  const handleUserSelection = (data: number) => {
    dispatch({ type: 'userSelect', payload: data });
  };

  const handleDifficultySelection = (data: string) => {
    dispatch({ type: 'userDifficulty', payload: data });
  };

  const handleAnswer = (answer: number) => {
    dispatch({ type: 'answer', payload: answer });
  };

  const handleNextQuestion = () => {
    dispatch({ type: 'nextQuestion' });
  };

  const handleEndScreen = () => {
    dispatch({ type: 'finish' });
  };

  const handleRestart = () => {
    dispatch({ type: 'restart' });
  };

  return (
    <ThemeProvider defaultTheme="light" storageKey="vite-ui-theme">
      <div className="h-screen mx-auto max-w-screen">
        <div className="container max-w-xl">
          <Header />
          <Main>
            {status === 'loading' && <Loader />}
            {status === 'error' && <Error />}
            {status === 'ready' && (
              <StartScreen
                totalQuestions={totalQuestions}
                onStart={startQuiz}
                difficulty={difficulty}
                userSelection={userSelection}
                onUserSelect={handleUserSelection}
                onUserDifficulty={handleDifficultySelection}
              />
            )}
            {status === 'active' && (
              <>
                <Progress
                  index={index}
                  totalQuestions={totalQuestions}
                  points={points}
                  totalPoints={totalPoints}
                  answer={answer}
                />
                <Question question={questions[index]} onAnswer={handleAnswer} answer={answer} />
                <Footer>
                  <NextButton
                    answer={answer}
                    onNextQuestion={handleNextQuestion}
                    onEndScreen={handleEndScreen}
                    index={index}
                    totalQuestions={totalQuestions}
                  />
                </Footer>
              </>
            )}
            {status === 'finished' && (
              <EndScreen points={points} totalPoints={totalPoints} highScore={highScore} onRestart={handleRestart} />
            )}
          </Main>
        </div>
      </div>
    </ThemeProvider>
  );
}

export default App;
