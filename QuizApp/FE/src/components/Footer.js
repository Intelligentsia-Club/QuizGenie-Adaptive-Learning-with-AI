import React from "react";
import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <footer style={styles.footer}>
      <div>
        <Link style={styles.link} to="/about">About</Link> |{" "}
        <Link style={styles.link} to="/privacy-policy">Privacy Policy</Link> |{" "}
        <Link style={styles.link} to="/contact">Contact</Link>
      </div>
      <p>&copy; {new Date().getFullYear()} Quiz App. All rights reserved.</p>
    </footer>
  );
}

const styles = {
  footer: {
    textAlign: "center",
    padding: "20px",
    backgroundColor: "#2575fc",
    color: "#fff",
    marginTop: "40px",
  },
  link: {
    color: "#fff",
    textDecoration: "none",
    fontWeight: "500",
  },
};
