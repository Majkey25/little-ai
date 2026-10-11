# Little AI

A colorful, interactive field guide to AI. English by default, with a complete Czech version. Sixteen separate lessons, short animated stories, editable diagrams, a glossary, source links and a paperclip game.

**[Open the course](https://Majkey25.github.io/little-ai/)** · **[Play Little Clip Factory](https://Majkey25.github.io/little-clip-factory/)** · **[Game source](https://github.com/Majkey25/little-clip-factory)**

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
16. How the complete application connects these parts.

Every lesson has an optional deeper explanation, a small knowledge check and primary references. The source library includes the books and papers requested for this project, OpenAI documentation, DORA and the linked engineering post. Explanations are original summaries, not reproduced book chapters. Research checked 11 October 2026.

## Accuracy boundaries

- Token counts use `js-tiktoken`, a JavaScript port of OpenAI tiktoken, with `cl100k_base` and `o200k_base`. They count the displayed plain text. Actual chat/API totals also include model-specific message structure and other inputs.
- Neural training, sigmoid, softmax, attention weights and cosine ranking compute real mathematics on small teaching data. Embeddings are hand-designed vectors, not outputs from a trained embedding model.
- Prediction, hallucination, reasoning and agent stories are explicitly labeled teaching simulations. No live LLM or web-search API runs here.
- An LLM generates from its learned weights and context. A RAG application separately searches a vector index; it does not simply select the nearest word as an answer. Missing Czechia in a RAG index does not imply a model lacks Prague in its training knowledge. The Paris example demonstrates unsafe use of an irrelevant retrieved passage.
- AGI has competing definitions and open questions. The paperclip game is a thought experiment with fixed rules, not an AGI or a forecast.

## Run locally

Requires Node.js 24 and npm.

```sh
npm ci
npm run dev -- --port 4173
npm test
npm run build
npm run preview
```

To play the embedded game locally, run its separate repository on port 4174. Production embeds its GitHub Pages URL. Hash routes and relative assets support the GitHub Pages repository subdirectory.

## Privacy and accessibility

No accounts, analytics, API keys or backend. Text entered into examples stays in the browser. Course progress and language preferences are stored locally, with a notice when storage is unavailable. The game has its own local save. Fonts, images and tokenizer tables ship with the site. External source links open only when selected.

Keyboard controls, focus indicators, labeled inputs, responsive navigation, pauseable stories and reduced-motion support are included. The animation toggle also controls the embedded game. Native SVG diagrams keep text selectable and accessible; a generated Clipbot illustration provides the original game artwork.

## Publish

The Pages workflow runs tests and the production build before uploading `dist`. In repository **Settings → Pages**, select **GitHub Actions**. Pushes to `main` publish the site.

## Credits

Inspired visually by the [Awwwards animation gallery](https://www.awwwards.com/websites/animation/) and educationally by [Transformer Explainer](https://poloclub.github.io/transformer-explainer/). Little Clip Factory openly acknowledges [Universal Paperclips](https://www.decisionproblem.com/paperclips/) by Frank Lantz; its code, text and artwork are original.

MIT license for this project's original code and educational content. Referenced books, papers and external sites retain their own rights.
