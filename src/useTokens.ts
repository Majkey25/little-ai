import { useEffect, useRef, useState } from "react";
import type { Encoding, TokenRequest, TokenResponse } from "./tokenizer";

export function useTokens(
  input: string,
  encoding: Encoding = "cl100k_base",
  details = true,
) {
  const [result, setResult] = useState<TokenResponse | null>(null);
  const [loading, setLoading] = useState(true);
  const worker = useRef<Worker | null>(null);
  const counter = useRef(0);
  useEffect(() => {
    const fail = () => {
      worker.current?.terminate();
      worker.current = null;
      setResult({
        request: counter.current,
        ids: [],
        pieces: [],
        bytes: [],
        error: "Tokenizer worker could not load.",
      });
      setLoading(false);
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
        setResult(event.data);
        setLoading(false);
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
    setLoading(true);
    worker.current.postMessage({
      request: counter.current,
      input,
      encoding,
      details,
    } satisfies TokenRequest);
  }, [input, encoding, details]);
  return { result, loading };
}
