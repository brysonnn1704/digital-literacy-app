import React from "react";
import { getUser } from "../utils/auth";

function Profile(){

  const user = getUser();

  return(
    <div className="container">

      <div className="card">
        <h2>Profile</h2>

        <p><b>Name:</b> {user?.name || "User"}</p>
        <p><b>Email:</b> {user?.email}</p>

        <div style={{marginTop:"10px"}}>
          <span className="badge">Learner</span>
        </div>
      </div>

      <div className="card">
        <h3>Settings</h3>
        <p>Language: English (IN)</p>
        <p>Voice Guidance: Enabled</p>
      </div>

    </div>
  );
}

export default Profile;