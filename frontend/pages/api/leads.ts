import type { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "../../lib/prisma";
export default async function handler(req: NextApiRequest, res: NextApiResponse) {if (req.method === "GET") {const leads = await prisma.lead.findMany({ orderBy: { createdAt: "desc" }, take: 50 });return res.status(200).json(leads);}if (req.method === "POST") {const { fullName, phone, email, budgetINR, source, status, assignedTo } = req.body ?? {};if (!fullName || !phone) return res.status(400).json({ error: "Name and phone required" });const lead = await prisma.lead.create({ data: { fullName, phone, email, budgetINR, source, status, assignedTo } });return res.status(201).json(lead);}res.setHeader("Allow", "GET, POST");return res.status(405).end("Method Not Allowed");
}
