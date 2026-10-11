export function sigmoid(value: number): number {
  return 1 / (1 + Math.exp(-value));
}

export function softmax(scores: readonly number[], temperature = 1): number[] {
  if (
    !scores.length ||
    !Number.isFinite(temperature) ||
    temperature <= 0 ||
    scores.some((x) => !Number.isFinite(x))
  ) {
    throw new Error("Softmax needs finite scores and a positive temperature.");
  }
  const max = Math.max(...scores);
  const exp = scores.map((x) => Math.exp((x - max) / temperature));
  const sum = exp.reduce((a, b) => a + b, 0);
  return exp.map((x) => x / sum);
}

export function cosine(a: readonly number[], b: readonly number[]): number {
  if (
    !a.length ||
    a.length !== b.length ||
    [...a, ...b].some((x) => !Number.isFinite(x))
  ) {
    throw new Error(
      "Vectors must have the same nonzero dimension and finite values.",
    );
  }
  const norm = Math.hypot(...a) * Math.hypot(...b);
  if (!norm) return 0;
  return a.reduce((sum, x, i) => sum + x * b[i], 0) / norm;
}

export type Weights = [number, number, number];
export const orExamples: [number, number, number][] = [
  [0, 0, 0],
  [0, 1, 1],
  [1, 0, 1],
  [1, 1, 1],
];
export function predict(weights: Weights, x: number, y: number): number {
  return sigmoid(weights[0] * x + weights[1] * y + weights[2]);
}
export function loss(weights: Weights): number {
  return (
    orExamples.reduce((total, [x, y, target]) => {
      const p = Math.min(1 - 1e-10, Math.max(1e-10, predict(weights, x, y)));
      return total - target * Math.log(p) - (1 - target) * Math.log(1 - p);
    }, 0) / orExamples.length
  );
}
export function train(weights: Weights, steps: number, rate: number): Weights {
  if (
    !Number.isInteger(steps) ||
    steps < 0 ||
    steps > 1000 ||
    !Number.isFinite(rate) ||
    rate <= 0 ||
    rate > 2
  ) {
    throw new Error(
      "Training steps or learning rate are outside the teaching model limits.",
    );
  }
  let next: Weights = [...weights];
  for (let i = 0; i < steps; i++) {
    const gradient: Weights = [0, 0, 0];
    for (const [x, y, target] of orExamples) {
      const error = predict(next, x, y) - target;
      gradient[0] += (error * x) / 4;
      gradient[1] += (error * y) / 4;
      gradient[2] += error / 4;
    }
    next = next.map((x, j) => x - rate * gradient[j]) as Weights;
  }
  return next;
}

export const attentionVectors = [
  [1, 0],
  [0.4, 0.8],
  [0.9, 0.7],
  [1.2, 0.2],
  [0.3, 1.1],
];
export function attentionRow(position: number): number[] {
  const query = attentionVectors[position];
  if (!query) throw new Error("Unknown attention position.");
  const scores = attentionVectors
    .slice(0, position + 1)
    .map((key) => (query[0] * key[0] + query[1] * key[1]) / Math.sqrt(2));
  return [
    ...softmax(scores),
    ...Array<number>(attentionVectors.length - position - 1).fill(0),
  ];
}

export const documents = [
  {
    id: "cz",
    country: "CZ",
    vector: [0.98, 0.16, 0.07],
    en: "Prague is the capital of Czechia.",
    cs: "Praha je hlavní město České republiky.",
    origin: "czechia.txt · §1",
    capital: { en: "Prague", cs: "Praha" },
  },
  {
    id: "fr",
    country: "FR",
    vector: [0.91, 0.3, 0.08],
    en: "Paris is the capital of France.",
    cs: "Paříž je hlavní město Francie.",
    origin: "france.txt · §1",
    capital: { en: "Paris", cs: "Paříž" },
  },
  {
    id: "de",
    country: "DE",
    vector: [0.84, 0.4, 0.16],
    en: "Berlin is the capital of Germany.",
    cs: "Berlín je hlavní město Německa.",
    origin: "germany.txt · §1",
    capital: { en: "Berlin", cs: "Berlín" },
  },
  {
    id: "cake",
    country: "",
    vector: [0.1, 0.2, 0.98],
    en: "Bake a cake with flour and eggs.",
    cs: "Upeč koláč z mouky a vajec.",
    origin: "recipes.txt · §2",
    capital: { en: "", cs: "" },
  },
];
export const queryVectors: Record<string, number[]> = {
  CZ: [0.96, 0.13, 0.1],
  FR: [0.88, 0.32, 0.12],
  DE: [0.79, 0.43, 0.17],
};
export function retrieve(
  country: string,
  includeCzechia: boolean,
  filterCountry: boolean,
) {
  const query = queryVectors[country];
  if (!query) throw new Error("Unknown teaching query.");
  return documents
    .filter(
      (d) =>
        (includeCzechia || d.id !== "cz") &&
        (!filterCountry || d.country === country),
    )
    .map((d) => ({ ...d, score: cosine(query, d.vector) }))
    .sort((a, b) => b.score - a.score);
}
