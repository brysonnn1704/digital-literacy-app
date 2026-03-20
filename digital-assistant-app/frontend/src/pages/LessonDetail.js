import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import { speak } from "../utils/speak";
import { getUser } from "../utils/auth";

function LessonDetail() {

  const { id } = useParams();
  const navigate = useNavigate();

  const lessonId = Number(id);

  const videos = {
    1: "https://www.youtube.com/embed/3U4vH1lZ9V4",
    2: "https://www.youtube.com/embed/3c6G8k3Z9v8",
    3: "https://www.youtube.com/embed/2v1Xv8F8ZkE"
  };

  const titles = {
    1: "UPI Payment Training",
    2: "Scam Awareness Training",
    3: "Internet Safety Training"
  };

  if (!videos[lessonId]) {
    return (
      <div className="container">
        <h2>Lesson not found</h2>
        <button className="btn" onClick={() => navigate("/lessons")}>
          Go Back
        </button>
      </div>
    );
  }

  const handleComplete = async () => {

    const user = getUser();

    if (!user?.id) return;

    await fetch("http://localhost:5000/progress", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        user_id: user.id,
        lesson_id: lessonId,
        completed: 1,
        score: 0
      })
    });

    alert("Completed 🎉");
  };

  return (
    <div className="container">

      <h2>{titles[lessonId]}</h2>

      <iframe
        width="100%"
        height="300"
        src={videos[lessonId]}
        title="Lesson Video"
        style={{ borderRadius: "10px", marginTop: "15px" }}
        allowFullScreen
      />

      <div className="card">
        <p>Watch the video carefully before starting practice.</p>
      </div>

      <button className="btn" onClick={() => speak("Follow the steps carefully")}>
        🔊 Listen Instructions
      </button>

      <button className="btn" onClick={handleComplete}>
        ✔ Mark Completed
      </button>

      <button
        className="btn"
        onClick={() => {
          if (lessonId === 1) navigate("/practice-upi");
          else if (lessonId === 2) navigate("/scam-check");
          else if (lessonId === 3) navigate("/internet");
        }}
      >
        Start Practice →
      </button>

    </div>
  );
}

export default LessonDetail;