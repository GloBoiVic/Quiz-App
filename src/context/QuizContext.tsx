import { ReactNode, createContext, useEffect, useReducer } from 'react';
import { TQuestion } from '../components/utils/types';

const SECONDS_PER_QUESTION = 30;
const API_KEY = '$2a$10$mXc40AQoa1kN3L5Icv3VAO7WZY5p5W19EEJFLydLB0rtbreZR9PuK';
const BIN_ID = '65381da212a5d37659900489';

interface State {
  questions: TQuestion[];
  totalQuestions: number;
  status: 'loading' | 'error' | 'ready' | 'active' | 'finished';
  index: number;
  points: number;
  totalPoints: number;
  answer: number | null;
  highScore: number;
  secondsRemaining: number | null;
  startQuiz?: () => void;
  handleAnswer?: (answer: number) => void;
  handleNextQuestion?: () => void;
  handleEndScreen?: () => void;
  handleRestart?: () => void;
  handleTimeRemaining?: () => void;
}

const enum REDUCER_ACTION_TYPE {
  INTRO,
  DATA_RECEIVED,
  DATA_FAILED,
  START_QUIZ,
  ANSWER,
  NEXT_QUESTION,
  FINISH,
  RESTART,
  TICK,
}

type ReducerAction =
  | { type: REDUCER_ACTION_TYPE.INTRO }
  | { type: REDUCER_ACTION_TYPE.DATA_RECEIVED; payload: State['questions'] }
  | { type: REDUCER_ACTION_TYPE.DATA_FAILED }
  | { type: REDUCER_ACTION_TYPE.START_QUIZ }
  | { type: REDUCER_ACTION_TYPE.ANSWER; payload: number }
  | { type: REDUCER_ACTION_TYPE.NEXT_QUESTION }
  | { type: REDUCER_ACTION_TYPE.FINISH }
  | { type: REDUCER_ACTION_TYPE.RESTART }
  | { type: REDUCER_ACTION_TYPE.TICK };

const initialState: State = {
  questions: [],
  totalQuestions: 0,
  status: 'loading',
  index: 0,
  points: 0,
  totalPoints: 0,
  answer: null,
  highScore: 0,
  secondsRemaining: null,
};
// const QuizContext = createContext<Partial<State>>(initialState);
const QuizContext = createContext<State | null>(null);

function reducer(state: State, action: ReducerAction): typeof initialState {
  const question = state.questions[state.index];

  switch (action.type) {
    case REDUCER_ACTION_TYPE.DATA_RECEIVED:
      return { ...state, questions: action.payload, status: 'ready' };

    case REDUCER_ACTION_TYPE.DATA_FAILED:
      return { ...state, status: 'error' };

    case REDUCER_ACTION_TYPE.START_QUIZ: {
      return { ...state, status: 'active', secondsRemaining: state.questions.length * SECONDS_PER_QUESTION };
    }

    case REDUCER_ACTION_TYPE.ANSWER:
      return {
        ...state,
        answer: action.payload,
        points: action.payload === question.correctOption ? state.points + question.points : state.points,
      };

    case REDUCER_ACTION_TYPE.NEXT_QUESTION:
      return { ...state, index: state.index + 1, answer: null };

    case REDUCER_ACTION_TYPE.FINISH: {
      return {
        ...state,
        status: 'finished',
        highScore: state.points > state.highScore ? state.points : state.highScore,
      };
    }

    case REDUCER_ACTION_TYPE.RESTART:
      // return { ...state, status: 'ready', index: 0, answer: null, points: 0 };
      return { ...initialState, questions: state.questions, status: 'ready' };

    case REDUCER_ACTION_TYPE.TICK:
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
        // const res = await fetch('https://quiz-app-6nt6.onrender.com/questions');
        // const data = await res.json();
        const res = await fetch(`https://api.jsonbin.io/v3/b/${BIN_ID}/latest`, {
          headers: {
            'X-Master-Key': API_KEY,
          },
        });
        const data = await res.json();
        dispatch({ type: REDUCER_ACTION_TYPE.DATA_RECEIVED, payload: data.record.questions });
      } catch (error) {
        dispatch({ type: REDUCER_ACTION_TYPE.DATA_FAILED });
      }
    }

    fetchQuestions();
  }, []);

  const startQuiz = () => {
    dispatch({ type: REDUCER_ACTION_TYPE.START_QUIZ });
  };

  const handleAnswer = (answer: number) => {
    dispatch({ type: REDUCER_ACTION_TYPE.ANSWER, payload: answer });
  };

  const handleNextQuestion = () => {
    dispatch({ type: REDUCER_ACTION_TYPE.NEXT_QUESTION });
  };

  const handleEndScreen = () => {
    dispatch({ type: REDUCER_ACTION_TYPE.FINISH });
  };

  const handleRestart = () => {
    dispatch({ type: REDUCER_ACTION_TYPE.RESTART });
  };

  const handleTimeRemaining = () => {
    dispatch({ type: REDUCER_ACTION_TYPE.TICK });
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
