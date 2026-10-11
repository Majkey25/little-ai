import { Tiktoken } from "js-tiktoken/lite";
import type { TiktokenBPE } from "js-tiktoken/lite";
import { tokenBytes } from "./tokenBytes";

export type Encoding = "cl100k_base" | "o200k_base";
export type TokenRequest = {
  request: number;
  encoding: Encoding;
  input: string;
};
export type TokenResponse = {
  request: number;
  ids: number[];
  pieces: string[];
  bytes: string[];
  error?: string;
};
const cache = new Map<
  Encoding,
  Promise<{ encoder: Tiktoken; bytes: Map<number, Uint8Array> }>
>();

async function load(encoding: Encoding) {
  const cached = cache.get(encoding);
  if (cached) return cached;
  const pending = (async () => {
    const ranks: TiktokenBPE =
      encoding === "cl100k_base"
        ? (await import("js-tiktoken/ranks/cl100k_base")).default
        : (await import("js-tiktoken/ranks/o200k_base")).default;
    return { encoder: new Tiktoken(ranks), bytes: tokenBytes(ranks) };
  })();
  cache.set(encoding, pending);
  void pending.catch(() => cache.delete(encoding));
  return pending;
}

self.onmessage = async (event: MessageEvent<TokenRequest>) => {
  const { request, encoding, input } = event.data;
  try {
    if (
      !["cl100k_base", "o200k_base"].includes(encoding) ||
      typeof input !== "string" ||
      input.length > 3000
    ) {
      throw new Error("Invalid tokenizer request.");
    }
    const { encoder, bytes } = await load(encoding);
    const ids = encoder.encode(input, [], []);
    const decoder = new TextDecoder();
    const response: TokenResponse = {
      request,
      ids,
      pieces: ids.map((id) => decoder.decode(bytes.get(id))),
      bytes: ids.map((id) =>
        [...(bytes.get(id) ?? [])]
          .map((byte) => byte.toString(16).padStart(2, "0"))
          .join(" "),
      ),
    };
    self.postMessage(response);
  } catch (error) {
    self.postMessage({
      request,
      ids: [],
      pieces: [],
      bytes: [],
      error: error instanceof Error ? error.message : "Tokenizer failed.",
    } satisfies TokenResponse);
  }
};
