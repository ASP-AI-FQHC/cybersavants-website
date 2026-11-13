import Link from "next/link";
import { Faq, FAQS, FinalCta, Heading, Section } from "@/components/Bits";
import HeroVisual from "@/components/HeroVisual";
import ReportExplorer from "@/components/ReportExplorer";
import Process from "@/components/Process";
import RoleSelector from "@/components/RoleSelector";

const RECEIVE = [
  ["Recurring vulnerability assessments", "A steady, current view of exposure across the scope we agree, so surprises surface early rather than after an incident."],
  ["Business-risk prioritization", "Findings ranked by what they could mean for operations, not by a technical score alone, so effort goes where it matters."],
  ["Executive risk posture summary", "One page: where you stand, whether it is improving, and what needs attention, in language that needs no translation."],
  ["Board-ready reporting", "A summary you can place in a Board packet and a documented trail of how risk is changing over time."],
  ["Monthly strategic executive review", "A conversation with an experienced advisor to explain what changed, what matters, and what leadership should decide."],
  ["Recommendations and action tracking", "Every action has an owner and a date, and unresolved items return to the table until they are closed."],
];
const WHY = [
  ["Business-focused reporting", "Risk described by operational and financial consequence."],
  ["Experienced cybersecurity advisors", "A person who explains the findings and answers your questions."],
  ["Independent executive perspective", "An outside view that complements your IT team or MSP."],
  ["Actionable recommendations", "Specific next steps with a suggested owner for each."],
  ["Monthly accountability", "Decisions and actions are revisited until they are done."],
  ["Practical, risk-based prioritization", "Limited budgets directed at the exposures that matter most."],
];

