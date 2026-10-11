import { tokenize, type TokenRequest } from "./tokenizer";
export type { Encoding, TokenRequest, TokenResponse } from "./tokenizer";

self.onmessage = async (event: MessageEvent<TokenRequest>) => {
  self.postMessage(await tokenize(event.data));
};
