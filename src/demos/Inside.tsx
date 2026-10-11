import { useState } from "react";
import { l, text } from "../content";
import {
  Flow,
  Note,
  Slider,
  TeachingLabel,
  type DemoProps,
} from "../components";
import { cosine, attentionRow, attentionVectors, softmax } from "../math";
import { useTokens } from "../useTokens";

export function EmbeddingsDemo({ lang, step }: DemoProps) {
  const [x, setX] = useState(0.8);
  const [y, setY] = useState(0.2);
  const points = [
    { name: l("Prague", "Praha"), v: [0.92, 0.18] },
    { name: l("Paris", "Paříž"), v: [0.85, 0.3] },
    { name: l("Berlin", "Berlín"), v: [0.72, 0.42] },
    { name: l("Cake", "Koláč"), v: [0.12, 0.89] },
    { name: l("Bread", "Chléb"), v: [0.28, 0.78] },
  ];
  return (
    <div className="demo split-demo">
      <svg
        className="vector-map"
        viewBox="0 0 460 340"
        role="img"
        aria-label={text(
          l(
            "Toy 2D vector directions and query",
            "Směry výukových 2D vektorů a dotazu",
          ),
          lang,
        )}
      >
        <defs>
          <marker
            id="vector-arrow"
            viewBox="0 0 10 10"
            refX="9"
            refY="5"
            markerWidth="6"
            markerHeight="6"
            orient="auto"
          >
            <path d="M0 0l10 5-10 5Z" fill="#7273ed" />
          </marker>
        </defs>
        <path d="M45 25v275h380" stroke="#bbb5d4" fill="none" />
        {[0.25, 0.5, 0.75, 1].map((v) => (
          <g key={v} stroke="#ded9eb" strokeDasharray="3 6">
            <path d={`M45 ${300 - v * 255}H425`} />
            <path d={`M${45 + v * 360} 25V300`} />
          </g>
        ))}
        {points.map((point, i) => (
          <g key={i}>
            <path
              d={`M45 300L${45 + point.v[0] * 360} ${300 - point.v[1] * 255}`}
              stroke={i > 2 ? "#8ccfb5" : "#b2aaf2"}
              strokeWidth={step > 0 ? 2 : 1}
              opacity=".5"
            />
            <circle
              cx={45 + point.v[0] * 360}
              cy={300 - point.v[1] * 255}
              r="8"
              fill={i > 2 ? "#79c5a3" : "#9c92e9"}
            />
            <text
              x={35 + point.v[0] * 360}
              y={282 - point.v[1] * 255}
              fill="#46445e"
              fontSize="15"
            >
              {text(point.name, lang)}
            </text>
          </g>
        ))}
        <path
          className="query-vector"
          d={`M45 300L${45 + x * 360} ${300 - y * 255}`}
          stroke="#7273ed"
          strokeWidth="3"
          markerEnd="url(#vector-arrow)"
        />
        <circle
          cx={45 + x * 360}
          cy={300 - y * 255}
          r="12"
          fill="#7273ed"
          stroke="white"
          strokeWidth="3"
        />
        <text x="390" y="326" fill="#66677e">
          x
        </text>
        <text x="20" y="30" fill="#66677e">
          y
        </text>
      </svg>
      <div className="demo-controls">
        <h3>{text(l("Move the query vector", "Posuň vektor dotazu"), lang)}</h3>
        <Slider label="x" value={x} min={0.01} onChange={setX} />
        <Slider label="y" value={y} min={0.01} onChange={setY} />
        <div className="scores">
          {points
            .map((point) => ({ ...point, score: cosine([x, y], point.v) }))
            .sort((a, b) => b.score - a.score)
            .map((point) => (
              <div className="score-row" key={point.name.en}>
                <span>{text(point.name, lang)}</span>
                <div className="probability-track">
                  <i style={{ width: `${Math.max(0, point.score) * 100}%` }} />
                </div>
                <strong>{point.score.toFixed(3)}</strong>
              </div>
            ))}
        </div>
        <code className="formula">
          q = [{x.toFixed(2)}, {y.toFixed(2)}]
        </code>
        <TeachingLabel lang={lang} />
      </div>
    </div>
  );
}

