const db = require("./db");
const express = require("express");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Backend server running");
});

/* LOGIN */
app.post("/login", (req, res) => {
  const { email, password } = req.body;

  db.query(
    "SELECT * FROM users WHERE email = ? AND password = ?",
    [email, password],
    (err, result) => {
      if (err) return res.json({ success: false });

      if (result.length > 0) {
        return res.json({ success: true, user: result[0] });
      } else {
        return res.json({ success: false });
      }
    }
  );
});

/* PROGRESS */
app.post("/progress", (req, res) => {
  const { user_id, lesson_id, score = 0, mistake_type } = req.body;

  let scamInc = 0;
  let upiInc = 0;

  if (mistake_type === "scam") scamInc = 1;
  if (mistake_type === "upi") upiInc = 1;

  const sql = `
    INSERT INTO user_progress 
    (user_id, lesson_id, completed, score, mistakes_scam, mistakes_upi)
    VALUES (?, ?, 1, ?, ?, ?)
    ON DUPLICATE KEY UPDATE
      completed = 1,
      score = VALUES(score),
      mistakes_scam = mistakes_scam + ?,
      mistakes_upi = mistakes_upi + ?
  `;

  db.query(
    sql,
    [user_id, lesson_id, score, scamInc, upiInc, scamInc, upiInc],
    (err) => {
      if (err) return res.json({ success: false });
      res.json({ success: true });
    }
  );
});

/* GET PROGRESS */
app.get("/progress/:userId", (req, res) => {
  const { userId } = req.params;

  db.query(
    "SELECT * FROM user_progress WHERE user_id = ?",
    [userId],
    (err, rows) => {
      if (err) return res.json([]);
      res.json(rows);
    }
  );
});

/* 🔥 WORKING SCAM CHECK */
app.post("/check-url", async (req, res) => {

  const { url } = req.body;

  if (!url) return res.json({ safe: null });

  try {

    const apiKey = "AIzaSyBM4niSaXp_ML6nkU2CXKKaOsFPjUTTPnE";

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

    console.log("STATUS:", response.status);

    const data = await response.json();
    console.log("DATA:", data);

    if (data.matches) {
      return res.json({
        safe: false,
        reason: "Detected as malicious (Google)"
      });
    }

    /* FALLBACK */
    const lower = url.toLowerCase();

    if (
      lower.includes(".xyz") ||
      lower.includes("free") ||
      lower.includes("win") ||
      lower.includes("verify")
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

/* CERTIFICATE */
app.post("/save-certificate", (req, res) => {
  const { user_id, certificate_id, date } = req.body;

  const sql = `
    UPDATE user_progress
    SET certificate_id = ?, completed_at = ?
    WHERE user_id = ? AND completed = 1
    LIMIT 1
  `;

  db.query(sql, [certificate_id, date, user_id], (err) => {
    if (err) return res.json({ success: false });
    res.json({ success: true });
  });
});

/* VERIFY */
app.get("/verify/:id", (req, res) => {
  const { id } = req.params;

  const sql = `
    SELECT u.name, p.completed_at
    FROM user_progress p
    JOIN users u ON u.id = p.user_id
    WHERE p.certificate_id = ?
    LIMIT 1
  `;

  db.query(sql, [id], (err, result) => {
    if (err || result.length === 0) {
      return res.json({ valid: false });
    }

    res.json({
      valid: true,
      name: result[0].name,
      date: result[0].completed_at
    });
  });
});

app.listen(5000, () => {
  console.log("Server running on port 5000");
});