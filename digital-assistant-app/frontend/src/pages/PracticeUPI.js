import React, { useState, useEffect } from "react";
import { getUser } from "../utils/auth";

function PracticeUPI() {

  const [step, setStep] = useState(1);
  const [upi, setUpi] = useState("");
  const [amount, setAmount] = useState("");
  const [msg, setMsg] = useState("");
  const [scenario, setScenario] = useState("");

  const user = getUser();

  const scenarios = [
    "Pay electricity bill",
    "Send money to friend",
    "Pay shopkeeper via QR",
    "Receive money (no PIN needed)",
    "Unknown QR code scan",
    "Refund request scam",
    "Online shopping payment"
  ];

  const getRandom = () => {
    return scenarios[Math.floor(Math.random() * scenarios.length)];
  };

  useEffect(() => {
    setScenario(getRandom());
  }, []);

  const sendMistake = async () => {
    if (user?.id) {
      await fetch("http://localhost:5000/progress", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          user_id: user.id,
          lesson_id: 1,
          score: 0,
          mistake_type: "upi"
        })
      });
    }
  };

  const handleNext = () => {

    if (!upi || !amount) {
      setMsg("Enter details first");
      return;
    }

    const lower = upi.toLowerCase();

    if (
      lower.includes("fake") ||
      lower.includes("unknown") ||
      lower.includes("reward")
    ) {
      setMsg("⚠ Suspicious payment request!");
      sendMistake();
    } else {
      setMsg("");
      setStep(2);
    }
  };

  const confirmPayment = () => {
    setMsg("✅ Payment Successful (Practice)");
    setStep(1);
    setUpi("");
    setAmount("");
    setScenario(getRandom());
  };

  return (
    <div className="container">

      <h2>Live UPI Practice</h2>

      <div className="card">
        <p><b>Scenario:</b> {scenario}</p>
      </div>

      {step === 1 && (
        <div className="card">

          <h3>Enter Payment Details</h3>

          <input
            placeholder="UPI ID"
            value={upi}
            onChange={(e) => setUpi(e.target.value)}
          />

          <br /><br />

          <input
            placeholder="Amount"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
          />

          <br /><br />

          <button className="btn" onClick={handleNext}>
            Next →
          </button>

        </div>
      )}

      {step === 2 && (
        <div className="card">

          <h3>Confirm Payment</h3>

          <p><b>UPI:</b> {upi}</p>
          <p><b>Amount:</b> ₹{amount}</p>

          <button className="btn" onClick={confirmPayment}>
            Confirm Payment
          </button>

        </div>
      )}

      {msg && (
        <div className="card">
          <p>{msg}</p>
        </div>
      )}

    </div>
  );
}

export default PracticeUPI;