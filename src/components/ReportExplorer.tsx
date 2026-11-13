"use client";
import { useEffect, useId, useRef, useState } from "react";
import { AGING_LABELS, DECISIONS, MONTHS, ORG, PERIOD, RISKS, SAMPLE_LABEL, TOTAL_PRIORITIES, decisionCount, observation, overdueCount, peak, type Risk } from "@/lib/report-data";
import { Aging, NewResolved, OpenLine, Progress } from "./Charts";

const TABS = [
  { id: "posture", label: "Risk Posture" }, { id: "risks", label: "Business Risks" }, { id: "trends", label: "Trends" },
  { id: "decisions", label: "Decisions" }, { id: "board", label: "Board Summary" },
] as const;
type TabId = (typeof TABS)[number]["id"];
const LAST = MONTHS.length - 1;

const urgencyStyle: Record<string, string> = { Immediate: "bg-red-risk text-white", High: "bg-red-risk/10 text-red-risk ring-1 ring-red-risk/30", Moderate: "bg-amber-risk/10 text-amber-risk ring-1 ring-amber-risk/30", Low: "bg-mist text-slate-ink ring-1 ring-line" };
const statusStyle: Record<string, string> = { "Awaiting decision": "bg-navy-900 text-white", Overdue: "bg-red-risk text-white", "In progress": "bg-teal-500/15 text-teal-600 ring-1 ring-teal-500/40", "Not started": "bg-mist text-slate-ink ring-1 ring-line" };
const Pill = ({ children, cls }: { children: React.ReactNode; cls: string }) => (<span className={`inline-block whitespace-nowrap rounded-full px-2.5 py-0.5 text-xs font-semibold ${cls}`}>{children}</span>);

function Kpi({ label, value, sub, tone = "navy" }: { label: string; value: React.ReactNode; sub: string; tone?: "navy" | "amber" | "teal" | "red" }) {
  const c = { navy: "text-navy-900", amber: "text-amber-risk", teal: "text-teal-600", red: "text-red-risk" }[tone];
  return (<div className="card p-5"><p className="text-xs font-semibold uppercase tracking-wider text-slate-ink">{label}</p><p className={`font-display mt-2 text-3xl font-semibold ${c}`}>{value}</p><p className="mt-1 text-sm text-slate-ink">{sub}</p></div>);
}

