
# Copilot Quick Reference: rickypc.github.io

## Structure
- Main: `src/components/`, `src/data/`, `src/plugins/`
- Static: `static/`, `build/`
- Custom plugin: `src/plugins/docusaurus-plugin-kit/`

## Commands
- Build: `yarn build` / `npm run build`
- Dev: `yarn start` / `npm run start`
- Lint: `yarn lint` / `npm run lint`
- E2E: `npx playwright test` / `yarn playwright test` (see `playwright.config.js`)
- Unit: `tests/unit/` (Jest + React Testing Library)
- PDF: `yarn kit:pdf` (custom plugin)

## Patterns
- Components by feature: `src/components/feature/`
- Shared: `src/components/common/`
- CSS modules: `src/css/custom.css`
- a11y: `a11y` from `src/data/common.ts`
- Class names: `clsx` from `src/data/common.ts`
- PropTypes for all React components
- Named exports for utils, default for components
- Playwright helpers: `tests/e2e/utils/helper.js`

## Data & Integration
- Static data: `src/data/`
- Routing: Docusaurus, see `docusaurus.config.js`
- PDF: custom plugin, see `src/plugins/docusaurus-plugin-kit/`

## Dependencies
- Core: Docusaurus, React, framer-motion, embla-carousel-react, pdfmake, simple-git
- Test: Playwright, React Testing Library
- Lint: ESLint (AirBnB, React, Docusaurus)

## Examples
- Component: `src/components/common/Button/index.tsx`
- Unit test: `tests/unit/common/Button.test.tsx`
- Plugin: `src/plugins/docusaurus-plugin-kit/index.ts`
- E2E Test helper: `tests/e2e/utils/helper.js`

## Notes
- Node.js >= 24 required
- Path aliases: see `package.json` "imports"
- All code © Richard Huang
