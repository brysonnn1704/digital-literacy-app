import React from "react";
import { Link } from "react-router-dom";
import { t } from "../utils/translate";

function Lessons({ language }) {
  const lessons = [
    { id: 1, title: language === "HI" ? "UPI सुरक्षा" : language === "MR" ? "UPI सुरक्षा" : "UPI Safety", icon: "💳", color: "var(--primary)" },
    { id: 2, title: language === "HI" ? "स्कैम डिटेक्शन" : language === "MR" ? "स्कॅम डिटेक्शन" : "Scam Detection", icon: "🛡️", color: "#ef4444" },
    { id: 3, title: language === "HI" ? "वेब सुरक्षा" : language === "MR" ? "वेब सुरक्षा" : "Web Safety", icon: "🌐", color: "#10b981" },
    { id: 4, title: language === "HI" ? "व्हाट्सएप सुरक्षा" : language === "MR" ? "व्हॉट्सअॅप सुरक्षा" : "WhatsApp Safety", icon: "💬", color: "#8b5cf6" },
    { id: 5, title: language === "HI" ? "गूगल सर्च" : language === "MR" ? "गुगल सर्च" : "Google Search", icon: "🔍", color: "#3b82f6" },
    { id: 6, title: language === "HI" ? "फोन सेटिंग्स" : language === "MR" ? "फोन सेटिंग्स" : "Phone Settings", icon: "⚙️", color: "#f59e0b" },
    { id: 7, title: language === "HI" ? "ऑनलाइन फॉर्म्स" : language === "MR" ? "ऑनलाइन फॉर्म्स" : "Online Forms", icon: "📝", color: "#ec4899" },
    { id: 8, title: language === "HI" ? "ईमेल बेसिक" : language === "MR" ? "ईमेल बेसिक" : "Email Basics", icon: "📧", color: "#6366f1" },
  ];

  return (
    <div className="container">
      <div style={{display:"flex",alignItems:"center",gap:"14px",marginBottom:"24px"}}>
        <div style={{width:"50px",height:"50px",borderRadius:"14px",background:"var(--primary-glow)",display:"flex",alignItems:"center",justifyContent:"center",fontSize:"26px"}}>📚</div>
        <div><h2 style={{marginBottom:"0"}}>{t(language, "lessonsTitle")}</h2><p style={{color:"var(--muted)",fontSize:"0.85rem"}}>{t(language, "lessonsSubtitle")}</p></div>
      </div>

      <div style={{display:"grid",gap:"16px"}}>
        {lessons.map(lesson => (
          <Link key={lesson.id} to={`/lesson/${lesson.id}`} style={{textDecoration:"none"}}>
            <div className="card hover-scale" style={{display:"flex",alignItems:"center",gap:"16px",padding:"20px",borderRadius:"16px",borderLeft:`4px solid ${lesson.color}`}}>
              <div style={{width:"60px",height:"60px",borderRadius:"16px",background:"var(--surface-glass)",border:"1px solid var(--border)",display:"flex",alignItems:"center",justifyContent:"center",fontSize:"32px"}}>
                {lesson.icon}
              </div>
              <div style={{flex:1}}>
                <h3 style={{fontSize:"1.2rem",marginBottom:"4px",color:"var(--text)"}}>{lesson.title}</h3>
                <p style={{fontSize:"0.9rem",color:"var(--muted)"}}>{t(language, "lesson")} {lesson.id}</p>
              </div>
              <div style={{color:lesson.color,fontWeight:"700",fontSize:"1.2rem"}}>→</div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}

export default Lessons;