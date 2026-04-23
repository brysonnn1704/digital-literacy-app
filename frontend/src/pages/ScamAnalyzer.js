import React, { useState } from "react";
import { getUser } from "../utils/auth";

function ScamAnalyzer({ language }) {
  const [text, setText] = useState("");
  const [result, setResult] = useState("");
  const [resultType, setResultType] = useState("");
  const [loading, setLoading] = useState(false);
  const user = getUser();

  const analyze = async () => {
    if (!text) { setResult("Enter a website URL"); setResultType("warning"); return; }
    setLoading(true); setResult("Checking..."); setResultType("");
    try {
      const res = await fetch(`${process.env.REACT_APP_API_URL || "http://localhost:5005"}/check-url`, {
        method:"POST", headers:{"Content-Type":"application/json"},
        body:JSON.stringify({url:text})
      });
      const data = await res.json();
      if (data.safe === false) {
        setResult("⚠ " + data.reason); setResultType("danger");
        if (user?.id) {
          await fetch(`${process.env.REACT_APP_API_URL || "http://localhost:5005"}/progress`, {
            method:"POST", headers:{"Content-Type":"application/json"},
            body:JSON.stringify({user_id:user.id,lesson_id:2,mistake_type:"scam"})
          });
        }
      } else { setResult("✅ " + data.reason); setResultType("success"); }
    } catch(err) { setResult("Error checking website"); setResultType("danger"); }
    setLoading(false);
  };

  return (
    <div className="container">
      <div style={{display:"flex",alignItems:"center",gap:"14px",marginBottom:"24px"}}>
        <div style={{width:"50px",height:"50px",borderRadius:"14px",background:"rgba(99,102,241,0.1)",display:"flex",alignItems:"center",justifyContent:"center",fontSize:"26px"}}>🔍</div>
        <div><h2 style={{marginBottom:"0"}}>Scam Analyzer</h2><p style={{color:"var(--muted)",fontSize:"0.85rem"}}>AI-powered website safety checker</p></div>
      </div>

      <div className="card">
        <p style={{marginBottom:"16px",fontSize:"1.1rem"}}>Enter a website URL to verify if it is safe.</p>
        <input type="text" placeholder="https://example.com" value={text} onChange={(e)=>setText(e.target.value)} onKeyDown={(e)=>{if(e.key==="Enter")analyze()}} style={{fontSize:"1.1rem",padding:"14px",marginBottom:"16px"}} />
        <button className="btn" onClick={analyze} disabled={loading} style={{padding:"16px",fontSize:"1.1rem"}}>
          {loading ? "🔄 Analyzing..." : "🔍 Analyze URL"}
        </button>
      </div>

      {result && (
        <div className="card" style={{borderLeft:`4px solid ${resultType==="success"?"var(--accent)":resultType==="danger"?"#ef4444":"#f59e0b"}`,animation:"fadeSlideUp 0.3s ease-out"}}>
          <h3 style={{color:resultType==="success"?"var(--accent)":resultType==="danger"?"#ef4444":"#f59e0b"}}>{result}</h3>
        </div>
      )}
    </div>
  );
}

export default ScamAnalyzer;