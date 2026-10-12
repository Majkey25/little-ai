import { useState } from "react";
import { l, text } from "../content";
import { Arrow, Note, type DemoProps } from "../components";
import { documents, retrieve, queryVectors } from "../math";

export function RetrievalDemo({ lang, step }: DemoProps) {
  const [country, setCountry] = useState("CZ");
  const [includeCzechia, setIncludeCzechia] = useState(true);
  const [filter, setFilter] = useState(false);
  const results = retrieve(country, includeCzechia, filter);
  const query = queryVectors[country];
  const collection = documents.filter((d) => includeCzechia || d.id !== "cz");
  const selected = results[0];
  const supported = selected?.country === country;
  const sourceControl = (
    <label className="check">
      <input
        type="checkbox"
        checked={includeCzechia}
        onChange={(e) => setIncludeCzechia(e.target.checked)}
      />
      {text(l("Include the Czech source", "Zahrnout český zdroj"), lang)}
    </label>
  );
  const filterControl = (
    <label className="check">
      <input
        type="checkbox"
        checked={filter}
        onChange={(e) => setFilter(e.target.checked)}
      />
      {text(l("Filter by country metadata", "Filtrovat podle metadat státu"), lang)}
    </label>
  );
  return (
    <div className={`demo retrieval-story story-beat-${step}`}>
      <div className="story-diagram retrieval-stage">
        {step === 0 ? (
          <div className="source-index-stage">
            <div className="source-stack">
              {collection.map((d) => (
                <div className="document" key={d.id}>
                  <span>{d.origin}</span>
                  <strong>{d.capital[lang] || text(l("Recipe", "Recept"), lang)}</strong>
                </div>
              ))}
            </div>
            <span className="story-arrow"><Arrow /></span>
            <div className="index-node">
              <span className="vector-dots" aria-hidden="true">● ● ●</span>
              <strong>{collection.length}</strong>
              <span>{text(l("prepared chunks in the index", "připravené úryvky v indexu"), lang)}</span>
            </div>
          </div>
        ) : step === 1 ? (
          <div className="ranked-stage">
            <div className="question-bubble">
              {text(l("Question vector", "Vektor otázky"), lang)} · {country}
            </div>
            <div className="retrieved-documents">
              {results.length ? results.map((d, i) => (
                <div key={d.id} className={`document ${i === 0 ? "top-document" : ""}`}>
                  <div className="document-heading">
                    <span>#{i + 1} · {d.capital[lang] || text(l("Recipe", "Recept"), lang)}</span>
                    <strong>{d.score.toFixed(4)}</strong>
                  </div>
                  <div className="document-score">
                    <span style={{ width: `${Math.max(0, d.score) * 100}%` }} />
                  </div>
                </div>
              )) : <div className="empty-state">{text(l("No matching source.", "Žádný odpovídající zdroj."), lang)}</div>}
            </div>
          </div>
        ) : (
          <div className="hallucination-flow evidence-stage">
            <div className="question-bubble">
              {text(l("Capital of", "Hlavní město"), lang)} · {country}
            </div>
            <div className="document">
              <strong>{text(l("Top passage", "První úryvek"), lang)}</strong>
              <p>{selected ? selected[lang] : text(l("No matching source.", "Žádný odpovídající zdroj."), lang)}</p>
            </div>
            <div className={`answer-bubble ${supported ? "grounded" : "uncertain"}`}>
              <strong>{text(supported ? l("Supported answer", "Podložená odpověď") : l("Evidence missing", "Chybí podklad"), lang)}</strong>
              <p>{supported && selected ? selected.capital[lang] : text(l("The passage does not support this country. Find another source.", "Úryvek nedokládá odpověď pro tento stát. Najdi jiný zdroj."), lang)}</p>
            </div>
          </div>
        )}
      </div>
      <div className="story-controls inline-controls">
        {step > 0 && (
          <label>
            {text(l("Ask about a capital", "Zeptej se na hlavní město"), lang)}
            <select
              value={country}
              onChange={(e) => setCountry(e.target.value)}
            >
              <option value="CZ">{text(l("Czechia", "Česko"), lang)}</option>
              <option value="FR">{text(l("France", "Francie"), lang)}</option>
              <option value="DE">{text(l("Germany", "Německo"), lang)}</option>
            </select>
          </label>
        )}
        {step === 0 ? sourceControl : step === 2 ? filterControl : null}
      </div>
      <details className="demo-details">
        <summary>{text(l("Vectors, sources & controls", "Vektory, zdroje a ovládání"), lang)}</summary>
        <div className="inline-controls">
          {step > 0 && sourceControl}
          {step < 2 && filterControl}
        </div>
        <code className="formula">q = [{query.join(", ")}]</code>
        <div className="retrieved-documents">
          {results.length ? (
            results.map((d, i) => (
              <div
                key={d.id}
                className={`document ${i === 0 ? "top-document" : ""}`}
              >
                <div className="document-heading">
                  <span>
                    #{i + 1} · {d.origin}
                  </span>
                  <strong>{d.score.toFixed(4)}</strong>
                </div>
                <p>{d[lang]}</p>
                <code>
                  [{d.vector.join(", ")}] · country={d.country || "∅"}
                </code>
                <div className="document-score">
                  <span style={{ width: `${Math.max(0, d.score) * 100}%` }} />
                </div>
              </div>
            ))
          ) : (
            <div className="empty-state">
              {text(
                l(
                  "No matching source. A useful system says evidence is missing.",
                  "Žádný odpovídající zdroj. Užitečný systém oznámí chybějící podklad.",
                ),
                lang,
              )}
            </div>
          )}
        </div>
        <Note>
          {text(l(
            "Fictional files, metadata and hand-made 3D vectors. The cosine scores measure similarity, not answer confidence. The app passes selected evidence into context; this does not change learned weights.",
            "Fiktivní soubory, metadata a ručně vytvořené 3D vektory. Kosinová skóre měří podobnost, ne jistotu odpovědi. Aplikace vloží vybrané podklady do kontextu; naučené váhy se tím nemění.",
          ), lang)}
        </Note>
      </details>
    </div>
  );
}

