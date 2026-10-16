# Contributing

This repository is a static bilingual educational frontend. Keep all contributor guidance aligned with code and docs already in this repo.

1. **Scope and accuracy boundaries:** Keep new explanations consistent with `/home/runner/work/little-ai/little-ai/README.md` ("Accuracy boundaries") and current teaching code in `/home/runner/work/little-ai/little-ai/src`; do not document live model/backend/web-search/image-generation calls that are not implemented.
2. **Node/npm setup:** Match CI and Pages workflow by using Node 24 (`actions/setup-node` in `/home/runner/work/little-ai/little-ai/.github/workflows/pages.yml`) and install dependencies with `npm ci`.
3. **Local commands:** Use the repo scripts documented in `/home/runner/work/little-ai/little-ai/package.json` and README: `npm run dev -- --port 4173`, `npm test`, `npm run build`, and `npm run preview`.
