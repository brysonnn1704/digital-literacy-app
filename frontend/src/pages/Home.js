import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { isLoggedIn } from "../utils/auth";
import { speak } from "../utils/speak";

function Home({ language }) {
  const navigate = useNavigate();
  const loggedIn = isLoggedIn();
  const lang = language || "EN";

  const text = {
    EN: {
      title: "Digital Literacy Platform",
      subtitle: "Your shield against digital threats",
      desc: "Learn to navigate digital services safely with interactive lessons, real-world simulations, and AI-powered scam detection.",
      lessons: "Explore Lessons",
      login: "Login",
      register: "Create Account",
      whatLearn: "What You'll Learn",
      howItWorks: "How It Works",
      features: [
        { icon: "💳", title: "UPI Safety", desc: "Master safe digital payments", id: 1 },
        { icon: "🛡️", title: "Scam Detection", desc: "Identify fraud in real-time", id: 2 },
        { icon: "🌐", title: "Web Safety", desc: "Spot fake websites securely", id: 3 },
        { icon: "💬", title: "WhatsApp Safety", desc: "Use messaging apps safely", id: 4 },
        { icon: "🔍", title: "Google Search", desc: "Find reliable information", id: 5 },
        { icon: "📧", title: "Email Basics", desc: "Spot phishing emails", id: 8 }
      ],
      steps: [
        { title: "Create Account", desc: "Sign up with your name & email" },
        { title: "Watch Videos", desc: "Learn from easy video tutorials" },
        { title: "Practice", desc: "Try interactive simulations" },
        { title: "Get Certificate", desc: "Complete all lessons & earn certificate" }
      ]
    },
    HI: {
      title: "डिजिटल साक्षरता प्लेटफॉर्म",
      subtitle: "डिजिटल खतरों से आपकी ढाल",
      desc: "इंटरएक्टिव पाठों, वास्तविक सिमुलेशन और AI स्कैम डिटेक्शन के साथ डिजिटल सेवाओं को सुरक्षित रूप से सीखें।",
      lessons: "पाठ देखें",
      login: "लॉगिन",
      register: "खाता बनाएं",
      whatLearn: "आप क्या सीखेंगे",
      howItWorks: "कैसे काम करता है",
      features: [
        { icon: "💳", title: "UPI सुरक्षा", desc: "सुरक्षित डिजिटल भुगतान सीखें", id: 1 },
        { icon: "🛡️", title: "स्कैम डिटेक्शन", desc: "धोखाधड़ी की पहचान करें", id: 2 },
        { icon: "🌐", title: "वेब सुरक्षा", desc: "नकली वेबसाइट्स को पहचानें", id: 3 },
        { icon: "💬", title: "व्हाट्सएप सुरक्षा", desc: "मैसेजिंग ऐप सुरक्षित उपयोग करें", id: 4 },
        { icon: "🔍", title: "गूगल सर्च", desc: "सही जानकारी खोजें", id: 5 },
        { icon: "📧", title: "ईमेल बेसिक", desc: "फिशिंग ईमेल पहचानें", id: 8 }
      ],
      steps: [
        { title: "खाता बनाएं", desc: "नाम और ईमेल से साइन अप करें" },
        { title: "वीडियो देखें", desc: "आसान वीडियो से सीखें" },
        { title: "अभ्यास करें", desc: "इंटरएक्टिव सिमुलेशन आज़माएं" },
        { title: "प्रमाणपत्र पाएं", desc: "सभी पाठ पूरे करें" }
      ]
    },
    MR: {
      title: "डिजिटल साक्षरता प्लॅटफॉर्म",
      subtitle: "डिजिटल धोक्यांपासून तुमची ढाल",
      desc: "इंटरएक्टिव्ह धडे, वास्तव सिम्युलेशन आणि AI स्कॅम डिटेक्शनसह डिजिटल सेवा सुरक्षित शिका.",
      lessons: "धडे पहा",
      login: "लॉगिन",
      register: "खाते तयार करा",
      whatLearn: "तुम्ही काय शिकाल",
      howItWorks: "कसे काम करते",
      features: [
        { icon: "💳", title: "UPI सुरक्षा", desc: "सुरक्षित डिजिटल पेमेंट", id: 1 },
        { icon: "🛡️", title: "स्कॅम डिटेक्शन", desc: "फसवणूक ओळखा", id: 2 },
        { icon: "🌐", title: "वेब सुरक्षा", desc: "बनावट वेबसाइट्स ओळखा", id: 3 },
        { icon: "💬", title: "व्हॉट्सअॅप सुरक्षा", desc: "मेसेजिंग ॲप सुरक्षित वापरा", id: 4 },
        { icon: "🔍", title: "गुगल सर्च", desc: "योग्य माहिती शोधा", id: 5 },
        { icon: "📧", title: "ईमेल बेसिक", desc: "फिशिंग ईमेल ओळखा", id: 8 }
      ],
      steps: [
        { title: "खाते तयार करा", desc: "नाव आणि ईमेलने साइन अप करा" },
        { title: "व्हिडिओ पहा", desc: "सोप्या व्हिडिओंतून शिका" },
        { title: "सराव करा", desc: "इंटरएक्टिव्ह सिम्युलेशन वापरा" },
        { title: "प्रमाणपत्र मिळवा", desc: "सर्व धडे पूर्ण करा" }
      ]
    }
  };

  const tt = text[lang] || text["EN"];

  return (
    <div style={{ minHeight: "calc(100vh - 70px)" }}>

      {/* HERO SECTION */}
      <div style={heroStyle}>
        <div style={heroContent}>
          <div style={heroBadge}>
            <span>🛡️</span> {lang === "HI" ? "भारत के शिक्षार्थियों द्वारा विश्वसनीय" : lang === "MR" ? "भारतातील शिकणाऱ्यांचा विश्वास" : "Trusted by learners across India"}
          </div>

          <h1 style={heroTitle}>{tt.title}</h1>
          <p style={heroSubtitle}>{tt.subtitle}</p>
          <p style={heroDesc}>{tt.desc}</p>

          <div style={heroBtnGroup}>
            <Link to="/lessons">
              <button style={primaryBtn}>{tt.lessons} →</button>
            </Link>

            {!loggedIn && (
              <>
                <Link to="/login">
                  <button style={secondaryBtn}>{tt.login}</button>
                </Link>
                <Link to="/register">
                  <button style={outlineBtn}>{tt.register}</button>
                </Link>
              </>
            )}

            <button onClick={() => speak(tt.desc, lang, true)} style={speakBtn}>🔊</button>
          </div>
        </div>

        {/* Hero visual */}
        <div style={heroVisual}>
          <div style={heroShield}>🛡️</div>
        </div>
      </div>

      {/* FEATURES GRID */}
      <div style={featuresSection}>
        <h2 style={sectionTitle}>{tt.whatLearn}</h2>
        <div style={featuresGrid}>
          {tt.features.map((f, i) => (
            <div 
              key={i} 
              style={{...featureCard, cursor: "pointer", transition: "transform 0.2s, box-shadow 0.2s"}}
              onClick={() => navigate(`/lesson/${f.id}`)}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = "translateY(-5px)";
                e.currentTarget.style.boxShadow = "0 12px 24px rgba(0,0,0,0.15)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = "translateY(0)";
                e.currentTarget.style.boxShadow = "none";
              }}
            >
              <div style={featureIcon}>{f.icon}</div>
              <h3 style={featureTitle}>{f.title}</h3>
              <p style={featureDesc}>{f.desc}</p>
            </div>
          ))}
        </div>
      </div>

      {/* HOW IT WORKS */}
      <div style={featuresSection}>
        <h2 style={sectionTitle}>{tt.howItWorks}</h2>
        <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fit, minmax(220px, 1fr))",gap:"20px"}}>
          {tt.steps.map((s, i) => (
            <div key={i} style={{...featureCard,textAlign:"center",paddingTop:"40px",position:"relative"}}>
              <div style={{position:"absolute",top:"-20px",left:"50%",transform:"translateX(-50%)",width:"48px",height:"48px",background:"linear-gradient(135deg, var(--primary), var(--primary-dark))",color:"white",borderRadius:"50%",display:"flex",alignItems:"center",justifyContent:"center",fontSize:"20px",fontWeight:"800",boxShadow:"0 8px 16px rgba(99,102,241,0.3)",border:"4px solid var(--card)"}}>
                {i + 1}
              </div>
              <h3 style={featureTitle}>{s.title}</h3>
              <p style={featureDesc}>{s.desc}</p>
            </div>
          ))}
        </div>
      </div>

      {/* STATS */}
      <div style={statsSection}>
        {[
          { num: "8+", label: lang === "HI" ? "इंटरएक्टिव पाठ" : lang === "MR" ? "इंटरएक्टिव्ह धडे" : "Interactive Lessons" },
          { num: "10+", label: lang === "HI" ? "वास्तविक परिदृश्य" : lang === "MR" ? "वास्तविक परिदृश्य" : "Real Scenarios" },
          { num: "AI", label: lang === "HI" ? "स्कैम डिटेक्शन" : lang === "MR" ? "स्कॅम डिटेक्शन" : "Scam Detection" },
          { num: "3", label: lang === "HI" ? "भाषाएं" : lang === "MR" ? "भाषा" : "Languages" }
        ].map((s, i) => (
          <div key={i} style={statItem}>
            <div style={statNum}>{s.num}</div>
            <div style={statLabel}>{s.label}</div>
          </div>
        ))}
      </div>

    </div>
  );
}

