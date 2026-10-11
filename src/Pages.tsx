import { useState } from "react";
import {
  groups,
  lessons,
  l,
  sources,
  glossary,
  text,
  type Lang,
} from "./content";
import { Arrow, Icon, Network } from "./components";

export function Home({ lang, completed }: { lang: Lang; completed: string[] }) {
  const next = lessons.find((lesson) => !completed.includes(lesson.id));
  return (
    <div className="home-page">
      <section className="hero">
        <div>
          <h1>
            {text(l("How AI works.", "Jak funguje AI."), lang)}
            <br />
            <span>{text(l("See it. Try it.", "Zkus si to."), lang)}</span>
          </h1>
          <p>
            {text(
              l(
                "16 interactive chapters, with deeper explanations and original sources when you need them.",
                "16 interaktivních kapitol. Podrobnosti a původní zdroje najdeš, když je potřebuješ.",
              ),
              lang,
            )}
          </p>
          <div className="hero-actions">
            <a className="primary" href={`#/${next?.id ?? "ai"}`}>
              {text(
                completed.length
                  ? l("Keep exploring", "Pokračuj v objevování")
                  : l("Start exploring", "Začni objevovat"),
                lang,
              )}
              <Arrow />
            </a>
            <a className="secondary" href="#/chapters">
              {text(l("Pick a chapter", "Vyber si kapitolu"), lang)}
            </a>
          </div>
        </div>
        <Network hero lang={lang} />
      </section>
      <CourseMap lang={lang} completed={completed} />
      <section className="game-band">
        <div>
          <h2>
            {text(
              l(
                "What if an AI only wanted more paperclips?",
                "Co když AI chce jen více sponek?",
              ),
              lang,
            )}
          </h2>
          <p>
            {text(
              l(
                "A short game about goals, guardrails and side effects.",
                "Krátká hra o cílech, pojistkách a vedlejších účincích.",
              ),
              lang,
            )}
          </p>
          <a className="primary" href="#/game">
            {text(l("Play the game", "Zahraj si"), lang)}
            <Arrow />
          </a>
        </div>
        <img
          src="./clipbot.png"
          alt={text(
            l(
              "Cute paperclip robot with a plant",
              "Roztomilý robot se sponkou a rostlinou",
            ),
            lang,
          )}
        />
      </section>
    </div>
  );
}

export function CourseMap({
  lang,
  completed,
}: {
  lang: Lang;
  completed: string[];
}) {
  return (
    <section className="course-map">
      <h2>{text(l("Chapters", "Kapitoly"), lang)}</h2>
      <div className="course-groups">
        {groups.map((group, i) => (
          <section key={i}>
            <h3>
              <span className={`color-${i}`}>
                {String(i + 1).padStart(2, "0")}
              </span>
              {text(group, lang)}
            </h3>
            <div className="course-rows">
              {lessons
                .filter((lesson) => lesson.group === i)
                .map((lesson) => (
                  <a
                    href={`#/${lesson.id}`}
                    key={lesson.id}
                    className="course-row"
                  >
                    <span className={`chapter-icon color-${i}`}>
                      <Icon name={lesson.id} />
                    </span>
                    <span>
                      <strong>{text(lesson.name, lang)}</strong>
                      <small>{text(lesson.subtitle, lang)}</small>
                    </span>
                    {completed.includes(lesson.id) && (
                      <span
                        className="done-mark"
                        aria-label={text(
                          l("Marked complete", "Označeno za dokončené"),
                          lang,
                        )}
                      >
                        ✓
                      </span>
                    )}
                  </a>
                ))}
            </div>
          </section>
        ))}
      </div>
    </section>
  );
}

export function Progress({
  lang,
  completed,
}: {
  lang: Lang;
  completed: string[];
}) {
  const next = lessons.find((lesson) => !completed.includes(lesson.id));
  return (
    <div>
      <h1>
        {text(
          l("Your progress", "Tvůj postup"),
          lang,
        )}
      </h1>
      <p className="intro">
        {text(
          l(
            "Your progress stays in this browser. Mark a chapter when you feel ready to move on.",
            "Postup zůstává v tomto prohlížeči. Označ kapitolu, když chceš pokračovat dál.",
          ),
          lang,
        )}
      </p>
      <div className="progress-summary">
        <strong>
          {completed.length}
          <span> / {lessons.length}</span>
        </strong>
        <p>
          {text(
            l("chapters marked complete", "kapitol označených za dokončené"),
            lang,
          )}
        </p>
        <div className="output-gauge">
          <span
            style={{ width: `${(completed.length / lessons.length) * 100}%` }}
          />
        </div>
        <a className="primary" href={`#/${next?.id ?? "whole"}`}>
          {text(
            next
              ? l("Continue the course", "Pokračuj v kurzu")
              : l("Revisit the whole picture", "Zopakuj si celý obrázek"),
            lang,
          )}
          <Arrow />
        </a>
      </div>
      <CourseMap lang={lang} completed={completed} />
    </div>
  );
}

