interface StartScreenProps {
  totalQuestions: [];
  onStart;
}

function StartScreen({ totalQuestions, onStart }) {
  return (
    <div className="start">
      <h2>Welcome to the React Quiz</h2>
      <h3>{totalQuestions} questions to test your React mastery</h3>
      <button className="btn btn-ui" onClick={onStart}>
        Let's start
      </button>
    </div>
  );
}

export default StartScreen;