export default function ReportExplorer({ showBoardPrint = true }: { showBoardPrint?: boolean }) {
  const uid = useId();
  const [tab, setTab] = useState<TabId>("posture");
  const [mi, setMi] = useState(LAST);
  const [sel, setSel] = useState<string | null>(null);
  const [filter, setFilter] = useState<"All" | "Needs decision" | "Overdue" | "In progress">("All");
  const tabRefs = useRef<Record<string, HTMLButtonElement | null>>({});
  const m = MONTHS[mi]; const prev = mi > 0 ? MONTHS[mi - 1].open : 14;
  const current = mi === LAST;
  const delta = m.open - prev;
  const trendLabel = delta < 0 ? "Improving" : delta > 0 ? "Worsening" : "Stable";

  useEffect(() => { const a = () => document.body.classList.remove("print-board"); window.addEventListener("afterprint", a); return () => window.removeEventListener("afterprint", a); }, []);
  const go = (t: TabId, risk?: string) => { setTab(t); if (risk) setSel(risk); requestAnimationFrame(() => document.getElementById(`${uid}-panel`)?.scrollIntoView({ behavior: "smooth", block: "nearest" })); };
  const onKey = (e: React.KeyboardEvent, i: number) => {
    let n = i; if (e.key === "ArrowRight") n = (i + 1) % TABS.length; else if (e.key === "ArrowLeft") n = (i - 1 + TABS.length) % TABS.length; else return;
    e.preventDefault(); setTab(TABS[n].id); tabRefs.current[TABS[n].id]?.focus();
  };
  const printBoard = () => { document.body.classList.add("print-board"); window.print(); };

  const shown = RISKS.filter((r) => filter === "All" ? true : filter === "Needs decision" ? r.status === "Awaiting decision" : r.status === filter);
  const priorityRisks = RISKS.filter((r) => r.urgency === "Immediate" || r.urgency === "High");

  return (
    <div className="report-shell overflow-hidden rounded-2xl border border-line bg-white shadow-[0_30px_80px_-30px_rgba(10,23,48,.35)]">
      <div className="no-print-board flex flex-wrap items-center justify-between gap-3 bg-navy-900 px-5 py-4 text-white">
        <div><p className="text-xs uppercase tracking-widest text-teal-300">Executive Vulnerability Report · {PERIOD}</p><p className="font-display text-xl">{ORG}</p></div>
        <p className="rounded-md border border-amber-risk/60 bg-amber-risk/15 px-3 py-1.5 text-xs font-semibold text-amber-200">{SAMPLE_LABEL}</p>
      </div>

      <div className="no-print-board border-b border-line bg-mist px-5 py-3">
        <div role="radiogroup" aria-label="Select reporting month" className="flex flex-wrap items-center gap-2">
          <span className="mr-1 text-xs font-semibold uppercase tracking-wider text-slate-ink">Reporting period</span>
          {MONTHS.map((x, i) => (
            <button key={x.m} role="radio" aria-checked={i === mi} onClick={() => setMi(i)}
              className={`min-h-[36px] rounded-md px-3 text-sm font-medium transition ${i === mi ? "bg-navy-900 text-white" : "bg-white text-charcoal ring-1 ring-line hover:ring-teal-500"}`}>{x.m}</button>))}
        </div>
      </div>

      <div role="tablist" aria-label="Report sections" className="no-print-board flex overflow-x-auto border-b border-line px-3">
        {TABS.map((t, i) => (
          <button key={t.id} ref={(el) => { tabRefs.current[t.id] = el; }} role="tab" id={`${uid}-tab-${t.id}`} aria-selected={tab === t.id} aria-controls={`${uid}-panel`} tabIndex={tab === t.id ? 0 : -1}
            onClick={() => setTab(t.id)} onKeyDown={(e) => onKey(e, i)}
            className={`whitespace-nowrap border-b-2 px-4 py-3.5 text-sm font-semibold ${tab === t.id ? "border-teal-500 text-navy-900" : "border-transparent text-slate-ink hover:text-navy-900"}`}>{t.label}</button>))}
      </div>

      <div id={`${uid}-panel`} role="tabpanel" aria-labelledby={`${uid}-tab-${tab}`} tabIndex={0} className="p-5 md:p-8">
        {tab === "posture" && (
          <div className="space-y-8">
            <div>
              <h3 className="font-display text-2xl text-navy-900">Where do we stand — {m.full}?</h3>
              <p className="mt-2 max-w-3xl text-slate-ink" aria-live="polite">{observation(mi)}</p>
            </div>
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              <Kpi label="Overall risk posture" value={m.posture} sub={m.posture === "Elevated" ? "Exposure above acceptable level" : "Manageable, with items needing leadership"} tone={m.posture === "Elevated" ? "red" : "amber"} />
              <Kpi label="Risk trend" value={`${delta < 0 ? "↓" : delta > 0 ? "↑" : "→"} ${trendLabel}`} sub={`${delta === 0 ? "No change" : `${Math.abs(delta)} ${delta < 0 ? "fewer" : "more"}`} priority exposures than last period`} tone={delta < 0 ? "teal" : delta > 0 ? "red" : "navy"} />
              <Kpi label="Priority exposures open" value={m.open} sub={`${m.newHigh} new · ${m.resolved} resolved this period`} />
              <Kpi label="Remediation progress" value={`${m.prioritiesDone} of ${TOTAL_PRIORITIES}`} sub="agreed priorities completed" tone="teal" />
              <Kpi label="Risks requiring executive decisions" value={current ? decisionCount : "—"} sub={current ? "Awaiting leadership action" : "Shown for the current report only"} tone="amber" />
              <Kpi label="Overdue high-priority actions" value={current ? overdueCount : "—"} sub={current ? "Past agreed target date" : "Shown for the current report only"} tone="red" />
            </div>
            <div>
              <h4 className="font-semibold text-navy-900">What could this affect?</h4>
              <ul className="mt-3 grid gap-3 md:grid-cols-4">
                {[["Patient care", "Scheduling and access to records"], ["Operations", "Daily workflow and remote work"], ["Revenue", "Billing and visit capacity"], ["Continuity", "Recovery if a key system fails"]].map(([t, d]) => (
                  <li key={t} className="rounded-lg bg-mist p-4"><p className="font-semibold text-navy-900">{t}</p><p className="text-sm text-slate-ink">{d}</p></li>))}
              </ul>
            </div>
            <div>
              <h4 className="font-semibold text-navy-900">Requires immediate management attention</h4>
              <ul className="mt-3 divide-y divide-line rounded-lg border border-line">
                {priorityRisks.map((r) => (
                  <li key={r.id}><button onClick={() => go("risks", r.id)} className="flex w-full flex-wrap items-center justify-between gap-3 px-4 py-3 text-left hover:bg-mist">
                    <span className="font-medium text-navy-900">{r.title}</span><span className="flex gap-2"><Pill cls={urgencyStyle[r.urgency]}>{r.urgency}</Pill><Pill cls={statusStyle[r.status]}>{r.status}</Pill></span></button></li>))}
              </ul>
              <p className="mt-3 text-sm text-slate-ink">Select a risk to see its business impact, owner and recommended action.</p>
            </div>
          </div>
        )}

        {tab === "risks" && (
          <div>
            <h3 className="font-display text-2xl text-navy-900">Business risk exposure</h3>
            <p className="mt-2 max-w-3xl text-slate-ink">Each risk is stated in plain English, with its consequence, owner and next step. No technical background required.</p>
            <div className="mt-5 flex flex-wrap gap-2" role="group" aria-label="Filter risks">
              {(["All", "Needs decision", "Overdue", "In progress"] as const).map((f) => (
                <button key={f} aria-pressed={filter === f} onClick={() => setFilter(f)} className={`min-h-[36px] rounded-full px-4 text-sm font-medium ring-1 ${filter === f ? "bg-navy-900 text-white ring-navy-900" : "bg-white ring-line hover:ring-teal-500"}`}>{f}</button>))}
            </div>
            <ul className="mt-6 space-y-4">
              {shown.map((r) => <RiskCard key={r.id} r={r} selected={sel === r.id} onSelect={() => setSel(sel === r.id ? null : r.id)} onDecision={() => go("decisions", r.id)} />)}
              {shown.length === 0 && <li className="text-slate-ink">No risks match this filter.</li>}
            </ul>
          </div>
        )}

        {tab === "trends" && (
          <div>
            <h3 className="font-display text-2xl text-navy-900">Six-month risk trends</h3>
            <p className="mt-2 max-w-3xl text-slate-ink" aria-live="polite">{observation(mi)} <span className="text-sm">(Select a reporting period above to highlight it.)</span></p>
            <div className="mt-8 grid gap-6 md:grid-cols-2">
              <ChartCard title="High-priority exposures over time" note={`Peaked at ${peak.open} in ${peak.full}; ${MONTHS[LAST].open} today.`}><OpenLine sel={mi} /></ChartCard>
              <ChartCard title="New versus resolved" note="Since August, more has been resolved each month than has appeared." legend={[["#b7791f", "New"], ["#1b9aa6", "Resolved"]]}><NewResolved sel={mi} /></ChartCard>
              <ChartCard title="How long exposures stay open" note="Only one exposure is older than 90 days: the unsupported scheduling software." legend={[["#7fd1d9", AGING_LABELS[0]], ["#1b9aa6", AGING_LABELS[1]], ["#a8322d", AGING_LABELS[2]]]}><Aging sel={mi} /></ChartCard>
              <ChartCard title="Progress against agreed priorities" note="Six of eight agreed priorities are complete. The remaining two are the high-impact risks awaiting decisions."><Progress sel={mi} /></ChartCard>
            </div>
          </div>
        )}

        {tab === "decisions" && (
          <div>
            <h3 className="font-display text-2xl text-navy-900">Decisions Requiring Executive Attention</h3>
            <p className="mt-2 max-w-3xl text-slate-ink">Three decisions where leadership participation changes the outcome.</p>
            <ol className="mt-8 grid gap-5 lg:grid-cols-3">
              {DECISIONS.map((d, i) => (
                <li key={d.id} className={`card flex flex-col p-6 ${sel === d.riskId ? "ring-2 ring-teal-500" : ""}`}>
                  <p className="font-display text-4xl text-teal-500">{i + 1}</p>
                  <Field label="Business issue" v={d.issue} />
                  <Field label="Consequence of delay" v={d.consequence} />
                  <Field label="Recommended course of action" v={d.recommendation} />
                  <dl className="mt-auto grid grid-cols-2 gap-3 border-t border-line pt-4 text-sm">
                    <div><dt className="text-xs uppercase tracking-wider text-slate-ink">Executive owner</dt><dd className="font-semibold text-navy-900">{d.owner}</dd></div>
                    <div><dt className="text-xs uppercase tracking-wider text-slate-ink">Decide by</dt><dd className="font-semibold text-navy-900">{d.date}</dd></div>
                    <div className="col-span-2"><dt className="text-xs uppercase tracking-wider text-slate-ink">Budget implication</dt><dd className="text-navy-900">{d.budget}</dd></div>
                  </dl>
                  <button className="mt-4 text-left text-sm font-semibold text-teal-600 underline underline-offset-4" onClick={() => go("risks", d.riskId)}>View the related risk →</button>
                </li>))}
            </ol>
          </div>
        )}

        {tab === "board" && <BoardSummary onPrint={showBoardPrint ? printBoard : undefined} />}
      </div>
    </div>
  );
}

