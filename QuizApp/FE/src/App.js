// src/App.js
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import QuizDashboard from "./components/QuizDashboard";
import PastQuizzes from "./components/PastQuizzes";
import UpcomingQuizzes from "./components/UpcomingQuizzes";
import Profile from "./components/Profile";
import Login from "./components/Login";
import Signup from "./components/Signup";
import QuizDetails from "./components/QuizDetails";
import LeaderBoard from "./components/Leaderboard";
import ProtectedRoute from "./ProtectedRoute";
import Settings from "./components/Settings";
import Home from "./components/Home";
import PrivacyPolicy from "./components/Privacypolicy";
import Contact from "./components/Contact";
import TestPage from "./components/TestPage";
import About from "./components/About";


import "./App.css";




export default function App() {
  return (
    <Router>
      <div style={styles.app}>
        <Navbar />
        <div style={styles.main}>
          <Routes>
            {/* Public Routes */}
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/settings" element={<Settings />} />
            <Route path="/about" element={<About />} />
            <Route path="/privacy-policy" element={<PrivacyPolicy />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/dashboard" element={<ProtectedRoute><QuizDashboard /></ProtectedRoute>} />
            <Route path="/test" element={<TestPage />} />
            {/* Protected Routes */}
            <Route
              path="/home"
              element={
                <ProtectedRoute>
                  <QuizDashboard />
                </ProtectedRoute>
              }
            />
            <Route
              path="/past-quizzes"
              element={
                <ProtectedRoute>
                  <PastQuizzes />
                </ProtectedRoute>
              }
            />
            <Route
              path="/upcoming-quizzes"
              element={
                <ProtectedRoute>
                  <UpcomingQuizzes />
                </ProtectedRoute>
              }
            />
            <Route
              path="/profile"
              element={
                <ProtectedRoute>
                  <Profile />
                </ProtectedRoute>
              }
            />
            <Route
              path="/quiz/:id"
              element={
                <ProtectedRoute>
                  <QuizDetails />
                </ProtectedRoute>
              }
            />
            <Route
              path="/leaderboard"
              element={
                <ProtectedRoute>
                  <LeaderBoard />
                </ProtectedRoute>
              }
            />
          </Routes>
        </div>
        <Footer />
      </div>
    </Router>
  );
}

const styles = {
  app: {
    display: "flex",
    flexDirection: "column",
    minHeight: "100vh",
    backgroundColor: "#fff",
  },
  main: {
    flex: 1,
    padding: "20px",
    backgroundColor: "#f5f5f5",
  },
};
