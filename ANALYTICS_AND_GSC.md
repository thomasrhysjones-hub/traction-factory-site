# Traction Factory: website analytics and Google Search Console

## Current status, 23 November 2026

- **Formspree** is already configured for visitor enquiries in `_config.yml`. Keep it intact.
- **Google Search Console:** A property has previously been used by the owner, but its current Search performance or URL indexing data has NOT been read or verified here. No Search Console credentials are stored in this repository.
- **Website analytics:** The owner provided Umami Website ID `27ea7107-ec4b-43ff-b38d-032f3d5aaad9`. The site is configured to load Umami on the production domain. **Real data collection is subject to a successful GitHub Pages deployment and a dashboard check.**
- **Plausible** is available as an alternative, but its cloud subscription is not needed to start measuring this site.

## 1. Verify active Umami Cloud tracking

Umami Cloud's Hobby tier is free for one website, with 100,000 included events per month and six months' retention at the time of setup. A pageview, custom event and each stored event property contribute to usage. Check the provider's current terms before signing up.

The site owner has already supplied the Umami website ID and the GitHub configuration has been updated. Do not create another Umami website.

1. Confirm the most recent **Publish Traction Factory to GitHub Pages** workflow finished successfully for the merge commit.
2. Open `https://tractionfactory.co/` in a private browser window with tracking protection/extensions disabled for this verification.
3. View source and find `https://cloud.umami.is/script.js` with `data-website-id="27ea7107-ec4b-43ff-b38d-032f3d5aaad9"`. The tracker has a production-only `data-domains` guard.
4. Visit `/services/` and `/contact/`, then open the Umami Cloud dashboard and confirm that these pageviews appear.
5. Click an instrumented **Talk to us** CTA, then check Umami's Events section for a `contact_intent` event. Do not submit a fake business lead just to test event tracking.
6. If data doesn't arrive, check that the site actually deployed, the script loaded, Umami's site domain is correct, and browser privacy tools didn't block requests.

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