export default function Home() {
  return (
    <>
      <section className="dark-surface relative overflow-hidden bg-navy-900 text-white">
        <div aria-hidden className="absolute inset-0" style={{ background: "radial-gradient(70% 60% at 85% 20%, rgba(0,230,57,.16), transparent 60%), radial-gradient(50% 50% at 0% 100%, rgba(42,42,42,.9), transparent 70%)" }} />
        <div className="container-x relative grid items-center gap-14 py-20 md:py-28 lg:grid-cols-[1.15fr_.85fr]">
          <div>
            <p className="eyebrow mb-5">Executive Vulnerability Management</p>
            <h1 className="font-display text-4xl leading-[1.08] md:text-5xl lg:text-6xl">Cybersecurity Risk, Translated for the Boardroom.</h1>
            <p className="tagline mt-5 text-2xl text-teal-300">Know your exposure. Understand your risk. Make better decisions.</p>
            <p className="mt-6 max-w-xl text-lg leading-relaxed text-slate-300">Recurring vulnerability assessments, risk-based prioritization and executive-ready reporting, with a monthly strategic review led by an experienced cybersecurity advisor.</p>
            <div className="mt-9 flex flex-wrap gap-3">
              <Link href="/contact" className="btn btn-primary">Request an Executive Risk Briefing</Link>
              <Link href="/sample-report#report" className="btn btn-ghost">Explore a Sample Executive Report</Link>
            </div>
          </div>
          <HeroVisual />
        </div>
      </section>

      <Section>
        <Heading eyebrow="The problem" title="Your IT Team Sees Vulnerabilities. Your Board Needs to Understand Risk." lead="Technical reports are written for the people who fix problems. Boards and executives are accountable for the outcome, and they need something different." />
        <div className="mt-12 grid gap-6 md:grid-cols-2">
          <div className="card bg-mist p-8">
            <p className="text-sm font-semibold uppercase tracking-wider text-slate-ink">A conventional technical report</p>
            <ul className="mt-5 space-y-4 text-slate-ink">
              {["Pages of scanner output and technical identifiers", "Severity scores with no business context", "A to-do list written for the IT team", "A snapshot with no story and no owner"].map((t) => <li key={t} className="flex gap-3"><span aria-hidden className="text-slate-400">✕</span>{t}</li>)}
            </ul>
          </div>
          <div className="rounded-xl bg-navy-900 p-8 text-white ring-1 ring-teal-500/60">
            <p className="text-sm font-semibold uppercase tracking-wider text-teal-300">Executive intelligence from Cybersavants</p>
            <ul className="mt-5 space-y-4">
              {["A short summary of where the organization stands", "Risks described by what they could mean for operations", "The few decisions that need an executive owner or a budget", "What improved, what did not, and what happens next"].map((t) => <li key={t} className="flex gap-3"><span aria-hidden className="text-teal-300">✓</span>{t}</li>)}
            </ul>
          </div>
        </div>
        <p className="mt-8 max-w-3xl text-lg leading-relaxed text-slate-ink">A list of two hundred findings does not tell a CEO what to approve, a CFO what to fund, or a Board what to oversee. <strong className="text-navy-900">Your Board deserves answers, not technical reports.</strong></p>
      </Section>

      <Section tone="mist" id="report">
        <div className="no-print-board"><Heading eyebrow="Interactive executive report" title="See the report your leadership team would receive." lead="Explore a sample report: change the reporting period, open any risk, and follow it to the decision it requires. Everything shown is fictional." /></div>
        <div className="mt-10"><ReportExplorer /></div>
        <p className="no-print-board mt-6 text-sm text-slate-ink">Prefer a larger view? <Link className="font-semibold text-teal-600 underline underline-offset-4" href="/sample-report">Open the full sample report page</Link>.</p>
      </Section>

      <Section>
        <Heading eyebrow="What executives receive" title="From Vulnerabilities to Business Decisions." lead="Six components that work together to give leadership clarity, and a way to act on it." />
        <ul className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {RECEIVE.map(([t, d], i) => (<li key={t} className="card p-7 transition hover:-translate-y-0.5 hover:shadow-lg"><span className="font-display text-3xl text-teal-500">0{i + 1}</span><h3 className="font-display mt-3 text-xl font-semibold text-navy-900">{t}</h3><p className="mt-2 leading-relaxed text-slate-ink">{d}</p></li>))}
        </ul>
      </Section>

      <Section tone="dark" id="monthly">
        <Heading dark eyebrow="The monthly advisory process" title="Every Month. Your Risk. Your Decisions. Our Guidance." lead="Cybersecurity reporting has limited value unless leadership understands what the findings mean and what action is required. Every month, Cybersavants meets with your designated executive stakeholders to review your organization's risk posture, explain material changes, establish remediation priorities, and discuss the decisions necessary to reduce business exposure." />
        <div className="mt-12"><Process dark /></div>
        <div className="mt-10 grid gap-6 md:grid-cols-2">
          <p className="tagline text-2xl leading-snug text-white">“We don't simply tell you what is vulnerable. We help you understand what matters, why it matters, and what to do next.”</p>
          <p className="text-slate-300 leading-relaxed"><strong className="text-white">More than a report. A monthly conversation about your risk.</strong> The review focuses on operational resilience, financial exposure, risk ownership, investment priorities and progress. It is advisory guidance. Hands-on remediation is a separate activity, performed only where agreed in writing.</p>
        </div>
      </Section>

      <Section id="roles">
        <Heading eyebrow="Built for leaders who own the risk" title="Choose your role. See what changes." />
        <div className="mt-10"><RoleSelector /></div>
      </Section>

      <Section tone="mist">
        <div className="grid items-center gap-12 lg:grid-cols-2">
          <div>
            <Heading eyebrow="Healthcare expertise" title="Protecting the mission, on a constrained budget." lead="Community health centers and safety-net hospitals run lean, and cannot afford to chase every finding. We help leaders focus limited resources on the exposures that most threaten patient-care continuity." />
            <ul className="mt-6 space-y-3 text-charcoal">
              {["Patient-care continuity and mission protection", "HIPAA-related security considerations, supported with evidence of ongoing work", "Operational resilience for clinics with thin margins", "Disciplined prioritization when every dollar counts"].map((t) => <li key={t} className="flex gap-3"><span aria-hidden className="text-teal-600">●</span>{t}</li>)}
            </ul>
            <p className="mt-5 text-sm text-slate-ink">Vulnerability management supports HIPAA-related governance; it does not by itself establish compliance. Healthcare is our focus, and the approach serves any organization led by executives who own cyber risk.</p>
            <Link href="/healthcare" className="btn btn-dark mt-7">Healthcare leadership focus</Link>
          </div>
          <div className="card p-8"><p className="eyebrow">Who we serve</p><ul className="mt-4 divide-y divide-line">{["Federally Qualified Health Centers", "Community health centers", "Safety-net hospitals", "Healthcare organizations with constrained budgets", "Nonprofits and growing businesses"].map((t) => <li key={t} className="py-3 font-medium text-navy-900">{t}</li>)}</ul></div>
        </div>
      </Section>

      <Section>
        <Heading eyebrow="Why Cybersavants" title="Executive-led, not another reporting tool." lead="The technology identifies vulnerabilities. Our advisors explain what they mean to your organization." />
        <ul className="mt-12 grid gap-x-10 gap-y-8 md:grid-cols-2 lg:grid-cols-3">
          {WHY.map(([t, d]) => (<li key={t} className="border-t-2 border-teal-500 pt-4"><h3 className="font-display text-xl font-semibold text-navy-900">{t}</h3><p className="mt-2 text-slate-ink">{d}</p></li>))}
        </ul>
      </Section>

      <Section tone="mist">
        <Heading eyebrow="Questions" title="What leaders ask us first." />
        <div className="mt-10"><Faq items={FAQS} /></div>
      </Section>
      <FinalCta />
    </>
  );
}
