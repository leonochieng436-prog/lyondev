"use client";

import { useActionState } from "react";
import Link from "next/link";
import { submitNewsletter, type NewsletterState } from "@/app/(public)/actions";

const initialState: NewsletterState = { ok: false };

export default function NewsletterForm() {
  const [state, action, pending] = useActionState(submitNewsletter, initialState);

  if (state.ok) {
    return (
      <p className="mt-4 text-sm text-brand" role="status">
        {state.message} To stop email updates, contact{" "}
        <a className="underline" href="mailto:leonochieng436@gmail.com">leonochieng436@gmail.com</a>.
      </p>
    );
  }

  return (
    <form action={action} data-analytics-event="newsletter_signup_submit" className="mt-4 space-y-3">
      <label className="sr-only" htmlFor="newsletter-email">Newsletter email</label>
      <input
        id="newsletter-email"
        name="email"
        type="email"
        required
        placeholder="Your email address"
        className="min-w-0 w-full border border-white/15 bg-ink px-3 py-2 text-white placeholder:text-slate-400 focus:border-cyan focus:outline-none focus:ring-2 focus:ring-cyan/30"
      />
      <label className="flex items-start gap-2 text-xs leading-5 text-slate-300">
        <input name="consent" type="checkbox" required className="mt-1 accent-yellow-400" />
        <span>
          I agree to receive occasional email updates. See our{" "}
          <Link className="text-brand underline" href="/legal/privacy-policy">Privacy Policy</Link>.
        </span>
      </label>
      {state.message && <p role="alert" className="text-sm text-rose-300">{state.message}</p>}
      <button
        disabled={pending}
        className="min-h-11 w-full bg-brand px-4 py-2 font-semibold text-black hover:bg-cyan disabled:opacity-60"
      >
        {pending ? "Joining…" : "Join"}
      </button>
    </form>
  );
}
