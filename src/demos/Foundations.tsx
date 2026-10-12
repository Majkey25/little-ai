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

export function AIDemo({ lang, step }: DemoProps) {
  const [light, setLight] = useState(0);
  const [level, setLevel] = useState(1);
  const [languagePhase, setLanguagePhase] = useState(0);
  const names = [
    l("Artificial intelligence", "Umělá inteligence"),
    l("Machine learning", "Strojové učení"),
    l("Deep learning", "Hluboké učení"),
    l("Large language models", "Velké jazykové modely"),
  ];
  const short = ["AI", "ML", "DL", "LLM"];
  const lightNames = [
    l("Red", "Červená"),
    l("Yellow", "Žlutá"),
    l("Green", "Zelená"),
  ];
  const languageLabels = [
    l("Text", "Text"),
    l("Numbers", "Čísla"),
    l("Next token", "Další token"),
  ];
  const ring = (i: number) =>
    `map-ring ring-${short[i].toLowerCase()} ${level === i ? "active" : ""}`;
  const definitions = [
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
  ];
  return (
    <div className={`demo foundations-story foundations-ai story-beat-${step}`}>
      <div className="story-visual">
        {step === 0 ? (
          <div className="traffic-row traffic-story">
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
                {text(l("Written rules", "Napsaná pravidla"), lang)}
              </strong>
              <p role="status" aria-live="polite">
                {text(l("Current state", "Aktuální stav"), lang)}:{" "}
                <strong>{text(lightNames[light], lang)}</strong>
              </p>
              <Flow
                labels={lightNames.map((name) => text(name, lang))}
                active={light}
              />
            </div>
          </div>
        ) : step === 1 ? (
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
            <p>{text(definitions[level], lang)}</p>
          </div>
        ) : (
          <div className={`language-story language-phase-${languagePhase}`}>
            <Network hero lang={lang} />
            <Flow
              labels={languageLabels.map((label) => text(label, lang))}
              active={languagePhase}
            />
          </div>
        )}
      </div>
      <div className="story-controls">
        {step === 0 ? (
          <button className="primary" onClick={() => setLight((light + 1) % 3)}>
            {text(l("Next state", "Další stav"), lang)}
          </button>
        ) : step === 1 ? (
          <div className="option-list">
            {names.map((name, i) => (
              <button
                key={i}
                className={level === i ? "selected" : ""}
                aria-pressed={level === i}
                onClick={() => setLevel(i)}
              >
                <span className={`circle color-${i}`}>{short[i]}</span>
                {text(name, lang)}
              </button>
            ))}
          </div>
        ) : (
          <div className="option-list">
            {languageLabels.map((label, i) => (
              <button
                key={i}
                className={languagePhase === i ? "selected" : ""}
                aria-pressed={languagePhase === i}
                onClick={() => setLanguagePhase(i)}
              >
                {text(label, lang)}
              </button>
            ))}
          </div>
        )}
      </div>
      <details className="story-details">
        <summary>
          {text(l("Rules and AI names", "Pravidla a názvy AI"), lang)}
        </summary>
        <p>
          {text(
            l(
              "State + event = next state. This automaton follows rules without training.",
              "Stav + událost = další stav. Tento automat dodržuje pravidla bez tréninku.",
            ),
            lang,
          )}
        </p>
        <dl>
          {names.map((name, i) => (
            <div key={short[i]}>
              <dt>
                {short[i]} · {text(name, lang)}
              </dt>
              <dd>{text(definitions[i], lang)}</dd>
            </div>
          ))}
        </dl>
        <Note>
          {text(
            l(
              "The nested map shows the learned-model branch of AI. Symbolic AI exists outside ML.",
              "Vnořená mapa ukazuje větev AI s učením. Symbolická AI existuje i mimo ML.",
            ),
            lang,
          )}
        </Note>
      </details>
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
    <div
      className={`demo foundations-story foundations-neural story-beat-${step}`}
    >
      <div className="story-visual">
        <svg
          className="neuron-story-svg"
          viewBox="0 0 400 300"
          role="img"
          aria-label={text(
            [
              l(
                `Inputs x₁ ${x.toFixed(3)} and x₂ ${y.toFixed(3)} enter one neuron.`,
                `Vstupy x₁ ${x.toFixed(3)} a x₂ ${y.toFixed(3)} vstupují do jednoho neuronu.`,
              ),
              l(
                `Weighted inputs ${(x * w).toFixed(3)} and ${(y * 0.8).toFixed(3)} plus bias ${bias.toFixed(2)} give z ${z.toFixed(3)}.`,
                `Vážené vstupy ${(x * w).toFixed(3)} a ${(y * 0.8).toFixed(3)} s posunem ${bias.toFixed(2)} dávají z ${z.toFixed(3)}.`,
              ),
              l(
                `Sigmoid transforms z ${z.toFixed(3)} into output ${result.toFixed(3)}.`,
                `Sigmoid převádí z ${z.toFixed(3)} na výstup ${result.toFixed(3)}.`,
              ),
            ][step],
            lang,
          )}
        >
          <g
            fontFamily="inherit"
            textAnchor="middle"
            fill="#333052"
            fontSize="20"
            fontWeight="800"
          >
            {step < 2 ? (
              <>
                {[70, 220].map((cy, i) => (
                  <g key={cy}>
                    <path
                      className="signal-path"
                      pathLength="100"
                      d={`M115 ${cy} Q185 ${cy} 235 145`}
                      fill="none"
                      stroke="#9691e8"
                      strokeWidth="3"
                    />
                    <path
                      className="signal-pulse"
                      pathLength="100"
                      d={`M115 ${cy} Q185 ${cy} 235 145`}
                      fill="none"
                      stroke="#9691e8"
                      strokeWidth="3"
                    />
                    <circle
                      cx="70"
                      cy={cy}
                      r="43"
                      fill={i ? "#baedd5" : "#f7dc7b"}
                    />
                    <text x="70" y={cy - 5}>
                      {step === 0 ? `x${i + 1}` : `x${i + 1} × w${i + 1}`}
                    </text>
                    <text x="70" y={cy + 22}>
                      {(step === 0 ? (i ? y : x) : i ? y * 0.8 : x * w).toFixed(
                        3,
                      )}
                    </text>
                    {step === 1 && (
                      <text x="160" y={cy - 15}>
                        +
                      </text>
                    )}
                  </g>
                ))}
                <circle cx="280" cy="145" r="50" fill="#b6aff8" />
                <text x="280" y="138">
                  {step === 0 ? "Σ" : "z"}
                </text>
                <text x="280" y="166">
                  {step === 0
                    ? text(l("neuron", "neuron"), lang)
                    : z.toFixed(3)}
                </text>
                {step === 1 && (
                  <>
                    <path
                      d="M280 235V196"
                      fill="none"
                      stroke="#b8967f"
                      strokeWidth="3"
                    />
                    <rect
                      x="223"
                      y="237"
                      width="114"
                      height="42"
                      rx="16"
                      fill="#ffd5b8"
                    />
                    <text x="280" y="264">
                      b = {bias.toFixed(2)}
                    </text>
                  </>
                )}
              </>
            ) : (
              <>
                <path
                  className="signal-path"
                  pathLength="100"
                  d="M132 145H270"
                  fill="none"
                  stroke="#9691e8"
                  strokeWidth="3"
                />
                <path
                  className="signal-pulse"
                  pathLength="100"
                  d="M132 145H270"
                  fill="none"
                  stroke="#9691e8"
                  strokeWidth="3"
                />
                <circle cx="80" cy="145" r="50" fill="#b6aff8" />
                <text x="80" y="137">
                  z
                </text>
                <text x="80" y="165">
                  {z.toFixed(3)}
                </text>
                <text x="200" y="122">
                  σ(z)
                </text>
                <circle cx="320" cy="145" r="50" fill="#baedd5" />
                <text x="320" y="137">
                  {text(l("Output", "Výstup"), lang)}
                </text>
                <text x="320" y="165">
                  {result.toFixed(3)}
                </text>
                <text x="30" y="240">
                  0
                </text>
                <rect
                  x="45"
                  y="225"
                  width="310"
                  height="20"
                  rx="10"
                  fill="#ddd7f4"
                />
                <rect
                  x="45"
                  y="225"
                  width={310 * result}
                  height="20"
                  rx="10"
                  fill="#75cfaa"
                />
                <text x="375" y="240">
                  1
                </text>
              </>
            )}
          </g>
        </svg>
      </div>
      <div className="story-controls neuron-story-controls">
        {step === 1 ? (
          <>
            <Slider
              label={text(l("Weight w₁", "Váha w₁"), lang)}
              value={w}
              min={-3}
              max={3}
              onChange={setW}
            />
            <Slider
              label={text(l("Bias b", "Posun b"), lang)}
              value={bias}
              min={-3}
              max={3}
              onChange={setBias}
            />
          </>
        ) : (
          <>
            <Slider label="x₁" value={x} onChange={setX} />
            {step === 0 && <Slider label="x₂" value={y} onChange={setY} />}
          </>
        )}
      </div>
      <details className="story-details">
        <summary>
          {text(
            l(
              "Exact calculation and other controls",
              "Přesný výpočet a další ovládání",
            ),
            lang,
          )}
        </summary>
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
        <div className="demo-controls">
          {step === 1 && <Slider label="x₁" value={x} onChange={setX} />}
          {step !== 0 && <Slider label="x₂" value={y} onChange={setY} />}
          {step !== 1 && (
            <>
              <Slider
                label={text(l("Weight w₁", "Váha w₁"), lang)}
                value={w}
                min={-3}
                max={3}
                onChange={setW}
              />
              <Slider
                label={text(l("Bias b", "Posun b"), lang)}
                value={bias}
                min={-3}
                max={3}
                onChange={setBias}
              />
            </>
          )}
        </div>
        <Network signal={result} lang={lang} />
        <Note>
          {text(
            l(
              "The calculation is for one neuron. This larger network illustrates possible connections. Sigmoid keeps the calculated output between 0 and 1.",
              "Výpočet patří jednomu neuronu. Větší síť ilustruje možné propojení. Sigmoid drží vypočítaný výstup mezi 0 a 1.",
            ),
            lang,
          )}
        </Note>
      </details>
    </div>
  );
}

