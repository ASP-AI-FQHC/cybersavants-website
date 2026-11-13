"use client";
import Link from "next/link";
import { useId, useRef, useState } from "react";

const ROLES = [
  { id: "ceo", label: "CEO", head: "Organizational resilience, reputation and strategic accountability.", pts: ["See, in one page, whether cyber exposure is rising or falling, and which items could disrupt the mission.", "Know exactly which decisions are yours, with a recommended action and a date for each.", "Answer a Board, insurer or regulator's question with a documented, current view of risk."], q: "Are we making progress on the risks that matter most?" },
  { id: "cfo", label: "CFO", head: "Financial exposure, investment prioritization and better-informed resource allocation.", pts: ["Understand which exposures carry real financial consequence, so spend goes where it reduces the most risk.", "Receive recommended investments with owners and timing, rather than a long list of technical fixes.", "Track whether prior investments are actually reducing exposure over time."], q: "Where does the next dollar of security spend do the most good?" },
  { id: "coo", label: "COO", head: "Business continuity, operational disruption and execution accountability.", pts: ["See which weaknesses could interrupt scheduling, billing, care delivery or other core operations.", "Assign every action to an accountable owner with a target date, and see what is overdue.", "Use the monthly review to unblock cross-team work before it becomes an incident."], q: "What could stop us from operating, and who is fixing it?" },
  { id: "cio", label: "CIO / IT Leader", head: "A shared, business-level language with leadership, and support for the priorities you already know matter.", pts: ["Give executives context for the investments and decisions your team needs.", "Keep technical detail available behind the executive view, without burying leaders in it.", "Gain an independent perspective that complements your team and your MSP."], q: "Does leadership understand the decisions we need from them?" },
  { id: "board", label: "Board of Directors", head: "Oversight, risk trends, decision documentation and visibility into remediation progress.", pts: ["A consistent, plain-English view of risk posture and direction of travel, month after month.", "A record of decisions requested, made and deferred, with owners and dates.", "Confidence that leadership is acting on known risk, supported by an independent advisor."], q: "How do we know management is addressing cyber risk?" },
];

export default function RoleSelector() {
  const uid = useId(); const [i, setI] = useState(0); const refs = useRef<(HTMLButtonElement | null)[]>([]);
  const r = ROLES[i];
  const onKey = (e: React.KeyboardEvent, k: number) => {
    let n = k; if (e.key === "ArrowRight" || e.key === "ArrowDown") n = (k + 1) % ROLES.length; else if (e.key === "ArrowLeft" || e.key === "ArrowUp") n = (k - 1 + ROLES.length) % ROLES.length; else return;
    e.preventDefault(); setI(n); refs.current[n]?.focus();
  };
  return (
    <div className="grid gap-8 lg:grid-cols-[16rem_1fr]">
      <div role="tablist" aria-label="Select your role" aria-orientation="vertical" className="flex gap-2 overflow-x-auto lg:flex-col">
        {ROLES.map((x, k) => (
          <button key={x.id} ref={(el) => { refs.current[k] = el; }} role="tab" id={`${uid}-t-${x.id}`} aria-selected={i === k} aria-controls={`${uid}-p`} tabIndex={i === k ? 0 : -1}
            onClick={() => setI(k)} onKeyDown={(e) => onKey(e, k)}
            className={`whitespace-nowrap rounded-lg px-5 py-3 text-left font-semibold transition ${i === k ? "bg-navy-900 text-white" : "bg-white text-charcoal ring-1 ring-line hover:ring-teal-500"}`}>{x.label}</button>))}
      </div>
      <div id={`${uid}-p`} role="tabpanel" aria-labelledby={`${uid}-t-${r.id}`} tabIndex={0} className="card p-7 md:p-10">
        <p className="eyebrow">For the {r.label}</p>
        <h3 className="font-display mt-2 text-2xl font-semibold text-navy-900 md:text-3xl">{r.head}</h3>
        <ul className="mt-6 space-y-3">{r.pts.map((p) => (<li key={p} className="flex gap-3 text-charcoal"><span aria-hidden className="mt-2 h-2 w-2 shrink-0 rounded-full bg-teal-500" />{p}</li>))}</ul>
        <blockquote className="mt-8 border-l-4 border-teal-500 pl-5 font-display text-xl italic text-navy-900">The question we help you answer: “{r.q}”</blockquote>
        <Link href="/sample-report" className="btn btn-outline mt-8">See what you would receive</Link>
      </div>
    </div>
  );
}
