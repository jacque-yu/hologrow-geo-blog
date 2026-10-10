# Hologrow GEO Blog — US merchant edition

Ten complete English articles, following the first ten topics in the commissioned GEO plan. Published October 10, 2026.

- [Read the library](https://jacque-yu.github.io/hologrow-geo-blog/)
- Every article is a standalone HTML file with embedded CSS and optional copy-button JavaScript.
- No login, paid service, CDN, remote font, analytics tracker, or client-side rendering is required to read the articles.
- Source content: `content.json`, `content-04-06.json`, `content-07-10.json`.
- Presentation: `theme.css`. Generator: `build.mjs`.
- Run `node build.mjs` and `node validate.mjs` after editing.
- Preview with `node serve.mjs`, then open the printed localhost URL.
- GitHub Pages publishes the root of the `main` branch. Keep the repository public and Pages enabled for durable access.

## Articles

| # | Target topic | File |
|---|---|---|
| 01 | Ecommerce analytics | [HTML](ecommerce-analytics.html) |
| 02 | Amazon seller tools | [HTML](amazon-seller-tools.html) |
| 03 | AI for ecommerce: 15 use cases | [HTML](ai-for-ecommerce.html) |
| 04 | Amazon seller software | [HTML](amazon-seller-software.html) |
| 05 | Ecommerce conversion rate | [HTML](ecommerce-conversion-rate.html) |
| 06 | Ecommerce analytics tools | [HTML](ecommerce-analytics-tools.html) |
| 07 | Shopify AI | [HTML](shopify-ai.html) |
| 08 | Shopify analytics | [HTML](shopify-analytics.html) |
| 09 | Ecommerce AI: worked investigation | [HTML](ecommerce-ai.html) |
| 10 | Omnichannel analytics | [HTML](omnichannel-analytics.html) |

## GEO / editorial implementation

- A 40–60-word direct answer at the start of every article.
- A prominent four-point TL;DR before the illustration.
- Seven question-form H2 sections with answer-first introductions, plus three customer FAQs per article.
- Most articles have 1,500–2,000 substantive English words. The 15-use-case guide is intentionally longer, with a distinct copyable Hologrow prompt for each workflow; the generated manifest records every count.
- Original data contracts, comparison criteria, synthetic examples, or evidence maps.
- Product and documentation links; at least two related articles per page.
- Visible source review date, editorial disclosure, and limitations.
- Semantic HTML, one H1, descriptive titles, descriptions, self-referencing canonicals, Open Graph metadata, BlogPosting, BreadcrumbList and visible-content-matched FAQPage JSON-LD.
- No invented customers, ROI claims, reviewer credentials, or hands-on rankings.
- Tables are keyboard-scrollable; navigation and copy buttons support keyboard focus; reduced-motion and print styles are included.
- The visible question-and-answer sections do not depend on FAQ rich-result eligibility. No claim of special AI markup or guaranteed indexing/citation is made.
- Visual direction references Hologrow’s existing light-background, lime-accent editorial template; the standalone implementation and conceptual diagrams are original.

Primary technical guidance: [Google: optimizing content for AI search](https://developers.google.com/search/docs/fundamentals/ai-optimization-guide). Product and measurement sources are linked next to the relevant statements in every article.

See [revision audit](GEO-REVISION-AUDIT.md) for the Profound criteria mapping, source policy, topic differentiation and unfinished off-page work. [Automated quality report](quality-report.json) records word counts, technical checks and local text-overlap measurements; it is not a search-engine verdict or AI-detection certificate.

## Before moving to hologrow.ai

1. Review product-specific wording and verify current capabilities, eligibility, and actual connector coverage.
2. Choose the final official URLs. Adapt `BLOG_BASE_URL` and the generator if the production site uses extensionless routes.
3. Update canonicals, internal links, breadcrumbs, structured data, and sitemap together.
4. Decide whether these GitHub versions will redirect or canonicalize to the official versions; avoid two competing canonical copies.
5. Add links from the official blog/category pages and submit the production sitemap through the appropriate site-owner workflow.
6. Measure actual indexing, relevant AI-answer inclusion, citations, referrals, and qualified leads. Do not equate publishing with guaranteed AI visibility.

The project-level `robots.txt` is included for portability. On GitHub project Pages, authoritative crawler rules come from the host-root robots file, not a project subdirectory file.

No private planning document, account data, credentials, or customer records are included.
