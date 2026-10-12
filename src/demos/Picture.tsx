import { useState } from "react";
import { l, text } from "../content";
import clipbot from "../assets/clipbot.webp";
import {
  Arrow,
  Flow,
  Note,
  Slider,
  LineChart,
  type DemoProps,
} from "../components";

export function AgentsDemo({ lang, step }: DemoProps) {
  const [breadth, setBreadth] = useState(25);
  const [skill, setSkill] = useState(60);
  const [autonomy, setAutonomy] = useState(30);
  const [reliability, setReliability] = useState(0.95);
  const [labelled, setLabelled] = useState(0);
  const roles = [
    l("Language", "Jazyk"),
    l("Planning", "Plánování"),
    l("Learning new tasks", "Učení nových úloh"),
    l("Problem solving", "Řešení problémů"),
  ];
  return (
    <div className={`demo agents-demo story-beat-${step}`}>
      {step === 0 ? (
        <>
          <div className="story-stage agent-loop-stage">
            <Flow
              labels={[
                text(l("Observe", "Pozoruj"), lang),
                text(l("Act", "Jednej"), lang),
                text(l("Check / stop", "Ověř / zastav"), lang),
              ]}
              active={labelled === 0 ? 0 : labelled < 3 ? 1 : 2}
            />
            <div className="parcel-row" aria-hidden="true">
              {[0, 1, 2].map((i) => (
                <svg key={i} width="100" height="100" viewBox="0 0 100 100" className={`parcel ${i < labelled ? "labelled" : ""}`}>
                  <rect x="12" y="20" width="76" height="68" rx="12" fill={i < labelled ? "#b8dfcb" : "#f3c8a7"} />
                  <path d="M50 20V45M12 45H88" stroke="#876d61" strokeWidth="4" fill="none" />
                  <rect x="30" y="56" width="40" height="22" rx="5" fill="#fffdf8" />
                  {i < labelled && <path d="M40 66L47 72L60 61" stroke="#43795f" strokeWidth="4" fill="none" />}
                </svg>
              ))}
            </div>
            <p className="metric-row" role="status">
              {text(l("Labelled parcels", "Označené balíky"), lang)} <strong>{labelled}/3</strong>
            </p>
            <p>{text(l("Goal: label 3 parcels. Budget: 3 actions.", "Cíl: označit 3 balíky. Rozpočet: 3 akce."), lang)}</p>
          </div>
          <div className="story-controls inline-controls">
            <button className="primary" disabled={labelled === 3} onClick={() => setLabelled(Math.min(3, labelled + 1))}>
              {text(l("Label the next parcel", "Označ další balík"), lang)}
            </button>
            <button className="small-button" onClick={() => setLabelled(0)}>
              {text(l("Reset this example", "Resetuj příklad"), lang)}
            </button>
          </div>
        </>
      ) : step === 1 ? (
        <>
          <div className="story-stage capability-stage">
            <div className="capability-map">
            {roles.map((role, i) => (
              <div key={i}>
                <span>{text(role, lang)}</span>
                <div className="probability-track">
                  <i
                    style={{
                      width: `${i === 0 ? skill : (skill * breadth) / 100}%`,
                      background: ["#7273ed", "#75bd9c", "#e79c77", "#d5b549"][
                        i
                      ],
                    }}
                  />
                </div>
              </div>
            ))}
            </div>
          </div>
          <div className="story-controls demo-controls">
            <Slider
              label={text(l("Breadth", "Šíře schopností"), lang)}
              value={breadth}
              max={100}
              step={1}
              onChange={setBreadth}
            />
            <Slider
              label={text(l("Performance", "Úroveň schopností"), lang)}
              value={skill}
              max={100}
              step={1}
              onChange={setSkill}
            />
          </div>
        </>
      ) : (
        <>
          <div className="story-stage autonomy-stage">
            <Flow
              labels={[
                text(autonomy < 40 ? l("Human approval", "Schválení člověkem") : l("Bounded task", "Omezené zadání"), lang),
                text(l("Agent acts", "Agent jedná"), lang),
                text(l("Check / stop", "Ověř / zastav"), lang),
              ]}
              active={autonomy < 40 ? 0 : 1}
            />
            <div className="agent-reliability-chain" aria-hidden="true">
              {Array.from({ length: 20 }, (_, i) => (
                <span key={i} style={{ height: `${reliability ** (i + 1) * 100}%` }} />
              ))}
            </div>
            <div className="reliability-result">
              <strong>{(reliability ** 20 * 100).toFixed(1)}%</strong>
              <span>{text(l("chance all 20 independent actions succeed", "šance na úspěch všech 20 nezávislých kroků"), lang)}</span>
              <code>{reliability.toFixed(2)}²⁰</code>
            </div>
          </div>
          <div className="story-controls demo-controls">
          <Slider
            label={text(l("Autonomy", "Samostatnost"), lang)}
            value={autonomy}
            max={100}
            step={1}
            onChange={setAutonomy}
          />
          <p>
            {text(
              autonomy < 40
                ? l(
                    "Human approves each action.",
                    "Člověk schvaluje každou akci.",
                  )
                : autonomy < 75
                  ? l(
                      "Agent acts within a bounded task.",
                      "Agent jedná v omezeném zadání.",
                    )
                  : l(
                      "Greater autonomy needs stronger oversight and limits.",
                      "Větší samostatnost potřebuje silnější dohled a omezení.",
                    ),
              lang,
            )}
          </p>
          </div>
          <details className="demo-details">
            <summary>{text(l("Change the reliability", "Změň spolehlivost"), lang)}</summary>
            <Slider
              label={text(
                l("Success per independent action", "Úspěch jednoho nezávislého kroku"),
                lang,
              )}
              value={reliability}
              min={0.7}
              max={1}
              step={0.01}
              onChange={setReliability}
            />
          </details>
      <Note>
        {text(
          l(
            "The probability calculation assumes independent failures. Real systems may have correlated failures.",
            "Výpočet předpokládá nezávislé chyby. Ve skutečných systémech mohou chyby souviset.",
          ),
          lang,
        )}
      </Note>
        </>
      )}
    </div>
  );
}

