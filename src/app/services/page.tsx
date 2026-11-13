import type { Metadata } from "next";
import Link from "next/link";
import { Heading, PageHero, Section } from "@/components/Bits";
export const metadata: Metadata = { title: "Additional Security Services", description: "Supporting services from Cybersavants: workforce security, endpoint protection, identity protection and compliance documentation.", alternates: { canonical: "/services" } };
const S = [["Workforce security", "Role-based security awareness training for clinical and administrative staff, with phishing simulations built around healthcare scenarios.", "Technologies referenced: Breach Secure Now!"], ["Endpoint protection", "Remote monitoring and management of workstations, combined with layered threat detection and response.", "Technologies referenced: ConnectWise RMM, SentinelOne MDR, Huntress EDR"], ["Identity protection", "Identity threat detection and response for Microsoft 365 accounts, watching for unusual sign-ins and signs of account takeover.", "Technologies referenced: Huntress ITDR"], ["Compliance documentation", "Security policy templates, HIPAA-related documentation and reporting that help you show the security work you are doing.", "Supports, and does not by itself establish, compliance."]];
export default function Page() {
  return (<>
    <PageHero eyebrow="Additional services" title="Supporting protection around the executive view." lead="Executive Vulnerability Reporting is our focus. These services support the people, devices and identities behind it.">
      <Link href="/contact" className="btn btn-primary">Request an Executive Risk Briefing</Link></PageHero>
    <Section><Heading title="Also available from Cybersavants" /><ul className="mt-10 grid gap-6 md:grid-cols-2">{S.map(([t, d, n]) => <li key={t} className="card p-7"><h3 className="font-display text-xl font-semibold text-navy-900">{t}</h3><p className="mt-2 text-slate-ink">{d}</p><p className="mt-3 text-xs font-semibold uppercase tracking-wider text-teal-600">{n}</p></li>)}</ul>
      <p className="mt-8 text-sm text-slate-ink">Scope and availability are confirmed in your agreement.</p></Section>
  </>);
}
