import React from "react";
import { useLocation, useParams, useNavigate } from "react-router-dom";

function QuizDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const quiz = location.state; 
  const sampleQuestions = [
    {
      q: "What is the capital of France?",
      options: ["Paris", "London", "Berlin", "Madrid"],
      correct: "Paris",
      userAnswer: "Paris",
    },
    {
      q: "2 + 2 * 2 = ?",
      options: ["6", "8", "4", "2"],
      correct: "6",
      userAnswer: "6",
    },
    {
      q: "Who developed React?",
      options: ["Google", "Microsoft", "Facebook", "Amazon"],
      correct: "Facebook",
      userAnswer: "Microsoft",
    },
    {
        q: "What is the largest planet in our solar system?",
        options: ["Earth", "Mars", "Jupiter", "Saturn"],
        correct: "Jupiter",
        userAnswer: "Jupiter",
      },

    {
        q: "What is the boiling point of water?",
        options: ["90°C", "100°C", "110°C", "120°C"],
        correct: "100°C",
        userAnswer: "90°C",
    },
    {
        q: "What is the sum of angles in a triangle?",
        options: ["90°", "180°", "360°", "270°"],
        correct: "180°",
        userAnswer: "180°",
    },
    {
        q: "Which language is primarily spoken in Brazil?",
        options: ["Spanish", "Portuguese", "French", "English"],
        correct: "Portuguese",
        userAnswer: "Spanish",
    },
    {
        q: "If all cats are mammals and all mammals are animals, are all cats animals?",
        options: ["Yes", "No"],
        correct: "Yes", 
        userAnswer: "Yes",
    }
 ];

  return (
    <div style={styles.container}>
      <button style={styles.backButton} onClick={() => navigate(-1)}>
        ⬅ Back to Past Quizzes
      </button>

      <h2>{quiz?.title || `Quiz #${id}`}</h2>
      <p>
         <strong>Date:</strong> {quiz?.date ? new Date(quiz.date).toLocaleDateString("en-GB") : ""}
      </p>
      <p>
         <strong>Score:</strong> {quiz?.score || "—"}/{quiz?.total || "—"}
      </p>

      <div style={styles.questionsContainer}>
        {sampleQuestions.map((q, index) => (
          <div key={index} style={styles.questionCard}>
            <h4>{index + 1}. {q.q}</h4>
            <ul style={styles.optionsList}>
              {q.options.map((opt, i) => (
                <li
                  key={i}
                  style={{
                    ...styles.option,
                    backgroundColor:
                      opt === q.correct
                        ? "#d4edda"
                        : opt === q.userAnswer
                        ? "#f8d7da"
                        : "#f9f9f9",
                  }}
                >
                  {opt}
                </li>
              ))}
            </ul>
            <p>
               <strong>Correct Answer:</strong> {q.correct}
            </p>
            <p>
               <strong>Your Answer:</strong>{" "}
              <span
                style={{
                  color: q.userAnswer === q.correct ? "green" : "red",
                }}
              >
                {q.userAnswer}
              </span>
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}

const styles = {
  container: {
    padding: "20px",
    fontFamily: "Arial, sans-serif",
  },
  backButton: {
    backgroundColor: "#007BFF",
    color: "white",
    border: "none",
    borderRadius: "5px",
    padding: "8px 12px",
    cursor: "pointer",
    marginBottom: "15px",
  },
  questionsContainer: {
    marginTop: "20px",
  },
  questionCard: {
    backgroundColor: "#fff",
    padding: "15px",
    borderRadius: "10px",
    boxShadow: "0 2px 5px rgba(0,0,0,0.1)",
    marginBottom: "15px",
  },
  optionsList: {
    listStyleType: "none",
    padding: 0,
  },
  option: {
    padding: "8px",
    marginBottom: "5px",
    borderRadius: "5px",
    border: "1px solid #ccc",
  },
};

export default QuizDetails;
