# TODO - Fresh Soy Tempeh Landing Page

- [x] Scaffold Vite + React project
- [x] Install and configure Tailwind CSS (Vite plugin)
- [x] Create required landing page components
- [x] Integrate product packaging image asset
- [x] Implement mobile-first layout and required copy
- [x] Validate WhatsApp links and target/rel attributes
- [x] Run production build successfully
- [x] Push project to GitHub repository
- [x] Deploy project to Cloudflare Workers

## Meta Pixel Setup (Pixel ID: 2368715833611861)
- [x] Add Meta Pixel base code to `index.html`
- [x] Add `Lead` tracking on `WhatsAppOrderButton.jsx`
- [x] Add `Lead` tracking on `StickyWhatsAppCTA.jsx`
- [x] Run build verification after Pixel integration
- [ ] Commit and push Pixel changes

## Meta Pixel Troubleshooting
- [x] Add robust pixel helper with debug support
- [x] Track both `Lead` and `WhatsAppClick` events with eventID
- [x] Wire helper into WhatsApp buttons
- [x] Rebuild and verify no compile errors
- [ ] Manual verification in Meta Test Events + browser network

## 🚀 Cline Ads — Meta Ads Audit & Optimizations (May 2026)

### Quick Fixes Applied (8 May 2026)
- [x] `src/lib/metaPixel.js` — Rewrite with standard events only (Lead, ViewContent, InitiateCheckout)
- [x] `src/lib/metaPixel.js` — Add `makeWhatsAppUrl()` helper with UTM tracking
- [x] `src/components/WhatsAppOrderButton.jsx` — Switch to `trackLead()` + UTM params
- [x] `src/components/StickyWhatsAppCTA.jsx` — Switch to `trackLead()` + UTM params
- [x] Remove deprecated `trackWhatsAppClick()` references (0 matches found)
- [x] Audit CSV analysis completed — Score: 31/100 (Grade F)

### Pending Actions
- [x] **Setup CAPI Gateway** — Cloudflare Worker `worker/CAPI_Gateway.js` created + client-side integration in `metaPixel.js`
- [x] **Deploy CAPI Worker** — Deployed via Cloudflare API (wrangler not available on macOS 10.15) to `freshsoytempeh-capi.ridho90.workers.dev` + route `capi.freshsoytempeh.nz`
- [ ] **Improve EMQ** — Send hashed email/phone via CAPI (target EMQ >8.0)
- [ ] **Setup AEM** — Configure Aggregated Event Measurement with top 8 events
- [x] **Domain Verification** — Meta tag added to `index.html` (need to replace placeholder with actual code from Business Manager)
- [ ] **Verify domain** — Replace placeholder `YOUR_VERIFICATION_CODE_HERE` with real code from Business Manager
- [ ] **Restart campaign** with minimum $10-20/day budget
- [ ] **Add ViewContent event** on pages (Hero/Product sections)
- [ ] **Create Custom Audience** from customer list + exclude from prospecting
- [ ] **UTM tracking** — Verify in GA4 that WhatsApp clicks are attributed
- [ ] **Frequency monitoring** — Keep frequency <3.0 on all active ad sets
- [ ] **Creative refresh** — Test new creatives every 14-21 days
- [ ] **A/B test** — Run experiments on Advantage+ vs manual targeting
