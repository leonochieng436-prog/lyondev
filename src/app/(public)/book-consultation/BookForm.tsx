"use client";

import { useActionState } from "react";
import Link from "next/link";
import { book, type BookState } from "./actions";

const I = "mt-1 w-full rounded-lg border p-2";

export default function BookForm() {
  const [state, action, pending] = useActionState(book, { ok: false } as BookState);

  return (
    <main className="page-container">
      <h1 className="text-4xl font-extrabold text-navy">Book a Consultation</h1>
      <p className="mt-2 text-sm text-muted">
        Times are in East Africa Time (Africa/Nairobi). Sessions last 60 minutes.
      </p>
      {state.ok ? (
        <p className="mt-6 rounded-lg bg-green-50 p-4 text-green-800">{state.message}</p>
      ) : (
        <form
          action={action}
          data-analytics-event="consultation_booking_submit"
          className="mt-6 space-y-3"
        >
          <input name="website" tabIndex={-1} autoComplete="off" className="hidden" aria-hidden />
          <label className="block text-sm font-medium">
            Consultation type
            <select name="type" className={I}>
              {[
                "Website consultation",
                "Custom software consultation",
                "Business automation consultation",
                "IT and cybersecurity consultation",
                "General technology consultation",
              ].map((type) => (
                <option key={type}>{type}</option>
              ))}
            </select>
          </label>
          <div className="grid grid-cols-2 gap-3">
            <label className="text-sm font-medium">
              Date<input type="date" name="date" required className={I} />
            </label>
            <label className="text-sm font-medium">
              Time<input type="time" name="time" required step={1800} className={I} />
            </label>
          </div>
          {["name", "email", "phone"].map((name) => (
            <label key={name} className="block text-sm font-medium capitalize">
              {name}<input name={name} required className={I} />
            </label>
          ))}
          <label className="block text-sm font-medium">
            Project details<textarea name="details" rows={3} className={I} />
          </label>
          <p className="text-xs leading-5 text-muted">
            We use these details to review and respond to your booking request. See the{" "}
            <Link className="underline" href="/legal/privacy-policy">Privacy and Data Protection draft</Link>.
          </p>
          {state.message && <p className="text-sm text-red-600">{state.message}</p>}
          <button disabled={pending} className="rounded-lg bg-brand px-6 py-2 font-semibold text-black">
            {pending ? "Booking..." : "Request booking"}
          </button>
        </form>
      )}
    </main>
  );
}
