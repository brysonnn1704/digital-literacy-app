import React, { useState } from "react";
import { t } from "../utils/translate";
import { speak } from "../utils/speak";

function WhatsAppBasics() {
  const lang = localStorage.getItem("language") || "EN";
  const [messages, setMessages] = useState([
    { text: lang === "HI" ? "नमस्ते! मैं आपकी माँ बोल रही हूँ।" : lang === "MR" ? "नमस्कार! मी तुमची आई बोलत आहे." : "Hello! This is your mother.", from: "received" },
    { text: lang === "HI" ? "कृपया इस लिंक पर क्लिक करें और ₹5000 भेजें।" : lang === "MR" ? "कृपया या लिंकवर क्लिक करा आणि ₹5000 पाठवा." : "Please click this link and send ₹5000.", from: "received" }
  ]);
  const [input, setInput] = useState("");
  const [quizStep, setQuizStep] = useState(0);
  const [result, setResult] = useState("");

  const quizzes = [
    {
      q: lang === "HI" ? "अज्ञात नंबर से आया संदेश जो पैसे माँगे — क्या करें?" : lang === "MR" ? "अज्ञात नंबरवरून आलेला संदेश जो पैसे मागतो — काय कराल?" : "Unknown number message asking for money — what to do?",
      options: [
        { label: lang === "HI" ? "पैसे भेजें" : lang === "MR" ? "पैसे पाठवा" : "Send money", correct: false },
        { label: lang === "HI" ? "ब्लॉक और रिपोर्ट करें" : lang === "MR" ? "ब्लॉक आणि रिपोर्ट करा" : "Block & Report", correct: true }
      ]
    },
    {
      q: lang === "HI" ? "WhatsApp पर अपना OTP किसी को भेजें?" : lang === "MR" ? "WhatsApp वर तुमचा OTP कोणाला पाठवायचा?" : "Should you share your OTP on WhatsApp?",
      options: [
        { label: lang === "HI" ? "हाँ, अगर वो बैंक से हैं" : lang === "MR" ? "होय, जर ते बँकेचे असतील" : "Yes, if they say they're from bank", correct: false },
        { label: lang === "HI" ? "कभी नहीं!" : lang === "MR" ? "कधीच नाही!" : "Never!", correct: true }
      ]
    },
    {
      q: lang === "HI" ? "ग्रुप में आया 'लॉटरी जीतें' लिंक — क्या करें?" : lang === "MR" ? "ग्रुपमध्ये आलेला 'लॉटरी जिंका' लिंक — काय कराल?" : "A 'Win Lottery' link in group — what to do?",
      options: [
        { label: lang === "HI" ? "लिंक पर क्लिक करें" : lang === "MR" ? "लिंकवर क्लिक करा" : "Click the link", correct: false },
        { label: lang === "HI" ? "अनदेखा करें, रिपोर्ट करें" : lang === "MR" ? "दुर्लक्ष करा, रिपोर्ट करा" : "Ignore & report", correct: true }
      ]
    }
  ];

  const sendMsg = () => {
    if (!input.trim()) return;
    setMessages([...messages, { text: input, from: "sent" }]);
    setInput("");
    setTimeout(() => {
      setMessages(prev => [...prev, { text: lang === "HI" ? "संदेश मिला! 👍" : lang === "MR" ? "संदेश मिळाला! 👍" : "Message received! 👍", from: "received" }]);
    }, 800);
  };

  const handleQuiz = (correct) => {
    if (correct) {
      setResult("✅ " + t(lang, "correct"));
      setTimeout(() => { setResult(""); setQuizStep(prev => prev + 1); }, 1500);
    } else {
      setResult("⚠️ " + t(lang, "incorrect"));
    }
  };

  const currentQuiz = quizzes[quizStep];

  return (
    <div className="container">
      <div style={{display:"flex",alignItems:"center",gap:"14px",marginBottom:"24px"}}>
        <div style={{width:"50px",height:"50px",borderRadius:"14px",background:"rgba(37,211,102,0.1)",display:"flex",alignItems:"center",justifyContent:"center",fontSize:"26px"}}>💬</div>
        <div>
          <h2 style={{marginBottom:"0"}}>{t(lang, "lesson4")}</h2>
          <p style={{color:"var(--muted)",fontSize:"0.85rem"}}>{t(lang, "lesson4Desc")}</p>
        </div>
        <button onClick={() => speak(t(lang, "lesson4Desc"), lang)} style={{marginLeft:"auto",background:"none",border:"none",fontSize:"24px",cursor:"pointer"}}>🔊</button>
      </div>

      {/* Chat Simulator */}
      <div className="card">
        <h3 style={{marginBottom:"16px"}}>💬 WhatsApp Simulator</h3>
        <div className="sim-phone">
          <div className="sim-header">
            <span style={{fontSize:"20px"}}>💬</span>
            <span>{lang === "HI" ? "अज्ञात नंबर" : lang === "MR" ? "अज्ञात नंबर" : "Unknown Number"}</span>
          </div>
          <div style={{maxHeight:"240px",overflowY:"auto",padding:"8px 0"}}>
            {messages.map((m, i) => (
              <div key={i} className={`sim-message ${m.from}`}>{m.text}</div>
            ))}
          </div>
          <div className="sim-input-row">
            <input value={input} onChange={e => setInput(e.target.value)} placeholder={t(lang, "typeMessage")} onKeyDown={e => { if(e.key==="Enter") sendMsg(); }} />
            <button onClick={sendMsg}>➤</button>
          </div>
        </div>
      </div>

      {/* Quiz */}
      {currentQuiz && (
        <div className="card">
          <h3 style={{marginBottom:"16px"}}>❓ {lang === "HI" ? "सुरक्षा प्रश्न" : lang === "MR" ? "सुरक्षा प्रश्न" : "Safety Quiz"} ({quizStep + 1}/{quizzes.length})</h3>
          <p style={{fontSize:"1.05rem",fontWeight:"600",marginBottom:"16px"}}>{currentQuiz.q}</p>
          <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:"12px"}}>
            {currentQuiz.options.map((opt, i) => (
              <button key={i} className="btn" style={{background: opt.correct ? "linear-gradient(135deg,var(--accent),#059669)" : "linear-gradient(135deg,#ef4444,#dc2626)"}} onClick={() => handleQuiz(opt.correct)}>
                {opt.label}
              </button>
            ))}
          </div>
        </div>
      )}

      {quizStep >= quizzes.length && (
        <div className="card" style={{borderLeft:"4px solid var(--accent)",textAlign:"center"}}>
          <div style={{fontSize:"48px",marginBottom:"8px"}}>🎉</div>
          <h3>{lang === "HI" ? "बधाई! सभी प्रश्न सही!" : lang === "MR" ? "अभिनंदन! सर्व प्रश्न बरोबर!" : "Congratulations! All questions correct!"}</h3>
        </div>
      )}

      {result && (
        <div className="card" style={{borderLeft:`4px solid ${result.includes("✅") ? "var(--accent)" : "#ef4444"}`,animation:"fadeSlideUp 0.3s ease-out"}}>
          <p style={{fontWeight:"600",color:result.includes("✅") ? "var(--accent)" : "#ef4444"}}>{result}</p>
        </div>
      )}
    </div>
  );
}

export default WhatsAppBasics;
