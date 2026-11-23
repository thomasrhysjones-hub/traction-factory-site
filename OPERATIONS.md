# Traction Factory: launch and conversion operations

## Status and deployment verification

This repository publishes the site through GitHub Actions from `main` using `.github/workflows/publish-site.yml`. Merging a PR is not itself proof that a GitHub Pages deployment succeeded.

After every merge:
1. Open `https://github.com/thomasrhysjones-hub/traction-factory-site/actions`.
2. Inspect the most recent **Publish Traction Factory to GitHub Pages** run for that commit. Require a green build **and** deploy job.
3. Load `https://tractionfactory.co/`, `/contact/` and `/articles/` with an uncached/private browser session.
4. Confirm the intended homepage text and article filters render and that `/sitemap.xml` includes new service pages.
5. Check the chosen enquiry path on a real mobile browser. If anything fails, use the existing direct `mailto:hello@tractionfactory.co` link as the fallback while repairing the deployment.

## Phase 1: Verified form delivery (Formspree)

The original FormSubmit setup is retired due to reported activation failures. `/contact/activate/` no longer submits to FormSubmit.

The public contact form **continues to prepare an email draft** while `form_delivery: "mailto"` in `_config.yml`. No third-party visitor data submission is enabled by default.

Formspree is the prepared replacement and needs an actual form endpoint, generated in the business owner's account. Never invent or commit a placeholder as a working endpoint.

1. Visit `https://formspree.io/` and register for a Free account, using the company mailbox if preferred.
2. Create a form called **Traction Factory enquiries** in the Formspree dashboard.
3. In its settings, set the notification destination to `hello@tractionfactory.co`. Verify any email or account ownership prompts requested by Formspree.
4. Copy the actual HTTPS form endpoint from the **Integration** tab. It has a structure similar to `https://formspree.io/f/xxxxxxxx`. Do not send an API secret; this endpoint is meant to appear in public HTML.
5. Put that URL into `formspree_endpoint` in `_config.yml` and change `form_delivery` from `"mailto"` to `"formspree"`. The site template has two independent guards: the delivery value and a nonempty endpoint.
6. Deploy a small reviewed change, then submit a clearly labelled internal test from `/contact/`. Confirm the submission is visible in the Formspree dashboard **and** its notification arrives in `hello@tractionfactory.co`.
7. Verify topic/source tagging, reply-to email, form spam settings, and the built-in Formspree thank-you page. The free plan does not include a custom thank-you redirect.
8. Only after both dashboard and mailbox checks pass should the rollout be considered complete.

The fallback direct email link must remain available if the external form service has issues.

Formspree offers a free tier with a monthly submission cap, 30-day submission history and basic spam protection. Review actual limits, privacy rules and data handling before enabling the integration.

**Important:** `enquiry_submit_attempt` means a browser attempted a POST, not that Formspree delivered it. Only a confirmed submission or received message counts as a lead.

Official references:
- `https://help.formspree.io/articles/building-your-form/building-an-html-form`
- `https://help.formspree.io/articles/account-management/account-limits`
- `https://help.formspree.io/articles/building-your-form/email-subject-line/`

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
- Creating and testing a Formspree form and confirming receipt in hello@tractionfactory.co
- Registering or connecting a Plausible account and validating real events
- Reading private Google Search Console performance data

These require provider/account access or an externally verified response. Do not mark them completed simply because the code has been merged.
