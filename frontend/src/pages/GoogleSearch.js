import React, { useState } from "react";
import { t } from "../utils/translate";
import { speak } from "../utils/speak";

function GoogleSearch() {
  const lang = localStorage.getItem("language") || "EN";
  const [query, setQuery] = useState("");
  const [results, setResults] = useState(null);
  const [quizResult, setQuizResult] = useState("");

  const safeResults = [
    { title: lang === "HI" ? "विकिपीडिया - मुफ्त विश्वकोश" : lang === "MR" ? "विकिपीडिया - मुक्त विश्वकोश" : "Wikipedia - Free Encyclopedia", url: "https://wikipedia.org", safe: true },
    { title: lang === "HI" ? "सरकारी वेबसाइट" : lang === "MR" ? "सरकारी वेबसाइट" : "Government Official Website", url: "https://india.gov.in", safe: true },
  ];

  const unsafeResults = [
    { title: lang === "HI" ? "🎁 मुफ्त iPhone जीतें! अभी क्लिक करें!" : lang === "MR" ? "🎁 मोफत iPhone जिंका! आता क्लिक करा!" : "🎁 Win FREE iPhone! Click Now!", url: "http://free-prize.xyz", safe: false },
    { title: lang === "HI" ? "⚡ तुरंत पैसे कमाएं - घर बैठे!" : lang === "MR" ? "⚡ लगेच पैसे कमवा - घरबसल्या!" : "⚡ Earn Money Instantly - Work from Home!", url: "http://quick-cash.ru", safe: false },
  ];

  const doSearch = () => {
    if (!query.trim()) return;
    setResults([...safeResults, ...unsafeResults].sort(() => Math.random() - 0.5));
    setQuizResult("");
  };

  const clickResult = (result) => {
    if (result.safe) {
      setQuizResult("✅ " + (lang === "HI" ? "सही! यह एक सुरक्षित वेबसाइट है।" : lang === "MR" ? "बरोबर! ही एक सुरक्षित वेबसाइट आहे." : "Correct! This is a safe website."));
    } else {
      setQuizResult("⚠️ " + (lang === "HI" ? "सावधान! यह एक स्कैम वेबसाइट है!" : lang === "MR" ? "सावध! ही एक स्कॅम वेबसाइट आहे!" : "Careful! This is a scam website!"));
    }
  };

  const tips = lang === "HI"
    ? ["✅ .gov.in या .org वेबसाइट पर भरोसा करें", "❌ .xyz या .ru वाले लिंक से बचें", "❌ 'मुफ्त' या 'जीतें' वाले लिंक स्कैम होते हैं", "✅ HTTPS वाली वेबसाइट ज्यादा सुरक्षित हैं"]
    : lang === "MR"
    ? ["✅ .gov.in किंवा .org वेबसाइटवर विश्वास ठेवा", "❌ .xyz किंवा .ru वाल्या लिंक टाळा", "❌ 'मोफत' किंवा 'जिंका' वाले लिंक स्कॅम आहेत", "✅ HTTPS वाल्या वेबसाइट अधिक सुरक्षित आहेत"]
    : ["✅ Trust .gov.in or .org websites", "❌ Avoid links with .xyz or .ru", "❌ 'Free' or 'Win' links are usually scams", "✅ HTTPS websites are more secure"];

  return (
    <div className="container">
      <div style={{display:"flex",alignItems:"center",gap:"14px",marginBottom:"24px"}}>
        <div style={{width:"50px",height:"50px",borderRadius:"14px",background:"rgba(99,102,241,0.1)",display:"flex",alignItems:"center",justifyContent:"center",fontSize:"26px"}}>🔍</div>
        <div>
          <h2 style={{marginBottom:"0"}}>{t(lang, "lesson5")}</h2>
          <p style={{color:"var(--muted)",fontSize:"0.85rem"}}>{t(lang, "lesson5Desc")}</p>
        </div>
        <button onClick={() => speak(t(lang, "lesson5Desc"), lang)} style={{marginLeft:"auto",background:"none",border:"none",fontSize:"24px",cursor:"pointer"}}>🔊</button>
      </div>

      {/* Search Simulator */}
      <div className="card">
        <h3 style={{marginBottom:"16px"}}>🔍 {lang === "HI" ? "गूगल सर्च सिम्युलेटर" : lang === "MR" ? "गूगल सर्च सिम्युलेटर" : "Google Search Simulator"}</h3>
        <div className="sim-input-row">
          <input value={query} onChange={e => setQuery(e.target.value)} placeholder={t(lang, "searchHere")} onKeyDown={e => { if(e.key === "Enter") doSearch(); }} />
          <button onClick={doSearch}>🔍</button>
        </div>
      </div>

      {results && (
        <div className="card">
          <h3 style={{marginBottom:"16px"}}>{lang === "HI" ? "खोज परिणाम — सुरक्षित लिंक चुनें!" : lang === "MR" ? "शोध निकाल — सुरक्षित लिंक निवडा!" : "Search Results — Pick the safe link!"}</h3>
          {results.map((r, i) => (
            <div key={i} onClick={() => clickResult(r)} style={{padding:"14px 18px",border:"1px solid var(--border)",borderRadius:"12px",marginBottom:"10px",cursor:"pointer",transition:"all 0.2s",background:"var(--surface-glass)"}}>
              <p style={{fontSize:"1rem",fontWeight:"600",color: r.safe ? "var(--primary)" : "#ef4444",marginBottom:"4px"}}>{r.title}</p>
              <p style={{fontSize:"0.8rem",color:"var(--muted)",fontFamily:"monospace"}}>{r.url}</p>
            </div>
          ))}
        </div>
      )}

      {quizResult && (
        <div className="card" style={{borderLeft:`4px solid ${quizResult.includes("✅") ? "var(--accent)" : "#ef4444"}`,animation:"fadeSlideUp 0.3s"}}>
          <p style={{fontWeight:"600",color:quizResult.includes("✅") ? "var(--accent)" : "#ef4444",fontSize:"1.05rem"}}>{quizResult}</p>
        </div>
      )}

      {/* Tips */}
      <div className="card">
        <h3 style={{marginBottom:"14px"}}>💡 {t(lang, "searchTips")}</h3>
        {tips.map((tip, i) => (
          <p key={i} style={{padding:"8px 0",borderBottom:"1px solid var(--border)",fontSize:"0.95rem"}}>{tip}</p>
        ))}
      </div>
    </div>
  );
}

export default GoogleSearch;
