// Single place for verified business facts and configurable commercial references.
export const SITE = {
  name: "Cybersavants",
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "https://www.cybersavants.com",
  email: "support@cybersavants.com", // verified: existing site
  smsDisplay: "(773) 387-9564", // verified: existing site ("text")
  smsHref: "sms:+17733879564",
  schedulingUrl: process.env.NEXT_PUBLIC_SCHEDULING_URL ?? "", // NOT configured by default
};

// Pricing reference carried over from the existing executive-reporting page.
// Set `show: false` to hide pricing site-wide. Requires owner approval before launch.
export const PRICING = {
  show: true,
  amount: "$499",
  cadence: "per month",
  name: "Executive Vulnerability Reporting",
  // Verified inclusions, copied from the existing page. Do not extend without approval.
  inclusions: [
    "Recurring vulnerability management of the agreed scope",
    "Findings ranked by risk, not just by score",
    "A board-ready posture summary in plain English",
    "A strategic business review with your leadership",
    "Recommended decisions, with a suggested owner for each",
  ],
  boundary:
    "Scope, access and remediation responsibility are agreed in writing before service starts.",
};

export const NAV = [
  { href: "/executive-reporting", label: "Executive Reporting" },
  { href: "/sample-report", label: "Sample Report" },
  { href: "/how-it-works", label: "How It Works" },
  { href: "/healthcare", label: "Healthcare" },
  { href: "/about", label: "About" },
];
