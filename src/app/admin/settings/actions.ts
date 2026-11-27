"use server";
import { revalidatePath } from "next/cache";
import { db } from "@/lib/db";
import { requirePerm } from "@/lib/auth";
import { HOME_IMAGE_SETTINGS } from "@/lib/settings";
import { upload } from "../media/actions";
const KEYS = ["companyName", "tagline", "aboutSummary", "vision", "mission", "values", "email", "phone", "whatsapp", "address", "addressPubliclyVerified", "hours", "facebook", "twitter", "linkedin", "gaId", "faq"];

export type ImageSettingState = {
  message?: string;
  error?: string;
  url?: string;
};

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

export async function saveImageSetting(
  _previousState: ImageSettingState,
  fd: FormData,
): Promise<ImageSettingState> {
  const session = await requirePerm("*");
  const key = String(fd.get("key") ?? "");
  const setting = HOME_IMAGE_SETTINGS.find((item) => item.key === key);
  if (!setting) throw new Error("Unknown image setting");

  const file = fd.get("file");
  if (!file || typeof file === "string" || file.size === 0) {
    return { error: "Choose an image to upload." };
  }

  const uploadForm = new FormData();
  uploadForm.set("file", file);
  const result = await upload({}, uploadForm);
  if (!result.url) return { error: result.msg ?? "Image upload failed." };

  await db.siteSetting.upsert({
    where: { key },
    update: { value: result.url as never },
    create: { key, value: result.url as never },
  });
  await db.auditLog.create({
    data: { action: "SETTINGS_IMAGE_UPDATE", userId: session.uid },
  });

  revalidatePath("/", "layout");
  revalidatePath("/admin/settings");
  return { message: `${setting.title} image updated.`, url: result.url };
}
