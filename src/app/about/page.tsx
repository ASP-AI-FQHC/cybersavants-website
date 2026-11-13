import type { Metadata } from "next";
import { FinalCta, Heading, PageHero, Section } from "@/components/Bits";
export const metadata: Metadata = { title: "About Cybersavants", description: "Cybersavants helps executives and Boards understand cybersecurity risk and make informed decisions. Protecting the privacy of people is our business.", alternates: { canonical: "/about" } };
export default function Page() {
  return (<>
    <PageHero eyebrow="About" title="Protecting the privacy of people is our business." lead="Cybersavants exists to help leaders understand cyber risk well enough to act on it." />
    <Section>
      <div className="grid gap-12 lg:grid-cols-2">
        <div><Heading eyebrow="Our philosophy" title="Technology finds the weaknesses. Advisors explain what they mean." /></div>
        <div className="space-y-5 text-lg leading-relaxed text-slate-ink">
          <p>Most vulnerability services hand over a long list. We believe leaders are better served by a short, honest account of where they stand, what has changed and what they need to decide.</p>
          <p>We keep our advice independent, practical and proportionate: confident but never alarmist, and always tied to the operational and financial consequences leaders care about.</p>
          <p>We make no promises we cannot keep. We cannot guarantee that a breach will be prevented or that compliance will be achieved. We can give leadership clarity and accountability.</p>
        </div>
      </div>
    </Section>
    <Section tone="mist">
      <Heading eyebrow="How we work" title="Principles." />
      <ul className="mt-10 grid gap-6 md:grid-cols-3">{[["Plain language first", "Executives should never need to decode technical output."], ["Decisions, not data", "Every report ends in what leadership should do next."], ["Accountability", "Owners and dates, tracked month to month."]].map(([t, d]) => <li key={t} className="card p-7"><h3 className="font-display text-xl font-semibold text-navy-900">{t}</h3><p className="mt-2 text-slate-ink">{d}</p></li>)}</ul>
    </Section>
    <FinalCta />
  </>);
}
