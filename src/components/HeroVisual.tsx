import { MONTHS, ORG, SAMPLE_LABEL } from "@/lib/report-data";
export default function HeroVisual() {
  const max = 20; const w = 300, h = 90;
  const pts = MONTHS.map((m, i) => `${(i / (MONTHS.length - 1)) * w},${h - (m.open / max) * h}`).join(" ");
  return (
    <div aria-hidden="true" className="relative mx-auto w-full max-w-md select-none">
      <div className="absolute -inset-6 rounded-[2rem] bg-teal-500/20 blur-3xl" />
      <div className="relative rounded-2xl bg-white p-6 text-charcoal shadow-2xl ring-1 ring-white/20">
        <div className="flex items-center justify-between"><p className="font-display text-lg text-navy-900">{ORG}</p><span className="rounded bg-amber-risk/15 px-2 py-0.5 text-[10px] font-bold uppercase text-amber-risk">Sample</span></div>
        <div className="mt-4 grid grid-cols-2 gap-3">
          <div className="rounded-lg bg-mist p-3"><p className="text-[10px] font-semibold uppercase text-slate-ink">Overall posture</p><p className="font-display text-xl text-amber-risk">Needs Attention</p></div>
          <div className="rounded-lg bg-mist p-3"><p className="text-[10px] font-semibold uppercase text-slate-ink">Since last review</p><p className="font-display text-xl text-teal-600">↓ Improving</p></div>
        </div>
        <svg viewBox={`-6 -6 ${w + 12} ${h + 12}`} className="mt-4 w-full"><polygon points={`0,${h} ${pts} ${w},${h}`} fill="#00a82d" opacity=".15" /><polyline points={pts} fill="none" stroke="#1a1a1a" strokeWidth="2.5" strokeLinejoin="round" /><circle cx={w} cy={h - (MONTHS[5].open / max) * h} r="5" fill="#00a82d" stroke="#fff" strokeWidth="2" /></svg>
        <p className="text-xs text-slate-ink">Priority exposures, last six months</p>
        <div className="mt-4 rounded-lg border border-navy-900/15 p-3"><p className="text-[10px] font-semibold uppercase tracking-wider text-slate-ink">Decision requested</p><p className="mt-1 text-sm font-medium text-navy-900">Approve a replacement plan for the unsupported scheduling system.</p><p className="mt-1 text-xs text-slate-ink">Owner: CEO and COO · Decide by Dec 1</p></div>
        <p className="mt-3 text-center text-[10px] text-slate-ink">{SAMPLE_LABEL}</p>
      </div>
    </div>
  );
}
