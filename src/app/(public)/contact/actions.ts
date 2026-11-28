"use server";
import { randomBytes } from "crypto";
import { db } from "@/lib/db";
import { sendAdminNotification } from "@/lib/email";
import { inquirySchema } from "@/lib/validators";
export type FormState = {
  ok: boolean;
  errors?: Record<string, string[]>;
  message?: string;
  reference?: string;
};
export async function submitInquiry(_: FormState, fd: FormData): Promise<FormState> {
  if (fd.get("website")) return { ok: true };
  const p = inquirySchema.safeParse(Object.fromEntries(fd));
  if (!p.success) return { ok: false, errors: p.error.flatten().fieldErrors };
  const recent = await db.inquiry.count({ where: { email: p.data.email, createdAt: { gt: new Date(Date.now() - 3600_000) } } });
  if (recent >= 3) return { ok: false, message: "Too many requests. Please try again later." };
  const reference = "LD-" + randomBytes(3).toString("hex").toUpperCase();
  await db.inquiry.create({ data: { ...p.data, reference } });
  await sendAdminNotification({
    subject: `New inquiry ${reference}`,
    text: `${p.data.name} (${p.data.email}) – ${p.data.service}\n\n${p.data.message}`,
  });
  return {
    ok: true,
    reference,
    message: `Thanks! Your enquiry was saved with reference ${reference}. We will reply within one business day.`,
  };
}