/* ═══════════ STYLES ═══════════ */

const heroStyle = {
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  maxWidth: "1100px",
  margin: "0 auto",
  padding: "60px 30px 40px",
  gap: "40px",
  flexWrap: "wrap"
};

const heroContent = { flex: "1 1 500px" };

const heroBadge = {
  display: "inline-flex", alignItems: "center", gap: "8px",
  padding: "8px 18px", background: "var(--primary-glow)", color: "var(--primary)",
  borderRadius: "999px", fontSize: "13px", fontWeight: "600",
  marginBottom: "24px", border: "1px solid rgba(99,102,241,0.15)"
};

const heroTitle = {
  fontSize: "3rem", fontWeight: "900", lineHeight: "1.1", marginBottom: "12px",
  background: "linear-gradient(135deg, var(--text) 0%, var(--primary) 100%)",
  WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text"
};

const heroSubtitle = { fontSize: "1.3rem", color: "var(--primary)", fontWeight: "600", marginBottom: "12px" };
const heroDesc = { fontSize: "1.05rem", color: "var(--text-secondary)", lineHeight: "1.7", marginBottom: "32px", maxWidth: "540px" };
const heroBtnGroup = { display: "flex", gap: "14px", flexWrap: "wrap", alignItems: "center" };

const primaryBtn = {
  padding: "16px 30px", fontSize: "16px", fontWeight: "700", fontFamily: "'Inter', 'Noto Sans Devanagari', sans-serif",
  borderRadius: "12px", border: "none",
  background: "linear-gradient(135deg, var(--primary) 0%, var(--primary-dark) 100%)",
  color: "white", cursor: "pointer", transition: "all 0.3s",
  boxShadow: "0 4px 20px rgba(99,102,241,0.3)", minHeight: "52px"
};

