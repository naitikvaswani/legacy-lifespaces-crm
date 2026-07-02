import { Router } from "express";
import { PrismaClient } from "@prisma/client";

export default function leadsRouter(prisma: PrismaClient) {const r = Router();

r.get("/", async (_req, res) => {const leads = await prisma.lead.findMany({orderBy: { createdAt: "desc" },take: 50});res.json(leads);});

r.post("/", async (req, res) => {const { fullName, phone, email, budgetINR, source, status, assignedTo } = req.body ?? {};if (!fullName || !phone) return res.status(400).json({ error: "Name and phone required" });

const lead = await prisma.lead.create({data: { fullName, phone, email, budgetINR, source, status, assignedTo }});res.status(201).json(lead);});

return r;
}
