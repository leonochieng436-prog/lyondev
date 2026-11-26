"use client";

import { useActionState } from "react";
import Link from "next/link";
import { submitInquiry, type FormState } from "@/app/(public)/contact/actions";

const initialState: FormState = { ok: false };
const inputClass =
  "mt-1 w-full border border-white/15 bg-navy px-3 py-2.5 text-sm text-white placeholder:text-slate-400 focus:border-cyan focus:outline-none focus:ring-2 focus:ring-cyan/30";

export default function QuickRequestCard() {
  const [state, action, pending] = useActionState(submitInquiry, initialState);

  if (state.ok) {
    return (
      <div className="border border-cyan/40 bg-card p-6 sm:p-7" role="status" aria-live="polite">
        <p className="text-sm font-semibold text-cyan">Request received</p>
        <p className="mt-3 text-sm leading-6 text-white">{state.message}</p>
      </div>
    );
  }

  const error = (name: string) => {
    const message = state.errors?.[name]?.[0];
    return message ? (
      <span className="mt-1 block text-xs text-rose-300" id={`${name}-error`}>
        {message}
      </span>
    ) : null;
  };

  return (
    <form action={action} data-analytics-event="homepage_request_submit" className="border border-white/15 bg-ink/95 p-4 backdrop-blur sm:p-7">
      <input name="website" tabIndex={-1} autoComplete="off" className="hidden" aria-hidden="true" />
      <input type="hidden" name="service" value="Quick request" />
      <input type="hidden" name="country" value="Kenya" />
      <input type="hidden" name="organization" value="" />
      <input type="hidden" name="title" value="" />
      <input type="hidden" name="budget" value="" />
      <input type="hidden" name="timeline" value="" />
      <input type="hidden" name="contactMethod" value="PHONE" />
      <h2 className="font-head text-xl font-bold text-white">Send a request</h2>
      <p className="mt-1 text-sm text-slate-300">Share a few details and we will call you back.</p>

      <label className="mt-5 block text-sm font-medium text-slate-100">
        Name
        <input
          name="name"
          autoComplete="name"
          required
          minLength={2}
          maxLength={100}
          aria-invalid={Boolean(state.errors?.name)}
          aria-describedby={state.errors?.name ? "name-error" : undefined}
          className={inputClass}
        />
        {error("name")}
      </label>

      <label className="mt-4 block text-sm font-medium text-slate-100">
        Email
        <input
          name="email"
          type="email"
          autoComplete="email"
          required
          className={inputClass}
        />
        {error("email")}
      </label>

      <label className="mt-4 block text-sm font-medium text-slate-100">
        Phone
        <input
          name="phone"
          type="tel"
          autoComplete="tel"
          placeholder="0712 345 678"
          required
          aria-invalid={Boolean(state.errors?.phone)}
          aria-describedby={state.errors?.phone ? "phone-error" : undefined}
          className={inputClass}
        />
        {error("phone")}
      </label>

      <label className="mt-4 block text-sm font-medium text-slate-100">
        Message
        <textarea
          name="message"
          rows={3}
          required
          minLength={10}
          maxLength={3000}
          aria-invalid={Boolean(state.errors?.message)}
          aria-describedby={state.errors?.message ? "message-error" : undefined}
          className={inputClass}
        />
        {error("message")}
      </label>

      {state.message && (
        <p className="mt-3 text-sm text-rose-300" role="alert">
          {state.message}
        </p>
      )}
      <p className="mt-3 text-xs leading-5 text-slate-400">
        We use these details to respond to your request. See our{" "}
        <Link className="text-brand underline" href="/legal/privacy-policy">Privacy and Data Protection draft</Link>.
      </p>
      <button
        type="submit"
        disabled={pending}
        className="mt-5 min-h-11 w-full bg-brand px-5 py-3 text-sm font-semibold text-white transition-colors hover:bg-brand/90 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cyan disabled:cursor-wait disabled:opacity-60"
      >
        {pending ? "Sending request…" : "Send request"}
      </button>
    </form>
  );
}
