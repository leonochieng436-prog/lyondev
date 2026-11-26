"use server";

import { revalidatePath } from "next/cache";
import { z } from "zod";
import { requirePerm } from "@/lib/auth";
import { db } from "@/lib/db";

const statusSchema = z.enum(["NEW", "IN_REVIEW", "COMPLETED", "CLOSED"]);

export async function setPrivacyRequestStatus(formData: FormData) {
  const session = await requirePerm("*");
  const id = z.string().min(1).parse(formData.get("id"));
  const status = statusSchema.parse(formData.get("status"));
  await db.privacyRequest.update({ where: { id }, data: { status } });
  await db.auditLog.create({
    data: {
      action: `PRIVACY_REQUEST_STATUS_${status}`,
      entity: "PrivacyRequest",
      entityId: id,
      userId: session.uid,
    },
  });
  revalidatePath("/admin/privacy-requests");
}
