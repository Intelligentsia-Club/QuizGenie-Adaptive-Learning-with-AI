import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

function PastQuizzes() {
  const [pastQuizzes, setPastQuizzes] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const currentYear = new Date().getFullYear();
    const today = new Date();

    const generatedQuizzes = Array.from({ length: 10 }, (_, i) => {
      const randomDay = Math.floor(Math.random() * 300);
      const quizDate = new Date(currentYear, 0, 1 + randomDay);

      const questions = Array.from({ length: 5 }, (__, qIndex) => ({
        id: qIndex + 1,
        question: `Question ${qIndex + 1} of Quiz ${i + 1}`,
        options: ["Option A", "Option B", "Option C", "Option D"],
        correctAnswer: "Option B",
        userAnswer: ["Option A", "Option B", "Option C", "Option D"][
          Math.floor(Math.random() * 4)
        ],
      }));

      return {
        id: i + 1,
        title: `Aptitude Quiz #${i + 1}`,
        date: quizDate,
        score: Math.floor(Math.random() * 100),
        total: 100,
        questions,
      };
    }).filter((quiz) => quiz.date <= today);

    generatedQuizzes.sort((a, b) => b.date - a.date);
    setPastQuizzes(generatedQuizzes);
  }, []);

  const handleQuizClick = (quiz) => {
    navigate(`/past-quizzes/${quiz.id}`, { state: { quiz } });
  };

  return (
    <div style={styles.container}>
      <h2>Past Quizzes</h2>
      <p>Click a quiz to view detailed questions and answers.</p>

      <div style={styles.quizList}>
        {pastQuizzes.map((quiz) => (
          <div
            key={quiz.id}
            style={styles.quizCard}
            onClick={() => handleQuizClick(quiz)}
          >
            <h3>{quiz.title}</h3>
            <p> {quiz.date.toLocaleDateString("en-GB")}</p>
            <p> Score: {quiz.score}/{quiz.total}</p>
            <p>
              {quiz.score >= 70
                ? " Passed"
                : quiz.score >= 40
                ? " Average"
                : " Failed"}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}

const styles = {
  container: { padding: "20px", fontFamily: "Arial, sans-serif" },
  quizList: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
    gap: "20px",
    marginTop: "20px",
  },
  quizCard: {
    backgroundColor: "#f9f9f9",
    padding: "15px",
    borderRadius: "10px",
    boxShadow: "0 2px 5px rgba(0,0,0,0.1)",
    textAlign: "center",
    cursor: "pointer",
    transition: "transform 0.2s ease, box-shadow 0.2s ease",
  },
};

export default PastQuizzes;
