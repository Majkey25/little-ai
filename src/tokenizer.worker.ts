import { tokenize, type TokenRequest } from "./tokenizer";
export type { Encoding, TokenRequest, TokenResponse } from "./tokenizer";

let pending: TokenRequest | null = null;
let running = false;

async function drain() {
  running = true;
  try {
    while (pending) {
      const message = pending;
      pending = null;
      self.postMessage(await tokenize(message));
    }
  } finally {
    running = false;
  }
}

self.onmessage = (event: MessageEvent<TokenRequest>) => {
  pending = event.data;
  if (!running) void drain();
};
