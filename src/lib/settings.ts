import { cache } from "react";
import { db } from "./db";
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const LYONDEV_EMAIL = "leonochieng436@gmail.com";
export const LYONDEV_WHATSAPP = "254757308631";
export const LYONDEV_WHATSAPP_DISPLAY = "+254757308631";
export const getSettings = cache(async () => ({
  ...Object.fromEntries((await db.siteSetting.findMany()).map((r) => [r.key, r.value])),
  email: LYONDEV_EMAIL,
  whatsapp: LYONDEV_WHATSAPP,
}) as Record<string, any>);
export const waLink = (
  num = LYONDEV_WHATSAPP,
  text = "Hello LYONDEV, I would like to make an enquiry about your services.",
) => `https://wa.me/${num.replace(/\D/g, "")}?text=${encodeURIComponent(text)}`;
export const serviceWaLink = (title: string) => {
  const message = /custom software/i.test(title)
    ? "Hello LYONDEV, I would like to discuss a custom software development project."
    : /website/i.test(title)
      ? "Hello LYONDEV, I am interested in developing a professional website for my business."
      : `Hello LYONDEV, I am interested in ${title} for my business.`;
  return waLink(undefined, message);
};
