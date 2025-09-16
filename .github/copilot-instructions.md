
# Copilot Quick Reference: rickypc.github.io

## Structure
- Main: `src/components/`, `src/data/`, `src/plugins/`
- Static: `static/`, `build/`
- Custom plugin: `src/plugins/docusaurus-plugin-local/`

## Commands
- Build: `yarn build` / `npm run build`
- Dev: `yarn start` / `npm run start`
- Lint: `yarn lint` / `npm run lint`
- E2E: `npx playwright test` / `yarn playwright test` (see `playwright.config.js`)
- Unit: `tests/unit/` (Jest + React Testing Library)
- PDF: `yarn local:pdf` (custom plugin)

## Patterns
- Components by feature: `src/components/feature/`
- Shared: `src/components/common/`
- CSS modules: `src/css/custom.css`
- a11y: `a11y` from `src/data/common.js`
- Class names: `clsx` from `src/data/common.js`
- PropTypes for all React components
- Named exports for utils, default for components
- Playwright helpers: `tests/utils/helper.js`

## Data & Integration
- Static data: `src/data/`
- Routing: Docusaurus, see `docusaurus.config.js`
- PDF: custom plugin, see `src/plugins/docusaurus-plugin-local/`

## Dependencies
- Core: Docusaurus, React, framer-motion, embla-carousel-react, pdfmake, simple-git
- Test: Playwright, React Testing Library
- Lint: ESLint (AirBnB, React, Docusaurus)

## Examples
- Component: `src/components/common/Button/index.jsx`
- Unit test: `tests/unit/common/Button/index.test.js`
- Plugin: `src/plugins/docusaurus-plugin-local/index.js`
- Test helper: `tests/utils/helper.js`

## Notes
- Node.js >= 22 required
- Path aliases: see `package.json` "imports"
- All code © Richard Huang
