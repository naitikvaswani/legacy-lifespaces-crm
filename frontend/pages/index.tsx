import { useState } from "react";

export default function Login() {const [email, setEmail] = useState("naitikvaswani11@gmail.com");const [password, setPassword] = useState("");const [msg, setMsg] = useState("");

async function onLogin(e: React.FormEvent) {e.preventDefault();setMsg("Signing in...");try {const r = await fetch("/api/auth", {method: "POST",headers: { "Content-Type": "application/json" },body: JSON.stringify({ email, password })});const data = await r.json();if (!r.ok) throw new Error(data?.error || "Login failed");localStorage.setItem("token", data.token);window.location.href = "/dashboard";} catch (err: any) {setMsg(err.message || "Something went wrong");}}

return (<main style={{ display: "grid", placeItems: "center", minHeight: "100vh", background: "#0B1220", color: "#fff" }}><formonSubmit={onLogin}style={{ background: "#111827", padding: 24, borderRadius: 8, width: 360, boxShadow: "0 6px 18px rgba(0,0,0,0.25)" }}><h1 style={{ marginBottom: 12 }}>Legacy Lifespaces CRM</h1>

<label style={{ fontSize: 12, opacity: 0.9 }}>Email</label><inputvalue={email}onChange={(e) => setEmail(e.target.value)}style={{ width: "100%", marginBottom: 10, padding: 10, borderRadius: 6, border: "1px solid #374151", background: "#0F172A", color: "#fff" }}/>

<label style={{ fontSize: 12, opacity: 0.9 }}>Password</label><inputtype="password"value={password}onChange={(e) => setPassword(e.target.value)}style={{ width: "100%", marginBottom: 14, padding: 10, borderRadius: 6, border: "1px solid #374151", background: "#0F172A", color: "#fff" }}/>

<buttontype="submit"style={{ width: "100%", padding: 10, background: "#2F6FED", border: "none", color: "#fff", borderRadius: 6, fontWeight: 600, cursor: "pointer" }}>Login</button>

<div style={{ marginTop: 10, fontSize: 12, color: "#F5A623", minHeight: 18 }}>{msg}</div>

<div style={{ marginTop: 12, fontSize: 11, opacity: 0.8 }}>Tip: Use the seeded admin<div style={{ marginTop: 4 }}>Email: <code>naitikvaswani11@gmail.com</code><br />Temp Password: <code>L3gacy!2026#Admin</code></div></div></form></main>);
}
