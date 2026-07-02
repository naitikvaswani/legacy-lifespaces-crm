import { Router } from "express";

export default function healthRouter() {const r = Router();r.get("/", (_req, res) => res.json({ status: "ok" }));return r;
}
