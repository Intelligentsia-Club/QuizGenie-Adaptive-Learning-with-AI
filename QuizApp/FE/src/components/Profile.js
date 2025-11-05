import React, { useState } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ResponsiveContainer,
} from "recharts";

function Profile() {
  const [user, setUser] = useState({
    name: "Player One",
    username: "player123",
    email: "player@example.com",
    phone: "+1234567890",
    points: 1200,
    photo: "https://via.placeholder.com/120",
    activity: [
      { day: "Mon", quizzes: 3 },
      { day: "Tue", quizzes: 1 },
      { day: "Wed", quizzes: 4 },
      { day: "Thu", quizzes: 2 },
      { day: "Fri", quizzes: 5 },
      { day: "Sat", quizzes: 0 },
      { day: "Sun", quizzes: 2 },
    ],
  });

  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [newPhoto, setNewPhoto] = useState(null);

  const handlePasswordChange = () => {
    if (!password || !confirmPassword) return alert("Please fill both fields!");
    if (password !== confirmPassword) return alert("Passwords do not match!");
    alert("Password updated successfully!");
    setPassword("");
    setConfirmPassword("");
  };

  const handlePhotoChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setNewPhoto(URL.createObjectURL(file)); 
    }
  };

  const handleSavePhoto = () => {
    if (newPhoto) {
      setUser({ ...user, photo: newPhoto });
      setNewPhoto(null);
      setShowModal(false);
      alert("Profile photo updated!");
    }
  };

  const handleCancelPhoto = () => {
    setNewPhoto(null);
    setShowModal(false);
  };

  return (
    <div style={styles.container}>
      <h2>User Profile</h2>

      {/* User Info */}
      <div style={styles.profileCard}>
        <div style={styles.infoSection}>
          <h3>Personal Info</h3>
          <p><strong>Name:</strong> {user.name}</p>
          <p><strong>Username:</strong> {user.username}</p>
          <p><strong>Email:</strong> {user.email}</p>
          <p><strong>Phone:</strong> {user.phone}</p>
          <p><strong>Current Points:</strong> {user.points}</p>
        </div>
        <div style={styles.photoSection}>
          <img src={user.photo} alt="User" style={styles.photo} />
          <button style={styles.uploadButton} onClick={() => setShowModal(true)}>
            Change Photo
          </button>
        </div>
      </div>

      {/* Password Change */}
      <div style={styles.card}>
        <h3>Change Password</h3>
        <input
          type="password"
          placeholder="New Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          style={styles.input}
        />
        <input
          type="password"
          placeholder="Confirm Password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          style={styles.input}
        />
        <button style={styles.button} onClick={handlePasswordChange}>
          Update Password
        </button>
      </div>

      {/* Weekly Activity Graph */}
      <div style={styles.card}>
        <h3>Weekly Activity</h3>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart
            data={user.activity}
            margin={{ top: 20, right: 30, left: 0, bottom: 0 }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="day" />
            <YAxis allowDecimals={false} />
            <Tooltip />
            <Line
              type="monotone"
              dataKey="quizzes"
              stroke="#4CAF50"
              strokeWidth={2}
              activeDot={{ r: 6 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>

      {/* Modal Popup */}
      {showModal && (
        <div style={styles.modalOverlay}>
          <div style={styles.modal}>
            <h3>Edit Profile Photo</h3>
            {newPhoto ? (
              <img src={newPhoto} alt="Preview" style={styles.previewPhoto} />
            ) : (
              <img src={user.photo} alt="Current" style={styles.previewPhoto} />
            )}
            <input type="file" accept="image/*" onChange={handlePhotoChange} style={styles.fileInput} />
            <div style={styles.modalButtons}>
              <button onClick={handleSavePhoto} style={styles.saveButton}>
                Save
              </button>
              <button onClick={handleCancelPhoto} style={styles.cancelButton}>
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

const styles = {
  container: { padding: "20px", fontFamily: "Arial, sans-serif" },
  profileCard: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "flex-start",
    backgroundColor: "#f9f9f9",
    padding: "20px",
    marginBottom: "20px",
    borderRadius: "10px",
    boxShadow: "0 2px 5px rgba(0,0,0,0.1)",
  },
  infoSection: { flex: 1 },
  photoSection: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    marginLeft: "30px",
  },
  photo: {
    width: "120px",
    height: "120px",
    borderRadius: "50%",
    objectFit: "cover",
    border: "3px solid #4CAF50",
    marginBottom: "10px",
  },
  uploadButton: {
    backgroundColor: "#4CAF50",
    color: "#fff",
    border: "none",
    borderRadius: "5px",
    padding: "8px 15px",
    cursor: "pointer",
  },
  card: {
    backgroundColor: "#f9f9f9",
    padding: "20px",
    marginBottom: "20px",
    borderRadius: "10px",
    boxShadow: "0 2px 5px rgba(0,0,0,0.1)",
  },
  input: {
    display: "block",
    padding: "10px",
    margin: "10px 0",
    borderRadius: "5px",
    border: "1px solid #ccc",
    width: "100%",
    maxWidth: "300px",
  },
  button: {
    padding: "10px 20px",
    borderRadius: "5px",
    border: "none",
    backgroundColor: "#4CAF50",
    color: "#fff",
    cursor: "pointer",
  },
  modalOverlay: {
    position: "fixed",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    zIndex: 1000,
  },
  modal: {
    backgroundColor: "#fff",
    padding: "30px",
    borderRadius: "10px",
    boxShadow: "0 4px 10px rgba(0,0,0,0.2)",
    textAlign: "center",
    width: "90%",
    maxWidth: "400px",
  },
  previewPhoto: {
    width: "150px",
    height: "150px",
    borderRadius: "50%",
    objectFit: "cover",
    marginBottom: "15px",
    border: "2px solid #4CAF50",
  },
  fileInput: {
    marginBottom: "15px",
  },
  modalButtons: {
    display: "flex",
    justifyContent: "space-around",
  },
  saveButton: {
    backgroundColor: "#4CAF50",
    color: "#fff",
    border: "none",
    padding: "8px 15px",
    borderRadius: "5px",
    cursor: "pointer",
  },
  cancelButton: {
    backgroundColor: "#f44336",
    color: "#fff",
    border: "none",
    padding: "8px 15px",
    borderRadius: "5px",
    cursor: "pointer",
  },
};

export default Profile;
