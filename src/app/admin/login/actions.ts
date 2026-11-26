"use server";
import bcrypt from "bcryptjs";
import { redirect } from "next/navigation";
import { cookies } from "next/headers";
import { db } from "@/lib/db";
import { createSession, COOKIE } from "@/lib/auth";
export async function login(_: { error?: string }, fd: FormData) {
  const email = String(fd.get("email") ?? "").toLowerCase().trim();
  const user = await db.adminUser.findUnique({ where: { email } });
  const bad = { error: "Invalid email or password." };
  if (!user) return bad;
  if (user.lockedUntil && user.lockedUntil > new Date()) return { error: "Account locked. Try again in 15 minutes." };
  if (!(await bcrypt.compare(String(fd.get("password") ?? ""), user.passwordHash))) {
    const n = user.failedAttempts + 1;
    await db.adminUser.update({ where: { id: user.id }, data: { failedAttempts: n, lockedUntil: n >= 5 ? new Date(Date.now() + 15 * 60_000) : null } });
    return bad;
  }
  await db.adminUser.update({ where: { id: user.id }, data: { failedAttempts: 0, lockedUntil: null } });
  await db.auditLog.create({ data: { action: "LOGIN", userId: user.id } });
  await createSession({ uid: user.id, role: user.role });
  redirect("/admin/dashboard");
}
export async function logout() { (await cookies()).delete(COOKIE); redirect("/admin/login"); }
