# Traction Factory: enquiry attribution and analytics

## What is active now

- Contextual site buttons lead to `/contact/?topic=...&source=...`.
- The contact page suggests a suitable enquiry subject and prepares a draft in the visitor's own email application.
- When the visitor sends that email, its subject includes the entry source (for example `[home-hero]` or `[igaming-page]`). This is **manual, inbox-based attribution**, not a conversion analytics system.
- The visitor's form text is not sent to, or stored by, the website. Without JavaScript, the form falls back to a `mailto:` action.
- No tracking cookies, external analytics scripts, or background data collection are enabled in this release.

## Optional provider hooks (not yet active)

`/site.js` emits events only if a separately installed `window.plausible` **or** `window.gtag` analytics provider is present. If neither is configured, it sends nothing.

Supported event names:

| Event | Meaning | Properties |
| --- | --- | --- |
| `contact_intent` | Visitor selects a contact CTA | source |
| `email_click` | Visitor selects direct email link | source |
| `linkedin_click` | Visitor selects LinkedIn contact | source |
| `enquiry_compose` | Visitor prepares an email in the visitor's own email app | source, topic |
| `enquiry_submit_attempt` | Visitor attempts third-party form submission (only when verified form delivery is later activated) | source, topic |
| `article_filter` | Visitor chooses an article topic | source, topic |
| `article_share` | Visitor selects a share link | source |
| `internal_navigation` | Visitor clicks selected proof-to-about link | source |

Events include no names, company names, email addresses or free-text enquiry content. A composed email is **not** a sent enquiry. A `enquiry_submit_attempt` is only an attempted submission, not confirmed delivery. Do not report either as confirmed leads.

To enable analytics, follow `OPERATIONS.md` and the `_includes/analytics.html` switch. The include is already used by both `index.html` and `_layouts/default.html`, so do not paste the same tracking code into both templates separately. Test a visit and a contact click in the provider dashboard before claiming collection is live.

## Practical review

1. Check Google Search Console separately for impressions, clicks and indexed URLs.
2. Review inbound emails, grouping their subject tags by source and by business topic.
3. If analytics is installed, track contact-intent clicks against confirmed inbound enquiries, not simply visits.
4. Review the ratio of commercially useful leads to all enquiries. Traffic alone is not the success metric.

## Test paths

- `/contact/?topic=studio&source=igaming-page` should preselect studio distribution.
- `/contact/?topic=ai&source=ai-page` should preselect AI in iGaming.
- `/articles/` should show all topics before filtering, and a count after JavaScript initializes.
- A contact form submission should **open the visitor's email composer**, not show a false “message sent” confirmation.

## Activation dependencies

FormSubmit preparation and Plausible script wiring are controlled by `_config.yml` and default to OFF. See `OPERATIONS.md` for the activation procedure, verification checklist and what must not be reported as a converted lead.
