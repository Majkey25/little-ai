# Contributing

Little AI is a static bilingual educational frontend. Use these notes with the current source and README.

1. **Scope and accuracy boundaries:** Read the accuracy boundaries in `README.md`. Do not describe live model, search, or image-generation calls that the teaching app does not implement.

2. **Node and npm setup:** Use Node.js 24 to match `.github/workflows/pages.yml`. Install locked dependencies with `npm ci`.

3. **Local commands:** Run `npm run dev -- --port 4173` for development. The existing scripts also provide `npm test`, `npm run build`, and `npm run preview`.

4. **Source map:** Start with `src/main.tsx` and `src/App.tsx`. Page shells live in `src/Pages.tsx`, lesson controls in `src/Lesson.tsx`, and chapter visuals in `src/demos/`.

5. **Localized content helpers:** Use `Lang`, `Localized`, `l(en, cs)`, and `text(value, lang)` from `src/content.ts`. Keep user-facing content available in English and Czech.

6. **Lesson metadata:** Follow the `Lesson` type in `src/content.ts`. Keep its identity, group, localized copy, scenes, takeaway, details, and source IDs consistent.

7. **Demo registration:** Register chapter components in the `demos` mapping in `src/demos/index.tsx`. `Demo` selects a component by lesson ID and returns `null` for an unknown ID.

8. **Captions and technical details:** Put narration in `lesson.scenes[*].body`. `src/Lesson.tsx` renders captions separately from the details and sources panel.

9. **Original source attribution:** Add educational references to the `sources` entries in `src/content.ts`. Preserve original summaries and the external works' credits described in `README.md`.

10. **Hand-designed embeddings:** Treat `documents` and `queryVectors` in `src/math.ts` as curated teaching data. Do not present them as outputs from a trained embedding model.

11. **Training versus inference:** `train(...)` and `predict(...)` in `src/math.ts` demonstrate different operations. Keep learning weights distinct from running a model with existing weights.

12. **Tokenization encodings:** `src/tokenizer.ts` supports `cl100k_base` and `o200k_base`. Keep documentation consistent with those encodings and the controls in `src/demos/Foundations.tsx`.

13. **Plain-text token count limits:** These counts cover displayed text, not complete API message formatting or hidden reasoning. `src/tokenizer.ts` rejects inputs whose JavaScript `length` exceeds 3000.

14. **Tokenizer worker boundary:** `src/useTokens.ts` creates a module Web Worker from `src/tokenizer.worker.ts`. Keep heavy tokenization behind that browser worker boundary.

15. **Stale tokenizer replies:** `src/useTokens.ts` accepts only the current request ID. The worker keeps the newest pending request, but does not cancel tokenization already running.

16. **Token byte display:** `src/tokenBytes.ts` reconstructs token bytes for inspection in `src/demos/Foundations.tsx`. A token's bytes may be only part of a UTF-8 character.

17. **Context and retrieval distinctions:** The retrieval demos supply evidence to context. Keep this separate from changing model weights or claiming that every model performs vector search.

18. **Prepared tool and search simulations:** The flows in `src/demos/Beyond.tsx` use prepared examples and results. Preserve their simulation labels rather than implying a live external service.

19. **Image chapter limitations:** `src/demos/Images.tsx` and `src/imageMath.ts` illustrate movement toward prepared pixel templates. This is deterministic teaching code, not a trained diffusion sampler.

20. **Language persistence:** `src/App.tsx` checks a valid `?lang=` value before the `little-ai-language` storage preference. An explicit language choice updates that parameter when present.

21. **Animations and reduced motion:** Preserve the manual animation control and system reduced-motion handling in `src/App.tsx`. Related styles include `.motion-off` and the reduced-motion media query in `src/styles.css`.

22. **Keyboard and accessible controls:** Preserve the skip link, focus management, and chapter dialog's Escape and Tab handling. Keep controls labeled and status messages accessible.
