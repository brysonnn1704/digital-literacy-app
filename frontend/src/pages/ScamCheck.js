import React, { useState, useEffect } from "react";
import { getUser } from "../utils/auth";
import { t } from "../utils/translate";

function ScamCheck({ language }) {
  const [scenario, setScenario] = useState(null);
  const [result, setResult] = useState("");
  const [resultType, setResultType] = useState("");
  const [step, setStep] = useState(1);
  const user = getUser();

  const scenarios = [
    { text: "Congratulations! You won ₹10,00,000. Click here to claim.", isScam: true, type: "SMS" },
    { text: "Your bank account will be blocked today. Please update KYC via this link.", isScam: true, type: "Email" },
    { text: "Hi, this is your bank. We noticed unusual activity. Tell us your OTP to secure it.", isScam: true, type: "Call" },
    { text: "Your electricity bill for ₹500 is due. View bill on official app.", isScam: false, type: "App" }
  ];

  const getRandomScenario = () => scenarios[Math.floor(Math.random() * scenarios.length)];
  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => { setScenario(getRandomScenario()); }, [step]);

  const sendMistake = async () => {
    if (!user?.id) return;
    await fetch(`${process.env.REACT_APP_API_URL || (typeof window !== "undefined" && window.location && window.location.hostname !== "localhost" ? "/api" : "http://localhost:5005")}/progress`, {
      method: "POST", headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ user_id: user.id, lesson_id: 2, mistake_type: "scam" })
    });
  };

  const check = (isScamAnswer) => {
    if (isScamAnswer === scenario.isScam) {
      setResult("✅ Correct! You identified it perfectly.");
      setResultType("success");
    } else {
      setResult("❌ Incorrect! This was a " + (scenario.isScam ? "SCAM!" : "Safe message."));
      setResultType("danger");
      if (scenario.isScam) sendMistake();
    }
    setTimeout(() => {
      setResult("");
      setStep(s => s + 1);
    }, 3000);
  };

  if (!scenario) return null;

  return (
    <div className="container">
      <div style={{display:"flex",alignItems:"center",gap:"14px",marginBottom:"24px"}}>
        <div style={{width:"50px",height:"50px",borderRadius:"14px",background:"rgba(239, 68, 68, 0.1)",display:"flex",alignItems:"center",justifyContent:"center",fontSize:"26px"}}>🛡️</div>
        <div><h2 style={{marginBottom:"0"}}>{t(language, "scamTitle")}</h2><p style={{color:"var(--muted)",fontSize:"0.85rem"}}>{t(language, "scamSubtitle")}</p></div>
      </div>

      <div className="card">
        <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:"16px"}}>
          <span style={{fontSize:"0.85rem",color:"var(--muted)",textTransform:"uppercase",letterSpacing:"1px"}}>{t(language, "whatIsThis")}</span>
          <span className="badge" style={{background:scenario.type==="Call"?"#8b5cf6":scenario.type==="SMS"?"#3b82f6":"#f59e0b",color:"white"}}>{scenario.type}</span>
        </div>
        
        <div style={{background:"var(--surface-glass)",borderRadius:"12px",padding:"20px",border:"1px solid var(--border)",marginBottom:"24px"}}>
          <p style={{fontSize:"1.2rem",fontStyle:"italic",color:"var(--text)",margin:0}}>"{scenario.text}"</p>
        </div>

        <h3 style={{marginBottom:"16px",fontSize:"1.2rem",textAlign:"center"}}>{t(language, "isSafe")}</h3>
        <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:"12px"}}>
          <button className="btn" style={{background:"linear-gradient(135deg,var(--accent),#059669)",padding:"20px",fontSize:"1.1rem"}} onClick={() => check(false)}>{t(language, "yesSafe")}</button>
          <button className="btn" style={{background:"linear-gradient(135deg,#ef4444,#dc2626)",padding:"20px",fontSize:"1.1rem"}} onClick={() => check(true)}>{t(language, "noUnsafe")}</button>
        </div>
      </div>

      {result && (
        <div className="card" style={{borderLeft:`4px solid ${resultType==="success"?"var(--accent)":"#ef4444"}`,animation:"fadeSlideUp 0.3s ease-out"}}>
          <p style={{fontWeight:"600",fontSize:"1.1rem",color:resultType==="success"?"var(--accent)":"#ef4444"}}>{result}</p>
        </div>
      )}
    </div>
  );
}

export default ScamCheck;