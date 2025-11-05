import React, { useState } from "react";

export default function Settings({ maxQuestions, userProfile, onSave }) {
  // Quiz settings
  const [numQuestions, setNumQuestions] = useState(userProfile?.numQuestions || 5);
  const [timePerQuestion, setTimePerQuestion] = useState(userProfile?.timePerQuestion || 10);

  // Profile settings
  const [username, setUsername] = useState(userProfile?.username || "");
  const [fullName, setFullName] = useState(userProfile?.name || "");
  const [email, setEmail] = useState(userProfile?.email || "");
  const [phone, setPhone] = useState(userProfile?.phone || "");

  const handleSave = () => {
    const newSettings = { numQuestions, timePerQuestion, username, name: fullName, email, phone };
    onSave(newSettings);
    alert("Settings saved!");
  };

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        minHeight: "100vh",
        backgroundColor: "#fff", // White background
        padding: "20px",
      }}
    >
      <div
        style={{
          width: "100%",
          maxWidth: "450px",
          backgroundColor: "#fff",
          borderRadius: "15px",
          boxShadow: "0 10px 25px rgba(0,0,0,0.1)",
          padding: "30px",
          boxSizing: "border-box",
          fontFamily: "Arial, sans-serif",
        }}
      >
        <h2 style={{ textAlign: "center", marginBottom: "20px", color: "#333" }}>Settings</h2>

        {/* Quiz Settings */}
        <div style={{ marginBottom: "25px" }}>
          <h3 style={{ color: "#555" }}>Quiz Settings</h3>
          <label>Number of Questions:</label>
          <select
            value={numQuestions}
            onChange={(e) => setNumQuestions(Number(e.target.value))}
            style={{
              width: "100%",
              padding: "8px",
              margin: "5px 0 15px 0",
              borderRadius: "5px",
              border: "1px solid #ccc",
            }}
          >
            {[5, 10, 15, 20, 25].filter(n => n <= maxQuestions).map(num => (
              <option key={num} value={num}>{num}</option>
            ))}
          </select>

          <label>Time per Question (seconds):</label>
          <select
            value={timePerQuestion}
            onChange={(e) => setTimePerQuestion(Number(e.target.value))}
            style={{
              width: "100%",
              padding: "8px",
              margin: "5px 0 15px 0",
              borderRadius: "5px",
              border: "1px solid #ccc",
            }}
          >
            {[5, 10, 15, 20].map(sec => (
              <option key={sec} value={sec}>{sec}s</option>
            ))}
          </select>
        </div>

        {/* Profile Settings */}
        <div style={{ marginBottom: "25px" }}>
          <h3 style={{ color: "#555" }}>Edit Profile</h3>
          <label>Username:</label>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            style={{
              width: "100%",
              padding: "8px",
              margin: "5px 0 10px 0",
              borderRadius: "5px",
              border: "1px solid #ccc",
            }}
          />
          <label>Name:</label>
          <input
            type="text"
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
            style={{
              width: "100%",
              padding: "8px",
              margin: "5px 0 10px 0",
              borderRadius: "5px",
              border: "1px solid #ccc",
            }}
          />
          <label>Email:</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            style={{
              width: "100%",
              padding: "8px",
              margin: "5px 0 10px 0",
              borderRadius: "5px",
              border: "1px solid #ccc",
            }}
          />
          <label>Phone:</label>
          <input
            type="tel"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            style={{
              width: "100%",
              padding: "8px",
              margin: "5px 0 10px 0",
              borderRadius: "5px",
              border: "1px solid #ccc",
            }}
          />
        </div>

        {/* About Developer */}
        <div style={{ marginBottom: "25px", fontSize: "0.9em", color: "#666" }}>
          <h3>About the Developer</h3>
          <p>
            Developed by 2300032246. This is our MERN stack project. <br />
            Contact: 2300032246@kluniversity.in
          </p>
        </div>

        <button
          onClick={handleSave}
          style={{
            width: "100%",
            padding: "10px",
            backgroundColor: "#2575fc",
            color: "#fff",
            border: "none",
            borderRadius: "7px",
            cursor: "pointer",
            fontWeight: "bold",
            fontSize: "1em",
            transition: "background-color 0.3s",
          }}
          onMouseOver={(e) => e.currentTarget.style.backgroundColor = "#005ce6"}
          onMouseOut={(e) => e.currentTarget.style.backgroundColor = "#2575fc"}
        >
          Save
        </button>
      </div>
    </div>
  );
}
