import React, { useState } from "react";

export default function SetupCard({ onStart, maxQuestions }) {
  const [numQuestions, setNumQuestions] = useState(5);

  const handleStart = () => {
    onStart(numQuestions);
  };

  return (
    <div className="card">
      <h2>Quiz</h2>
      <p>Welcome! Ready to test your knowledge?</p>

      <label htmlFor="questions">Select number of questions:</label>
      <select
        id="questions"
        value={numQuestions}
        onChange={(e) => setNumQuestions(Number(e.target.value))}
      >
        {[5, 10, 15, 20, 25].filter(n => n <= maxQuestions).map((num) => (
          <option key={num} value={num}>{num}</option>
        ))}
      </select>

      <button onClick={handleStart}>Start Quiz</button>

    </div>
  );
}
