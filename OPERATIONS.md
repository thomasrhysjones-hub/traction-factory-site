# Traction Factory: launch and conversion operations

## Status and deployment verification

This repository publishes the site through GitHub Actions from `main` using `.github/workflows/publish-site.yml`. Merging a PR is not itself proof that a GitHub Pages deployment succeeded.

After every merge:
1. Open `https://github.com/thomasrhysjones-hub/traction-factory-site/actions`.
2. Inspect the most recent **Publish Traction Factory to GitHub Pages** run for that commit. Require a green build **and** deploy job.
3. Load `https://tractionfactory.co/`, `/contact/` and `/articles/` with an uncached/private browser session.
4. Confirm the intended homepage text and article filters render and that `/sitemap.xml` includes new service pages.
5. Check the chosen enquiry path on a real mobile browser. If anything fails, use the existing direct `mailto:hello@tractionfactory.co` link as the fallback while repairing the deployment.

## Phase 1: Verified form delivery (FormSubmit)

The live site retains the visitor's email-composer workflow until FormSubmit has been activated and tested.

This PR prepares a separate form in `contact/index.html`, but **`_config.yml` defaults to `form_delivery: "mailto"`**. No prospect details go to FormSubmit while this setting remains unchanged.

1. Once this release is deployed, open `https://tractionfactory.co/contact/activate/` yourself.
2. Submit the one-time setup test. It contains only a company setup message, not client information.
3. FormSubmit will email an activation link to `hello@tractionfactory.co`. Open that mailbox and click the verification link.
4. Submit the same setup test again and confirm the test message arrives. Check spam too. Do **not** enable the public form until delivery is proven.
5. Only then change `form_delivery: "mailto"` to `form_delivery: "formsubmit"` in `_config.yml` and deploy via a reviewed commit.
6. Test the real contact page with a clearly labelled internal test, confirm it reaches the mailbox and that `/contact/thanks/` appears only after the provider's redirect.

The active form uses a native HTTPS POST, visitor name/email, subject and source labels, a honeypot and FormSubmit's default reCAPTCHA. It deliberately **does not** use an AJAX 'success' that might appear before delivery is confirmed.

**Privacy:** Visitors are told that FormSubmit processes messages for delivery. Evaluate the provider's privacy terms, data retention and suitability for the consultancy before switching it on. Avoid collecting sensitive personal or confidential information in an unencrypted business enquiry form. The direct email option remains available.

**Important:** `enquiry_submit_attempt` is **not** proof of delivery. Only a received message or a tested server confirmation counts as an actual enquiry.

Provider documents: `https://formsubmit.co/documentation`, `https://formsubmit.co/help`.

## Phase 2: Website analytics

The site includes measurement event hooks, but **does not load any analytics script** while `analytics_provider: "none"`. No visitor tracking is implied.

To connect Plausible:
1. Create a site for `tractionfactory.co` in your Plausible account and review its privacy and billing details.
2. Copy the **current script URL from the account's official installation snippet**. Don't guess an old URL.
3. Put that URL in `plausible_script_src` in `_config.yml` and set `analytics_provider: "plausible"`.
4. Review `_includes/analytics.html` against the exact site-specific snippet from the Plausible dashboard, since setup formats change.
5. Deploy via GitHub after review; then verify the script loads and pageviews appear in Plausible's dashboard.
6. Configure custom event goals relevant to enquiries, particularly `contact_intent`, `enquiry_submit_attempt`, `enquiry_compose`, `email_click`. Do not count attempted submissions as verified leads.

The current `site.js` only sends event hooks if the provider is installed. Never include names, message bodies, email addresses or company names in event properties.

Plausible setup: `https://plausible.io/docs/plausible-script`. A separate Plausible account may involve a paid subscription after any trial; no subscription is initiated by this repository.

## Phase 3: Search Console and content

- In Google Search Console verify the domain property, review `/sitemap.xml` status and URL Inspection for the three new service pages.
- For the first month, log landing page impressions, non-branded queries, click-through rate and *real* enquiries. Don't use generated content volume as the KPI.
- Internal links have been added between `/services/`, `/igaming-consultancy/` and the three specialist pages. Continue linking relevant long-form articles to these pages where it genuinely serves the reader.
- Suggested next articles: 'What an iGaming operator launch pipeline should measure', 'How to evaluate a studio promotion without fooling yourself', 'When is an iGaming fractional commercial director worth the cost?' Base financial examples on explicit assumptions, not anonymous invented client results.

## Not yet completed

- Confirming the public GitHub Pages deployment using a fresh browser session
- Activating and testing the FormSubmit recipient mailbox
- Registering or connecting a Plausible account and validating real events
- Reading private Google Search Console performance data

These require provider/account access or an externally verified response. Do not mark them completed simply because the code has been merged.
