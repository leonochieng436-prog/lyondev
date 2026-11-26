"use server";
import { revalidatePath } from "next/cache";
import { db } from "@/lib/db";
import { requirePerm } from "@/lib/auth";
const KEYS = ["companyName", "tagline", "aboutSummary", "vision", "mission", "values", "email", "phone", "whatsapp", "address", "addressPubliclyVerified", "hours", "facebook", "twitter", "linkedin", "gaId", "faq"];
export async function saveSettings(fd: FormData) {
  const s = await requirePerm("*");
  for (const k of KEYS) {
    const raw = String(fd.get(k) ?? "").trim(); let value: unknown = raw;
    if (k === "faq") { try { value = raw ? JSON.parse(raw) : []; } catch { throw new Error("FAQ must be valid JSON"); } }
    await db.siteSetting.upsert({ where: { key: k }, update: { value: value as never }, create: { key: k, value: value as never } });
  }
  await db.auditLog.create({ data: { action: "SETTINGS_UPDATE", userId: s.uid } });
  revalidatePath("/", "layout");
}
