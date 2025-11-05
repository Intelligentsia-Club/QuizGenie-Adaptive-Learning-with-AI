import React, { useEffect, useState } from "react";

export default function QuestionCard({ question, index, total, onAnswer, timePerQuestion = 10 }) {
  const [timeLeft, setTimeLeft] = useState(timePerQuestion);

  useEffect(() => {
    setTimeLeft(timePerQuestion);
  }, [question, timePerQuestion]);

  useEffect(() => {
    if (timeLeft <= 0) {
      onAnswer(null);
      return;
    }
    const timerId = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
    return () => clearTimeout(timerId);
  }, [timeLeft, onAnswer]);

  return (
    <div className="card">
      <h2>Question {index + 1} / {total}</h2>
      <p className="timer">Time Left: {timeLeft}s</p>
      <p>{question.prompt}</p>
      <div className="options">
        {question.options.map((opt, i) => (
          <button
            key={i}
            className="option-btn"
            onClick={() => onAnswer(i)}
          >
            {opt}
          </button>
        ))}
      </div>
    </div>
  );
}
