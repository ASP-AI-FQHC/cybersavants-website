"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { NAV, SITE } from "@/lib/config";

export function Logo({ light = false, tagline = false }: { light?: boolean; tagline?: boolean }) {
  // Wordmark per Brand Guide v2.0: "cyber" lowercase + "SAVANTS" uppercase, Montserrat Black, two-tone.
  // `light` = for use on LIGHT backgrounds (dark text, darker green). Default = dark backgrounds.
  return (
    <span className="inline-flex items-center gap-3">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src="/brand/icon.png" alt="" width={36} height={36} className="h-9 w-9" />
      <span className="flex flex-col leading-none">
        <span className="text-[1.35rem] font-black tracking-tight" style={{ fontFamily: "var(--font-sans)" }}>
          <span className={light ? "text-black" : "text-white"}>cyber</span><span style={{ color: light ? "#00a82d" : "#00e639" }}>SAVANTS</span>
        </span>
        {tagline && <span className="tagline mt-1 text-[11px] text-silver" style={{ color: "#b0b0b0" }}>Your unique technology partner.</span>}
      </span>
    </span>
  );
}

export function Header() {
  const path = usePathname();
  const [open, setOpen] = useState(false);
  return (
    <header className="no-print-board sticky top-0 z-40 border-b border-white/10 bg-black/95 backdrop-blur">
      <a href="#main" className="sr-only focus:not-sr-only focus:absolute focus:left-2 focus:top-2 focus:z-50 focus:bg-white focus:p-3 focus:text-black">Skip to content</a>
      <div className="container-x flex h-16 items-center justify-between">
        <Link href="/" aria-label="Cybersavants home"><Logo /></Link>
        <nav aria-label="Primary" className="hidden items-center gap-7 lg:flex">
          {NAV.map((n) => (
            <Link key={n.href} href={n.href} aria-current={path === n.href ? "page" : undefined}
              className={`text-sm font-medium hover:text-teal-500 ${path === n.href ? "text-teal-500" : "text-white"}`}>{n.label}</Link>
          ))}
          <Link href="/contact" className="btn btn-primary !py-2 !text-sm">Request a Briefing</Link>
        </nav>
        <button className="lg:hidden btn btn-ghost !px-3 !py-2" aria-expanded={open} aria-controls="mobile-nav" onClick={() => setOpen(!open)}>
          {open ? "Close" : "Menu"}
        </button>
      </div>
      {open && (
        <nav id="mobile-nav" aria-label="Mobile" className="border-t border-white/10 bg-black lg:hidden">
          <ul className="container-x flex flex-col py-3">
            {NAV.map((n) => (<li key={n.href}><Link onClick={() => setOpen(false)} href={n.href} className="block py-3 text-base font-semibold text-white">{n.label}</Link></li>))}
            <li className="pt-2"><Link onClick={() => setOpen(false)} href="/contact" className="btn btn-primary w-full">Request an Executive Risk Briefing</Link></li>
          </ul>
        </nav>
      )}
    </header>
  );
}

export function Footer() {
  return (
    <footer className="no-print-board dark-surface bg-black text-[#b0b0b0]">
      <div className="container-x grid gap-10 py-14 md:grid-cols-4">
        <div className="md:col-span-2">
          <Logo tagline />
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
