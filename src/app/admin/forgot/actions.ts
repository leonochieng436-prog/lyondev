"use server";
import { createHash, randomBytes } from "crypto";
import { db } from "@/lib/db";
export async function requestReset(_: { sent?: boolean }, fd: FormData) {
  const email = String(fd.get("email") ?? "").toLowerCase().trim();
  const u = await db.adminUser.findUnique({ where: { email } });
  if (u && u.status === "ACTIVE") {
    const token = randomBytes(32).toString("hex");
    await db.passwordResetToken.create({ data: { userId: u.id, tokenHash: createHash("sha256").update(token).digest("hex"), expiresAt: new Date(Date.now() + 3600_000) } });
    const link = `${process.env.NEXT_PUBLIC_SITE_URL}/admin/reset/${token}`;
    if (process.env.RESEND_API_KEY) await fetch("https://api.resend.com/emails", { method: "POST", headers: { Authorization: `Bearer ${process.env.RESEND_API_KEY}`, "Content-Type": "application/json" }, body: JSON.stringify({ from: process.env.EMAIL_FROM, to: email, subject: "Reset your LYONDEV admin password", text: `Reset link (valid 1 hour): ${link}` }) }).catch(() => {});
    else console.log("[password reset link – email not configured]", link);
  }
  return { sent: true }; // same response whether or not the account exists
}
export async function resetPassword(_: { error?: string; done?: boolean }, fd: FormData) {
  const pw = String(fd.get("password") ?? ""); const tokenHash = createHash("sha256").update(String(fd.get("token"))).digest("hex");
  if (pw.length < 10) return { error: "Use at least 10 characters." };
  const t = await db.passwordResetToken.findUnique({ where: { tokenHash } });
  if (!t || t.expiresAt < new Date()) return { error: "This link is invalid or has expired." };
  const bcrypt = (await import("bcryptjs")).default;
  await db.adminUser.update({ where: { id: t.userId }, data: { passwordHash: await bcrypt.hash(pw, 12), failedAttempts: 0, lockedUntil: null } });
  await db.passwordResetToken.deleteMany({ where: { userId: t.userId } });
  return { done: true };
}
