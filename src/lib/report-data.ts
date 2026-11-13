// ILLUSTRATIVE SAMPLE — NOT ACTUAL CLIENT DATA. All figures are fictional and derived from one source here
// so every chart, KPI and narrative is internally consistent.
export const ORG = "Example Family Clinic";
export const PERIOD = "November 2026";
export const SAMPLE_LABEL = "Illustrative Sample — Not Actual Client Data";

export type Month = { m: string; full: string; newHigh: number; resolved: number; open: number; aging: [number, number, number]; prioritiesDone: number; posture: "Elevated" | "Needs Attention" };

const START_OPEN = 14; // open high-priority exposures at end of May
const flows: Omit<Month, "open">[] = [
  { m: "Jun", full: "June", newHigh: 5, resolved: 4, aging: [5, 6, 4], prioritiesDone: 1, posture: "Needs Attention" },
  { m: "Jul", full: "July", newHigh: 6, resolved: 4, aging: [6, 6, 5], prioritiesDone: 2, posture: "Elevated" },
  { m: "Aug", full: "August", newHigh: 4, resolved: 7, aging: [4, 6, 4], prioritiesDone: 4, posture: "Needs Attention" },
  { m: "Sep", full: "September", newHigh: 3, resolved: 6, aging: [3, 5, 3], prioritiesDone: 5, posture: "Needs Attention" },
  { m: "Oct", full: "October", newHigh: 4, resolved: 6, aging: [4, 3, 2], prioritiesDone: 6, posture: "Needs Attention" },
  { m: "Nov", full: "November", newHigh: 3, resolved: 5, aging: [3, 3, 1], prioritiesDone: 6, posture: "Needs Attention" },
];
export const TOTAL_PRIORITIES = 8;
export const MONTHS: Month[] = (() => {
  let open = START_OPEN;
  return flows.map((f) => {
    open = open + f.newHigh - f.resolved;
    const agingSum = f.aging[0] + f.aging[1] + f.aging[2];
    if (agingSum !== open) throw new Error(`Sample data inconsistent for ${f.m}: aging ${agingSum} vs open ${open}`);
    return { ...f, open };
  });
})();
export const AGING_LABELS = ["0–30 days", "31–90 days", "Over 90 days"];

export type Urgency = "Immediate" | "High" | "Moderate" | "Low";
export type Status = "Awaiting decision" | "Overdue" | "In progress" | "Not started";
export type Risk = {
  id: string; title: string; plain: string; impact: string; affects: string; urgency: Urgency;
  action: string; owner: string; target: string; status: Status; exposures: number; decisionId?: string; technical: string;
};
export const RISKS: Risk[] = [
  { id: "R1", title: "Unsupported software behind patient scheduling", plain: "The scheduling system runs software its vendor no longer supports or repairs.",
    impact: "Higher likelihood of a service interruption that disrupts patient scheduling and daily operations, with no vendor help when it fails.",
    affects: "Patient scheduling · Front desk · Provider schedules", urgency: "High",
    action: "Approve a replacement or mitigation plan and name an accountable owner.", owner: "Chief Operating Officer", target: "Dec 15, 2026", status: "Awaiting decision", exposures: 1, decisionId: "D1",
    technical: "Application end-of-support since 2025; no vendor security updates available. Open 94 days. Compensating controls: restricted network access under review." },
  { id: "R2", title: "Overdue security updates on staff laptops", plain: "Critical fixes identified at the last review are still missing on several staff laptops.",
    impact: "Staff devices with access to patient records stay open to well-known methods of attack, raising the chance of a disruptive incident.",
    affects: "Clinical documentation · Billing · Staff devices", urgency: "High",
    action: "Name an owner and a firm completion date; confirm completion at next review.", owner: "IT Director", target: "Nov 30, 2026", status: "Overdue", exposures: 3, decisionId: "D2",
    technical: "Three laptops missing cumulative OS and browser updates; oldest finding 58 days. Deployment blocked by user-device availability." },
  { id: "R3", title: "Remote-access gateway needs updating", plain: "The system staff use to connect from outside the office is running an out-of-date version.",
    impact: "A weakness in a front-door system is the kind attackers look for first; exploitation could interrupt remote work and expose internal systems.",
    affects: "Remote work · Internal network", urgency: "Immediate",
    action: "Complete the vendor update this month; no executive decision required.", owner: "IT Director (with MSP)", target: "Nov 20, 2026", status: "In progress", exposures: 1,
    technical: "Gateway firmware two releases behind; vendor fix available; maintenance window scheduled." },
  { id: "R4", title: "Administrator accounts without a second sign-in step", plain: "Two accounts with the broadest access can be used with a password alone.",
    impact: "If a password is stolen, an attacker could gain wide access to email and files, creating operational and notification consequences.",
    affects: "Email · Shared files · Account management", urgency: "High",
    action: "Enforce multi-factor sign-in for all administrator accounts.", owner: "IT Director", target: "Nov 25, 2026", status: "In progress", exposures: 2,
    technical: "Two Microsoft 365 administrator accounts excluded from conditional access policy." },
  { id: "R5", title: "Guest Wi-Fi can reach internal systems", plain: "Visitors on guest Wi-Fi can reach more internal systems than they should.",
    impact: "Increases the number of ways an unmanaged device could reach internal systems; moderate likelihood, contained scope.",
    affects: "Internal network", urgency: "Moderate",
    action: "Authorize a network configuration change to separate guest traffic.", owner: "Chief Financial Officer (authorization)", target: "Dec 8, 2026", status: "Awaiting decision", exposures: 0, decisionId: "D3",
    technical: "Guest VLAN permitted to internal subnets; firewall rule change required." },
  { id: "R6", title: "Network printer uses factory password", plain: "A shared printer still uses the password it shipped with.",
    impact: "Low direct impact; a minor entry point that is simple to correct.",
    affects: "Printing · Second-floor office", urgency: "Low",
    action: "Include in routine maintenance.", owner: "IT Director", target: "Dec 31, 2026", status: "Not started", exposures: 0,
    technical: "Default administrative credentials on one network printer." },
];
// Consistency check: priority exposures across the active high-priority risks equal Nov open count.
const exposureSum = RISKS.reduce((s, r) => s + r.exposures, 0);
if (exposureSum !== MONTHS[MONTHS.length - 1].open) throw new Error("Sample risk exposures must equal open high-priority exposures");

