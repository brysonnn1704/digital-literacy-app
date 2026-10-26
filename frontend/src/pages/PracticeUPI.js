import React, { useState, useEffect } from "react";
import { getUser } from "../utils/auth";
import { t } from "../utils/translate";

function PracticeUPI({ language }) {
  const [upiId, setUpiId] = useState("");
  const [amount, setAmount] = useState("");
  const [scenario, setScenario] = useState("");
  const [result, setResult] = useState("");
  const [resultType, setResultType] = useState("");
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

  const getRandom = () => scenarios[Math.floor(Math.random() * scenarios.length)];
  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => { setScenario(getRandom()); }, []);

  const sendMistake = async () => {
    if (!user?.id) return;
    await fetch(`${process.env.REACT_APP_API_URL || (typeof window !== "undefined" && window.location && window.location.hostname !== "localhost" ? "/api" : "http://localhost:5005")}/progress`, {
      method: "POST", headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ user_id: user.id, lesson_id: 1, mistake_type: "upi" })
    });
  };

  const verify = () => {
    if (!upiId || !amount) {
      setResult("Please enter both UPI ID and amount.");
      setResultType("warning");
      return;
    }

    if (scenario.includes("Receive money") || scenario.includes("Refund request")) {
      setResult("❌ Never enter UPI PIN to receive money or get a refund!");
      setResultType("danger");
      sendMistake();
    } else if (scenario.includes("Unknown QR")) {
      setResult("❌ Do not pay to unknown QR codes!");
      setResultType("danger");
      sendMistake();
    } else {
      setResult("✅ Payment successful and safe.");
      setResultType("success");
    }
  };

  return (
    <div className="container">
      <div style={{display:"flex",alignItems:"center",gap:"14px",marginBottom:"24px"}}>
        <div style={{width:"50px",height:"50px",borderRadius:"14px",background:"var(--primary-glow)",display:"flex",alignItems:"center",justifyContent:"center",fontSize:"26px"}}>💳</div>
        <div><h2 style={{marginBottom:"0"}}>{t(language, "upiTitle")}</h2><p style={{color:"var(--muted)",fontSize:"0.85rem"}}>{t(language, "upiSubtitle")}</p></div>
      </div>

      <div className="card" style={{borderLeft:"4px solid var(--primary)",background:"var(--surface-glass)"}}>
        <p style={{fontSize:"0.85rem",color:"var(--muted)",marginBottom:"4px",textTransform:"uppercase",letterSpacing:"1px"}}>{t(language, "currentScenario")}</p>
        <h3 style={{fontSize:"1.2rem",color:"var(--text)"}}>{scenario}</h3>
        <button className="btn" onClick={() => { setScenario(getRandom()); setResult(""); }} style={{marginTop:"12px",padding:"8px 16px",background:"var(--surface)",color:"var(--text)",border:"1px solid var(--border)"}}>
          {t(language, "nextScenario") || "🔄 Next Scenario"}
        </button>
      </div>

      <div className="card">
        <h3 style={{marginBottom:"16px",fontSize:"1.2rem"}}>{t(language, "enterDetails")}</h3>
        <div style={{marginBottom:"16px"}}>
          <label style={{display:"block",marginBottom:"8px",fontWeight:"600",color:"var(--text-secondary)"}}>{t(language, "upiIdLabel")}</label>
          <input type="text" placeholder="e.g. 9876543210@upi" value={upiId} onChange={(e) => setUpiId(e.target.value)} style={{fontSize:"1.1rem",padding:"14px"}} />
        </div>
        <div style={{marginBottom:"20px"}}>
          <label style={{display:"block",marginBottom:"8px",fontWeight:"600",color:"var(--text-secondary)"}}>{t(language, "amountLabel")}</label>
          <input type="number" placeholder="0.00" value={amount} onChange={(e) => setAmount(e.target.value)} style={{fontSize:"1.1rem",padding:"14px"}} />
        </div>
        <button className="btn" onClick={verify} style={{padding:"16px",fontSize:"1.1rem"}}>{t(language, "confirmPayment")}</button>
      </div>

      {result && (
        <div className="card" style={{borderLeft:`4px solid ${resultType==="success"?"var(--accent)":resultType==="danger"?"#ef4444":"#f59e0b"}`,animation:"fadeSlideUp 0.3s ease-out"}}>
          <p style={{fontWeight:"600",fontSize:"1.1rem",color:resultType==="success"?"var(--accent)":resultType==="danger"?"#ef4444":"#f59e0b"}}>{result}</p>
        </div>
      )}
    </div>
  );
}

export default PracticeUPI;