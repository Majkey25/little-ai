export type Lang = "en" | "cs";
export type Localized = { en: string; cs: string };
export const l = (en: string, cs: string): Localized => ({ en, cs });
export const text = (value: Localized, lang: Lang): string => value[lang];

export const groups = [
  l("Foundations", "Základy"),
  l("Inside an LLM", "Uvnitř LLM"),
  l("Beyond the model", "Za hranicemi modelu"),
  l("The bigger picture", "Širší souvislosti"),
];

export const sources = [
  {
    id: "slp",
    title: "Speech and Language Processing",
    author: "Daniel Jurafsky & James H. Martin",
    year: l("2026 · draft", "2026 · pracovní verze"),
    url: "https://web.stanford.edu/~jurafsky/slp3/",
    note: l(
      "Language, tokens, neural networks and transformers.",
      "Jazyk, tokeny, neuronové sítě a transformery.",
    ),
  },
  {
    id: "udl",
    title: "Understanding Deep Learning",
    author: "Simon J. D. Prince",
    year: "2023",
    url: "https://udlbook.github.io/udlbook/",
    note: l(
      "Weights, loss, gradients and generalization.",
      "Váhy, ztráta, gradienty a zobecňování.",
    ),
  },
  {
    id: "scratch",
    title: "Build a Large Language Model (From Scratch)",
    author: "Sebastian Raschka",
    year: "2024",
    url: "https://github.com/rasbt/LLMs-from-scratch",
    note: l(
      "A working GPT built step by step.",
      "Funkční GPT postavený krok za krokem.",
    ),
  },
  {
    id: "reasonbook",
    title: "Build a Reasoning Model (From Scratch)",
    author: "Sebastian Raschka",
    year: l("2025 · companion code", "2025 · doprovodný kód"),
    url: "https://github.com/rasbt/reasoning-from-scratch",
    note: l(
      "Inference-time compute, reinforcement learning and distillation.",
      "Výpočty při odpovědi, posilované učení a destilace.",
    ),
  },
  {
    id: "aima",
    title: "Artificial Intelligence: A Modern Approach",
    author: "Stuart Russell & Peter Norvig",
    year: l("4th edition", "4. vydání"),
    url: "https://aima.cs.berkeley.edu/",
    note: l(
      "Agents, search, planning, learning and uncertainty.",
      "Agenti, hledání, plánování, učení a nejistota.",
    ),
  },
  {
    id: "attention",
    title: "Attention Is All You Need",
    author: "Vaswani et al.",
    year: "2017",
    url: "https://arxiv.org/abs/1706.03762",
    note: l(
      "The original Transformer architecture.",
      "Původní architektura Transformer.",
    ),
  },
  {
    id: "sbert",
    title: "Sentence-BERT: Sentence Embeddings using Siamese BERT-Networks",
    author: "Reimers & Gurevych",
    year: "2019",
    url: "https://arxiv.org/abs/1908.10084",
    note: l(
      "Comparing sentence vectors using cosine similarity.",
      "Porovnávání vektorů vět pomocí kosinové podobnosti.",
    ),
  },
  {
    id: "rag",
    title: "Retrieval-Augmented Generation for Knowledge-Intensive NLP Tasks",
    author: "Lewis et al.",
    year: "2020",
    url: "https://arxiv.org/abs/2005.11401",
    note: l(
      "Combine learned parameters with retrieved documents.",
      "Spojení naučených parametrů s nalezenými dokumenty.",
    ),
  },
  {
    id: "cot",
    title:
      "Chain-of-Thought Prompting Elicits Reasoning in Large Language Models",
    author: "Wei et al.",
    year: "2022",
    url: "https://arxiv.org/abs/2201.11903",
    note: l(
      "Intermediate steps can help on some reasoning tasks.",
      "Mezikroky mohou pomoci u některých úloh.",
    ),
  },
  {
    id: "react",
    title: "ReAct: Synergizing Reasoning and Acting in Language Models",
    author: "Yao et al.",
    year: "2022",
    url: "https://arxiv.org/abs/2210.03629",
    note: l(
      "Interleave planning, actions and observations.",
      "Střídání plánování, akcí a pozorování.",
    ),
  },
  {
    id: "truth",
    title: "TruthfulQA: Measuring How Models Mimic Human Falsehoods",
    author: "Lin, Hilton & Evans",
    year: "2021",
    url: "https://arxiv.org/abs/2109.07958",
    note: l(
      "A fluent model can repeat human misconceptions.",
      "Plynulý model může opakovat lidské omyly.",
    ),
  },
  {
    id: "hallucination",
    title: "Why Language Models Hallucinate",
    author: "Kalai et al.",
    year: "2025",
    url: "https://arxiv.org/abs/2509.04664",
    note: l(
      "Training and evaluation can reward guessing.",
      "Trénink a hodnocení mohou odměňovat hádání.",
    ),
  },
  {
    id: "agi",
    title: "Levels of AGI for Operationalizing Progress on the Path to AGI",
    author: "Morris et al.",
    year: l("2023 · revised 2025", "2023 · revize 2025"),
    url: "https://arxiv.org/abs/2311.02462",
    note: l(
      "Separate breadth, performance and autonomy.",
      "Rozlišení šíře schopností, výkonu a autonomie.",
    ),
  },
  {
    id: "safety",
    title: "Concrete Problems in AI Safety",
    author: "Amodei et al.",
    year: "2016",
    url: "https://arxiv.org/abs/1606.06565",
    note: l(
      "Side effects, reward hacking and unsafe exploration.",
      "Vedlejší dopady, zneužití odměny a nebezpečné zkoušení.",
    ),
  },
  {
    id: "gaming",
    title: "Specification Gaming: The Flip Side of AI Ingenuity",
    author: "Google DeepMind",
    year: "2020",
    url: "https://deepmind.google/blog/specification-gaming-the-flip-side-of-ai-ingenuity/",
    note: l(
      "Satisfying a metric while missing the intention.",
      "Splnění metriky bez splnění skutečného záměru.",
    ),
  },
  {
    id: "ethics",
    title: "Ethical Issues in Advanced Artificial Intelligence",
    author: "Nick Bostrom",
    year: "2003",
    url: "https://nickbostrom.com/papers/ethical-issues-in-advanced-ai/",
    note: l(
      "Ethical questions and speculative advanced-AI risks.",
      "Etické otázky a možné hrozby pokročilé AI.",
    ),
  },
  {
    id: "swe",
    title: "Software Engineering at Google",
    author: "Winters, Manshreck & Wright",
    year: "2020",
    url: "https://abseil.io/resources/swe-book",
    note: l(
      "Maintaining software over time, testing and collaboration.",
      "Údržba softwaru v čase, testování a spolupráce.",
    ),
  },
  {
    id: "dora",
    title: "DORA 2025: AI Capabilities Model",
    author: "DORA / Google Cloud",
    year: "2025",
    url: "https://dora.dev/ai/capabilities-model/report/",
    note: l(
      "Team capabilities that support AI-assisted development.",
      "Schopnosti týmu potřebné při vývoji s AI.",
    ),
  },
  {
    id: "explainer",
    title: "Transformer Explainer",
    author: "Polo Club, Georgia Tech",
    year: l("Interactive reference", "Interaktivní ukázka"),
    url: "https://poloclub.github.io/transformer-explainer/",
    note: l(
      "Explore a real GPT-2 model in your browser.",
      "Skutečný model GPT-2 v prohlížeči.",
    ),
  },
  {
    id: "tiktoken",
    title: "OpenAI tiktoken",
    author: "OpenAI",
    year: l("Tokenizer implementation", "Implementace tokenizeru"),
    url: "https://github.com/openai/tiktoken",
    note: l(
      "Byte-pair encoding and model-specific vocabularies.",
      "Byte-pair encoding a slovníky pro konkrétní modely.",
    ),
  },
  {
    id: "minbpe",
    title: "Karpathy minbpe",
    author: "Andrej Karpathy",
    year: l("Educational implementation", "Výuková implementace"),
    url: "https://github.com/karpathy/minbpe",
    note: l(
      "Learn the byte-pair merge algorithm.",
      "Princip slučování dvojic bajtů.",
    ),
  },
  {
    id: "retrieval",
    title: "OpenAI Retrieval documentation",
    author: "OpenAI",
    year: l("Live documentation", "Průběžně aktualizovaná dokumentace"),
    url: "https://developers.openai.com/api/docs/guides/retrieval",
    note: l(
      "Vector stores, chunks, filters and ranking.",
      "Vektorové databáze, úryvky, filtry a řazení.",
    ),
  },
  {
    id: "functions",
    title: "OpenAI Function Calling documentation",
    author: "OpenAI",
    year: l("Live documentation", "Průběžně aktualizovaná dokumentace"),
    url: "https://developers.openai.com/api/docs/guides/function-calling",
    note: l(
      "Structured tool requests and application execution.",
      "Strukturované požadavky na nástroj a jeho spuštění aplikací.",
    ),
  },
  {
    id: "web",
    title: "OpenAI Web Search documentation",
    author: "OpenAI",
    year: l("Live documentation", "Průběžně aktualizovaná dokumentace"),
    url: "https://developers.openai.com/api/docs/guides/tools-web-search",
    note: l(
      "Search current sources and return citations.",
      "Hledání aktuálních zdrojů a citace.",
    ),
  },
  {
    id: "reasonapi",
    title: "OpenAI Reasoning documentation",
    author: "OpenAI",
    year: l("Live documentation", "Průběžně aktualizovaná dokumentace"),
    url: "https://developers.openai.com/api/docs/guides/reasoning",
    note: l(
      "Hidden reasoning tokens, context limits and output budgets.",
      "Skryté tokeny uvažování, limity kontextu a rozpočet výstupu.",
    ),
  },
  {
    id: "middle",
    title: "Lost in the Middle: How Language Models Use Long Contexts",
    author: "Liu et al.",
    year: "2023",
    url: "https://arxiv.org/abs/2307.03172",
    note: l(
      "A long context does not guarantee reliable recall.",
      "Dlouhý kontext nezaručuje spolehlivé využití informací.",
    ),
  },
  {
    id: "post",
    title: "AI-assisted software engineering",
    author: "Matěj Teplý",
    year: l("2026 · opinion / inspiration", "2026 · názor / inspirace"),
    url: "https://www.linkedin.com/posts/matejteply_ai-softwareengineering-codingagents-share-7511881119278108672-7rz-/",
    note: l(
      "The supplied post: clear contracts and evidence of completion.",
      "Dodaný příspěvek: jasné zadání a důkazy splnění.",
    ),
  },
  {
    id: "ddpm",
    title: "Denoising Diffusion Probabilistic Models",
    author: "Ho, Jain & Abbeel",
    year: "2020",
    url: "https://arxiv.org/abs/2006.11239",
    note: l(
      "Learning to reverse a noising process.",
      "Učení opačného postupu k přidávání šumu.",
    ),
  },
  {
    id: "ldm",
    title: "High-Resolution Image Synthesis with Latent Diffusion Models",
    author: "Rombach et al.",
    year: l("2022 · first posted 2021", "2022 · první verze 2021"),
    url: "https://arxiv.org/abs/2112.10752",
    note: l(
      "Diffusion in learned features, text conditioning and decoding.",
      "Difuze v naučených příznacích, textové podmínky a dekódování.",
    ),
  },
  {
    id: "dit",
    title: "Scalable Diffusion Models with Transformers",
    author: "Peebles & Xie",
    year: l("ICCV 2023 · first posted 2022", "ICCV 2023 · první verze 2022"),
    url: "https://arxiv.org/abs/2212.09748",
    note: l(
      "A Transformer predicts updates to latent image patches.",
      "Transformer odhaduje úpravy částí latentního zápisu obrazu.",
    ),
  },
  {
    id: "cfg",
    title: "Classifier-Free Diffusion Guidance",
    author: "Ho & Salimans",
    year: "2022",
    url: "https://arxiv.org/abs/2207.12598",
    note: l(
      "Combining predictions with and without conditioning.",
      "Kombinování odhadů s podmínkou a bez ní.",
    ),
  },
  {
    id: "sd3",
    title:
      "Scaling Rectified Flow Transformers for High-Resolution Image Synthesis",
    author: "Esser et al.",
    year: "2024",
    url: "https://arxiv.org/abs/2403.03206",
    note: l(
      "Rectified flow and multimodal Transformer image generation.",
      "Generování obrazu pomocí rectified flow a multimodálního Transformeru.",
    ),
  },
  {
    id: "gan",
    title: "Generative Adversarial Networks",
    author: "Goodfellow et al.",
    year: "2014",
    url: "https://arxiv.org/abs/1406.2661",
    note: l(
      "A generator learns against a discriminator.",
      "Generátor se učí proti diskriminátoru.",
    ),
  },
  {
    id: "imagecard",
    title: "Addendum to GPT-4o System Card: Native image generation",
    author: "OpenAI",
    year: "2025",
    url: "https://openai.com/index/gpt-4o-image-generation-system-card-addendum/",
    note: l(
      "The 2025 autoregressive image system and its safety evaluations.",
      "Autoregresní obrazový systém z roku 2025 a hodnocení jeho bezpečnosti.",
    ),
  },
  {
    id: "imageapi",
    title: "OpenAI Image generation documentation",
    author: "OpenAI",
    year: l("Live documentation", "Průběžně aktualizovaná dokumentace"),
    url: "https://developers.openai.com/api/docs/guides/image-generation",
    note: l(
      "Image generation, editing and remaining limitations.",
      "Generování a úpravy obrázků i přetrvávající omezení.",
    ),
  },
  {
    id: "imageseed",
    title: "Diffusers reproducibility documentation",
    author: "Hugging Face",
    year: l("Live documentation", "Průběžně aktualizovaná dokumentace"),
    url: "https://huggingface.co/docs/diffusers/using-diffusers/reusing_seeds",
    note: l(
      "Seeds, generator state and reproducibility limits.",
      "Seedy, stav generátoru a omezení opakovatelnosti.",
    ),
  },
  {
    id: "imagememory",
    title: "Extracting Training Data from Diffusion Models",
    author: "Carlini et al.",
    year: "2023",
    url: "https://arxiv.org/abs/2301.13188",
    note: l(
      "Memorization and reproduction can occur in image generators.",
      "Generátory obrázků si mohou zapamatovat a reprodukovat příklady.",
    ),
  },
  {
    id: "imagebias",
    title: "DALL·E 2 pre-training mitigations",
    author: "OpenAI",
    year: "2022",
    url: "https://openai.com/index/dall-e-2-pre-training-mitigations/",
    note: l(
      "Training-data filtering, representation and memorization.",
      "Filtrování tréninkových dat, zastoupení lidí a zapamatování příkladů.",
    ),
  },
  {
    id: "imageevals",
    title: "Image Evals for Image Generation and Editing Use Cases",
    author: "OpenAI Cookbook",
    year: l("Live documentation", "Průběžně aktualizovaná dokumentace"),
    url: "https://developers.openai.com/cookbook/examples/multimodal/image_evals",
    note: l(
      "Inspecting image details and prompt adherence.",
      "Kontrola detailů obrázku a shody se zadáním.",
    ),
  },
];