export function AttentionDemo({ lang, step }: DemoProps) {
  const [position, setPosition] = useState(4);
  const words =
    lang === "cs"
      ? ["Praha", "je", "hlavní", "město", "Česka"]
      : ["Prague", "is", "the", "Czech", "capital"];
  const row = attentionRow(position);
  return (
    <div className="demo">
      <div className="attention-layout">
        <div>
          <div className="word-row">
            {words.map((word, i) => (
              <button
                className={position === i ? "selected" : ""}
                key={i}
                onClick={() => setPosition(i)}
              >
                {word}
              </button>
            ))}
          </div>
          <div
            className="heatmap"
            style={{
              gridTemplateColumns: `minmax(45px, 1fr) repeat(5, minmax(38px, 1fr))`,
            }}
          >
            <span />
            {words.map((w) => (
              <span className="heat-label" key={w}>
                {w}
              </span>
            ))}
            {words.map((word, i) => (
              <div className="heatmap-row" key={i}>
                <button className="heat-label" onClick={() => setPosition(i)}>
                  {word}
                </button>
                {attentionRow(i).map((weight, j) => (
                  <button
                    key={j}
                    aria-label={`${word} / ${words[j]}: ${(weight * 100).toFixed(1)}%`}
                    onClick={() => setPosition(i)}
                    className={`heat-cell ${i === position ? "active-row" : ""} ${j > i ? "masked" : ""}`}
                    style={{
                      backgroundColor:
                        j > i
                          ? undefined
                          : `rgba(114,115,237,${0.12 + weight * 0.8})`,
                    }}
                  >
                    {j > i ? "×" : weight.toFixed(2)}
                  </button>
                ))}
              </div>
            ))}
          </div>
          <Note>
            {text(
              l(
                "Rows are queries; columns are keys. × = future position, masked to 0.",
                "Řádky jsou query, sloupce klíče. × = budoucí pozice, maskovaná na 0.",
              ),
              lang,
            )}
          </Note>
        </div>
        <div className="demo-controls">
          <h3>{words[position]}</h3>
          <p>
            {text(
              l(
                "How information is mixed at this position",
                "Jak se v této pozici míchají informace",
              ),
              lang,
            )}
          </p>
          {row.map((weight, i) => (
            <div className="score-row" key={i}>
              <span>{words[i]}</span>
              <div className="probability-track">
                <i style={{ width: `${weight * 100}%` }} />
              </div>
              <strong>{(weight * 100).toFixed(1)}%</strong>
            </div>
          ))}
          <code className="formula">
            Q = [{attentionVectors[position].join(", ")}]<br />Σ weights ={" "}
            {row.reduce((a, b) => a + b, 0).toFixed(3)}
          </code>
          <p>
            {text(
              [
                l("Compare a query with keys.", "Porovnej query s klíči."),
                l(
                  "Future positions cannot contribute.",
                  "Budoucí pozice nemohou přispět.",
                ),
                l(
                  "Use these weights to mix the value vectors.",
                  "Pomocí vah smíchej vektory value.",
                ),
              ][step],
              lang,
            )}
          </p>
        </div>
      </div>
      <TeachingLabel lang={lang} />
    </div>
  );
}

export function PredictionDemo({ lang, step }: DemoProps) {
  const [temperature, setTemperature] = useState(0.8);
  const [mode, setMode] = useState("sample");
  const [choice, setChoice] = useState<string | null>(null);
  const candidates =
    lang === "cs"
      ? ["hlavní", "krásná", "velká", "historická", "pizza"]
      : ["the", "beautiful", "large", "historic", "pizza"];
  const scores = [3.6, 2.8, 2.1, 1.8, 0.1];
  const probabilities = softmax(scores, temperature);
  const sample = () => {
    let index = 0;
    if (mode === "sample") {
      const random = Math.random();
      let sum = 0;
      index = probabilities.findIndex((p) => {
        sum += p;
        return random < sum;
      });
      if (index < 0) index = probabilities.length - 1;
    }
    setChoice(candidates[index]);
  };
  return (
    <div className="demo">
      <div className="prediction-layout">
        <div>
          <div className="sentence">
            <span>{lang === "cs" ? "Praha je" : "Prague is"}</span>
            <span key={choice} className={`next-piece ${choice ? "pop" : ""}`}>
              {choice ?? "…"}
            </span>
          </div>
          <Flow
            labels={[
              text(l("Scores", "Skóre"), lang),
              "Softmax",
              text(l("Choose", "Výběr"), lang),
            ]}
            active={step}
          />
          <div className="inline-controls">
            <button className="primary" onClick={sample}>
              {text(l("Choose a next token", "Vyber další token"), lang)}
            </button>
            <button className="secondary" onClick={() => setChoice(null)}>
              {text(l("Clear", "Vymaž"), lang)}
            </button>
          </div>
          <Note>
            {text(
              l(
                "One illustrative prediction from the same prefix. Change the settings and sample again.",
                "Jedna ukázková předpověď ze stejného začátku. Změň nastavení a vyber znovu.",
              ),
              lang,
            )}
          </Note>
        </div>
        <div className="demo-controls">
          <Slider
            label={text(l("Temperature", "Teplota"), lang)}
            value={temperature}
            min={0.1}
            max={2}
            step={0.1}
            onChange={setTemperature}
          />
          <label>
            {text(l("Choose with", "Způsob výběru"), lang)}
            <select value={mode} onChange={(e) => setMode(e.target.value)}>
              <option value="sample">
                {text(l("Sampling", "Náhodný výběr"), lang)}
              </option>
              <option value="greedy">
                {text(l("Highest score", "Nejvyšší skóre"), lang)}
              </option>
            </select>
          </label>
          {candidates.map((candidate, i) => (
            <div className="score-row" key={candidate}>
              <span>{candidate}</span>
              <div className="probability-track">
                <i style={{ width: `${probabilities[i] * 100}%` }} />
              </div>
              <strong>{(probabilities[i] * 100).toFixed(1)}%</strong>
            </div>
          ))}
        </div>
      </div>
      <TeachingLabel lang={lang} />
    </div>
  );
}

