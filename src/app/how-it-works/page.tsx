import type { Metadata } from "next";
import { FinalCta, Heading, PageHero, Section } from "@/components/Bits";
import Process from "@/components/Process";
export const metadata: Metadata = { title: "How It Works: Assessment, Reporting, Review, Accountability", description: "Five stages from discovery to accountability: how Cybersavants turns vulnerability findings into monthly executive decisions.", alternates: { canonical: "/how-it-works" } };
export default function Page() {
  return (<>
    <PageHero eyebrow="How it works" title="From vulnerabilities to business decisions, every month." lead="We don't simply tell you what is vulnerable. We help you understand what matters, why it matters, and what to do next." />
    <Section><Process /></Section>
    <Section tone="mist">
      <div className="grid gap-8 md:grid-cols-2">
        <div className="card p-8"><Heading title="What leadership does" /><ul className="mt-6 space-y-3 text-slate-ink"><li>Designates the executive stakeholders who attend the monthly review.</li><li>Reviews the one-page posture summary and the risks in business terms.</li><li>Makes, or delegates, the decisions that need an owner or a budget.</li><li>Confirms owners and dates so progress can be tracked.</li></ul></div>
        <div className="card p-8"><Heading title="What stays with your IT team" /><ul className="mt-6 space-y-3 text-slate-ink"><li>Carrying out technical fixes, unless Cybersavants has agreed in writing to perform specific remediation.</li><li>Day-to-day system administration.</li><li>Providing access needed for the agreed assessment scope.</li></ul><p className="mt-4 text-sm text-slate-ink">Who is responsible for each fix is agreed in writing before service begins.</p></div>
      </div>
      <p className="mt-8 max-w-3xl text-slate-ink">Scope, coverage, access, meeting participants and timing are all set out in your agreement. This service is not a penetration test or a formal HIPAA Security Risk Analysis.</p>
    </Section>
    <FinalCta />
  </>);
}