export function AlignmentDemo({ lang, step }: DemoProps) {
  const [safe, setSafe] = useState(false);
  const [world, setWorld] = useState(100);
  const [clips, setClips] = useState(0);
  const [history, setHistory] = useState([100]);
  const produce = () => {
    const used = Math.min(10, Math.max(0, world - (safe ? 60 : 0)));
    setWorld(world - used);
    setClips(clips + used * 5);
    setHistory([...history.slice(-19), world - used]);
  };
  return (
    <div className={`demo alignment-demo story-beat-${step}`}>
      <div className="story-stage">
        <div className="metric-row">
          <span>{text(l("World resources", "Zdroje světa"), lang)} <strong>{world}/100</strong></span>
          <span>{text(l("Paperclips", "Sponky"), lang)} <strong>{clips}</strong></span>
        </div>
        {step === 1 ? (
          <LineChart
            values={history}
            max={100}
            label={text(l("World resources after each batch", "Zdroje světa po každé dávce"), lang)}
            color="#79bf9d"
          />
        ) : (
          <>
        {step === 0 ? <div className="robot-scene">
          <img
            src={clipbot}
            width={1289}
            height={1221}
            decoding="async"
            alt={text(
              l(
                "A friendly robot holding a paperclip beside a plant",
                "Přátelský robot se sponkou vedle rostliny",
              ),
              lang,
            )}
          />
          <div className="robot-caption">
            {text(
              l("“More paperclips, please.”", "„Více sponek, prosím.“"),
              lang,
            )}
          </div>
        </div> : <Flow
          labels={[
            text(l("Objective", "Cíl"), lang),
            text(l("Action guard", "Kontrola akce"), lang),
            text(l("World", "Svět"), lang),
          ]}
          active={safe ? 1 : 0}
        />}
          <div className="world-meter">
            <div className="output-gauge" role="meter" aria-label={text(l("World resources", "Zdroje světa"), lang)} aria-valuemin={0} aria-valuemax={100} aria-valuenow={world}>
              <span
                style={{
                  width: `${world}%`,
                  background: world < 60 ? "#ed9098" : "#79bf9d",
                }}
              />
              {step === 2 && safe && <i className="constraint-marker" style={{ left: "60%" }} aria-hidden="true" />}
            </div>
            {step === 2 && <p>{text(safe ? l("Enforced floor: 60/100", "Vynucená hranice: 60/100") : l("Protection off. No resource floor.", "Ochrana vypnutá. Bez spodní hranice zdrojů."), lang)}</p>}
          </div>
          </>
        )}
      </div>
      <div className="story-controls demo-controls">
        {step > 0 ? <div className="policy-switch">
          <button className={!safe ? "selected" : ""} aria-pressed={!safe} onClick={() => setSafe(false)}>
            {text(l("Maximize clips", "Maximum sponek"), lang)}
          </button>
          <button className={safe ? "selected" : ""} aria-pressed={safe} onClick={() => setSafe(true)}>
            {text(l("Protect the world", "Chraň svět"), lang)}
          </button>
        </div> : <span>{text(safe ? l("Policy: protect", "Zásada: chránit") : l("Policy: maximize", "Zásada: maximum"), lang)}</span>}
        <div className="inline-controls">
          <button
            className="primary"
            disabled={world <= (safe ? 60 : 0)}
            onClick={produce}
          >
            {text(l("Produce one batch", "Vyrob jednu dávku"), lang)}
          </button>
          <button
            className="small-button"
            onClick={() => {
              setWorld(100);
              setClips(0);
              setHistory([100]);
            }}
          >
            {text(l("Reset this example", "Resetuj příklad"), lang)}
          </button>
        </div>
          <p role="status">
            {world === 0
              ? text(
                  l(
                    "The narrow objective consumed the whole resource pool.",
                    "Úzký cíl spotřeboval celý fond zdrojů.",
                  ),
                  lang,
                )
              : safe && world <= 60
                ? text(
                    l(
                      "Resources are at or below the 60 floor. Protected production is blocked; switching policy cannot restore used resources.",
                      "Zdroje jsou na hranici 60 nebo pod ní. Chráněná výroba je blokována; změna zásady nevrátí spotřebované zdroje.",
                    ),
                    lang,
                  )
                : text(
                    l(
                      "Each batch uses 10 resources and makes 50 clips.",
                      "Dávka spotřebuje 10 zdrojů a vyrobí 50 sponek.",
                    ),
                    lang,
                  )}
          </p>
      </div>
      {step === 2 && <a className="secondary game-link" href="#/game">
        {text(
          l(
            "Play the full Little Clip Factory game",
            "Zahraj celou hru Little Clip Factory",
          ),
          lang,
        )}
        <Arrow />
      </a>}
      <details className="demo-details">
        <summary>{text(l("Batch arithmetic", "Výpočet dávky"), lang)}</summary>
        <code>{`used = min(10, max(0, ${world} − ${safe ? 60 : 0})); clips += used × 5`}</code>
        <p>{text(l("The implemented limit prevents the next batch from consuming protected resources. Changing policy does not restore past damage. You can stop making batches or change policy at any time.", "Naprogramovaný limit zabrání další dávce spotřebovat chráněné zdroje. Změna zásady nevrátí minulé škody. Dávky můžeš přestat vyrábět nebo kdykoli změnit zásadu."), lang)}</p>
      </details>
    </div>
  );
}

