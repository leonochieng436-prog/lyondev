"use client";

import { useActionState } from "react";
import Link from "next/link";
import { ArrowUpRight, MessageCircle } from "lucide-react";
import { submitInquiry, type FormState } from "@/app/(public)/contact/actions";
import FramedCard from "./FramedCard";

type ServiceOption = { id: string; title: string };
type FieldName =
  | "name"
  | "email"
  | "phone"
  | "organization"
  | "service"
  | "budget"
  | "message"
  | "contactMethod";

const initialState: FormState = { ok: false };
const inputClass =
  "mt-2 min-h-11 w-full border-0 border-b border-slate-500 bg-transparent px-0 py-2.5 text-base text-white transition-colors focus:border-brand focus:outline-none focus-visible:ring-2 focus-visible:ring-brand/50";
const labelClass =
  "block text-[11px] font-medium uppercase tracking-[0.12em] text-slate-400";

function FieldError({ id, message }: { id: string; message?: string }) {
  return message ? (
    <span id={id} role="alert" className="mt-2 block text-sm text-rose-300">
      {message}
    </span>
  ) : null;
}

function waFollowUpLink(phone: string, reference: string) {
  const number = phone.replace(/\D/g, "");
  if (!number) return null;
  const message = `Hello LyonDev, I am following up on inquiry ${reference}.`;
  return `https://wa.me/${number}?text=${encodeURIComponent(message)}`;
}

