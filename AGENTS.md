# Project Instructions

## Rules

1. **Minimize changes.** Prefer 5 lines over 50.
2. **Reuse first.** Check existing libraries, code, and prior plans before
introducing anything new. New libraries must be open-source, free, popular, and
maintained.
3. **No redundancy.** Prompt info should not duplicate plan info; code logic
should not be restated in comments.
4. **NO GIT.** NEVER use git. Ask the user if repository state is needed.
5. **Batch tool calls.** All independent read/search calls in ONE turn -
results analyzed in ONE LLM pass. No read→think→read→think ping-pong. If more
than one tool call is needed and they don't depend on each other's output, fire
them in parallel in a single message. Single-tool turns are only valid when the
next call genuinely depends on the prior result (state this dependency in your
thinking). Include `docusaurus.config.ts` context for workspace-wide queries.
6. **Environment.** Node.js >= 26 required; path aliases via `package.json`
"imports".

## Conventions

1. **Architecture.** Main components are feature-isolated under
`src/components/<component_name>/`. Shared logic lives strictly in
`src/components/common/`.
2. **UI & Lint.** Use `clsx` and `a11y` imports exclusively from
`src/data/common.ts`. Enforce React PropTypes for all components.
3. **Exports.** Use named exports for utility helpers; default exports for UI
components.
4. **Styling.** Sort alphabetically where applicable (methods, properties,
array items, object attributes, parameters). Occasional out-of-order exceptions
are acceptable but rare.
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

## Page & SEO Conventions

1. **Pages.** `src/pages/<page_name>/index.tsx` (or `.mdx`); co-locate
page-specific components in the same folder; reuse `src/components/common/` for
cross-page UI.
2. **Data wiring.** Page data in `src/data/` (grep there first before creating
new files); binary assets in `static/`.
3. **SEO/GEO surfaces.** Prerender/metadata via `docusaurus.config.ts`
(`themeConfig.metadata`, `headTags`); per-page `<Head>` from `@theme Head`;
sitemap via `src/plugins/sitemap/`; advanced media via `src/plugins/media/`
(font fallback, PDFs, M4A audio).
4. **Feedback loop.** `npm start` (hot reload) while editing pages;
`npm run build` validates static rendering/SEO before commit.

## Output Discipline

1. **Output cap.** Responses ≤ 150 words by default; ask user before expanding.
Tables only when comparing ≥3 alternatives.
2. **No restatement.** Do not echo user answers or re-summarize completed
edits; the diff is the record.
3. **No preamble.** Use tool calls directly; skip "Let me check…" hedges.
4. **Plan-loop discipline.** Plan once → questions → approve → execute. Do not
re-state the plan after each answer.

---

All code © Richard Huang.
