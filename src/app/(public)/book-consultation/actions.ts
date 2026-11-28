"use server";
import { z } from "zod";
import { db } from "@/lib/db";
import { sendAdminNotification } from "@/lib/email";
import { kePhone } from "@/lib/validators";
export type BookState = { ok: boolean; message?: string };
const S = z.object({ type: z.string().min(2).max(80), date: z.string().regex(/^\d{4}-\d{2}-\d{2}$/), time: z.string().regex(/^\d{2}:\d{2}$/), name: z.string().trim().min(2).max(100), email: z.string().email(), phone: kePhone, details: z.string().max(2000).optional() });
export async function book(_: BookState, fd: FormData): Promise<BookState> {
  if (fd.get("website")) return { ok: true };
  const p = S.safeParse(Object.fromEntries(fd)); if (!p.success) return { ok: false, message: "Please complete all fields with valid details." };
  const startsAt = new Date(`${p.data.date}T${p.data.time}:00+03:00`); // Africa/Nairobi (UTC+3, no DST)
  if (isNaN(+startsAt) || startsAt < new Date()) return { ok: false, message: "Choose a future date and time." };
  const endsAt = new Date(+startsAt + 3600_000);
  const wd = new Date(`${p.data.date}T12:00:00+03:00`).getUTCDay(), min = Number(p.data.time.slice(0, 2)) * 60 + Number(p.data.time.slice(3));
  const av = await db.consultationAvailability.findMany({ where: { weekday: wd, active: true } });
  const ok = av.length ? av.some((a) => min >= a.startMinute && min + 60 <= a.endMinute) : wd >= 1 && wd <= 5 && min >= 540 && min + 60 <= 1020;
  if (!ok) return { ok: false, message: "That time is outside consultation hours." };
  if (await db.consultation.count({ where: { status: "CONFIRMED", startsAt: { lt: endsAt }, endsAt: { gt: startsAt } } })) return { ok: false, message: "That slot is taken. Please pick another." };
  const { date, time, ...rest } = p.data; void date; void time;
  await db.consultation.create({ data: { ...rest, startsAt, endsAt } });
  await sendAdminNotification({
    subject: "New consultation request",
    text: `${p.data.name} (${p.data.email}, ${p.data.phone}) requested a ${p.data.type} on ${p.data.date} at ${p.data.time} (East Africa Time).${p.data.details ? `\n\nDetails:\n${p.data.details}` : ""}`,
  });
  return { ok: true, message: "Request received. We will confirm your appointment by email or phone." };
}
