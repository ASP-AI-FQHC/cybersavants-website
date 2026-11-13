import Link from "next/link";
import { ReactNode } from "react";

export function Section({ id, tone = "light", children, className = "" }: { id?: string; tone?: "light" | "mist" | "dark"; children: ReactNode; className?: string }) {
  const bg = tone === "dark" ? "dark-surface bg-navy-900 text-white" : tone === "mist" ? "bg-mist" : "bg-white";
  return (<section id={id} className={`${bg} py-20 md:py-28 ${className}`}><div className="container-x">{children}</div></section>);
}
export function Heading({ eyebrow, title, lead, center = false, dark = false }: { eyebrow?: string; title: string; lead?: ReactNode; center?: boolean; dark?: boolean }) {
  return (
    <div className={`max-w-3xl ${center ? "mx-auto text-center" : ""}`}>
      {eyebrow && <p className="eyebrow mb-3">{eyebrow}</p>}
      <h2 className={`font-display text-3xl font-semibold leading-tight md:text-5xl ${dark ? "text-white" : "text-navy-900"}`}>{title}</h2>
      {lead && <p className={`mt-5 text-lg leading-relaxed ${dark ? "text-slate-300" : "text-slate-ink"}`}>{lead}</p>}
    </div>
  );
}
export function PageHero({ eyebrow, title, lead, children }: { eyebrow: string; title: string; lead: string; children?: ReactNode }) {
  return (
    <section className="dark-surface bg-navy-900 text-white">
      <div className="container-x py-20 md:py-28">
        <p className="eyebrow mb-4">{eyebrow}</p>
        <h1 className="font-display max-w-4xl text-4xl font-semibold leading-tight md:text-6xl">{title}</h1>
        <p className="mt-6 max-w-2xl text-lg leading-relaxed text-slate-300">{lead}</p>
        <div className="mt-9 flex flex-wrap gap-3">{children ?? <><Link href="/contact" className="btn btn-primary">Request an Executive Risk Briefing</Link><Link href="/sample-report" className="btn btn-ghost">Explore a Sample Executive Report</Link></>}</div>
      </div>
    </section>
  );
}
export function FinalCta({ title = "You Cannot Manage the Risk You Cannot Clearly See.", lead = "Discover what your organization is exposed to, which risks require leadership attention, and how a monthly executive review can help you make informed cybersecurity decisions.", button = "Schedule Your Executive Briefing" }: { title?: string; lead?: string; button?: string }) {
  return (
    <section className="dark-surface relative overflow-hidden bg-navy-950 py-24 text-white no-print-board">
      <div aria-hidden className="absolute inset-0 opacity-40" style={{ background: "radial-gradient(60% 80% at 80% 0%, #00e639 0%, transparent 60%)" }} />
      <div className="container-x relative text-center">
        <h2 className="font-display mx-auto max-w-3xl text-4xl font-semibold leading-tight md:text-5xl">{title}</h2>
        <p className="mx-auto mt-6 max-w-2xl text-lg text-slate-300">{lead}</p>
        <div className="mt-9 flex flex-wrap justify-center gap-3">
          <Link href="/contact" className="btn btn-primary">{button}</Link>
          <Link href="/sample-report" className="btn btn-ghost">Explore a Sample Executive Report</Link>
        </div>
        <p className="mt-6 text-sm text-slate-400">No obligation. A conversation about your leadership team's visibility into cyber risk.</p>
      </div>
    </section>
  );
}
export function Faq({ items }: { items: { q: string; a: ReactNode }[] }) {
  return (
    <div className="divide-y divide-line border-y border-line">
      {items.map((f) => (
        <details key={f.q} className="group py-5">
          <summary className="flex items-start justify-between gap-6 text-lg font-semibold text-navy-900">
            <span>{f.q}</span>
            <span aria-hidden className="mt-1 text-teal-600 transition-transform group-open:rotate-45 text-2xl leading-none">+</span>
          </summary>
          <div className="mt-3 max-w-3xl leading-relaxed text-slate-ink">{f.a}</div>
        </details>
      ))}
    </div>
  );
}
export const FAQS = [
  { q: "Why does our Board need vulnerability management reporting?", a: "Boards are expected to oversee material risk, and cybersecurity exposure is one. Technical teams track weaknesses; a Board needs a clear view of where the organization stands, whether that is improving, and which decisions require leadership. Regular, plain-English reporting creates a record that oversight is taking place." },
  { q: "How does this differ from what our IT department already provides?", a: "Your IT team fixes problems and is close to the technology. Executive Vulnerability Reporting adds an independent, business-focused view for the people accountable for outcomes: risks described by operational consequence, the few decisions that need an owner or budget, and a monthly conversation to keep them moving." },
  { q: "What happens during the monthly executive review?", a: "We review where the organization stands, what changed since last time, the risks most likely to affect operations, and the decisions that need an executive owner or budget. Actions, owners and dates are recorded and revisited at the next review. Participants and timing are agreed when service begins." },
  { q: "Can Cybersavants work alongside our existing MSP or internal IT team?", a: "Yes. Our advisory layer is designed to complement the people who maintain your systems. Who carries out each fix (your team, your IT provider or Cybersavants) is agreed in writing before service begins." },
  { q: "Does the service include remediation?", a: "The executive service is advisory: findings, prioritization, recommendations and accountability. Hands-on remediation is a separate matter and is only performed where it has been agreed in writing. Responsibility for each fix is defined before service starts." },
  { q: "Can the reports support HIPAA-related security governance?", a: "They can provide clear evidence of ongoing security work and leadership attention to risk, which supports governance. Vulnerability management does not by itself make an organization HIPAA compliant, and it does not replace a formal Security Risk Analysis." },
  { q: "How are findings prioritized?", a: "By more than a technical score. We consider how likely a weakness is to be exploited, how important the affected system is to the organization, the operational impact if it failed, and other relevant factors, then express the result in terms of urgency and business consequence." },
  { q: "How much technical knowledge do executives need?", a: "None. Reporting is written for non-technical readers. Technical detail is available for your IT team but kept behind the executive view." },
  { q: "What systems are included in the assessment?", a: "The scope we agree together. Coverage, access and responsibilities are confirmed in writing before service starts, and the assessment cannot be assumed to cover systems outside that scope." },
  { q: "Is this a penetration test or formal HIPAA Security Risk Analysis?", a: "No. It is not a penetration test, not a complete HIPAA Security Risk Analysis and not a guarantee that every weakness will be found. It gives leadership clear, explained technical evidence to support those broader efforts." },
];
