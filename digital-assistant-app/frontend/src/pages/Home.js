import React from "react";
import { Link } from "react-router-dom";
import { isLoggedIn } from "../utils/auth";

function Home({ language }) {

  const loggedIn = isLoggedIn();

  const text = {
    EN: {
      title: "Digital Literacy Platform",
      desc: "Learn digital services safely",
      lessons: "View Lessons",
      login: "Login",
      register: "Register"
    },
    HI: {
      title: "डिजिटल साक्षरता प्लेटफॉर्म",
      desc: "डिजिटल सेवाएं सुरक्षित सीखें",
      lessons: "पाठ देखें",
      login: "लॉगिन",
      register: "रजिस्टर"
    },
    MR: {
      title: "डिजिटल साक्षरता प्लॅटफॉर्म",
      desc: "डिजिटल सेवा सुरक्षित शिका",
      lessons: "धडे पहा",
      login: "लॉगिन",
      register: "नोंदणी"
    }
  };

  const t = text[language];

  return (
    <div style={{ textAlign: "center", marginTop: "50px" }}>

      <h1>{t.title}</h1>

      <p>{t.desc}</p>

      <Link to="/lessons">
        <button style={{ margin: "10px" }}>{t.lessons}</button>
      </Link>

      {!loggedIn && (
        <>
          <Link to="/login">
            <button style={{ margin: "10px" }}>{t.login}</button>
          </Link>

          <Link to="/register">
            <button style={{ margin: "10px" }}>{t.register}</button>
          </Link>
        </>
      )}

    </div>
  );
}

export default Home;