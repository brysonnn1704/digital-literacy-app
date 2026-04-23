import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { logoutUser, isLoggedIn, getUser } from "../utils/auth";
import { t } from "../utils/translate";
import "../App.css";

function Navbar({
  toggleTheme,
  theme,
  increaseFont,
  decreaseFont,
  language,
  changeLanguage
}) {

  const loggedIn = isLoggedIn();
  const user = getUser();
  const navigate = useNavigate();
  const [showSOS, setShowSOS] = useState(false);

  return (
    <>
      <nav style={navStyle}>
        <div style={innerNav}>

          {/* LEFT: LOGO + LINKS */}
          <div style={leftContainer}>
            <div style={logoStyle} onClick={() => navigate("/")}>
              <span style={logoIconStyle}>🛡️</span>
              <span style={logoTextStyle}>DigiSaathi</span>
            </div>

            {loggedIn && (
              <div style={linkContainer}>
                <Link to="/dashboard" style={linkStyle}>
                  <span style={linkIconStyle}>📊</span>
                  {t(language, "dashboard")}
                </Link>
                <Link to="/lessons" style={linkStyle}>
                  <span style={linkIconStyle}>📚</span>
                  {t(language, "lessons")}
                </Link>
                <Link to="/profile" style={linkStyle}>
                  <span style={linkIconStyle}>👤</span>
                  {t(language, "profile")}
                </Link>
                <Link to="/scam-analyzer" style={linkStyle}>
                  <span style={linkIconStyle}>🔍</span>
                  {t(language, "analyzer")}
                </Link>
                <Link to="/help" style={linkStyle}>
                  <span style={linkIconStyle}>🆘</span>
                  {t(language, "helpCenter")}
                </Link>
              </div>
            )}
          </div>

          {/* RIGHT: SETTINGS */}
          <div style={rightContainer}>

            <div style={controlGroup}>
              <button onClick={decreaseFont} style={controlBtn} title="Decrease font">
                A−
              </button>
              <button onClick={increaseFont} style={controlBtn} title="Increase font">
                A+
              </button>
            </div>

            <select
              value={language}
              onChange={(e) => changeLanguage(e.target.value)}
              style={selectStyle}
            >
              <option value="EN">EN 🇬🇧</option>
              <option value="HI">हिंदी 🇮🇳</option>
              <option value="MR">मराठी 🇮🇳</option>
            </select>

            <button onClick={toggleTheme} style={themeBtn}>
              {theme === "light" ? "🌙" : "☀️"}
            </button>

            {loggedIn && (
              <div style={userSection}>
                <div style={avatarStyle}>
                  {user?.name?.charAt(0)?.toUpperCase() || "U"}
                </div>
                <span style={userNameStyle}>{user?.name}</span>

                <button
                  onClick={() => {
                    logoutUser();
                    navigate("/login");
                  }}
                  style={logoutStyle}
                >
                  {t(language, "logout")}
                </button>
              </div>
            )}

          </div>

        </div>
      </nav>

      {/* Floating SOS Button */}
      <button style={sosFloatStyle} onClick={() => setShowSOS(true)} title="SOS - Emergency Help">
        🆘
      </button>

      {/* SOS Modal */}
      {showSOS && (
        <div style={sosOverlayStyle} onClick={() => setShowSOS(false)}>
          <div style={sosModalStyle} onClick={e => e.stopPropagation()}>
            <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:"20px"}}>
              <h2 style={{fontSize:"1.4rem",margin:0}}>🚨 {language === "HI" ? "आपातकालीन मदद" : language === "MR" ? "आपत्कालीन मदत" : "Emergency Help"}</h2>
              <button onClick={() => setShowSOS(false)} style={{background:"none",border:"none",fontSize:"20px",cursor:"pointer",color:"var(--muted)"}}>✕</button>
            </div>

            <a href="tel:1930" style={sosLinkStyle}>
              <div style={{display:"flex",alignItems:"center",gap:"12px"}}>
                <span style={{fontSize:"28px"}}>📞</span>
                <div>
                  <p style={{fontWeight:"700",fontSize:"1.1rem",color:"#ef4444"}}>1930</p>
                  <p style={{fontSize:"0.8rem",color:"var(--muted)"}}>{language === "HI" ? "साइबर अपराध हेल्पलाइन" : language === "MR" ? "सायबर गुन्हे हेल्पलाइन" : "Cyber Crime Helpline"}</p>
                </div>
              </div>
              <span style={{color:"var(--primary)",fontWeight:"600",fontSize:"0.9rem"}}>{t(language, "callNow")} →</span>
            </a>

            <a href="tel:100" style={sosLinkStyle}>
              <div style={{display:"flex",alignItems:"center",gap:"12px"}}>
                <span style={{fontSize:"28px"}}>🚔</span>
                <div>
                  <p style={{fontWeight:"700",fontSize:"1.1rem",color:"var(--primary)"}}>100</p>
                  <p style={{fontSize:"0.8rem",color:"var(--muted)"}}>{language === "HI" ? "पुलिस" : language === "MR" ? "पोलीस" : "Police"}</p>
                </div>
              </div>
              <span style={{color:"var(--primary)",fontWeight:"600",fontSize:"0.9rem"}}>{t(language, "callNow")} →</span>
            </a>

            <a href="tel:112" style={sosLinkStyle}>
              <div style={{display:"flex",alignItems:"center",gap:"12px"}}>
                <span style={{fontSize:"28px"}}>🆘</span>
                <div>
                  <p style={{fontWeight:"700",fontSize:"1.1rem",color:"#f59e0b"}}>112</p>
                  <p style={{fontSize:"0.8rem",color:"var(--muted)"}}>{language === "HI" ? "आपातकालीन सेवा" : language === "MR" ? "आपत्कालीन सेवा" : "Emergency Services"}</p>
                </div>
              </div>
              <span style={{color:"var(--primary)",fontWeight:"600",fontSize:"0.9rem"}}>{t(language, "callNow")} →</span>
            </a>

            <button onClick={() => { setShowSOS(false); navigate("/help"); }} style={{marginTop:"16px",width:"100%",padding:"16px 24px",fontSize:"16px",fontWeight:"700",fontFamily:"'Inter', sans-serif",borderRadius:"12px",border:"none",background:"linear-gradient(135deg,var(--primary),var(--primary-dark))",color:"white",cursor:"pointer",transition:"all 0.3s",boxShadow:"0 4px 20px rgba(99,102,241,0.3)"}}>
              📖 {t(language, "helpCenter")}
            </button>
          </div>
        </div>
      )}
    </>
  );
}