export function LearningDemo({ lang, step }: DemoProps) {
  const [weights, setWeights] = useState<Weights>([0, 0, 0]);
  const [epoch, setEpoch] = useState(0);
  const [rate, setRate] = useState(0.5);
  const [history, setHistory] = useState([loss([0, 0, 0])]);
  const [example, setExample] = useState(0);
  const [inputX, inputY, target] = orExamples[example];
  const prediction = predict(weights, inputX, inputY);
  const run = () => {
    const next = train(weights, 25, rate);
    setWeights(next);
    setEpoch(epoch + 25);
    setHistory([...history.slice(-39), loss(next)]);
  };
  const reset = () => {
    setWeights([0, 0, 0]);
    setEpoch(0);
    setHistory([loss([0, 0, 0])]);
  };
  const table = (
    <div className="truth-table">
      {orExamples.map(([x, y, expected]) => (
        <div key={`${x}${y}`}>
          <span>
            {x} OR {y}
          </span>
          <span className={`target color-${expected ? 0 : 2}`}>{expected}</span>
          <div className="probability-track">
            <i style={{ width: `${predict(weights, x, y) * 100}%` }} />
          </div>
          <strong>{predict(weights, x, y).toFixed(3)}</strong>
        </div>
      ))}
    </div>
  );
  const chart = (
    <LineChart
      values={history}
      start={epoch - (history.length - 1) * 25}
      end={epoch}
      label={text(
        l("Cross-entropy every 25 steps", "Křížová entropie každých 25 kroků"),
        lang,
      )}
      max={0.75}
    />
  );
  return (
    <div
      className={`demo foundations-story foundations-learning story-beat-${step}`}
    >
      <div className="story-visual">
        {step === 0 ? (
          <div className="learning-example-stage">
            <div className="learning-example-inputs">
              <span className="circle color-0">{inputX}</span>
              <strong>OR</strong>
              <span className="circle color-2">{inputY}</span>
            </div>
            <Flow
              labels={[
                text(l("Inputs", "Vstupy"), lang),
                text(l("Neuron", "Neuron"), lang),
                text(l("Prediction", "Odhad"), lang),
              ]}
              active={2}
            />
            <div className="learning-example-output">
              <span>
                {text(l("Target", "Cíl"), lang)} <strong>{target}</strong>
              </span>
              <span>
                {text(l("Prediction", "Odhad"), lang)}{" "}
                <strong>{prediction.toFixed(3)}</strong>
              </span>
            </div>
            <div className="output-gauge">
              <span style={{ width: `${prediction * 100}%` }} />
            </div>
          </div>
        ) : step === 1 ? (
          <div className="learning-loss-stage">
            {chart}
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
        ) : (
          <div className="learning-results-stage">
            {table}
            <Note>
              {text(
                l(
                  "Target / prediction. These are training examples; unseen data still needs testing.",
                  "Cíl / odhad. Toto jsou tréninkové příklady; nové příklady stále potřebují ověření.",
                ),
                lang,
              )}
            </Note>
          </div>
        )}
      </div>
      <div className="story-controls">
        {step === 0 ? (
          <div className="option-list">
            {orExamples.map(([x, y], i) => (
              <button
                key={i}
                aria-pressed={example === i}
                className={example === i ? "selected" : ""}
                onClick={() => setExample(i)}
              >
                {x} OR {y}
              </button>
            ))}
          </div>
        ) : (
          <>
            <button className="primary" onClick={run} disabled={epoch >= 2000}>
              {text(l("Train 25 steps", "Trénuj 25 kroků"), lang)}
            </button>
            <button className="secondary" onClick={reset}>
              {text(l("Reset model", "Resetuj model"), lang)}
            </button>
          </>
        )}
      </div>
      <details className="story-details">
        <summary>
          {text(
            l(
              "Learning rate and exact values",
              "Rychlost učení a přesné hodnoty",
            ),
            lang,
          )}
        </summary>
        <Slider
          label={text(l("Learning rate", "Rychlost učení"), lang)}
          value={rate}
          min={0.05}
          max={2}
          step={0.05}
          onChange={setRate}
        />
        {step === 0 && (
          <div className="inline-controls">
            <button className="primary" onClick={run} disabled={epoch >= 2000}>
              {text(l("Train 25 steps", "Trénuj 25 kroků"), lang)}
            </button>
            <button className="secondary" onClick={reset}>
              {text(l("Reset model", "Resetuj model"), lang)}
            </button>
          </div>
        )}
        <code className="formula">
          w₁ = {weights[0].toFixed(3)} · w₂ = {weights[1].toFixed(3)} · b ={" "}
          {weights[2].toFixed(3)}
        </code>
        {step !== 1 && chart}
        {step !== 2 && table}
        <Note>
          {text(
            l(
              "Real gradient descent in your browser. Four examples cannot demonstrate real-world generalization.",
              "Skutečný gradientní sestup v prohlížeči. Čtyři příklady neukazují zobecnění na skutečný svět.",
            ),
            lang,
          )}
        </Note>
      </details>
    </div>
  );
}