export function ContextDemo({ lang, step }: DemoProps) {
  const [notes, setNotes] = useState(
    "Praha je hlavní město České republiky. Paris is the capital of France.",
  );
  const [reserve, setReserve] = useState(20);
  const instructions =
    lang === "cs"
      ? "Odpovídej stručně a podle podkladů."
      : "Answer briefly using the supplied evidence.";
  const question =
    lang === "cs"
      ? "Jaké je hlavní město České republiky?"
      : "What is the capital of Czechia?";
  const input = `${instructions}\n\n${notes}\n\n${question}`;
  const { result, loading } = useTokens(input);
  const used = result?.ids.length ?? 0;
  const overflow = used + reserve > 80;
  return (
    <div className="demo">
      <div className="context-layout">
        <div>
          <label>
            {text(l("Notes in the context", "Poznámky v kontextu"), lang)}
            <textarea
              maxLength={1000}
              rows={4}
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
            />
          </label>
          <div className="preset-row">
            <button
              className="small-button"
              disabled={notes.length >= 1000}
              onClick={() =>
                setNotes(
                  (
                    notes +
                    text(
                      l(
                        "\nOne more piece of information for the model.",
                        "\nDalší informace pro model.",
                      ),
                      lang,
                    )
                  ).slice(0, 1000),
                )
              }
            >
              {text(l("Add a note", "Přidej poznámku"), lang)}
            </button>
            <button
              className="small-button"
              onClick={() => setNotes("Praha je hlavní město České republiky.")}
            >
              {text(
                l("Keep relevant evidence", "Ponech relevantní podklad"),
                lang,
              )}
            </button>
          </div>
          <Slider
            label={text(
              l("Reserve output tokens", "Rezervuj tokeny odpovědi"),
              lang,
            )}
            value={reserve}
            min={5}
            max={50}
            step={1}
            onChange={setReserve}
          />
        </div>
        <div className="context-window">
          <h3>
            {text(
              l("80-token teaching window", "Výukové okno 80 tokenů"),
              lang,
            )}
          </h3>
          <div className={`budget-bar ${overflow ? "overflow" : ""}`}>
            <span style={{ width: `${(Math.min(used, 80) / 80) * 100}%` }} />
            <i
              style={{
                width: `${(Math.min(reserve, Math.max(0, 80 - used)) / 80) * 100}%`,
              }}
            />
          </div>
          <div className="metric-row">
            <span>
              {text(l("Input", "Vstup"), lang)}{" "}
              <strong>{loading ? "…" : used}</strong>
            </span>
            <span>
              {text(l("Output reserve", "Rezerva"), lang)}{" "}
              <strong>{reserve}</strong>
            </span>
          </div>
          <p role="status" className={overflow ? "warning" : "success-text"}>
            {loading
              ? text(l("Counting…", "Počítám…"), lang)
              : overflow
                ? text(
                    l(
                      `Over budget by ${used + reserve - 80} tokens.`,
                      `Překročeno o ${used + reserve - 80} tokenů.`,
                    ),
                    lang,
                  )
                : text(
                    l(
                      `${80 - used - reserve} tokens left.`,
                      `Zbývá ${80 - used - reserve} tokenů.`,
                    ),
                    lang,
                  )}
          </p>
          {result?.error && <p role="alert">{result.error}</p>}
          <ol className="context-parts">
            <li>{text(l("Instructions", "Instrukce"), lang)}</li>
            <li>
              {text(
                l(
                  "Notes / history / retrieved text",
                  "Poznámky / historie / nalezený text",
                ),
                lang,
              )}
            </li>
            <li>{question}</li>
            <li className={step === 2 ? "highlight" : ""}>
              {text(l("Room for the response", "Místo pro odpověď"), lang)}
            </li>
          </ol>
        </div>
      </div>
      <Note>
        {text(
          l(
            "Counts the exact concatenated plain text. API message overhead is excluded. 80 is a teaching limit, not a real model specification.",
            "Počítá přesný spojený text. Režie API zpráv není zahrnuta. 80 je výukový limit, ne specifikace skutečného modelu.",
          ),
          lang,
        )}
      </Note>
    </div>
  );
}
