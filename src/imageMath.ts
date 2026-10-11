export const IMAGE_STEPS = 24;
export const TEMPLATE_RATE = 0.2;
export type UpdateVector = readonly [number, number];

export function seededNoise(seed: number, count: number): number[] {
  if (
    !Number.isInteger(seed) ||
    seed < 0 ||
    seed > 0xffffffff ||
    !Number.isInteger(count) ||
    count < 1 ||
    count > 4096
  ) {
    throw new RangeError(
      "Noise needs an unsigned 32-bit seed and 1–4096 values.",
    );
  }
  let state = seed;
  return Array.from({ length: count }, () => {
    state = (Math.imul(state, 1664525) + 1013904223) >>> 0;
    return state / 0x100000000;
  });
}

// A known-template relaxation, not a learned denoiser or diffusion sampler.
export function relaxTemplate(
  initial: readonly number[],
  template: readonly number[],
  steps: number,
): number[] {
  if (
    !Number.isInteger(steps) ||
    steps < 0 ||
    steps > IMAGE_STEPS ||
    initial.length < 1 ||
    initial.length > 4096 ||
    initial.length !== template.length ||
    !initial.every(
      (value) => Number.isFinite(value) && value >= 0 && value <= 1,
    ) ||
    !template.every(
      (value) => Number.isFinite(value) && value >= 0 && value <= 1,
    )
  ) {
    throw new RangeError(
      "Relaxation needs equal bounded fields and 0–24 whole steps.",
    );
  }
  if (steps === 0) return [...initial];
  const remaining = (1 - TEMPLATE_RATE) ** steps;
  return initial.map(
    (value, i) => template[i] + (value - template[i]) * remaining,
  );
}

export function guidedUpdate(
  unconditioned: UpdateVector,
  conditioned: UpdateVector,
  strength: number,
): [number, number] {
  if (
    !Number.isFinite(strength) ||
    strength < 0 ||
    strength > 3 ||
    !unconditioned.every(Number.isFinite) ||
    !conditioned.every(Number.isFinite)
  ) {
    throw new RangeError(
      "Guidance needs finite vectors and strength from 0 to 3.",
    );
  }
  return [
    unconditioned[0] + strength * (conditioned[0] - unconditioned[0]),
    unconditioned[1] + strength * (conditioned[1] - unconditioned[1]),
  ];
}