const secondaryBtn = {
  padding: "16px 30px", fontSize: "16px", fontWeight: "600", fontFamily: "'Inter', 'Noto Sans Devanagari', sans-serif",
  borderRadius: "12px", border: "none", background: "var(--card)",
  color: "var(--text)", cursor: "pointer", transition: "all 0.3s",
  boxShadow: "var(--shadow-sm)", minHeight: "52px"
};

const outlineBtn = {
  padding: "16px 30px", fontSize: "16px", fontWeight: "600", fontFamily: "'Inter', 'Noto Sans Devanagari', sans-serif",
  borderRadius: "12px", border: "2px solid var(--primary)", background: "transparent",
  color: "var(--primary)", cursor: "pointer", transition: "all 0.3s", minHeight: "52px"
};

const speakBtn = {
  width: "52px", height: "52px", borderRadius: "14px", border: "1px solid var(--border)",
  background: "var(--surface-glass)", cursor: "pointer", fontSize: "22px",
  display: "flex", alignItems: "center", justifyContent: "center", transition: "all 0.2s",
  fontFamily: "system-ui, -apple-system, sans-serif"
};

const heroVisual = { flex: "0 0 250px", display: "flex", justifyContent: "center", alignItems: "center" };
const heroShield = { fontSize: "140px", filter: "drop-shadow(0 10px 40px rgba(99,102,241,0.2))", animation: "iconPulse 3s ease-in-out infinite" };

const featuresSection = { maxWidth: "1100px", margin: "20px auto", padding: "40px 30px" };
const sectionTitle = { textAlign: "center", fontSize: "1.8rem", fontWeight: "800", marginBottom: "40px", color: "var(--text)" };
const featuresGrid = { display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: "20px" };

const featureCard = {
  background: "var(--card)", backdropFilter: "blur(20px)", border: "1px solid var(--card-border)",
  borderRadius: "16px", padding: "28px 24px", textAlign: "center",
  transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)", cursor: "default"
};

const featureIcon = { fontSize: "42px", marginBottom: "14px" };
const featureTitle = { fontSize: "1.05rem", fontWeight: "700", marginBottom: "8px", color: "var(--text)" };
const featureDesc = { fontSize: "0.9rem", color: "var(--text-secondary)", lineHeight: "1.5" };

const statsSection = {
  display: "flex", justifyContent: "center", gap: "50px", flexWrap: "wrap",
  padding: "40px 30px 60px", maxWidth: "800px", margin: "0 auto"
};

const statItem = { textAlign: "center" };
const statNum = {
  fontSize: "2.2rem", fontWeight: "900",
  background: "linear-gradient(135deg, var(--primary), var(--accent))",
  WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text"
};
const statLabel = { fontSize: "0.85rem", color: "var(--muted)", fontWeight: "500", marginTop: "4px" };

export default Home;