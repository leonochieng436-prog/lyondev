"use client";
import { useActionState, useState } from "react";
import Link from "next/link";
import { submitInquiry, type FormState } from "../contact/actions";
type Pack = { id: string; group: string; name: string; from: number; to: number | null; unit: string };
type Addon = { id: string; name: string; from: number; to: number | null };
const kes = (n: number) => "KES " + n.toLocaleString("en-KE");
export default function Wizard({ packs, addons }: { packs: Pack[]; addons: Addon[] }) {
  const [step, setStep] = useState(1);
  const [group, setGroup] = useState(packs[0]?.group ?? "");
  const [pid, setPid] = useState("");
  const [picked, setPicked] = useState<string[]>([]);
  const [details, setDetails] = useState("");
  const [st, action, pending] = useActionState(submitInquiry, { ok: false } as FormState);
  const pack = packs.find((p) => p.id === pid);
  const chosen = addons.filter((a) => picked.includes(a.id));
  const min = (pack?.from ?? 0) + chosen.reduce((s, a) => s + a.from, 0);
  const max = (pack?.to ?? pack?.from ?? 0) + chosen.reduce((s, a) => s + (a.to ?? a.from), 0);
  const estimate = pack ? (min === max ? kes(min) : `${kes(min)} – ${kes(max)}`) + (pack.unit === "one-time" ? "" : ` ${pack.unit}`) : "";
  const message = `${details}\n\nPackage: ${pack?.name ?? "-"}\nAdd-ons: ${chosen.map((a) => a.name).join(", ") || "none"}\nIndicative estimate: ${estimate}`;
  const err = (n: string) => st.errors?.[n] && <span className="text-xs text-red-600">{st.errors[n]![0]}</span>;
  if (st.ok) return <p className="mt-8 rounded-lg bg-green-50 p-4 text-green-800">{st.message}</p>;
  const I = "mt-1 w-full rounded-lg border p-2";
  return (<div className="mt-6">
    <p className="text-sm text-muted">Step {step} of 3</p>
    {step === 1 && <div className="mt-4 space-y-4">
      <label className="block text-sm font-medium">Service category<select className={I} value={group} onChange={(e) => { setGroup(e.target.value); setPid(""); }}>{[...new Set(packs.map((p) => p.group))].map((g) => <option key={g}>{g}</option>)}</select></label>
      <label className="block text-sm font-medium">Package or solution<select className={I} value={pid} onChange={(e) => setPid(e.target.value)}><option value="">Select…</option>{packs.filter((p) => p.group === group).map((p) => <option key={p.id} value={p.id}>{p.name}</option>)}</select></label>
      <button disabled={!pid} onClick={() => setStep(2)} className="rounded-lg bg-brand px-5 py-2 font-semibold text-white disabled:opacity-50">Next</button></div>}
    {step === 2 && <div className="mt-4 space-y-3"><p className="font-medium">Optional add-ons</p>
      {addons.length === 0 && <p className="text-sm text-muted">No add-ons available.</p>}
      {addons.map((a) => <label key={a.id} className="flex gap-2 text-sm"><input type="checkbox" checked={picked.includes(a.id)} onChange={(e) => setPicked(e.target.checked ? [...picked, a.id] : picked.filter((x) => x !== a.id))} />{a.name} ({kes(a.from)}{a.to ? ` – ${a.to.toLocaleString("en-KE")}` : ""})</label>)}
      <p className="font-semibold">Estimate: {estimate}</p><p className="text-xs text-muted">Your estimate is indicative. A final quotation will be provided after reviewing your project requirements.</p>
      <div className="flex gap-2"><button onClick={() => setStep(1)} className="rounded-lg border px-5 py-2">Back</button><button onClick={() => setStep(3)} className="rounded-lg bg-brand px-5 py-2 font-semibold text-white">Next</button></div></div>}
    {step === 3 && <form action={action} data-analytics-event="quote_form_submit" className="mt-4 space-y-3">
      <input name="website" tabIndex={-1} autoComplete="off" className="hidden" aria-hidden /><input type="hidden" name="service" value={pack?.name ?? ""} /><input type="hidden" name="message" value={message} />
      {[["name", "Full name"], ["email", "Email"], ["phone", "Phone"], ["organization", "Business or organization"], ["country", "Country"], ["title", "Project title"], ["budget", "Estimated budget"], ["timeline", "Expected timeline"]].map(([n, l]) => <label key={n} className="block text-sm font-medium">{l}<input name={n} defaultValue={n === "country" ? "Kenya" : ""} className={I} />{err(n)}</label>)}
      <label className="block text-sm font-medium">Project description<textarea value={details} onChange={(e) => setDetails(e.target.value)} rows={4} className={I} />{err("message")}</label>
      <label className="block text-sm font-medium">Preferred contact<select name="contactMethod" className={I}><option value="WHATSAPP">WhatsApp</option><option value="EMAIL">Email</option><option value="PHONE">Phone call</option></select></label>
      <p className="text-xs leading-5 text-muted">We use these details to respond to your project request. See the <Link className="underline" href="/legal/privacy-policy">Privacy and Data Protection draft</Link>.</p>
      {st.message && <p className="text-sm text-red-600">{st.message}</p>}
      <div className="flex gap-2"><button type="button" onClick={() => setStep(2)} className="rounded-lg border px-5 py-2">Back</button><button disabled={pending} className="rounded-lg bg-brand px-5 py-2 font-semibold text-white">{pending ? "Sending…" : "Submit request"}</button></div></form>}
  </div>);
}
