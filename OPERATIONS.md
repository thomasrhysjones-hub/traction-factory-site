# Traction Factory: launch and conversion operations

## Status and deployment verification

This repository publishes the site through GitHub Actions from `main` using `.github/workflows/publish-site.yml`. Merging a PR is not itself proof that a GitHub Pages deployment succeeded.

After every merge:
1. Open `https://github.com/thomasrhysjones-hub/traction-factory-site/actions`.
2. Inspect the most recent **Publish Traction Factory to GitHub Pages** run for that commit. Require a green build **and** deploy job.
3. Load `https://tractionfactory.co/`, `/contact/` and `/articles/` with an uncached/private browser session.
4. Confirm the intended homepage text and article filters render and that `/sitemap.xml` includes new service pages.
5. Check the chosen enquiry path on a real mobile browser. If anything fails, use the existing direct `mailto:hello@tractionfactory.co` link as the fallback while repairing the deployment.

## Phase 1: Formspree live endpoint and delivery test

The site owner supplied the public endpoint `https://formspree.io/f/mgakpnkg` on 23 November 2026. The site is configured with `form_delivery: "formspree"` and renders a native HTTPS POST to this endpoint. The older FormSubmit activation service remains retired.

**Status:** Endpoint configured. End-to-end delivery is NOT yet confirmed. The public direct-email link remains available if the form fails.

After GitHub Pages has successfully deployed:
1. Open `https://tractionfactory.co/contact/?topic=general&source=internal-test`.
2. Enter a real reply-to email, choose "Something else", and submit a clearly labelled message such as **TEST ONLY - Traction Factory contact form**. Do not include credentials or confidential data.
3. Confirm Formspree displays its standard submission-success page. On a free plan, a custom on-site thank-you redirect may not be available.
4. Open the Formspree dashboard for form ID `mgakpnkg`, confirm the test appears and the submitted fields are intact.
5. Confirm the notification email arrives at `hello@tractionfactory.co`, checking spam and the configured notification destination if absent.
6. Check whether the email's Reply-To targets the test sender and the subject includes `[internal-test]`. The hidden `subject` input is populated by `site.js`.
7. Only after dashboard receipt and inbox delivery are both established should the enquiry system be considered verified.

If testing fails: immediately switch `form_delivery` back to `"mailto"` in `_config.yml`, deploy a reviewed fix, and keep direct email available. Investigate Formspree's domain restrictions and form settings.

Formspree submissions collect the entered contact fields and store/process them at Formspree. The public form discloses this; do not claim submissions are website-only or untracked.

**Important:** `enquiry_submit_attempt` is only an attempted POST, not confirmation that Formspree received or delivered it.

Official references:
- `https://help.formspree.io/articles/building-your-form/building-an-html-form`
- `https://help.formspree.io/articles/building-your-form/email-subject-line/`

## Phase 2: Website analytics

**Prepared, but inactive.** The site now supports free **Umami Cloud Hobby**, which includes pageviews and custom events. No analytics script loads until the owner provides their real Umami website ID and the site config is changed from `analytics_provider: "none"` to `"umami"`.

Follow `ANALYTICS_AND_GSC.md` for the provider setup, site ID placement, measurement event meanings and Google Search Console review.

The existing Plausible wiring is retained as an alternative. Do not install both. Avoid counting `enquiry_submit_attempt` as a completed business lead, and never send prospect details in analytics properties.

## Phase 3: Search Console and content

- In Google Search Console verify the domain property, review `/sitemap.xml` status and URL Inspection for the three new service pages.
- For the first month, log landing page impressions, non-branded queries, click-through rate and *real* enquiries. Don't use generated content volume as the KPI.
- Internal links have been added between `/services/`, `/igaming-consultancy/` and the three specialist pages. Continue linking relevant long-form articles to these pages where it genuinely serves the reader.
- Suggested next articles: 'What an iGaming operator launch pipeline should measure', 'How to evaluate a studio promotion without fooling yourself', 'When is an iGaming fractional commercial director worth the cost?' Base financial examples on explicit assumptions, not anonymous invented client results.

## Not yet completed

- Confirming the public GitHub Pages deployment using a fresh browser session
- Confirming Formspree delivery through its dashboard and at hello@tractionfactory.co
- Creating a free Umami Cloud website, obtaining the public website ID and validating real events
- Reading private Google Search Console performance data

These require provider/account access or an externally verified response. Do not mark them completed simply because the code has been merged.