/* ═══════ STYLES ═══════ */

const navStyle = {
  background: "var(--card)",
  backdropFilter: "blur(20px)",
  WebkitBackdropFilter: "blur(20px)",
  borderBottom: "1px solid var(--card-border)",
  position: "sticky",
  top: 0,
  zIndex: 100,
  boxShadow: "0 1px 20px rgba(0,0,0,0.05)"
};

const innerNav = {
  maxWidth: "1200px",
  margin: "0 auto",
  padding: "12px 24px",
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  flexWrap: "wrap",
  gap: "12px"
};

const leftContainer = {
  display: "flex",
  alignItems: "center",
  gap: "24px",
  flexWrap: "wrap"
};

const logoStyle = {
  display: "flex",
  alignItems: "center",
  gap: "10px",
  cursor: "pointer"
};

const logoIconStyle = {
  fontSize: "26px"
};

const logoTextStyle = {
  fontWeight: "800",
  fontSize: "22px",
  background: "linear-gradient(135deg, var(--primary), var(--accent))",
  WebkitBackgroundClip: "text",
  WebkitTextFillColor: "transparent",
  backgroundClip: "text"
};

const linkContainer = {
  display: "flex",
  gap: "4px",
  flexWrap: "wrap"
};

const linkStyle = {
  textDecoration: "none",
  color: "var(--text-secondary)",
  fontWeight: "500",
  fontSize: "13px",
  padding: "8px 12px",
  borderRadius: "10px",
  transition: "all 0.2s",
  display: "flex",
  alignItems: "center",
  gap: "5px"
};

