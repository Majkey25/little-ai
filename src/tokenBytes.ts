import type { TiktokenBPE } from "js-tiktoken/lite";

export function tokenBytes(ranks: TiktokenBPE): Map<number, Uint8Array> {
  const bytes = new Map<number, Uint8Array>();
  // Compact rank format: byte length, starting rank, base64 tokens.
  for (const line of ranks.bpe_ranks.split("\n").filter(Boolean)) {
    const [, start, ...tokens] = line.split(" ");
    tokens.forEach((token, i) =>
      bytes.set(
        Number(start) + i,
        Uint8Array.from(atob(token), (char) => char.charCodeAt(0)),
      ),
    );
  }
  return bytes;
}
