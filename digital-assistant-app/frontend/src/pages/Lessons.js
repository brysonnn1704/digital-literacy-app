import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "../App.css";
import { getUser } from "../utils/auth";

function Lessons() {
  const navigate = useNavigate();
  const user = getUser();

  const [progressMap, setProgressMap] = useState({});

  const lessons = [
    {
      id: 1,
      title: "UPI Payment",
      desc: "Learn safe money transfer using UPI",
      type: "upi"
    },
    {
      id: 2,
      title: "Scam Calls & SMS",
      desc: "Identify fake calls and phishing messages",
      type: "scam"
    },
    {
      id: 3,
      title: "Fake Websites",
      desc: "Learn to detect unsafe websites",
      type: "internet"
    }
  ];

  useEffect(() => {
    if (!user?.id) return;

    fetch(`http://localhost:5000/progress/${user.id}`)
      .then(res => res.json())
      .then(data => {
        const map = {};
        data.forEach(p => {
          if (p.completed === 1) map[p.lesson_id] = true;
        });
        setProgressMap(map);
      });
  }, [user]);

  /* ✅ Go to LessonDetail (NOT direct training) */
  const goToLesson = (lesson) => {
    navigate(`/lesson/${lesson.id}`);
  };

  return (
    <div className="container">

      <h2>Lessons</h2>

      <div className="lessonGrid">

        {lessons.map((lesson) => {
          const completed = progressMap[lesson.id];

          return (
            <div
              key={lesson.id}
              className="lessonCard"
              onClick={() => goToLesson(lesson)}
            >

              <h3>{lesson.title}</h3>

              <p className="lessonDesc">{lesson.desc}</p>

              <div className="lessonFooter">
                {completed ? (
                  <span className="completedText">✔ Completed</span>
                ) : (
                  <span className="openText">Start →</span>
                )}
              </div>

            </div>
          );
        })}

      </div>

    </div>
  );
}

export default Lessons;