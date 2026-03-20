import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { loginUser } from "../utils/auth";

function Login(){

  const [email,setEmail] = useState("");
  const [password,setPassword] = useState("");
  const [loading,setLoading] = useState(false);

  const navigate = useNavigate();

  const handleLogin = async () => {

    if(!email || !password){
      alert("Please enter email and password");
      return;
    }

    try{
      setLoading(true);

      const res = await fetch("http://localhost:5000/login",{
        method:"POST",
        headers:{ "Content-Type":"application/json" },
        body: JSON.stringify({email,password})
      });

      const data = await res.json();

      if(data.success){
        loginUser(data.user);

        // FORCE UI refresh (important for navbar update)
        window.location.href = "/lessons";

      }else{
        alert("Invalid credentials");
      }

    }catch(err){
      console.error(err);
      alert("Server error");
    }finally{
      setLoading(false);
    }
  }

  return(

    <div style={{
      display:"flex",
      flexDirection:"column",
      alignItems:"center",
      marginTop:"50px"
    }}>

      <h2>Login</h2>

      <input
        placeholder="Email"
        value={email}
        onChange={(e)=>setEmail(e.target.value)}
        style={inputStyle}
      />

      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e)=>setPassword(e.target.value)}
        style={inputStyle}
      />

      <button 
        onClick={handleLogin}
        style={buttonStyle}
        disabled={loading}
      >
        {loading ? "Logging in..." : "Login"}
      </button>

    </div>
  )
}

const inputStyle = {
  margin:"10px",
  padding:"10px",
  width:"250px",
  borderRadius:"5px",
  border:"1px solid #ccc"
};

const buttonStyle = {
  padding:"10px 20px",
  background:"#2563eb",
  color:"white",
  border:"none",
  borderRadius:"5px",
  cursor:"pointer"
};

export default Login;