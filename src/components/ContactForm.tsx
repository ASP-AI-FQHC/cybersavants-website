"use client";
import { useEffect, useRef, useState } from "react";
import { FOLLOWUPS, ORG_TYPES, SIZES } from "@/lib/contact";
import { SITE } from "@/lib/config";

declare global { interface Window { turnstile?: { render: (el: HTMLElement, o: { sitekey: string; callback: (t: string) => void }) => void } } }
const TS_KEY = process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY;

export default function ContactForm() {
  const [state, setState] = useState<"idle" | "sending" | "done" | "error">("idle");
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [msg, setMsg] = useState("");
  const started = useRef(Date.now()); const token = useRef(""); const tsEl = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (!TS_KEY || !tsEl.current) return;
    const s = document.createElement("script"); s.src = "https://challenges.cloudflare.com/turnstile/v0/api.js"; s.async = true;
    s.onload = () => window.turnstile?.render(tsEl.current!, { sitekey: TS_KEY, callback: (t) => { token.current = t; } });
    document.head.appendChild(s);
  }, []);

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault(); setState("sending"); setErrors({}); setMsg("");
    const fd = Object.fromEntries(new FormData(e.currentTarget).entries());
    try {
      const r = await fetch("/api/contact", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ ...fd, startedAt: started.current, token: token.current }) });
      const j = await r.json().catch(() => ({}));
      if (r.ok) { setState("done"); return; }
      if (r.status === 422) { setErrors(j.errors ?? {}); setState("idle"); requestAnimationFrame(() => (document.querySelector("[aria-invalid=true]") as HTMLElement | null)?.focus()); return; }
      setState("error");
      setMsg(j.error === "not_configured" ? "Online submission is not available yet." : j.error === "rate_limited" ? "Too many attempts. Please try again shortly." : j.error === "captcha" ? "Verification failed. Please try again." : "We could not send your request.");
    } catch { setState("error"); setMsg("We could not reach the server."); }
  }

  if (state === "done") return (
    <div role="status" className="card p-8">
      <h2 className="font-display text-2xl text-navy-900">Thank you. Your request has been received.</h2>
      <p className="mt-3 text-slate-ink">We will follow up by your preferred method to arrange a short executive briefing.</p>
      {SITE.schedulingUrl && <a className="btn btn-dark mt-5" href={SITE.schedulingUrl}>Choose a time</a>}
    </div>);

  const F = ({ id, label, req, children, hint }: { id: string; label: string; req?: boolean; children: React.ReactNode; hint?: string }) => (
    <div><label htmlFor={id} className="block text-sm font-semibold text-navy-900">{label}{req ? <span className="text-red-risk" aria-hidden> *</span> : <span className="font-normal text-slate-ink"> (optional)</span>}</label>
      <div className="mt-1.5">{children}</div>{hint && <p id={`${id}-h`} className="mt-1 text-xs text-slate-ink">{hint}</p>}
      {errors[id] && <p id={`${id}-e`} role="alert" className="mt-1 text-sm font-medium text-red-risk">{errors[id]}</p>}</div>);
  const inp = (id: string) => ({ id, name: id, "aria-invalid": !!errors[id], "aria-describedby": errors[id] ? `${id}-e` : undefined, className: "w-full rounded-lg border border-line bg-white px-3.5 py-3 text-base focus:border-teal-500" });

  return (
    <form onSubmit={onSubmit} noValidate className="card space-y-5 p-6 md:p-8" aria-describedby="form-warn">
      <div id="form-warn" className="rounded-lg border border-amber-risk/40 bg-amber-risk/10 p-4 text-sm leading-relaxed text-charcoal">
        <strong>Please do not include</strong> patient information, passwords or sensitive security records in this form.
      </div>
      <div className="grid gap-5 md:grid-cols-2">
        <F id="fullName" label="Full name" req><input {...inp("fullName")} required autoComplete="name" /></F>
        <F id="organization" label="Organization" req><input {...inp("organization")} required autoComplete="organization" /></F>
        <F id="role" label="Executive title or role" req><input {...inp("role")} required autoComplete="organization-title" placeholder="e.g., Chief Executive Officer" /></F>
        <F id="email" label="Business email" req><input {...inp("email")} type="email" required autoComplete="email" /></F>
        <F id="phone" label="Phone"><input {...inp("phone")} type="tel" autoComplete="tel" /></F>
        <F id="orgType" label="Organization type" req><select {...inp("orgType")} required defaultValue=""><option value="" disabled>Select…</option>{ORG_TYPES.map((o) => <option key={o}>{o}</option>)}</select></F>
        <F id="size" label="Approximate organization size"><select {...inp("size")} defaultValue=""><option value="">Select…</option>{SIZES.map((o) => <option key={o}>{o}</option>)}</select></F>
        <F id="followUp" label="Preferred follow-up" req><select {...inp("followUp")} required defaultValue=""><option value="" disabled>Select…</option>{FOLLOWUPS.map((o) => <option key={o}>{o}</option>)}</select></F>
      </div>
      <F id="concern" label="Primary cybersecurity concern" hint="A sentence or two is plenty. Maximum 500 characters."><textarea {...inp("concern")} rows={3} maxLength={500} /></F>
      <div aria-hidden className="absolute -left-[9999px]"><label>Website<input name="website" tabIndex={-1} autoComplete="off" /></label></div>
      {TS_KEY && <div ref={tsEl} />}
      <p className="text-xs leading-relaxed text-slate-ink">We use your details only to respond to this request. See our <a className="underline" href="/privacy">privacy notice</a>.</p>
      <button type="submit" disabled={state === "sending"} className="btn btn-dark w-full md:w-auto">{state === "sending" ? "Sending…" : "Request an Executive Risk Briefing"}</button>
      {state === "error" && (<p role="alert" className="rounded-lg bg-red-risk/10 p-4 text-sm text-red-risk">{msg} Please email <a className="underline font-semibold" href={`mailto:${SITE.email}`}>{SITE.email}</a> or text <a className="underline font-semibold" href={SITE.smsHref}>{SITE.smsDisplay}</a> and we will respond directly.</p>)}
    </form>
  );
}
