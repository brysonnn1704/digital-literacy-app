export function speak(text, lang = "EN", slow = false) {
  const speech = new SpeechSynthesisUtterance(text);

  if (lang === "HI") speech.lang = "hi-IN";
  else if (lang === "MR") speech.lang = "mr-IN";
  else speech.lang = "en-IN";

  // Fallback: If Marathi voice is not installed, use Hindi (same Devanagari script)
  const voices = window.speechSynthesis.getVoices();
  if (lang === "MR" && voices.length > 0) {
    const hasMarathi = voices.some(v => v.lang.includes("mr"));
    if (!hasMarathi) {
      speech.lang = "hi-IN";
    }
  }

  speech.rate = slow ? 0.7 : 0.9;
  speech.pitch = 1;
  speech.volume = 1;

  window.speechSynthesis.cancel();
  window.speechSynthesis.speak(speech);
}

export function stopSpeaking() {
  window.speechSynthesis.cancel();
}

export function speakPage(lang = "EN") {
  const main = document.querySelector('.container') || document.querySelector('#root');
  if (!main) return;
  const text = main.innerText?.substring(0, 500) || "";
  speak(text, lang, true);
}