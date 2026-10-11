import type { ComponentType } from "react";
import type { DemoProps } from "../components";
import { AIDemo, LearningDemo, NeuralDemo, TokensDemo } from "./Foundations";
import {
  AttentionDemo,
  ContextDemo,
  EmbeddingsDemo,
  PredictionDemo,
} from "./Inside";
import {
  HallucinationsDemo,
  ReasoningDemo,
  RetrievalDemo,
  ToolsDemo,
} from "./Beyond";
import {
  AgentsDemo,
  AlignmentDemo,
  EngineeringDemo,
  WholeDemo,
} from "./Picture";

const demos: Record<string, ComponentType<DemoProps>> = {
  ai: AIDemo,
  neural: NeuralDemo,
  learning: LearningDemo,
  tokens: TokensDemo,
  embeddings: EmbeddingsDemo,
  attention: AttentionDemo,
  prediction: PredictionDemo,
  context: ContextDemo,
  retrieval: RetrievalDemo,
  hallucinations: HallucinationsDemo,
  tools: ToolsDemo,
  reasoning: ReasoningDemo,
  agents: AgentsDemo,
  alignment: AlignmentDemo,
  engineering: EngineeringDemo,
  whole: WholeDemo,
};
export function Demo({ id, ...props }: DemoProps & { id: string }) {
  const Component = demos[id];
  return Component ? <Component {...props} /> : null;
}
