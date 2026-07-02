import type { NextApiRequest, NextApiResponse } from "next";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import { prisma } from "../../lib/prisma";

const JWT_SECRET = process.env.JWT_SECRET || "dev-secret-change";
const ADMIN_EMAIL = process.env.ADMIN_EMAIL || "";
const ADMIN_TEMP_PASSWORD = process.env.ADMIN_TEMP_PASSWORD || "ChangeMe!123";

async function ensureAdmin() {if (!ADMIN_EMAIL) return;const existing = await prisma.user.findUnique({ where: { email: ADMIN_EMAIL } });if (!existing) {const hash = bcrypt.hashSync(ADMIN_TEMP_PASSWORD, 10);await prisma.user.create({data: { email: ADMIN_EMAIL, password: hash, name: "Admin", role: "ADMIN" }});}
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {if (req.method !== "POST") { res.setHeader("Allow", "POST"); return res.status(405).end("Method Not Allowed"); }await ensureAdmin();const { email, password } = req.body ?? {};if (!email || !password) return res.status(400).json({ error: "Missing credentials" });const user = await prisma.user.findUnique({ where: { email } });if (!user) return res.status(401).json({ error: "Invalid credentials" });const ok = bcrypt.compareSync(password, user.password);if (!ok) return res.status(401).json({ error: "Invalid credentials" });const token = jwt.sign({ sub: user.id, role: user.role, email: user.email }, JWT_SECRET, { expiresIn: "12h" });return res.status(200).json({ token, user: { id: user.id, email: user.email, name: user.name, role: user.role } });
}
