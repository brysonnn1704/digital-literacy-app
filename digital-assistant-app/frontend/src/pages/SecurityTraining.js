import React, { useState } from "react";
import { getUser } from "../utils/auth";

function SecurityTraining() {

  const [password, setPassword] = useState("");
  const [msg, setMsg] = useState("");
  const user = getUser();

  const checkPassword = async () => {

    if (password.length < 6) {
      setMsg("⚠ Weak password!");
      await fetch("http://localhost:5000/progress", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          user_id: user.id,
          lesson_id: 4,
          mistake_type: "scam"
        })
      });
    } else {
      setMsg("✅ Strong password!");
    }
  };

  return (
    <div className="container">

      <h2>Security Training</h2>

      <div className="card">

        <h3>Create Password</h3>

        <input
          placeholder="Enter password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <br /><br />

        <button className="btn" onClick={checkPassword}>
          Check Strength
        </button>

      </div>

      <div className="card">
        <h3>OTP Safety</h3>
        <p>“Share OTP to verify account”</p>

        <button className="btn">Never Share OTP ❌</button>
      </div>

      {msg && <div className="card"><p>{msg}</p></div>}

    </div>
  );
}

export default SecurityTraining;