import type { TiktokenBPE } from "js-tiktoken/lite";

export type TokenBytes = {
  get(id: number): Uint8Array | undefined;
};

export function tokenBytes(ranks: TiktokenBPE): TokenBytes {
  const lines = ranks.bpe_ranks.split("\n").filter(Boolean);
  let maxId = -1;
  let byteCount = 0;
  for (const line of lines) {
    const [, start, ...tokens] = line.split(" ");
    maxId = Math.max(maxId, Number(start) + tokens.length - 1);
    for (const token of tokens) {
      byteCount +=
        Math.floor((token.length * 3) / 4) -
        (token.endsWith("==") ? 2 : token.endsWith("=") ? 1 : 0);
    }
  }
  const data = new Uint8Array(byteCount);
  const bounds = new Uint32Array((maxId + 1) * 2).fill(0xffffffff);
  let position = 0;
  for (const line of lines) {
    const [, start, ...tokens] = line.split(" ");
    for (let i = 0; i < tokens.length; i++) {
      const index = (Number(start) + i) * 2;
      const decoded = atob(tokens[i]);
      bounds[index] = position;
      for (let j = 0; j < decoded.length; j++) {
        data[position++] = decoded.charCodeAt(j);
      }
      bounds[index + 1] = position;
    }
  }
  return {
    get(id: number) {
      const index = id * 2;
      if (
        !Number.isInteger(id) ||
        id < 0 ||
        index >= bounds.length ||
        bounds[index] === 0xffffffff
      ) {
        return undefined;
      }
      return data.subarray(bounds[index], bounds[index + 1]);
    },
  };
}
