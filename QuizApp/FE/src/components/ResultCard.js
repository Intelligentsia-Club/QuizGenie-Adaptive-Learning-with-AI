import React from "react";

export default function ResultsCard({ score, total, onRestart, onReset }) {
  return (
    <div className="card">
      <h2>Quiz Completed!</h2>
      <p>Your Score: {score} / {total}</p>
      <div className="result-buttons">
        <button onClick={onRestart}>Play Again</button>
        <button onClick={onReset}>Reset Quiz</button>
      </div>
    </div>
  );
}
