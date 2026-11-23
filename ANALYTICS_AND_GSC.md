# Traction Factory: website analytics and Google Search Console

## Current status, 23 November 2026

- **Formspree** is already configured for visitor enquiries in `_config.yml`. Keep it intact.
- **Google Search Console:** A property has previously been used by the owner, but its current Search performance or URL indexing data has NOT been read or verified here. No Search Console credentials are stored in this repository.
- **Website analytics:** Umami Cloud integration is prepared, but `analytics_provider: "none"` means **no tracker is active** until the owner creates a site and supplies a website ID.
- **Plausible** is available as an alternative, but its cloud subscription is not needed to start measuring this site.

## 1. Activate free Umami Cloud (one-time)

Umami Cloud's Hobby tier is free for one website, with 100,000 included events per month and six months' retention at the time of setup. A pageview, custom event and each stored event property contribute to usage. Check the provider's current terms before signing up.

1. Open `https://cloud.umami.is/signup` and create an account. Select the **EU** data region if preferred for European audience data; the region applies to analytics storage and is not a complete guarantee that every subprocessor runs in the EU.
2. Select the free **Hobby** plan, not a paid trial.
3. Add a website with the hostname `tractionfactory.co`. Do not enter `https://` or a trailing path unless the UI explicitly asks for a full URL.
4. Open the site's edit / Tracking code area, and copy its `data-website-id` value (a UUID). This is a **public website identifier**, not an account API key or password.
5. In `_config.yml`, set `analytics_provider: "umami"` and set `umami_website_id` to the actual value. The site-wide `_includes/analytics.html` already loads Umami's current Cloud script in both the homepage and Jekyll layout. It uses `data-domains="tractionfactory.co,www.tractionfactory.co"` to keep staging-preview visits out of the production stats.
6. Deploy the two settings together, then open an incognito browser and visit two pages on the production site. Confirm the dashboard registers visits and pageviews. Use your browser's Network panel to troubleshoot a blocked or missing script if required.
7. Optionally exclude your own visits using Umami's documented visitor exclusion options. Do not add visitor names or other identifiable data to events.

### Existing event hooks

The site's `/site.js` already emits these events without visitor-entered names, emails, free-text messages or company information:

| Event | Interpretation | Additional properties |
| --- | --- | --- |
| `contact_intent` | Someone clicked a link towards Contact | source |
| `enquiry_submit_attempt` | Browser attempted a Formspree POST | source, topic |
| `email_click` | Visitor selected an email link | source |
| `linkedin_click` | Visitor selected LinkedIn contact | source |
| `article_share` | Visitor clicked LinkedIn article share | source |
| `article_filter` | Visitor used an article-category filter | source, topic |
| `internal_navigation` | Visitor clicked an instrumented internal link | source |

**An attempted submission is not a lead.** Confirm real enquiries in the Formspree dashboard and receiving Gmail inbox. Do not claim that Umami measured form completion until a verified post-submission confirmation is instrumented. Umami can be used for visitor-to-contact-intent rate but not reliable lead-conversion rate from the current event alone.

Keep visitor privacy and the site's published notices under review whenever external analytics are enabled.

Useful documentation:
- `https://docs.umami.is/docs/cloud/sign-up`
- `https://docs.umami.is/docs/collect-data`
- `https://docs.umami.is/docs/tracker-functions`
- `https://docs.umami.is/docs/cloud/faq`

## 2. Google Search Console review

Search Console and browser analytics answer **different questions**. Search Console reports Google Search visibility; Umami reports on-site visits and interactions.

1. Open `https://search.google.com/search-console` and choose the existing `tractionfactory.co` property. Don't add a duplicate unless the original property is inaccessible. If the property isn't verified, use Google's ownership verification process.
2. Under **Sitemaps**, confirm `https://tractionfactory.co/sitemap.xml` is submitted and shows a successful retrieval. If not, submit the sitemap's URL. The site's `robots.txt` points to it.
3. Under **Pages / Indexing**, review reasons for excluded URLs, especially `Crawled - currently not indexed`, `Discovered - currently not indexed`, canonical duplicates, 404s and redirects. Not every excluded URL is a problem.
4. Inspect these recently added landing pages separately using URL Inspection:
   - `https://tractionfactory.co/slot-studio-distribution/`
   - `https://tractionfactory.co/igaming-account-growth/`
   - `https://tractionfactory.co/fractional-commercial-leadership/`
   - `https://tractionfactory.co/ai-in-igaming/`
5. If an important URL is not indexed and the live test is successful, request indexing once. Repeated requests do not force Google to rank or index a page.
6. Under **Performance → Search results**, select **Last 28 days** and compare with the previous 28 days. Export the report with both **Queries** and **Pages** tabs (CSV or Google Sheets). If the data is sparse, expand to **3 months**. Don't interpret very small samples as trends.
7. Review the exported figures alongside Umami after it is connected. Search Console click counts and analytics sessions will not match exactly due to different measurement methods and filters.

Official references:
- `https://support.google.com/webmasters/answer/7451001`
- `https://support.google.com/webmasters/answer/9012289`
- `https://developers.google.com/search/docs/monitor-debug/search-console-start`

## 3. Monthly commercial scorecard

| Area | Metric | Source | What it answers |
| --- | --- | --- | --- |
| Discovery | Non-branded impressions, clicks, CTR, average position | Search Console | Are target searches starting to find us? |
| Landing pages | Organic clicks by landing page | Search Console | Which service/content pages have search demand? |
| Traffic | Visitors, visits, referral sources, top pages | Umami | Who arrived, where from, and what did they read? |
| Intent | Contact CTA clicks and enquiry-submit attempts | Umami | Are visitors considering a conversation? |
| Qualified leads | Actual delivered enquiries, business relevance | Formspree + inbox | Is the site contributing commercially useful opportunities? |

**Primary objective:** Relevant enquiries and qualified commercial conversations. Pageviews alone aren't success.

Keep a dated note when publishing a new article or page, and use descriptive `utm_source`, `utm_medium` and `utm_campaign` parameters in future LinkedIn links, e.g. `?utm_source=linkedin&utm_medium=social&utm_campaign=studio-distribution` (no personal data in URL parameters).
