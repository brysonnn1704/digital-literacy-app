import React, { useState } from "react";
import { Link } from "react-router-dom";
import "../App.css";

function Register(){
  const [name,setName] = useState("");
  const [email,setEmail] = useState("");
  const [password,setPassword] = useState("");
  const [loading,setLoading] = useState(false);

  const inputStyle = {width:"100%",padding:"14px 18px",fontSize:"15px",border:"1.5px solid var(--border)",borderRadius:"10px",background:"var(--surface-glass)",color:"var(--text)",outline:"none",fontFamily:"'Inter', sans-serif",boxSizing:"border-box"};

  const handleRegister = async () => {
    if(!name || !email || !password){ alert("Fill all fields"); return; }
    setLoading(true);
    try{
      const response = await fetch(`${process.env.REACT_APP_API_URL || "http://localhost:5005"}/register`,{
        method:"POST", headers:{"Content-Type":"application/json"},
        body:JSON.stringify({name,email,password})
      });
      const data = await response.json();
      alert(data.message);
    }catch(err){ alert("Server error"); }
    finally{ setLoading(false); }
  }

  return(
    <div style={{display:"flex",justifyContent:"center",alignItems:"center",minHeight:"calc(100vh - 80px)",padding:"30px 20px"}}>
      <div style={{background:"var(--card)",backdropFilter:"blur(24px)",border:"1px solid var(--card-border)",borderRadius:"24px",padding:"48px 40px",width:"100%",maxWidth:"440px",boxShadow:"0 20px 60px rgba(0,0,0,0.08)",animation:"fadeSlideUp 0.5s ease-out"}}>
        <div style={{width:"64px",height:"64px",borderRadius:"20px",background:"linear-gradient(135deg, var(--accent-glow), rgba(99,102,241,0.1))",display:"flex",alignItems:"center",justifyContent:"center",fontSize:"28px",margin:"0 auto 20px",border:"1px solid var(--border)"}}>✨</div>
        <h2 style={{textAlign:"center",fontSize:"1.6rem",fontWeight:"800",marginBottom:"6px"}}>Create Account</h2>
        <p style={{textAlign:"center",color:"var(--muted)",fontSize:"0.9rem",marginBottom:"32px"}}>Start your digital literacy journey today</p>
        <div style={{marginBottom:"20px"}}>
          <label style={{display:"block",fontSize:"13px",fontWeight:"600",color:"var(--text-secondary)",marginBottom:"8px"}}>Full Name</label>
          <input placeholder="John Doe" value={name} onChange={(e)=>setName(e.target.value)} style={inputStyle} />
        </div>
        <div style={{marginBottom:"20px"}}>
          <label style={{display:"block",fontSize:"13px",fontWeight:"600",color:"var(--text-secondary)",marginBottom:"8px"}}>Email</label>
          <input placeholder="you@example.com" type="email" value={email} onChange={(e)=>setEmail(e.target.value)} style={inputStyle} />
        </div>
        <div style={{marginBottom:"24px"}}>
          <label style={{display:"block",fontSize:"13px",fontWeight:"600",color:"var(--text-secondary)",marginBottom:"8px"}}>Password</label>
          <input placeholder="Min. 6 characters" type="password" value={password} onChange={(e)=>setPassword(e.target.value)} style={inputStyle} />
        </div>
        <button onClick={handleRegister} disabled={loading} style={{width:"100%",padding:"16px 24px",fontSize:"16px",fontWeight:"700",fontFamily:"'Inter', sans-serif",borderRadius:"12px",border:"none",background:"linear-gradient(135deg, var(--primary) 0%, var(--primary-dark) 100%)",color:"white",cursor:loading?"not-allowed":"pointer",opacity:loading?0.7:1,transition:"all 0.3s",boxShadow:"0 4px 20px rgba(99,102,241,0.3)",letterSpacing:"0.3px"}}>
          {loading ? "Creating..." : "Create Account →"}
        </button>
        <p style={{textAlign:"center",marginTop:"24px",fontSize:"14px",color:"var(--muted)"}}>
          Already have an account? <Link to="/login" style={{color:"var(--primary)",fontWeight:"600"}}>Sign in</Link>
        </p>
      </div>
    </div>
  )
}

export default Register;