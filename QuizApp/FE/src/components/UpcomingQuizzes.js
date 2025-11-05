import React, { useEffect, useState } from "react";

function UpcomingQuizzes() {
  const [upcomingQuizzes, setUpcomingQuizzes] = useState([]);
  const [nextQuiz, setNextQuiz] = useState(null);
  const [countdown, setCountdown] = useState("");

  useEffect(() => {
    const today = new Date();
    const currentYear = today.getFullYear();
    const quizzes = [];

    for (let month = today.getMonth(); month < 12; month++) {
      for (let i = 0; i < 3; i++) {
        const randomDay = Math.floor(Math.random() * 25) + 1;
        const randomHour = Math.floor(Math.random() * 12) + 8;
        const randomMinute = Math.floor(Math.random() * 60);
        const quizDate = new Date(currentYear, month, randomDay, randomHour, randomMinute);

        if (quizDate <= today) continue;

        quizzes.push({
          id: `${month + 1}-${i + 1}`,
          title: `Aptitude Quiz ${month + 1}-${i + 1}`,
          date: quizDate,
          category: ["Logic", "Math", "Verbal"][i % 3],
          duration: "30 mins",
        });
      }
    }

    quizzes.sort((a, b) => a.date - b.date);
    setUpcomingQuizzes(quizzes);

    if (quizzes.length > 0) setNextQuiz(quizzes[0]);
  }, []);

  useEffect(() => {
    if (!nextQuiz) return;

    const interval = setInterval(() => {
      const now = new Date();
      const distance = nextQuiz.date - now;

      if (distance <= 0) {
        setCountdown("The next quiz is happening now!");
        clearInterval(interval);
        return;
      }

      const days = Math.floor(distance / (1000 * 60 * 60 * 24));
      const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((distance % (1000 * 60)) / 1000);

      setCountdown(`${days}d ${hours}h ${minutes}m ${seconds}s`);
    }, 1000);

    return () => clearInterval(interval);
  }, [nextQuiz]);

  const formatDate = (date) =>
    date.toLocaleDateString("en-GB", { day: "2-digit", month: "short", year: "numeric" });

  const formatTime = (date) =>
    date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });

  return (
    <div style={styles.container}>
      <h2>Upcoming Quizzes</h2>
      <p>Get ready for your next intellectual showdown! </p>

      {/* Countdown section */}
      {nextQuiz && (
        <div style={styles.countdownBox}>
          <h3>Next Quiz: {nextQuiz.title}</h3>
          <p>
             {formatDate(nextQuiz.date)} |  {formatTime(nextQuiz.date)}
          </p>
          <h2 style={styles.timer}>{countdown}</h2>
        </div>
      )}

      {/* List of upcoming quizzes */}
      <div style={styles.quizList}>
        {upcomingQuizzes.map((quiz) => {
          const isToday = new Date().toDateString() === quiz.date.toDateString();

          return (
            <div key={quiz.id} style={styles.quizCard}>
              <h3>{quiz.title}</h3>
              <p>
                 <strong>Category:</strong> {quiz.category}
              </p>
              <p>
                 <strong>Date:</strong> {formatDate(quiz.date)}
              </p>
              <p>
                 <strong>Time:</strong> {formatTime(quiz.date)}
              </p>
              <p>
                 <strong>Duration:</strong> {quiz.duration}
              </p>
              <p
                style={{
                  color: isToday ? "#4CAF50" : "#007BFF",
                  fontWeight: "bold",
                }}
              >
                {isToday ? " Happening Today!" : " Upcoming"}
              </p>
            </div>
          );
        })}
      </div>
    </div>
  );
}

const styles = {
  container: {
    padding: "20px",
    fontFamily: "Arial, sans-serif",
  },
  countdownBox: {
    backgroundColor: "#f0f9ff",
    border: "1px solid #cce7ff",
    padding: "20px",
    borderRadius: "10px",
    marginBottom: "30px",
    textAlign: "center",
    boxShadow: "0 2px 6px rgba(0,0,0,0.1)",
  },
  timer: {
    fontSize: "1.8rem",
    color: "#007BFF",
    fontWeight: "bold",
    marginTop: "10px",
  },
  quizList: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
    gap: "20px",
  },
  quizCard: {
    backgroundColor: "#fff",
    padding: "20px",
    borderRadius: "10px",
    boxShadow: "0 2px 6px rgba(0,0,0,0.1)",
    transition: "transform 0.2s ease, box-shadow 0.2s ease",
    textAlign: "center",
  },
};

export default UpcomingQuizzes;
