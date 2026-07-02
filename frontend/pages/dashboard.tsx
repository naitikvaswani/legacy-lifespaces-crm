import { useEffect, useState } from "react";

type Lead = { id:string; fullName:string; phone:string; budgetINR?:number; createdAt:string };

export default function Dashboard() {const [leads, setLeads] = useState<Lead[]>([]);

useEffect(() => {const token = localStorage.getItem("token");if (!token) { window.location.href = "/"; return; }fetch(${process.env.NEXT_PUBLIC_API_BASE_URL}/api/leads, {headers: { Authorization: Bearer ${token} }}).then(r => r.json()).then(setLeads).catch(() => {});}, []);

return (<main style={{padding:24}}><h1>Dashboard</h1><h3>Recent Leads</h3><table border={1} cellPadding={8}><thead><tr><th>Name</th><th>Phone</th><th>Budget (₹)</th><th>Created</th></tr></thead><tbody>{leads.map(l => (<tr key={l.id}><td>{l.fullName}</td><td>{l.phone}</td><td>{l.budgetINR?.toLocaleString("en-IN")}</td><td>{new Date(l.createdAt).toLocaleDateString("en-IN")}</td></tr>))}</tbody></table></main>);
}
