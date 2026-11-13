import { NextRequest, NextResponse } from "next/server";
import { validate } from "@/lib/contact";

export const runtime = "nodejs";
const hits = new Map<string, number[]>(); // simple in-memory limiter; use a shared store (Redis/Upstash) when running multiple instances
const esc = (s: string) => s.replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]!));

export async function POST(req: NextRequest) {
  const ip = req.headers.get("x-forwarded-for")?.split(",")[0].trim() || "unknown";
  const now = Date.now(); const recent = (hits.get(ip) ?? []).filter((t) => now - t < 10 * 60_000);
  if (recent.length >= 5) return NextResponse.json({ error: "rate_limited" }, { status: 429 });
  hits.set(ip, [...recent, now]);

  let body: Record<string, unknown>;
  try { body = await req.json(); } catch { return NextResponse.json({ error: "bad_request" }, { status: 400 }); }
  const v = validate(body);
  if (!v.ok) return NextResponse.json({ error: "validation", errors: v.errors }, { status: 422 });
  const d = v.data;

  // Spam controls: honeypot and minimum fill time. Respond as success so bots learn nothing.
  if (d.website || !d.startedAt || now - d.startedAt < 3000) return NextResponse.json({ ok: true });

  if (process.env.TURNSTILE_SECRET_KEY) {
    const r = await fetch("https://challenges.cloudflare.com/turnstile/v0/siteverify", { method: "POST", headers: { "Content-Type": "application/x-www-form-urlencoded" }, body: new URLSearchParams({ secret: process.env.TURNSTILE_SECRET_KEY, response: d.token ?? "", remoteip: ip }) });
    const j = (await r.json().catch(() => ({}))) as { success?: boolean };
    if (!j.success) return NextResponse.json({ error: "captcha" }, { status: 400 });
  }

  const { website: _w, startedAt: _s, token: _t, ...lead } = d; void _w; void _s; void _t;
  const payload = { ...lead, receivedAt: new Date(now).toISOString(), source: "cybersavants.com executive briefing form" };
  const webhook = process.env.CONTACT_WEBHOOK_URL;
  const resend = process.env.RESEND_API_KEY, to = process.env.CONTACT_TO_EMAIL, from = process.env.CONTACT_FROM_EMAIL;

  try {
    if (webhook) {
      const r = await fetch(webhook, { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(payload) });
      if (!r.ok) throw new Error("webhook");
    } else if (resend && to && from) {
      const rows = Object.entries(lead).filter(([, val]) => val).map(([k, val]) => `<tr><td><b>${esc(k)}</b></td><td>${esc(String(val))}</td></tr>`).join("");
      const r = await fetch("https://api.resend.com/emails", { method: "POST", headers: { Authorization: `Bearer ${resend}`, "Content-Type": "application/json" },
        body: JSON.stringify({ from, to: [to], reply_to: d.email, subject: `Executive briefing request — ${d.organization}`, html: `<table cellpadding="6">${rows}</table>` }) });
      if (!r.ok) throw new Error("resend");
    } else {
      return NextResponse.json({ error: "not_configured" }, { status: 503 });
    }
  } catch {
    return NextResponse.json({ error: "delivery_failed" }, { status: 502 });
  }
  return NextResponse.json({ ok: true });
}
