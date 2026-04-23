import React from "react";
import { t } from "../utils/translate";
import { speak } from "../utils/speak";

function HelpCenter() {
  const lang = localStorage.getItem("language") || "EN";

  const steps = lang === "HI"
    ? [
        { icon: "1️⃣", title: "खाता बनाएं", desc: "रजिस्टर पेज पर अपना नाम, ईमेल और पासवर्ड डालें" },
        { icon: "2️⃣", title: "लॉगिन करें", desc: "अपने ईमेल और पासवर्ड से लॉगिन करें" },
        { icon: "3️⃣", title: "पाठ चुनें", desc: "पाठ पेज पर जाएं और कोई भी पाठ चुनें" },
        { icon: "4️⃣", title: "वीडियो देखें", desc: "हर पाठ में एक वीडियो है — ध्यान से देखें" },
        { icon: "5️⃣", title: "अभ्यास करें", desc: "वीडियो के बाद अभ्यास बटन दबाएं" },
        { icon: "6️⃣", title: "प्रमाणपत्र पाएं", desc: "सभी पाठ पूरे करने पर प्रमाणपत्र मिलेगा" }
      ]
    : lang === "MR"
    ? [
        { icon: "1️⃣", title: "खाते तयार करा", desc: "रजिस्टर पेजवर तुमचे नाव, ईमेल आणि पासवर्ड टाका" },
        { icon: "2️⃣", title: "लॉगिन करा", desc: "तुमच्या ईमेल आणि पासवर्डने लॉगिन करा" },
        { icon: "3️⃣", title: "धडा निवडा", desc: "धडे पेजवर जा आणि कोणताही धडा निवडा" },
        { icon: "4️⃣", title: "व्हिडिओ पहा", desc: "प्रत्येक धड्यात एक व्हिडिओ आहे — काळजीपूर्वक पहा" },
        { icon: "5️⃣", title: "सराव करा", desc: "व्हिडिओनंतर सराव बटन दाबा" },
        { icon: "6️⃣", title: "प्रमाणपत्र मिळवा", desc: "सर्व धडे पूर्ण केल्यावर प्रमाणपत्र मिळेल" }
      ]
    : [
        { icon: "1️⃣", title: "Create Account", desc: "Go to Register page and enter your name, email and password" },
        { icon: "2️⃣", title: "Login", desc: "Login with your email and password" },
        { icon: "3️⃣", title: "Choose a Lesson", desc: "Go to Lessons page and pick any lesson" },
        { icon: "4️⃣", title: "Watch Video", desc: "Every lesson has a video — watch it carefully" },
        { icon: "5️⃣", title: "Practice", desc: "After the video, click the Practice button" },
        { icon: "6️⃣", title: "Get Certificate", desc: "Complete all lessons to receive your certificate" }
      ];

  const faqs = lang === "HI"
    ? [
        { q: "यह ऐप मुफ्त है?", a: "हाँ, यह पूरी तरह मुफ्त है।" },
        { q: "मुझे अंग्रेजी नहीं आती, क्या मैं उपयोग कर सकता हूँ?", a: "हाँ! ऊपर भाषा बदलें — हिंदी और मराठी उपलब्ध है।" },
        { q: "क्या मेरा डेटा सुरक्षित है?", a: "हम केवल आपकी प्रगति सेव करते हैं। कोई व्यक्तिगत बैंक जानकारी नहीं माँगते।" },
        { q: "प्रमाणपत्र कैसे मिलेगा?", a: "सभी 8 पाठ पूरे करें, फिर डैशबोर्ड पर 'प्रमाणपत्र' बटन दबाएं।" }
      ]
    : lang === "MR"
    ? [
        { q: "हे ॲप मोफत आहे?", a: "होय, हे पूर्णपणे मोफत आहे." },
        { q: "मला इंग्रजी येत नाही, मी वापरू शकतो?", a: "होय! वरती भाषा बदला — हिंदी आणि मराठी उपलब्ध आहे." },
        { q: "माझा डेटा सुरक्षित आहे?", a: "आम्ही फक्त तुमची प्रगती सेव्ह करतो. कोणतीही वैयक्तिक बँक माहिती मागत नाही." },
        { q: "प्रमाणपत्र कसे मिळेल?", a: "सर्व 8 धडे पूर्ण करा, मग डॅशबोर्डवर 'प्रमाणपत्र' बटन दाबा." }
      ]
    : [
        { q: "Is this app free?", a: "Yes, it is completely free." },
        { q: "I don't know English, can I still use it?", a: "Yes! Change language from the top — Hindi and Marathi are available." },
        { q: "Is my data safe?", a: "We only save your progress. We never ask for personal bank information." },
        { q: "How to get certificate?", a: "Complete all 8 lessons, then click 'Get Certificate' on the Dashboard." }
      ];

  return (
    <div className="container">
      <div style={{display:"flex",alignItems:"center",gap:"14px",marginBottom:"24px"}}>
        <div style={{width:"50px",height:"50px",borderRadius:"14px",background:"rgba(239,68,68,0.1)",display:"flex",alignItems:"center",justifyContent:"center",fontSize:"26px"}}>🆘</div>
        <div>
          <h2 style={{marginBottom:"0"}}>{t(lang, "helpCenter")}</h2>
          <p style={{color:"var(--muted)",fontSize:"0.85rem"}}>{lang === "HI" ? "मदद और आपातकालीन संपर्क" : lang === "MR" ? "मदत आणि आपत्कालीन संपर्क" : "Help & Emergency Contacts"}</p>
        </div>
        <button onClick={() => speak(lang === "HI" ? "यह सहायता केंद्र है" : lang === "MR" ? "हे मदत केंद्र आहे" : "This is the Help Center", lang)} style={{marginLeft:"auto",background:"none",border:"none",fontSize:"24px",cursor:"pointer"}}>🔊</button>
      </div>

      {/* Emergency Contacts */}
      <div className="card" style={{borderLeft:"4px solid #ef4444"}}>
        <h3 style={{marginBottom:"16px",color:"#ef4444"}}>🚨 {t(lang, "emergencyContacts")}</h3>
        <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:"12px"}}>
          <a href="tel:1930" style={{display:"flex",flexDirection:"column",alignItems:"center",padding:"20px",background:"rgba(239,68,68,0.06)",borderRadius:"14px",border:"1px solid rgba(239,68,68,0.15)",textDecoration:"none",transition:"all 0.2s"}}>
            <span style={{fontSize:"32px",marginBottom:"8px"}}>📞</span>
            <p style={{fontWeight:"700",fontSize:"1.3rem",color:"#ef4444"}}>1930</p>
            <p style={{fontSize:"0.8rem",color:"var(--muted)"}}>{t(lang, "cyberCrime")}</p>
          </a>
          <a href="tel:100" style={{display:"flex",flexDirection:"column",alignItems:"center",padding:"20px",background:"rgba(99,102,241,0.06)",borderRadius:"14px",border:"1px solid rgba(99,102,241,0.15)",textDecoration:"none",transition:"all 0.2s"}}>
            <span style={{fontSize:"32px",marginBottom:"8px"}}>🚔</span>
            <p style={{fontWeight:"700",fontSize:"1.3rem",color:"var(--primary)"}}>100</p>
            <p style={{fontSize:"0.8rem",color:"var(--muted)"}}>{t(lang, "police")}</p>
          </a>
        </div>
      </div>

      {/* How to Use */}
      <div className="card">
        <h3 style={{marginBottom:"20px"}}>📖 {t(lang, "howToUse")}</h3>
        {steps.map((s, i) => (
          <div key={i} style={{display:"flex",gap:"14px",alignItems:"flex-start",padding:"12px 0",borderBottom: i < steps.length - 1 ? "1px solid var(--border)" : "none"}}>
            <span style={{fontSize:"24px",flexShrink:0}}>{s.icon}</span>
            <div>
              <p style={{fontWeight:"700",color:"var(--text)",marginBottom:"2px"}}>{s.title}</p>
              <p style={{fontSize:"0.9rem",color:"var(--muted)"}}>{s.desc}</p>
            </div>
          </div>
        ))}
      </div>

      {/* FAQ */}
      <div className="card">
        <h3 style={{marginBottom:"16px"}}>❓ {t(lang, "faq")}</h3>
        {faqs.map((f, i) => (
          <div key={i} style={{padding:"14px 0",borderBottom: i < faqs.length - 1 ? "1px solid var(--border)" : "none"}}>
            <p style={{fontWeight:"700",color:"var(--text)",marginBottom:"6px"}}>Q: {f.q}</p>
            <p style={{color:"var(--text-secondary)",fontSize:"0.95rem"}}>A: {f.a}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default HelpCenter;
