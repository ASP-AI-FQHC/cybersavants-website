# Go-live runbook (Vercel, staging first)

## 1. Staging deploy (preview URL)
1. vercel.com → Add New → Project → import `ASP-AI-FQHC/cybersavants-website` (framework auto-detected: Next.js; no build settings needed).
2. Project Settings → Environment Variables (Production + Preview):
   - `NEXT_PUBLIC_SITE_URL` = `https://www.cybersavants.com`
   - Form delivery, ONE of: `CONTACT_WEBHOOK_URL`, or `RESEND_API_KEY` + `CONTACT_FROM_EMAIL` + `CONTACT_TO_EMAIL`
   - Optional: `NEXT_PUBLIC_TURNSTILE_SITE_KEY` + `TURNSTILE_SECRET_KEY`, `NEXT_PUBLIC_SCHEDULING_URL`
3. Deploy. Review the preview URL on desktop, tablet and phone.
4. Test the form end to end (submit a real test; confirm it arrives). Test Print/Save as PDF on the Board Summary.

## 2. Launch blockers (must be cleared before pointing the domain)
- [ ] Form delivery configured and tested (otherwise the form shows a fallback message)
- [ ] Pricing ($499/month and its five inclusions) approved, or set `PRICING.show = false` in `src/lib/config.ts`
- [ ] Monthly review cadence/length/participants confirmed contractually
- [ ] Privacy notice reviewed by counsel (`src/app/privacy/page.tsx` is a draft)
- [ ] About page: real bios/credentials added (currently generic)
- [ ] Higher-resolution logo/icon (SVG) swapped in, if available
- [ ] Old-site URLs mapped: add redirects in `next.config.mjs` for any existing paths you want preserved
- [ ] Search Console / analytics decision (none installed)

## 3. Cutover
1. Project → Settings → Domains → add `www.cybersavants.com` and `cybersavants.com` (redirect apex → www).
2. At your DNS provider: `www` CNAME → `cname.vercel-dns.com`; apex A record → value Vercel shows. Lower TTL to 300s a day before.
3. Wait for the certificate (automatic). Verify HTTPS and `/sitemap.xml`.
4. Submit sitemap in Google Search Console.

## 4. Rollback
Vercel → Deployments → promote the previous deployment, or restore the old DNS records (keep a copy of them before changing).
