import type { Metadata } from "next";
import BookForm from "./BookForm";
import { socialMetadata } from "@/lib/seo";

export const metadata: Metadata = {
  title: { absolute: "Book a Technology Consultation in Nairobi | LYONDEV" },
  description:
    "Request a consultation with LYONDEV to discuss your website, custom software or technology project. Sessions are scheduled in East Africa Time.",
  alternates: { canonical: "/book-consultation" },
  ...socialMetadata("/book-consultation"),
};

export default function BookConsultationPage() {
  return <BookForm />;
}
