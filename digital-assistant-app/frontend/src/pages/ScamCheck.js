import React, { useState, useEffect } from "react";
import { getUser } from "../utils/auth";

function ScamCheck() {

  const [step, setStep] = useState(1);
  const [result, setResult] = useState("");
  const [scenario, setScenario] = useState({});
  const user = getUser();

  /* 🔥 REAL-LIFE SCENARIO POOL */
  const scenarios = [
    {
      type: "upi",
      data: {
        upi: "cashback@fake",
        amount: "₹5000",
        message: "Claim reward"
      },
      correct: "no"
    },
    {
      type: "sms",
      data: "Your bank account will be blocked. Click link now!",
      correct: "no"
    },
    {
      type: "call",
      data: "I am from your bank. Tell me OTP to verify account.",
      correct: "no"
    },
    {
      type: "quiz",
      data: "Win ₹10,000! Click link & pay ₹10 to claim.",
      correct: "scam"
    },
    {
      type: "sms",
      data: "Courier failed. Pay ₹10 to reschedule delivery.",
      correct: "no"
    },
    {
      type: "call",
      data: "I am from electricity board. Pay now or power will be cut.",
      correct: "no"
    }
  ];

  /* 🔀 RANDOM PICK */
  const getRandomScenario = () => {
    return scenarios[Math.floor(Math.random() * scenarios.length)];
  };

  useEffect(() => {
    setScenario(getRandomScenario());
  }, [step]);

  const sendMistake = async () => {
    if (user?.id) {
      await fetch("http://localhost:5000/progress", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          user_id: user.id,
          lesson_id: 2,
          score: 0,
          mistake_type: "scam"
        })
      });
    }
  };

  const handleAnswer = (ans) => {

    if (ans === scenario.correct) {
      setResult("✅ Correct!");
    } else {
      setResult("⚠ This is unsafe!");
      sendMistake();
    }
  };

  return (
    <div className="container">

      <h2>Live Scam Training</h2>

      {/* STEP NAV */}
      <div style={{ display: "flex", gap: "10px", marginBottom: "15px", flexWrap: "wrap" }}>
        <button className="btn" onClick={() => setStep(step + 1)}>Next Scenario</button>
      </div>

      {/* DYNAMIC CONTENT */}
      <div className="card">

        {scenario.type === "upi" && (
          <>
            <p><b>UPI ID:</b> {scenario.data.upi}</p>
            <p><b>Amount:</b> {scenario.data.amount}</p>
            <p><b>Message:</b> {scenario.data.message}</p>
            <h3>Is this safe?</h3>
            <button className="btn" onClick={() => handleAnswer("yes")}>Yes</button>
            <button className="btn" onClick={() => handleAnswer("no")}>No</button>
          </>
        )}

        {scenario.type === "sms" && (
          <>
            <p><b>SMS:</b></p>
            <p>{scenario.data}</p>
            <h3>Is this safe?</h3>
            <button className="btn" onClick={() => handleAnswer("yes")}>Yes</button>
            <button className="btn" onClick={() => handleAnswer("no")}>No</button>
          </>
        )}

        {scenario.type === "call" && (
          <>
            <p><b>Call:</b></p>
            <p>{scenario.data}</p>
            <h3>Should you trust this?</h3>
            <button className="btn" onClick={() => handleAnswer("yes")}>Yes</button>
            <button className="btn" onClick={() => handleAnswer("no")}>No</button>
          </>
        )}

        {scenario.type === "quiz" && (
          <>
            <p><b>Scenario:</b></p>
            <p>{scenario.data}</p>
            <h3>What is this?</h3>
            <button className="btn" onClick={() => handleAnswer("safe")}>Safe</button>
            <button className="btn" onClick={() => handleAnswer("scam")}>Scam</button>
          </>
        )}

      </div>

      {result && (
        <div className="card">
          <p>{result}</p>
        </div>
      )}

    </div>
  );
}

export default ScamCheck;