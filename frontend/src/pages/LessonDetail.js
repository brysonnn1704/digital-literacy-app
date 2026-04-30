import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import { speak } from "../utils/speak";
import { getUser } from "../utils/auth";
import { t } from "../utils/translate";
import "../App.css";

function LessonDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const lessonId = Number(id);
  const lang = localStorage.getItem("language") || "EN";

  /* ═══════ LANGUAGE-SPECIFIC TUTORIAL VIDEOS ═══════ */
  const videos = {
    1: { // UPI Payment
      EN: "https://www.youtube.com/embed/iI2NaN_QVTI",
      HI: "https://www.youtube.com/embed/AwEYwVfIKgg",
      MR: "https://www.youtube.com/embed/qj9bvNFJERE"
    },
    2: { // Scam Calls & SMS
      EN: "https://www.youtube.com/embed/RUcwxP0yvfw",
      HI: "https://www.youtube.com/embed/aO858HyFbKI",
      MR: "https://www.youtube.com/embed/LVV_93mBfSU"
    },
    3: { // Fake Websites
      EN: "https://www.youtube.com/embed/aO858HyFbKI",
      HI: "https://www.youtube.com/embed/RUcwxP0yvfw",
      MR: "https://www.youtube.com/embed/iI2NaN_QVTI"
    },
    4: { // WhatsApp Basics
      EN: "https://www.youtube.com/embed/LVV_93mBfSU",
      HI: "https://www.youtube.com/embed/AwEYwVfIKgg",
      MR: "https://www.youtube.com/embed/qj9bvNFJERE"
    },
    5: { // Google Search
      EN: "https://www.youtube.com/embed/iI2NaN_QVTI",
      HI: "https://www.youtube.com/embed/aO858HyFbKI",
      MR: "https://www.youtube.com/embed/RUcwxP0yvfw"
    },
    6: { // Phone Settings
      EN: "https://www.youtube.com/embed/AwEYwVfIKgg",
      HI: "https://www.youtube.com/embed/qj9bvNFJERE",
      MR: "https://www.youtube.com/embed/LVV_93mBfSU"
    },
    7: { // Online Forms
      EN: "https://www.youtube.com/embed/RUcwxP0yvfw",
      HI: "https://www.youtube.com/embed/iI2NaN_QVTI",
      MR: "https://www.youtube.com/embed/aO858HyFbKI"
    },
    8: { // Email Basics
      EN: "https://www.youtube.com/embed/aO858HyFbKI",
      HI: "https://www.youtube.com/embed/LVV_93mBfSU",
      MR: "https://www.youtube.com/embed/AwEYwVfIKgg"
    }
  };

  const stepsData = {
    1: {
      EN: [
        { icon: "📱", title: "Open App", desc: "Open your secure UPI app (like GPay, PhonePe, Paytm)." },
        { icon: "📷", title: "Scan QR / Enter Number", desc: "Scan the merchant's QR code or enter the exact phone number." },
        { icon: "💰", title: "Enter Amount", desc: "Verify the receiver's name and enter the exact amount." },
        { icon: "🔐", title: "Enter PIN Safely", desc: "Enter your UPI PIN privately. Never share your PIN with anyone." }
      ],
      HI: [
        { icon: "📱", title: "ऐप खोलें", desc: "अपना सुरक्षित यूपीआई ऐप (जैसे GPay, PhonePe, Paytm) खोलें।" },
        { icon: "📷", title: "क्यूआर स्कैन / नंबर दर्ज करें", desc: "दुकानदार का क्यूआर कोड स्कैन करें या सटीक फोन नंबर दर्ज करें।" },
        { icon: "💰", title: "राशि दर्ज करें", desc: "प्राप्तकर्ता का नाम जांचें और सटीक राशि दर्ज करें।" },
        { icon: "🔐", title: "सुरक्षित पिन दर्ज करें", desc: "अपना यूपीआई पिन निजी तौर पर दर्ज करें। अपना पिन कभी साझा न करें।" }
      ],
      MR: [
        { icon: "📱", title: "ॲप उघडा", desc: "तुमचे सुरक्षित यूपीआय ॲप (उदा. GPay, PhonePe, Paytm) उघडा." },
        { icon: "📷", title: "क्यूआर स्कॅन / नंबर टाका", desc: "दुकानदाराचा क्यूआर कोड स्कॅन करा किंवा अचूक फोन नंबर टाका." },
        { icon: "💰", title: "रक्कम प्रविष्ट करा", desc: "प्राप्तकर्त्याचे नाव तपासा आणि अचूक रक्कम प्रविष्ट करा." },
        { icon: "🔐", title: "सुरक्षितपणे पिन टाका", desc: "तुमचा यूपीआय पिन खाजगीरित्या टाका. तुमचा पिन कोणाशीही शेअर करू नका." }
      ]
    },
    2: {
      EN: [
        { icon: "🛑", title: "Do Not Panic", desc: "Scammers create urgency. Stay calm and do not act in a hurry." },
        { icon: "🚫", title: "Do Not Share OTP", desc: "Never share OTPs, PINs, or bank details on a call." },
        { icon: "🔍", title: "Verify Caller ID", desc: "Check the caller's identity using apps or official numbers." },
        { icon: "🛡️", title: "Block & Report", desc: "Block the suspicious number and report it to cyber police (1930)." }
      ],
      HI: [
        { icon: "🛑", title: "घबराएं नहीं", desc: "स्कैमर्स जल्दबाजी कराते हैं। शांत रहें और जल्दबाजी में कोई कदम न उठाएं।" },
        { icon: "🚫", title: "ओटीपी साझा न करें", desc: "कॉल पर कभी भी ओटीपी, पिन या बैंक विवरण साझा न करें।" },
        { icon: "🔍", title: "कॉलर आईडी सत्यापित करें", desc: "ऐप्स या आधिकारिक नंबरों का उपयोग करके कॉलर की पहचान जांचें।" },
        { icon: "🛡️", title: "ब्लॉक और रिपोर्ट करें", desc: "संदिग्ध नंबर को ब्लॉक करें और साइबर पुलिस (1930) को रिपोर्ट करें।" }
      ],
      MR: [
        { icon: "🛑", title: "घाबरू नका", desc: "स्कॅमर्स घाई करतात. शांत रहा आणि घाईघाईने कोणतीही कृती करू नका." },
        { icon: "🚫", title: "ओटीपी शेअर करू नका", desc: "कॉलवर कधीही ओटीपी, पिन किंवा बँक तपशील शेअर करू नका." },
        { icon: "🔍", title: "कॉलर आयडी सत्यापित करा", desc: "ॲप्स किंवा अधिकृत नंबर वापरून कॉलरची ओळख तपासा." },
        { icon: "🛡️", title: "ब्लॉक आणि रिपोर्ट करा", desc: "संशयास्पद नंबर ब्लॉक करा आणि सायबर पोलिसांना (1930) रिपोर्ट करा." }
      ]
    },
    3: {
      EN: [
        { icon: "🔒", title: "Check for HTTPS", desc: "Always look for 'https' and the padlock icon in the address bar." },
        { icon: "👁️", title: "Look for Spelling Mistakes", desc: "Check the URL carefully (e.g., 'amozon.com' instead of 'amazon.com')." },
        { icon: "🚩", title: "Avoid 'Too Good' Offers", desc: "If an offer looks unbelievably cheap, it is likely a scam." },
        { icon: "❌", title: "Never Save Cards", desc: "Do not save your credit/debit card details on unknown websites." }
      ],
      HI: [
        { icon: "🔒", title: "HTTPS जांचें", desc: "हमेशा एड्रेस बार में 'https' और ताला आइकन देखें।" },
        { icon: "👁️", title: "स्पेलिंग की गलतियां देखें", desc: "यूआरएल ध्यान से जांचें (उदा. amazon.com के बजाय amozon.com)।" },
        { icon: "🚩", title: "'बहुत अच्छे' ऑफर्स से बचें", desc: "यदि कोई ऑफर अविश्वसनीय रूप से सस्ता है, तो यह एक घोटाला हो सकता है।" },
        { icon: "❌", title: "कार्ड कभी सेव न करें", desc: "अज्ञात वेबसाइटों पर अपने क्रेडिट/डेबिट कार्ड का विवरण सेव न करें।" }
      ],
      MR: [
        { icon: "🔒", title: "HTTPS तपासा", desc: "नेहमी ॲड्रेस बारमध्ये 'https' आणि लॉक आयकॉन पहा." },
        { icon: "👁️", title: "स्पेलिंगच्या चुका पहा", desc: "यूआरएल काळजीपूर्वक तपासा (उदा. amazon.com ऐवजी amozon.com)." },
        { icon: "🚩", title: "'खूप चांगल्या' ऑफर्स टाळा", desc: "जर एखादी ऑफर अविश्वसनीयपणे स्वस्त वाटत असेल, तर तो एक घोटाळा असू शकतो." },
        { icon: "❌", title: "कार्ड कधीही सेव्ह करू नका", desc: "अज्ञात वेबसाइट्सवर तुमचे क्रेडिट/डेबिट कार्ड तपशील सेव्ह करू नका." }
      ]
    },
    4: {
      EN: [
        { icon: "💬", title: "Open Chat", desc: "Open WhatsApp and check the sender's profile." },
        { icon: "🚫", title: "Never Click Unknown Links", desc: "Do not click on links promising free gifts or money." },
        { icon: "🕵️", title: "Verify Identity", desc: "If a friend asks for money urgently, call them to verify." },
        { icon: "⚙️", title: "Privacy Settings", desc: "Hide your profile picture and last seen from strangers." }
      ],
      HI: [
        { icon: "💬", title: "चैट खोलें", desc: "व्हाट्सएप खोलें और भेजने वाले की प्रोफ़ाइल जांचें।" },
        { icon: "🚫", title: "अज्ञात लिंक पर कभी क्लिक न करें", desc: "मुफ्त उपहार या पैसे का वादा करने वाले लिंक पर क्लिक न करें।" },
        { icon: "🕵️", title: "पहचान सत्यापित करें", desc: "यदि कोई दोस्त तत्काल पैसे मांगता है, तो पुष्टि करने के लिए उन्हें कॉल करें।" },
        { icon: "⚙️", title: "गोपनीयता सेटिंग्स", desc: "अपनी प्रोफ़ाइल तस्वीर और लास्ट सीन अजनबियों से छिपाएं।" }
      ],
      MR: [
        { icon: "💬", title: "चॅट उघडा", desc: "व्हॉट्सअॅप उघडा आणि पाठवणाऱ्याची प्रोफाइल तपासा." },
        { icon: "🚫", title: "अज्ञात लिंकवर कधीही क्लिक करू नका", desc: "मोफत भेटवस्तू किंवा पैशांचे आश्वासन देणाऱ्या लिंकवर क्लिक करू नका." },
        { icon: "🕵️", title: "ओळख सत्यापित करा", desc: "जर एखाद्या मित्राने तातडीने पैसे मागितले, तर खात्री करण्यासाठी त्यांना कॉल करा." },
        { icon: "⚙️", title: "गोपनीयता सेटिंग्ज", desc: "तुमचा प्रोफाइल फोटो आणि लास्ट सीन अनोळखी लोकांपासून लपवा." }
      ]
    },
    5: {
      EN: [
        { icon: "⌨️", title: "Type Query", desc: "Open Google and type exactly what you are looking for." },
        { icon: "🏛️", title: "Look for .gov or .org", desc: "For official information (like Aadhaar/PAN), only trust .gov.in sites." },
        { icon: "⚠️", title: "Avoid Sponsored Ads", desc: "Skip the top results marked as 'Sponsored' or 'Ad' if they look weird." },
        { icon: "📞", title: "Don't Call Random Numbers", desc: "Never call customer care numbers found on random Google searches." }
      ],
      HI: [
        { icon: "⌨️", title: "अपनी खोज लिखें", desc: "Google खोलें और वही टाइप करें जो आप ढूंढ रहे हैं।" },
        { icon: "🏛️", title: ".gov या .org देखें", desc: "आधिकारिक जानकारी (जैसे आधार/पैन) के लिए, केवल .gov.in साइटों पर भरोसा करें।" },
        { icon: "⚠️", title: "प्रायोजित विज्ञापनों से बचें", desc: "यदि 'प्रायोजित' या 'Ad' के रूप में चिह्नित शीर्ष परिणाम अजीब लगते हैं तो उन्हें छोड़ दें।" },
        { icon: "📞", title: "रैंडम नंबरों पर कॉल न करें", desc: "रैंडम Google खोजों पर मिलने वाले कस्टमर केयर नंबरों पर कभी कॉल न करें।" }
      ],
      MR: [
        { icon: "⌨️", title: "तुमची माहिती लिहा", desc: "Google उघडा आणि तुम्ही जे शोधत आहात ते अचूक टाइप करा." },
        { icon: "🏛️", title: ".gov किंवा .org पहा", desc: "अधिकृत माहितीसाठी (जसे आधार/पॅन), फक्त .gov.in साइट्सवर विश्वास ठेवा." },
        { icon: "⚠️", title: "प्रायोजित जाहिराती टाळा", desc: "'Sponsored' किंवा 'Ad' म्हणून चिन्हांकित केलेले शीर्ष निकाल विचित्र वाटल्यास ते वगळा." },
        { icon: "📞", title: "रँडम नंबरवर कॉल करू नका", desc: "रँडम Google शोधांवर सापडणाऱ्या कस्टमर केअर नंबरवर कधीही कॉल करू नका." }
      ]
    },
    6: {
      EN: [
        { icon: "⚙️", title: "Open Settings", desc: "Go to your phone's main settings menu." },
        { icon: "📶", title: "Turn Off Public WiFi", desc: "Never use free public WiFi for banking or entering passwords." },
        { icon: "📵", title: "Bluetooth Off", desc: "Keep your Bluetooth turned off when you are not actively using it." },
        { icon: "📱", title: "App Permissions", desc: "Do not give camera or microphone access to apps that don't need it." }
      ],
      HI: [
        { icon: "⚙️", title: "सेटिंग्स खोलें", desc: "अपने फोन के मुख्य सेटिंग्स मेनू में जाएं।" },
        { icon: "📶", title: "सार्वजनिक वाईफाई बंद करें", desc: "बैंकिंग या पासवर्ड दर्ज करने के लिए कभी भी मुफ्त सार्वजनिक वाईफाई का उपयोग न करें।" },
        { icon: "📵", title: "ब्लूटूथ बंद", desc: "जब आप इसका सक्रिय रूप से उपयोग नहीं कर रहे हों तो अपना ब्लूटूथ बंद रखें।" },
        { icon: "📱", title: "ऐप अनुमतियां", desc: "उन ऐप्स को कैमरा या माइक्रोफ़ोन का एक्सेस न दें जिन्हें इसकी आवश्यकता नहीं है।" }
      ],
      MR: [
        { icon: "⚙️", title: "सेटिंग्ज उघडा", desc: "तुमच्या फोनच्या मुख्य सेटिंग्ज मेनूवर जा." },
        { icon: "📶", title: "सार्वजनिक वायफाय बंद करा", desc: "बँकिंग किंवा पासवर्ड टाकण्यासाठी कधीही मोफत सार्वजनिक वायफाय वापरू नका." },
        { icon: "📵", title: "ब्लूटूथ बंद", desc: "जेव्हा तुम्ही त्याचा सक्रियपणे वापर करत नसाल तेव्हा तुमचे ब्लूटूथ बंद ठेवा." },
        { icon: "📱", title: "ॲप परवानग्या", desc: "ज्या ॲप्सना आवश्यकता नाही त्यांना कॅमेरा किंवा मायक्रोफोन ॲक्सेस देऊ नका." }
      ]
    },
    7: {
      EN: [
        { icon: "📋", title: "Read Labels Carefully", desc: "Read what each box is asking for before typing." },
        { icon: "🛑", title: "Never Enter Bank PIN", desc: "No legitimate online form will ever ask for your ATM or UPI PIN." },
        { icon: "✅", title: "Submit on Secure Sites", desc: "Only press submit if the website has a padlock icon in the address bar." },
        { icon: "👀", title: "Double Check Details", desc: "Review your information before submitting." }
      ],
      HI: [
        { icon: "📋", title: "लेबल्स ध्यान से पढ़ें", desc: "टाइप करने से पहले पढ़ें कि हर बॉक्स में क्या पूछा जा रहा है।" },
        { icon: "🛑", title: "बैंक पिन कभी न डालें", desc: "कोई भी वैध ऑनलाइन फॉर्म कभी भी आपका एटीएम या यूपीआई पिन नहीं मांगेगा।" },
        { icon: "✅", title: "सुरक्षित साइटों पर सबमिट करें", desc: "तभी सबमिट दबाएं जब वेबसाइट के एड्रेस बार में ताला आइकन हो।" },
        { icon: "👀", title: "विवरण दोबारा जांचें", desc: "सबमिट करने से पहले अपनी जानकारी की समीक्षा करें।" }
      ],
      MR: [
        { icon: "📋", title: "लेबल्स काळजीपूर्वक वाचा", desc: "टाइप करण्यापूर्वी प्रत्येक बॉक्समध्ये काय विचारले आहे ते वाचा." },
        { icon: "🛑", title: "बँक पिन कधीही टाकू नका", desc: "कोणताही कायदेशीर ऑनलाइन फॉर्म तुमचा एटीएम किंवा यूपीआय पिन कधीही विचारणार नाही." },
        { icon: "✅", title: "सुरक्षित साइट्सवर सबमिट करा", desc: "जर वेबसाइटच्या ॲड्रेस बारमध्ये लॉक आयकॉन असेल तरच सबमिट दाबा." },
        { icon: "👀", title: "तपशील पुन्हा तपासा", desc: "सबमिट करण्यापूर्वी तुमच्या माहितीचे पुनरावलोकन करा." }
      ]
    },
    8: {
      EN: [
        { icon: "👤", title: "Check Sender Email ID", desc: "Look at the actual email address, not just the display name." },
        { icon: "📎", title: "Do Not Open Attachments", desc: "Never download files from unknown senders, especially .exe or .zip." },
        { icon: "🔗", title: "Don't Click Suspicious Links", desc: "Hover over links to see where they lead before clicking." },
        { icon: "🗑️", title: "Mark as Spam", desc: "If an email looks fake or asks for money, mark it as spam." }
      ],
      HI: [
        { icon: "👤", title: "प्रेषक की ईमेल आईडी जांचें", desc: "केवल प्रदर्शन नाम नहीं, बल्कि वास्तविक ईमेल पता देखें।" },
        { icon: "📎", title: "अटैचमेंट न खोलें", desc: "अज्ञात प्रेषकों से फ़ाइलें कभी डाउनलोड न करें, विशेष रूप से .exe या .zip।" },
        { icon: "🔗", title: "संदिग्ध लिंक पर क्लिक न करें", desc: "क्लिक करने से पहले यह देखने के लिए लिंक पर होवर करें कि वे कहां ले जाते हैं।" },
        { icon: "🗑️", title: "स्पैम मार्क करें", desc: "यदि कोई ईमेल नकली लगता है या पैसे मांगता है, तो उसे स्पैम मार्क करें।" }
      ],
      MR: [
        { icon: "👤", title: "पाठवणाऱ्याचा ईमेल आयडी तपासा", desc: "फक्त डिस्प्ले नाव नाही तर वास्तविक ईमेल पत्ता पहा." },
        { icon: "📎", title: "अटॅचमेंट उघडू नका", desc: "अज्ञात पाठवणाऱ्यांकडून फाईल्स कधीही डाउनलोड करू नका, विशेषतः .exe किंवा .zip." },
        { icon: "🔗", title: "संशयास्पद लिंकवर क्लिक करू नका", desc: "क्लिक करण्यापूर्वी लिंक कुठे जातात ते पाहण्यासाठी त्यांच्यावर होव्हर करा." },
        { icon: "🗑️", title: "स्पॅम मार्क करा", desc: "जर एखादा ईमेल बनावट वाटत असेल किंवा पैसे मागत असेल, तर तो स्पॅम मार्क करा." }
      ]
    }
  };

  const titleKeys = { 1: "lesson1", 2: "lesson2", 3: "lesson3", 4: "lesson4", 5: "lesson5", 6: "lesson6", 7: "lesson7", 8: "lesson8" };
  const icons = { 1: "💳", 2: "🛡️", 3: "🌐", 4: "💬", 5: "🔍", 6: "⚙️", 7: "📝", 8: "📧" };
  const colors = { 1: "#6366f1", 2: "#ef4444", 3: "#10b981", 4: "#25d366", 5: "#4285f4", 6: "#f59e0b", 7: "#8b5cf6", 8: "#ec4899" };

  const practiceRoutes = {
    1: "/practice-upi", 2: "/scam-check", 3: "/internet",
    4: "/whatsapp", 5: "/google-search", 6: "/phone-settings",
    7: "/online-forms", 8: "/email-basics"
  };

  if (!videos[lessonId]) {
    return (
      <div className="container">
        <div className="card" style={{ textAlign: "center", padding: "60px 30px" }}>
          <div style={{ fontSize: "64px", marginBottom: "16px" }}>🔍</div>
          <h2>{t(lang, "lessonNotFound")}</h2>
          <p style={{ color: "var(--muted)", marginBottom: "16px" }}>{lang === "HI" ? "यह पाठ मौजूद नहीं है।" : lang === "MR" ? "हा धडा अस्तित्वात नाही." : "The lesson you're looking for doesn't exist."}</p>
          <button className="btn" style={{ maxWidth: "200px", margin: "0 auto" }} onClick={() => navigate("/lessons")}>← {t(lang, "goBack")}</button>
        </div>
      </div>
    );
  }

  const videoUrl = videos[lessonId][lang] || videos[lessonId]["EN"];

  const handleComplete = async () => {
    const user = getUser();
    if (!user?.id) return;
    await fetch(`${process.env.REACT_APP_API_URL || "http://localhost:5005"}/progress`, {
      method: "POST", headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ user_id: user.id, lesson_id: lessonId, completed: 1, score: 0 })
    });
    alert(lang === "HI" ? "पूर्ण हो गया 🎉" : lang === "MR" ? "पूर्ण झाले 🎉" : "Completed 🎉");
  };

  const speakText = lang === "HI" ? "वीडियो ध्यान से देखें और फिर अभ्यास करें" : lang === "MR" ? "व्हिडिओ काळजीपूर्वक पहा आणि मग सराव करा" : "Watch the video carefully and then practice";

  const langLabel = lang === "HI" ? "हिंदी में वीडियो" : lang === "MR" ? "मराठीमध्ये व्हिडिओ" : "English Video";

  const btnBase = {
    padding: "16px 20px",
    fontSize: "15px",
    fontWeight: "700",
    fontFamily: "'Inter', 'Noto Sans Devanagari', sans-serif",
    borderRadius: "12px",
    border: "none",
    color: "white",
    cursor: "pointer",
    transition: "all 0.3s",
    textAlign: "center",
    letterSpacing: "0.3px"
  };

  return (
    <div className="container">
      {/* Header */}
      <div style={{ display: "flex", alignItems: "center", gap: "14px", marginBottom: "24px" }}>
        <button onClick={() => navigate("/lessons")} style={{ background: "none", border: "none", fontSize: "20px", cursor: "pointer", color: "var(--primary)", fontWeight: "700", padding: "8px" }}>←</button>
        <div style={{ width: "54px", height: "54px", borderRadius: "16px", background: `${colors[lessonId]}15`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: "28px" }}>{icons[lessonId]}</div>
        <div style={{ flex: 1 }}>
          <h2 style={{ marginBottom: "2px", fontSize: "1.4rem" }}>{t(lang, titleKeys[lessonId])}</h2>
          <p style={{ color: "var(--muted)", fontSize: "0.85rem" }}>{t(lang, "startLesson")} {lessonId} {t(lang, "lessonOf")} 8</p>
        </div>
      </div>

      {/* Language Badge */}
      <div style={{ marginBottom: "16px", display: "flex", alignItems: "center", gap: "10px" }}>
        <span style={{ display: "inline-flex", alignItems: "center", gap: "6px", padding: "6px 16px", borderRadius: "999px", background: "linear-gradient(135deg, rgba(99,102,241,0.12), rgba(99,102,241,0.06))", color: "var(--primary)", fontSize: "13px", fontWeight: "600", border: "1px solid rgba(99,102,241,0.15)" }}>
          🌐 {langLabel}
        </span>
      </div>

      {/* Video Player */}
      <div style={{ background: "var(--card)", border: "1px solid var(--card-border)", borderRadius: "20px", overflow: "hidden", boxShadow: "0 8px 32px rgba(0,0,0,0.08)", marginBottom: "20px" }}>
        <iframe
          width="100%"
          height="400"
          src={videoUrl}
          title="Lesson Video"
          style={{ border: "none", display: "block" }}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          referrerPolicy="strict-origin-when-cross-origin"
          allowFullScreen
        />
      </div>

      {/* Step-by-Step Guidance */}
      <div style={{ background: "var(--card)", border: "1px solid var(--card-border)", borderRadius: "20px", padding: "24px", marginBottom: "20px", boxShadow: "0 4px 20px rgba(0,0,0,0.05)" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "20px" }}>
          <h3 style={{ fontSize: "1.2rem", margin: 0, display: "flex", alignItems: "center", gap: "10px", color: "var(--text)" }}>
            <span>📝</span>
            {lang === "HI" ? "चरण-दर-चरण मार्गदर्शन" : lang === "MR" ? "चरण-दर-चरण मार्गदर्शन" : "Step-by-Step Guidance"}
          </h3>
          <button onClick={() => speak(stepsData[lessonId]?.[lang]?.map(s => `${s.title}. ${s.desc}`).join(". ") || "", lang, true)} style={{ background: "linear-gradient(135deg, var(--accent), var(--accent-light))", border: "none", borderRadius: "50%", width: "40px", height: "40px", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "18px", cursor: "pointer", boxShadow: "0 4px 10px rgba(16,185,129,0.3)", color: "white" }} title="Read all steps">
            🔊
          </button>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
          {stepsData[lessonId]?.[lang]?.map((step, idx) => (
            <div key={idx} style={{ display: "flex", alignItems: "flex-start", gap: "16px", background: "var(--surface-glass)", padding: "16px", borderRadius: "14px", border: "1px solid var(--border)" }}>
              <div style={{ background: "var(--background)", width: "40px", height: "40px", borderRadius: "12px", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "20px", flexShrink: 0, border: "1px solid var(--border)" }}>
                {step.icon}
              </div>
              <div style={{ flex: 1 }}>
                <h4 style={{ margin: "0 0 4px 0", fontSize: "1rem", color: "var(--text)" }}>{step.title}</h4>
                <p style={{ margin: 0, fontSize: "0.85rem", color: "var(--text-secondary)", lineHeight: "1.5" }}>{step.desc}</p>
              </div>
              <button onClick={() => speak(`${step.title}. ${step.desc}`, lang, true)} style={{ background: "none", border: "none", fontSize: "20px", cursor: "pointer", color: "var(--muted)", padding: "4px", transition: "all 0.2s" }} title="Listen to this step">
                🔊
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Action Buttons */}
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: "12px" }}>
        <button onClick={() => speak(speakText, lang, true)} style={{ ...btnBase, background: "linear-gradient(135deg, #f59e0b, #d97706)", boxShadow: "0 4px 16px rgba(245,158,11,0.25)" }}>
          🔊 {t(lang, "listen")}
        </button>
        <button onClick={handleComplete} style={{ ...btnBase, background: "linear-gradient(135deg, var(--accent), #059669)", boxShadow: "0 4px 16px rgba(16,185,129,0.25)" }}>
          ✔ {t(lang, "completeBtn")}
        </button>
        <button onClick={() => navigate(practiceRoutes[lessonId])} style={{ ...btnBase, background: "linear-gradient(135deg, var(--primary), var(--primary-dark))", boxShadow: "0 4px 16px rgba(99,102,241,0.25)" }}>
          {t(lang, "practiceBtn")} →
        </button>
      </div>
    </div>
  );
}

export default LessonDetail;