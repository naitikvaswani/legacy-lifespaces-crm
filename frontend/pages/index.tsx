import { useState } from "react";

export default function Login() {const [email, setEmail] = useState("naitikvaswani11@gmail.com");const [password, setPassword] = useState("");const [msg, setMsg] = useState("");

async function onLogin(e: any) {e.preventDefault();setMsg("Signing in...");try {const r = await fetch(${process.env.NEXT_PUBLIC_API_BASE_URL}/api/auth/login, {method: "POST",headers: { "Content-Type": "application/json" },body: JSON.stringify({ email, password })});const data = await r.json();if (!r.ok) throw new Error(data?.error || "Login failed");localStorage.setItem("token", data.token);window.location.href = "/dashboard";} catch (err: any) {setMsg(err.message);}}

return (<main style={{display:"grid",placeItems:"center",minHeight:"100vh",background:"#0B1220",color:"#fff"}}><form onSubmit={onLogin} style={{background:"#111827",padding:24,borderRadius:8,width:360}}><h1 style={{marginBottom:12}}>Legacy Lifespaces CRM</h1><label>Email</label><input value={email} onChange={e=>setEmail(e.target.value)} style={{width:"100%",marginBottom:8}} /><label>Password</label><input type="password" value={password} onChange={e=>setPassword(e.target.value)} style={{width:"100%",marginBottom:12}} /><button type="submit" style={{width:"100%",padding:10,background:"#2F6FED",border:"none",color:"#fff",borderRadius:6}}>Login</button><div style={{marginTop:8,fontSize:12,color:"#F5A623"}}>{msg}</div></form></main>);
}
