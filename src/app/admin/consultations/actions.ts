"use server";
import { revalidatePath } from "next/cache";
import { z } from "zod";
import { db } from "@/lib/db";
import { requirePerm } from "@/lib/auth";
export async function setConsultation(fd: FormData) {
  const s = await requirePerm("leads"); const id = String(fd.get("id"));
  const status = z.enum(["PENDING", "CONFIRMED", "RESCHEDULED", "COMPLETED", "CANCELLED"]).parse(fd.get("status")); const notes = String(fd.get("notes") ?? "").slice(0, 2000);
  const c = await db.consultation.findUniqueOrThrow({ where: { id } });
  if (status === "CONFIRMED" && await db.consultation.count({ where: { id: { not: id }, status: "CONFIRMED", startsAt: { lt: c.endsAt }, endsAt: { gt: c.startsAt } } })) throw new Error("Overlaps a confirmed appointment");
  await db.consultation.update({ where: { id }, data: { status, notes } });
  await db.auditLog.create({ data: { action: `CONSULTATION_${status}`, entity: "Consultation", entityId: id, userId: s.uid } });
  revalidatePath("/admin/consultations");
}
