import { ReactNode, createContext, useEffect, useReducer } from 'react';
import { TQuestion } from '../components/utils/types';

const SECONDS_PER_QUESTION = 30;

interface State {
  questions: TQuestion[];
  status: 'loading' | 'error' | 'ready' | 'active' | 'finished';
  index: number;
  points: number;
  difficulty: string;
  answer: number | null;
  highScore: number;
  secondsRemaining: number | null;
}

type ACTIONTYPE =
  | { type: 'intro' }
  | { type: 'dataReceived'; payload: State['questions'] }
  | { type: 'dataFailed' }
  | { type: 'startQuiz' }
  | { type: 'answer'; payload: number }
  | { type: 'nextQuestion' }
  | { type: 'finish' }
  | { type: 'restart' }
  | { type: 'tick' };

const initialState: State = {
  questions: [],
  status: 'loading',
  index: 0,
  points: 0,
  difficulty: 'easy',
  answer: null,
  highScore: 0,
  secondsRemaining: null,
};
// const QuizContext = createContext<Partial<State>>(initialState);
const QuizContext = createContext<State | null>(null);

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

    case 'tick':
      return {
        ...state,
        secondsRemaining: state.secondsRemaining! - 1,
        status: state.secondsRemaining === 0 ? 'finished' : state.status,
      };

    default:
      return state;
  }
}

interface QuizProviderProps {
  children: ReactNode;
}

function QuizProvider({ children }: QuizProviderProps) {
  //useReducer hook
  const [{ questions, status, index, answer, points, highScore, secondsRemaining }, dispatch] = useReducer(
    reducer,
    initialState,
  );

  const totalQuestions = questions.length;

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

  const startQuiz = () => {
    dispatch({ type: 'startQuiz' });
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

  const handleTimeRemaining = () => {
    dispatch({ type: 'tick' });
  };
  return (
    <QuizContext.Provider
      value={{
        questions,
        totalQuestions,
        status,
        index,
        answer,
        points,
        totalPoints,
        highScore,
        secondsRemaining,
        startQuiz,
        handleAnswer,
        handleNextQuestion,
        handleEndScreen,
        handleRestart,
        handleTimeRemaining,
      }}
    >
      {children}
    </QuizContext.Provider>
  );
}

export { QuizContext, QuizProvider };
