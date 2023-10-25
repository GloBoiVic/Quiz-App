import EndScreen from './components/EndScreen';
import Error from './components/Error';
import Footer from './components/Footer';
import Header from './components/Header';
import Loader from './components/Loader';
import Main from './components/Main';
import NextButton from './components/NextButton';
import Progress from './components/Progress';
import Question from './components/Question';
import StartScreen from './components/StartScreen';
import Timer from './components/Timer';
import useQuiz from './hooks/useQuiz';
import { ThemeProvider } from './theme-provider';

function App() {
  const { status } = useQuiz();

  return (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <div className="h-screen mx-auto max-w-screen">
        <div className="container max-w-xl">
          <Header />

          <Main>
            {status === 'loading' && <Loader />}
            {status === 'error' && <Error />}
            {status === 'ready' && <StartScreen />}
            {status === 'active' && (
              <>
                <Progress />
                <Question />
                <Footer>
                  <Timer />
                  <NextButton />
                </Footer>
              </>
            )}

            {status === 'finished' && <EndScreen />}
          </Main>
        </div>
      </div>
    </ThemeProvider>
  );
}

export default App;
