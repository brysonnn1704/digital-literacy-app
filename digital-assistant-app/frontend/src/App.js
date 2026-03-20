import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Navbar from "./components/Navbar";

import Home from "./pages/Home";
import Lessons from "./pages/Lessons";
import LessonDetail from "./pages/LessonDetail";
import PracticeUPI from "./pages/PracticeUPI";
import ScamCheck from "./pages/ScamCheck";
import InternetSafety from "./pages/InternetSafety";
import SecurityTraining from "./pages/SecurityTraining";
import ScamAnalyzer from "./pages/ScamAnalyzer";

import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import Profile from "./pages/Profile";
import Certificate from "./pages/Certificate";
import Verify from "./pages/Verify";

import ProtectedRoute from "./components/ProtectedRoute";

function App() {

  const [theme, setTheme] = useState(() => localStorage.getItem("theme") || "light");
  const [fontSize, setFontSize] = useState(() => parseInt(localStorage.getItem("fontSize")) || 16);
  const [language, setLanguage] = useState(() => localStorage.getItem("language") || "EN");

  useEffect(() => {
    document.body.className = theme;
    document.documentElement.style.fontSize = fontSize + "px";
  }, [theme, fontSize]);

  const toggleTheme = () => {
    const newTheme = theme === "light" ? "dark" : "light";
    setTheme(newTheme);
    localStorage.setItem("theme", newTheme);
  };

  const increaseFont = () => {
    const newSize = fontSize + 2;
    setFontSize(newSize);
    localStorage.setItem("fontSize", newSize);
  };

  const decreaseFont = () => {
    const newSize = Math.max(14, fontSize - 2);
    setFontSize(newSize);
    localStorage.setItem("fontSize", newSize);
  };

  const changeLanguage = (lang) => {
    setLanguage(lang);
    localStorage.setItem("language", lang);
  };

  return (
    <Router>

      <Navbar
        toggleTheme={toggleTheme}
        theme={theme}
        increaseFont={increaseFont}
        decreaseFont={decreaseFont}
        language={language}
        changeLanguage={changeLanguage}
      />

      <Routes>

        <Route path="/" element={<Home language={language} />} />

        <Route path="/lessons" element={
          <ProtectedRoute><Lessons /></ProtectedRoute>
        } />

        <Route path="/lesson/:id" element={
          <ProtectedRoute><LessonDetail /></ProtectedRoute>
        } />

        <Route path="/practice-upi" element={
          <ProtectedRoute><PracticeUPI /></ProtectedRoute>
        } />

        <Route path="/scam-check" element={
          <ProtectedRoute><ScamCheck /></ProtectedRoute>
        } />

        <Route path="/internet" element={
          <ProtectedRoute><InternetSafety /></ProtectedRoute>
        } />

        <Route path="/security" element={
          <ProtectedRoute><SecurityTraining /></ProtectedRoute>
        } />

        <Route path="/scam-analyzer" element={
          <ProtectedRoute><ScamAnalyzer /></ProtectedRoute>
        } />

        <Route path="/dashboard" element={
          <ProtectedRoute><Dashboard /></ProtectedRoute>
        } />

        <Route path="/profile" element={
          <ProtectedRoute><Profile /></ProtectedRoute>
        } />

        <Route path="/certificate" element={
          <ProtectedRoute><Certificate /></ProtectedRoute>
        } />

        <Route path="/verify" element={<Verify />} />

        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        <Route path="*" element={<Home />} />

      </Routes>

    </Router>
  );
}

export default App;