import { useState } from "react";
import { l, text } from "../content";
import { Note, Slider, TeachingLabel, type DemoProps } from "../components";
import { cosine, attentionRow, attentionVectors, softmax } from "../math";
import { useTokens } from "../useTokens";

export function EmbeddingsDemo({ lang, step }: DemoProps) {
  const [x, setX] = useState(0.8);
  const [y, setY] = useState(0.2);
  const [selected, setSelected] = useState(0);
  const points = [
    { name: l("Prague", "Praha"), v: [0.92, 0.18] },
    { name: l("Paris", "Paříž"), v: [0.85, 0.3] },
    { name: l("Berlin", "Berlín"), v: [0.72, 0.42] },
    { name: l("Cake", "Koláč"), v: [0.12, 0.89] },
    { name: l("Bread", "Chléb"), v: [0.28, 0.78] },
  ];
  const ranked = points
    .map((point) => ({ ...point, score: cosine([x, y], point.v) }))
    .sort((a, b) => b.score - a.score);
  const queryControls = (
    <div className="story-controls vector-controls">
      <Slider label="x" value={x} min={0.01} onChange={setX} />
      <Slider label="y" value={y} min={0.01} onChange={setY} />
    </div>
  );
  return (
    <div className={`demo embeddings-story story-beat-${step}`}>
      <svg
        className="vector-map story-visual"
        viewBox="0 0 400 400"
        role="img"
        aria-label={text(
          l("Hand-made 2D vectors on equally scaled axes", "Ručně vytvořené 2D vektory na stejně škálovaných osách"),
          lang,
        )}
      >
        <defs>
          <marker id="vector-arrow" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="6" markerHeight="6" orient="auto">
            <path d="M0 0l10 5-10 5Z" fill="#7273ed" />
          </marker>
        </defs>
        <text className="svg-label" x="45" y="40" fill="#60577c" fontSize="20">
          {step === 0
            ? `${text(points[selected].name, lang)} = [${points[selected].v.join(", ")}]`
            : `q = [${x.toFixed(2)}, ${y.toFixed(2)}]`}
        </text>
        <path d="M45 75v255h255" stroke="#bbb5d4" fill="none" />
        {[0.25, 0.5, 0.75, 1].map((v) => (
          <g key={v} stroke="#ded9eb" strokeDasharray="3 6">
            <path d={`M45 ${330 - v * 255}H300`} />
            <path d={`M${45 + v * 255} 75V330`} />
          </g>
        ))}
        {points.map((point, i) => {
          if (step === 0 && selected !== i) return null;
          const closest = step === 2 && point.name.en === ranked[0].name.en;
          return (
            <g key={point.name.en} opacity={step === 2 && !closest ? 0.35 : 1}>
              <path
                d={`M45 330L${45 + point.v[0] * 255} ${330 - point.v[1] * 255}`}
                stroke={i > 2 ? "#79c5a3" : "#9c92e9"}
                strokeWidth={closest || step === 0 ? 4 : 2}
                fill="none"
              />
              <circle cx={45 + point.v[0] * 255} cy={330 - point.v[1] * 255} r={closest ? 12 : 8} fill={i > 2 ? "#79c5a3" : "#9c92e9"} />
              <text className="svg-label" x={59 + point.v[0] * 255} y={335 - point.v[1] * 255} fill="#46445e" fontSize="20">
                {text(point.name, lang)}
              </text>
            </g>
          );
        })}
        {step > 0 && (
          <g>
            <path className="query-vector" d={`M45 330L${45 + x * 255} ${330 - y * 255}`} stroke="#7273ed" strokeWidth="3" fill="none" markerEnd="url(#vector-arrow)" />
            <circle cx={45 + x * 255} cy={330 - y * 255} r="10" fill="#7273ed" stroke="white" strokeWidth="3" />
          </g>
        )}
        <g className="svg-label" fill="#66677e" fontSize="20">
          <text x="315" y="335">x</text>
          <text x="25" y="40">y</text>
          <text x="45" y="368" textAnchor="middle">0</text>
          <text x="300" y="368" textAnchor="middle">1</text>
          <text x="32" y="81" textAnchor="end">1</text>
        </g>
      </svg>
      {step === 0 ? (
        <label className="story-controls">
          {text(l("A word and its toy vector", "Slovo a jeho výukový vektor"), lang)}
          <select value={selected} onChange={(e) => setSelected(Number(e.target.value))}>
            {points.map((point, i) => <option key={point.name.en} value={i}>{text(point.name, lang)} · [{point.v.join(", ")}]</option>)}
          </select>
        </label>
      ) : (
        <>
          {step === 2 && <div className="story-result">
            <strong>{text(ranked[0].name, lang)} · {ranked[0].score.toFixed(3)}</strong>
            <span>{text(l("Closest direction. Still only a candidate.", "Nejbližší směr. Stále jen kandidát."), lang)}</span>
          </div>}
          {queryControls}
        </>
      )}
      <details className="story-details">
        <summary>{text(l("Coordinates & cosine scores", "Souřadnice a kosinová skóre"), lang)}</summary>
        {step === 0 && queryControls}
        <code className="formula">q = [{x.toFixed(2)}, {y.toFixed(2)}]<br />cos(a,b) = (a · b) / (‖a‖‖b‖)</code>
        {ranked.map((point) => (
          <div className="score-row" key={point.name.en}>
            <span>{text(point.name, lang)}</span>
            <div className="probability-track"><i style={{ width: `${Math.max(0, point.score) * 100}%` }} /></div>
            <strong>{point.score.toFixed(3)}</strong>
          </div>
        ))}
        <TeachingLabel lang={lang} />
      </details>
    </div>
  );
}