const engineeringCases = [[10, 2, 20], [10, 0, 0], [2.5, 3, 7.5]] as const;

export function EngineeringDemo({ lang, step }: DemoProps) {
  const [example, setExample] = useState(0);
  const [broken, setBroken] = useState(true);
  const [checked, setChecked] = useState(false);
  const [released, setReleased] = useState(false);
  const [price, quantity, expected] = engineeringCases[example] ?? engineeringCases[0];
  const actual = engineeringCases.map(([price, quantity]) =>
    broken ? price + quantity : price * quantity,
  );
  const passed = actual.every((result, i) => result === engineeringCases[i][2]);
  const bugControl = (
    <label className="check">
      <input
        type="checkbox"
        checked={broken}
        onChange={(e) => {
          setBroken(e.target.checked);
          setChecked(false);
          setReleased(false);
        }}
      />
      {text(l("Include an arithmetic bug", "Vlož početní chybu"), lang)}
    </label>
  );
  return (
    <div className={`demo engineering-demo story-beat-${step}`}>
      <div className="story-stage">
        {step === 0 ? (
          <div className="contract-receipt">
            <div className="receipt-items" aria-hidden="true">
              {Array.from({ length: quantity }, (_, i) => (
                <svg key={i} width="64" height="64" viewBox="0 0 64 64">
                  <rect x="8" y="20" width="48" height="36" rx="9" fill="#c5c2f2" />
                  <path d="M22 23V18a10 10 0 0 1 20 0v5" fill="none" stroke="#6c64b5" strokeWidth="4" />
                </svg>
              ))}
            </div>
            <span>{text(l("Price × quantity", "Cena × počet"), lang)}</span>
            <div className="contract-equation"><span>{price} × {quantity}</span><strong>= {expected}</strong></div>
            <p>{text(l("This is the behavior the change must preserve.", "Toto chování musí změna zachovat."), lang)}</p>
          </div>
        ) : step === 1 ? (
          <div className="engineering-check">
          <div>
          <pre>{`function total(price, quantity) {\n  return price ${broken ? "+" : "*"} quantity;\n}`}</pre>
          </div>
          <div>
          <h3>
            {text(l("Expected versus actual", "Očekávané a skutečné"), lang)}
          </h3>
          {engineeringCases.map(([price, quantity, expected], i) => (
            <div className="acceptance-case" key={i}>
              <span>
                {price} × {quantity}
              </span>
              <span>
                {text(l("Expected", "Očekáváno"), lang)} {expected}
              </span>
              <strong
                className={checked && actual[i] !== expected ? "warning" : ""}
              >
                {checked ? actual[i] : "?"}
              </strong>
            </div>
          ))}
          </div>
          </div>
        ) : (
          <div className={`release-stage ${released ? "released" : checked && passed ? "ready" : "blocked"}`}>
            <Flow
              labels={[
                text(l("Checks", "Kontroly"), lang),
                text(l("Illustrated release", "Ukázkové vydání"), lang),
                text(l("Observe / rollback", "Sledování / návrat"), lang),
              ]}
              active={released ? 2 : checked && passed ? 1 : 0}
            />
            <strong className="release-signal" aria-hidden="true">{released ? "✓" : checked && passed ? <Arrow /> : "×"}</strong>
          </div>
        )}
      </div>
      <div className="story-controls">
        {step === 0 ? (
          <div className="policy-switch">
            {[l("Two items", "Dvě položky"), l("No items", "Žádná položka"), l("Decimal price", "Desetinná cena")].map((name, i) => (
              <button key={i} className={example === i ? "selected" : ""} aria-pressed={example === i} onClick={() => setExample(i)}>{text(name, lang)}</button>
            ))}
          </div>
        ) : (
          <>
            {step === 1 && bugControl}
            <div className="inline-controls">
              <button className={step === 1 ? "primary" : "secondary"} onClick={() => setChecked(true)}>
                {text(l("Run acceptance checks", "Spusť kontrolu kritérií"), lang)}
              </button>
              {step === 2 && <button className="primary" disabled={!checked || !passed || released} onClick={() => setReleased(checked && passed)}>
                {text(released ? l("Demo released", "Ukázka vydána") : l("Release this example", "Vydej tuto ukázku"), lang)}
              </button>}
            </div>
          <p role="status">
            {released ? text(l("Example released.", "Ukázka vydána."), lang) : checked
              ? text(
                  passed
                    ? l(
                        "Checks passed.",
                        "Kontroly prošly.",
                      )
                    : l(
                        "Checks failed. Do not deliver this change.",
                        "Kontroly selhaly. Tuto změnu nedoručuj.",
                      ),
                  lang,
                )
              : text(
                  l(
                    "Run the checks to inspect behavior.",
                    "Spusť kontroly chování.",
                  ),
                  lang,
                )}
          </p>
          </>
        )}
      </div>
      <details className="demo-details">
        <summary>{text(step === 2 ? l("Change the proposed code", "Změň navržený kód") : l("Implementation and real releases", "Implementace a skutečné vydání"), lang)}</summary>
        {step === 2 && bugControl}
        <p>{text(l("An agent needs relevant files, interfaces and constraints. Its proposed diff shows work, not correctness. Compile, check types, test important cases and inspect the real workflow.", "Agent potřebuje relevantní soubory, rozhraní a omezení. Navržená změna dokládá práci, ne správnost. Sestav aplikaci, ověř typy, otestuj důležité případy a projdi skutečný průchod."), lang)}</p>
        <p>{text(l("CI runs checks; publication is a separate action. Release small reviewed changes with a rollback plan. Monitor user results, errors and latency, then use that evidence in the next change.", "CI spouští kontroly; publikace je samostatná akce. Vydávej malé zkontrolované změny s možností návratu. Sleduj výsledky uživatelů, chyby a odezvu. Důkazy použij při další změně."), lang)}</p>
      </details>
    </div>
  );
}

