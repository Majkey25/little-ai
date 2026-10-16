# Contributing

Little AI is a static bilingual educational frontend. Use these notes with the current source and README.

1. **Scope and accuracy boundaries:** Read the accuracy boundaries in `README.md`. Do not describe live model, search, or image-generation calls that the teaching app does not implement.

2. **Node and npm setup:** Use Node.js 24 to match `.github/workflows/pages.yml`. Install locked dependencies with `npm ci`.

3. **Local commands:** Run `npm run dev -- --port 4173` for development. The existing scripts also provide `npm test`, `npm run build`, and `npm run preview`.

4. **Source map:** Start with `src/main.tsx` and `src/App.tsx`. Page shells live in `src/Pages.tsx`, lesson controls in `src/Lesson.tsx`, and chapter visuals in `src/demos/`.

5. **Localized content helpers:** Use `Lang`, `Localized`, `l(en, cs)`, and `text(value, lang)` from `src/content.ts`. Keep user-facing content available in English and Czech.

6. **Lesson metadata:** Follow the `Lesson` type in `src/content.ts`. Keep its identity, group, localized copy, scenes, takeaway, details, and source IDs consistent.
