import React, { useState } from "react";
import { t } from "../utils/translate";
import { speak } from "../utils/speak";

function PhoneSettings() {
  const lang = localStorage.getItem("language") || "EN";
  const [wifi, setWifi] = useState(false);
  const [bluetooth, setBluetooth] = useState(false);
  const [brightness, setBrightness] = useState(50);
  const [airplane, setAirplane] = useState(false);
  const [tips, setTips] = useState([]);

  const showTip = (key) => {
    const tipMap = {
      wifi: lang === "HI" ? "✅ सार्वजनिक WiFi से बैंकिंग न करें" : lang === "MR" ? "✅ सार्वजनिक WiFi वर बँकिंग करू नका" : "✅ Never do banking on public WiFi",
      bluetooth: lang === "HI" ? "✅ उपयोग के बाद Bluetooth बंद करें" : lang === "MR" ? "✅ वापरल्यानंतर Bluetooth बंद करा" : "✅ Turn off Bluetooth when not in use",
      airplane: lang === "HI" ? "✅ हवाई जहाज़ में Airplane Mode ऑन करें" : lang === "MR" ? "✅ विमानात Airplane Mode चालू करा" : "✅ Turn on Airplane Mode during flights",
      brightness: lang === "HI" ? "💡 धूप में चमक बढ़ाएं, रात में कम करें" : lang === "MR" ? "💡 उन्हात तेजस्विता वाढवा, रात्री कमी करा" : "💡 Increase brightness in sunlight, decrease at night"
    };
    if (!tips.includes(tipMap[key])) {
      setTips([...tips, tipMap[key]]);
    }
  };

  return (
    <div className="container">
      <div style={{display:"flex",alignItems:"center",gap:"14px",marginBottom:"24px"}}>
        <div style={{width:"50px",height:"50px",borderRadius:"14px",background:"rgba(99,102,241,0.1)",display:"flex",alignItems:"center",justifyContent:"center",fontSize:"26px"}}>⚙️</div>
        <div>
          <h2 style={{marginBottom:"0"}}>{t(lang, "lesson6")}</h2>
          <p style={{color:"var(--muted)",fontSize:"0.85rem"}}>{t(lang, "lesson6Desc")}</p>
        </div>
        <button onClick={() => speak(t(lang, "lesson6Desc"), lang)} style={{marginLeft:"auto",background:"none",border:"none",fontSize:"24px",cursor:"pointer"}}>🔊</button>
      </div>

      <div className="card">
        <h3 style={{marginBottom:"20px"}}>📱 {lang === "HI" ? "फोन सेटिंग्स सिम्युलेटर" : lang === "MR" ? "फोन सेटिंग्ज सिम्युलेटर" : "Phone Settings Simulator"}</h3>

        {/* WiFi */}
        <div className="toggle-container" onClick={() => { setWifi(!wifi); showTip("wifi"); }}>
          <div style={{display:"flex",alignItems:"center",gap:"12px"}}>
            <span style={{fontSize:"24px"}}>📶</span>
            <div>
              <p style={{fontWeight:"600",color:"var(--text)",marginBottom:"2px"}}>{t(lang, "wifiLabel")}</p>
              <p style={{fontSize:"0.8rem",color:"var(--muted)"}}>{wifi ? (lang === "HI" ? "चालू" : lang === "MR" ? "चालू" : "Connected") : (lang === "HI" ? "बंद" : lang === "MR" ? "बंद" : "Off")}</p>
            </div>
          </div>
          <div className={`toggle-switch ${wifi ? "active" : ""}`} />
        </div>

        {/* Bluetooth */}
        <div className="toggle-container" onClick={() => { setBluetooth(!bluetooth); showTip("bluetooth"); }}>
          <div style={{display:"flex",alignItems:"center",gap:"12px"}}>
            <span style={{fontSize:"24px"}}>🔵</span>
            <div>
              <p style={{fontWeight:"600",color:"var(--text)",marginBottom:"2px"}}>{t(lang, "bluetoothLabel")}</p>
              <p style={{fontSize:"0.8rem",color:"var(--muted)"}}>{bluetooth ? (lang === "HI" ? "चालू" : lang === "MR" ? "चालू" : "On") : (lang === "HI" ? "बंद" : lang === "MR" ? "बंद" : "Off")}</p>
            </div>
          </div>
          <div className={`toggle-switch ${bluetooth ? "active" : ""}`} />
        </div>

        {/* Airplane Mode */}
        <div className="toggle-container" onClick={() => { setAirplane(!airplane); showTip("airplane"); if(!airplane){ setWifi(false); setBluetooth(false); } }}>
          <div style={{display:"flex",alignItems:"center",gap:"12px"}}>
            <span style={{fontSize:"24px"}}>✈️</span>
            <div>
              <p style={{fontWeight:"600",color:"var(--text)",marginBottom:"2px"}}>{lang === "HI" ? "हवाई जहाज़ मोड" : lang === "MR" ? "विमान मोड" : "Airplane Mode"}</p>
              <p style={{fontSize:"0.8rem",color:"var(--muted)"}}>{airplane ? (lang === "HI" ? "चालू" : lang === "MR" ? "चालू" : "On") : (lang === "HI" ? "बंद" : lang === "MR" ? "बंद" : "Off")}</p>
            </div>
          </div>
          <div className={`toggle-switch ${airplane ? "active" : ""}`} />
        </div>

        {/* Brightness */}
        <div style={{padding:"16px 20px",background:"var(--surface-glass)",border:"1px solid var(--border)",borderRadius:"14px",marginBottom:"12px"}}>
          <div style={{display:"flex",alignItems:"center",gap:"12px",marginBottom:"12px"}}>
            <span style={{fontSize:"24px"}}>🔆</span>
            <p style={{fontWeight:"600",color:"var(--text)"}}>{t(lang, "brightnessLabel")}: {brightness}%</p>
          </div>
          <input type="range" min="0" max="100" value={brightness} onChange={e => { setBrightness(e.target.value); showTip("brightness"); }} className="range-slider" />
        </div>
      </div>

      {/* Tips learned */}
      {tips.length > 0 && (
        <div className="card" style={{borderLeft:"4px solid var(--accent)"}}>
          <h3 style={{marginBottom:"12px"}}>💡 {lang === "HI" ? "सीखी गई टिप्स" : lang === "MR" ? "शिकलेल्या टिप्स" : "Tips Learned"}</h3>
          {tips.map((tip, i) => (
            <p key={i} style={{padding:"6px 0",fontSize:"0.95rem"}}>{tip}</p>
          ))}
        </div>
      )}
    </div>
  );
}

export default PhoneSettings;
