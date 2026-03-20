import React, { useState } from "react"

function Register(){

 const [name,setName] = useState("")
 const [email,setEmail] = useState("")
 const [password,setPassword] = useState("")

 const handleRegister = async () => {

  const response = await fetch("http://localhost:5000/register",{
   method:"POST",
   headers:{
    "Content-Type":"application/json"
   },
   body:JSON.stringify({
    name,
    email,
    password
   })
  })

  const data = await response.json()

  alert(data.message)
 }

 return(
  <div style={{textAlign:"center", marginTop:"50px"}}>

   <h2>Register</h2>

   <input
    placeholder="Name"
    value={name}
    onChange={(e)=>setName(e.target.value)}
   /><br/><br/>

   <input
    placeholder="Email"
    value={email}
    onChange={(e)=>setEmail(e.target.value)}
   /><br/><br/>

   <input
    placeholder="Password"
    type="password"
    value={password}
    onChange={(e)=>setPassword(e.target.value)}
   /><br/><br/>

   <button onClick={handleRegister}>Register</button>

  </div>
 )
}

export default Register