const linkIconStyle = {
  fontSize: "14px"
};

const rightContainer = {
  display: "flex",
  alignItems: "center",
  gap: "8px",
  flexWrap: "wrap"
};

const controlGroup = {
  display: "flex",
  gap: "2px",
  background: "var(--surface-glass)",
  borderRadius: "10px",
  border: "1px solid var(--border)",
  overflow: "hidden"
};

const controlBtn = {
  padding: "7px 12px",
  border: "none",
  background: "transparent",
  cursor: "pointer",
  fontSize: "13px",
  fontWeight: "600",
  color: "var(--text-secondary)",
  fontFamily: "'Inter', sans-serif",
  transition: "all 0.2s"
};

const selectStyle = {
  padding: "7px 12px",
  borderRadius: "10px",
  border: "1px solid var(--border)",
  background: "var(--surface-glass)",
  cursor: "pointer",
  fontSize: "13px",
  fontWeight: "500",
  color: "var(--text)",
  fontFamily: "'Inter', 'Noto Sans Devanagari', sans-serif",
  outline: "none",
  minHeight: "auto",
  width: "auto"
};

const themeBtn = {
  padding: "7px 12px",
  borderRadius: "10px",
  border: "1px solid var(--border)",
  background: "var(--surface-glass)",
  cursor: "pointer",
  fontSize: "16px",
  transition: "all 0.2s"
};

const userSection = {
  display: "flex",
  alignItems: "center",
  gap: "10px",
  marginLeft: "6px"
};

const avatarStyle = {
  width: "34px",
  height: "34px",
  borderRadius: "999px",
  background: "linear-gradient(135deg, var(--primary), var(--accent))",
  color: "white",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  fontWeight: "700",
  fontSize: "14px"
};

const userNameStyle = {
  fontWeight: "600",
  fontSize: "14px",
  color: "var(--text)"
};

const logoutStyle = {
  background: "linear-gradient(135deg, #ef4444, #dc2626)",
  color: "white",
  border: "none",
  padding: "7px 16px",
  borderRadius: "10px",
  fontWeight: "600",
  fontSize: "13px",
  cursor: "pointer",
  fontFamily: "'Inter', sans-serif",
  transition: "all 0.2s"
};

const sosLinkStyle = {
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  padding: "16px",
  background: "var(--surface-glass)",
  border: "1px solid var(--border)",
  borderRadius: "14px",
  marginBottom: "10px",
  textDecoration: "none",
  color: "inherit",
  transition: "all 0.2s"
};

const sosFloatStyle = {
  position: "fixed",
  bottom: "28px",
  right: "28px",
  width: "64px",
  height: "64px",
  borderRadius: "50%",
  background: "linear-gradient(135deg, #ef4444, #dc2626)",
  color: "white",
  border: "none",
  fontSize: "28px",
  fontWeight: "800",
  cursor: "pointer",
  boxShadow: "0 6px 24px rgba(239, 68, 68, 0.4)",
  zIndex: 999,
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  transition: "all 0.3s",
  fontFamily: "'Inter', sans-serif"
};

const sosOverlayStyle = {
  position: "fixed",
  top: 0, left: 0, right: 0, bottom: 0,
  background: "rgba(0,0,0,0.5)",
  backdropFilter: "blur(8px)",
  WebkitBackdropFilter: "blur(8px)",
  zIndex: 1000,
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  padding: "20px"
};

const sosModalStyle = {
  background: "var(--card)",
  border: "1px solid var(--card-border)",
  borderRadius: "24px",
  padding: "32px",
  maxWidth: "420px",
  width: "100%",
  boxShadow: "0 20px 60px rgba(0,0,0,0.15)"
};

export default Navbar;