export function HallucinationsDemo({ lang, step }: DemoProps) {
  const [source, setSource] = useState(false);
  const [check, setCheck] = useState(false);
  const [web, setWeb] = useState(false);
  const result = retrieve("CZ", source, false)[0];
  const grounded = source || web;
  const blocked = check && !grounded;
  const answer = grounded
    ? text(
        l(
          "Prague is the capital of Czechia.",
          "Praha je hlavní město České republiky.",
        ),
        lang,
      )
    : blocked
      ? text(
          l(
            "The available source is about France. It does not answer the Czechia question.",
            "Dostupný zdroj je o Francii. Na otázku o Česku neodpovídá.",
          ),
          lang,
        )
      : text(
          l(
            "Paris is the capital of Czechia.",
            "Paříž je hlavní město České republiky.",
          ),
          lang,
        );
  return (
    <div className={`demo hallucination-story story-beat-${step}`}>
      <div className="story-diagram hallucination-flow">
        <div className="question-bubble">
          {text(
            l("What is the capital of Czechia?", "Jaké je hlavní město Česka?"),
            lang,
          )}
        </div>
        <div className="document">
          <div className="document-heading">
            <span>
              {text(web && !source ? l("Prepared web source", "Připravený webový zdroj") : l("Top retrieved passage", "První nalezený úryvek"), lang)}
            </span>
          </div>
          <p>{web && !source ? text(l("Prague is the capital of Czechia.", "Praha je hlavní město České republiky."), lang) : result[lang]}</p>
        </div>
        {step > 0 && <div
          className={`answer-bubble ${grounded ? "grounded" : blocked ? "uncertain" : "wrong"}`}
        >
          {step === 2 && <span className="support-gate">{text(check ? grounded ? l("Country support found", "Podklad ke státu nalezen") : l("Country support missing", "Podklad ke státu chybí") : l("Country check is off", "Kontrola státu je vypnutá"), lang)}</span>}
          <strong>
            {text(
              grounded
                ? l("Supported", "Podložené")
                : blocked
                  ? l("Evidence missing", "Chybí podklad")
                  : l("Wrong answer", "Chybná odpověď"),
              lang,
            )}
          </strong>
          <p>{answer}</p>
        </div>}
      </div>
      <div className="story-controls inline-controls">
        {step !== 1 && <label className="check">
          <input
            type="checkbox"
            checked={source}
            onChange={(e) => setSource(e.target.checked)}
          />
          {text(l("Add Czechia source", "Přidej zdroj o Česku"), lang)}
        </label>}
        {step > 0 && <label className="check">
          <input
            type="checkbox"
            checked={check}
            onChange={(e) => setCheck(e.target.checked)}
          />
          {text(l("Require country support", "Vyžaduj podklad ke státu"), lang)}
        </label>}
        {step === 2 && <button
          className="secondary"
          onClick={() => {
            setWeb(!web);
            if (!web) setCheck(true);
          }}
        >
          {text(
            web ? l("Remove prepared web source", "Odeber připravený webový zdroj") : l(
              "Inspect prepared web result",
              "Prohlédni připravený výsledek webu",
            ),
            lang,
          )}
        </button>}
      </div>
      <details className="demo-details">
        <summary>{text(l("Source & limits", "Zdroj a omezení"), lang)}</summary>
        <code>{result.origin} · cosine={result.score.toFixed(4)}</code>
        <p>{result[lang]}</p>
      {web && (
        <div className="web-result">
          <strong>
            {text(
              l(
                "Prepared result, not a live search",
                "Připravený výsledek, ne živé hledání",
              ),
              lang,
            )}
          </strong>
          <p>
            {text(
              l(
                "Prague, the capital of the Czech Republic. Verify the linked page yourself.",
                "Praha, hlavní město České republiky. Ověř na odkazované stránce.",
              ),
              lang,
            )}
          </p>
          <a
            href="https://www.visitczechia.com/en-us/destinations/prague"
            target="_blank"
            rel="noreferrer"
          >
            VisitCzechia · Prague
          </a>
        </div>
      )}
        <Note>{text(l(
          "Similarity does not establish truth. This deliberately broken scripted rule copies the first capital without checking its country. A real model may know Prague from training even without a database; missing retrieval does not force Paris.",
          "Podobnost nedokazuje pravdu. Záměrně chybná připravená logika převezme první město bez kontroly státu. Skutečný model může znát Prahu z tréninku i bez databáze; chybějící zdroj nenutí odpověď Paříž.",
        ), lang)}</Note>
      </details>
    </div>
  );
}

