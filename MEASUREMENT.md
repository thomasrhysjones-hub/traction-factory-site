# Traction Factory: enquiry attribution and analytics

## What is active now

- Site CTAs lead to `/contact/?topic=...&source=...`.
- The contact form uses the site-owner-provided Formspree endpoint `https://formspree.io/f/mgakpnkg` to receive native HTTPS POST submissions.
- Formspree processes and stores submitted contact details and message content. The site includes an explicit disclosure and a direct email alternative.
- A submitted form carries a subject with the entry source (for example `[home-hero]` or `[igaming-page]`) when JavaScript is enabled.
- **Delivery remains unverified** until a test submission is confirmed in both Formspree and the receiving mailbox.
- Analytics tracking remains disabled (`analytics_provider: "none"`); source tagging is not the same as analytics attribution.

## Optional provider hooks (not yet active)

`/site.js` emits events only if a separately installed `window.umami`, `window.plausible`, or `window.gtag` analytics provider is present. Umami is the preferred free option. If no provider is configured, it sends nothing.

Supported event names:

| Event | Meaning | Properties |
| --- | --- | --- |
| `contact_intent` | Visitor selects a contact CTA | source |
| `email_click` | Visitor selects direct email link | source |
| `linkedin_click` | Visitor selects LinkedIn contact | source |
| `enquiry_compose` | Visitor prepares an email in the visitor's own email app | source, topic |
| `enquiry_submit_attempt` | Visitor attempts Formspree form submission. Not proof of receipt | source, topic |
| `article_filter` | Visitor chooses an article topic | source, topic |
| `article_share` | Visitor selects a share link | source |
| `internal_navigation` | Visitor clicks selected proof-to-about link | source |

Events include no names, company names, email addresses or free-text enquiry content. A composed email is **not** a sent enquiry. An `enquiry_submit_attempt` is only an attempted submission, not confirmed delivery. Do not report either as confirmed leads.

To enable analytics, follow `ANALYTICS_AND_GSC.md` and the `_includes/analytics.html` switch. The include is already used by both `index.html` and `_layouts/default.html`, so do not paste the same tracking code into both templates separately. Test a visit and a contact click in the provider dashboard before claiming collection is live.

## Practical review

1. Check Google Search Console separately for impressions, clicks and indexed URLs.
2. Review inbound emails, grouping their subject tags by source and by business topic.
3. If analytics is installed, track contact-intent clicks against confirmed inbound enquiries, not simply visits.
4. Review the ratio of commercially useful leads to all enquiries. Traffic alone is not the success metric.

## Test paths

- `/contact/?topic=studio&source=igaming-page` should preselect studio distribution.
- `/contact/?topic=ai&source=ai-page` should preselect AI in iGaming.
- `/articles/` should show all topics before filtering, and a count after JavaScript initializes.
- A contact form submission should POST to Formspree, then show the provider's response; confirm the test is in the Formspree dashboard and mailbox. Do not treat an attempt as success.

## Activation dependencies

Formspree form delivery is ON using the site-owner endpoint. Umami and Plausible analytics remain OFF. See `OPERATIONS.md` for the delivery test and what must not be reported as a converted lead.