export function AttentionDemo({ lang, step }: DemoProps) {
  const [position, setPosition] = useState(2);
  const words = lang === "cs"
    ? ["Praha", "je", "hlavní", "město", "Česka"]
    : ["Prague", "is", "the", "Czech", "capital"];
  const row = attentionRow(position);
  const query = attentionVectors[position];
  const scores = attentionVectors.map((key) =>
    (query[0] * key[0] + query[1] * key[1]) / Math.sqrt(2),
  );
  const values: [number, number][] = [
    [1, 0], [0, 1], [1, 1], [0.5, 0], [0, 0.5],
  ];
  const mixed = [0, 1].map((dimension) =>
    row.reduce((sum, weight, i) => sum + weight * values[i][dimension], 0),
  );
  return (
    <div className={`demo attention-story story-beat-${step}`}>
      {step === 0 ? (
        <svg className="attention-connections story-visual" viewBox="0 0 420 300" role="img" aria-label={text(l("Selected query compared with current and earlier keys", "Vybraný dotaz porovnaný s vlastním a předchozími klíči"), lang)}>
          {words.map((word, i) => (
            <g key={i} opacity={i > position ? 0.35 : 1}>
              {i <= position && <path className="story-flow" pathLength="100" d={`M190 ${40 + i * 52}Q270 ${40 + i * 52} 322 144`} stroke="#9c92e9" strokeWidth="3" fill="none" />}
              <rect x="10" y={20 + i * 52} width="190" height="40" rx="16" fill={i === position ? "#baedd5" : "#e9e3ff"} />
              <text className="svg-label" x="23" y={46 + i * 52} fill="#46445e" fontSize="20">{word}</text>
              <text className="svg-label" x="130" y={46 + i * 52} fill="#60577c" fontSize="20">K{i + 1}</text>
            </g>
          ))}
          <circle cx="350" cy="144" r="53" fill="#f7dc7b" />
          <text className="svg-label" x="350" y="135" textAnchor="middle" fill="#46445e" fontSize="20">Q</text>
          <text className="svg-label" x="350" y="161" textAnchor="middle" fill="#46445e" fontSize="20">{words[position]}</text>
        </svg>
      ) : step === 1 ? (
        <div className="attention-weights story-visual">
          {row.map((weight, i) => (
            <div className={`score-row ${i > position ? "masked" : ""}`} key={i}>
              <span>{words[i]}</span>
              <div className="probability-track"><i style={{ width: `${weight * 100}%` }} /></div>
              <strong>{i > position ? "× 0%" : `${(weight * 100).toFixed(1)}%`}</strong>
            </div>
          ))}
          <strong className="attention-total">Σ = {row.reduce((sum, weight) => sum + weight, 0).toFixed(3)}</strong>
          <Note>{text(l("× Future position: excluded.", "× Budoucí pozice: vyřazena."), lang)}</Note>
        </div>
      ) : (
        <div className="attention-mixture story-visual">
          <svg className="value-map" viewBox="0 0 400 300" role="img" aria-label={text(l("Value vectors and their calculated weighted mixture", "Vektory hodnot a jejich vypočítaná vážená směs"), lang)}>
            <path d="M45 35v210h210" stroke="#bbb5d4" fill="none" />
            {values.map((value, i) => (
              <g key={i} opacity={row[i] === 0 ? 0.25 : 1}>
                {row[i] > 0 && <path className="story-flow" pathLength="100" d={`M${45 + value[0] * 190} ${245 - value[1] * 190}L${45 + mixed[0] * 190} ${245 - mixed[1] * 190}`} stroke="#9c92e9" strokeWidth={1 + row[i] * 8} fill="none" />}
                <circle cx={45 + value[0] * 190} cy={245 - value[1] * 190} r="8" fill="#79c5a3" />
                <text className="svg-label" x={57 + value[0] * 190} y={239 - value[1] * 190} fill="#46445e" fontSize="20">V{i + 1}</text>
              </g>
            ))}
            <circle cx={45 + mixed[0] * 190} cy={245 - mixed[1] * 190} r="13" fill="#7273ed" stroke="white" strokeWidth="3" />
            <text className="svg-label" x="270" y="270" fill="#66677e" fontSize="18">x</text>
            <text className="svg-label" x="25" y="30" fill="#66677e" fontSize="18">y</text>
            <g className="svg-label" fill="#66677e" fontSize="20">
              <text x="45" y="275" textAnchor="middle">0</text>
              <text x="235" y="275" textAnchor="middle">1</text>
              <text x="32" y="61" textAnchor="end">1</text>
            </g>
          </svg>
          <strong className="story-result">{text(l("Mixed value", "Smíchaná hodnota"), lang)} [{mixed.map((value) => value.toFixed(3)).join(", ")}]</strong>
        </div>
      )}
      <label className="story-controls">
        {text(l("Inspect this position", "Prohlédni tuto pozici"), lang)}
        <select value={position} onChange={(e) => setPosition(Number(e.target.value))}>
          {words.map((word, i) => <option value={i} key={i}>{i + 1}. {word}</option>)}
        </select>
      </label>
      <TeachingLabel lang={lang} />
      <details className="story-details">
        <summary>{text(l("Q / K / V & full matrix", "Q / K / V a celá matice"), lang)}</summary>
        <code className="formula">
          Q = [{query.join(", ")}]<br />
          {values.map((value, i) => <span key={i}>{words[i]}: K = [{attentionVectors[i].join(", ")}], V = [{value.join(", ")}], Q·K / √2 = {scores[i].toFixed(3)}<br /></span>)}
          {text(l("Σ weight · V", "Σ váha · V"), lang)} = [{mixed.map((value) => value.toFixed(3)).join(", ")}]
        </code>
        <div className="attention-matrix-scroll">
          <table className="attention-matrix">
            <caption>{text(l("Rows: queries. Columns: keys.", "Řádky: dotazy. Sloupce: klíče."), lang)}</caption>
            <thead>
              <tr>
                <th scope="col">Q / K</th>
                {words.map((word, i) => <th scope="col" key={i}>{word}</th>)}
              </tr>
            </thead>
            <tbody>
              {words.map((word, i) => (
                <tr key={i}>
                  <th scope="row">{word}</th>
                  {attentionRow(i).map((weight, j) => (
                    <td className={j > i ? "masked" : ""} key={j}>
                      {j > i ? "× 0" : weight.toFixed(2)}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <Note>{text(l("Word-sized toy positions; real tokenizers can split a word. Q and K use the same invented vectors here. V carries the information being mixed.", "Výukové pozice odpovídají slovům. Skutečný tokenizer je může rozdělit. Q a K zde používají stejné vymyšlené vektory. V nese míchané informace."), lang)}</Note>
      </details>
    </div>
  );
}

export function PredictionDemo({ lang, step }: DemoProps) {
  const [temperature, setTemperature] = useState(0.8);
  const [mode, setMode] = useState("sample");
  const [choice, setChoice] = useState<number | null>(null);
  const [inspected, setInspected] = useState(0);
  const candidates = lang === "cs"
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
    setChoice(index);
  };
  const probabilityRows = candidates.map((candidate, i) => (
    <div className={`score-row ${step === 0 && i === inspected ? "selected" : ""}`} key={candidate}>
      <span>{candidate}</span>
      <div className="probability-track"><i style={{ width: `${(step === 0 ? scores[i] / scores[0] : probabilities[i]) * 100}%` }} /></div>
      <strong>{step === 0 ? scores[i].toFixed(1) : `${(probabilities[i] * 100).toFixed(1)}%`}</strong>
    </div>
  ));
  return (
    <div className={`demo prediction-story story-beat-${step}`}>
      <div className="sentence">
        <span>{lang === "cs" ? "Praha je" : "Prague is"}</span>
        <span key={choice} className={`next-piece ${step === 2 && choice !== null ? "pop" : ""}`}>{step === 2 && choice !== null ? candidates[choice] : "…"}</span>
      </div>
      {step < 2 && <div className="prediction-candidates story-visual">{probabilityRows}</div>}
      {step === 0 ? (
        <label className="story-controls">
          {text(l("Inspect an invented score", "Prohlédni vymyšlené skóre"), lang)}
          <select value={inspected} onChange={(e) => setInspected(Number(e.target.value))}>{candidates.map((candidate, i) => <option value={i} key={candidate}>{candidate} · {scores[i].toFixed(1)}</option>)}</select>
        </label>
      ) : step === 1 ? (
        <div className="story-controls"><Slider label={text(l("Temperature", "Teplota"), lang)} value={temperature} min={0.1} max={2} step={0.1} onChange={setTemperature} /></div>
      ) : (
        <div className="story-controls"><button className="primary" onClick={sample}>{text(l("Choose a continuation", "Vyber pokračování"), lang)}</button></div>
      )}
      <Note>{text(l("Toy word choices. Real models choose tokens, often parts of words.", "Výukový výběr slov. Skutečné modely vybírají tokeny, často části slov."), lang)}</Note>
      <details className="story-details">
        <summary>{text(l("Decoding options & calculation", "Volby dekódování a výpočet"), lang)}</summary>
        <label>
          {text(l("Choose with", "Způsob výběru"), lang)}
          <select value={mode} onChange={(e) => setMode(e.target.value)}>
            <option value="sample">{text(l("Sampling", "Náhodný výběr"), lang)}</option>
            <option value="greedy">{text(l("Highest score", "Nejvyšší skóre"), lang)}</option>
          </select>
        </label>
        <code className="formula">pᵢ = exp(scoreᵢ / T) / Σ exp(scoreⱼ / T)<br />Σ p = {probabilities.reduce((sum, p) => sum + p, 0).toFixed(3)}</code>
        {step === 2 && probabilityRows}
        {step !== 1 && <Slider label={text(l("Temperature", "Teplota"), lang)} value={temperature} min={0.1} max={2} step={0.1} onChange={setTemperature} />}
        <button className="secondary" onClick={() => setChoice(null)}>{text(l("Clear", "Vymaž"), lang)}</button>
        <Note>{text(l("One choice from the same prefix. Scores are invented; words can require several tokens. Sampling can change the result, not verify it.", "Jeden výběr ze stejného začátku. Skóre jsou vymyšlená, slova mohou potřebovat více tokenů. Náhodný výběr mění výsledek, neověřuje ho."), lang)}</Note>
        <TeachingLabel lang={lang} />
      </details>
    </div>
  );
}

export function ContextDemo({ lang, step }: DemoProps) {
  const [notes, setNotes] = useState("Praha je hlavní město České republiky. Paris is the capital of France.");
  const [reserve, setReserve] = useState(20);
  const instructions = lang === "cs"
    ? "Odpovídej stručně a podle podkladů."
    : "Answer briefly using the supplied evidence.";
  const question = lang === "cs"
    ? "Jaké je hlavní město České republiky?"
    : "What is the capital of Czechia?";
  const input = `${instructions}\n\n${notes}\n\n${question}`;
  const { result, loading } = useTokens(input, "cl100k_base", false);
  const used = !loading && result && !result.error ? result.ids.length : null;
  const overflow = used !== null && used + reserve > 80;
  const addNote = () => setNotes((
    notes + text(l(
      "\nOne more piece of information for the model.",
      "\nDalší informace pro model.",
    ), lang)
  ).slice(0, 1000));
  const editor = (
    <label>
      {text(l("Notes in the context", "Poznámky v kontextu"), lang)}
      <textarea maxLength={1000} rows={3} value={notes} onChange={(e) => setNotes(e.target.value)} />
    </label>
  );
  const budget = (
    <div className={`context-window context-capacity ${overflow ? "overflow" : ""}`}>
      <h3>{text(l("80-token teaching window", "Výukové okno 80 tokenů"), lang)}</h3>
      <div className={`budget-bar ${overflow ? "overflow" : ""}`}>
        {used !== null && <>
          <span style={{ width: `${(Math.min(used, 80) / 80) * 100}%` }} />
          <i style={{ width: `${(Math.min(reserve, Math.max(0, 80 - used)) / 80) * 100}%` }} />
        </>}
      </div>
      <div className="metric-row">
        <span>{text(l("Input", "Vstup"), lang)} <strong>{loading ? "…" : (used ?? "?")}</strong></span>
        <span>{text(l("Output reserve", "Rezerva odpovědi"), lang)} <strong>{reserve}</strong></span>
      </div>
      {step === 2 && used !== null && <div className={`context-fit story-result ${overflow ? "warning" : "success-text"}`}>
        <strong>{used} + {reserve} {overflow ? ">" : "≤"} 80</strong>
        <span>{text(l("Input + room for output", "Vstup a místo na odpověď"), lang)}</span>
      </div>}
    </div>
  );
  return (
    <div className={`demo context-story story-beat-${step}`}>
      {step === 0 ? (
        <div className="context-prompt story-visual">
          <div className="context-prompt-piece"><strong>{text(l("Instructions", "Instrukce"), lang)}</strong><p>{instructions}</p></div>
          {editor}
          <div className="context-prompt-piece"><strong>{text(l("Question", "Otázka"), lang)}</strong><p>{question}</p></div>
        </div>
      ) : <div className="story-visual">{budget}</div>}
      {step === 1 && <div className="story-controls"><button className="primary" disabled={notes.length >= 1000} onClick={addNote}>{text(l("Add a note", "Přidej poznámku"), lang)}</button></div>}
      {step === 2 && <div className="story-controls"><Slider label={text(l("Reserve output tokens", "Rezervuj tokeny odpovědi"), lang)} value={reserve} min={5} max={50} step={1} onChange={setReserve} /></div>}
      <p role="status" className={used === null ? "" : overflow ? "warning" : "success-text"}>
        {loading ? text(l("Counting…", "Počítám…"), lang)
          : used === null ? text(l("Token count unavailable.", "Počet tokenů není dostupný."), lang)
          : overflow ? text(l(`Tokens over budget: ${used + reserve - 80}.`, `Tokeny nad limit: ${used + reserve - 80}.`), lang)
          : text(l(`Tokens left: ${80 - used - reserve}.`, `Zbývající tokeny: ${80 - used - reserve}.`), lang)}
      </p>
      {!loading && result?.error && <p role="alert">{text(l("Token counting failed. Try reloading the page.", "Počítání tokenů selhalo. Zkus stránku načíst znovu."), lang)}</p>}
      <details className="story-details">
        <summary>{text(l("Change notes & inspect the budget", "Uprav poznámky a prohlédni rozpočet"), lang)}</summary>
        {step !== 0 && editor}
        {step === 0 && budget}
        {step !== 1 && <button className="secondary" disabled={notes.length >= 1000} onClick={addNote}>{text(l("Add a note", "Přidej poznámku"), lang)}</button>}
        <button className="secondary" onClick={() => setNotes("Praha je hlavní město České republiky.")}>{text(l("Keep relevant evidence", "Ponech relevantní podklad"), lang)}</button>
        {step !== 2 && <Slider label={text(l("Reserve output tokens", "Rezervuj tokeny odpovědi"), lang)} value={reserve} min={5} max={50} step={1} onChange={setReserve} />}
        <Note>{text(l("Exact concatenated plain text in cl100k_base. API formatting is excluded. 80 is a teaching limit. Overflow is highlighted; your notes are not erased.", "Přesný spojený text v cl100k_base. Režie API není zahrnuta. 80 je výukový limit. Přebytek se zvýrazní, poznámky se nesmažou."), lang)}</Note>
      </details>
    </div>
  );
}
