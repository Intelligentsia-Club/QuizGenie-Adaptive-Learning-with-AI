// src/components/Home.js
import React from "react";
import { Link } from "react-router-dom";

export default function Home() {
  return (
    <div style={styles.container}>
      {/* Hero Section */}
      <section style={styles.hero}>
        <h1>Welcome to Quiz App!</h1>
        <p>Challenge your knowledge, track your progress, and compete with others!</p>
        <div style={styles.ctaButtons}>
          <Link to="/signup" style={{ ...styles.button, backgroundColor: "#2575fc" }}>
            Signup
          </Link>
          <Link to="/login" style={{ ...styles.button, backgroundColor: "#00b894" }}>
            Login
          </Link>
        </div>
      </section>

      {/* Quizzes Available */}
      <section style={styles.section}>
        <h2>Quizzes Available</h2>
        <p>Explore a variety of quizzes in different categories. Select any quiz to start!</p>
        <div style={styles.quizLinks}>
          {/* 👇 Updated link to go to Quiz Dashboard */}
          <Link to="/dashboard" style={styles.quizButton}>
            Start Quiz
          </Link>
        </div>
      </section>

      {/* Features */}
      <section style={styles.section}>
        <h2>Features</h2>
        <div style={styles.features}>
          <div style={styles.featureCard}>
            <h3>Track Progress</h3>
            <p>Keep track of your scores and improve over time.</p>
          </div>
          <div style={styles.featureCard}>
            <h3>Compete with Friends</h3>
            <p>Challenge your friends and see who scores higher.</p>
          </div>
          <div style={styles.featureCard}>
            <h3>Timed Quizzes</h3>
            <p>Test your knowledge under time pressure.</p>
          </div>
        </div>
      </section>

      <br />

      {/* About Developer */}
      <section style={styles.section}>
       
      </section>
    </div>
  );
}

const styles = {
  container: {
    maxWidth: "1200px",
    margin: "0 auto",
    padding: "20px",
    fontFamily: "Arial, sans-serif",
  },
  hero: {
    textAlign: "center",
    padding: "50px 20px",
    backgroundColor: "#f5f5f5",
    borderRadius: "15px",
    marginBottom: "40px",
  },
  ctaButtons: {
    marginTop: "20px",
    display: "flex",
    justifyContent: "center",
    gap: "15px",
    flexWrap: "wrap",
  },
  button: {
    padding: "10px 20px",
    color: "#fff",
    textDecoration: "none",
    borderRadius: "8px",
    fontWeight: "bold",
  },
  section: {
    marginBottom: "40px",
    textAlign: "center",
  },
  quizLinks: {
    marginTop: "20px",
    display: "flex",
    justifyContent: "center",
    gap: "15px",
    flexWrap: "wrap",
  },
  quizButton: {
    padding: "10px 15px",
    backgroundColor: "#6c5ce7",
    color: "#fff",
    textDecoration: "none",
    borderRadius: "8px",
    fontWeight: "bold",
  },
  features: {
    display: "flex",
    justifyContent: "center",
    gap: "20px",
    flexWrap: "wrap",
    marginTop: "20px",
  },
  featureCard: {
    backgroundColor: "#fff",
    padding: "20px",
    borderRadius: "10px",
    boxShadow: "0 5px 15px rgba(0,0,0,0.1)",
    width: "250px",
    textAlign: "center",
  },
};
