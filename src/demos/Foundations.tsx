import { useState } from "react";
import { l, text } from "../content";
import {
  Flow,
  Network,
  Note,
  Slider,
  LineChart,
  type DemoProps,
} from "../components";
import {
  sigmoid,
  train,
  loss,
  predict,
  orExamples,
  type Weights,
} from "../math";
import { useTokens } from "../useTokens";
import type { Encoding } from "../tokenizer.worker";

export function AIDemo({ lang }: DemoProps) {
  const [light, setLight] = useState(0);
  const [level, setLevel] = useState(0);
  const names = [
    l("Artificial intelligence", "Umělá inteligence"),
    l("Machine learning", "Strojové učení"),
    l("Deep learning", "Hluboké učení"),
    l("Large language models", "Velké jazykové modely"),
  ];
  const short = ["AI", "ML", "DL", "LLM"];
  const ring = (i: number) =>
    `map-ring ring-${short[i].toLowerCase()} ${level === i ? "active" : ""}`;
  return (
    <div className="demo ai-demo">
      <div className="ai-map">
        <div className={ring(0)}>
          AI
          <div className={ring(1)}>
            ML
            <div className={ring(2)}>
              DL<div className={ring(3)}>LLM</div>
            </div>
          </div>
        </div>
      </div>
      <div className="demo-controls">
        <div className="option-list">
          {names.map((name, i) => (
            <button
              key={i}
              className={level === i ? "selected" : ""}
              onClick={() => setLevel(i)}
            >
              <span className={`circle color-${i}`}>{short[i]}</span>
              {text(name, lang)}
            </button>
          ))}
        </div>
        <p>
          {text(
            [
              l(
                "Planning a route, following a strategy, or learning from examples.",
                "Plánování cesty, volba strategie nebo učení z příkladů.",
              ),
              l(
                "Examples teach a model. People still choose the data and objective.",
                "Příklady učí model. Člověk stále vybírá data a cíl.",
              ),
              l(
                "Many neural layers learn useful representations.",
                "Mnoho neuronových vrstev se učí užitečné reprezentace.",
              ),
              l(
                "A language model generates text. GPT is one family of Transformers.",
                "Jazykový model generuje text. GPT je jedna rodina transformerů.",
              ),
            ][level],
            lang,
          )}
        </p>
        <div className="traffic-row">
          <div
            className="traffic-light"
            aria-label={text(l("Traffic light", "Semafor"), lang)}
          >
            {["#f17c88", "#f7dc7b", "#75cfaa"].map((color, i) => (
              <span
                key={color}
                style={{ background: color, opacity: light === i ? 1 : 0.18 }}
              />
            ))}
          </div>
          <div>
            <strong>
              {text(l("A rule-based automaton", "Automat s pravidly"), lang)}
            </strong>
            <p>
              {text(
                l(
                  "State + event = next state. No training.",
                  "Stav + událost = další stav. Bez tréninku.",
                ),
                lang,
              )}
            </p>
            <button
              className="small-button"
              onClick={() => setLight((light + 1) % 3)}
            >
              {text(l("Next state", "Další stav"), lang)}
            </button>
          </div>
        </div>
        <Note>
          {text(
            l(
              "The nested map shows the learned-model branch of AI. Symbolic AI exists outside ML.",
              "Vnořená mapa ukazuje větev AI s učením. Symbolická AI existuje i mimo ML.",
            ),
            lang,
          )}
        </Note>
      </div>
    </div>
  );
}

