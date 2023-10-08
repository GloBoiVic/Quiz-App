import { useEffect, useReducer } from 'react';
import { ThemeProvider } from './theme-provider';
import Header from './components/Header';
import Main from './components/Main';
import Loader from './components/Loader';
import Error from './components/Error';
import StartScreen from './components/StartScreen';
import { motion } from 'framer-motion';

interface State {
  questions: [];
  status: 'loading' | 'error' | 'ready' | 'active' | 'finished';
  points: number;
}

type ACTIONTYPE =
  | { type: 'intro' }
  | { type: 'dataReceived'; payload: State['questions'] }
  | { type: 'dataFailed' }
  | { type: 'startQuiz' };

const initialState: State = {
  questions: [],
  status: 'loading',
  points: 0,
};

function reducer(state: State, action: ACTIONTYPE): typeof initialState {
  switch (action.type) {
    case 'dataReceived':
      return { ...state, questions: action.payload, status: 'ready' };

    case 'dataFailed':
      return { ...state, status: 'error' };

    case 'startQuiz': {
      return { ...state, status: 'ready' };
    }

    default:
      return state;
  }
}

function App() {
  const [{ questions, status, points }, dispatch] = useReducer(reducer, initialState);

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

  return (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <div className="max-w-screen h-screen mx-auto">
        <Header />
        <Main>
          <>
            {status === 'loading' && <Loader />}
            {status === 'error' && <Error />}
            {status === 'ready' && <StartScreen totalQuestions={totalQuestions} onStart={startQuiz} />}
          </>
        </Main>
      </div>
    </ThemeProvider>
  );
}

export default App;
