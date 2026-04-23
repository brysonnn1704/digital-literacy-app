import React, { useState, useEffect, useRef, useCallback } from "react";
import { Link } from "react-router-dom";
import { loginUser } from "../utils/auth";

/* ═══════════════════════════════════════════════════════
   DOODLE LOGIN PAGE — Interactive characters with eye tracking
   ═══════════════════════════════════════════════════════ */

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [passwordFocused, setPasswordFocused] = useState(false);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [blinkStates, setBlinkStates] = useState([false, false, false, false]);
  const containerRef = useRef(null);

  /* ─── Auth Logic ─── */
  const handleLogin = async () => {
    if (!email || !password) { alert("Please enter email and password"); return; }
    try {
      setLoading(true);
      const res = await fetch(`${process.env.REACT_APP_API_URL || "http://localhost:5005"}/login`, {
        method: "POST", headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password })
      });
      const data = await res.json();
      if (data.success) { loginUser(data.user); window.location.href = "/lessons"; }
      else { alert("Invalid credentials"); }
    } catch (err) { console.error(err); alert("Server error"); }
    finally { setLoading(false); }
  };

  /* ─── Mouse tracking ─── */
  const handleMouseMove = useCallback((e) => {
    setMousePos({ x: e.clientX, y: e.clientY });
  }, []);

  useEffect(() => {
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [handleMouseMove]);

  /* ─── Random blinking ─── */
  useEffect(() => {
    const intervals = [0, 1, 2, 3].map((i) => {
      const delay = 2000 + Math.random() * 3000;
      return setInterval(() => {
        setBlinkStates(prev => {
          const next = [...prev];
          next[i] = true;
          return next;
        });
        setTimeout(() => {
          setBlinkStates(prev => {
            const next = [...prev];
            next[i] = false;
            return next;
          });
        }, 150);
      }, delay);
    });
    return () => intervals.forEach(clearInterval);
  }, []);

  /* ─── Pupil position calculator ─── */
  const getPupilOffset = (eyeCenterX, eyeCenterY, maxRadius = 10) => {
    if (passwordFocused) {
      return { x: -maxRadius * 1.8, y: maxRadius * 0.6 };
    }
    const dx = mousePos.x - eyeCenterX;
    const dy = mousePos.y - eyeCenterY;
    const dist = Math.sqrt(dx * dx + dy * dy);
    const clampedDist = Math.min(dist, 400);
    const ratio = Math.pow(clampedDist / 400, 0.6);
    const angle = Math.atan2(dy, dx);
    return {
      x: Math.cos(angle) * maxRadius * ratio,
      y: Math.sin(angle) * maxRadius * ratio
    };
  };

  /* ─── Eye component ─── */
  const Eye = ({ cx, cy, size = 30, pupilSize = 14, charIndex, maxPupilMove = 10 }) => {
    const offset = getPupilOffset(cx, cy, maxPupilMove);
    const isBlink = blinkStates[charIndex];
    return (
      <div style={{
        position: "absolute",
        left: cx - size / 2,
        top: cy - size / 2,
        width: size,
        height: isBlink ? 4 : size,
        borderRadius: "50%",
        background: "radial-gradient(circle at 40% 35%, #ffffff, #e8e8f0)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        transition: "height 0.1s ease",
        overflow: "hidden",
        boxShadow: "inset 0 3px 6px rgba(0,0,0,0.15), 0 2px 8px rgba(0,0,0,0.2)",
      }}>
        {!isBlink && (
          <div style={{
            width: pupilSize,
            height: pupilSize,
            borderRadius: "50%",
            background: "radial-gradient(circle at 40% 35%, #2d2d44, #0a0a14)",
            transform: `translate(${offset.x}px, ${offset.y}px)`,
            transition: passwordFocused ? "transform 0.5s ease-in-out" : "transform 0.08s ease-out",
            position: "relative",
            boxShadow: "0 1px 3px rgba(0,0,0,0.3)",
          }}>
            <div style={{
              position: "absolute",
              top: 2,
              left: pupilSize * 0.5,
              width: pupilSize * 0.3,
              height: pupilSize * 0.3,
              borderRadius: "50%",
              background: "rgba(255,255,255,0.85)",
            }} />
          </div>
        )}
      </div>
    );
  };

  /* ─── Character definitions ─── */
  const characters = [
    { // Purple tall rounded rectangle
      shape: "roundedRect",
      color: "#7c5cbf",
      glow: "rgba(124,92,191,0.4)",
      x: 30, y: 70, w: 110, h: 150, radius: 28,
      eyes: [{ cx: 58, cy: 130 }, { cx: 100, cy: 130 }],
      eyeSize: 28, pupilSize: 13, floatDelay: 0,
    },
    { // Orange large circle
      shape: "circle",
      color: "#f4845f",
      glow: "rgba(244,132,95,0.35)",
      x: 10, y: 180, w: 160, h: 160, radius: 80,
      eyes: [{ cx: 60, cy: 245 }, { cx: 115, cy: 245 }],
      eyeSize: 32, pupilSize: 15, floatDelay: 0.5,
    },
    { // Dark gray small rounded rect
      shape: "roundedRect",
      color: "#3d3d56",
      glow: "rgba(61,61,86,0.3)",
      x: 115, y: 135, w: 85, h: 115, radius: 20,
      eyes: [{ cx: 137, cy: 182 }, { cx: 172, cy: 182 }],
      eyeSize: 24, pupilSize: 11, floatDelay: 1,
    },
    { // Yellow dome / pill
      shape: "dome",
      color: "#f2c14e",
      glow: "rgba(242,193,78,0.35)",
      x: 170, y: 175, w: 105, h: 125, radius: 52,
      eyes: [{ cx: 198, cy: 218 }, { cx: 245, cy: 218 }],
      eyeSize: 30, pupilSize: 14, floatDelay: 1.5,
      mouth: true,
    },
  ];

  /* ═══════ STYLES ═══════ */
  const pageStyle = {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    minHeight: "calc(100vh - 70px)",
    padding: "20px",
    background: "linear-gradient(135deg, #0f0c29 0%, #1a1a2e 40%, #16213e 100%)",
    overflow: "hidden",
    fontFamily: "'Inter', 'Segoe UI', sans-serif",
  };

  const splitContainerStyle = {
    display: "flex",
    width: "100%",
    maxWidth: "900px",
    minHeight: "540px",
    borderRadius: "28px",
    overflow: "hidden",
    boxShadow: "0 30px 80px rgba(0,0,0,0.4), 0 0 0 1px rgba(255,255,255,0.06)",
    background: "rgba(255,255,255,0.03)",
    backdropFilter: "blur(40px)",
    border: "1px solid rgba(255,255,255,0.08)",
  };

  const leftPanelStyle = {
    width: "40%",
    background: "linear-gradient(160deg, #0d0d1a 0%, #1a1a2e 100%)",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    position: "relative",
    overflow: "hidden",
    padding: "40px 20px",
  };

  const rightPanelStyle = {
    width: "60%",
    padding: "48px 44px",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    background: "rgba(22,33,62,0.6)",
    backdropFilter: "blur(30px)",
  };

  const inputStyle = {
    width: "100%",
    padding: "14px 18px",
    fontSize: "15px",
    border: "1.5px solid rgba(255,255,255,0.1)",
    borderRadius: "12px",
    background: "rgba(255,255,255,0.05)",
    color: "#e0e0e0",
    outline: "none",
    fontFamily: "'Inter', sans-serif",
    boxSizing: "border-box",
    transition: "border-color 0.3s, box-shadow 0.3s",
  };

  const labelStyle = {
    display: "block",
    fontSize: "13px",
    fontWeight: "600",
    color: "rgba(255,255,255,0.5)",
    marginBottom: "8px",
    letterSpacing: "0.5px",
    textTransform: "uppercase",
  };

  /* ═══════ CSS keyframes injected via style tag ═══════ */
  const keyframesCSS = `
    @keyframes doodleFloat0 { 0%,100% { transform: translateY(0px); } 50% { transform: translateY(-8px); } }
    @keyframes doodleFloat1 { 0%,100% { transform: translateY(0px); } 50% { transform: translateY(-6px); } }
    @keyframes doodleFloat2 { 0%,100% { transform: translateY(0px); } 50% { transform: translateY(-10px); } }
    @keyframes doodleFloat3 { 0%,100% { transform: translateY(0px); } 50% { transform: translateY(-7px); } }
    @keyframes subtlePulse { 0%,100% { opacity: 0.4; } 50% { opacity: 0.7; } }
    @keyframes loginGlowShift { 0%,100% { background-position: 0% 50%; } 50% { background-position: 100% 50%; } }
  `;

  return (
    <>
      <style>{keyframesCSS}</style>
      <div style={pageStyle} ref={containerRef}>
        <div style={splitContainerStyle}>

          {/* ═══════ LEFT PANEL — Doodle Characters ═══════ */}
          <div style={leftPanelStyle}>
            {/* Background glow orbs */}
            <div style={{
              position: "absolute", top: -40, left: -40, width: 150, height: 150,
              borderRadius: "50%", background: "rgba(124,92,191,0.12)", filter: "blur(60px)",
              animation: "subtlePulse 4s ease-in-out infinite",
            }} />
            <div style={{
              position: "absolute", bottom: -30, right: -30, width: 120, height: 120,
              borderRadius: "50%", background: "rgba(242,193,78,0.1)", filter: "blur(50px)",
              animation: "subtlePulse 5s ease-in-out infinite 1s",
            }} />

            {/* Doodle scene */}
            <div style={{
              position: "relative",
              width: 280,
              height: 340,
              transform: passwordFocused ? "translateX(-8px)" : "translateX(0)",
              transition: "transform 0.6s ease-in-out",
            }}>
              {characters.map((char, idx) => {
                const floatAnim = `doodleFloat${idx} ${3 + idx * 0.5}s ease-in-out infinite`;
                const shapeStyle = {
                  position: "absolute",
                  left: char.x,
                  top: char.y,
                  width: char.w,
                  height: char.h,
                  background: char.color,
                  boxShadow: `0 8px 30px ${char.glow}, inset 0 -4px 12px rgba(0,0,0,0.15)`,
                  animation: floatAnim,
                  animationDelay: `${char.floatDelay}s`,
                  transition: "transform 0.5s ease-in-out",
                  transform: passwordFocused ? `rotate(${idx % 2 === 0 ? -8 : 8}deg)` : "rotate(0deg)",
                };

                if (char.shape === "circle") {
                  shapeStyle.borderRadius = "50%";
                } else if (char.shape === "dome") {
                  shapeStyle.borderRadius = "50px 50px 20px 20px";
                } else {
                  shapeStyle.borderRadius = `${char.radius}px`;
                }

                return (
                  <div key={idx} style={shapeStyle}>
                    {/* Eyes */}
                    {char.eyes.map((eye, eIdx) => (
                      <Eye
                        key={eIdx}
                        cx={eye.cx - char.x}
                        cy={eye.cy - char.y}
                        size={char.eyeSize}
                        pupilSize={char.pupilSize}
                        charIndex={idx}
                        maxPupilMove={char.eyeSize * 0.25}
                      />
                    ))}
                    {/* Mouth for yellow character */}
                    {char.mouth && (
                      <div style={{
                        position: "absolute",
                        left: "50%",
                        transform: "translateX(-50%)",
                        top: char.eyes[0].cy - char.y + 22,
                        width: 30,
                        height: 3,
                        borderRadius: 2,
                        background: "rgba(0,0,0,0.25)",
                        transition: "all 0.4s ease",
                        ...(passwordFocused ? { width: 20, borderRadius: "0 0 10px 10px", height: 4 } : {}),
                      }} />
                    )}
                  </div>
                );
              })}
            </div>

            {/* Privacy message */}
            <div style={{
              opacity: passwordFocused ? 1 : 0,
              transform: passwordFocused ? "translateY(0)" : "translateY(10px)",
              transition: "all 0.4s ease",
              textAlign: "center",
              color: "rgba(255,255,255,0.4)",
              fontSize: "12px",
              marginTop: "8px",
              letterSpacing: "0.5px",
            }}>
              🙈 We're not looking!
            </div>
          </div>

          {/* ═══════ RIGHT PANEL — Login Form ═══════ */}
          <div style={rightPanelStyle}>
            {/* Icon */}
            <div style={{
              width: 56, height: 56, borderRadius: 16,
              background: "linear-gradient(135deg, rgba(124,92,191,0.2), rgba(99,102,241,0.15))",
              display: "flex", alignItems: "center", justifyContent: "center",
              fontSize: 24, marginBottom: 20,
              border: "1px solid rgba(255,255,255,0.08)",
              boxShadow: "0 4px 20px rgba(124,92,191,0.15)",
            }}>🛡️</div>

            <h2 style={{
              fontSize: "1.75rem", fontWeight: 800, color: "#ffffff",
              marginBottom: 6, letterSpacing: "-0.5px",
            }}>Welcome Back</h2>
            <p style={{
              color: "rgba(255,255,255,0.4)", fontSize: "0.9rem",
              marginBottom: 32, lineHeight: 1.5,
            }}>Sign in to continue your learning journey</p>

            {/* Email */}
            <div style={{ marginBottom: 20 }}>
              <label style={labelStyle}>Email</label>
              <input
                placeholder="you@example.com"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                onKeyDown={(e) => { if (e.key === "Enter") handleLogin(); }}
                style={inputStyle}
                onFocus={(e) => { e.target.style.borderColor = "rgba(124,92,191,0.5)"; e.target.style.boxShadow = "0 0 0 3px rgba(124,92,191,0.1)"; }}
                onBlur={(e) => { e.target.style.borderColor = "rgba(255,255,255,0.1)"; e.target.style.boxShadow = "none"; }}
              />
            </div>

            {/* Password */}
            <div style={{ marginBottom: 28 }}>
              <label style={labelStyle}>Password</label>
              <input
                type="password"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                onKeyDown={(e) => { if (e.key === "Enter") handleLogin(); }}
                onFocus={(e) => {
                  setPasswordFocused(true);
                  e.target.style.borderColor = "rgba(242,193,78,0.5)";
                  e.target.style.boxShadow = "0 0 0 3px rgba(242,193,78,0.1)";
                }}
                onBlur={(e) => {
                  setPasswordFocused(false);
                  e.target.style.borderColor = "rgba(255,255,255,0.1)";
                  e.target.style.boxShadow = "none";
                }}
                style={inputStyle}
              />
            </div>

            {/* Sign In Button */}
            <button
              onClick={handleLogin}
              disabled={loading}
              onMouseEnter={(e) => { e.target.style.transform = "translateY(-2px)"; e.target.style.boxShadow = "0 8px 30px rgba(124,92,191,0.4)"; }}
              onMouseLeave={(e) => { e.target.style.transform = "translateY(0)"; e.target.style.boxShadow = "0 4px 20px rgba(124,92,191,0.25)"; }}
              style={{
                width: "100%",
                padding: "16px 24px",
                fontSize: "16px",
                fontWeight: 700,
                fontFamily: "'Inter', sans-serif",
                borderRadius: "14px",
                border: "none",
                background: "linear-gradient(135deg, #7c5cbf 0%, #6366f1 50%, #8b5cf6 100%)",
                backgroundSize: "200% 200%",
                animation: "loginGlowShift 3s ease infinite",
                color: "white",
                cursor: loading ? "not-allowed" : "pointer",
                opacity: loading ? 0.7 : 1,
                transition: "all 0.3s ease",
                boxShadow: "0 4px 20px rgba(124,92,191,0.25)",
                letterSpacing: "0.3px",
              }}
            >
              {loading ? "Signing in..." : "Sign In →"}
            </button>

            <p style={{
              textAlign: "center", marginTop: 24, fontSize: "14px",
              color: "rgba(255,255,255,0.35)",
            }}>
              Don't have an account?{" "}
              <Link to="/register" style={{
                color: "#a78bfa", fontWeight: 600,
                textDecoration: "none", transition: "color 0.2s",
              }}>Create one</Link>
            </p>
          </div>
        </div>
      </div>
    </>
  );
}

export default Login;