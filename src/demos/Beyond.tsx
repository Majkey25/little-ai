import { useState } from "react";
import { l, text } from "../content";
import { Flow, Note, TeachingLabel, type DemoProps } from "../components";
import { retrieve, queryVectors } from "../math";

export function RetrievalDemo({ lang, step }: DemoProps) {
  const [country, setCountry] = useState("CZ");
  const [includeCzechia, setIncludeCzechia] = useState(true);
  const [filter, setFilter] = useState(false);
  const results = retrieve(country, includeCzechia, filter);
  const query = queryVectors[country];
  return (
    <div className="demo">
      <Flow
        labels={[
          text(l("Source → chunks", "Zdroj → úryvky"), lang),
          text(l("Embed & index", "Embedding a index"), lang),
          text(l("Search & check", "Hledání a kontrola"), lang),
        ]}
        active={step}
      />
      <div className="retrieval-layout">
        <div className="demo-controls">
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
          <code className="formula">q = [{query.join(", ")}]</code>
          <label className="check">
            <input
              type="checkbox"
              checked={includeCzechia}
              onChange={(e) => setIncludeCzechia(e.target.checked)}
            />
            {text(l("Include the Czech source", "Zahrnout český zdroj"), lang)}
          </label>
          <label className="check">
            <input
              type="checkbox"
              checked={filter}
              onChange={(e) => setFilter(e.target.checked)}
            />
            {text(
              l("Filter by country metadata", "Filtrovat podle metadat státu"),
              lang,
            )}
          </label>
          <p>
            {text(
              l(
                "The app embeds the query, compares vectors and passes selected text into context. The model does not browse the database by itself.",
                "Aplikace zakóduje dotaz, porovná vektory a vloží vybraný text do kontextu. Model databázi sám neprochází.",
              ),
              lang,
            )}
          </p>
        </div>
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
      </div>
      <TeachingLabel lang={lang} />
      <Note>
        {text(
          l(
            "Sample filenames and metadata belong to this fictional collection. Scores are cosine similarity, not answer confidence.",
            "Názvy souborů a metadata patří fiktivní sbírce. Skóre je kosinová podobnost, ne jistota odpovědi.",
          ),
          lang,
        )}
      </Note>
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
    <div className="demo">
      <div className="hallucination-flow">
        <div className="question-bubble">
          {text(
            l("What is the capital of Czechia?", "Jaké je hlavní město Česka?"),
            lang,
          )}
        </div>
        <div className="document">
          <div className="document-heading">
            <span>
              {text(l("Top retrieved passage", "První nalezený úryvek"), lang)}
            </span>
            <strong>{result.score.toFixed(4)}</strong>
          </div>
          <p>{result[lang]}</p>
          <small>
            {text(
              l("Fictional teaching collection", "Fiktivní výuková sbírka"),
              lang,
            )}
          </small>
        </div>
        <div
          className={`answer-bubble ${grounded ? "grounded" : blocked ? "uncertain" : "wrong"}`}
        >
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
        </div>
      </div>
      <div className="inline-controls">
        <label className="check">
          <input
            type="checkbox"
            checked={source}
            onChange={(e) => setSource(e.target.checked)}
          />
          {text(l("Add Czechia source", "Přidej zdroj o Česku"), lang)}
        </label>
        <label className="check">
          <input
            type="checkbox"
            checked={check}
            onChange={(e) => setCheck(e.target.checked)}
          />
          {text(l("Require country support", "Vyžaduj podklad ke státu"), lang)}
        </label>
        <button
          className="secondary"
          disabled={web}
          onClick={() => {
            setWeb(true);
            setCheck(true);
          }}
        >
          {text(
            l(
              "Inspect prepared web result",
              "Prohlédni připravený výsledek webu",
            ),
            lang,
          )}
        </button>
      </div>
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
      <Note>
        {text(
          l(
            "A deliberately broken scripted answer rule shows one RAG failure. No real LLM is running.",
            "Záměrně chybná připravená odpovědní logika ukazuje jedno selhání RAG. Žádný skutečný LLM neběží.",
          ),
          lang,
        )}{" "}
        {step === 2 &&
          text(
            l(
              "A real model might still know Prague from training.",
              "Skutečný model může Prahu znát z tréninku.",
            ),
            lang,
          )}
      </Note>
    </div>
  );
}

