import { Router } from "express";
import { PrismaClient } from "@prisma/client";
import jwt from "jsonwebtoken";
import { config } from "../config.js";
import bcrypt from "bcryptjs";

export default function authRouter(prisma: PrismaClient) {const r = Router();

r.post("/login", async (req, res) => {const { email, password } = req.body ?? {};if (!email || !password) return res.status(400).json({ error: "Missing credentials" });

const user = await prisma.user.findUnique({ where: { email } });if (!user) return res.status(401).json({ error: "Invalid credentials" });

const ok = bcrypt.compareSync(password, user.password);if (!ok) return res.status(401).json({ error: "Invalid credentials" });

const token = jwt.sign({ sub: user.id, role: user.role, email: user.email },config.jwtSecret,{ expiresIn: "12h" });

return res.json({token,user: { id: user.id, email: user.email, name: user.name, role: user.role }});});

return r;
}
