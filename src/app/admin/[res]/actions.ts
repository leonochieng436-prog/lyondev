"use server";
/* eslint-disable @typescript-eslint/no-explicit-any */
import bcrypt from "bcryptjs";
import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { db } from "@/lib/db";
import { requirePerm } from "@/lib/auth";
import { RES } from "@/lib/resources";
import { upload } from "../media/actions";
const cfgOf = (fd: FormData) => { const res = String(fd.get("_res")); const cfg = RES[res]; if (!cfg) throw new Error("Unknown resource"); return { res, cfg }; };
export async function save(fd: FormData) {
  const { res, cfg } = cfgOf(fd); const s = await requirePerm(cfg.perm); const id = String(fd.get("_id") || "");
  const m = (db as any)[cfg.model]; const data: any = {}; let lines: string[] | undefined;
  for (const f of cfg.fields) {
    const v = fd.get(f.name);
    if (f.type === "checkbox") data[f.name] = v === "on";
    else if (f.type === "number") { if (v !== "" && v != null) data[f.name] = Number(v); else if (!f.required) data[f.name] = null; }
    else if (f.type === "csv") data[f.name] = String(v ?? "").split(",").map((x) => x.trim()).filter(Boolean);
    else if (f.type === "date") data[f.name] = v ? new Date(String(v)) : f.required ? undefined : null;
    else if (f.type === "lines") lines = String(v ?? "").split("\n").map((x) => x.trim()).filter(Boolean);
    else if (f.type === "password") { if (v) { if (String(v).length < 10) throw new Error("Password must be at least 10 characters"); data.passwordHash = await bcrypt.hash(String(v), 12); } else if (!id) throw new Error("Password required"); }
    else { const t = String(v ?? "").trim(); if (t) data[f.name] = t; else if (f.required) throw new Error(`${f.label} is required`); }
  }
  const imageField = cfg.fields.find((field) => field.type === "image");
  const imageFile = fd.get("coverImageFile");
  if (imageField && imageFile && typeof imageFile !== "string" && imageFile.size > 0) {
    const uploadForm = new FormData();
    uploadForm.set("file", imageFile);
    const result = await upload({}, uploadForm);
    if (!result.url) throw new Error(result.msg ?? "Cover image upload failed.");
    data[imageField.name] = result.url;
  }
  if (data.slug && !/^[a-z0-9-]+$/.test(data.slug)) throw new Error("Slug may only contain a-z, 0-9 and -");
  if (data.email) data.email = String(data.email).toLowerCase();
  if (cfg.model === "blogPost" && data.status === "PUBLISHED" && !data.publishedAt) data.publishedAt = new Date();
  if (cfg.model === "quote" && String(data.inquiryId ?? "").startsWith("LD-")) { const i = await db.inquiry.findUnique({ where: { reference: data.inquiryId } }); if (!i) throw new Error("Inquiry reference not found"); data.inquiryId = i.id; }
  if (cfg.rel && lines) { const create = lines.map(cfg.map ?? ((text: string) => ({ text }))); data[cfg.rel] = id ? { deleteMany: {}, create } : { create }; }
  if (cfg.model === "quote") { delete data.items; }
  const row = id ? await m.update({ where: { id }, data }) : await m.create({ data });
  await db.auditLog.create({ data: { action: id ? "UPDATE" : "CREATE", entity: cfg.model, entityId: row.id, userId: s.uid } });
  revalidatePath("/", "layout"); redirect(`/admin/${res}`);
}
export async function remove(fd: FormData) {
  const { res, cfg } = cfgOf(fd); const s = await requirePerm(cfg.perm); const id = String(fd.get("_id"));
  if (cfg.model === "adminUser" && id === s.uid) throw new Error("You cannot delete your own account");
  await (db as any)[cfg.model].delete({ where: { id } });
  await db.auditLog.create({ data: { action: "DELETE", entity: cfg.model, entityId: id, userId: s.uid } });
  revalidatePath("/", "layout"); redirect(`/admin/${res}`);
}
