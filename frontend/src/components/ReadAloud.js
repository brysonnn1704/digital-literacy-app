import React, { useState, useEffect } from "react";
import { t } from "../utils/translate";

function ReadAloud({ language }) {
  const [reading, setReading] = useState(false);

  // Stop reading when unmounted or language changes
  useEffect(() => {
    return () => {
      window.speechSynthesis.cancel();
    };
  }, [language]);

  const handleReadAloud = () => {
    if (reading) {
      window.speechSynthesis.cancel();
      setReading(false);
      return;
    }

    setReading(true);

    // Extract all meaningful text from the current page
    // Using a simple approach: extract text from h1, h2, h3, p, and strong tags
    const elements = document.querySelectorAll('h1, h2, h3, p, strong, .lessonDesc, .badge');
    let textToRead = "";
    
    elements.forEach(el => {
      // Avoid reading hidden elements or scripts
      if (el.offsetParent !== null) {
        textToRead += el.innerText + ". ";
      }
    });

    if (textToRead.trim() === "") {
      textToRead = "Nothing to read on this page.";
    }

    const speech = new SpeechSynthesisUtterance(textToRead);
    
    // Set appropriate language voice
    if (language === "HI") speech.lang = "hi-IN";
    else if (language === "MR") speech.lang = "mr-IN";
    else speech.lang = "en-IN";
    
    speech.rate = 0.9; // Slightly slower for better comprehension
    
    speech.onend = () => setReading(false);
    speech.onerror = () => setReading(false);

    window.speechSynthesis.cancel();
    window.speechSynthesis.speak(speech);
  };

  return (
    <button 
      onClick={handleReadAloud}
      style={{...readBtnStyle, ...(reading ? activeStyle : {})}}
      title={reading ? t(language, "stopReading") : t(language, "readAloud")}
    >
      {reading ? "⏹" : "🔊"}
    </button>
  );
}

const readBtnStyle = {
  position: "fixed",
  bottom: "90px",
  right: "20px",
  width: "50px",
  height: "50px",
  borderRadius: "50%",
  background: "var(--card)",
  color: "var(--text)",
  border: "2px solid var(--primary)",
  fontSize: "22px",
  boxShadow: "0 4px 10px rgba(0,0,0,0.1)",
  cursor: "pointer",
  zIndex: 999,
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  transition: "all 0.3s"
};

const activeStyle = {
  background: "var(--primary)",
  color: "white",
  animation: "iconPulse 1.5s infinite"
};

export default ReadAloud;