export function ToolsDemo({ lang, step }: DemoProps) {
  const [a, setA] = useState("24");
  const [b, setB] = useState("7");
  const [operation, setOperation] = useState("multiply");
  const [status, setStatus] = useState<"idle" | "result" | "error">("idle");
  const [answer, setAnswer] = useState<number | null>(null);
  const [error, setError] = useState("");
  const [stage, setStage] = useState(0);
  const run = () => {
    const x = Number(a),
      y = Number(b);
    if (
      !a.trim() ||
      !b.trim() ||
      !Number.isFinite(x) ||
      !Number.isFinite(y) ||
      Math.abs(x) > 1e9 ||
      Math.abs(y) > 1e9
    ) {
      setStatus("error");
      setError(
        text(
          l(
            "Use finite numbers between −1 billion and 1 billion.",
            "Použij konečná čísla mezi −1 miliardou a 1 miliardou.",
          ),
          lang,
        ),
      );
      setStage(1);
      return;
    }
    if (operation === "divide" && y === 0) {
      setStatus("error");
      setError(
        text(
          l("Division by zero is not allowed.", "Dělení nulou není povoleno."),
          lang,
        ),
      );
      setStage(1);
      return;
    }
    const result =
      operation === "multiply" ? x * y : operation === "add" ? x + y : x / y;
    setAnswer(result);
    setStatus("result");
    setStage(2);
  };
  const reset = () => {
    setStatus("idle");
    setStage(0);
    setAnswer(null);
  };
  const call = {
    name: "calculate",
    arguments: { operation, a: Number(a), b: Number(b) },
  };
  return (
    <div className="demo">
      <Flow
        labels={[
          text(l("Model proposes", "Model navrhne"), lang),
          text(l("App validates & runs", "Aplikace ověří a spustí"), lang),
          text(l("Result returns", "Výsledek se vrátí"), lang),
        ]}
        active={Math.max(step === 0 ? 0 : 1, stage)}
      />
      <div className="calculator-input">
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
      <div className="tool-panels">
        <div>
          <h3>
            {text(l("Structured request", "Strukturovaný požadavek"), lang)}
          </h3>
          <pre>{JSON.stringify(call, null, 2)}</pre>
        </div>
        <div>
          <h3>{text(l("Application result", "Výsledek aplikace"), lang)}</h3>
          {status === "result" ? (
            <>
              <div className="tool-result pop">{answer}</div>
              <code>{JSON.stringify({ result: answer })}</code>
            </>
          ) : status === "error" ? (
            <p role="alert" className="warning">
              {error}
            </p>
          ) : (
            <div className="empty-state">
              {text(l("Waiting for execution.", "Čeká na spuštění."), lang)}
            </div>
          )}
        </div>
      </div>
      <Note>
        {text(
          l(
            "The calculation is real and stays in your browser. The model call is scripted. No eval(), API key or live model.",
            "Výpočet je skutečný a zůstává v prohlížeči. Volání modelu je připravené. Bez eval(), API klíče a živého modelu.",
          ),
          lang,
        )}
      </Note>
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
    <div className="demo reasoning-demo">
      <div className="pencil-scene">
        <div className="pencil-boxes">
          {[0, 1, 2].map((box) => (
            <div className="pencil-box" key={box}>
              {[0, 1, 2, 3].map((pencil) => (
                <span
                  key={pencil}
                  className={`pencil ${visible >= 2 && box * 4 + pencil < 5 ? "sold" : ""}`}
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
      </div>
      <ol className="reasoning-steps">
        {stages.map((line, i) => (
          <li className={visible > i ? "visible-step" : ""} key={i}>
            <span className={`circle color-${i}`}>{i + 1}</span>
            <span>
              {visible > i
                ? text(line, lang)
                : text(l("Reveal the next step", "Odhal další krok"), lang)}
            </span>
          </li>
        ))}
      </ol>
      <div className="inline-controls">
        <button
          className="primary"
          disabled={visible >= 3}
          onClick={() => setVisible(visible + 1)}
        >
          {text(l("Reveal a step", "Odhal krok"), lang)}
        </button>
        <button
          className="secondary"
          disabled={visible < 2}
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
          {text(
            l("Insert a plausible mistake", "Vlož přesvědčivou chybu"),
            lang,
          )}
        </label>
        <button
          className="small-button"
          onClick={() => {
            setVisible(0);
            setVerified(false);
          }}
        >
          {text(l("Replay", "Znovu"), lang)}
        </button>
      </div>
      <Note>
        {text(
          l(
            "Scripted explanation of intermediate steps. The check computes 3 × 4 − 5. This is not a real model’s hidden reasoning.",
            "Připravená ukázka mezikroků. Kontrola vypočítá 3 × 4 − 5. Nejde o skryté uvažování skutečného modelu.",
          ),
          lang,
        )}{" "}
        {step === 2 &&
          text(
            l(
              "Train on verified outcomes, not convincing prose.",
              "Uč se z ověřených výsledků, ne z přesvědčivých vět.",
            ),
            lang,
          )}
      </Note>
    </div>
  );
}
