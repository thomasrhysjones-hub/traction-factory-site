# Publishing articles on tractionfactory.co

The public website is hosted from this repository, with Jekyll handling article pages. No WordPress account or paid publishing system is required.

## Publish a new article

1. Open the GitHub repository and navigate to **_posts**.
2. Select **Add file → Create new file**.
3. Name the file **YYYY-MM-DD-your-article-slug.md** (for example `2026-11-20-choosing-an-igaming-aggregator.md`). Choose a date no later than today unless you intend to schedule publication.
4. Copy the front matter shown below. Replace the title, description, category and date. A 140–160 character description is a useful target, not a hard requirement.
5. Write the article in Markdown, and use **Preview** to check the draft.
6. Select **Commit changes**. If the repository is configured to publish from the main branch, the article will be generated automatically. If using a PR workflow, merge the PR to publish.
7. Check the article at **https://tractionfactory.co/articles/your-article-slug/** and confirm it appears on the main Articles page. The sitemap updates from the same article data.

```yaml
---
title: "Your clear, specific article title"
description: "A concise description that tells readers what they will learn."
category: iGaming Industry
date: 2026-11-20 09:00:00 +0200
---
```

Write the article content below the second `---`. Use `##` for main sections. One article should answer one real commercial question. Link to relevant service pages naturally.

## Draft without publishing

Create the file in **_drafts**, using the name `your-article-slug.md` (without a date), or open a pull request against main. Jekyll does not publish items in `_drafts` by default. Copy into `_posts` only after approval.

## Editing and corrections

Open the Markdown article, select the edit icon and make your change. The page URL stays the same unless you change the filename. Add `last_modified_at: 2026-11-25` in the front matter for a material update to the article.

## Content and SEO checklist

- One specific question or commercial problem per article.
- No unverifiable numbers or anonymous customer case studies portrayed as fact.
- Explain assumptions whenever using indicative financial figures.
- Useful H2 headings, short paragraphs and evidence where applicable.
- Link to one relevant service or consultancy page where appropriate.
- Check the rendered page on mobile and desktop after publication.
- The site automatically creates canonical URLs, share previews and BlogPosting markup.
- New articles appear on /articles/ and the XML sitemap.

## Architecture

- `index.html`: existing homepage, kept deliberately simple.
- `services/index.html`, `igaming-consultancy/index.html`, `about/index.html`: evergreen landing pages.
- `articles/index.html`: dynamic article index.
- `_posts/`: published articles in Markdown.
- `_layouts/default.html`: shared header, footer and metadata.
- `_layouts/post.html`: article template.
- `styles.css`: existing site design plus section and article styles.
- `sitemap.xml`: generated sitemap (do not remove YAML front matter).
- `_config.yml`: Jekyll and permalink settings.

If GitHub Pages is configured to use a custom build process or has Jekyll processing disabled, verify that its build includes the Jekyll step before publishing any Markdown articles.