export function TokensDemo({ lang, step }: DemoProps) {
  const [input, setInput] = useState("Praha je hlavní město České republiky.");
  const [encoding, setEncoding] = useState<Encoding>("cl100k_base");
  const [selected, setSelected] = useState<number | null>(null);
  const { result, loading } = useTokens(input, encoding);
  const bytes = new TextEncoder().encode(input);
  const countUnavailable = loading || !result || Boolean(result.error);
  const inspected = selected ?? 0;
  const editor = (
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
  );
  const encodingControl = (
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
  );
  const presets = (
    <div className="preset-row">
      {["Praha je …", "Prague is the capital of Czechia.", "Ahoj 👋!"].map(
        (preset) => (
          <button
            key={preset}
            className="small-button"
            aria-pressed={input === preset}
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
  );
  const tokenCount = (
    <strong
      aria-label={
        countUnavailable
          ? text(
              l("Token count unavailable", "Počet tokenů není k dispozici"),
              lang,
            )
          : undefined
      }
    >
      {countUnavailable ? "—" : result?.ids.length}
    </strong>
  );
  return (
    <div
      className={`demo foundations-story foundations-tokens story-beat-${step}`}
    >
      <div className="story-visual token-story-stage">
        {step === 0 ? (
          <div className="token-text-stage">
            {editor}
            <div className="token-byte-preview">
              <span>
                {text(l("UTF-8", "UTF-8"), lang)}{" "}
                <strong>{bytes.length}</strong>{" "}
                {text(l("bytes", "bajtů"), lang)}
              </span>
              <code
                aria-label={text(
                  l("First 12 UTF-8 bytes", "Prvních 12 bajtů UTF-8"),
                  lang,
                )}
              >
                {[...bytes.slice(0, 12)]
                  .map((byte) => byte.toString(16).padStart(2, "0"))
                  .join(" ")}
                {bytes.length > 12 ? " …" : ""}
              </code>
            </div>
          </div>
        ) : !countUnavailable && result ? (
          <>
            {step === 2 && result.ids[inspected] !== undefined && (
              <div className="byte-inspector token-inspector-stage">
                <span className={`token color-${inspected % 4}`}>
                  <span>
                    {result.pieces[inspected]
                      .replaceAll(" ", "␣")
                      .replaceAll("\n", "↵") || "∅"}
                  </span>
                </span>
                <strong>#{result.ids[inspected]}</strong>
                <code>UTF-8 hex: {result.bytes[inspected]}</code>
              </div>
            )}
            <div className="token-list">
              {result.ids.map((id, i) => (
                <button
                  key={i}
                  className={`token color-${i % 4} ${inspected === i ? "selected" : ""}`}
                  aria-pressed={inspected === i}
                  title={text(l("Inspect bytes", "Prohlédni bajty"), lang)}
                  onClick={() => setSelected(i)}
                >
                  <span>
                    {result.pieces[i]
                      .replaceAll(" ", "␣")
                      .replaceAll("\n", "↵") || "∅"}
                  </span>
                  {step === 2 && <small>{id}</small>}
                </button>
              ))}
            </div>
            {result.ids.length === 0 && (
              <p>
                {text(
                  l("Empty text has 0 tokens.", "Prázdný text má 0 tokenů."),
                  lang,
                )}
              </p>
            )}
            <span className="token-count-readout">
              {text(l("Tokens", "Tokeny"), lang)}: {tokenCount}
            </span>
            <Note>
              {text(
                l(
                  "␣ is a space. � can preview part of a UTF-8 character.",
                  "␣ je mezera. � může zobrazovat část UTF-8 znaku.",
                ),
                lang,
              )}
            </Note>
          </>
        ) : null}
      </div>
      {loading || !result ? (
        <div className="loading" role="status">
          {text(l("Loading the tokenizer…", "Načítám tokenizer…"), lang)}
        </div>
      ) : result?.error ? (
        <p role="alert">
          {text(
            l(
              "Token counting failed. Reload to try again.",
              "Počítání tokenů selhalo. Obnov stránku a zkus to znovu.",
            ),
            lang,
          )}
        </p>
      ) : null}
      <div className="story-controls">
        {step === 0 && presets}
        {step === 1 && encodingControl}
      </div>
      <Flow
        labels={[
          text(l("Text", "Text"), lang),
          "UTF-8",
          text(l("Tokens", "Tokeny"), lang),
          "ID",
        ]}
        active={step === 0 ? 1 : step + 1}
      />
      <details className="story-details">
        <summary>
          {text(
            l("Text, encoding and exact bytes", "Text, slovník a přesné bajty"),
            lang,
          )}
        </summary>
        {step !== 0 && (
          <>
            {editor}
            {presets}
          </>
        )}
        {step !== 1 && encodingControl}
        <div className="token-stats">
          <div>
            {tokenCount}
            <span>{text(l("Tokens", "Tokeny"), lang)}</span>
          </div>
          <div>
            <strong>{[...input].length}</strong>
            <span>{text(l("Code points", "Kódové body"), lang)}</span>
          </div>
          <div>
            <strong>{bytes.length}</strong>
            <span>{text(l("UTF-8 bytes", "Bajty UTF-8"), lang)}</span>
          </div>
        </div>
        <code className="token-all-bytes">
          UTF-8 hex:{" "}
          {[...bytes]
            .map((byte) => byte.toString(16).padStart(2, "0"))
            .join(" ") || "∅"}
        </code>
        <Note>
          {text(
            l(
              "Plain text only. One visible symbol can contain several code points. Joining the token bytes restores the original text.",
              "Pouze prostý text. Jeden viditelný znak může mít více kódových bodů. Spojení bajtů tokenů obnoví původní text.",
            ),
            lang,
          )}
        </Note>
      </details>
    </div>
  );
}
