const STAGES = [
  { n: "01", t: "Discover", d: "Assess the agreed environment and identify vulnerabilities and exposures.", who: "Cybersavants" },
  { n: "02", t: "Prioritize", d: "Evaluate findings against exploitability, business criticality, operational impact and other relevant risk factors.", who: "Cybersavants" },
  { n: "03", t: "Translate", d: "Convert technical findings into an executive-level risk report with clear implications and recommended actions.", who: "Cybersavants" },
  { n: "04", t: "Advise", d: "Meet in a monthly strategic business review with a cybersecurity advisor who understands executive decision-making.", who: "With your leadership", hl: true },
  { n: "05", t: "Track", d: "Record agreed actions, owners, deadlines and progress. Revisit unresolved risks at each subsequent review.", who: "Shared accountability" },
];
export default function Process({ dark = false }: { dark?: boolean }) {
  return (
    <ol className="relative grid gap-4 lg:grid-cols-5">
      <div aria-hidden className={`absolute left-0 right-0 top-[34px] hidden h-px lg:block ${dark ? "bg-white/20" : "bg-line"}`} />
      {STAGES.map((s) => (
        <li key={s.n} className={`relative rounded-xl p-6 ${s.hl ? "bg-teal-500 text-navy-950" : dark ? "bg-white/5 ring-1 ring-white/15" : "card"}`}>
          <span className={`font-display flex h-9 w-9 items-center justify-center rounded-full text-sm font-semibold ${s.hl ? "bg-navy-950 text-white" : dark ? "bg-navy-950 text-teal-300 ring-1 ring-teal-300/50" : "bg-navy-900 text-white"}`}>{s.n}</span>
          <h3 className={`font-display mt-5 text-2xl font-semibold ${s.hl ? "" : dark ? "text-white" : "text-navy-900"}`}>{s.t}</h3>
          <p className={`mt-2 text-[15px] leading-relaxed ${s.hl ? "text-navy-950/85" : dark ? "text-slate-300" : "text-slate-ink"}`}>{s.d}</p>
          <p className={`mt-4 text-xs font-semibold uppercase tracking-wider ${s.hl ? "text-navy-950" : "text-teal-600"}`}>{s.who}</p>
        </li>))}
    </ol>
  );
}