function Field({ label, v }: { label: string; v: string }) { return (<div className="mt-4"><p className="text-xs font-semibold uppercase tracking-wider text-slate-ink">{label}</p><p className="mt-1 text-[15px] leading-relaxed text-charcoal">{v}</p></div>); }
function ChartCard({ title, note, legend, children }: { title: string; note: string; legend?: [string, string][]; children: React.ReactNode }) {
  return (<div className="card p-5"><h4 className="font-semibold text-navy-900">{title}</h4>{children}
    {legend && <ul className="mt-1 flex flex-wrap gap-4 text-xs text-slate-ink">{legend.map(([c, l]) => <li key={l} className="flex items-center gap-1.5"><span className="inline-block h-2.5 w-2.5 rounded-sm" style={{ background: c }} />{l}</li>)}</ul>}
    <p className="mt-3 text-sm leading-relaxed text-slate-ink">{note}</p></div>);
}
function RiskCard({ r, selected, onSelect, onDecision }: { r: Risk; selected: boolean; onSelect: () => void; onDecision: () => void }) {
  return (
    <li className={`card p-5 md:p-6 ${selected ? "ring-2 ring-teal-500" : ""}`}>
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div><p className="text-xs font-semibold text-slate-ink">{r.id}</p><h4 className="font-display text-xl text-navy-900">{r.title}</h4></div>
        <div className="flex gap-2"><Pill cls={urgencyStyle[r.urgency]}>Urgency: {r.urgency}</Pill><Pill cls={statusStyle[r.status]}>{r.status}</Pill></div>
      </div>
      <p className="mt-3 text-charcoal">{r.plain}</p>
      <dl className="mt-4 grid gap-x-8 gap-y-4 text-sm md:grid-cols-2">
        <div><dt className="font-semibold text-navy-900">Potential business impact</dt><dd className="mt-1 text-slate-ink">{r.impact}</dd></div>
        <div><dt className="font-semibold text-navy-900">Business functions affected</dt><dd className="mt-1 text-slate-ink">{r.affects}</dd></div>
        <div><dt className="font-semibold text-navy-900">Recommended action</dt><dd className="mt-1 text-slate-ink">{r.action}</dd></div>
        <div className="grid grid-cols-2 gap-4"><div><dt className="font-semibold text-navy-900">Responsible owner</dt><dd className="mt-1 text-slate-ink">{r.owner}</dd></div><div><dt className="font-semibold text-navy-900">Target resolution</dt><dd className="mt-1 text-slate-ink">{r.target}</dd></div></div>
      </dl>
      <div className="mt-4 flex flex-wrap items-center gap-4">
        <button onClick={onSelect} aria-pressed={selected} className="text-sm font-semibold text-teal-600 underline underline-offset-4">{selected ? "Deselect" : "Highlight"}</button>
        {r.decisionId && <button onClick={onDecision} className="text-sm font-semibold text-teal-600 underline underline-offset-4">Executive decision required →</button>}
      </div>
      <details className="mt-4 rounded-lg bg-mist p-3 text-sm"><summary className="font-semibold text-slate-ink">Technical detail for IT (optional)</summary><p className="mt-2 text-slate-ink">{r.technical}</p></details>
    </li>
  );
}

