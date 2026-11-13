import type { Metadata } from "next";
import { SITE } from "@/lib/config";
export const metadata: Metadata = { title: "Privacy Notice", description: "How Cybersavants handles information submitted through this website.", alternates: { canonical: "/privacy" } };
export default function Page() {
  return (<section className="py-20"><div className="container-x max-w-3xl space-y-5 leading-relaxed text-slate-ink">
    <h1 className="font-display text-4xl font-semibold text-navy-900">Privacy Notice</h1>
    <p><strong>Draft for legal review.</strong> This notice summarizes how the website handles information and must be reviewed and approved by Cybersavants before launch.</p>
    <h2 className="font-display text-2xl text-navy-900">What we collect</h2>
    <p>The executive briefing form collects the contact details you enter. We use them only to respond to your request. Please never submit patient information, passwords or sensitive security records.</p>
    <h2 className="font-display text-2xl text-navy-900">How it is handled</h2>
    <p>Form submissions are sent securely from the server to Cybersavants' configured delivery destination. The site does not use advertising trackers.</p>
    <h2 className="font-display text-2xl text-navy-900">Contact</h2>
    <p>Questions: <a className="underline" href={`mailto:${SITE.email}`}>{SITE.email}</a>.</p>
  </div></section>);
}
