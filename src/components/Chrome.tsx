"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { NAV, SITE } from "@/lib/config";

export function Logo({ light = false }: { light?: boolean }) {
  return (
    <span className="inline-flex items-center gap-2.5">
      <svg width="30" height="30" viewBox="0 0 32 32" aria-hidden="true">
        <rect width="32" height="32" rx="7" fill={light ? "#1b9aa6" : "#0a1730"} />
        <path d="M9 21l5-6 4 3 6-8" fill="none" stroke={light ? "#06121c" : "#7fd1d9"} strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
      <span className={`font-display text-xl font-semibold ${light ? "text-white" : "text-navy-900"}`}>Cybersavants</span>
    </span>
  );
}

export function Header() {
  const path = usePathname();
  const [open, setOpen] = useState(false);
  return (
    <header className="no-print-board sticky top-0 z-40 border-b border-line bg-white/95 backdrop-blur">
      <a href="#main" className="sr-only focus:not-sr-only focus:absolute focus:left-2 focus:top-2 focus:z-50 focus:bg-white focus:p-3">Skip to content</a>
      <div className="container-x flex h-16 items-center justify-between">
        <Link href="/" aria-label="Cybersavants home"><Logo /></Link>
        <nav aria-label="Primary" className="hidden items-center gap-7 lg:flex">
          {NAV.map((n) => (
            <Link key={n.href} href={n.href} aria-current={path === n.href ? "page" : undefined}
              className={`text-sm font-medium hover:text-teal-600 ${path === n.href ? "text-teal-600" : "text-charcoal"}`}>{n.label}</Link>
          ))}
          <Link href="/contact" className="btn btn-dark !py-2 !text-sm">Request a Briefing</Link>
        </nav>
        <button className="lg:hidden btn btn-outline !px-3 !py-2" aria-expanded={open} aria-controls="mobile-nav" onClick={() => setOpen(!open)}>
          {open ? "Close" : "Menu"}
        </button>
      </div>
      {open && (
        <nav id="mobile-nav" aria-label="Mobile" className="border-t border-line bg-white lg:hidden">
          <ul className="container-x flex flex-col py-3">
            {NAV.map((n) => (<li key={n.href}><Link onClick={() => setOpen(false)} href={n.href} className="block py-3 text-base font-medium">{n.label}</Link></li>))}
            <li className="pt-2"><Link onClick={() => setOpen(false)} href="/contact" className="btn btn-dark w-full">Request an Executive Risk Briefing</Link></li>
          </ul>
        </nav>
      )}
    </header>
  );
}

export function Footer() {
  return (
    <footer className="no-print-board dark-surface bg-navy-950 text-slate-300">
      <div className="container-x grid gap-10 py-14 md:grid-cols-4">
        <div className="md:col-span-2">
          <Logo light />
          <p className="mt-4 max-w-sm text-sm leading-relaxed">Executive vulnerability management: cybersecurity risk, translated for the boardroom.</p>
          <p className="mt-4 text-sm">
            <a className="underline underline-offset-4 hover:text-white" href={`mailto:${SITE.email}`}>{SITE.email}</a><br />
            <a className="underline underline-offset-4 hover:text-white" href={SITE.smsHref}>Text {SITE.smsDisplay}</a>
          </p>
        </div>
        <div>
          <h2 className="eyebrow">Explore</h2>
          <ul className="mt-4 space-y-2 text-sm">
            {NAV.map((n) => (<li key={n.href}><Link className="hover:text-white" href={n.href}>{n.label}</Link></li>))}
            <li><Link className="hover:text-white" href="/contact">Request a Briefing</Link></li>
          </ul>
        </div>
        <div>
          <h2 className="eyebrow">More from Cybersavants</h2>
          <ul className="mt-4 space-y-2 text-sm">
            <li><Link className="hover:text-white" href="/services">Additional security services</Link></li>
            <li><Link className="hover:text-white" href="/privacy">Privacy</Link></li>
          </ul>
        </div>
      </div>
      <div className="border-t border-white/10">
        <p className="container-x py-5 text-xs leading-relaxed text-slate-400">
          Vulnerability management supports, and does not by itself establish, HIPAA or any other compliance. It is not a penetration test or a formal HIPAA Security Risk Analysis. Sample reports on this site use fictional data. © {new Date().getFullYear()} Cybersavants.
        </p>
      </div>
    </footer>
  );
}