export function NeuralDemo({ lang, step }: DemoProps) {
  const [x, setX] = useState(0.8);
  const [y, setY] = useState(0.4);
  const [w, setW] = useState(1.5);
  const [bias, setBias] = useState(-0.5);
  const z = x * w + y * 0.8 + bias;
  const result = sigmoid(z);
  return (
    <div className="demo split-demo">
      <div className="neuron-scene">
        <Network signal={result} lang={lang} />
        <div className="result-equation">
          <span>
            {x.toFixed(2)} × {w.toFixed(2)} + {y.toFixed(2)} × 0.8 +{" "}
            {bias.toFixed(2)}
          </span>
          <strong>z = {z.toFixed(3)}</strong>
          <span>
            σ(z) = <b>{result.toFixed(3)}</b>
          </span>
        </div>
      </div>
      <div className="demo-controls">
        <Slider label="x₁" value={x} onChange={setX} />
        <Slider label="x₂" value={y} onChange={setY} />
        <Slider
          label={text(l("Weight w₁", "Váha w₁"), lang)}
          value={w}
          min={-3}
          max={3}
          onChange={setW}
        />
        <Slider
          label="Bias b"
          value={bias}
          min={-3}
          max={3}
          onChange={setBias}
        />
        <div className="output-gauge">
          <span style={{ width: `${result * 100}%` }} />
        </div>
        <p>
          {text(
            l(
              "One neuron’s actual output. The network above illustrates how neurons can connect.",
              "Skutečný výstup jednoho neuronu. Síť nahoře ilustruje možné propojení neuronů.",
            ),
            lang,
          )}
        </p>
        <Note>
          {text(
            [
              l("Move the inputs.", "Pohybuj vstupy."),
              l("Change a weight or bias.", "Změň váhu nebo bias."),
              l(
                "Sigmoid keeps this output between 0 and 1.",
                "Sigmoid drží výstup mezi 0 a 1.",
              ),
            ][step],
            lang,
          )}
        </Note>
      </div>
    </div>
  );
}

export function LearningDemo({ lang }: DemoProps) {
  const [weights, setWeights] = useState<Weights>([0, 0, 0]);
  const [epoch, setEpoch] = useState(0);
  const [rate, setRate] = useState(0.5);
  const [history, setHistory] = useState([loss([0, 0, 0])]);
  const run = () => {
    const next = train(weights, 25, rate);
    setWeights(next);
    setEpoch(epoch + 25);
    setHistory([...history.slice(-39), loss(next)]);
  };
  return (
    <div className="demo">
      <div className="learning-layout">
        <div>
          <h3>{text(l("A tiny OR model", "Malý model OR"), lang)}</h3>
          <div className="truth-table">
            {orExamples.map(([x, y, target]) => (
              <div key={`${x}${y}`}>
                <span>
                  {x} OR {y}
                </span>
                <span className={`target color-${target ? 0 : 2}`}>
                  {target}
                </span>
                <div className="probability-track">
                  <i style={{ width: `${predict(weights, x, y) * 100}%` }} />
                </div>
                <strong>{predict(weights, x, y).toFixed(3)}</strong>
              </div>
            ))}
          </div>
          <Note>
            {text(l("Target", "Cíl"), lang)} /{" "}
            {text(l("Prediction", "Odhad"), lang)}
          </Note>
        </div>
        <div>
          <LineChart
            values={history}
            label={text(
              l(
                "Cross-entropy loss after each batch",
                "Křížová entropie po každé dávce",
              ),
              lang,
            )}
            max={0.75}
          />
          <div className="metric-row">
            <span>
              {text(l("Loss", "Chyba"), lang)}{" "}
              <strong>{loss(weights).toFixed(4)}</strong>
            </span>
            <span>
              {text(l("Training steps", "Tréninkové kroky"), lang)}{" "}
              <strong>{epoch}</strong>
            </span>
          </div>
        </div>
      </div>
      <div className="inline-controls">
        <button className="primary" onClick={run} disabled={epoch >= 2000}>
          {text(l("Train 25 steps", "Trénuj 25 kroků"), lang)}
        </button>
        <button
          className="secondary"
          onClick={() => {
            setWeights([0, 0, 0]);
            setEpoch(0);
            setHistory([loss([0, 0, 0])]);
          }}
        >
          {text(l("Reset model", "Resetuj model"), lang)}
        </button>
        <Slider
          label={text(l("Learning rate", "Rychlost učení"), lang)}
          value={rate}
          min={0.05}
          max={2}
          step={0.05}
          onChange={setRate}
        />
      </div>
      <code className="formula">
        w₁ = {weights[0].toFixed(3)} · w₂ = {weights[1].toFixed(3)} · b ={" "}
        {weights[2].toFixed(3)}
      </code>
      <Note>
        {text(
          l(
            "Real gradient descent in your browser. Four examples cannot demonstrate real-world generalization.",
            "Skutečný gradientní sestup v prohlížeči. Čtyři příklady neukazují zobecnění na skutečný svět.",
          ),
          lang,
        )}
      </Note>
    </div>
  );
}

