import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { logoutUser, isLoggedIn, getUser } from "../utils/auth";
import { t } from "../utils/translate";

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

  return (
    <div style={navStyle}>

      {/* LEFT: LOGO + LINKS */}
      <div style={leftContainer}>

        <div style={logoStyle} onClick={() => navigate("/")}>
          Digital Literacy
        </div>

        {loggedIn && (
          <div style={linkContainer}>
            <Link to="/dashboard" style={linkStyle}>{t(language, "dashboard")}</Link>
            <Link to="/lessons" style={linkStyle}>{t(language, "lessons")}</Link>
            <Link to="/profile" style={linkStyle}>{t(language, "profile")}</Link>
            <Link to="/scam-analyzer" style={linkStyle}>Analyzer</Link>
          </div>
        )}

      </div>

      {/* RIGHT: SETTINGS */}
      <div style={rightContainer}>

        <button onClick={decreaseFont} style={btn}>A−</button>
        <button onClick={increaseFont} style={btn}>A+</button>

        <select
          value={language}
          onChange={(e) => changeLanguage(e.target.value)}
          style={btn}
        >
          <option value="EN">EN</option>
          <option value="HI">हिंदी</option>
          <option value="MR">मराठी</option>
        </select>

        <button onClick={toggleTheme} style={btn}>
          {theme === "light" ? "🌙" : "☀"}
        </button>

        {loggedIn && (
          <>
            <span>{user?.name}</span>

            <button
              onClick={() => {
                logoutUser();
                navigate("/login");
              }}
              style={logoutStyle}
            >
              {t(language, "logout")}
            </button>
          </>
        )}

      </div>

    </div>
  );
}

/* STYLES */

const navStyle = {
  background: "var(--card)",
  padding: "12px 24px",
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  borderBottom: "1px solid #ddd"
};

const leftContainer = {
  display: "flex",
  alignItems: "center",
  gap: "25px"
};

const logoStyle = {
  fontWeight: "bold",
  fontSize: "20px",
  cursor: "pointer"
};

const linkContainer = {
  display: "flex",
  gap: "15px"
};

const rightContainer = {
  display: "flex",
  alignItems: "center",
  gap: "10px"
};

const linkStyle = {
  textDecoration: "none",
  color: "var(--text)",
  fontWeight: "500"
};

const btn = {
  padding: "6px 10px",
  borderRadius: "6px",
  border: "1px solid #ccc",
  background: "var(--card)",
  cursor: "pointer"
};

const logoutStyle = {
  background: "red",
  color: "white",
  border: "none",
  padding: "6px 10px",
  borderRadius: "6px"
};

export default Navbar;