# Contributing

This repository is a static bilingual educational frontend. Keep all contributor guidance aligned with code and docs already in this repo.

1. **Scope and accuracy boundaries:** Keep new explanations consistent with `/home/runner/work/little-ai/little-ai/README.md` ("Accuracy boundaries") and current teaching code in `/home/runner/work/little-ai/little-ai/src`; do not document live model/backend/web-search/image-generation calls that are not implemented.
2. **Node/npm setup:** Match CI and Pages workflow by using Node 24 (`actions/setup-node` in `/home/runner/work/little-ai/little-ai/.github/workflows/pages.yml`) and install dependencies with `npm ci`.
3. **Local commands:** Use the repo scripts documented in `/home/runner/work/little-ai/little-ai/package.json` and README: `npm run dev -- --port 4173`, `npm test`, `npm run build`, and `npm run preview`.
4. **Source map:** The app bootstraps in `/home/runner/work/little-ai/little-ai/src/main.tsx`, routes in `/home/runner/work/little-ai/little-ai/src/App.tsx`, page shells in `/home/runner/work/little-ai/little-ai/src/Pages.tsx`, lesson flow in `/home/runner/work/little-ai/little-ai/src/Lesson.tsx`, and chapter visuals in `/home/runner/work/little-ai/little-ai/src/demos/*`.
5. **Localized content helpers:** Keep chapter copy bilingual through `/home/runner/work/little-ai/little-ai/src/content.ts` helpers (`Lang`, `Localized`, `l(en, cs)`, and `text(value, lang)`) instead of hardcoding one language.