export default function ContactForm({
  services,
  selectedService,
  whatsapp,
}: {
  services: ServiceOption[];
  selectedService: string;
  whatsapp: string;
}) {
  const [state, action, pending] = useActionState(submitInquiry, initialState);

  if (state.ok) {
    const whatsappHref =
      whatsapp && state.reference ? waFollowUpLink(whatsapp, state.reference) : null;

    return (
      <FramedCard title="Thank you">
        <div role="status" aria-live="polite" className="py-2 text-center">
          <p className="font-head text-xl font-semibold text-white">
            Your enquiry has been recorded. Our team will follow up using your preferred contact method.
          </p>
          {state.reference ? (
            <p className="mt-4 text-sm text-slate-300">
              Reference number:{" "}
              <span className="font-semibold text-white">{state.reference}</span>
            </p>
          ) : (
            <p className="mt-4 text-sm text-slate-300">
              Thank you for getting in touch.
            </p>
          )}
          {whatsappHref && (
            <a
              href={whatsappHref}
              target="_blank"
              rel="noreferrer"
              className="mt-6 inline-flex min-h-11 items-center justify-center gap-2 bg-brand px-5 py-3 text-sm font-semibold text-black transition-colors hover:bg-cyan focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cyan"
            >
              <MessageCircle className="h-4 w-4" aria-hidden="true" />
              Chat on WhatsApp
              <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
            </a>
          )}
        </div>
      </FramedCard>
    );
  }

  const errorFor = (name: FieldName) => state.errors?.[name]?.[0];
  const errorId = (name: FieldName) =>
    name === "contactMethod" ? "contact-method-error" : `contact-${name}-error`;
  const describedBy = (name: FieldName) =>
    errorFor(name) ? errorId(name) : undefined;

  return (
    <FramedCard title="Send us a message">
      <form action={action} data-analytics-event="contact_form_submit" className="grid gap-x-6 gap-y-5 sm:grid-cols-2">
        <input
          name="website"
          tabIndex={-1}
          autoComplete="off"
          className="hidden"
          aria-hidden="true"
        />
        <label className={labelClass} htmlFor="contact-name">
          Name
          <input
            id="contact-name"
            name="name"
            autoComplete="name"
            required
            minLength={2}
            maxLength={100}
            aria-invalid={Boolean(errorFor("name"))}
            aria-describedby={describedBy("name")}
            className={inputClass}
          />
          <FieldError id="contact-name-error" message={errorFor("name")} />
        </label>

        <label className={labelClass} htmlFor="contact-email">
          Email
          <input
            id="contact-email"
            name="email"
            type="email"
            autoComplete="email"
            required
            aria-invalid={Boolean(errorFor("email"))}
            aria-describedby={describedBy("email")}
            className={inputClass}
          />
          <FieldError id="contact-email-error" message={errorFor("email")} />
        </label>

        <label className={labelClass} htmlFor="contact-phone">
          Phone
          <input
            id="contact-phone"
            name="phone"
            type="tel"
            autoComplete="tel"
            required
            aria-invalid={Boolean(errorFor("phone"))}
            aria-describedby={describedBy("phone")}
            className={inputClass}
          />
          <FieldError id="contact-phone-error" message={errorFor("phone")} />
        </label>

        <label className={labelClass} htmlFor="contact-organization">
          Business or company name
          <input
            id="contact-organization"
            name="organization"
            autoComplete="organization"
            maxLength={120}
            aria-invalid={Boolean(errorFor("organization"))}
            aria-describedby={describedBy("organization")}
            className={inputClass}
          />
          <FieldError id="contact-organization-error" message={errorFor("organization")} />
        </label>

        <label className={labelClass} htmlFor="contact-service">
          Service required
          <select
            id="contact-service"
            name="service"
            required
            defaultValue={selectedService}
            aria-invalid={Boolean(errorFor("service"))}
            aria-describedby={describedBy("service")}
            className={inputClass}
          >
            <option value="General enquiry">General enquiry</option>
            {services.map((service) => (
              <option key={service.id} value={service.title}>
                {service.title}
              </option>
            ))}
          </select>
          <FieldError id="contact-service-error" message={errorFor("service")} />
        </label>

        <label className={labelClass} htmlFor="contact-budget">
          Estimated budget
          <input
            id="contact-budget"
            name="budget"
            maxLength={60}
            aria-invalid={Boolean(errorFor("budget"))}
            aria-describedby={describedBy("budget")}
            className={inputClass}
          />
          <FieldError id="contact-budget-error" message={errorFor("budget")} />
        </label>

        <label className={`${labelClass} sm:col-span-2`} htmlFor="contact-message">
          Project description
          <textarea
            id="contact-message"
            name="message"
            rows={4}
            required
            minLength={10}
            maxLength={3000}
            aria-invalid={Boolean(errorFor("message"))}
            aria-describedby={describedBy("message")}
            className={`${inputClass} min-h-28 resize-y`}
          />
          <FieldError id="contact-message-error" message={errorFor("message")} />
        </label>

        <label className={`${labelClass} sm:col-span-2`} htmlFor="contact-method">
          Preferred contact method
          <select
            id="contact-method"
            name="contactMethod"
            required
            defaultValue="WHATSAPP"
            aria-invalid={Boolean(errorFor("contactMethod"))}
            aria-describedby={describedBy("contactMethod")}
            className={inputClass}
          >
            <option value="WHATSAPP">WhatsApp</option>
            <option value="EMAIL">Email</option>
            <option value="PHONE">Phone</option>
          </select>
          <FieldError id="contact-method-error" message={errorFor("contactMethod")} />
        </label>

        {state.message && (
          <p className="sm:col-span-2" role="alert">
            {state.message}
          </p>
        )}

        <p className="text-xs leading-5 text-slate-400 sm:col-span-2">
          We use these details to respond to your enquiry. See the{" "}
          <Link className="text-brand underline" href="/legal/privacy-policy">Privacy and Data Protection draft</Link>.
        </p>
        <button
          type="submit"
          disabled={pending}
          className="min-h-11 w-full bg-brand px-5 py-3 text-sm font-semibold text-black transition-colors hover:bg-cyan focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cyan disabled:cursor-wait disabled:opacity-60 sm:col-span-2"
        >
          {pending ? "Sending…" : "Send message"}
        </button>
      </form>
    </FramedCard>
  );
}
