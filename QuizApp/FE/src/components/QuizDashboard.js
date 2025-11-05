import React, { useState, useEffect } from "react";
import axios from "axios";

export default function QuizDashboard() {
  const [questions, setQuestions] = useState(15);
  const [quizStarted, setQuizStarted] = useState(false);
  const [quizData, setQuizData] = useState([]);
  const [loading, setLoading] = useState(false);

  // Fetch quiz questions from backend
  const fetchQuiz = async () => {
    try {
      setLoading(true);
      const token = localStorage.getItem("token");

      const response = await axios.get(
        `http://localhost:5000/api/quizzes?limit=${questions}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setQuizData(response.data);
      setQuizStarted(true);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching quiz:", error);
      alert("Failed to fetch quiz. Make sure you are logged in.");
      setLoading(false);
    }
  };

  const startQuiz = () => {
    fetchQuiz();
  };

  return (
    <div style={styles.container}>
      {!quizStarted ? (
        <div style={styles.card}>
          <h2 style={styles.title}>Quiz Dashboard</h2>
          <p>Welcome! Ready to test your knowledge?</p>

          <label htmlFor="questions">Select number of questions:</label>
          <select
            id="questions"
            value={questions}
            onChange={(e) => setQuestions(Number(e.target.value))}
            style={styles.select}
          >
            {[5, 10, 15, 20, 25].map((num) => (
              <option key={num} value={num}>
                {num}
              </option>
            ))}
          </select>

          <button style={styles.button} onClick={startQuiz} disabled={loading}>
            {loading ? "Loading..." : "Start Quiz"}
          </button>
        </div>
      ) : (
        <div style={styles.card}>
          <h2 style={styles.title}>Quiz Started!</h2>
          <p>Your quiz has {quizData.length} questions.</p>

          {/* Render questions */}
          {quizData.map((q, index) => (
            <div key={q._id} style={{ marginBottom: "15px" }}>
              <strong>
                {index + 1}. {q.question}
              </strong>
              <ul>
                {q.options.map((opt, i) => (
                  <li key={i}>{opt}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

const styles = {
  container: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    minHeight: "70vh",
    backgroundColor: "#f5f5f5",
    padding: "20px",
  },
  card: {
    backgroundColor: "#fff",
    padding: "40px",
    borderRadius: "12px",
    boxShadow: "0 4px 10px rgba(0,0,0,0.1)",
    textAlign: "center",
    width: "500px",
  },
  title: {
    marginBottom: "15px",
  },
  select: {
    width: "100%",
    padding: "8px",
    margin: "15px 0",
    borderRadius: "5px",
    border: "1px solid #ccc",
  },
  button: {
    backgroundColor: "#007BFF",
    color: "#fff",
    border: "none",
    padding: "10px 20px",
    borderRadius: "5px",
    cursor: "pointer",
  },
};
