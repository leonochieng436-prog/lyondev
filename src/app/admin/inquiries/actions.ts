"use server";
import { revalidatePath } from "next/cache";
import { z } from "zod";
import { db } from "@/lib/db";
import { requirePerm } from "@/lib/auth";
const S = z.enum(["NEW", "CONTACTED", "IN_DISCUSSION", "QUOTED", "CONVERTED", "CLOSED"]);
export async function setStatus(fd: FormData) {
  const s = await requirePerm("leads");
  const id = String(fd.get("id")), status = S.parse(fd.get("status"));
  await db.inquiry.update({ where: { id }, data: { status } });
  await db.auditLog.create({ data: { action: `INQUIRY_STATUS_${status}`, entity: "Inquiry", entityId: id, userId: s.uid } });
  revalidatePath("/admin/inquiries");
}
