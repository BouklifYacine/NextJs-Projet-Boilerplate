---
description: Performance & SEO Guidelines
globs: "src/routes/**/*.tsx", "src/components/**/*.tsx"
---

# Performance & SEO

**ALWAYS start by using the `sequential-thinking` MCP server to analyze the request. User "sequential-thinking" first.**

## 1. SEO (Search Engine Optimization)

- **Meta Tags**: Use TanStack Router's `meta` export in routes to define Title, Description, and OpenGraph tags.
- **Semantic HTML**: Use `<main>`, `<article>`, `<nav>` appropriately.
- **Sitemap**: Ensure `sitemap.xml` is generated for public pages.

## 2. Core Web Vitals

- **LCP (Largest Contentful Paint)**: Optimize hero images.
  - Use `@unpic/react` for optimized images with correct sizing/priority.
- **CLS (Cumulative Layout Shift)**: Define dimensions for all media (images/videos). Avoid dynamic insertions that push content down without skeletons.

## 3. Code Splitting & Performance

- **Lazy Loading**: TanStack Router handles code splitting for routes automatically.
- **Components**: Lazy load heavy components (Charts, Maps) using `React.lazy`.
- **Memoization**: Use `useMemo` for expensive calculations (filtering large arrays), but don't over-optimize primitive values.
