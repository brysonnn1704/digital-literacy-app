import React, { useEffect, useState } from "react";
import { getUser } from "../utils/auth";

function Certificate({ language }) {
  const user = getUser();
  const [certId, setCertId] = useState("");
  const [date, setDate] = useState("");

  useEffect(() => {
    const today = new Date().toLocaleDateString();
    setDate(today);
    const id = "CERT-" + Math.floor(Math.random() * 1000000);
    setCertId(id);
    fetch(`${process.env.REACT_APP_API_URL || "http://localhost:5005"}/save-certificate`, {
      method:"POST", headers:{"Content-Type":"application/json"},
      body:JSON.stringify({user_id:user.id,certificate_id:id,date:today})
    });
  }, [user]);

  return (
    <div className="certificate">
      <div style={{fontSize:"80px",marginBottom:"16px",animation:"iconPulse 2s ease-in-out infinite"}}>🎓</div>
      <h1>Certificate of Completion</h1>
      <p style={{fontSize:"1.2rem",marginTop:"16px",color:"var(--text-secondary)"}}>This certifies that</p>
      <h2 style={{fontSize:"2.5rem",background:"linear-gradient(135deg,var(--primary),var(--accent))",WebkitBackgroundClip:"text",WebkitTextFillColor:"transparent",backgroundClip:"text",margin:"16px 0"}}>{user?.name}</h2>
      <p style={{fontSize:"1.1rem",color:"var(--text-secondary)"}}>has successfully completed the Digital Literacy Program</p>
      <div style={{display:"flex",justifyContent:"center",gap:"40px",marginTop:"32px",marginBottom:"32px"}}>
        <div><p style={{fontSize:"0.9rem",color:"var(--muted)"}}>Date</p><p style={{fontWeight:"700",fontSize:"1.1rem"}}>{date}</p></div>
        <div><p style={{fontSize:"0.9rem",color:"var(--muted)"}}>Certificate ID</p><p style={{fontWeight:"700",fontFamily:"monospace",fontSize:"1.1rem"}}>{certId}</p></div>
      </div>
      <button className="btn" style={{maxWidth:"300px",margin:"0 auto",padding:"16px",fontSize:"1.2rem"}} onClick={()=>window.print()}>🖨️ Download PDF</button>
    </div>
  );
}

export default Certificate;