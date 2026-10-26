require('dotenv').config();
const express = require("express");
const cors = require("cors");
const connectDB = require("./db");

const User = require("./models/User");
const UserProgress = require("./models/UserProgress");

const app = express();

app.use(cors());
app.use(express.json());

/* CONNECT TO DATABASE */
connectDB();

app.get("/", (req, res) => {
  res.send("Backend server running");
});

/* ──────────────── REGISTER ──────────────── */
app.post("/register", async (req, res) => {
  const { name, email, password } = req.body;

  try {
    const exists = await User.findOne({ email });
    if (exists) {
      return res.json({ message: "Email already registered" });
    }

    const user = await User.create({ name, email, password });
    res.json({ message: "Registered successfully!", user });
  } catch (err) {
    console.error(err);
    res.json({ message: "Registration failed" });
  }
});

/* ──────────────── LOGIN ──────────────── */
app.post("/login", async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email, password });

    if (user) {
      return res.json({
        success: true,
        user: {
          id: user._id,
          name: user.name,
          email: user.email
        }
      });
    } else {
      return res.json({ success: false });
    }
  } catch (err) {
    console.error(err);
    return res.json({ success: false });
  }
});

/* ──────────────── SAVE PROGRESS ──────────────── */
app.post("/progress", async (req, res) => {
  const { user_id, lesson_id, score = 0, mistake_type } = req.body;

  let scamInc = 0;
  let upiInc = 0;

  if (mistake_type === "scam") scamInc = 1;
  if (mistake_type === "upi") upiInc = 1;

  try {
    const existing = await UserProgress.findOne({ user_id, lesson_id });

    if (existing) {
      existing.completed = 1;
      existing.score = score;
      existing.mistakes_scam += scamInc;
      existing.mistakes_upi += upiInc;
      await existing.save();
    } else {
      await UserProgress.create({
        user_id,
        lesson_id,
        completed: 1,
        score,
        mistakes_scam: scamInc,
        mistakes_upi: upiInc
      });
    }

    res.json({ success: true });
  } catch (err) {
    console.error(err);
    res.json({ success: false });
  }
});

/* ──────────────── GET PROGRESS ──────────────── */
app.get("/progress/:userId", async (req, res) => {
  const { userId } = req.params;

  try {
    const rows = await UserProgress.find({ user_id: userId });
    res.json(rows);
  } catch (err) {
    console.error(err);
    res.json([]);
  }
});

/* ──────────────── SCAM URL CHECK ──────────────── */
app.post("/check-url", async (req, res) => {
  const { url } = req.body;

  if (!url) {
    return res.json({ safe: null });
  }

  try {
    const apiKey = "AIzaSyB3yAqzN-Q1_mMdHN7i-Qh9Zg2UHzOEapw";

    const response = await fetch(
      `https://safebrowsing.googleapis.com/v4/threatMatches:find?key=${apiKey}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          client: {
            clientId: "digital-literacy-app",
            clientVersion: "1.0"
          },
          threatInfo: {
            threatTypes: ["MALWARE", "SOCIAL_ENGINEERING"],
            platformTypes: ["ANY_PLATFORM"],
            threatEntryTypes: ["URL"],
            threatEntries: [{ url }]
          }
        })
      }
    );

    const data = await response.json();

    /* GOOGLE DETECTION */
    if (data.matches) {
      return res.json({
        safe: false,
        reason: "Detected as malicious (Google)"
      });
    }

    /* FALLBACK SMART RULES */
    const lower = url.toLowerCase();

    if (
      lower.includes(".xyz") ||
      lower.includes(".ru") ||
      lower.includes("free") ||
      lower.includes("win") ||
      lower.includes("verify") ||
      lower.includes("login") ||
      lower.includes("bank")
    ) {
      return res.json({
        safe: false,
        reason: "Suspicious pattern detected"
      });
    }

    return res.json({
      safe: true,
      reason: "No threats detected"
    });
  } catch (err) {
    console.error("ERROR:", err);

    return res.json({
      safe: false,
      reason: "Backend error"
    });
  }
});

/* ──────────────── SAVE CERTIFICATE ──────────────── */
app.post("/save-certificate", async (req, res) => {
  const { user_id, certificate_id, date } = req.body;

  try {
    const progress = await UserProgress.findOne({
      user_id,
      completed: 1
    });

    if (progress) {
      progress.certificate_id = certificate_id;
      progress.completed_at = date;
      await progress.save();
    }

    res.json({ success: true });
  } catch (err) {
    console.error(err);
    res.json({ success: false });
  }
});

/* ──────────────── VERIFY CERTIFICATE ──────────────── */
app.get("/verify/:id", async (req, res) => {
  const { id } = req.params;

  try {
    const progress = await UserProgress.findOne({ certificate_id: id });

    if (!progress) {
      return res.json({ valid: false });
    }

    const user = await User.findById(progress.user_id);

    if (!user) {
      return res.json({ valid: false });
    }

    res.json({
      valid: true,
      name: user.name,
      date: progress.completed_at
    });
  } catch (err) {
    console.error(err);
    res.json({ valid: false });
  }
});

/* ──────────────── START SERVER ──────────────── */
const PORT = process.env.PORT || 5005;
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});