import dotenv from "dotenv";
dotenv.config();

export const config = {port: Number(process.env.PORT ?? 10000),dbUrl: process.env.DATABASE_URL ?? "",jwtSecret: process.env.JWT_SECRET ?? "dev-secret-change",tz: process.env.APP_TIMEZONE ?? "Asia/Kolkata",locale: process.env.APP_LOCALE ?? "en-IN",currency: process.env.CURRENCY ?? "INR",adminEmail: process.env.ADMIN_EMAIL ?? "",adminTempPassword: process.env.ADMIN_TEMP_PASSWORD ?? "ChangeMe!123"
};