export function BoardSummary({ onPrint }: { onPrint?: () => void }) {
  const Q = ({ n, q, children }: { n: number; q: string; children: React.ReactNode }) => (
    <div className="break-inside-avoid border-t border-line py-4"><h4 className="font-display text-lg text-navy-900"><span className="mr-2 text-teal-600">{n}.</span>{q}</h4><div className="mt-2 text-[15px] leading-relaxed text-charcoal">{children}</div></div>);
  return (
    <div>
      {onPrint && (<div className="no-print-board mb-5 flex flex-wrap items-center justify-between gap-3">
        <p className="text-sm text-slate-ink">One page, written for a Board packet. Use your browser's “Save as PDF” destination.</p>
        <button onClick={onPrint} className="btn btn-dark">Print / Save as PDF</button></div>)}
      <article className="board-sheet mx-auto max-w-3xl rounded-lg border border-line bg-white p-8 shadow-sm" aria-label="Board summary">
        <header className="flex items-start justify-between gap-4 border-b-2 border-navy-900 pb-4">
          <div><p className="text-xs font-semibold uppercase tracking-widest text-teal-600">Board Summary · Cybersecurity Risk</p><h3 className="font-display text-2xl text-navy-900">{ORG}</h3><p className="text-sm text-slate-ink">Reporting period: {PERIOD}</p></div>
          <p className="max-w-[10rem] rounded border border-amber-risk px-2 py-1 text-center text-[10px] font-bold uppercase leading-tight text-amber-risk">{SAMPLE_LABEL}</p>
        </header>
        <Q n={1} q="Where do we stand?"><p><strong>Needs Attention, and improving.</strong> {MONTHS[LAST].open} priority exposures are open, down from {peak.open} in {peak.full}. {MONTHS[LAST].prioritiesDone} of {TOTAL_PRIORITIES} agreed priorities are complete.</p></Q>
        <Q n={2} q="What has changed?"><p>This month {MONTHS[LAST].resolved} high-priority findings were resolved and {MONTHS[LAST].newHigh} new ones appeared. Exposure has declined for four consecutive periods. Two new items (remote-access update, administrator sign-in protection) are already in progress.</p></Q>
        <Q n={3} q="What are our most significant risks?"><ul className="list-disc pl-5"><li>Patient scheduling depends on software its vendor no longer supports.</li><li>Critical updates on staff laptops are overdue.</li><li>The remote-access system needs a vendor update.</li></ul></Q>
        <Q n={4} q="What are we doing about them?"><p>Owners and dates are assigned for every high-priority item. The remote-access update (Nov 20) and administrator sign-in protection (Nov 25) are in progress. {overdueCount} high-priority action is overdue and is escalated below.</p></Q>
        <Q n={5} q="What decisions or investments are required?">
          <table className="w-full text-left text-sm"><thead><tr className="text-xs uppercase tracking-wider text-slate-ink"><th className="pb-1 pr-2">Decision</th><th className="pb-1 pr-2">Owner</th><th className="pb-1 pr-2">By</th><th className="pb-1">Budget</th></tr></thead>
            <tbody className="align-top">{DECISIONS.map((d) => (<tr key={d.id} className="border-t border-line"><td className="py-1.5 pr-2">{d.recommendation}</td><td className="py-1.5 pr-2">{d.owner}</td><td className="py-1.5 pr-2 whitespace-nowrap">{d.date}</td><td className="py-1.5">{d.budget.split(" (")[0]}</td></tr>))}</tbody></table>
        </Q>
        <footer className="mt-2 border-t border-line pt-3 text-[11px] leading-snug text-slate-ink">Illustrative sample with fictional data. Real reports reflect the scope agreed with each client. Vulnerability management does not by itself establish regulatory compliance and is not a penetration test or formal risk analysis.</footer>
      </article>
    </div>
  );
}