export function ToolsDemo({ lang, step }: DemoProps) {
  const [a, setA] = useState("24");
  const [b, setB] = useState("7");
  const [operation, setOperation] = useState("multiply");
  const [status, setStatus] = useState<"idle" | "result" | "error">("idle");
  const [answer, setAnswer] = useState<number | null>(null);
  const [error, setError] = useState<"input" | "division" | "overflow" | null>(
    null,
  );
  const run = () => {
    const x = Number(a),
      y = Number(b);
    const invalidInput =
      !a.trim() ||
      !b.trim() ||
      !Number.isFinite(x) ||
      !Number.isFinite(y) ||
      Math.abs(x) > 1e9 ||
      Math.abs(y) > 1e9;
    const result =
      operation === "multiply" ? x * y : operation === "add" ? x + y : x / y;
    const nextError = invalidInput
      ? "input"
      : operation === "divide" && y === 0
        ? "division"
        : !Number.isFinite(result)
          ? "overflow"
          : null;
    setError(nextError);
    setAnswer(nextError ? null : result);
    setStatus(nextError ? "error" : "result");
  };
  const reset = () => {
    setStatus("idle");
    setAnswer(null);
    setError(null);
  };
  const call = {
    name: "calculate",
    arguments: {
      operation,
      a: a.trim() ? Number(a) : null,
      b: b.trim() ? Number(b) : null,
    },
  };
  const symbol = operation === "multiply" ? "×" : operation === "add" ? "+" : "÷";
  return (
    <div className={`demo tools-story story-beat-${step}`}>
      <div className="story-diagram tool-stage">
        {step === 0 ? (
          <div className="tool-call-stage">
            <div className="tool-node">
              <strong>{text(l("Request", "Požadavek"), lang)}</strong>
            </div>
            <span className="story-arrow"><Arrow /></span>
            <div className="tool-node">
              <code>calculate</code>
              <strong>{a.trim() || "?"} {symbol} {b.trim() || "?"}</strong>
            </div>
          </div>
        ) : step === 1 ? (
          <div className="tool-application-stage">
            <span>{text(l("Application code", "Kód aplikace"), lang)}</span>
            <strong className="tool-expression">{a.trim() || "?"} {symbol} {b.trim() || "?"}</strong>
            <span className={status === "error" ? "warning" : ""}>{text(status === "result" ? l("Executed", "Provedeno") : status === "error" ? l("Rejected", "Odmítnuto") : l("Waiting for execution", "Čeká na spuštění"), lang)}</span>
          </div>
        ) : (
          <div className="tool-return-stage">
            <div className="tool-node">
              <span>{text(l("Observation", "Výsledek nástroje"), lang)}</span>
              <strong>{text(status === "result" ? l("Result ready", "Výsledek připraven") : status === "error" ? l("Tool error", "Chyba nástroje") : l("Not run yet", "Zatím nespuštěno"), lang)}</strong>
            </div>
            <span className="story-arrow"><Arrow /></span>
            <div className="tool-node"><strong>{text(l("Context", "Kontext"), lang)}</strong></div>
            <span className="story-arrow"><Arrow /></span>
            <div className="tool-node">
              <strong>{text(l("Model", "Model"), lang)}</strong>
              <span>{text(l("Answer or another call", "Odpověď nebo další volání"), lang)}</span>
            </div>
          </div>
        )}
      </div>
      <div className="story-controls calculator-input">
        <label>
          A
          <input
            type="number"
            value={a}
            onChange={(e) => {
              setA(e.target.value);
              reset();
            }}
          />
        </label>
        <label>
          {text(l("Operation", "Operace"), lang)}
          <select
            value={operation}
            onChange={(e) => {
              setOperation(e.target.value);
              reset();
            }}
          >
            <option value="multiply">×</option>
            <option value="add">+</option>
            <option value="divide">÷</option>
          </select>
        </label>
        <label>
          B
          <input
            type="number"
            value={b}
            onChange={(e) => {
              setB(e.target.value);
              reset();
            }}
          />
        </label>
        <button className="primary" onClick={run}>
          {text(l("Execute local tool", "Spusť lokální nástroj"), lang)}
        </button>
      </div>
      <div className="tool-observation">
          <h3>{text(l("Application result", "Výsledek aplikace"), lang)}</h3>
          {status === "result" ? (
              <div role="status" className="tool-result pop">
                {answer}
              </div>
          ) : status === "error" ? (
            <p role="alert" className="warning">
              {text(
                error === "input"
                  ? l(
                      "Use finite numbers between −1 billion and 1 billion.",
                      "Použij konečná čísla mezi −1 miliardou a 1 miliardou.",
                    )
                  : error === "division"
                    ? l(
                        "Division by zero is not allowed.",
                        "Dělení nulou není povoleno.",
                      )
                    : l(
                        "The result is too large. Try smaller values or a larger divisor.",
                        "Výsledek je příliš velký. Zkus menší hodnoty nebo větší dělitel.",
                      ),
                lang,
              )}
            </p>
          ) : (
            <div className="empty-state">
              {text(l("Waiting for execution.", "Čeká na spuštění."), lang)}
            </div>
          )}
      </div>
      <details className="demo-details">
        <summary>{text(l("Request JSON & validation", "JSON požadavku a kontrola"), lang)}</summary>
        <h3>{text(l("Structured request", "Strukturovaný požadavek"), lang)}</h3>
        <pre>{JSON.stringify(call, null, 2)}</pre>
        {status === "result" && <code>{JSON.stringify({ result: answer })}</code>}
        <Note>
        {text(
          l(
            "The browser validates the arguments and calculates the result. The model request is a prepared example.",
            "Prohlížeč ověří argumenty a vypočítá výsledek. Požadavek modelu je připravený příklad.",
          ),
          lang,
        )}
        </Note>
      </details>
    </div>
  );
}

