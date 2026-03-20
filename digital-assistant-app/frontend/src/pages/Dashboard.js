import React, { useEffect, useState } from "react";
import { getUser } from "../utils/auth";
import { useNavigate } from "react-router-dom";

function Dashboard() {

  const user = getUser();
  const navigate = useNavigate();

  const [progress, setProgress] = useState([]);

  useEffect(() => {
    if (!user?.id) return;

    fetch(`http://localhost:5000/progress/${user.id}`)
      .then(res => res.json())
      .then(setProgress);
  }, [user]);

  const TOTAL_LESSONS = 3;

  const completed = progress.filter(p => p.completed === 1).length;
  const percent = Math.round((completed / TOTAL_LESSONS) * 100);

  let scamMistakes = 0;
  let upiMistakes = 0;

  progress.forEach(p => {
    scamMistakes += p.mistakes_scam || 0;
    upiMistakes += p.mistakes_upi || 0;
  });

  let recommendation = "";
  let route = "";

  if (scamMistakes > upiMistakes && scamMistakes > 1) {
    recommendation = "You need more practice in scams ⚠️";
    route = "/scam-check";
  } else if (upiMistakes > 1) {
    recommendation = "Practice UPI payments again 💳";
    route = "/practice-upi";
  } else {
    recommendation = "Explore internet safety 🌐";
    route = "/internet";
  }

  return (
    <div className="container">

      <h2>Dashboard</h2>

      <p style={{ fontSize: "18px", fontWeight: "bold" }}>
        Progress: {percent}%
      </p>

      <div className="progressBar">
        <div className="progressFill" style={{ width: `${percent}%` }} />
      </div>

      <div className="card">
        <p><b>Scam Mistakes:</b> {scamMistakes}</p>
        <p><b>UPI Mistakes:</b> {upiMistakes}</p>
      </div>

      <div className="card">
        <h3>Recommended Next Lesson</h3>
        <p>{recommendation}</p>

        <button className="btn" onClick={() => navigate(route)}>
          Start →
        </button>
      </div>

    </div>
  );
}

export default Dashboard;