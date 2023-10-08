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

interface State {
  questions: [];
  status: 'loading' | 'error' | 'ready' | 'active' | 'finished';
  index: number;
  points: number;
  userSelection: number;
  difficulty: 'easy' | 'medium' | 'hard';
  answer: null;
}

type ACTIONTYPE =
  | { type: 'intro' }
  | { type: 'dataReceived'; payload: State['questions'] }
  | { type: 'dataFailed' }
  | { type: 'startQuiz' }
  | { type: 'userSelect'; payload: number }
  | { type: 'userDifficulty'; payload: string }
  | { type: 'answer'; payload: number };

const initialState: State = {
  questions: [],
  status: 'loading',
  index: 0,
  points: 0,
  userSelection: 15,
  difficulty: 'medium',
  answer: null,
};

function reducer(state: State, action: ACTIONTYPE): typeof initialState {
  switch (action.type) {
    case 'dataReceived':
      return { ...state, questions: action.payload, status: 'ready' };

    case 'dataFailed':
      return { ...state, status: 'error' };

    case 'startQuiz': {
      return { ...state, status: 'active' };
    }

    case 'userSelect':
      return { ...state, userSelection: action.payload };

    case 'userDifficulty':
      return { ...state, difficulty: action.payload };

    case 'answer':
      return { ...state, answer: action.payload };

    default:
      return state;
  }
}

function App() {
  const [{ questions, status, points, index, userSelection, difficulty, answer }, dispatch] = useReducer(
    reducer,
    initialState,
  );

  const totalQuestions = questions?.length;

  // const totalPoints = questions.map((question) => question.points).reduce((cur, acc) => cur + acc, 0);
  const totalPoints = questions.reduce((acc, cur: State) => acc + cur.points, 0);

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

  return (
    <ThemeProvider defaultTheme="light" storageKey="vite-ui-theme">
      <div className="h-screen mx-auto max-w-screen">
        <div className="container max-w-xl border">
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
                <Question question={questions[index]} onAnswer={handleAnswer} answer={answer} />
                <Footer>
                  <NextButton
                    answer={answer}
                    // onNextQuestion={handleNextQuestion}
                    // onEndScreen={handleEndScreen}
                    index={index}
                    totalQuestions={totalQuestions}
                  />
                </Footer>
              </>
            )}
          </Main>
        </div>
      </div>
    </ThemeProvider>
  );
}

export default App;