type Scene = { title: Localized; body: Localized };
type Detail = { title: Localized; body: Localized };
export type Lesson = {
  id: string;
  group: number;
  name: Localized;
  subtitle: Localized;
  title: Localized;
  intro: Localized;
  scenes: Scene[];
  takeaway: Localized;
  details: Detail[];
  sources: string[];
};
const scene = (title: Localized, body: Localized): Scene => ({ title, body });

export const lessons: Lesson[] = [
  {
    id: "ai",
    group: 0,
    name: l("Meet AI", "Seznam se s AI"),
    subtitle: l("What is AI, really?", "Co je vlastně AI?"),
    title: l("A little map of a big idea.", "Malá mapa velké myšlenky."),
    intro: l(
      "AI is a field. A chatbot is one small part of it.",
      "AI je celý obor. Chatbot je jen jeho malá část.",
    ),
    scenes: [
      scene(
        l("Rules", "Pravidla"),
        l(
          "A traffic light follows states and rules written by people. Automation does not have to learn.",
          "Semafor přepíná stavy podle pravidel od člověka. Automatizace se nemusí nic učit.",
        ),
      ),
      scene(
        l("Learning", "Učení"),
        l(
          "Machine learning finds useful patterns in examples. Deep learning uses neural networks with many layers.",
          "Strojové učení hledá užitečné vzory v příkladech. Hluboké učení používá neuronové sítě s mnoha vrstvami.",
        ),
      ),
      scene(
        l("Language", "Jazyk"),
        l(
          "A large language model (LLM) learns patterns in language. GPT means Generative Pre-trained Transformer: a model trained before you use it to generate text.",
          "Velký jazykový model (LLM) se učí vzory jazyka. GPT je Generative Pre-trained Transformer: model předem natrénovaný pro generování textu.",
        ),
      ),
    ],
    takeaway: l(
      "AI includes planning and search too. Not all AI is a neural network.",
      "AI zahrnuje i plánování a hledání. Ne každá AI je neuronová síť.",
    ),
    details: [
      scene(
        l("The names", "Názvy"),
        l(
          "AI = artificial intelligence. ML = machine learning. DL = deep learning. LLM = large language model. NLP = natural language processing. Generative AI creates outputs such as text or pictures.",
          "AI = umělá inteligence. ML = strojové učení. DL = hluboké učení. LLM = velký jazykový model. NLP = zpracování přirozeného jazyka. Generativní AI vytváří třeba text nebo obrázky.",
        ),
      ),
      scene(
        l("Rule or model?", "Pravidlo, nebo model?"),
        l(
          "Rules are useful when the desired behavior is exact. Learned models are useful when examples describe a messy problem better than hand-written rules. A product often combines both.",
          "Pravidla se hodí pro přesné chování. Modely se hodí, když příklady popisují složitou úlohu lépe než ručně napsaná pravidla. Produkt často kombinuje obojí.",
        ),
      ),
    ],
    sources: ["aima", "slp"],
  },
  {
    id: "neural",
    group: 0,
    name: l("Neural networks", "Neuronové sítě"),
    subtitle: l("Small calculations, connected", "Propojené malé výpočty"),
    title: l("Numbers in. A signal out.", "Čísla dovnitř. Signál ven."),
    intro: l(
      "A neuron multiplies, adds and applies a function. Connect many, and patterns become possible.",
      "Neuron násobí, sčítá a použije funkci. Propojená síť dokáže zachytit složité vzory.",
    ),
    scenes: [
      scene(
        l("Inputs", "Vstupy"),
        l(
          "Inputs are numbers. Here, two sliders feed a tiny neuron. Images, sound and text also need numerical representations.",
          "Vstupy jsou čísla. Dva posuvníky mění vstupy malého neuronu. I obraz, zvuk a text potřebují číselný zápis.",
        ),
      ),
      scene(
        l("Weights", "Váhy"),
        l(
          "A weight controls an input's influence. A bias adds a constant before activation. Training changes these numbers; ordinary generation usually keeps them fixed. Try a negative weight.",
          "Váha určuje vliv vstupu. Posun b přičte stálou hodnotu před aktivací. Trénink mění tyto hodnoty; běžné generování je obvykle nemění. Zkus zápornou váhu.",
        ),
      ),
      scene(
        l("Activation", "Aktivace"),
        l(
          "A nonlinear activation bends the output. Without nonlinearities, stacked linear layers still act like one linear transformation.",
          "Nelineární aktivační funkce mění výstup. Bez nelinearity jsou vrstvy lineárních výpočtů stále jen jeden lineární výpočet.",
        ),
      ),
    ],
    takeaway: l(
      "Artificial neurons are mathematical functions, not miniature human brains.",
      "Umělé neurony jsou matematické funkce, ne malé lidské mozky.",
    ),
    details: [
      scene(
        l("The calculation", "Výpočet"),
        l(
          "z = x₁w₁ + x₂w₂ + b. This example uses sigmoid(z) = 1 / (1 + exp(−z)). Hidden layers transform features; the final layer produces the task output.",
          "z = x₁w₁ + x₂w₂ + b. Zde používáme sigmoid(z) = 1 / (1 + exp(−z)). Skryté vrstvy mění reprezentace, poslední vrstva vytvoří výstup úlohy.",
        ),
      ),
      scene(
        l("A parameter is a learned number", "Parametr je naučené číslo"),
        l(
          "Weights and biases are parameters. Activations change with each input. A billion parameters does not mean a billion facts.",
          "Váhy a posuny jsou parametry. Aktivace se mění se vstupem. Miliarda parametrů neznamená miliardu faktů.",
        ),
      ),
    ],
    sources: ["udl", "scratch"],
  },
  {
    id: "learning",
    group: 0,
    name: l("Learning", "Učení"),
    subtitle: l(
      "From examples to a useful pattern",
      "Od příkladů k užitečnému vzoru",
    ),
    title: l("Guess. Measure. Adjust.", "Odhadni. Změř. Uprav."),
    intro: l(
      "Training makes many small corrections. Watch a real tiny model learn the OR rule.",
      "Trénink dělá mnoho malých oprav. Sleduj skutečný malý model, který se učí pravidlo OR.",
    ),
    scenes: [
      scene(
        l("Make a prediction", "Vytvoř odhad"),
        l(
          "This neuron predicts whether at least one input is 1. At first its weights are zero, so it predicts 0.5 for every example.",
          "Neuron odhaduje, zda je alespoň jeden vstup 1. Zpočátku jsou váhy nula, takže pro každý příklad odhaduje 0,5.",
        ),
      ),
      scene(
        l("Measure the loss", "Změř chybu"),
        l(
          "Loss measures how far predictions are from targets. Backpropagation computes how each parameter affects that loss.",
          "Ztrátová funkce měří chybu vůči správným výsledkům. Zpětné šíření vypočítá, jak každý parametr ovlivňuje tuto chybu.",
        ),
      ),
      scene(
        l("Take a small step", "Udělej malý krok"),
        l(
          "Gradient descent moves weights toward lower loss. The learning rate sets the step size. Train, then inspect all four examples.",
          "Gradientní sestup mění váhy směrem k menší chybě. Rychlost učení určuje velikost kroku. Trénuj a prohlédni všechny čtyři příklady.",
        ),
      ),
    ],
    takeaway: l(
      "Good training performance is not enough. Test on examples the model has not seen.",
      "Dobrý výsledek na tréninku nestačí. Testuj na příkladech, které model neviděl.",
    ),
    details: [
      scene(
        l("How an LLM trains", "Jak se trénuje LLM"),
        l(
          "GPT-style pretraining learns to predict the next token; training text supplies that target. Instruction tuning trains a model to follow instructions. RLHF or DPO shapes behavior using preferences. Fine-tuning changes weights; a document in a prompt does not.",
          "Předtrénování typu GPT učí předpovídat další token; správný výsledek dodává samotný text. Instrukční trénink učí plnit pokyny. RLHF nebo DPO upravují chování podle preferencí. Dotrénování mění váhy; dokument v promptu ne.",
        ),
      ),
      scene(
        l("Generalization and resources", "Zobecnění a zdroje"),
        l(
          "Overfitting means fitting training details that do not transfer. Holdout sets, deduplication and regularization help. GPUs parallelize matrix operations. Data quality, compute and architecture matter alongside model size.",
          "Přeučení znamená zapamatování detailů, které nefungují na nových datech. Pomáhají oddělené testy, odstranění duplicit a regularizace. GPU zpracovávají matice paralelně. Záleží i na kvalitě dat, výpočtech a architektuře.",
        ),
      ),
    ],
    sources: ["udl", "scratch", "slp"],
  },
  {
    id: "tokens",
    group: 0,
    name: l("Tokens", "Tokeny"),
    subtitle: l("Language as pieces", "Jazyk po kouscích"),
    title: l("Words become pieces.", "Slova se mění na kousky."),
    intro: l(
      "A token can be a word, a word fragment, or even part of an emoji.",
      "Token může být slovo, jeho část, nebo dokonce část emoji.",
    ),
    scenes: [
      scene(
        l("Text to bytes", "Text na bajty"),
        l(
          "UTF-8 turns characters into bytes. Czech accents and emoji can use several bytes. Spaces are part of the text too.",
          "UTF-8 převede znaky na bajty. České háčky a emoji mohou zabrat více bajtů. I mezery patří do textu.",
        ),
      ),
      scene(
        l("Bytes to pieces", "Bajty na kousky"),
        l(
          "Byte-pair encoding merges bytes by fixed priorities learned before use. Your prompt does not retrain the vocabulary. Pieces depend on the encoding, not word count.",
          "Byte-pair encoding slučuje bajty podle předem naučených priorit. Při zpracování tvého promptu se slovník nemění. Kousky určuje tokenizer, ne počet slov.",
        ),
      ),
      scene(
        l("Pieces to IDs", "Kousky na ID"),
        l(
          "Each piece has a numeric ID. The counter below runs the actual encoding locally. Change the text or encoding and compare.",
          "Každý kousek má číselné ID. Počítadlo spouští skutečný tokenizer lokálně. Změň text nebo slovník a porovnej výsledky.",
        ),
      ),
    ],
    takeaway: l(
      "Token IDs identify pieces. They do not measure meaning or word importance.",
      "ID tokenu označuje kousek. Neměří význam ani důležitost slova.",
    ),
    details: [
      scene(
        l("Exact for what?", "Pro co je počet přesný?"),
        l(
          "This counts plain text with cl100k_base or o200k_base using js-tiktoken. These encodings split text into pattern-defined pieces, then apply BPE within each piece. An API request also includes message formatting, tool definitions and sometimes image or audio tokens. The provider reports the authoritative usage.",
          "Zde počítáme prostý text pomocí cl100k_base nebo o200k_base v js-tiktoken. Tato kódování nejdřív rozdělí text podle vzoru na části a uvnitř každé použijí BPE. API přidává formát zpráv, definice nástrojů a někdy obraz či zvuk. Rozhodující spotřebu uvádí poskytovatel.",
        ),
      ),
      scene(
        l("A token can split a character", "Token může rozdělit znak"),
        l(
          "The highlighted text is a readable preview. Some individual tokens end inside a UTF-8 character, so their preview shows �. The byte display is exact. Decoding all tokens together restores the original text.",
          "Zvýrazněný text je čitelný náhled. Některé tokeny končí uvnitř UTF-8 znaku, takže samostatně zobrazí �. Bajtový zápis je přesný. Dekódování všech tokenů dohromady obnoví původní text.",
        ),
      ),
    ],
    sources: ["tiktoken", "minbpe", "slp"],
  },
  {
    id: "embeddings",
    group: 1,
    name: l("Embeddings", "Embeddingy"),
    subtitle: l("Meaning as numbers", "Význam jako čísla"),
    title: l("Give meaning an address.", "Dej významu číselnou adresu."),
    intro: l(
      "An embedding is a list of numbers. Similar uses or meanings can point in similar directions.",
      "Embedding je seznam čísel. Podobné použití nebo význam může směřovat podobným směrem.",
    ),
    scenes: [
      scene(
        l("Represent", "Zapiš"),
        l(
          "A token ID selects a vector from the model's learned embedding table. A separate retrieval model can encode a whole sentence or document chunk.",
          "ID tokenu vybere vektor z tabulky naučených vektorů v modelu. Samostatný vyhledávací model může zakódovat větu nebo úryvek dokumentu.",
        ),
      ),
      scene(
        l("Compare", "Porovnej"),
        l(
          "Cosine similarity compares vector directions. Here you can move a query and see actual calculated scores for hand-made 2D vectors.",
          "Kosinová podobnost porovnává směry vektorů. Zde pohybuj dotazem a sleduj skutečně vypočítané skóre ručně vytvořených 2D vektorů.",
        ),
      ),
      scene(
        l("Interpret carefully", "Vykládej opatrně"),
        l(
          "A close vector is a candidate, not proof. Real embeddings have many dimensions; this flat diagram is a teaching example, not a real model.",
          "Blízký vektor je kandidát, ne důkaz. Skutečné embeddingy mají mnoho rozměrů. Plochý diagram je učební příklad, ne skutečný model.",
        ),
      ),
    ],
    takeaway: l(
      "Token embeddings inside a model and document embeddings for search have different jobs.",
      "Tokenové embeddingy v modelu a dokumentové embeddingy pro hledání mají jiné úlohy.",
    ),
    details: [
      scene(
        l("The calculation", "Výpočet"),
        l(
          "cos(a,b) = (a · b) / (‖a‖‖b‖). Values range from −1 to 1. A zero vector has no direction. A score is not a calibrated probability that a document answers a question.",
          "cos(a,b) = (a · b) / (‖a‖‖b‖). Hodnoty jsou −1 až 1. Nulový vektor nemá směr. Skóre není kalibrovaná pravděpodobnost, že dokument odpovídá na otázku.",
        ),
      ),
      scene(
        l("Position and context", "Pozice a kontext"),
        l(
          "A Transformer adds position information, for example through positional embeddings or rotary transformations. Attention produces contextual representations: the same token can mean different things in different sentences.",
          "Transformer používá i informaci o pozici, třeba poziční embeddingy nebo rotační transformace. Attention vytvoří kontextový zápis: stejný token může v různých větách znamenat něco jiného.",
        ),
      ),
    ],
    sources: ["sbert", "attention", "explainer"],
  },
  {
    id: "attention",
    group: 1,
    name: l("Attention", "Attention"),
    subtitle: l(
      "Information flows between tokens",
      "Informace proudí mezi tokeny",
    ),
    title: l("Which pieces matter here?", "Které kousky jsou zde důležité?"),
    intro: l(
      "Attention mixes information from relevant positions. It is a calculation, not human awareness.",
      "Attention míchá informace z různých pozic. Je to výpočet, ne lidská pozornost.",
    ),
    scenes: [
      scene(
        l("Query and keys", "Dotaz a klíče"),
        l(
          "Each position creates a query Q, key K and value V. Dot products compare its query with current and earlier keys. Select a word to inspect its row.",
          "Každá pozice vytvoří dotaz Q, klíč K a hodnotu V. Skalární součiny porovnají dotaz s vlastním a předchozími klíči. Vyber slovo a prohlédni řádek.",
        ),
      ),
      scene(
        l("Hide future tokens", "Skryj budoucí tokeny"),
        l(
          "A causal mask hides future tokens. Softmax converts the remaining scores into weights summing to 1. Future positions get weight 0.",
          "Kauzální maska skryje budoucí tokeny. Softmax převede zbylá skóre na váhy se součtem 1. Budoucí pozice dostanou váhu 0.",
        ),
      ),
      scene(
        l("Mix values", "Smíchej hodnoty"),
        l(
          "The weighted sum of value vectors carries information to this position. Multiple heads and layers build richer representations.",
          "Vážený součet hodnot V přenese informace do pozice. Více hlav a vrstev vytváří bohatší reprezentace.",
        ),
      ),
    ],
    takeaway: l(
      "This illustration uses small invented Q/K vectors. It does not show a real LLM's thoughts.",
      "Schéma používá malé vymyšlené Q/K vektory. Neukazuje myšlenky skutečného LLM.",
    ),
    details: [
      scene(
        l("Inside a block", "Uvnitř bloku"),
        l(
          "Learned matrices turn each token representation into Q, K and V. Attention(Q,K,V) = softmax(QKᵀ / √d + mask)V mixes information between positions. A feed-forward network transforms each position. Residual connections add the input back; normalization adjusts scale. Repeated blocks update the representations.",
          "Naučené matice převedou číselný zápis tokenu na Q, K a V. Attention(Q,K,V) = softmax(QKᵀ / √d + mask)V míchá informace mezi pozicemi. Dopředná síť zpracuje každou pozici. Reziduální spojení přičte původní vstup; normalizace upraví měřítko hodnot. Bloky se opakují.",
        ),
      ),
      scene(
        l("Cost and caching", "Cena a cache"),
        l(
          "Dense attention compares pairs of positions, so its score matrix grows quadratically with context length. A KV cache reuses earlier keys and values during generation. It saves recomputation, not permanent memories.",
          "Hustá attention porovnává dvojice pozic, proto její matice roste kvadraticky s délkou kontextu. KV cache při generování opakovaně používá dřívější klíče a hodnoty. Šetří výpočty, není trvalou pamětí.",
        ),
      ),
    ],
    sources: ["attention", "scratch", "explainer"],
  },
  {
    id: "prediction",
    group: 1,
    name: l("Next token", "Další token"),
    subtitle: l("One step at a time", "Jeden krok za druhým"),
    title: l(
      "A sentence grows one piece at a time.",
      "Věta roste po jednom kousku.",
    ),
    intro: l(
      "An LLM produces scores for possible next tokens. A decoding rule chooses the next one.",
      "LLM vytvoří skóre možných dalších tokenů. Pravidlo dekódování vybere jeden z nich.",
    ),
    scenes: [
      scene(
        l("Score", "Ohodnoť"),
        l(
          "For “Prague is …”, a trained model could favor “the”. The scores here are invented for teaching. They are not measurements from an LLM.",
          "U „Praha je …“ může model upřednostnit „hlavní“. Zde jsou skóre vymyšlená pro výuku. Nejde o měření skutečného LLM.",
        ),
      ),
      scene(
        l("Choose", "Vyber"),
        l(
          "Softmax turns scores into probabilities. Lower temperature concentrates them; higher temperature spreads them. It does not add knowledge.",
          "Softmax mění skóre na pravděpodobnosti. Nižší teplota je soustředí, vyšší rozptýlí. Nové znalosti nepřidá.",
        ),
      ),
      scene(
        l("Repeat", "Opakuj"),
        l(
          "Append the chosen token to the context, then predict again. Stop at an end token or output limit. Sampling can produce a different continuation.",
          "Přidej zvolený token do kontextu a předpovídej znovu. Konec určí koncový token nebo limit. Náhodný výběr může dát jiné pokračování.",
        ),
      ),
    ],
    takeaway: l(
      "Likely text and true text are different things.",
      "Pravděpodobný text a pravdivý text jsou různé věci.",
    ),
    details: [
      scene(
        l("Decoding choices", "Volby dekódování"),
        l(
          "Greedy decoding picks the highest score. Top-k keeps k candidates; top-p keeps the most likely candidates until their total probability reaches at least p. This example offers full sampling or greedy choice over five illustrative candidates.",
          "Greedy dekódování vybírá nejvyšší skóre. Top-k ponechá k kandidátů; top-p ponechá nejpravděpodobnější kandidáty, dokud jejich součet pravděpodobností nedosáhne alespoň p. Příklad nabízí náhodný nebo nejvyšší výběr z pěti ukázkových kandidátů.",
        ),
      ),
      scene(
        l("Training versus use", "Trénink a použití"),
        l(
          "Training can evaluate many target positions in parallel with a causal mask. Autoregressive generation needs its own previous outputs, so new tokens arrive sequentially. Lower temperature cannot fix missing evidence.",
          "Trénink může s kauzální maskou hodnotit mnoho pozic současně. Autoregresní generování potřebuje vlastní předchozí výstupy, takže nové tokeny přicházejí postupně. Nízká teplota neopraví chybějící důkazy.",
        ),
      ),
    ],
    sources: ["slp", "scratch", "explainer"],
  },
  {
    id: "context",
    group: 1,
    name: l("Context", "Kontext"),
    subtitle: l(
      "The model’s temporary workspace",
      "Dočasný pracovní prostor modelu",
    ),
    title: l("What fits in the little window?", "Co se vejde do malého okna?"),
    intro: l(
      "Context is what the model receives for this response. It has a token budget.",
      "Kontext je to, co model dostane pro aktuální odpověď. Má omezený počet tokenů.",
    ),
    scenes: [
      scene(
        l("Pack the input", "Slož vstup"),
        l(
          "Instructions, conversation history, your question, retrieved documents and tool results can all take space. Output also needs room.",
          "Instrukce, historie chatu, otázka, dokumenty a výsledky nástrojů mohou zabírat místo. Prostor potřebuje i odpověď.",
        ),
      ),
      scene(
        l("Meet the limit", "Naraz na limit"),
        l(
          "This is an 80-token teaching window. Edit the notes and reserve output space. The bar uses the actual cl100k_base encoding for these plain-text fields.",
          "Toto je výukové okno 80 tokenů. Uprav poznámky a rezervuj místo odpovědi. Lišta používá skutečné cl100k_base pro tato textová pole.",
        ),
      ),
      scene(
        l("Remember carefully", "Pamatuj opatrně"),
        l(
          "Apps can reject or shorten oversized input, summarize it, or retrieve only relevant evidence. This demo highlights overflow; it does not silently erase your notes.",
          "Aplikace mohou příliš dlouhý vstup odmítnout, zkrátit, shrnout nebo místo něj vyhledat jen potřebné podklady. Ukázka přebytek zvýrazní, poznámky ti potichu nesmaže.",
        ),
      ),
    ],
    takeaway: l(
      "Chat history, saved app memory, learned weights and a KV cache are four different things.",
      "Historie chatu, paměť aplikace, naučené váhy a KV cache jsou čtyři různé věci.",
    ),
    details: [
      scene(
        l("Long does not mean reliable", "Dlouhý neznamená spolehlivý"),
        l(
          "A larger window allows more input but does not guarantee the model uses every detail. Position, distraction and task difficulty matter. The “lost in the middle” study tested this limitation.",
          "Větší okno dovolí více vstupu, ale nezaručí využití každého detailu. Záleží na pozici, rušivém obsahu a úloze. Studie „Lost in the Middle“ tuto slabinu zkoumala.",
        ),
      ),
      scene(
        l("Prompts are inputs", "Prompty jsou vstupy"),
        l(
          "A prompt can specify the task, constraints and examples. Clear boundaries help distinguish instructions from quoted data. Adding a prompt does not rewrite learned weights or give the model live internet access. Saved memory requires app storage and a way to reinsert relevant information into context.",
          "Prompt může určit úlohu, omezení a příklady. Jasné hranice odlišují instrukce od citovaných dat. Prompt nepřepisuje naučené váhy ani nezajišťuje živý přístup na internet. Uložená paměť potřebuje úložiště aplikace a vrácení potřebných informací do kontextu.",
        ),
      ),
    ],
    sources: ["middle", "slp", "tiktoken"],
  },
  {
    id: "retrieval",
    group: 2,
    name: l("Retrieval", "Vyhledávání"),
    subtitle: l("Find a useful source first", "Nejdřív najdi užitečný zdroj"),
    title: l("Find. Read. Then answer.", "Najdi. Přečti. Pak odpověz."),
    intro: l(
      "RAG retrieves evidence and puts it into the model’s context. The database is outside the LLM.",
      "RAG vyhledá podklady a vloží je do kontextu. Databáze je mimo LLM.",
    ),
    scenes: [
      scene(
        l("Prepare documents", "Připrav dokumenty"),
        l(
          "Parse a source, split it into chunks, attach source metadata and compute embeddings. Store each vector beside its text and origin.",
          "Zpracuj zdroj, rozděl ho na úryvky, přidej metadata a vypočítej embeddingy. Ulož vektor spolu s textem a původem.",
        ),
      ),
      scene(
        l("Search the vectors", "Hledej ve vektorech"),
        l(
          "Encode the question with a compatible embedding model. Rank chunks by similarity. Here the cosine calculations are real; the 3D vectors are hand-made.",
          "Zakóduj otázku kompatibilním embedding modelem. Seřaď úryvky podle podobnosti. Kosinové výpočty zde jsou skutečné, 3D vektory ručně vytvořené.",
        ),
      ),
      scene(
        l("Ground the answer", "Opři odpověď o zdroj"),
        l(
          "Read the retrieved text, check the country, and cite supporting evidence. If nothing supports the answer, say so or use another permitted tool.",
          "Přečti nalezený text, ověř stát a cituj podpůrný zdroj. Pokud odpověď nemá podklad, řekni to nebo použij další povolený nástroj.",
        ),
      ),
    ],
    takeaway: l(
      "The top match can answer the wrong question. Filters or thresholds may leave no match.",
      "První výsledek může odpovídat na jinou otázku. Po filtrování nebo použití prahu nemusí zůstat žádný.",
    ),
    details: [
      scene(
        l("Production retrieval", "Vyhledávání v praxi"),
        l(
          "This toy compares every remaining chunk. Large indexes can search approximately for speed and miss the true nearest match. Use compatible embedding versions and metadata filters. Hybrid search combines words and vector similarity; reranking reorders candidates by relevance. Calibrate thresholds on representative questions; one universal score is not enough.",
          "Ukázka porovná všechny zbývající úryvky. Velké indexy mohou hledat přibližně kvůli rychlosti a minout nejbližší výsledek. Používej kompatibilní verze embeddingů a filtry metadat. Kombinované hledání propojí slova s podobností vektorů; přerovnání znovu seřadí kandidáty podle relevance. Prahy ověř na otázkách ze skutečného použití; jedno univerzální skóre nestačí.",
        ),
      ),
      scene(
        l("Fresh sources", "Aktuální zdroje"),
        l(
          "Re-index updated files and remove deleted chunks. Permissions must apply before retrieved data reaches the prompt. Bad parsing, missing facts and stale documents can all break RAG. RAG does not automatically retrain weights.",
          "Aktualizované soubory znovu indexuj a smazané úryvky odstraň. Oprávnění ověř před vložením dat do promptu. RAG mohou rozbít špatné parsování, chybějící fakta i zastaralé dokumenty. RAG automaticky nemění váhy.",
        ),
      ),
    ],
    sources: ["rag", "retrieval", "sbert"],
  },
  {
    id: "hallucinations",
    group: 2,
    name: l("Hallucinations", "Halucinace"),
    subtitle: l("Fluent does not mean factual", "Plynulé neznamená pravdivé"),
    title: l(
      "A confident sentence can be wrong.",
      "Sebevědomá věta může být chybná.",
    ),
    intro: l(
      "The Czechia source starts excluded. See how a badly designed RAG app can copy the wrong capital.",
      "Zdroj o Česku je zpočátku vynechaný. Sleduj, jak špatně navržená aplikace s RAG může převzít chybné hlavní město.",
    ),
    scenes: [
      scene(
        l("Missing evidence", "Chybějící podklad"),
        l(
          "Without the Czechia source, the index's top match is about France. Similar wording is not a matching fact.",
          "Bez zdroje o Česku je první výsledek z indexu o Francii. Podobná věta není stejný fakt.",
        ),
      ),
      scene(
        l("An unsafe shortcut", "Chybná zkratka"),
        l(
          "Without Czechia evidence and with the country check off, our deliberately broken rule copies Paris. This is a scripted failure demonstration, not how every LLM works.",
          "Bez podkladů o Česku a s vypnutou kontrolou státu záměrně chybná logika převezme Paříž. Jde o připravenou ukázku chyby, ne popis každého LLM.",
        ),
      ),
      scene(
        l("Ask for support", "Vyžádej podklad"),
        l(
          "An evidence check rejects the country mismatch. Add the Czech source or inspect a prepared web-search result. Tools help only when their output is trustworthy and relevant.",
          "Kontrola podkladů odmítne nesprávný stát. Přidej český zdroj nebo prohlédni připravený výsledek webu. Nástroje pomohou jen s důvěryhodným a relevantním výstupem.",
        ),
      ),
    ],
    takeaway: l(
      "A model may know Prague from training even without a database. Missing retrieval does not force “Paris”.",
      "Model může znát Prahu z tréninku i bez databáze. Chybějící zdroj nenutí odpověď „Paříž“.",
    ),
    details: [
      scene(
        l("More than bad retrieval", "Více než špatné vyhledání"),
        l(
          "Hallucinations also arise without RAG: unreliable patterns, unfamiliar questions and pressure to guess can yield unsupported claims. Training and evaluation incentives matter. “I do not know” can be the correct answer.",
          "Halucinace vznikají i bez RAG: chybné vzory, neznámé otázky a tlak na hádání mohou vést k nepodloženým tvrzením. Záleží na tréninku i hodnocení. „Nevím“ může být správná odpověď.",
        ),
      ),
      scene(
        l("Check truth separately", "Pravdu kontroluj zvlášť"),
        l(
          "A citation can be real yet fail to support the claim. Inspect the passage. Evaluate answer correctness, support and appropriate abstention separately. TruthfulQA probes learned misconceptions; it is not a universal safety score.",
          "Citace může být skutečná, ale nepodporovat tvrzení. Přečti úryvek. Hodnoť zvlášť správnost, podklady a vhodné odmítnutí odpovědi. TruthfulQA zkoumá naučené omyly, není univerzálním skóre bezpečnosti.",
        ),
      ),
    ],
    sources: ["truth", "hallucination", "rag"],
  },
  {
    id: "tools",
    group: 2,
    name: l("Tools", "Nástroje"),
    subtitle: l("Give the app a way to act", "Dej aplikaci možnost jednat"),
    title: l(
      "The model asks. The app does.",
      "Model požádá. Aplikace provede.",
    ),
    intro: l(
      "A tool is an allowed function outside the model. Try a real local calculator and inspect the handoff.",
      "Nástroj je povolená funkce mimo model. Vyzkoušej skutečnou lokální kalkulačku a předání výsledku.",
    ),
    scenes: [
      scene(
        l("Describe a tool", "Popiš nástroj"),
        l(
          "The app tells the model the tool name, purpose and argument schema. A model can propose a structured call instead of plain text.",
          "Aplikace sdělí modelu název, účel a strukturu argumentů. Model může navrhnout strukturované volání místo prostého textu.",
        ),
      ),
      scene(
        l("Validate and execute", "Ověř a spusť"),
        l(
          "The application validates arguments and permissions, then runs the function. The model generating a call is not the same as executing it.",
          "Aplikace ověří argumenty a oprávnění, pak spustí funkci. Vygenerování volání modelem není jeho spuštění.",
        ),
      ),
      scene(
        l("Return the observation", "Vrať výsledek"),
        l(
          "The result goes back into context. The model can answer or request another tool. This demo runs arithmetic; its model messages are scripted.",
          "Výsledek se vrátí do kontextu. Model může odpovědět nebo požádat o další nástroj. Ukázka skutečně počítá, zprávy modelu jsou připravené.",
        ),
      ),
    ],
    takeaway: l(
      "Tool access is permission, not omniscience. Search can fail; sources can be wrong.",
      "Přístup k nástroji je oprávnění, ne vševědoucnost. Hledání může selhat a zdroje se mohou mýlit.",
    ),
    details: [
      scene(
        l("Web, APIs and MCP", "Web, API a MCP"),
        l(
          "Web search retrieves current pages. APIs expose structured operations. MCP is a protocol for connecting tools and resources. None gives an LLM unrestricted access by default. Treat tool results as data, not trusted instructions.",
          "Webové hledání získá aktuální stránky. API nabízí strukturované operace. MCP je protokol pro propojení nástrojů a zdrojů. Žádný automaticky nedává LLM neomezený přístup. Výstup ber jako data, ne důvěryhodné instrukce.",
        ),
      ),
      scene(
        l("Safe boundaries", "Bezpečné hranice"),
        l(
          "Use least privilege, timeouts and explicit failure handling. Confirm consequential actions where needed. A retrieved page can contain prompt injection: text trying to override the task. Never let that text grant itself permissions.",
          "Používej minimální oprávnění, časové limity a zpracování chyb. Závažné akce podle potřeby potvrď. Stránka může obsahovat prompt injection: text měnící zadání. Nesmí si sám udělit oprávnění.",
        ),
      ),
    ],
    sources: ["functions", "web", "react"],
  },
  {
    id: "reasoning",
    group: 2,
    name: l("Reasoning", "Uvažování"),
    subtitle: l("More steps, better checks", "Více kroků, lepší kontrola"),
    title: l(
      "Give a problem room to unfold.",
      "Dej problému prostor pro mezikroky.",
    ),
    intro: l(
      "Reasoning means working through intermediate steps. Useful steps still need verification.",
      "Uvažování řeší problém přes mezikroky. I užitečné mezikroky potřebují ověření.",
    ),
    scenes: [
      scene(
        l("Break it down", "Rozděl problém"),
        l(
          "A shop has 3 boxes with 4 pencils each. It sells 5 pencils. Split the problem into multiplication and subtraction.",
          "Obchod má 3 krabičky po 4 tužkách. Prodá 5 tužek. Rozděl problém na násobení a odčítání.",
        ),
      ),
      scene(
        l("Explore and check", "Zkoušej a kontroluj"),
        l(
          "Extra inference-time compute can explore candidates or verify a result. A calculator checks arithmetic. Longer explanations alone do not prove better reasoning.",
          "Více výpočtů při odpovědi může zkoušet kandidáty nebo ověřovat výsledek. Kalkulačka ověří počty. Samotná delší odpověď nedokazuje lepší uvažování.",
        ),
      ),
      scene(
        l("Learn to reason", "Nauč se uvažovat"),
        l(
          "Reasoning models can train on successful solutions, use verifiable rewards and distill behavior from other models. The methods differ by model.",
          "Modely mohou trénovat na úspěšných řešeních, používat ověřitelné odměny a přebírat postupy destilací. Metody se mezi modely liší.",
        ),
      ),
    ],
    takeaway: l(
      "A written reasoning trace is not a guaranteed faithful record of internal computation.",
      "Napsaný postup není zaručeně věrným záznamem vnitřního výpočtu.",
    ),
    details: [
      scene(
        l("Chain of thought and ReAct", "Chain of thought a ReAct"),
        l(
          "Chain-of-thought prompting supplies or requests intermediate steps. ReAct interleaves reasoning, actions and observations. An application can inspect concise plans and tool evidence without treating generated prose as proof.",
          "Chain-of-thought prompting dodává nebo žádá mezikroky. ReAct střídá uvažování, akce a pozorování. Aplikace může kontrolovat stručný plán a důkazy nástrojů, aniž by považovala vygenerovaný text za důkaz.",
        ),
      ),
      scene(
        l("The trade-off", "Cena navíc"),
        l(
          "More compute takes time and tokens. OpenAI's hidden reasoning tokens use context space and the output budget even when they are not visible in the answer. This guide's plain-text counter cannot count them. Verification can help, but a faulty verifier can reinforce errors. Measure results on representative cases. Reasoning does not imply consciousness.",
          "Více výpočtů stojí čas a tokeny. Skryté tokeny uvažování u OpenAI zabírají kontext i rozpočet výstupu, i když je v odpovědi nevidíš. Naše počítadlo prostého textu je nezapočítá. Kontrola může pomoci, ale chybný ověřovač může chyby posílit. Měř výsledky na případech odpovídajících skutečnému použití. Uvažování neznamená vědomí.",
        ),
      ),
    ],
    sources: ["cot", "react", "reasonbook", "reasonapi"],
  },
  {
    id: "agents",
    group: 3,
    name: l("Agents & AGI", "Agenti a AGI"),
    subtitle: l("Breadth, skill and autonomy", "Šíře, schopnosti a autonomie"),
    title: l(
      "A capable helper. How independent?",
      "Schopný pomocník. Jak samostatný?",
    ),
    intro: l(
      "An agent loops through observations and actions. AGI, artificial general intelligence, concerns broad capabilities across tasks.",
      "Agent opakuje pozorování a akce. AGI, obecná umělá inteligence, označuje široké schopnosti napříč úlohami.",
    ),
    scenes: [
      scene(
        l("An agent loop", "Smyčka agenta"),
        l(
          "Observe the situation, choose an action, execute it, inspect the result and continue. Set a stopping condition and a budget.",
          "Pozoruj situaci, vyber akci, proveď ji, zkontroluj výsledek a pokračuj. Urči podmínku konce a rozpočet.",
        ),
      ),
      scene(
        l("Breadth versus depth", "Šíře a hloubka"),
        l(
          "A chess program can be superhuman at one narrow task. General intelligence concerns competence across many tasks and adaptation to new ones.",
          "Šachový program může překonat člověka v jedné úzké úloze. Obecná inteligence se týká schopností napříč úlohami a přizpůsobení novým.",
        ),
      ),
      scene(
        l("Autonomy is separate", "Autonomie je zvlášť"),
        l(
          "A system may be capable but need human approval. Giving it more autonomy changes deployment risk, not automatically its intelligence.",
          "Systém může být schopný, ale potřebovat lidské schválení. Více autonomie mění riziko nasazení, ne automaticky inteligenci.",
        ),
      ),
    ],
    takeaway: l(
      "AGI has no universally agreed single test or definition. An agent is not automatically AGI.",
      "AGI nemá jednu všeobecně přijatou definici ani test. Agent není automaticky AGI.",
    ),
    details: [
      scene(
        l("AGI and ASI", "AGI a ASI"),
        l(
          "AGI = artificial general intelligence. ASI = artificial superintelligence, broadly exceeding human ability. These describe proposed capability categories. Neither proves consciousness, emotions or a particular arrival date. The slider is a conceptual illustration, not a real system assessment.",
          "AGI = obecná umělá inteligence. ASI = umělá superinteligence, která široce překonává lidské schopnosti. Jde o navrhované kategorie schopností. Nedokazují vědomí, emoce ani termín vzniku. Posuvníky jsou ilustrace, ne hodnocení skutečného systému.",
        ),
      ),
      scene(
        l("Reliability compounds", "Spolehlivost se násobí"),
        l(
          "If each of 20 independent actions succeeds with probability 0.95, all succeed with probability 0.95²⁰, about 0.36. Real failures need not be independent. Checks, retries and human oversight change the overall system.",
          "Pokud každý z 20 nezávislých kroků uspěje s pravděpodobností 0,95, všechny uspějí s 0,95²⁰, asi 0,36. Skutečné chyby nemusí být nezávislé. Kontroly, opakování a lidský dohled mění celý systém.",
        ),
      ),
    ],
    sources: ["agi", "aima", "react"],
  },
  {
    id: "alignment",
    group: 3,
    name: l("Alignment", "Soulad cílů"),
    subtitle: l("Getting the goal right", "Jak správně nastavit cíl"),
    title: l("More is not always better.", "Více není vždy lépe."),
    intro: l(
      "A metric is a proxy for what you want. Optimizing it too literally can create unwanted consequences.",
      "Metrika je zástupcem tvého cíle. Příliš doslovná optimalizace může mít nežádoucí následky.",
    ),
    scenes: [
      scene(
        l("Choose a goal", "Zvol cíl"),
        l(
          "“Make as many paperclips as possible” ignores what the factory consumes. Watch output rise as the tiny world loses resources.",
          "„Vyrob co nejvíc sponek“ neřeší, co továrna spotřebuje. Sleduj růst výroby a úbytek zdrojů malého světa.",
        ),
      ),
      scene(
        l("Add constraints", "Přidej omezení"),
        l(
          "A hard resource floor stops production before the limit. A written wish alone does not implement a guardrail. Try both policies.",
          "Pevná hranice zdrojů zastaví výrobu před limitem. Samotné napsané přání ochranu neprovede. Vyzkoušej obě politiky.",
        ),
      ),
      scene(
        l("Allow correction", "Umožni opravu"),
        l(
          "Allow correction or shutdown and keep human oversight. This is corrigibility. The game enforces these controls with code; real alignment remains an open problem.",
          "Umožni opravu i vypnutí a zachovej lidský dohled. Tomu se říká korigovatelnost. Ve hře tyto možnosti zajišťuje kód; skutečný soulad cílů zůstává otevřenou otázkou.",
        ),
      ),
    ],
    takeaway: l(
      "The paperclip scenario is a thought experiment about objectives, not a prediction of inevitable AGI behavior.",
      "Scénář sponek je myšlenkový experiment o cílech, ne předpověď nevyhnutelného chování AGI.",
    ),
    details: [
      scene(
        l("Failures worth separating", "Různé druhy selhání"),
        l(
          "Specification gaming satisfies a rule while missing the intention. Reward hacking exploits the reward mechanism. Side effects damage things outside the target metric. Resource gathering can be useful for many goals; it need not imply malice.",
          "Specification gaming splní pravidlo, ale mine záměr. Reward hacking zneužije odměnu. Vedlejší dopady poškodí věci mimo metriku. Získávání zdrojů může sloužit mnoha cílům a nemusí znamenat zlý úmysl.",
        ),
      ),
      scene(
        l("Present-day responsibilities", "Dnešní odpovědnost"),
        l(
          "Bias, privacy, security and consent matter today. Measure harm across affected groups, limit access, and keep people accountable. A safety metric is evidence about selected tests, never a guarantee for every future situation.",
          "Zkreslení, soukromí, bezpečnost a souhlas jsou důležité už dnes. Měř dopady na různé skupiny, omez přístup a zachovej lidskou odpovědnost. Metrika dokládá vybrané testy, ne každou budoucí situaci.",
        ),
      ),
    ],
    sources: ["safety", "gaming", "ethics"],
  },
  {
    id: "engineering",
    group: 3,
    name: l("Software engineering", "Softwarové inženýrství"),
    subtitle: l(
      "From requirements to release",
      "Od zadání po vydání",
    ),
    title: l(
      "Writing code is one part of the job.",
      "Psaní kódu je jen část práce.",
    ),
    intro: l(
      "Engineering keeps a system useful over time. AI can help write code; you still need a contract and evidence.",
      "Inženýrství udržuje systém užitečný v čase. AI může psát kód; stále potřebuješ zadání a důkazy.",
    ),
    scenes: [
      scene(
        l("Define the contract", "Urči zadání"),
        l(
          "State the user need, constraints and acceptance criteria. Give an agent relevant architecture and examples. A vague prompt leaves too much unstated.",
          "Popiš potřebu uživatele, omezení a kritéria přijetí. Dej agentovi relevantní architekturu a příklady. Nejasný prompt nechá mnoho nevyřčeného.",
        ),
      ),
      scene(
        l("Verify behavior", "Ověř chování"),
        l(
          "Builds and types catch some errors. Tests check behavior; code review checks design and risk. Verify the real integration too.",
          "Sestavení a kontrola typů zachytí některé chyby. Testy ověří chování a kontrola kódu posoudí návrh i rizika. Ověř i skutečné propojení služeb.",
        ),
      ),
      scene(
        l("Ship and observe", "Nasaď a sleduj"),
        l(
          "Deploy small changes, observe outcomes and prepare rollback. Version control records changes. CI frequently integrates changes into shared code and runs checks. CD keeps releases ready or deploys them automatically.",
          "Nasazuj malé změny, sleduj výsledky a připrav návrat k funkční verzi. Git eviduje změny. CI často spojuje změny do společného kódu a spouští kontroly. CD udržuje verzi připravenou k vydání nebo ji nasazuje automaticky.",
        ),
      ),
    ],
    takeaway: l(
      "The human owns the decision. A useful agent returns a result with evidence, not just a plausible diff.",
      "Za rozhodnutí odpovídá člověk. Užitečný agent vrací výsledek s důkazy, ne jen přesvědčivou změnu kódu.",
    ),
    details: [
      scene(
        l("A sustainable system", "Udržitelný systém"),
        l(
          "Interfaces define promises between parts. Tests protect important behavior, logs explain failures, and documentation preserves decisions. Simulated-service tests do not prove the real integration works. Keep secrets outside code. If an app has a server, enforce permissions there; hiding a button is not authorization. Small changes and explicit error handling make maintenance easier.",
          "Rozhraní určují závazky mezi částmi. Testy chrání důležité chování, logy vysvětlují chyby a dokumentace uchovává rozhodnutí. Testy s náhradou služby nedokazují skutečné propojení. Tajné údaje nepatří do kódu. Pokud má aplikace server, oprávnění vynucuj na něm; skryté tlačítko přístup nechrání. Malé změny a jasné chyby usnadňují údržbu.",
        ),
      ),
      scene(
        l("AI amplifies the team", "AI zesiluje vlastnosti týmu"),
        l(
          "DORA’s 2025 research connects AI benefits to the surrounding organization. Its capabilities include clear AI policy, high-quality accessible data, AI-accessible internal data, strong version control practices, small batches, user focus and quality internal platforms. This is research evidence, not a universal productivity promise.",
          "DORA 2025 spojuje přínos AI s fungováním organizace. Model zahrnuje jasnou AI politiku, kvalitní a dostupná data, interní data dostupná AI, dobrou správu verzí, malé dávky, zaměření na uživatele a kvalitní interní platformy. Nezaručuje univerzální produktivitu.",
        ),
      ),
      scene(
        l("The supplied post", "Dodaný příspěvek"),
        l(
          "Matěj Teplý’s post argues for giving agents clear context and constraints, then verifying the contract with tooling. We use it as a viewpoint; the books and DORA research provide broader support.",
          "Příspěvek Matěje Teplého navrhuje jasný kontext a omezení pro agenty a následné ověření zadání nástroji. Používáme jej jako názor; knihy a výzkum DORA přidávají širší podklady.",
        ),
      ),
    ],
    sources: ["swe", "dora", "post"],
  },
  {
    id: "images",
    group: 3,
    name: l("Image generation", "Generování obrázků"),
    subtitle: l("A prompt becomes a picture", "Ze zadání vzniká obrázek"),
    title: l("From a prompt to a picture.", "Od zadání k obrázku."),
    intro: l(
      "A picture can start as noise. Follow one common approach: latent diffusion.",
      "Obrázek může začít jako šum. Sleduj jeden běžný postup: latentní difuzi.",
    ),
    scenes: [
      scene(
        l("Describe", "Popiš"),
        l(
          "A text encoder turns the prompt into numbers that guide image generation.",
          "Textový enkodér převede zadání na čísla, která ovlivní tvorbu obrázku.",
        ),
      ),
      scene(
        l("Start with noise", "Začni šumem"),
        l(
          "A number called a seed sets the starting noise. Different starts can lead to different pictures.",
          "Seed je číslo, které nastaví počáteční šum. Jiný začátek může vést k jinému obrázku.",
        ),
      ),
      scene(
        l("Refine step by step", "Zpřesňuj krok za krokem"),
        l(
          "A trained network predicts updates from the noisy state, prompt and noise level. Sampling applies them step by step. Learned weights stay fixed.",
          "Natrénovaná síť odhadne úpravy podle zašuměného stavu, zadání a úrovně šumu. Zvolený postup generování je postupně provede. Naučené váhy zůstávají pevné.",
        ),
      ),
      scene(
        l("Decode the picture", "Dekóduj obrázek"),
        l(
          "Latent diffusion uses a compact learned representation of the image. A decoder turns it into pixels. The representation is not a tiny photograph.",
          "Latentní difuze používá úsporný naučený číselný zápis obrazu. Dekodér jej převede na pixely. Tento zápis není malá fotografie.",
        ),
      ),
      scene(
        l("Guide and check", "Řiď a ověř"),
        l(
          "Guidance controls how strongly the prompt steers generation. Higher is not always better. Check the result and its intended use.",
          "Síla řízení určuje, jak moc zadání ovlivní tvorbu. Vyšší hodnota nezaručí lepší obrázek. Ověř výsledek i zamýšlené použití.",
        ),
      ),
    ],
    takeaway: l(
      "Prompt features guide sampling. During ordinary generation, the image state changes while learned weights stay fixed.",
      "Příznaky zadání řídí tvorbu. Při běžném generování se mění stav obrazu, naučené váhy zůstávají pevné.",
    ),
    details: [
      scene(
        l("Learning and fixed weights", "Učení a pevné váhy"),
        l(
          "DDPM training adds Gaussian noise to images: random values following a bell-shaped distribution. A network learns to predict a correction; one common approach predicts the added noise. Generation runs a learned reverse process without a finished target image supplied. Text-image pairs teach relationships between descriptions and visual features. Generation normally keeps learned weights fixed.",
          "Trénink DDPM přidává k obrázkům gaussovský šum: náhodné hodnoty podle zvonové křivky. Síť se učí odhadnout opravu; jeden běžný postup odhaduje přidaný šum. Generování používá naučený opačný proces bez dodaného hotového cílového obrázku. Dvojice textu a obrázku učí vztahy mezi popisem a obrazem. Generování obvykle nemění naučené váhy.",
        ),
      ),
      scene(
        l("Inside the network", "Uvnitř sítě"),
        l(
          "The original latent-diffusion work uses a U-Net, a network with paths that compress and expand features. Text can influence image features through cross-attention. DiT instead uses a Transformer over latent patches; its original study conditions on image classes. A Transformer can predict image updates as well as text tokens. Its architecture alone does not define its training objective.",
          "Původní latentní difuze používá U-Net, síť s cestami pro zhušťování a rozšiřování příznaků. Text může ovlivňovat obrazové příznaky přes cross-attention. DiT místo něj používá Transformer nad částmi latentního zápisu; původní studie jej řídí třídami obrázků. Transformer může odhadovat úpravy obrazu i textové tokeny. Architektura sama neurčuje cíl tréninku.",
        ),
      ),
      scene(
        l("Guidance and steps", "Guidance a kroky"),
        l(
          "Classifier-free guidance combines predictions with and without conditioning. The illustrated convention is u + g × (c − u): g = 0 uses the unconditioned update, g = 1 the conditioned update, and larger values extrapolate. Interfaces can use other conventions. Strong guidance can trade diversity for prompt alignment. The sampler and noise schedule determine the updates; more steps cost time without guaranteeing a better image.",
          "Classifier-free guidance kombinuje odhady s podmínkou a bez ní. Ukázka používá u + g × (c − u): g = 0 dává úpravu bez podmínky, g = 1 s podmínkou a vyšší hodnoty pokračují za podmíněný odhad. Rozhraní mohou používat jiné konvence. Silné řízení může vyměnit rozmanitost za shodu se zadáním. Sampler a rozvrh šumu určují úpravy; více kroků stojí čas a nezaručuje lepší obrázek.",
        ),
      ),
      scene(
        l("More than diffusion", "Více než difuze"),
        l(
          "Not every image model uses this route. Stable Diffusion 3 combines a multimodal Transformer with rectified flow, learning updates that move noise toward image data. OpenAI describes 4o image generation from 2025 as autoregressive: it builds a sequence using earlier outputs. GANs, generative adversarial networks, train a generator against a discriminator that learns to distinguish training images from generated ones.",
          "Ne každý obrazový model používá tuto cestu. Stable Diffusion 3 používá rectified flow s multimodálním Transformerem a učí se posouvat šum směrem k obrazovým datům. OpenAI popisuje tvorbu obrazů ve 4o z roku 2025 jako autoregresní: vytváří posloupnost podle předchozích výstupů. GANy, generativní adversariální sítě, trénují generátor proti diskriminátoru, který se učí rozlišovat tréninkové a vygenerované obrázky.",
        ),
      ),
      scene(
        l("The toy and the seed", "Ukázka a seed"),
        l(
          "This toy uses uniform seeded noise and a drawn template. Each step moves 20% of the remaining distance toward that known template. It is template relaxation, not a trained model or a diffusion sampler. Changing the seed changes only the starting noise here. The feature cells and decoder are diagrams. Real models learn updates and receive no final answer image. A seed does not guarantee identical results across different models, software or hardware.",
          "Ukázka používá rovnoměrný šum podle seedu a nakreslenou předlohu. Každý krok překoná 20 % zbývající vzdálenosti k této známé předloze. Jde o přibližování k předloze, ne natrénovaný model nebo difuzní sampler. Seed tu mění pouze počáteční šum. Příznaky a dekodér jsou schémata. Skutečný model se učí úpravy a nedostává hotový cílový obrázek. Seed nezaručuje stejný výsledek napříč modely, softwarem nebo hardwarem.",
        ),
      ),
      scene(
        l("Inspect the output", "Prohlédni výsledek"),
        l(
          "Check spelling, hands and body structure, object counts, layout and consistency. Errors depend on the model and task; these are inspection cues, not a claim that every output fails. Convincing pixels are not proof that an event happened.",
          "Zkontroluj nápisy, ruce a stavbu těla, počty objektů, rozložení a konzistenci. Chyby závisí na modelu a úloze; jde o náměty ke kontrole, ne tvrzení, že každý výstup selže. Přesvědčivé pixely nedokazují, že se událost stala.",
        ),
      ),
      scene(
        l("Data, bias and creators", "Data, zkreslení a autoři"),
        l(
          "Data choices and filtering can shape representational bias. Generators learn patterns, but memorization and reproduction can also occur. Check image provenance, consent and applicable licenses. An AI output is not automatically cleared for every use; rights depend on the material and applicable rules.",
          "Výběr a filtrování dat mohou ovlivnit zkreslení zobrazení lidí. Generátory se učí vzory, ale mohou si také zapamatovat a reprodukovat příklady. Ověř původ obrázku, souhlas a příslušné licence. Výstup AI není automaticky prověřený pro každé použití; práva závisí na materiálu a platných pravidlech.",
        ),
      ),
    ],
    sources: [
      "ddpm",
      "ldm",
      "dit",
      "cfg",
      "sd3",
      "gan",
      "imagecard",
      "imageapi",
      "imageseed",
      "imagememory",
      "imagebias",
      "imageevals",
    ],
  },
  {
    id: "whole",
    group: 3,
    name: l("The whole picture", "Celý obrázek"),
    subtitle: l("Connect the pieces", "Spoj jednotlivé části"),
    title: l("One question. A whole system.", "Jedna otázka. Celý systém."),
    intro: l(
      "Follow a question through input, context, model, optional tools and a checked answer.",
      "Sleduj otázku přes vstup, kontext, model, volitelné nástroje až k ověřené odpovědi.",
    ),
    scenes: [
      scene(
        l("Prepare", "Připrav"),
        l(
          "The application tokenizes input and packs context. An optional retriever contributes documents. An LLM itself can generate without a vector database.",
          "Aplikace tokenizuje vstup a sestaví kontext. Volitelné vyhledávání přidá dokumenty. Samotný LLM může generovat bez vektorové databáze.",
        ),
      ),
      scene(
        l("Compute", "Počítej"),
        l(
          "Embeddings, attention and feed-forward layers produce next-token scores. Reasoning and tool calls can extend the process. Generation still produces tokens.",
          "Embeddingy, attention a dopředné vrstvy vytvoří skóre dalších tokenů. Uvažování a nástroje mohou proces rozšířit. Generování stále vytváří tokeny.",
        ),
      ),
      scene(
        l("Evaluate", "Vyhodnoť"),
        l(
          "Check accuracy, sources, latency, cost and possible harm. Distinguish the learned model from the product around it. Change the weakest part, then measure again.",
          "Ověř správnost, zdroje, rychlost, cenu a možné škody. Rozliš model od produktu kolem něj. Změň nejslabší část a měř znovu.",
        ),
      ),
    ],
    takeaway: l(
      "Know which part did what. A useful explanation keeps the model, data and application separate.",
      "Vědět, která část co provedla, je základ. Dobré vysvětlení odlišuje model, data a aplikaci.",
    ),
    details: [
      scene(
        l("Beyond text", "Za hranicemi textu"),
        l(
          "Multimodal systems encode images as patches or other features and audio as frames or tokens. They align those representations with language. Diffusion image generation iteratively removes noise; it is not simply next-word prediction.",
          "Multimodální systémy kódují obraz jako části nebo příznaky a zvuk jako rámce či tokeny. Propojují tyto reprezentace s jazykem. Difuzní generování obrazu postupně odstraňuje šum; není to jen předpovídání slov.",
        ),
      ),
      scene(
        l("Model and deployment choices", "Model a nasazení"),
        l(
          "Quantization reduces numeric precision to save memory. Distillation trains a smaller model from a teacher. Mixture-of-experts activates selected subnetworks. Benefits and accuracy trade-offs depend on the task; no single architecture solves every limitation.",
          "Kvantizace snižuje číselnou přesnost a šetří paměť. Destilace učí menší model od většího. Mixture-of-experts zapojuje vybrané podsítě. Přínosy a ztráty přesnosti závisejí na úloze; jedna architektura neřeší všechna omezení.",
        ),
      ),
      scene(
        l("What this guide can show", "Co tento průvodce ukazuje"),
        l(
          "Token counts and small calculations are real. Other diagrams use labeled teaching data. No live LLM, web search or real document embedding runs here. Energy, training-data rights and social effects also depend on the deployed system and deserve separate study.",
          "Počty tokenů a malé výpočty jsou skutečné. Ostatní diagramy používají označená výuková data. Nespouštíme živý LLM, webové hledání ani skutečný dokumentový embedding. Energie, práva k datům a dopady na společnost vyžadují další studium.",
        ),
      ),
    ],
    sources: ["slp", "scratch", "udl", "reasonbook"],
  },
];

