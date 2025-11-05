const express = require("express");
const cors = require("cors");
const app = express();

app.use(cors());
app.use(express.json());

app.post("/api/auth/login", (req, res) => {
  const { email, password } = req.body;
  if (email === "2300030379@kluniversity.in" && password === "2300030379@kluniversity.in") {
    return res.json({
      token: "dummy-jwt-token",
      user: { name: "Test User", email },
    });
  } else {
    return res.status(401).json({ message: "Invalid credentials" });
  }
});

app.listen(5000, () => console.log("✅ Server running on port 5000"));
