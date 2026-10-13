import { Tiktoken } from "js-tiktoken/lite";
import type { TiktokenBPE } from "js-tiktoken/lite";
import { tokenBytes, type TokenBytes } from "./tokenBytes.ts";

export type Encoding = "cl100k_base" | "o200k_base";
export type TokenRequest = {
  request: number;
  encoding: Encoding;
  input: string;
  details?: boolean;
};
export type TokenResponse = {
  request: number;
  ids: number[];
  pieces: string[];
  bytes: string[];
  error?: string;
};
type LoadedEncoding = {
  encoder: Tiktoken;
  ranks: TiktokenBPE;
  bytes?: TokenBytes;
};
const cache = new Map<Encoding, Promise<LoadedEncoding>>();

async function load(encoding: Encoding): Promise<LoadedEncoding> {
  const cached = cache.get(encoding);
  if (cached) return cached;
  const pending = (async () => {
    const ranks: TiktokenBPE =
      encoding === "cl100k_base"
        ? (await import("js-tiktoken/ranks/cl100k_base")).default
        : (await import("js-tiktoken/ranks/o200k_base")).default;
    return { encoder: new Tiktoken(ranks), ranks };
  })();
  cache.set(encoding, pending);
  void pending.catch(() => cache.delete(encoding));
  return pending;
}

export async function tokenize(message: TokenRequest): Promise<TokenResponse> {
  const { request, encoding, input, details = true } = message;
  try {
    if (
      !["cl100k_base", "o200k_base"].includes(encoding) ||
      typeof input !== "string" ||
      input.length > 3000 ||
      typeof details !== "boolean"
    ) {
      throw new Error("Invalid tokenizer request.");
    }
    const loaded = await load(encoding);
    const ids = loaded.encoder.encode(input, [], []);
    if (!details || !ids.length) {
      return { request, ids, pieces: [], bytes: [] };
    }
    const bytes = (loaded.bytes ??= tokenBytes(loaded.ranks));
    const decoder = new TextDecoder("utf-8", { ignoreBOM: true });
    return {
      request,
      ids,
      pieces: ids.map((id) => decoder.decode(bytes.get(id))),
      bytes: ids.map((id) =>
        [...(bytes.get(id) ?? [])]
          .map((byte) => byte.toString(16).padStart(2, "0"))
          .join(" "),
      ),
    };
  } catch (error) {
    return {
      request,
      ids: [],
      pieces: [],
      bytes: [],
      error: error instanceof Error ? error.message : "Tokenizer failed.",
    };
  }
}
