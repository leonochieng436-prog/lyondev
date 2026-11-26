"use server";
import { z } from "zod";
import { db } from "@/lib/db";
import { PRIVACY_NOTICE_VERSION } from "@/lib/legal";

export type NewsletterState = { ok: boolean; message?: string };

export async function submitNewsletter(_: NewsletterState, fd: FormData): Promise<NewsletterState> {
  const parsed = z.string().trim().email().max(254).safeParse(String(fd.get("email") ?? "").toLowerCase());
  if (!parsed.success) return { ok: false, message: "Enter a valid email address." };
  if (fd.get("consent") !== "on") {
    return { ok: false, message: "Please confirm you agree to receive email updates." };
  }

  const email = parsed.data;
  await db.newsletterSubscriber.upsert({
    where: { email },
    update: { consentAt: new Date(), consentVersion: PRIVACY_NOTICE_VERSION },
    create: { email, consentAt: new Date(), consentVersion: PRIVACY_NOTICE_VERSION },
  });
  return { ok: true, message: "You are subscribed." };
}
