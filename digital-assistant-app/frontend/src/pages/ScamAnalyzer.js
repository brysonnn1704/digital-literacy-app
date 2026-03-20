import React, { useState } from "react";
import { getUser } from "../utils/auth";

function ScamAnalyzer() {

  const [text, setText] = useState("");
  const [result, setResult] = useState("");
  const [loading, setLoading] = useState(false);

  const user = getUser();

  const analyze = async () => {

    if (!text) {
      setResult("Enter a website URL");
      return;
    }

    setLoading(true);
    setResult("Checking...");

    try {

      const res = await fetch("http://localhost:5000/check-url", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ url: text })
      });

      const data = await res.json();

      if (data.safe === false) {
        setResult("⚠ " + data.reason);

        if (user?.id) {
          await fetch("http://localhost:5000/progress", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              user_id: user.id,
              lesson_id: 2,
              mistake_type: "scam"
            })
          });
        }

      } else {
        setResult("✅ " + data.reason);
      }

    } catch (err) {
      setResult("Error checking website");
    }

    setLoading(false);
  };

  return (
    <div className="container">

      <h2>Scam Analyzer</h2>

      <div className="card">

        <p>Enter a website URL to verify if it is safe.</p>

        <input
          type="text"
          placeholder="https://example.com"
          value={text}
          onChange={(e) => setText(e.target.value)}
          style={{ width: "100%", padding: "10px" }}
        />

        <button className="btn" onClick={analyze} disabled={loading}>
          {loading ? "Checking..." : "Analyze"}
        </button>

      </div>

      {result && (
        <div className="card">
          <h3>{result}</h3>
        </div>
      )}

    </div>
  );
}

export default ScamAnalyzer;