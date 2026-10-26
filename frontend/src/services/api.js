const API_URL = (process.env.REACT_APP_API_URL || (typeof window !== "undefined" && window.location && window.location.hostname !== "localhost" ? "/api" : "http://localhost:5005"));

export const getLessons = async () => {
  const res = await fetch(`${API_URL}/lessons`);
  return res.json();
};

export const loginUser = async (data) => {
  const res = await fetch(`${API_URL}/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data)
  });
  return res.json();
};

export const registerUser = async (data) => {
  const res = await fetch(`${API_URL}/register`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data)
  });
  return res.json();
};