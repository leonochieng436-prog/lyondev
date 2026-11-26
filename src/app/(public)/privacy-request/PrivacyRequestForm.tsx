"use client";

import { useActionState } from "react";
import Link from "next/link";
import { submitPrivacyRequest, type PrivacyRequestState } from "./actions";

const initialState: PrivacyRequestState = { ok: false };
const inputClass = "mt-2 w-full border border-white/20 bg-[#111] px-3 py-3 text-white focus:border-brand focus:outline-none";

export default function PrivacyRequestForm() {
  const [state, action, pending] = useActionState(submitPrivacyRequest, initialState);

  if (state.ok) {
    return <p role="status" className="mt-6 border border-brand/50 bg-[#111] p-5 text-brand">{state.message}</p>;
  }

  return (
    <form action={action} className="mt-8 space-y-5">
      <input name="website" tabIndex={-1} autoComplete="off" className="hidden" aria-hidden="true" />
      <label className="block text-sm font-medium text-slate-200">
        Name
        <input name="name" autoComplete="name" minLength={2} maxLength={100} required className={inputClass} />
        {state.errors?.name?.[0] && <span role="alert" className="mt-1 block text-rose-300">{state.errors.name[0]}</span>}
      </label>
      <label className="block text-sm font-medium text-slate-200">
        Email
        <input name="email" type="email" autoComplete="email" maxLength={254} required className={inputClass} />
        {state.errors?.email?.[0] && <span role="alert" className="mt-1 block text-rose-300">{state.errors.email[0]}</span>}
      </label>
      <label className="block text-sm font-medium text-slate-200">
        Request type
        <select name="requestType" required defaultValue="ACCESS" className={inputClass}>
          <option value="ACCESS">Ask what personal information is held / request access</option>
          <option value="CORRECTION">Request a correction</option>
          <option value="ERASURE">Request erasure</option>
          <option value="OBJECTION">Object to a use of personal information</option>
          <option value="OTHER">Other privacy question</option>
        </select>
      </label>
      <label className="block text-sm font-medium text-slate-200">
        Details
        <textarea name="details" minLength={10} maxLength={2000} rows={5} required className={inputClass} />
        <span className="mt-1 block text-xs font-normal text-slate-400">
          Describe the request without including passwords, identity-document numbers, or sensitive details.
        </span>
        {state.errors?.details?.[0] && <span role="alert" className="mt-1 block text-rose-300">{state.errors.details[0]}</span>}
      </label>
      <p className="text-sm text-slate-400">
        We use these details to review and respond to your request. Read the{" "}
        <Link href="/legal/privacy-policy" className="text-brand underline">Privacy and Data Protection draft</Link>.
      </p>
      {state.message && <p role="alert" className="text-sm text-rose-300">{state.message}</p>}
      <button disabled={pending} className="min-h-11 bg-brand px-5 py-3 font-semibold text-black disabled:opacity-60">
        {pending ? "Submitting…" : "Submit privacy request"}
      </button>
    </form>
  );
}