export function Library({ lang }: { lang: Lang }) {
  const [query, setQuery] = useState("");
  const visible = sources.filter((source) =>
    `${source.id} ${source.title} ${source.author} ${source.note[lang]}`
      .toLocaleLowerCase()
      .includes(query.toLocaleLowerCase()),
  );
  return (
    <div className="library">
      <h1>
        {text(
          l("Sources", "Zdroje"),
          lang,
        )}
      </h1>
      <p className="intro">
        {text(
          l(
            "Books, papers and documentation used in this course.",
            "Knihy, studie a dokumentace použité v tomto kurzu.",
          ),
          lang,
        )}
      </p>
      <label className="library-search">
        {text(l("Find a source", "Najdi zdroj"), lang)}
        <input
          type="search"
          maxLength={100}
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder={text(
            l(
              "Try “tokens”, “RAG” or an author…",
              "Zkus „tokeny“, „RAG“ nebo autora…",
            ),
            lang,
          )}
        />
      </label>
      <p className="source-note">
        {text(
          l(
            "Research checked 11 October 2026. These are selected foundations, not every AI topic. Papers can have limitations; AGI and alignment have open questions. This site is an independent educational project.",
            "Zdroje ověřeny 11. října 2026. Jde o vybrané základy, ne všechny oblasti AI. Studie mají omezení; AGI a soulad cílů mají otevřené otázky. Web je nezávislý vzdělávací projekt.",
          ),
          lang,
        )}
      </p>
      <div className="source-list">
        {visible.map((source, i) => (
          <a
            className="source-row"
            href={source.url}
            key={source.id}
            target="_blank"
            rel="noreferrer"
          >
            <span className={`source-index color-${i % 4}`}>
              <Icon name="sources" />
            </span>
            <span>
              <strong>{source.title}</strong>
              <small>
                {source.author} · {source.year}
              </small>
              <p>{text(source.note, lang)}</p>
            </span>
            <Arrow />
          </a>
        ))}
      </div>
      {!visible.length && (
        <p>
          {text(l("No matching sources.", "Žádné odpovídající zdroje."), lang)}
        </p>
      )}
      <section className="glossary">
        <h2>{text(l("A pocket glossary", "Malý slovníček"), lang)}</h2>
        {glossary.map(([term, definition]) => (
          <details key={term}>
            <summary>
              {term}
              <span>+</span>
            </summary>
            <p>{text(definition, lang)}</p>
          </details>
        ))}
      </section>
      <p>
        {text(l("Visual inspiration", "Vizuální inspirace"), lang)}:{" "}
        <a
          href="https://www.awwwards.com/websites/animation/"
          target="_blank"
          rel="noreferrer"
        >
          Awwwards animation gallery
        </a>{" "}
        ·{" "}
        <a
          href="https://poloclub.github.io/transformer-explainer/"
          target="_blank"
          rel="noreferrer"
        >
          Transformer Explainer
        </a>
        .
      </p>
    </div>
  );
}

export function GamePage({ lang, motion }: { lang: Lang; motion: boolean }) {
  const [ready, setReady] = useState(false);
  const origin = import.meta.env.DEV
    ? "http://127.0.0.1:4174/"
    : "https://Majkey25.github.io/little-clip-factory/";
  const url = `${origin}?lang=${lang}&embed=1${motion ? "" : "&motion=off"}`;
  return (
    <div className="game-page">
      <div className="game-page-heading">
        <div>
          <h1>Little Clip Factory</h1>
          <p className="intro">
            {text(
              l(
                "A small goal. Some big consequences.",
                "Malý cíl. Velké následky.",
              ),
              lang,
            )}
          </p>
        </div>
        <a
          className="secondary"
          href={`${origin}?lang=${lang}`}
          target="_blank"
          rel="noreferrer"
        >
          {text(l("Open full game", "Otevři celou hru"), lang)}
          <Arrow />
        </a>
      </div>
      <p className="game-credit">
        {text(l("Inspired by", "Inspirováno hrou"), lang)}{" "}
        <a
          href="https://www.decisionproblem.com/paperclips/"
          target="_blank"
          rel="noreferrer"
        >
          Universal Paperclips
        </a>{" "}
        {text(
          l(
            "by Frank Lantz, with original code and art. The game bot follows simple rules; it is not an AGI.",
            "od Franka Lantze, s vlastním kódem a grafikou. Herní bot se řídí jednoduchými pravidly, není to AGI.",
          ),
          lang,
        )}
      </p>
      {!ready && (
        <p role="status">
          {text(l("Loading the factory…", "Načítám továrnu…"), lang)}
        </p>
      )}
      <iframe
        key={`${lang}${motion}`}
        src={url}
        title={text(
          l(
            "Little Clip Factory educational game",
            "Vzdělávací hra Little Clip Factory",
          ),
          lang,
        )}
        className="game-frame"
        onLoad={() => setReady(true)}
        sandbox="allow-scripts allow-same-origin allow-popups allow-popups-to-escape-sandbox"
      />
      <div className="game-links">
        <a href="#/alignment">
          {text(
            l("Connect the game to alignment", "Propoj hru se souladem cílů"),
            lang,
          )}
        </a>
        <a
          href="https://github.com/Majkey25/little-clip-factory"
          target="_blank"
          rel="noreferrer"
        >
          {text(l("Game source code", "Zdrojový kód hry"), lang)}
        </a>
      </div>
    </div>
  );
}
