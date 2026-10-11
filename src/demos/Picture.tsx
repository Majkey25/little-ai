import { useState } from "react";
import { l, text } from "../content";
import { Flow, Note, Slider, LineChart, type DemoProps } from "../components";

export function AgentsDemo({ lang, step }: DemoProps) {
  const [breadth, setBreadth] = useState(25);
  const [skill, setSkill] = useState(60);
  const [autonomy, setAutonomy] = useState(30);
  const [reliability, setReliability] = useState(0.95);
  const roles = [
    l("Language", "Jazyk"),
    l("Planning", "Plánování"),
    l("Learning new tasks", "Učení nových úloh"),
    l("Physical tasks", "Fyzické úlohy"),
  ];
  return (
    <div className="demo">
      <div className="agents-layout">
        <div>
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
          <Note>
            {text(
              l(
                "Conceptual sliders, not benchmark results or an AGI threshold.",
                "Myšlenkové posuvníky, ne výsledky benchmarku ani hranice AGI.",
              ),
              lang,
            )}
          </Note>
          <Flow
            labels={[
              text(l("Observe", "Pozoruj"), lang),
              text(l("Plan & act", "Plánuj a jednej"), lang),
              text(l("Check / stop", "Ověř / zastav"), lang),
            ]}
            active={step}
          />
        </div>
        <div className="demo-controls">
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
      </div>
      <div className="reliability-block">
        <Slider
          label={text(
            l(
              "Success per independent action",
              "Úspěch jednoho nezávislého kroku",
            ),
            lang,
          )}
          value={reliability}
          min={0.7}
          max={1}
          step={0.01}
          onChange={setReliability}
        />
        <div>
          <strong>{(reliability ** 20 * 100).toFixed(1)}%</strong>
          <span>
            {text(l("chance all 20 succeed", "šance na úspěch všech 20"), lang)}
          </span>
          <code>p²⁰</code>
        </div>
      </div>
      <Note>
        {text(
          l(
            "The probability calculation assumes independent failures. Real systems may have correlated failures.",
            "Výpočet předpokládá nezávislé chyby. Ve skutečných systémech mohou chyby souviset.",
          ),
          lang,
        )}
      </Note>
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
    <div className="demo">
      <div className="alignment-layout">
        <div className="robot-scene">
          <img
            src="./clipbot.png"
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
        </div>
        <div className="demo-controls">
          <h3>{text(l("Choose the objective", "Vyber cíl"), lang)}</h3>
          <div className="policy-switch">
            <button
              className={!safe ? "selected" : ""}
              onClick={() => setSafe(false)}
            >
              {text(l("Maximize clips", "Maximum sponek"), lang)}
            </button>
            <button
              className={safe ? "selected" : ""}
              onClick={() => setSafe(true)}
            >
              {text(l("Protect the world", "Chraň svět"), lang)}
            </button>
          </div>
          <div className="world-meter">
            <span>
              {text(l("World resources", "Zdroje světa"), lang)}
              <strong>{world}/100</strong>
            </span>
            <div className="output-gauge">
              <span
                style={{
                  width: `${world}%`,
                  background: world < 60 ? "#ed9098" : "#79bf9d",
                }}
              />
            </div>
          </div>
          <div className="metric-row">
            <span>
              {text(l("Paperclips", "Sponky"), lang)} <strong>{clips}</strong>
            </span>
          </div>
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
      </div>
      <LineChart
        values={history}
        max={100}
        label={text(
          l("World resources after each batch", "Zdroje světa po každé dávce"),
          lang,
        )}
        color="#79bf9d"
      />
      <a className="primary" href="#/game">
        {text(
          l(
            "Play the full Little Clip Factory game",
            "Zahraj celou hru Little Clip Factory",
          ),
          lang,
        )}
      </a>
      <Note>
        {text(
          l(
            "Deterministic toy simulation. It illustrates goal design, not an AGI prediction.",
            "Jednoduchá deterministická simulace. Ukazuje návrh cílů, ne předpověď AGI.",
          ),
          lang,
        )}{" "}
        {step === 2 &&
          text(
            l(
              "You can always stop or change the policy.",
              "Vždy můžeš zastavit nebo změnit politiku.",
            ),
            lang,
          )}
      </Note>
    </div>
  );
}

