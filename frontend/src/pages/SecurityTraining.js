import React, { useState } from "react";
import { getUser } from "../utils/auth";
import { t } from "../utils/translate";

function SecurityTraining({ language }) {
  const [password, setPassword] = useState("");
  const [msg, setMsg] = useState("");
  const [msgType, setMsgType] = useState("");
  const [strength, setStrength] = useState(0);
  const user = getUser();

  const checkPassword = async () => {
    let score = 0;
    if (password.length >= 6) score++;
    if (password.length >= 10) score++;
    if (/[A-Z]/.test(password)) score++;
    if (/[0-9]/.test(password)) score++;
    if (/[^A-Za-z0-9]/.test(password)) score++;
    setStrength(score);

    if (score <= 2) {
      setMsg("⚠ Weak password! Add uppercase, numbers, and symbols."); setMsgType("danger");
      if (user?.id) {
        await fetch(`${process.env.REACT_APP_API_URL || "http://localhost:5005"}/progress`, {
          method:"POST", headers:{"Content-Type":"application/json"},
          body:JSON.stringify({user_id:user.id,lesson_id:4,mistake_type:"scam"})
        });
      }
    } else if (score <= 3) {
      setMsg("🟡 Moderate password. Can be stronger!"); setMsgType("warning");
    } else {
      setMsg("✅ Strong password! Great job!"); setMsgType("success");
    }
  };

  const strengthColors = ["#ef4444","#f59e0b","#eab308","#84cc16","#10b981"];
  const strengthLabels = ["Very Weak","Weak","Fair","Good","Strong"];

  return (
    <div className="container">
      <div style={{display:"flex",alignItems:"center",gap:"14px",marginBottom:"24px"}}>
        <div style={{width:"50px",height:"50px",borderRadius:"14px",background:"rgba(99,102,241,0.1)",display:"flex",alignItems:"center",justifyContent:"center",fontSize:"26px"}}>🔐</div>
        <div><h2 style={{marginBottom:"0"}}>{t(language, "secTitle")}</h2><p style={{color:"var(--muted)",fontSize:"0.85rem"}}>{t(language, "secSubtitle")}</p></div>
      </div>

      <div className="card">
        <h3 style={{marginBottom:"16px",fontSize:"1.2rem"}}>{t(language, "createPass")}</h3>
        <input placeholder="Enter a password to test" type="text" value={password} onChange={(e)=>setPassword(e.target.value)} style={{fontSize:"1.1rem",padding:"14px"}} />
        {password && (
          <div style={{marginTop:"16px",marginBottom:"16px"}}>
            <div style={{display:"flex",gap:"4px",marginBottom:"8px"}}>
              {[0,1,2,3,4].map(i=>(
                <div key={i} style={{flex:1,height:"6px",borderRadius:"999px",background:i<strength?strengthColors[strength-1]:"var(--border)",transition:"all 0.3s"}} />
              ))}
            </div>
            <p style={{fontSize:"14px",color:strengthColors[strength-1]||"var(--muted)",fontWeight:"600"}}>{strength>0?strengthLabels[strength-1]:"Type to check"}</p>
          </div>
        )}
        <button className="btn" onClick={checkPassword} style={{padding:"16px",fontSize:"1.1rem",marginTop:password?"0":"16px"}}>{t(language, "checkStrength")}</button>
      </div>

      <div className="card" style={{borderLeft:"4px solid #ef4444"}}>
        <h3 style={{marginBottom:"12px",fontSize:"1.2rem"}}>🚫 OTP Safety</h3>
        <div style={{background:"var(--surface-glass)",borderRadius:"12px",padding:"16px",border:"1px solid var(--border)",marginBottom:"16px",fontStyle:"italic",fontSize:"1.1rem"}}>
          "Share OTP to verify your account"
        </div>
        <p style={{fontWeight:"700",color:"#ef4444",fontSize:"1.1rem"}}>{t(language, "neverShareOtp")}</p>
        <p style={{fontSize:"0.95rem",color:"var(--muted)",marginTop:"8px"}}>Banks and companies will never ask for your OTP.</p>
      </div>

      {msg && (
        <div className="card" style={{borderLeft:`4px solid ${msgType==="success"?"var(--accent)":msgType==="warning"?"#f59e0b":"#ef4444"}`,animation:"fadeSlideUp 0.3s ease-out"}}>
          <p style={{fontWeight:"600",fontSize:"1.1rem",color:msgType==="success"?"var(--accent)":msgType==="warning"?"#f59e0b":"#ef4444"}}>{msg}</p>
        </div>
      )}
    </div>
  );
}

export default SecurityTraining;