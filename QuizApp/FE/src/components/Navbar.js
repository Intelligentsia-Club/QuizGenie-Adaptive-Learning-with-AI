import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Navbar.css"; // ✅ Import the new CSS

export default function Navbar() {
  const navigate = useNavigate();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("token");
    setIsLoggedIn(!!token);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    setIsLoggedIn(false);
    navigate("/login");
  };

  const getLinkStyle = (requiresLogin = false) => ({
    color: requiresLogin && !isLoggedIn ? "#aaa" : "#fff",
    textDecoration: "none",
    fontWeight: requiresLogin && !isLoggedIn ? "400" : "500",
    pointerEvents: requiresLogin && !isLoggedIn ? "none" : "auto",
    cursor: requiresLogin && !isLoggedIn ? "default" : "pointer",
  });

  return (
    <nav className="navbar">
      <div className="navbar-left">
        <Link to="/" className="logo">QuizApp</Link>

        {/* Hamburger for mobile */}
        <button className="hamburger" onClick={() => setMenuOpen(!menuOpen)}>
          ☰
        </button>

        <div className={`nav-links-left ${menuOpen ? "open" : ""}`}>
          <Link style={getLinkStyle(true)} to="/dashboard">Dashboard</Link>
          <Link style={getLinkStyle(true)} to="/past-quizzes">Past Quizzes</Link>
          <Link style={getLinkStyle(true)} to="/upcoming-quizzes">Upcoming Quizzes</Link>
          <Link style={getLinkStyle(true)} to="/leaderboard">Leaderboard</Link>
          <Link style={getLinkStyle(true)} to="/profile">Profile</Link>
        </div>
      </div>

      <div className={`navbar-right ${menuOpen ? "open" : ""}`}>
        {!isLoggedIn && (
          <>
            <Link style={getLinkStyle()} to="/login">Login</Link>
            <Link style={getLinkStyle()} to="/signup">Signup</Link>
          </>
        )}
        <Link style={getLinkStyle()} to="/settings">Settings</Link>
        {isLoggedIn && (
          <button className="logout-btn" onClick={handleLogout}>
            Logout
          </button>
        )}
      </div>
    </nav>
  );
}
