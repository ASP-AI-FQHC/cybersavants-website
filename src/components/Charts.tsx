import { MONTHS, AGING_LABELS, TOTAL_PRIORITIES } from "@/lib/report-data";

const W = 360, H = 190, PL = 30, PR = 12, PT = 16, PB = 30;
const iw = W - PL - PR, ih = H - PT - PB;
const x = (i: number, n = MONTHS.length) => PL + (iw / n) * (i + 0.5);

function Axes({ max, step, sel }: { max: number; step: number; sel: number }) {
  const ticks: number[] = []; for (let t = 0; t <= max; t += step) ticks.push(t);
  return (
    <g>
      {ticks.map((t) => { const y = PT + ih - (t / max) * ih; return (
        <g key={t}><line x1={PL} x2={W - PR} y1={y} y2={y} stroke="#e4e8ee" /><text x={PL - 6} y={y + 4} textAnchor="end" fontSize="10" fill="#4a5668">{t}</text></g>); })}
      {MONTHS.map((m, i) => (<text key={m.m} x={x(i)} y={H - 10} textAnchor="middle" fontSize="10" fontWeight={i === sel ? 700 : 400} fill={i === sel ? "#0a1730" : "#4a5668"}>{m.m}</text>))}
    </g>
  );
}
const Wrap = ({ label, children, table }: { label: string; children: React.ReactNode; table: React.ReactNode }) => (
  <figure>
    <svg viewBox={`0 0 ${W} ${H}`} role="img" aria-label={label} className="h-auto w-full">{children}</svg>
    <div className="sr-only-table">{table}</div>
  </figure>
);

export function OpenLine({ sel }: { sel: number }) {
  const max = 20; const y = (v: number) => PT + ih - (v / max) * ih;
  const pts = MONTHS.map((m, i) => `${x(i)},${y(m.open)}`).join(" ");
  return (
    <Wrap label={`Open high-priority exposures by month: ${MONTHS.map((m) => `${m.m} ${m.open}`).join(", ")}`}
      table={<table><caption>Open high-priority exposures</caption><tbody>{MONTHS.map((m) => <tr key={m.m}><th>{m.full}</th><td>{m.open}</td></tr>)}</tbody></table>}>
      <Axes max={max} step={5} sel={sel} />
      <polygon points={`${x(0)},${PT + ih} ${pts} ${x(MONTHS.length - 1)},${PT + ih}`} fill="#1b9aa6" opacity=".12" />
      <polyline points={pts} fill="none" stroke="#0a1730" strokeWidth="2.5" strokeLinejoin="round" />
      {MONTHS.map((m, i) => (<g key={m.m}><circle cx={x(i)} cy={y(m.open)} r={i === sel ? 6 : 3.5} fill={i === sel ? "#1b9aa6" : "#0a1730"} stroke="#fff" strokeWidth="2" />
        {i === sel && <text x={x(i)} y={y(m.open) - 11} textAnchor="middle" fontSize="12" fontWeight="700" fill="#0a1730">{m.open}</text>}</g>))}
    </Wrap>
  );
}
export function NewResolved({ sel }: { sel: number }) {
  const max = 8; const y = (v: number) => PT + ih - (v / max) * ih; const bw = 14;
  return (
    <Wrap label={`New versus resolved high-priority findings by month: ${MONTHS.map((m) => `${m.m} ${m.newHigh} new, ${m.resolved} resolved`).join("; ")}`}
      table={<table><caption>New versus resolved</caption><thead><tr><th>Month</th><th>New</th><th>Resolved</th></tr></thead><tbody>{MONTHS.map((m) => <tr key={m.m}><th>{m.full}</th><td>{m.newHigh}</td><td>{m.resolved}</td></tr>)}</tbody></table>}>
      <Axes max={max} step={2} sel={sel} />
      {MONTHS.map((m, i) => (<g key={m.m} opacity={i === sel ? 1 : 0.7}>
        <rect x={x(i) - bw - 1} y={y(m.newHigh)} width={bw} height={PT + ih - y(m.newHigh)} fill="#b7791f" rx="2" />
        <rect x={x(i) + 1} y={y(m.resolved)} width={bw} height={PT + ih - y(m.resolved)} fill="#1b9aa6" rx="2" /></g>))}
    </Wrap>
  );
}
export function Aging({ sel }: { sel: number }) {
  const max = 20; const y = (v: number) => PT + ih - (v / max) * ih; const bw = 26;
  const cols = ["#7fd1d9", "#1b9aa6", "#a8322d"];
  return (
    <Wrap label={`Age of open high-priority exposures by month. November: ${MONTHS[5].aging.map((a, i) => `${a} ${AGING_LABELS[i]}`).join(", ")}`}
      table={<table><caption>Aging of open exposures</caption><thead><tr><th>Month</th>{AGING_LABELS.map((l) => <th key={l}>{l}</th>)}</tr></thead><tbody>{MONTHS.map((m) => <tr key={m.m}><th>{m.full}</th>{m.aging.map((a, i) => <td key={i}>{a}</td>)}</tr>)}</tbody></table>}>
      <Axes max={max} step={5} sel={sel} />
      {MONTHS.map((m, i) => { let acc = 0; return (<g key={m.m} opacity={i === sel ? 1 : 0.7}>{m.aging.map((a, k) => { const top = y(acc + a); const h = y(acc) - top; acc += a; return <rect key={k} x={x(i) - bw / 2} y={top} width={bw} height={h} fill={cols[k]} stroke="#fff" strokeWidth=".8" />; })}</g>); })}
    </Wrap>
  );
}
export function Progress({ sel }: { sel: number }) {
  const max = TOTAL_PRIORITIES; const y = (v: number) => PT + ih - (v / max) * ih;
  const pts = MONTHS.map((m, i) => `${x(i)},${y(m.prioritiesDone)}`).join(" ");
  return (
    <Wrap label={`Agreed remediation priorities completed, out of ${TOTAL_PRIORITIES}: ${MONTHS.map((m) => `${m.m} ${m.prioritiesDone}`).join(", ")}`}
      table={<table><caption>Priorities completed of {TOTAL_PRIORITIES}</caption><tbody>{MONTHS.map((m) => <tr key={m.m}><th>{m.full}</th><td>{m.prioritiesDone}</td></tr>)}</tbody></table>}>
      <Axes max={max} step={2} sel={sel} />
      <line x1={PL} x2={W - PR} y1={y(max)} y2={y(max)} stroke="#0a1730" strokeDasharray="4 4" /><text x={W - PR} y={y(max) - 4} textAnchor="end" fontSize="9" fill="#0a1730">Goal: {max}</text>
      <polyline points={pts} fill="none" stroke="#1b9aa6" strokeWidth="2.5" strokeLinejoin="round" />
      {MONTHS.map((m, i) => (<circle key={m.m} cx={x(i)} cy={y(m.prioritiesDone)} r={i === sel ? 6 : 3.5} fill={i === sel ? "#0a1730" : "#1b9aa6"} stroke="#fff" strokeWidth="2" />))}
    </Wrap>
  );
}
