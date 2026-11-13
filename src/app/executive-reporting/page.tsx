import type { Metadata } from "next";
import Link from "next/link";
import { Faq, FAQS, FinalCta, Heading, PageHero, Section } from "@/components/Bits";
import { PRICING } from "@/lib/config";
export const metadata: Metadata = { title: "Executive Vulnerability Reporting & Strategic Business Review", description: "Board-ready vulnerability management reporting in plain English, with a monthly strategic review for CEOs, CFOs, COOs and Boards.", alternates: { canonical: "/executive-reporting" } };
export default function Page() {
  return (<>
    <PageHero eyebrow="Executive Reporting" title="Your cyber posture, in plain English. Ready for the boardroom." lead="Executive vulnerability management with a strategic business review: a clear picture of where your organization stands and what to decide next." />
    <Section>
      <Heading eyebrow="Three things, built for leadership" title="The technical work happens behind the scenes. What reaches your desk is clear, short and ready to act on." />
      <div className="mt-12 grid gap-6 md:grid-cols-3">
        {[["Vulnerability management, run for you", "Recurring assessment of the scope we agree together, with findings ranked by real-world risk. Your leadership team never has to read the raw output."], ["A board-ready posture summary", "A clear statement of your overall posture, the trend since the last review and the risks that matter most, in business terms."], ["A strategic business review", "A conversation with your leadership: what changed, what it means for the organization, and which decisions need an owner and a budget."]].map(([t, d]) => (<div key={t} className="card p-7"><h3 className="font-display text-xl font-semibold text-navy-900">{t}</h3><p className="mt-3 text-slate-ink">{d}</p></div>))}
      </div>
    </Section>
    <Section tone="mist">
      <div className="grid gap-12 lg:grid-cols-2">
        <div><Heading eyebrow="The monthly review" title="A conversation that ends in decisions." />
          <ul className="mt-8 space-y-3 text-charcoal">{["Where the organization stands today, on one page", "What has improved since the last review, and what has not", "The risks most likely to hurt the organization, ranked", "Decisions that need an executive owner or a budget", "Plain answers to questions a Board, insurer or auditor may ask"].map((t) => <li key={t} className="flex gap-3"><span aria-hidden className="text-teal-600">●</span>{t}</li>)}</ul>
          <p className="mt-6 text-sm text-slate-ink">Participants and timing are agreed at the start of service.</p>
          <Link href="/sample-report#report" className="btn btn-dark mt-8">Explore a Sample Executive Report</Link></div>
        <div className="card p-8"><p className="eyebrow">Advisory vs. remediation</p><h3 className="font-display mt-2 text-2xl text-navy-900">Clear boundaries, agreed in writing.</h3><p className="mt-4 text-slate-ink">The executive service gives leadership findings, prioritization, recommendations and accountability. Who carries out each fix (your team, your IT provider or Cybersavants) is agreed in writing before service begins. Hands-on remediation is separate from the advisory review.</p></div>
      </div>
    </Section>
    {PRICING.show && (
      <Section>
        <Heading eyebrow="Engagement" title="One simple monthly fee, so cyber risk can be a standing item rather than a one-off project." />
        <div className="mt-10 grid gap-8 lg:grid-cols-2">
          <div className="card p-8">
            <p className="text-sm font-semibold text-slate-ink">{PRICING.name}</p>
            <p className="font-display mt-2 text-5xl text-navy-900">{PRICING.amount}<span className="text-lg font-normal text-slate-ink"> {PRICING.cadence}</span></p>
            <ul className="mt-6 space-y-3">{PRICING.inclusions.map((t) => <li key={t} className="flex gap-3"><span aria-hidden className="text-teal-600">✓</span>{t}</li>)}</ul>
            <p className="mt-6 text-sm text-slate-ink">{PRICING.boundary}</p>
            <Link href="/contact" className="btn btn-dark mt-6">Request an Executive Risk Briefing</Link>
          </div>
          <div className="card bg-mist p-8"><h3 className="font-display text-2xl text-navy-900">What this service is not</h3><p className="mt-4 leading-relaxed text-slate-ink">It is not a penetration test, not a complete HIPAA Security Risk Analysis and not a guarantee that every weakness will be found. It gives leadership clear, technical evidence to support those broader efforts.</p></div>
        </div>
      </Section>)}
    <Section tone="mist"><Heading eyebrow="Questions" title="Common questions." /><div className="mt-10"><Faq items={FAQS} /></div></Section>
    <FinalCta />
  </>);
}
