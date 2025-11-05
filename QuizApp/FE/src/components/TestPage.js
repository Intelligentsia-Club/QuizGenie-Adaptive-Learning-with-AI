// src/components/TestPage.js
import React, { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";

export default function TestPage() {
  const [searchParams] = useSearchParams();
  const totalQuestions = parseInt(searchParams.get("questions")) || 5;

  const [questions, setQuestions] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [quizFinished, setQuizFinished] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`http://localhost:5000/api/quizzes?limit=${totalQuestions}`)
      .then((res) => res.json())
      .then((data) => {
        setQuestions(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching quiz:", err);
        setLoading(false);
      });
  }, [totalQuestions]);

  const handleAnswer = (option) => {
    setSelectedAnswer(option);
    if (option === questions[currentIndex].correct) {
      setScore((prev) => prev + 1);
    }
    setTimeout(() => {
      if (currentIndex + 1 < questions.length) {
        setCurrentIndex((prev) => prev + 1);
        setSelectedAnswer(null);
      } else {
        setQuizFinished(true);
      }
    }, 800);
  };

  if (loading) return <h3 style={styles.loading}>Loading quiz...</h3>;

  if (quizFinished) {
    return (
      <div style={styles.resultContainer}>
        <h2>Quiz Finished!</h2>
        <p>
          Your Score: <strong>{score}</strong> / {questions.length}
        </p>
        <button style={styles.button} onClick={() => (window.location.href = "/dashboard")}>
          Back to Dashboard
        </button>
      </div>
    );
  }

  const q = questions[currentIndex];

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <h2>Question {currentIndex + 1} of {questions.length}</h2>
        <p style={styles.question}>{q.question}</p>
        <div style={styles.optionsContainer}>
          {q.options.map((opt, i) => (
            <button
              key={i}
              onClick={() => handleAnswer(opt)}
              disabled={!!selectedAnswer}
              style={{
                ...styles.optionButton,
                backgroundColor:
                  selectedAnswer === opt
                    ? opt === q.correct
                      ? "#4CAF50"
                      : "#E74C3C"
                    : "#3498DB",
              }}
            >
              {opt}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

const styles = {
  container: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    height: "80vh",
    backgroundColor: "#f5f5f5",
  },
  card: {
    backgroundColor: "#fff",
    padding: "30px",
    borderRadius: "12px",
    boxShadow: "0 4px 10px rgba(0,0,0,0.1)",
    width: "500px",
    textAlign: "center",
  },
  question: {
    fontSize: "18px",
    marginBottom: "20px",
  },
  optionsContainer: {
    display: "flex",
    flexDirection: "column",
    gap: "10px",
  },
  optionButton: {
    padding: "10px",
    border: "none",
    borderRadius: "5px",
    color: "#fff",
    cursor: "pointer",
    fontSize: "16px",
    transition: "background-color 0.3s ease",
  },
  resultContainer: {
    textAlign: "center",
    marginTop: "100px",
  },
  button: {
    backgroundColor: "#007BFF",
    color: "#fff",
    padding: "10px 20px",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
    marginTop: "20px",
  },
  loading: {
    textAlign: "center",
    marginTop: "100px",
  },
};
