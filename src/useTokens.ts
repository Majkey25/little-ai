import { useEffect, useRef, useState } from "react";
import type { Encoding, TokenRequest, TokenResponse } from "./tokenizer";

export function useTokens(
  input: string,
  encoding: Encoding = "cl100k_base",
  details = true,
) {
  const [completed, setCompleted] = useState<{
    input: string;
    encoding: Encoding;
    details: boolean;
    response: TokenResponse;
  } | null>(null);
  const [failure, setFailure] = useState<TokenResponse | null>(null);
  const worker = useRef<Worker | null>(null);
  const counter = useRef(0);
  const submitted = useRef({ input, encoding, details });
  useEffect(() => {
    const fail = () => {
      worker.current?.terminate();
      worker.current = null;
      setFailure({
        request: counter.current,
        ids: [],
        pieces: [],
        bytes: [],
        error: "Tokenizer worker could not load.",
      });
    };
    let instance: Worker;
    try {
      instance = new Worker(
        new URL("./tokenizer.worker.ts", import.meta.url),
        { type: "module" },
      );
    } catch {
      fail();
      return;
    }
    worker.current = instance;
    instance.onmessage = (event: MessageEvent<TokenResponse>) => {
      if (
        worker.current === instance &&
        event.data.request === counter.current
      ) {
        setCompleted({ ...submitted.current, response: event.data });
      }
    };
    instance.onerror = () => {
      if (worker.current === instance) fail();
    };
    return () => {
      instance.terminate();
      if (worker.current === instance) worker.current = null;
    };
  }, []);
  useEffect(() => {
    if (!worker.current) return;
    counter.current += 1;
    submitted.current = { input, encoding, details };
    worker.current.postMessage({
      request: counter.current,
      input,
      encoding,
      details,
    } satisfies TokenRequest);
  }, [input, encoding, details]);
  const current = completed?.input === input &&
    completed.encoding === encoding && completed.details === details;
  return {
    result: failure ?? (current ? completed.response : null),
    loading: !failure && !current,
  };
}
