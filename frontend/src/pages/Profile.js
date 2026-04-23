import React from "react";
import { getUser } from "../utils/auth";
import { t } from "../utils/translate";

function Profile({ language }) {
  const user = getUser();

  return(
    <div className="container">
      <div style={{display:"flex",alignItems:"center",gap:"14px",marginBottom:"24px"}}>
        <div style={{width:"50px",height:"50px",borderRadius:"14px",background:"linear-gradient(135deg,var(--primary),var(--accent))",display:"flex",alignItems:"center",justifyContent:"center",fontSize:"22px",color:"white",fontWeight:"800"}}>{user?.name?.charAt(0)?.toUpperCase() || "U"}</div>
        <div><h2 style={{marginBottom:"0"}}>{t(language, "profile")}</h2><p style={{color:"var(--muted)",fontSize:"0.85rem"}}>Your account details</p></div>
      </div>

      <div className="card">
        <div style={{display:"flex",alignItems:"center",gap:"16px",marginBottom:"20px"}}>
          <div style={{width:"72px",height:"72px",borderRadius:"20px",background:"linear-gradient(135deg,var(--primary),var(--accent))",display:"flex",alignItems:"center",justifyContent:"center",fontSize:"32px",color:"white",fontWeight:"800"}}>{user?.name?.charAt(0)?.toUpperCase() || "U"}</div>
          <div>
            <h3 style={{fontSize:"1.4rem"}}>{user?.name || "User"}</h3>
            <p style={{color:"var(--muted)",fontSize:"1rem"}}>{user?.email}</p>
            <span className="badge" style={{marginTop:"8px",display:"inline-block",fontSize:"0.9rem",padding:"4px 10px"}}>🎓 Learner</span>
          </div>
        </div>
      </div>

      <div className="card">
        <h3 style={{marginBottom:"14px"}}>⚙️ Settings</h3>
        <div style={{display:"flex",flexDirection:"column",gap:"12px"}}>
          <div style={{display:"flex",justifyContent:"space-between",padding:"12px 16px",background:"var(--surface-glass)",borderRadius:"12px",border:"1px solid var(--border)"}}>
            <span style={{fontWeight:"500"}}>🌐 Language</span><span style={{color:"var(--muted)"}}>English (IN)</span>
          </div>
          <div style={{display:"flex",justifyContent:"space-between",padding:"12px 16px",background:"var(--surface-glass)",borderRadius:"12px",border:"1px solid var(--border)"}}>
            <span style={{fontWeight:"500"}}>🔊 Voice Guidance</span><span style={{color:"var(--accent)",fontWeight:"600"}}>Enabled</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Profile;