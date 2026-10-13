import { Component, lazy, Suspense, useEffect, type ComponentType, type ReactNode } from "react";
import { l, text, type Lang } from "../content";
import type { DemoProps } from "../components";

const demos: Record<string, ComponentType<DemoProps>> = {
  ai: lazy(() => import("./Foundations").then((m) => ({ default: m.AIDemo }))),
  neural: lazy(() => import("./Foundations").then((m) => ({ default: m.NeuralDemo }))),
  learning: lazy(() => import("./Foundations").then((m) => ({ default: m.LearningDemo }))),
  tokens: lazy(() => import("./Foundations").then((m) => ({ default: m.TokensDemo }))),
  embeddings: lazy(() => import("./Inside").then((m) => ({ default: m.EmbeddingsDemo }))),
  attention: lazy(() => import("./Inside").then((m) => ({ default: m.AttentionDemo }))),
  prediction: lazy(() => import("./Inside").then((m) => ({ default: m.PredictionDemo }))),
  context: lazy(() => import("./Inside").then((m) => ({ default: m.ContextDemo }))),
  retrieval: lazy(() => import("./Beyond").then((m) => ({ default: m.RetrievalDemo }))),
  hallucinations: lazy(() => import("./Beyond").then((m) => ({ default: m.HallucinationsDemo }))),
  tools: lazy(() => import("./Beyond").then((m) => ({ default: m.ToolsDemo }))),
  reasoning: lazy(() => import("./Beyond").then((m) => ({ default: m.ReasoningDemo }))),
  agents: lazy(() => import("./Picture").then((m) => ({ default: m.AgentsDemo }))),
  alignment: lazy(() => import("./Picture").then((m) => ({ default: m.AlignmentDemo }))),
  engineering: lazy(() => import("./Picture").then((m) => ({ default: m.EngineeringDemo }))),
  whole: lazy(() => import("./Picture").then((m) => ({ default: m.WholeDemo }))),
  images: lazy(() => import("./Images").then((m) => ({ default: m.ImagesDemo }))),
};

class DemoBoundary extends Component<
  { lang: Lang; children: ReactNode; onReady: (ready: boolean) => void },
  { failed: boolean }
> {
  state = { failed: false };
  static getDerivedStateFromError() {
    return { failed: true };
  }
  componentDidCatch() {
    this.props.onReady(false);
  }
  render() {
    if (!this.state.failed) return this.props.children;
    return (
      <div className="storage-message" role="alert">
        <p>{text(l("This scene could not load. Check your connection and reload.", "Scéna se nenačetla. Zkontroluj připojení a načti stránku znovu."), this.props.lang)}</p>
        <button className="small-button" onClick={() => window.location.reload()}>
          {text(l("Reload chapter", "Načíst kapitolu znovu"), this.props.lang)}
        </button>
      </div>
    );
  }
}

function Ready({ onReady, children }: { onReady: (ready: boolean) => void; children: ReactNode }) {
  useEffect(() => {
    onReady(true);
    return () => onReady(false);
  }, [onReady]);
  return children;
}

export function Demo({ id, onReady, ...props }: DemoProps & { id: string; onReady: (ready: boolean) => void }) {
  const Scene = demos[id];
  if (!Scene) return null;
  return (
    <DemoBoundary key={id} lang={props.lang} onReady={onReady}>
      <Suspense fallback={<p role="status">{text(l("Loading the scene…", "Načítám scénu…"), props.lang)}</p>}>
        <Ready onReady={onReady}><Scene {...props} /></Ready>
      </Suspense>
    </DemoBoundary>
  );
}
