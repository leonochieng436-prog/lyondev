import type { Metadata } from "next";
import { Manrope, Inter } from "next/font/google";
import { absoluteUrl, COMPANY_DESCRIPTION, SITE_URL } from "@/lib/seo";
import "./globals.css";
import "./contact.css";
const head = Manrope({ subsets: ["latin"], variable: "--font-head" });
const body = Inter({ subsets: ["latin"], variable: "--font-sans" });
export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "Web Development Company in Nairobi, Kenya | LYONDEV",
    template: "%s | LYONDEV",
  },
  description: COMPANY_DESCRIPTION,
  robots: { index: true, follow: true },
  openGraph: {
    siteName: "LYONDEV",
    type: "website",
    url: absoluteUrl("/"),
    images: [{ url: absoluteUrl("/opengraph-image"), width: 1200, height: 630, alt: "LYONDEV — Web Development & Custom Software Solutions in Nairobi, Kenya" }],
  },
  twitter: {
    card: "summary_large_image",
    images: [absoluteUrl("/opengraph-image")],
  },
};
export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${head.variable} ${body.variable}`}>
      <body>{children}</body>
    </html>
  );
}
