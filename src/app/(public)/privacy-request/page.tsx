import type { Metadata } from "next";
import PrivacyRequestForm from "./PrivacyRequestForm";

export const metadata: Metadata = {
  title: "Privacy Request | LYONDEV",
  description: "Submit a request or question about personal information processed through the LYONDEV website.",
  alternates: { canonical: "/privacy-request" },
};

export default function PrivacyRequestPage() {
  return (
    <main className="page-container">
      <div className="mx-auto max-w-3xl">
        <div className="border border-brand/70 bg-[#161616] p-5 text-sm text-brand" role="status">
          <strong>Draft process — pending LYONDEV and Kenyan advocate review.</strong>
          <p className="mt-1 text-slate-300">This form provides a contact route and does not determine legal eligibility or response deadlines.</p>
        </div>
        <p className="eyebrow-label mt-10">Privacy</p>
        <h1 className="text-white">Privacy Request</h1>
        <p className="mt-5 text-slate-300">
          Use this form to ask about personal information held by LYONDEV or to request a review. We may contact you to verify your identity before taking action.
        </p>
        <PrivacyRequestForm />
      </div>
    </main>
  );
}
