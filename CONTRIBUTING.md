# Contributing

Little AI is a static bilingual educational frontend. Use these notes with the current source and README.

1. **Scope and accuracy boundaries:** Read the accuracy boundaries in `README.md`. Do not describe live model, search, or image-generation calls that the teaching app does not implement.

2. **Node and npm setup:** Use Node.js 24 to match `.github/workflows/pages.yml`. Install locked dependencies with `npm ci`.

3. **Local commands:** Run `npm run dev -- --port 4173` for development. The existing scripts also provide `npm test`, `npm run build`, and `npm run preview`.
