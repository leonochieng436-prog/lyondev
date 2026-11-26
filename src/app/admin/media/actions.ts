"use server";
import { createHash } from "crypto";
import { revalidatePath } from "next/cache";
import { db } from "@/lib/db";
import { requirePerm } from "@/lib/auth";
const OK = ["image/jpeg", "image/png", "image/webp"], MAX = 5 * 1024 * 1024;
export async function upload(_: { msg?: string; url?: string }, fd: FormData) {
  await requirePerm("content");
  const file = fd.get("file") as File | null; const { CLOUDINARY_CLOUD_NAME: cloud, CLOUDINARY_API_KEY: key, CLOUDINARY_API_SECRET: secret } = process.env;
  if (!cloud || !key || !secret) return { msg: "Cloudinary is not configured. See README." };
  if (!file || file.size === 0) return { msg: "Choose an image." };
  if (!OK.includes(file.type) || file.size > MAX) return { msg: "Only JPG, PNG or WebP up to 5 MB." };
  const buf = Buffer.from(await file.arrayBuffer());
  const magic = buf.subarray(0, 4).toString("hex"); // verify real file type, not just the declared MIME
  if (!(magic.startsWith("ffd8ff") || magic === "89504e47" || buf.subarray(8, 12).toString() === "WEBP")) return { msg: "File content is not a valid image." };
  const ts = String(Math.floor(Date.now() / 1000)), folder = "lyondev";
  const signature = createHash("sha1").update(`folder=${folder}&timestamp=${ts}${secret}`).digest("hex");
  const body = new FormData(); body.set("file", new Blob([buf], { type: file.type })); body.set("api_key", key); body.set("timestamp", ts); body.set("folder", folder); body.set("signature", signature);
  const r = await fetch(`https://api.cloudinary.com/v1_1/${cloud}/image/upload`, { method: "POST", body }); const j = await r.json();
  if (!r.ok) return { msg: "Upload failed: " + (j.error?.message ?? r.status) };
  await db.mediaAsset.create({ data: { url: j.secure_url, publicId: j.public_id, mimeType: file.type, sizeBytes: file.size } });
  revalidatePath("/admin/media");
  return { msg: "Uploaded successfully.", url: j.secure_url as string };
}