export type Decision = { id: string; issue: string; consequence: string; recommendation: string; owner: string; date: string; budget: string; riskId: string };
export const DECISIONS: Decision[] = [
  { id: "D1", riskId: "R1", issue: "The scheduling system's vendor no longer supports the software that patient scheduling depends on.",
    consequence: "Each month of delay extends the period in which a failure or attack on this system could halt scheduling, with no vendor assistance.",
    recommendation: "Fund and approve a replacement project; apply interim access restrictions until cutover.",
    owner: "CEO and COO", date: "Dec 1, 2026", budget: "Illustrative range: $45,000–$70,000 (to be validated by vendor quotes)" },
  { id: "D2", riskId: "R2", issue: "Critical security updates identified last review remain unfinished on staff laptops; no single person owns completion.",
    consequence: "Staff devices that access patient records remain exposed to known attack methods; the item will be overdue again at next review.",
    recommendation: "Assign one accountable owner and a completion date no later than Nov 30.",
    owner: "COO", date: "Nov 24, 2026", budget: "None anticipated — within existing IT operations" },
  { id: "D3", riskId: "R5", issue: "Guest Wi-Fi is not fully separated from internal systems.",
    consequence: "Leaves a contained but avoidable path between unmanaged visitor devices and internal systems.",
    recommendation: "Authorize the configuration change during the next maintenance window.",
    owner: "CFO", date: "Dec 8, 2026", budget: "Illustrative: about $2,500 in labor (to be confirmed)" },
];

export const latest = MONTHS[MONTHS.length - 1];
export const previous = MONTHS[MONTHS.length - 2];
export const peak = MONTHS.reduce((a, b) => (b.open > a.open ? b : a));
export const overdueCount = RISKS.filter((r) => r.status === "Overdue").length;
export const decisionCount = DECISIONS.length;
export function observation(i: number): string {
  const cur = MONTHS[i]; const prev = i > 0 ? MONTHS[i - 1] : { open: START_OPEN };
  const delta = cur.open - prev.open;
  if (i === MONTHS.length - 1)
    return `Priority exposure has declined in each of the last four reporting periods, from ${peak.open} in ${peak.full} to ${cur.open} now, although two high-impact risks remain unresolved: the unsupported scheduling software and the overdue laptop updates.`;
  if (delta > 0) return `Priority exposure rose by ${delta} in ${cur.full}: ${cur.newHigh} new high-priority findings outpaced ${cur.resolved} resolved. ${cur === peak ? "This is the six-month peak." : ""}`.trim();
  return `Priority exposure fell by ${-delta} in ${cur.full}: ${cur.resolved} resolved against ${cur.newHigh} new, leaving ${cur.open} open.`;
}
