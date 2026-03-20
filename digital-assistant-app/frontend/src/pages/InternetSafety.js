import React, { useState } from "react";
import { getUser } from "../utils/auth";

function InternetSafety() {

  const [result, setResult] = useState("");
  const user = getUser();

  const check = async (ans) => {

    if (ans === "fake") {
      setResult("✅ Correct! This is a fake website.");
    } else {
      setResult("⚠ This is unsafe!");
      await fetch("http://localhost:5000/progress", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          user_id: user.id,
          lesson_id: 3,
          mistake_type: "scam"
        })
      });
    }
  };

  return (
    <div className="container">

      <h2>Internet Safety Training</h2>

      <div className="card">

        <p><b>Website:</b> www.paytm-secure-login.xyz</p>

        <h3>Is this website safe?</h3>

        <button className="btn" onClick={() => check("safe")}>Safe</button>
        <button className="btn" onClick={() => check("fake")}>Fake</button>

      </div>

      {result && <div className="card"><p>{result}</p></div>}

    </div>
  );
}

export default InternetSafety;