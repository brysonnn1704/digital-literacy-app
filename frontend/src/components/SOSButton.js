import React, { useState } from "react";
import { t } from "../utils/translate";

function SOSButton({ language }) {
  const [open, setOpen] = useState(false);

  return (
    <>
      <button 
        onClick={() => setOpen(!open)}
        style={sosBtnStyle}
        title={t(language, "sosHelp")}
      >
        🚨
      </button>

      {open && (
        <div style={sosPopupStyle}>
          <h3 style={{ margin: "0 0 10px 0", color: "#ef4444" }}>{t(language, "sosHelp")}</h3>
          
          <div style={sosItemStyle}>
            <span style={{ fontSize: "20px" }}>📞</span>
            <div>
              <strong>{t(language, "sosHelpline")}</strong>
              <p style={{ margin: "2px 0 0 0", fontSize: "14px", color: "var(--muted)" }}>National Cyber Crime Reporting Portal</p>
              <a href="tel:1930" style={callBtnStyle}>Call 1930</a>
            </div>
          </div>

          <div style={sosItemStyle}>
            <span style={{ fontSize: "20px" }}>🏦</span>
            <div>
              <strong>{t(language, "sosBlock")}</strong>
              <p style={{ margin: "2px 0 0 0", fontSize: "14px", color: "var(--muted)" }}>Contact your bank immediately</p>
            </div>
          </div>
          
          <button onClick={() => setOpen(false)} style={closeBtnStyle}>Close</button>
        </div>
      )}
    </>
  );
}

const sosBtnStyle = {
  position: "fixed",
  bottom: "20px",
  right: "20px",
  width: "60px",
  height: "60px",
  borderRadius: "50%",
  background: "linear-gradient(135deg, #ef4444, #dc2626)",
  color: "white",
  border: "none",
  fontSize: "28px",
  boxShadow: "0 4px 15px rgba(239, 68, 68, 0.4)",
  cursor: "pointer",
  zIndex: 1000,
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  animation: "iconPulse 2s infinite"
};

const sosPopupStyle = {
  position: "fixed",
  bottom: "90px",
  right: "20px",
  width: "300px",
  background: "var(--card)",
  backdropFilter: "blur(20px)",
  border: "1px solid var(--card-border)",
  borderRadius: "16px",
  padding: "20px",
  boxShadow: "0 10px 30px rgba(0,0,0,0.15)",
  zIndex: 1000,
  animation: "fadeSlideUp 0.3s ease-out"
};

const sosItemStyle = {
  display: "flex",
  alignItems: "flex-start",
  gap: "12px",
  padding: "12px",
  background: "var(--surface-glass)",
  borderRadius: "10px",
  marginBottom: "10px",
  border: "1px solid var(--border)"
};

const callBtnStyle = {
  display: "inline-block",
  marginTop: "8px",
  padding: "6px 16px",
  background: "#ef4444",
  color: "white",
  textDecoration: "none",
  borderRadius: "8px",
  fontWeight: "bold",
  fontSize: "14px"
};

const closeBtnStyle = {
  width: "100%",
  padding: "10px",
  background: "var(--surface-glass)",
  border: "1px solid var(--border)",
  color: "var(--text)",
  borderRadius: "8px",
  marginTop: "5px",
  cursor: "pointer",
  fontWeight: "bold"
};

export default SOSButton;
