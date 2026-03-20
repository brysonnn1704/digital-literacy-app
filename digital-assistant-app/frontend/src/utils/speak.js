export function speak(text, lang = "EN") {

  const speech = new SpeechSynthesisUtterance(text);

  if (lang === "HI") speech.lang = "hi-IN";
  else if (lang === "MR") speech.lang = "mr-IN";
  else speech.lang = "en-IN";

  speech.rate = 1;

  window.speechSynthesis.cancel(); // avoid overlap
  window.speechSynthesis.speak(speech);
}