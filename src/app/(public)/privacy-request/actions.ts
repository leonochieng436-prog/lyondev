"use server";

import { z } from "zod";
import { db } from "@/lib/db";

export type PrivacyRequestState = { ok: boolean; message?: string; errors?: Record<string, string[]> };

const requestSchema = z.object({
  name: z.string().trim().min(2).max(100),
  email: z.string().trim().email().max(254).transform((value) => value.toLowerCase()),
  requestType: z.enum(["ACCESS", "CORRECTION", "ERASURE", "OBJECTION", "OTHER"]),
  details: z.string().trim().min(10).max(2000),
});

export async function submitPrivacyRequest(
  _: PrivacyRequestState,
  formData: FormData,
): Promise<PrivacyRequestState> {
  if (formData.get("website")) {
    return { ok: true, message: "Your request has been received." };
  }

  const parsed = requestSchema.safeParse(Object.fromEntries(formData));
  if (!parsed.success) {
    return { ok: false, errors: parsed.error.flatten().fieldErrors };
  }

  const since = new Date(Date.now() - 60 * 60 * 1000);
  const recentCount = await db.privacyRequest.count({
    where: { email: parsed.data.email, createdAt: { gt: since } },
  });
  if (recentCount >= 3) {
    return { ok: false, message: "Too many requests from this email address. Please try again later." };
  }

  await db.privacyRequest.create({ data: parsed.data });
  return {
    ok: true,
    message: "Your request has been received. LYONDEV will contact you to verify and process it.",
  };
}
