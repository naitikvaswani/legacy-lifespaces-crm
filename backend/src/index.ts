import express from "express";
import helmet from "helmet";
import cors from "cors";
import morgan from "morgan";
import cookieParser from "cookie-parser";
import { PrismaClient } from "@prisma/client";
import { config } from "./config.js";
import authRouter from "./routes/auth.js";
import leadsRouter from "./routes/leads.js";
import healthRouter from "./routes/health.js";

const app = express();
const prisma = new PrismaClient();

app.use(helmet());
app.use(cors({ origin: true, credentials: true }));
app.use(express.json({ limit: "5mb" }));
app.use(cookieParser());
app.use(morgan("tiny"));

app.use("/api/health", healthRouter());
app.use("/api/auth", authRouter(prisma));
app.use("/api/leads", leadsRouter(prisma));

app.get("/", (_req, res) => res.json({ ok: true, name: "Legacy Lifespaces CRM API" }));

async function ensureAdmin() {const email = config.adminEmail;if (!email) return;const admin = await prisma.user.findUnique({ where: { email } });if (!admin) {const bcrypt = (await import("bcryptjs")).default;const hash = bcrypt.hashSync(config.adminTempPassword, 10);await prisma.user.create({data: { email, password: hash, name: "Admin", role: "ADMIN" }});// eslint-disable-next-line no-consoleconsole.log("Seeded admin:", email);}
}

app.listen(config.port, async () => {await ensureAdmin();// eslint-disable-next-line no-consoleconsole.log(API running on port ${config.port});
});
