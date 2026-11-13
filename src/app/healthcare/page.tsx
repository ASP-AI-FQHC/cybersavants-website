import type { Metadata } from "next";
import { FinalCta, Heading, PageHero, Section } from "@/components/Bits";
export const metadata: Metadata = { title: "Healthcare Cybersecurity Risk Management for FQHCs and Safety-Net Hospitals", description: "Executive vulnerability management for FQHCs, community health centers and safety-net hospitals: patient-care continuity, operational resilience and disciplined prioritization.", alternates: { canonical: "/healthcare" } };
const items = [["Patient-care continuity", "When scheduling, records or connected systems fail, patients feel it first. We frame risk in terms of the care and access it could interrupt."], ["Mission protection", "Community health organizations exist to serve people who have few alternatives. Cybersecurity decisions should be tied to that mission."], ["Disciplined prioritization", "With limited budgets and lean IT teams, the question is never “fix everything.” It is “fix what matters most, first.”"], ["Operational resilience", "Clear ownership, dated actions and monthly review keep known risks from lingering unseen."], ["HIPAA-related security considerations", "Regular reporting and documented leadership attention supply evidence of ongoing security work, supporting your governance efforts."]];
export default function Page() {
  return (<>
    <PageHero eyebrow="Healthcare" title="Cybersecurity leadership for the organizations that keep communities healthy." lead="Executive vulnerability management for FQHCs, community health centers, safety-net hospitals and healthcare organizations operating with constrained budgets." />
    <Section>
      <Heading eyebrow="What we understand" title="Lean teams. High stakes. Limited room for error." />
      <ul className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-3">{items.map(([t, d]) => (<li key={t} className="card p-7"><h3 className="font-display text-xl font-semibold text-navy-900">{t}</h3><p className="mt-3 text-slate-ink">{d}</p></li>))}</ul>
    </Section>
    <Section tone="mist">
      <div className="grid gap-8 lg:grid-cols-2">
        <div><Heading eyebrow="Be clear about HIPAA" title="Support for governance, not a substitute for compliance." /></div>
        <p className="text-lg leading-relaxed text-slate-ink">Vulnerability management does not by itself establish HIPAA compliance. It is not a penetration test or a complete Security Risk Analysis. What it provides is current, understandable evidence of exposure and of leadership action, so that your broader compliance work rests on facts. Please do not submit patient information through this website.</p>
      </div>
      <p className="mt-10 max-w-3xl text-slate-ink">Healthcare is our focus, and the same executive approach serves nonprofits, professional services and growing businesses.</p>
    </Section>
    <FinalCta />
  </>);
}
