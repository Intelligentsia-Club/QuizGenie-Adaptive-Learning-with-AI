// src/components/Login.js
import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!email || !password) {
      alert("Please enter both email and password");
      return;
    }

    try {
      const res = await fetch("http://localhost:5000/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();

      if (res.ok) {
        localStorage.setItem("token", data.token); // store JWT
        localStorage.setItem("user", JSON.stringify(data.user)); // store user info
        navigate("/dashboard"); // redirect after login
      } else {
        setMessage(data.message || "Login failed");
      }
    } catch (err) {
      console.error(err);
      setMessage("Server error");
    }
  };

  return (
    <div style={styles.container}>
      <h2 style={styles.heading}>Login</h2>
      <form onSubmit={handleSubmit} style={styles.form}>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          style={styles.input}
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          style={styles.input}
        />
        <button type="submit" style={styles.button}>Login</button>
      </form>
      {message && <p style={styles.error}>{message}</p>}
      <p style={styles.text}>
        Don't have an account? <Link to="/signup" style={styles.link}>Sign Up</Link>
      </p>
    </div>
  );
};

const styles = {
  container: { maxWidth: "400px", margin: "50px auto", padding: "20px", backgroundColor: "#fff", borderRadius: "8px", boxShadow: "0 0 10px rgba(0,0,0,0.1)", textAlign: "center" },
  heading: { marginBottom: "20px", color: "#333" },
  form: { display: "flex", flexDirection: "column" },
  input: { padding: "10px", marginBottom: "15px", borderRadius: "5px", border: "1px solid #ccc", fontSize: "16px" },
  button: { padding: "10px", borderRadius: "5px", border: "none", backgroundColor: "#4CAF50", color: "#fff", fontSize: "16px", cursor: "pointer" },
  text: { marginTop: "15px", fontSize: "14px", color: "#555" },
  link: { color: "#4CAF50", textDecoration: "underline" },
  error: { color: "red", marginTop: "10px" },
};

export default Login;
