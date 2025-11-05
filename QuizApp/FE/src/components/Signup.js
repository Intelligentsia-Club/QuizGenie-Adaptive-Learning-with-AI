
import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";

const Signup = () => {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
    phone: "",
    terms: false,
  });

  const [otp, setOtp] = useState("");
  const [generatedOtp, setGeneratedOtp] = useState("");
  const [showOtpInput, setShowOtpInput] = useState(false);

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({ ...formData, [name]: type === "checkbox" ? checked : value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const { username, email, password, confirmPassword, phone, terms } = formData;

    if (!username || !email || !password || !confirmPassword || !phone) {
      alert("Please fill out all fields!");
      return;
    }
    if (password !== confirmPassword) {
      alert("Passwords do not match!");
      return;
    }
    if (!terms) {
      alert("You must agree to the terms and conditions!");
      return;
    }

    const otpGenerated = Math.floor(100000 + Math.random() * 900000).toString();
    setGeneratedOtp(otpGenerated);
    setShowOtpInput(true);

    console.log(`OTP for ${email}: ${otpGenerated}`);
    alert("OTP generated! Check the console for the OTP.");
  };

  const handleOtpSubmit = (e) => {
    e.preventDefault();
    if (otp === generatedOtp) {
      localStorage.setItem("user", JSON.stringify({ email: formData.email, username: formData.username }));

      alert(`Signup successful! Redirecting to dashboard...`);
      navigate("/dashboard"); 
    } else {
      alert("Invalid OTP. Please try again.");
    }
  };

  return (
    <div style={styles.container}>
      <h2 style={styles.heading}>Sign Up</h2>

      <form onSubmit={handleSubmit} style={styles.form}>
        <input type="text" name="username" placeholder="Username" value={formData.username} onChange={handleChange} style={styles.input} />
        <input type="email" name="email" placeholder="Email" value={formData.email} onChange={handleChange} style={styles.input} />
        <input type="password" name="password" placeholder="Password" value={formData.password} onChange={handleChange} style={styles.input} />
        <input type="password" name="confirmPassword" placeholder="Confirm Password" value={formData.confirmPassword} onChange={handleChange} style={styles.input} />
        <input type="tel" name="phone" placeholder="Phone" value={formData.phone} onChange={handleChange} style={styles.input} />
        <label style={styles.checkboxLabel}>
          <input type="checkbox" name="terms" checked={formData.terms} onChange={handleChange} style={{ marginRight: "10px" }} />
          I agree to the Terms and Conditions
        </label>
        <button type="submit" style={styles.button}>Sign Up</button>
      </form>

      {showOtpInput && (
        <form onSubmit={handleOtpSubmit} style={{ ...styles.form, marginTop: "20px" }}>
          <p>Enter OTP sent to your email (check console for demo):</p>
          <input type="text" placeholder="OTP" value={otp} onChange={(e) => setOtp(e.target.value)} style={styles.input} />
          <button type="submit" style={styles.button}>Verify OTP</button>
        </form>
      )}

      <p style={styles.text}>
        Already have an account? <Link to="/login" style={styles.link}>Login</Link>
      </p>
    </div>
  );
};

const styles = {
  container: {
    maxWidth: "400px",
    margin: "50px auto",
    padding: "20px",
    backgroundColor: "#fff",
    borderRadius: "8px",
    boxShadow: "0 0 10px rgba(0,0,0,0.1)",
    textAlign: "center",
  },
  heading: { marginBottom: "20px", color: "#333" },
  form: { display: "flex", flexDirection: "column" },
  input: { padding: "10px", marginBottom: "15px", borderRadius: "5px", border: "1px solid #ccc", fontSize: "16px" },
  checkboxLabel: { marginBottom: "15px", fontSize: "14px", color: "#555" },
  button: { padding: "10px", borderRadius: "5px", border: "none", backgroundColor: "#4CAF50", color: "#fff", fontSize: "16px", cursor: "pointer" },
  text: { marginTop: "15px", fontSize: "14px", color: "#555" },
  link: { color: "#4CAF50", textDecoration: "underline" },
};

export default Signup;
