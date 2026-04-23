import React, { useState } from "react";
import { t } from "../utils/translate";
import { speak } from "../utils/speak";

function EmailBasics() {
  const lang = localStorage.getItem("language") || "EN";
  const [view, setView] = useState("inbox");
  const [composeTo, setComposeTo] = useState("");
  const [composeSubject, setComposeSubject] = useState("");
  const [composeBody, setComposeBody] = useState("");
  const [result, setResult] = useState("");
  const [sent, setSent] = useState(false);

  const emails = [
    {
      from: "support@yourbank-secure.xyz",
      subject: lang === "HI" ? "🚨 आपका खाता ब्लॉक हो गया! अभी क्लिक करें" : lang === "MR" ? "🚨 तुमचे खाते ब्लॉक झाले! आता क्लिक करा" : "🚨 Your account is BLOCKED! Click NOW",
      body: lang === "HI" ? "प्रिय ग्राहक, आपका खाता ब्लॉक हो गया है। कृपया अपना पासवर्ड और OTP यहाँ भेजें।" : lang === "MR" ? "प्रिय ग्राहक, तुमचे खाते ब्लॉक झाले आहे. कृपया तुमचा पासवर्ड आणि OTP येथे पाठवा." : "Dear customer, your account is blocked. Please send your password and OTP here.",
      safe: false, icon: "⚠️"
    },
    {
      from: "noreply@amazon.in",
      subject: lang === "HI" ? "आपका ऑर्डर डिलीवर हो गया" : lang === "MR" ? "तुमची ऑर्डर डिलिव्हर झाली" : "Your order has been delivered",
      body: lang === "HI" ? "आपका ऑर्डर #12345 आज डिलीवर हो गया है। धन्यवाद!" : lang === "MR" ? "तुमची ऑर्डर #12345 आज डिलिव्हर झाली आहे. धन्यवाद!" : "Your order #12345 has been delivered today. Thank you!",
      safe: true, icon: "📦"
    },
    {
      from: "lottery-winner@prize.ru",
      subject: lang === "HI" ? "🎉 आपने ₹50 लाख जीते! अभी दावा करें" : lang === "MR" ? "🎉 तुम्ही ₹50 लाख जिंकलात! आता दावा करा" : "🎉 You won ₹50 Lakh! Claim NOW",
      body: lang === "HI" ? "बधाई! आपने लॉटरी जीती है। ₹500 प्रोसेसिंग फी भेजें।" : lang === "MR" ? "अभिनंदन! तुम्ही लॉटरी जिंकली आहे. ₹500 प्रोसेसिंग फी पाठवा." : "Congratulations! You won a lottery. Send ₹500 processing fee.",
      safe: false, icon: "🎰"
    },
    {
      from: "admin@school.edu.in",
      subject: lang === "HI" ? "अभिभावक-शिक्षक बैठक की सूचना" : lang === "MR" ? "पालक-शिक्षक बैठकीची सूचना" : "Parent-Teacher Meeting Notice",
      body: lang === "HI" ? "कृपया 25 अप्रैल को अपने बच्चे की PTM में आएं।" : lang === "MR" ? "कृपया 25 एप्रिलला तुमच्या मुलाच्या PTM ला या." : "Please attend the PTM for your child on April 25.",
      safe: true, icon: "🏫"
    }
  ];

  const [selectedEmail, setSelectedEmail] = useState(null);
  const [emailResult, setEmailResult] = useState("");

  const judgeEmail = (isSafe) => {
    if (isSafe === selectedEmail.safe) {
      setEmailResult("✅ " + t(lang, "correct"));
    } else {
      setEmailResult("⚠️ " + t(lang, "incorrect"));
    }
  };

  const handleSend = () => {
    if (!composeTo || !composeSubject) {
      setResult(lang === "HI" ? "कृपया प्रति और विषय भरें" : lang === "MR" ? "कृपया प्रति आणि विषय भरा" : "Please fill To and Subject");
      return;
    }
    setSent(true);
    setResult("✅ " + (lang === "HI" ? "ईमेल भेजा गया! (अभ्यास)" : lang === "MR" ? "ईमेल पाठवला! (सराव)" : "Email sent! (Practice)"));
    setTimeout(() => { setView("inbox"); setSent(false); setResult(""); setComposeTo(""); setComposeSubject(""); setComposeBody(""); }, 2000);
  };

  return (
    <div className="container">
      <div style={{display:"flex",alignItems:"center",gap:"14px",marginBottom:"24px"}}>
        <div style={{width:"50px",height:"50px",borderRadius:"14px",background:"rgba(239,68,68,0.1)",display:"flex",alignItems:"center",justifyContent:"center",fontSize:"26px"}}>📧</div>
        <div>
          <h2 style={{marginBottom:"0"}}>{t(lang, "lesson8")}</h2>
          <p style={{color:"var(--muted)",fontSize:"0.85rem"}}>{t(lang, "lesson8Desc")}</p>
        </div>
        <button onClick={() => speak(t(lang, "lesson8Desc"), lang)} style={{marginLeft:"auto",background:"none",border:"none",fontSize:"24px",cursor:"pointer"}}>🔊</button>
      </div>

      {/* Tabs */}
      <div style={{display:"flex",gap:"8px",marginBottom:"20px"}}>
        <button className="btn" style={{maxWidth:"160px",background: view === "inbox" ? "linear-gradient(135deg,var(--primary),var(--primary-dark))" : "var(--surface-glass)",color: view === "inbox" ? "white" : "var(--text)"}} onClick={() => { setView("inbox"); setSelectedEmail(null); setEmailResult(""); }}>📥 {t(lang, "inbox")}</button>
        <button className="btn" style={{maxWidth:"160px",background: view === "compose" ? "linear-gradient(135deg,var(--primary),var(--primary-dark))" : "var(--surface-glass)",color: view === "compose" ? "white" : "var(--text)"}} onClick={() => setView("compose")}>✏️ {t(lang, "composeEmail")}</button>
      </div>

      {view === "inbox" && !selectedEmail && (
        <div className="card">
          <h3 style={{marginBottom:"16px"}}>📥 {t(lang, "inbox")} — {lang === "HI" ? "सुरक्षित या खतरनाक?" : lang === "MR" ? "सुरक्षित की धोकादायक?" : "Safe or Dangerous?"}</h3>
          {emails.map((em, i) => (
            <div key={i} onClick={() => { setSelectedEmail(em); setEmailResult(""); }} style={{padding:"14px 18px",border:"1px solid var(--border)",borderRadius:"12px",marginBottom:"10px",cursor:"pointer",transition:"all 0.2s",background:"var(--surface-glass)"}}>
              <div style={{display:"flex",alignItems:"center",gap:"8px",marginBottom:"4px"}}>
                <span style={{fontSize:"18px"}}>{em.icon}</span>
                <p style={{fontSize:"0.8rem",color:"var(--muted)"}}>{em.from}</p>
              </div>
              <p style={{fontWeight:"600",color:"var(--text)"}}>{em.subject}</p>
            </div>
          ))}
        </div>
      )}

      {view === "inbox" && selectedEmail && (
        <div className="card">
          <button onClick={() => { setSelectedEmail(null); setEmailResult(""); }} style={{background:"none",border:"none",color:"var(--primary)",fontWeight:"600",cursor:"pointer",marginBottom:"16px",fontSize:"14px"}}>← {t(lang, "back")}</button>
          <p style={{fontSize:"0.8rem",color:"var(--muted)",marginBottom:"4px"}}>{lang === "HI" ? "प्रेषक:" : lang === "MR" ? "प्रेषक:" : "From:"} {selectedEmail.from}</p>
          <h3 style={{marginBottom:"12px"}}>{selectedEmail.subject}</h3>
          <div style={{background:"var(--surface-glass)",borderRadius:"12px",padding:"16px",border:"1px solid var(--border)",marginBottom:"16px"}}>
            <p>{selectedEmail.body}</p>
          </div>
          <h3>{lang === "HI" ? "यह ईमेल सुरक्षित है?" : lang === "MR" ? "हा ईमेल सुरक्षित आहे?" : "Is this email safe?"}</h3>
          <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:"12px",marginTop:"12px"}}>
            <button className="btn" style={{background:"linear-gradient(135deg,var(--accent),#059669)"}} onClick={() => judgeEmail(true)}>✅ {t(lang, "safe")}</button>
            <button className="btn" style={{background:"linear-gradient(135deg,#ef4444,#dc2626)"}} onClick={() => judgeEmail(false)}>⚠️ {t(lang, "scam")}</button>
          </div>
          {emailResult && <p style={{marginTop:"12px",fontWeight:"600",color:emailResult.includes("✅") ? "var(--accent)" : "#ef4444"}}>{emailResult}</p>}
        </div>
      )}

      {view === "compose" && (
        <div className="card">
          <h3 style={{marginBottom:"16px"}}>✏️ {t(lang, "composeEmail")}</h3>
          <div style={{marginBottom:"14px"}}>
            <label style={{display:"block",fontSize:"14px",fontWeight:"600",color:"var(--text-secondary)",marginBottom:"8px"}}>{t(lang, "to")}</label>
            <input placeholder="friend@example.com" value={composeTo} onChange={e => setComposeTo(e.target.value)} />
          </div>
          <div style={{marginBottom:"14px"}}>
            <label style={{display:"block",fontSize:"14px",fontWeight:"600",color:"var(--text-secondary)",marginBottom:"8px"}}>{t(lang, "subject")}</label>
            <input placeholder={lang === "HI" ? "विषय लिखें" : lang === "MR" ? "विषय लिहा" : "Enter subject"} value={composeSubject} onChange={e => setComposeSubject(e.target.value)} />
          </div>
          <div style={{marginBottom:"14px"}}>
            <textarea placeholder={lang === "HI" ? "अपना संदेश लिखें..." : lang === "MR" ? "तुमचा संदेश लिहा..." : "Write your message..."} value={composeBody} onChange={e => setComposeBody(e.target.value)} rows={4} style={{resize:"vertical"}} />
          </div>
          <button className="btn" onClick={handleSend} disabled={sent}>{sent ? "✅" : "📤"} {t(lang, "send")}</button>
          {result && <p style={{marginTop:"12px",fontWeight:"600",color:result.includes("✅") ? "var(--accent)" : "#f59e0b"}}>{result}</p>}
        </div>
      )}
    </div>
  );
}

export default EmailBasics;