const engineeringSteps = [
  {
    name: l("Contract", "Zadání"),
    body: l(
      "A customer buys two items at 10 each. Total must be 20. Zero items must cost 0. State these criteria before coding.",
      "Zákazník koupí dvě položky po 10. Celkem zaplatí 20. Nula položek musí stát 0. Urči tato kritéria před psaním kódu.",
    ),
  },
  {
    name: l("Implement", "Implementace"),
    body: l(
      "An agent proposes a change. It receives relevant files, interfaces and constraints. The proposed diff is evidence of work, not of correctness.",
      "Agent navrhne změnu. Dostane relevantní soubory, rozhraní a omezení. Navržený diff dokládá práci, ne správnost.",
    ),
  },
  {
    name: l("Verify", "Ověření"),
    body: l(
      "Compile, check types, test important cases and inspect the real workflow. Select the bug below, then run the acceptance checks.",
      "Sestav aplikaci, ověř typy, otestuj důležité případy a projdi skutečný průchod. Vyber chybu a spusť kontrolu kritérií.",
    ),
  },
  {
    name: l("Deliver", "Doručení"),
    body: l(
      "Use a small reviewed change and a reversible release. CI runs checks; publication is a separate action. A failed check blocks this example.",
      "Doruč malou zkontrolovanou změnu s možností návratu. CI spouští kontroly; publikace je samostatná akce. Selhání kontroly blokuje ukázku.",
    ),
  },
  {
    name: l("Observe", "Sledování"),
    body: l(
      "Monitor the actual user result, errors and latency. If it breaks, restore a known working version. Feed the evidence into the next change.",
      "Sleduj skutečný výsledek uživatele, chyby a odezvu. Při poruše obnov funkční verzi. Důkazy použij při další změně.",
    ),
  },
];
export function EngineeringDemo({ lang }: DemoProps) {
  const [phase, setPhase] = useState(0);
  const [broken, setBroken] = useState(true);
  const [checked, setChecked] = useState(false);
  const cases = [
    [10, 2, 20],
    [10, 0, 0],
    [2.5, 3, 7.5],
  ];
  const actual = cases.map(([price, quantity]) =>
    broken ? price + quantity : price * quantity,
  );
  const passed = actual.every((result, i) => result === cases[i][2]);
  return (
    <div className="demo">
      <div className="engineering-flow">
        {engineeringSteps.map((item, i) => (
          <button
            key={i}
            className={phase === i ? "selected" : ""}
            onClick={() => setPhase(i)}
          >
            <span className={`circle color-${i % 4}`}>{i + 1}</span>
            {text(item.name, lang)}
          </button>
        ))}
      </div>
      <p className="phase-description" key={phase}>
        {text(engineeringSteps[phase].body, lang)}
      </p>
      <div className="engineering-check">
        <div>
          <label className="check">
            <input
              type="checkbox"
              checked={broken}
              onChange={(e) => {
                setBroken(e.target.checked);
                setChecked(false);
              }}
            />
            {text(l("Include an arithmetic bug", "Vlož početní chybu"), lang)}
          </label>
          <pre>{`function total(price, quantity) {\n  return price ${broken ? "+" : "*"} quantity;\n}`}</pre>
          <button className="primary" onClick={() => setChecked(true)}>
            {text(l("Run acceptance checks", "Spusť kontrolu kritérií"), lang)}
          </button>
        </div>
        <div>
          <h3>
            {text(l("Expected versus actual", "Očekávané a skutečné"), lang)}
          </h3>
          {cases.map(([price, quantity, expected], i) => (
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
          <p role="status">
            {checked
              ? text(
                  passed
                    ? l(
                        "These checks passed. Live integration still needs verification.",
                        "Tyto kontroly prošly. Skutečnou integraci stále ověř.",
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
        </div>
      </div>
      <Note>
        {text(
          l(
            "The arithmetic checks really execute. The delivery pipeline is an illustration, not a real deployment.",
            "Početní kontroly se skutečně provedou. Doručovací průchod je ilustrace, ne skutečné nasazení.",
          ),
          lang,
        )}
      </Note>
    </div>
  );
}

export function WholeDemo({ lang, step }: DemoProps) {
  const [rag, setRag] = useState(true);
  const [tools, setTools] = useState(true);
  const [selected, setSelected] = useState("input");
  const nodes = [
    {
      id: "input",
      name: l("Your question", "Tvoje otázka"),
      description: l(
        "Text is converted to token IDs with a tokenizer.",
        "Tokenizer převede text na ID tokenů.",
      ),
      lesson: "tokens",
    },
    ...(rag
      ? [
          {
            id: "rag",
            name: l("Retrieve", "Vyhledej"),
            description: l(
              "The app searches an external index and checks the selected documents.",
              "Aplikace prohledá externí index a ověří vybrané dokumenty.",
            ),
            lesson: "retrieval",
          },
        ]
      : []),
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
    ...(tools
      ? [
          {
            id: "tools",
            name: l("Optional tools", "Volitelné nástroje"),
            description: l(
              "The model can request a tool. The app runs it and returns the result to context.",
              "Model může požádat o nástroj. Aplikace jej spustí a vrátí výsledek do kontextu.",
            ),
            lesson: "tools",
          },
        ]
      : []),
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
  const current = nodes.find((n) => n.id === selected) ?? nodes[0];
  return (
    <div className="demo whole-demo">
      <div className="inline-controls">
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
      </div>
      <div className="whole-flow">
        {nodes.map((node, i) => (
          <button
            className={`whole-node ${current.id === node.id ? "selected" : ""} ${i <= step * 2 ? "lit" : ""}`}
            key={node.id}
            onClick={() => setSelected(node.id)}
          >
            <span className={`circle color-${i % 4}`}>{i + 1}</span>
            {text(node.name, lang)}
          </button>
        ))}
      </div>
      <div className="whole-explanation" key={current.id}>
        <h3>{text(current.name, lang)}</h3>
        <p>{text(current.description, lang)}</p>
        <a className="small-button" href={`#/${current.lesson}`}>
          {text(l("Revisit this idea", "Vrať se k této myšlence"), lang)}
        </a>
      </div>
      <Note>
        {text(
          l(
            "A typical app architecture. Retrieval and tools are optional. Tool outputs can cause another model turn.",
            "Typická architektura aplikace. RAG a nástroje jsou volitelné. Výstup nástroje může vyvolat další krok modelu.",
          ),
          lang,
        )}
      </Note>
    </div>
  );
}