export function ReasoningDemo({ lang, step }: DemoProps) {
  const [visible, setVisible] = useState(0);
  const [mistake, setMistake] = useState(false);
  const [verified, setVerified] = useState(false);
  const total = 3 * 4;
  const remaining = total - 5;
  const proposed = remaining + (mistake ? 1 : 0);
  const stages = [
    l(
      `3 boxes × 4 pencils = ${total} pencils`,
      `3 krabičky × 4 tužky = ${total} tužek`,
    ),
    l(`${total} − 5 = ${proposed} pencils`, `${total} − 5 = ${proposed} tužek`),
    verified && proposed !== remaining
      ? l(
          `Check failed. The correct result is ${remaining}.`,
          `Kontrola selhala. Správný výsledek je ${remaining}.`,
        )
      : verified
        ? l(
            `Calculator check passed: ${remaining} pencils.`,
            `Kontrola kalkulačkou prošla: ${remaining} tužek.`,
          )
        : l(
            "A result still needs checking.",
            "Výsledek stále potřebuje kontrolu.",
          ),
  ];
  return (
    <div className={`demo reasoning-demo reasoning-story story-beat-${step}`}>
      <div className="story-diagram reasoning-stage">
        {step < 2 ? <div className="pencil-scene">
        <div className="pencil-boxes">
          {[0, 1, 2].map((box) => (
            <div className="pencil-box" key={box}>
              {[0, 1, 2, 3].map((pencil) => (
                <span
                  key={pencil}
                  className={`pencil ${(step > 0 || visible >= 2) && box * 4 + pencil < 5 ? "sold" : ""}`}
                />
              ))}
            </div>
          ))}
        </div>
        <p>
          {text(
            l(
              "3 boxes. 4 pencils in each. Sell 5.",
              "3 krabičky. V každé 4 tužky. Prodej 5.",
            ),
            lang,
          )}
        </p>
        <div className="reasoning-expression">
          {step === 0 ? <>
            <strong>3 × 4 {visible > 0 ? `= ${total}` : "= ?"}</strong>
            {visible > 1 && <span>{total} − 5 = {proposed}</span>}
          </> : <>
            <span>{text(l("Proposed answer", "Navržená odpověď"), lang)}</span>
            <strong>{total} − 5 = {proposed}</strong>
          </>}
        </div>
      </div> : <div className="outcome-training-stage">
        <div className="reasoning-node">
          <span>{text(l("Proposed", "Navrženo"), lang)}</span>
          <strong>{proposed}</strong>
        </div>
        <span className="story-arrow"><Arrow /></span>
        <div className={`reasoning-node ${verified ? proposed === remaining ? "grounded" : "wrong" : "uncertain"}`}>
          <span>{text(l("Arithmetic check", "Kontrola výpočtem"), lang)}</span>
          <strong>{verified ? remaining : "?"}</strong>
          <span>{text(verified ? proposed === remaining ? l("Matches", "Souhlasí") : l("Correction", "Oprava") : l("Not checked", "Neověřeno"), lang)}</span>
        </div>
        <span className="story-arrow"><Arrow /></span>
        <div className="reasoning-node">
          <strong>{text(l("Training outcome", "Výsledek pro trénink"), lang)}</strong>
          <span>{text(verified ? l("Use checked solutions", "Použij ověřená řešení") : l("Check before using", "Před použitím ověř"), lang)}</span>
        </div>
      </div>}
      </div>
      <div className="story-controls inline-controls">
        {step === 0 ? <>
          <button
            className="primary"
            disabled={visible >= 2}
            onClick={() => setVisible(visible + 1)}
          >
            {text(l("Reveal a step", "Odhal krok"), lang)}
          </button>
          <button
            className="small-button"
            onClick={() => {
              setVisible(0);
              setVerified(false);
            }}
          >
            {text(l("Replay calculations", "Znovu výpočty"), lang)}
          </button>
        </> : <>
          <button
            className="primary"
            onClick={() => {
              setVerified(true);
              setVisible(3);
            }}
          >
            {text(l("Check with arithmetic", "Ověř výpočtem"), lang)}
          </button>
          <label className="check">
            <input
              type="checkbox"
              checked={mistake}
              onChange={(e) => {
                setMistake(e.target.checked);
                setVerified(false);
              }}
            />
            {text(l("Insert a plausible mistake", "Vlož přesvědčivou chybu"), lang)}
          </label>
        </>}
      </div>
      <p role="status" className="reasoning-check">{verified ? text(stages[2], lang) : ""}</p>
      <details className="demo-details">
        <summary>{text(l("Steps & limits", "Postup a omezení"), lang)}</summary>
      <ol className="reasoning-steps">
        {stages.map((line, i) => (
          <li className={visible > i || step > 0 && i < 2 ? "visible-step" : ""} key={i}>
            <span className={`circle color-${i}`}>{i + 1}</span>
            <span>
              {visible > i || step > 0 && i < 2
                ? text(line, lang)
                : text(l("Reveal the next step", "Odhal další krok"), lang)}
            </span>
          </li>
        ))}
      </ol>
      <Note>
        {text(
          l(
            "Scripted intermediate steps. The check computes 3 × 4 − 5. This is not a real model's hidden reasoning. A written explanation need not faithfully describe a model's internal computation.",
            "Připravené mezikroky. Kontrola vypočítá 3 × 4 − 5. Nejde o skryté uvažování skutečného modelu. Napsané vysvětlení nemusí věrně popisovat vnitřní výpočet modelu.",
          ),
          lang,
        )}
      </Note>
      </details>
    </div>
  );
}