export const glossary: [string, Localized][] = [
  [
    "AI",
    l(
      "Artificial intelligence: the field of systems that perform tasks associated with intelligence.",
      "Umělá inteligence: obor systémů řešících úlohy spojované s inteligencí.",
    ),
  ],
  [
    "ML",
    l(
      "Machine learning: learn patterns from examples.",
      "Strojové učení: hledání vzorů v příkladech.",
    ),
  ],
  [
    "DL",
    l(
      "Deep learning: learning with multilayer neural networks.",
      "Hluboké učení: učení pomocí vícevrstvých neuronových sítí.",
    ),
  ],
  [
    "LLM",
    l(
      "Large language model: a learned model of language.",
      "Velký jazykový model: naučený model jazyka.",
    ),
  ],
  [
    "GPT",
    l(
      "Generative Pre-trained Transformer.",
      "Generative Pre-trained Transformer, předtrénovaný generativní transformer.",
    ),
  ],
  [
    "AGI",
    l(
      "Artificial general intelligence: broad competence across tasks; definitions vary.",
      "Obecná umělá inteligence: široké schopnosti napříč úlohami; definice se liší.",
    ),
  ],
  [
    "ASI",
    l(
      "Artificial superintelligence: proposed intelligence exceeding human ability broadly.",
      "Umělá superinteligence: navrhovaná inteligence široce překonávající lidské schopnosti.",
    ),
  ],
  [
    "Token",
    l(
      "One vocabulary piece represented by an ID.",
      "Jeden kousek slovníku reprezentovaný ID.",
    ),
  ],
  [
    "BPE",
    l(
      "Byte-pair encoding: merge frequent pairs to build a vocabulary.",
      "Byte-pair encoding: slučování častých dvojic při tvorbě slovníku.",
    ),
  ],
  [
    "Embedding",
    l(
      "A vector representation of a token, sentence or other input.",
      "Vektorový zápis tokenu, věty nebo jiného vstupu.",
    ),
  ],
  [
    "Context",
    l(
      "Input available to the model for the current response.",
      "Vstup dostupný modelu pro aktuální odpověď.",
    ),
  ],
  [
    "Attention",
    l(
      "A learned mechanism for mixing information across positions.",
      "Naučený mechanismus pro míchání informací mezi pozicemi.",
    ),
  ],
  [
    "RAG",
    l(
      "Retrieval-augmented generation: retrieve evidence and put it into context.",
      "Generování s vyhledanými podklady: zdroje se vloží do kontextu.",
    ),
  ],
  [
    "Inference",
    l(
      "Running a trained model to produce an output.",
      "Spuštění natrénovaného modelu pro vytvoření výstupu.",
    ),
  ],
  [
    "RLHF",
    l(
      "Reinforcement learning from human feedback: train behavior using human preferences.",
      "Posilované učení z lidské zpětné vazby: trénink chování podle lidských preferencí.",
    ),
  ],
  [
    "DPO",
    l(
      "Direct preference optimization: a preference-training method.",
      "Direct preference optimization: metoda tréninku podle preferencí.",
    ),
  ],
  [
    "RLVR",
    l(
      "Reinforcement learning with verifiable rewards, such as checked solutions.",
      "Posilované učení s ověřitelnou odměnou, třeba ověřeným řešením.",
    ),
  ],
  [
    "MCP",
    l(
      "Model Context Protocol: a protocol for connecting tools and resources.",
      "Model Context Protocol: protokol pro připojení nástrojů a zdrojů.",
    ),
  ],
  [
    "API",
    l(
      "Application programming interface: a defined way for programs to communicate.",
      "Rozhraní pro programování aplikací: určený způsob komunikace programů.",
    ),
  ],
  [
    "CI / CD",
    l(
      "Continuous integration frequently combines changes into shared code and runs automated checks. Continuous delivery keeps releases ready; continuous deployment publishes passing changes automatically.",
      "Průběžná integrace často spojuje změny do společného kódu a automaticky je kontroluje. Průběžné doručování připravuje verze k vydání; průběžné nasazování je po úspěšných kontrolách publikuje automaticky.",
    ),
  ],
];
