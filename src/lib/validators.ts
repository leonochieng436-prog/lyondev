import { z } from "zod";
export const kePhone = z.string().trim().transform((v) => v.replace(/[\s-]/g, ""))
  .refine((v) => /^(\+\d{9,14}|0[17]\d{8})$/.test(v), "Enter a valid phone number, e.g. 0712 345 678")
  .transform((v) => (v.startsWith("0") ? "+254" + v.slice(1) : v));
export const inquirySchema = z.object({
  name: z.string().trim().min(2).max(100), email: z.string().trim().email(), phone: kePhone,
  organization: z.string().trim().max(120).optional(), country: z.string().trim().max(60).default("Kenya"),
  service: z.string().trim().min(2).max(120), title: z.string().trim().max(150).optional(),
  budget: z.string().trim().max(60).optional(), timeline: z.string().trim().max(60).optional(),
  message: z.string().trim().min(10).max(3000), contactMethod: z.enum(["WHATSAPP", "EMAIL", "PHONE"]),
});
