import React, { useState } from "react";
import QuestionCard from "./QuestionCard";
import ResultsCard from "./ResultCard";
import Settings from "./Settings";
import QUESTION_BANK from "./QuestionBank";

export default function QuizApp() {
  // App phases: setup, quiz, results
  const [phase, setPhase] = useState("setup");

  // Quiz settings and profile
  const [quizSettings, setQuizSettings] = useState({
    numQuestions: 5,
    timePerQuestion: 10,
    username: "",
    name: "",
    email: "",
    phone: ""
  });

  // Quiz state
  const [questions, setQuestions] = useState([]);
  const [index, setIndex] = useState(0);
  const [score, setScore] = useState(0);

  // Start quiz with settings
  const startQuiz = () => {
    const { numQuestions } = quizSettings;
    const selectedQuestions = [...QUESTION_BANK]
      .sort(() => Math.random() - 0.5)
      .slice(0, numQuestions);

    setQuestions(selectedQuestions);
    setPhase("quiz");
    setIndex(0);
    setScore(0);
  };

  // Submit answer
  const submitAnswer = (choiceIndex) => {
    if (choiceIndex === questions[index].answerIndex) {
      setScore((s) => s + 1);
    }
    if (index + 1 < questions.length) {
      setIndex((i) => i + 1);
    } else {
      setPhase("results");
    }
  };

  // Reset everything
  const resetAll = () => {
    setPhase("setup");
    setQuestions([]);
    setIndex(0);
    setScore(0);
  };

  return (
    <div className="quiz-app">
      {phase === "setup" && (
        <Settings
          maxQuestions={QUESTION_BANK.length}
          userProfile={quizSettings}
          onSave={setQuizSettings}
        />
      )}

      {phase === "quiz" && questions.length > 0 && (
        <QuestionCard
          question={questions[index]}
          index={index}
          total={questions.length}
          onAnswer={submitAnswer}
          timePerQuestion={quizSettings.timePerQuestion}
        />
      )}

      {phase === "results" && (
        <ResultsCard
          score={score}
          total={questions.length}
          questions={questions}
          onRestart={startQuiz} // Use previous settings
          onReset={resetAll}
        />
      )}

      {phase === "setup" && (
        <div style={{ marginTop: "15px", textAlign: "center" }}>
          <button onClick={startQuiz}>Start Quiz with Saved Settings</button>
        </div>
      )}
    </div>
  );
}
