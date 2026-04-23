import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { getUser, logoutUser } from "../utils/auth";
import { t } from "../utils/translate";

function Dashboard({ language }) {
  const [stats, setStats] = useState({ progress: 0, scamMistakes: 0, upiMistakes: 0, completedLessons: [] });
  const navigate = useNavigate();
  const user = getUser();

  useEffect(() => {
    if (!user) {
      navigate("/login");
      return;
    }
    fetch(`${process.env.REACT_APP_API_URL || "http://localhost:5005"}/progress/${user.id}`)
      .then(res => res.json())
      .then(rows => {
        const completed = rows.filter(r => r.completed === 1);
        const scamMistakes = rows.reduce((sum, r) => sum + (r.mistakes_scam || 0), 0);
        const upiMistakes = rows.reduce((sum, r) => sum + (r.mistakes_upi || 0), 0);
        const completedLessons = completed.map(r => r.lesson_id);
        setStats({ progress: completed.length, scamMistakes, upiMistakes, completedLessons });
      })
      .catch(() => setStats({ progress: 0, scamMistakes: 0, upiMistakes: 0, completedLessons: [] }));
  }, [user, navigate]);

  const handleLogout = () => {
    logoutUser();
    navigate("/");
  };

  if (!user) return null;

  return (
    <div className="container">
      <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:"32px"}}>
        <div style={{display:"flex",alignItems:"center",gap:"16px"}}>
          <div style={{width:"60px",height:"60px",borderRadius:"20px",background:"linear-gradient(135deg,var(--primary),var(--accent))",color:"white",display:"flex",alignItems:"center",justifyContent:"center",fontSize:"24px",fontWeight:"800"}}>
            {user.name?.charAt(0).toUpperCase()}
          </div>
          <div>
            <p style={{color:"var(--muted)",fontSize:"0.9rem",marginBottom:"4px"}}>{t(language, "welcome")},</p>
            <h2 style={{margin:0,fontSize:"1.6rem"}}>{user.name}</h2>
          </div>
        </div>
        <button className="btn" onClick={handleLogout} style={{background:"var(--surface)",color:"var(--text)",border:"1px solid var(--border)",width:"auto",padding:"10px 20px"}}>{t(language, "logout")}</button>
      </div>

      <div className="card" style={{padding:"24px",marginBottom:"24px",background:"linear-gradient(135deg, rgba(99,102,241,0.05), rgba(16,185,129,0.05))"}}>
        <h3 style={{marginBottom:"20px",fontSize:"1.2rem"}}>{t(language, "learningProgress")}</h3>
        
        <div style={{display:"flex",justifyContent:"space-between",marginBottom:"8px"}}>
          <span style={{fontWeight:"600"}}>{t(language, "overallProgress")}</span>
          <span style={{color:"var(--primary)",fontWeight:"700"}}>{Math.round((stats.progress/8)*100)}%</span>
        </div>
        
        <div style={{height:"12px",background:"var(--border)",borderRadius:"999px",overflow:"hidden",marginBottom:"24px"}}>
          <div className="shimmer" style={{height:"100%",width:`${(stats.progress/8)*100}%`,background:"linear-gradient(90deg, var(--primary), var(--accent))",borderRadius:"999px",transition:"width 1s cubic-bezier(0.4, 0, 0.2, 1)"}} />
        </div>

        <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:"16px"}}>
          <div style={{background:"var(--surface)",padding:"16px",borderRadius:"16px",border:"1px solid var(--border)"}}>
            <div style={{fontSize:"24px",marginBottom:"8px"}}>🎯</div>
            <h4 style={{fontSize:"1.8rem",margin:"0 0 4px 0",color:"var(--text)"}}>{stats.progress}/8</h4>
            <p style={{color:"var(--muted)",fontSize:"0.85rem",margin:0}}>{t(language, "lessonsCompleted")}</p>
          </div>
          <div style={{background:"var(--surface)",padding:"16px",borderRadius:"16px",border:"1px solid var(--border)"}}>
            <div style={{fontSize:"24px",marginBottom:"8px"}}>🛡️</div>
            <h4 style={{fontSize:"1.8rem",margin:"0 0 4px 0",color:"#ef4444"}}>{stats.scamMistakes + stats.upiMistakes}</h4>
            <p style={{color:"var(--muted)",fontSize:"0.85rem",margin:0}}>Total Mistakes</p>
          </div>
        </div>
      </div>

      <div className="card" style={{padding:"24px"}}>
        <h3 style={{marginBottom:"16px",fontSize:"1.2rem"}}>💡 {t(language, "recommendedNext")}</h3>
        {stats.progress < 8 ? (
          <Link to="/lessons" style={{textDecoration:"none"}}>
            <div style={{background:"var(--surface-glass)",border:"1px solid var(--primary)",borderRadius:"16px",padding:"20px",display:"flex",justifyContent:"space-between",alignItems:"center"}}>
              <div>
                <h4 style={{color:"var(--text)",fontSize:"1.1rem",marginBottom:"4px"}}>Continue Learning</h4>
                <p style={{color:"var(--muted)",fontSize:"0.9rem",margin:0}}>You have {8 - stats.progress} lessons left</p>
              </div>
              <div style={{color:"var(--primary)",fontSize:"1.5rem"}}>→</div>
            </div>
          </Link>
        ) : (
          <Link to="/certificate" style={{textDecoration:"none"}}>
            <div style={{background:"linear-gradient(135deg, var(--primary), var(--accent))",borderRadius:"16px",padding:"20px",display:"flex",justifyContent:"space-between",alignItems:"center",color:"white"}}>
              <div>
                <h4 style={{fontSize:"1.2rem",marginBottom:"4px",color:"white"}}>{t(language, "getCertificate")}</h4>
                <p style={{opacity:0.9,fontSize:"0.9rem",margin:0}}>You completed all lessons!</p>
              </div>
              <div style={{fontSize:"2rem"}}>🏆</div>
            </div>
          </Link>
        )}
      </div>

      {/* ═══════ PER-LESSON PROGRESS ═══════ */}
      <div className="card" style={{padding:"24px",marginTop:"24px"}}>
        <h3 style={{marginBottom:"16px",fontSize:"1.2rem"}}>📋 Lesson Progress</h3>
        <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:"12px"}}>
          {[
            { id: 1, icon: "💳", title: "UPI Safety" },
            { id: 2, icon: "🛡️", title: "Scam Detection" },
            { id: 3, icon: "🌐", title: "Web Safety" },
            { id: 4, icon: "💬", title: "WhatsApp Safety" },
            { id: 5, icon: "🔍", title: "Google Search" },
            { id: 6, icon: "⚙️", title: "Phone Settings" },
            { id: 7, icon: "📝", title: "Online Forms" },
            { id: 8, icon: "📧", title: "Email Basics" },
          ].map(lesson => {
            const done = stats.completedLessons.includes(lesson.id);
            return (
              <Link key={lesson.id} to={`/lesson/${lesson.id}`} style={{textDecoration:"none"}}>
                <div style={{
                  display:"flex",alignItems:"center",gap:"12px",
                  padding:"14px 16px",borderRadius:"14px",
                  background: done ? "rgba(16,185,129,0.08)" : "var(--surface)",
                  border: done ? "1.5px solid rgba(16,185,129,0.3)" : "1px solid var(--border)",
                  transition:"all 0.2s",cursor:"pointer",
                }}>
                  <div style={{fontSize:"22px",width:"36px",height:"36px",borderRadius:"10px",display:"flex",alignItems:"center",justifyContent:"center",background: done ? "rgba(16,185,129,0.12)" : "var(--surface-glass)"}}>{lesson.icon}</div>
                  <div style={{flex:1}}>
                    <p style={{margin:0,fontWeight:"600",fontSize:"0.9rem",color:"var(--text)"}}>{lesson.title}</p>
                    <p style={{margin:0,fontSize:"0.75rem",color: done ? "var(--accent)" : "var(--muted)"}}>{done ? "✅ Completed" : "⏳ Pending"}</p>
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default Dashboard;