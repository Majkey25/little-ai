# Little AI

A colorful, interactive guide to AI, in English by default with a complete Czech version. Open any of its 17 chapters: watch a short animated explanation, change a value and see what happens. Each chapter has a visual stage, a caption, playback controls and optional technical detail and sources. There are no quizzes, completion requirements or progress tracking.

**[Open the guide](https://Majkey25.github.io/little-ai/)** · **[Play Little Clip Factory](https://Majkey25.github.io/little-clip-factory/)** · **[Game source](https://github.com/Majkey25/little-clip-factory)**

## What you can explore

1. AI, machine learning, deep learning and rule-based automata.
2. A neuron: inputs, weights, bias and activation.
3. Real gradient descent on a tiny OR classifier; training versus inference.
4. Real BPE tokenization: Czech text, English, emoji, token IDs and UTF-8 bytes.
5. Embeddings and cosine similarity with editable vectors.
6. A causal attention heatmap, queries, keys, values and transformer blocks.
7. Next-token probabilities, temperature and sampling.
8. Context windows, output budgets, long conversations and memory.
9. Retrieval: source → chunks → embeddings → index → ranked results → context.
10. Missing evidence, an incorrect Paris answer, abstention and a prepared web-search result.
11. Tools: structured arguments, application execution, results and permissions.
12. Reasoning, intermediate steps and independent arithmetic verification.
13. Agents, AGI, breadth, depth and autonomy.
14. Alignment, reward proxies, side effects and the paperclip thought experiment.
15. Modern software engineering: context, contracts, tests, reviews, delivery, monitoring and rollback.
16. Image generation: prompt features, noise, latent representations, denoising and guidance, with other model approaches explained.
17. How the complete application connects these parts.

The glossary and source library connect the explanations to textbooks, research papers and official documentation, including OpenAI and DORA. The linked engineering post is presented as commentary. Explanations are original summaries, not reproduced book chapters. Research checked 11 October 2026.

## Accuracy boundaries

- Token counts use `js-tiktoken`, a JavaScript port of OpenAI tiktoken, with `cl100k_base` and `o200k_base`. They count the displayed plain text. Actual API usage also includes model-specific message structure, tools and other inputs; hidden reasoning tokens can consume context and output budgets. The plain-text counter does not measure those.
- Neural training, sigmoid, softmax, attention weights and cosine ranking compute real mathematics on small teaching data. Embeddings are hand-designed vectors, not outputs from a trained embedding model.
- Prediction, hallucination, reasoning and agent stories are explicitly labeled teaching simulations. No live LLM, web-search or generative-image backend runs here.
- The image chapter illustrates one latent-diffusion route. Its deterministic visual moves noise toward a known, drawn template; it is not a trained diffusion sampler. Optional detail distinguishes diffusion, rectified flow, autoregressive generation and GANs. The diagrams do not imply that all image models use diffusion or a Transformer.
- An LLM generates from its learned weights and context. A RAG application separately searches a vector index; it does not simply select the nearest word as an answer. Missing Czechia in a RAG index does not imply a model lacks Prague in its training knowledge. The Paris example demonstrates unsafe use of an irrelevant retrieved passage.
- AGI has competing definitions and open questions. The paperclip game is a thought experiment with fixed rules, not an AGI or a forecast.

## Run locally

Use Node.js 24 and npm to match CI.

```sh
npm ci
npm run dev -- --port 4173
npm test
npm run build
npm run preview
```

To play the embedded game locally, run its separate repository on port 4174. Production embeds its GitHub Pages URL.

## Static architecture

Chapter demos load on demand in existing groups. Exact tokenization runs in a browser Web Worker, with encoding tables loaded when needed. Context requests exact token IDs for their count without constructing the byte-inspection map; the tokenizer chapter still displays raw UTF-8 fragments. Count-only mode does not reduce encoding-table downloads.

The guide uses system fonts and native SVG diagrams. It has no mascot bitmap or font downloads. Vite emits fingerprinted asset URLs; the separately embedded game draws its factory in Canvas2D.

## Privacy and accessibility

No accounts, analytics, API keys or backend. Text entered into examples stays in the browser. The guide stores only its language preference. An older `little-ai-progress` value is left untouched and is not used for tracking. The separate game has its own local save. External source links open only when selected.

Keyboard controls, focus indicators, labeled inputs, phone layouts, pauseable explanations and reduced-motion support are included. The animation toggle also controls the embedded game. Native SVG diagrams keep text selectable.

## Publish

The GitHub Pages workflow runs `npm test` and `npm run build` before uploading `dist`. In repository **Settings → Pages**, select **GitHub Actions**. Pushes to `main` trigger the workflow; a successful deployment publishes the build.

The output is portable static files: hash routes and relative asset paths support repository subdirectories. A future Cloudflare static deployment can use the same `npm run build` command and `dist` directory. There is no Cloudflare deployment, server-side Worker, D1 database or application backend configured here. The tokenizer's browser Web Worker is a different mechanism. Moving hosts also requires choosing the embedded game's URL.

Cache policy belongs to the host configuration: mutable HTML should revalidate, while fingerprinted assets can use long-lived immutable caching. These files do not set custom GitHub Pages cache headers or add a Cloudflare configuration.

## Credits

Inspired visually by the [Awwwards animation gallery](https://www.awwwards.com/websites/animation/) and educationally by [Transformer Explainer](https://poloclub.github.io/transformer-explainer/). Little Clip Factory openly acknowledges [Universal Paperclips](https://www.decisionproblem.com/paperclips/) by Frank Lantz; its code, text and artwork are original.

MIT license for this project's original code and educational content. Referenced books, papers and external sites retain their own rights.
