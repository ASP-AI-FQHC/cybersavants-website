# Cybersavants — Executive Vulnerability Management Website

Next.js 15 (App Router) · React 19 · TypeScript · Tailwind CSS v4. Self-hosted fonts (Fraunces, Inter) via Fontsource: no third-party font requests.

## Run locally
```bash
npm install
cp .env.example .env.local   # optional; see below
npm run dev                  # http://localhost:3000
npm run build && npm start   # production build
```

## Structure
- `src/lib/report-data.ts` – single source for ALL sample report data (charts, KPIs, risks, decisions, board summary). Includes consistency checks that throw at build if numbers disagree.
- `src/lib/config.ts` – verified contact details, navigation, and the **configurable pricing reference** (`PRICING.show`).
- `src/components/ReportExplorer.tsx` – interactive report (periods, tabs, risks ↔ decisions, print-to-PDF board summary).
- `src/app/api/contact/route.ts` – server-side form handler.

## Deploy
Any Node host (Vercel, Netlify, Azure Static Web Apps w/ Node, container). Set env vars from `.env.example`. Serve over HTTPS; security headers are set in `next.config.mjs`. Set `NEXT_PUBLIC_SITE_URL`.

## Needs configuration before launch
1. **Form delivery**: set `CONTACT_WEBHOOK_URL` (CRM/automation) OR `RESEND_API_KEY` + `CONTACT_FROM_EMAIL` + `CONTACT_TO_EMAIL`. Until then the form shows a "not available yet" message with the support email/text fallback.
2. **Spam**: honeypot, minimum-fill-time and per-IP rate limiting are on. Optional Cloudflare Turnstile via the two env vars. The in-memory rate limiter should be replaced with a shared store if you run multiple instances.
3. **Scheduling**: no calendar integration exists. Set `NEXT_PUBLIC_SCHEDULING_URL` to show a "Choose a time" button after submission.
4. **Imagery**: no photography was generated; add authentic executive/healthcare photos (`public/`) if desired.
5. **Analytics / cookie banner**: none installed.

## Items requiring owner approval
- `$499 per month` and its five inclusions are carried over verbatim from the existing executive-reporting page; toggle with `PRICING.show`.
- "Monthly" strategic review: the existing page says timing is agreed at the start, while this brief makes monthly central. Confirm cadence, meeting length and participants contractually.
- `/privacy` is a draft needing legal review.
- Additional-services copy and "technologies referenced" come from the existing homepage; not linked to the old detail pages (URLs unknown).
- No testimonials, certifications, client names or statistics are used. "About" copy is generic; add real bios/credentials.
- The sample "Example Family Clinic" is carried over from the existing site, and budget ranges are fictional.

## Branding
Applied from the cyberSAVANTS Brand Guide v2.0: Savant Green `#00E639` on Cyber Black/Charcoal, Montserrat (Black/Bold/Regular) with Playfair Display Italic for taglines, 8px button radius, approved button styles. Colors are defined once as tokens in `src/app/globals.css` (`@theme`). Green text on light backgrounds uses a darker AA-compliant green (`#007A29`); amber/red text uses darker text-safe variants. The wordmark is live text (`src/components/Chrome.tsx`); the power-button icon is cropped from the supplied logo PNG (`public/brand/`). The supplied PNG is low resolution; replace `public/brand/icon.png`, `src/app/icon.png` and `src/app/apple-icon.png` with an SVG/high-res export when available.
