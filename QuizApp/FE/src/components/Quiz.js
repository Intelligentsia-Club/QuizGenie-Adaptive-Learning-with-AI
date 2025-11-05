// src/components/Quiz.js
import React, { useEffect, useState } from "react";
import axios from "axios";

export default function Quiz({ questionsCount }) {
  const [questions, setQuestions] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [selectedOption, setSelectedOption] = useState("");

  useEffect(() => {
    // Fetch quiz questions from backend
    const fetchQuestions = async () => {
      try {
        const res = await axios.get(
          `http://localhost:5000/api/quiz?limit=${questionsCount}`
        );
        setQuestions(res.data);
      } catch (err) {
        console.error("Error fetching questions:", err);
      }
    };
    fetchQuestions();
  }, [questionsCount]);

  const handleAnswer = () => {
    if (selectedOption === questions[currentIndex].correctAnswer) {
      setScore(score + 1);
    }
    setSelectedOption("");
    setCurrentIndex(currentIndex + 1);
  };

  if (questions.length === 0) return <p>Loading questions...</p>;

  if (currentIndex >= questions.length) {
    return (
      <div style={styles.card}>
        <h2>Quiz Completed!</h2>
        <p>
          You scored {score} out of {questions.length}
        </p>
      </div>
    );
  }

  const currentQuestion = questions[currentIndex];

  return (
    <div style={styles.card}>
      <h3>
        Question {currentIndex + 1} / {questions.length}
      </h3>
      <p>{currentQuestion.question}</p>
      <div>
        {currentQuestion.options.map((opt, idx) => (
          <button
            key={idx}
            style={styles.optionButton}
            onClick={() => setSelectedOption(opt)}
          >
            {opt}
          </button>
        ))}
      </div>
      <button
        style={styles.nextButton}
        disabled={!selectedOption}
        onClick={handleAnswer}
      >
        {currentIndex + 1 === questions.length ? "Finish Quiz" : "Next"}
      </button>
    </div>
  );
}

const styles = {
  card: {
    backgroundColor: "#fff",
    padding: "30px",
    borderRadius: "10px",
    boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
    maxWidth: "500px",
    margin: "auto",
    textAlign: "center",
  },
  optionButton: {
    display: "block",
    width: "100%",
    margin: "10px 0",
    padding: "10px",
    borderRadius: "5px",
    border: "1px solid #007BFF",
    cursor: "pointer",
  },
  nextButton: {
    marginTop: "15px",
    padding: "10px 20px",
    backgroundColor: "#007BFF",
    color: "#fff",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
  },
};