export function WholeDemo({ lang, step }: DemoProps) {
  const [rag, setRag] = useState(true);
  const [tools, setTools] = useState(true);
  const [selected, setSelected] = useState<[string, string, string]>(["input", "model", "answer"]);
  const [prompt, setPrompt] = useState("");
  const allNodes = [
    {
      id: "input",
      name: l("Your question", "Tvoje otázka"),
      description: l(
        "Text is converted to token IDs with a tokenizer.",
        "Tokenizer převede text na ID tokenů.",
      ),
      lesson: "tokens",
    },
    {
      id: "rag",
      name: l("Retrieve", "Vyhledej"),
      description: l(
        "The app searches an external index and checks the selected documents.",
        "Aplikace prohledá externí index a ověří vybrané dokumenty.",
      ),
      lesson: "retrieval",
    },
    {
      id: "context",
      name: l("Pack context", "Slož kontext"),
      description: l(
        "Instructions, history and evidence share a limited token budget.",
        "Instrukce, historie a podklady sdílejí omezený rozpočet tokenů.",
      ),
      lesson: "context",
    },
    {
      id: "model",
      name: l("Run the model", "Spusť model"),
      description: l(
        "Token representations flow through Transformer blocks to next-token scores.",
        "Reprezentace tokenů projdou bloky Transformeru až ke skóre dalších tokenů.",
      ),
      lesson: "attention",
    },
    {
      id: "tools",
      name: l("Optional tools", "Volitelné nástroje"),
      description: l(
        "The model can request a tool. The app runs it and returns the result to context.",
        "Model může požádat o nástroj. Aplikace jej spustí a vrátí výsledek do kontextu.",
      ),
      lesson: "tools",
    },
    {
      id: "answer",
      name: l("Check the answer", "Ověř odpověď"),
      description: l(
        "Inspect support and correctness. Missing evidence can justify abstention.",
        "Zkontroluj podklady a správnost. Chybějící důkazy mohou odůvodnit odmítnutí odpovědi.",
      ),
      lesson: "hallucinations",
    },
  ];
  const visible = step === 0 ? ["input", "context"] : step === 1 ? ["context", "model", "answer"] : ["input", ...(rag ? ["rag"] : []), "context", "model", ...(tools ? ["tools"] : []), "answer"];
  const nodes = allNodes.filter((node) => visible.includes(node.id));
  const current = nodes.find((n) => n.id === selected[step]) ?? nodes.find((n) => n.id === ["input", "model", "answer"][step]) ?? nodes[0];
  return (
    <div className={`demo whole-demo story-beat-${step}`}>
      <div className="story-stage">
        {step === 0 && <div className="question-bubble">{prompt || text(l("How many pencils are left?", "Kolik tužek zbývá?"), lang)}</div>}
        <div className="whole-flow">
          {nodes.map((node, i) => (
            <button
              className={`whole-node ${node.id === "model" ? "model-node" : ""} ${current.id === node.id ? "selected" : ""}`}
              key={node.id}
              aria-pressed={current.id === node.id}
              onClick={() => setSelected([
                step === 0 ? node.id : selected[0],
                step === 1 ? node.id : selected[1],
                step === 2 ? node.id : selected[2],
              ])}
            >
              <span className={`circle color-${i % 4}`}>{i + 1}</span>
              <span>{text(node.name, lang)}</span>
              {step === 1 && node.id === "model" && <span className="model-layers" aria-hidden="true">
                <i>{text(l("Embeddings", "Embeddingy"), lang)}</i><i>{text(l("Attention", "Pozornost"), lang)}</i><i>{text(l("Feed-forward", "Dopředné vrstvy"), lang)}</i>
              </span>}
            </button>
          ))}
        </div>
        {step === 2 && tools && <p className="tool-return">
          <span>{text(l("Tool result", "Výsledek nástroje"), lang)}</span><Arrow />
          <span>{text(l("Context", "Kontext"), lang)}</span><Arrow />
          <span>{text(l("Next model turn", "Další krok modelu"), lang)}</span>
        </p>}
        <p className="whole-explanation" key={current.id}>{text(current.description, lang)}</p>
      </div>
      <div className="story-controls">
        {step === 0 && <label className="demo-controls">
          {text(l("Change the question", "Změň otázku"), lang)}
          <input value={prompt} maxLength={120} placeholder={text(l("How many pencils are left?", "Kolik tužek zbývá?"), lang)} onChange={(e) => setPrompt(e.target.value)} />
        </label>}
        {step === 2 && <div className="inline-controls">
        <label className="check">
          <input
            type="checkbox"
            checked={rag}
            onChange={(e) => setRag(e.target.checked)}
          />
          RAG
        </label>
        <label className="check">
          <input
            type="checkbox"
            checked={tools}
            onChange={(e) => setTools(e.target.checked)}
          />
          {text(l("Tools", "Nástroje"), lang)}
        </label>
        </div>}
      </div>
      <details className="demo-details">
        <summary>{text(l("Component details", "Podrobnosti o části systému"), lang)}</summary>
        <p>{text(l("Retrieval and tools are optional. An LLM can generate without a vector database. Tool outputs can cause another model turn.", "Vyhledávání a nástroje jsou volitelné. LLM může generovat bez vektorové databáze. Výstup nástroje může vyvolat další krok modelu."), lang)}</p>
        <a className="small-button" href={`#/${current.lesson}`}>
          {text(l("Revisit this idea", "Vrať se k této myšlence"), lang)}
        </a>
      </details>
    </div>
  );
}
