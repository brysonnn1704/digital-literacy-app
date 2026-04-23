import React, { useState } from "react";
import { t } from "../utils/translate";
import { speak } from "../utils/speak";

function OnlineForms() {
  const lang = localStorage.getItem("language") || "EN";
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [aadhaar, setAadhaar] = useState("");
  const [result, setResult] = useState("");
  const [warnings, setWarnings] = useState([]);
  const [step, setStep] = useState(1);

  const checkForm = () => {
    const w = [];
    if (aadhaar && aadhaar.length === 12) {
      w.push(lang === "HI" ? "⚠️ आधार नंबर केवल सरकारी वेबसाइट पर भरें!" : lang === "MR" ? "⚠️ आधार नंबर फक्त सरकारी वेबसाइटवर भरा!" : "⚠️ Only enter Aadhaar on government websites!");
    }
    if (email && !email.includes("@")) {
      w.push(lang === "HI" ? "❌ ईमेल सही नहीं है" : lang === "MR" ? "❌ ईमेल बरोबर नाही" : "❌ Invalid email format");
    }
    if (phone && phone.length !== 10) {
      w.push(lang === "HI" ? "❌ फोन नंबर 10 अंकों का होना चाहिए" : lang === "MR" ? "❌ फोन नंबर 10 अंकांचा असावा" : "❌ Phone must be 10 digits");
    }
    if (w.length === 0 && name && phone) {
      setResult("✅ " + (lang === "HI" ? "फॉर्म सही भरा गया!" : lang === "MR" ? "फॉर्म बरोबर भरला गेला!" : "Form filled correctly!"));
      setStep(2);
    }
    setWarnings(w);
  };

  const safetyQuiz = [
    {
      q: lang === "HI" ? "अज्ञात वेबसाइट पर बैंक खाता नंबर भरना चाहिए?" : lang === "MR" ? "अज्ञात वेबसाइटवर बँक खाते नंबर भरावा?" : "Should you enter bank account number on unknown websites?",
      a: false, yes: t(lang, "yes"), no: t(lang, "no")
    },
    {
      q: lang === "HI" ? "सरकारी वेबसाइट पर https:// होता है?" : lang === "MR" ? "सरकारी वेबसाइटवर https:// असते?" : "Do government websites have https://?",
      a: true, yes: t(lang, "yes"), no: t(lang, "no")
    }
  ];

  const [quizIdx, setQuizIdx] = useState(0);
  const [quizResult, setQuizResult] = useState("");

  const answerQuiz = (ans) => {
    if (ans === safetyQuiz[quizIdx].a) {
      setQuizResult("✅ " + t(lang, "correct"));
      setTimeout(() => { setQuizResult(""); setQuizIdx(prev => prev + 1); }, 1500);
    } else {
      setQuizResult("⚠️ " + t(lang, "incorrect"));
    }
  };

  return (
    <div className="container">
      <div style={{display:"flex",alignItems:"center",gap:"14px",marginBottom:"24px"}}>
        <div style={{width:"50px",height:"50px",borderRadius:"14px",background:"rgba(245,158,11,0.1)",display:"flex",alignItems:"center",justifyContent:"center",fontSize:"26px"}}>📝</div>
        <div>
          <h2 style={{marginBottom:"0"}}>{t(lang, "lesson7")}</h2>
          <p style={{color:"var(--muted)",fontSize:"0.85rem"}}>{t(lang, "lesson7Desc")}</p>
        </div>
        <button onClick={() => speak(t(lang, "lesson7Desc"), lang)} style={{marginLeft:"auto",background:"none",border:"none",fontSize:"24px",cursor:"pointer"}}>🔊</button>
      </div>

      {step === 1 && (
        <div className="card">
          <h3 style={{marginBottom:"20px"}}>📝 {lang === "HI" ? "फॉर्म भरने का अभ्यास" : lang === "MR" ? "फॉर्म भरण्याचा सराव" : "Form Filling Practice"}</h3>

          <div style={{marginBottom:"16px"}}>
            <label style={{display:"block",fontSize:"14px",fontWeight:"600",color:"var(--text-secondary)",marginBottom:"8px"}}>{t(lang, "fullName")} *</label>
            <input placeholder={lang === "HI" ? "अपना नाम लिखें" : lang === "MR" ? "तुमचे नाव लिहा" : "Enter your name"} value={name} onChange={e => setName(e.target.value)} />
          </div>

          <div style={{marginBottom:"16px"}}>
            <label style={{display:"block",fontSize:"14px",fontWeight:"600",color:"var(--text-secondary)",marginBottom:"8px"}}>{t(lang, "emailLabel")}</label>
            <input placeholder="you@example.com" type="email" value={email} onChange={e => setEmail(e.target.value)} />
          </div>

          <div style={{marginBottom:"16px"}}>
            <label style={{display:"block",fontSize:"14px",fontWeight:"600",color:"var(--text-secondary)",marginBottom:"8px"}}>{t(lang, "phoneLabel")} *</label>
            <input placeholder="9876543210" type="tel" value={phone} onChange={e => setPhone(e.target.value)} />
          </div>

          <div style={{marginBottom:"16px"}}>
            <label style={{display:"block",fontSize:"14px",fontWeight:"600",color:"var(--text-secondary)",marginBottom:"8px"}}>{lang === "HI" ? "आधार नंबर" : lang === "MR" ? "आधार नंबर" : "Aadhaar Number"}</label>
            <input placeholder="123456789012" type="text" value={aadhaar} onChange={e => setAadhaar(e.target.value)} />
          </div>

          <button className="btn" onClick={checkForm}>{t(lang, "submitForm")} →</button>
        </div>
      )}

      {warnings.length > 0 && (
        <div className="card" style={{borderLeft:"4px solid #f59e0b"}}>
          {warnings.map((w, i) => (
            <p key={i} style={{fontWeight:"600",color:"#f59e0b",padding:"4px 0"}}>{w}</p>
          ))}
        </div>
      )}

      {result && (
        <div className="card" style={{borderLeft:"4px solid var(--accent)",animation:"fadeSlideUp 0.3s"}}>
          <p style={{fontWeight:"600",color:"var(--accent)",fontSize:"1.05rem"}}>{result}</p>
        </div>
      )}

      {step === 2 && quizIdx < safetyQuiz.length && (
        <div className="card">
          <h3 style={{marginBottom:"16px"}}>🔒 {lang === "HI" ? "सुरक्षा प्रश्न" : lang === "MR" ? "सुरक्षा प्रश्न" : "Safety Question"}</h3>
          <p style={{fontSize:"1.05rem",fontWeight:"600",marginBottom:"16px"}}>{safetyQuiz[quizIdx].q}</p>
          <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:"12px"}}>
            <button className="btn" style={{background:"linear-gradient(135deg,var(--accent),#059669)"}} onClick={() => answerQuiz(true)}>{safetyQuiz[quizIdx].yes}</button>
            <button className="btn" style={{background:"linear-gradient(135deg,#ef4444,#dc2626)"}} onClick={() => answerQuiz(false)}>{safetyQuiz[quizIdx].no}</button>
          </div>
          {quizResult && <p style={{marginTop:"12px",fontWeight:"600",color:quizResult.includes("✅") ? "var(--accent)" : "#ef4444"}}>{quizResult}</p>}
        </div>
      )}
    </div>
  );
}

export default OnlineForms;
