export const fetchUserProgress = async (userId) => {
  const res = await fetch(`http://localhost:5000/progress/${userId}`);
  return res.json();
};

export const markLessonComplete = async ({ user_id, lesson_id, score = 0 }) => {
  const res = await fetch("http://localhost:5000/progress", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ user_id, lesson_id, score })
  });
  return res.json();
};