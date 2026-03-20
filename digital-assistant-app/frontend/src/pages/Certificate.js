import React, { useEffect, useState } from "react";
import { getUser } from "../utils/auth";

function Certificate() {

  const user = getUser();

  const [certId, setCertId] = useState("");
  const [date, setDate] = useState("");

  useEffect(() => {

    const today = new Date().toLocaleDateString();
    setDate(today);

    const id = "CERT-" + Math.floor(Math.random() * 1000000);
    setCertId(id);

    fetch("http://localhost:5000/save-certificate", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        user_id: user.id,
        certificate_id: id,
        date: today
      })
    });

  }, [user]);

  return (
    <div className="certificate">

      <h1>🎓 Certificate of Completion</h1>

      <p>This certifies that</p>

      <h2>{user?.name}</h2>

      <p>has successfully completed the Digital Literacy Program</p>

      <p><b>Date:</b> {date}</p>
      <p><b>ID:</b> {certId}</p>

      <button className="btn" onClick={() => window.print()}>
        Download PDF
      </button>

    </div>
  );
}

export default Certificate;