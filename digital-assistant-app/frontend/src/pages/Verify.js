import React, { useEffect, useState } from "react";

function Verify() {

  const [data, setData] = useState(null);

  const params = new URLSearchParams(window.location.search);
  const id = params.get("id");

  useEffect(() => {
    fetch(`http://localhost:5000/verify/${id}`)
      .then(res => res.json())
      .then(setData);
  }, [id]);

  if (!data) return <p>Verifying...</p>;

  return (
    <div className="container">

      <h2>Certificate Verification</h2>

      {data.valid ? (
        <div className="card">
          <p><b>Name:</b> {data.name}</p>
          <p><b>Date:</b> {data.date}</p>
          <p style={{ color: "green" }}>✅ Valid Certificate</p>
        </div>
      ) : (
        <p style={{ color: "red" }}>❌ Invalid Certificate</p>
      )}

    </div>
  );
}

export default Verify;