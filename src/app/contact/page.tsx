import type { Metadata } from "next";
import ContactForm from "@/components/ContactForm";
import { SITE } from "@/lib/config";
export const metadata: Metadata = { title: "Request an Executive Risk Briefing", description: "Request a short executive briefing with Cybersavants to discuss your organization's cybersecurity exposure and how a monthly executive review could help.", alternates: { canonical: "/contact" } };
export default function Page() {
  return (
    <section className="bg-mist py-16 md:py-24"><div className="container-x grid gap-12 lg:grid-cols-[.8fr_1.2fr]">
      <div>
        <p className="eyebrow mb-3">Executive briefing</p>
        <h1 className="font-display text-4xl font-semibold leading-tight text-navy-900 md:text-5xl">Let's talk about your risk.</h1>
        <p className="mt-5 text-lg leading-relaxed text-slate-ink">A short, introductory conversation with a cybersecurity advisor: what you are exposed to, which risks need leadership attention, and whether a monthly executive review makes sense for your organization.</p>
        <p className="mt-8 text-slate-ink">Prefer to reach us directly?</p>
        <p className="mt-2 font-semibold text-navy-900"><a className="underline underline-offset-4" href={`mailto:${SITE.email}`}>{SITE.email}</a><br /><a className="underline underline-offset-4" href={SITE.smsHref}>Text {SITE.smsDisplay}</a></p>
      </div>
      <ContactForm />
    </div></section>
  );
}
