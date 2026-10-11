import { useEffect, useRef, useState } from "react";
import type { Encoding, TokenRequest, TokenResponse } from "./tokenizer.worker";

export function useTokens(input: string, encoding: Encoding = "cl100k_base") {
  const [result, setResult] = useState<TokenResponse | null>(null);
  const [loading, setLoading] = useState(true);
  const worker = useRef<Worker | null>(null);
  const counter = useRef(0);
  useEffect(() => {
    const instance = new Worker(
      new URL("./tokenizer.worker.ts", import.meta.url),
      { type: "module" },
    );
    worker.current = instance;
    instance.onmessage = (event: MessageEvent<TokenResponse>) => {
      if (event.data.request === counter.current) {
        setResult(event.data);
        setLoading(false);
      }
    };
    instance.onerror = () => {
      setResult({
        request: counter.current,
        ids: [],
        pieces: [],
        bytes: [],
        error: "Tokenizer worker could not load.",
      });
      setLoading(false);
    };
    return () => {
      instance.terminate();
      worker.current = null;
    };
  }, []);
  useEffect(() => {
    counter.current += 1;
    setLoading(true);
    worker.current?.postMessage({
      request: counter.current,
      input,
      encoding,
    } satisfies TokenRequest);
  }, [input, encoding]);
  return { result, loading };
}