export function TokensDemo({ lang, step }: DemoProps) {
  const [input, setInput] = useState("Praha je hlavní město České republiky.");
  const [encoding, setEncoding] = useState<Encoding>("cl100k_base");
  const [selected, setSelected] = useState<number | null>(null);
  const { result, loading } = useTokens(input, encoding);
  const bytes = new TextEncoder().encode(input);
  return (
    <div className="demo token-demo">
      <div className="input-row">
        <label className="grow">
          {text(l("Try some text", "Zkus vlastní text"), lang)}
          <textarea
            aria-label={text(l("Try some text", "Zkus vlastní text"), lang)}
            maxLength={1000}
            rows={2}
            value={input}
            onChange={(e) => {
              setInput(e.target.value);
              setSelected(null);
            }}
          />
        </label>
        <label>
          {text(l("Encoding", "Slovník"), lang)}
          <select
            value={encoding}
            onChange={(e) => {
              setEncoding(e.target.value as Encoding);
              setSelected(null);
            }}
          >
            <option>cl100k_base</option>
            <option>o200k_base</option>
          </select>
        </label>
      </div>
      <div className="preset-row">
        {["Praha je …", "Prague is the capital of Czechia.", "Ahoj 👋!"].map(
          (preset) => (
            <button
              key={preset}
              className="small-button"
              onClick={() => {
                setInput(preset);
                setSelected(null);
              }}
            >
              {preset}
            </button>
          ),
        )}
      </div>
      {loading ? (
        <div className="loading">
          {text(l("Loading the tokenizer…", "Načítám tokenizer…"), lang)}
        </div>
      ) : result?.error ? (
        <p role="alert">{result.error}</p>
      ) : (
        <div className="token-list">
          {result?.ids.map((id, i) => (
            <button
              key={i}
              className={`token color-${i % 4} ${selected === i ? "selected" : ""}`}
              title={text(l("Inspect bytes", "Prohlédni bajty"), lang)}
              onClick={() => setSelected(i)}
            >
              <span>
                {result.pieces[i].replaceAll(" ", "␣").replaceAll("\n", "↵") ||
                  "∅"}
              </span>
              <small>{id}</small>
            </button>
          ))}
        </div>
      )}
      {selected !== null && result?.ids[selected] !== undefined && (
        <div className="byte-inspector">
          <strong>#{result.ids[selected]}</strong>
          <code>UTF-8 hex: {result.bytes[selected]}</code>
        </div>
      )}
      <Flow
        labels={[
          text(l("Text", "Text"), lang),
          "UTF-8",
          text(l("Tokens", "Tokeny"), lang),
          "ID",
        ]}
        active={step === 0 ? 1 : step + 1}
      />
      <div className="token-stats">
        <div>
          <strong>{loading ? "…" : (result?.ids.length ?? 0)}</strong>
          <span>{text(l("tokens", "tokenů"), lang)}</span>
        </div>
        <div>
          <strong>{[...input].length}</strong>
          <span>{text(l("Unicode characters", "Unicode znaků"), lang)}</span>
        </div>
        <div>
          <strong>{bytes.length}</strong>
          <span>{text(l("UTF-8 bytes", "UTF-8 bajtů"), lang)}</span>
        </div>
      </div>
      <Note>
        {text(
          l(
            "Exact tokenizer. Plain text only. Click a piece to see its bytes. ␣ means a space. � marks an incomplete UTF-8 character; joining the token bytes restores the original text.",
            "Skutečný tokenizer. Pouze prostý text. Klikni na kousek a prohlédni bajty. ␣ označuje mezeru. � značí neúplný UTF-8 znak; spojení bajtů tokenů obnoví původní text.",
          ),
          lang,
        )}
      </Note>
    </div>
  );
}
