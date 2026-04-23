import React, { useEffect, useState } from "react";

function Verify() {
  const [data, setData] = useState(null);
  const params = new URLSearchParams(window.location.search);
  const id = params.get("id");

  useEffect(() => {
    fetch(`${process.env.REACT_APP_API_URL || "http://localhost:5005"}/verify/${id}`)
      .then(res => res.json())
      .then(setData);
  }, [id]);

  if (!data) return (
    <div style={{display:"flex",justifyContent:"center",alignItems:"center",minHeight:"60vh"}}>
      <div className="card" style={{textAlign:"center",padding:"40px"}}>
        <div style={{fontSize:"40px",marginBottom:"12px",animation:"iconPulse 1s ease-in-out infinite"}}>🔍</div>
        <p style={{fontWeight:"600"}}>Verifying certificate...</p>
      </div>
    </div>
  );

  return (
    <div className="container" style={{maxWidth:"600px"}}>
      <h2 style={{textAlign:"center",marginBottom:"24px"}}>Certificate Verification</h2>
      {data.valid ? (
        <div className="card" style={{textAlign:"center",padding:"40px",borderLeft:"4px solid var(--accent)"}}>
          <div style={{fontSize:"56px",marginBottom:"16px"}}>✅</div>
          <h3 style={{fontSize:"1.3rem",marginBottom:"16px",color:"var(--accent)"}}>Valid Certificate</h3>
          <div style={{display:"flex",justifyContent:"center",gap:"40px"}}>
            <div><p style={{fontSize:"0.8rem",color:"var(--muted)"}}>Name</p><p style={{fontWeight:"700"}}>{data.name}</p></div>
            <div><p style={{fontSize:"0.8rem",color:"var(--muted)"}}>Date</p><p style={{fontWeight:"700"}}>{data.date}</p></div>
          </div>
        </div>
      ) : (
        <div className="card" style={{textAlign:"center",padding:"40px",borderLeft:"4px solid #ef4444"}}>
          <div style={{fontSize:"56px",marginBottom:"16px"}}>❌</div>
          <h3 style={{color:"#ef4444"}}>Invalid Certificate</h3>
          <p style={{color:"var(--muted)",marginTop:"8px"}}>This certificate ID was not found in our system.</p>
        </div>
      )}
    </div>
  );
}

export default Verify;