# Project Instructions

## Rules

1. **Environment.** Node.js >= 26 required; path aliases via `package.json`
"imports". Include `docusaurus.config.ts` context for workspace-wide queries.

## Conventions

1. **Architecture.** Main components are feature-isolated under
`src/components/<component_name>/`. Shared logic lives strictly in
`src/components/common/`.
2. **UI & Lint.** Use `clsx` and `a11y` imports exclusively from
`src/data/common.ts`. Type component props with TypeScript.
3. **Exports & order.** Use named exports for utility helpers; default
exports for UI components. Sort exported names alphabetically across the
whole file. Do NOT create implicit "topic-grouped" sections; the
alphabetical order itself groups naturally (e.g., `faq` falls between
`experiences` and `header` without manual grouping).
4. **Sort & import order.** Sort alphabetically where applicable (methods,
properties, array items, object attributes, parameters). Occasional
out-of-order exceptions are acceptable but rare. Within an import line's
braces, sort identifiers alphabetically, ignoring the `type` keyword
(`type GeoEntry` sorts as `GeoEntry`, so `{ type GeoEntry, oneLine }` is
correct: GeoEntry < oneLine). Across import lines, sort by the first identifier
in each line's braces (also ignoring `type`). Example:
`{ type GeoEntry, oneLine }` precedes `{ type IntroProps }` precedes
`{ type LayoutProps }` (GeoEntry < IntroProps < LayoutProps). The type
section - between imports and code, whether `export type` or local type
assignments - sorts as one group interleaved by name (export status does not
split the order). The code section below follows its own sort order.
5. **Media plugin.** `src/plugins/media/` produces three artifacts:
font-fallback (from font metrics), PDFs (via `pdfmake`), and M4A audio. Respect
its constraints when modifying any of these outputs.
6. **Commands.** `npm run build` / `start` / `test:lint` / `test:e2e` /
`test:unit` (Jest + RTL) / `build:media` (media plugin: fonts + PDFs + audio).
7. **Test & config.** Playwright config: `playwright.config.ts`; e2e helpers:
`tests/e2e/utils/helper.ts`; routing via `docusaurus.config.ts`; CSS module:
`src/css/custom.css`.
8. **Dependencies.** Docusaurus, React, motion/react, pdfmake, simple-git;
ESLint (AirBnB, React, Docusaurus).
9. **Naming.** Identifiers should be clear, short (no abbreviations), and
sweet. Don't overthink - if a name already fits (e.g., `faqContext`), keep
it. Conveying the idea clearly in short and sweet form is the bar.

## Page & SEO/GEO Conventions

1. **Pages.** `src/pages/<page_name>/index.tsx` (or `.mdx`); co-locate
page-specific components in the same folder; reuse `src/components/common/` for
cross-page UI.
2. **Data wiring.** Page data in `src/data/` (grep there first before creating
new files); binary assets in `static/`.
3. **SEO/GEO surfaces.** Prerender/metadata via `docusaurus.config.ts`
(`themeConfig.metadata`, `headTags`); per-page `<Head>` from `@theme Head`;
sitemap via `src/plugins/sitemap/`; advanced media via `src/plugins/media/`
(font fallback, PDFs, M4A audio). Per-page GEO via the `GeoEntry`,
`GeoSchema` types and `faqContext`/`faqEntries` helpers from
`src/data/common.ts` (emit FAQ schema in the page or via co-located TS).
4. **Feedback loop.** `npm start` (hot reload) while editing pages;
`npm run build` validates static rendering/SEO before commit.

## Docs Conventions

1. **Layout.** Content under `docs/<topic>/`; each topic dir carries a
`_category_.yml` (label, position, `link.type: generated-index`,
`collapsed`). Subcategories nest the same pattern.
2. **Pages & helpers.** `.mdx` content files; co-locate page-specific
helpers/components with an `_` prefix to exclude them from the sidebar.
3. **Assets.** Binary media under `docs/<topic>/img/` (prefer `.webp`);
PDFs and M4A audio under `docs/<topic>/media/{audio,pdf}/`, produced by
`src/plugins/media/`.
4. **Routing & search.** `docs` route served by preset-classic;
docusaurus-search-local indexes `docs` under the "Notes" search context
(see `docusaurus.config.ts` `searchContextByPaths`).

---

All code © Richard Huang.
