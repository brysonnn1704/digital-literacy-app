export const translations = {
  EN: {
    home: "Home",
    dashboard: "Dashboard",
    lessons: "Lessons",
    profile: "Profile",
    logout: "Logout",

    progress: "Progress",
    completed: "Completed",
    startLesson: "Start Lesson",
    listen: "Listen",
    markComplete: "Mark Completed",
    practice: "Practice",

    login: "Login",
    register: "Register"
  },

  HI: {
    home: "होम",
    dashboard: "डैशबोर्ड",
    lessons: "पाठ",
    profile: "प्रोफाइल",
    logout: "लॉगआउट",

    progress: "प्रगति",
    completed: "पूर्ण",
    startLesson: "पाठ शुरू करें",
    listen: "सुनें",
    markComplete: "पूर्ण करें",
    practice: "अभ्यास",

    login: "लॉगिन",
    register: "रजिस्टर"
  },

  MR: {
    home: "मुख्यपृष्ठ",
    dashboard: "डॅशबोर्ड",
    lessons: "धडे",
    profile: "प्रोफाइल",
    logout: "लॉगआउट",

    progress: "प्रगती",
    completed: "पूर्ण",
    startLesson: "धडा सुरू करा",
    listen: "ऐका",
    markComplete: "पूर्ण करा",
    practice: "सराव",

    login: "लॉगिन",
    register: "नोंदणी"
  }
};

export const t = (lang, key) => {
  return translations[lang]?.[key] || key;
};