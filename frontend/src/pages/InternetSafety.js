import React, { useState } from "react";
import { getUser } from "../utils/auth";
import { t } from "../utils/translate";

function InternetSafety({ language }) {
  const [result, setResult] = useState("");
  const [resultType, setResultType] = useState("");
  const user = getUser();

  const check = async (ans) => {
    if (ans === "fake") {
      setResult(t(language, "safe") + " Correct! This is a fake website."); setResultType("success");
    } else {
      setResult("⚠ This is unsafe! Look for .xyz domains and suspicious names."); setResultType("danger");
      if (user?.id) {
        await fetch(`${process.env.REACT_APP_API_URL || (typeof window !== "undefined" && window.location && window.location.hostname !== "localhost" ? "/api" : "http://localhost:5005")}/progress`, {
          method:"POST", headers:{"Content-Type":"application/json"},
          body:JSON.stringify({user_id:user.id,lesson_id:3,mistake_type:"scam"})
        });
      }
    }
  };

  return (
    <div className="container">
      <div style={{display:"flex",alignItems:"center",gap:"14px",marginBottom:"24px"}}>
        <div style={{width:"50px",height:"50px",borderRadius:"14px",background:"rgba(16,185,129,0.1)",display:"flex",alignItems:"center",justifyContent:"center",fontSize:"26px"}}>🌐</div>
        <div><h2 style={{marginBottom:"0"}}>{t(language, "internetTitle")}</h2><p style={{color:"var(--muted)",fontSize:"0.85rem"}}>{t(language, "internetSubtitle")}</p></div>
      </div>

      <div className="card">
        <p style={{fontSize:"0.85rem",color:"var(--muted)",marginBottom:"8px",textTransform:"uppercase",letterSpacing:"1px"}}>{t(language, "analyzeWeb")}</p>
        <div style={{background:"var(--surface-glass)",borderRadius:"12px",padding:"20px",border:"1px solid var(--border)",marginBottom:"20px",fontFamily:"monospace",fontSize:"1.2rem",color:"var(--danger,#ef4444)",textAlign:"center"}}>
          www.paytm-secure-login.xyz
        </div>
        <h3 style={{marginBottom:"16px",fontSize:"1.2rem",textAlign:"center"}}>{t(language, "isSafe")}</h3>
        <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:"12px"}}>
          <button className="btn" style={{background:"linear-gradient(135deg,var(--accent),#059669)",padding:"20px",fontSize:"1.1rem"}} onClick={()=>check("safe")}>{t(language, "safe")}</button>
          <button className="btn" style={{background:"linear-gradient(135deg,#ef4444,#dc2626)",padding:"20px",fontSize:"1.1rem"}} onClick={()=>check("fake")}>{t(language, "fake")}</button>
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

export default InternetSafety;