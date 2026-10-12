import { useState } from "react";
import clipbot from "./assets/clipbot.webp";
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

export function Home({ lang }: { lang: Lang }) {
  return (
    <div className="home-page">
      <section className="hero">
        <div>
          <h1>
            {text(l("How AI works.", "Jak funguje AI."), lang)}
          </h1>
          <p>
            {text(
              l(
                "Interactive explanations, from tokens to image generation.",
                "Interaktivní vysvětlení od tokenů po generování obrázků.",
              ),
              lang,
            )}
          </p>
          <a className="primary" href={`#/${lessons[0].id}`}>
            {text(l("Open the first chapter", "Otevři první kapitolu"), lang)}
            <Arrow />
          </a>
        </div>
        <Network hero lang={lang} />
      </section>
      <CourseMap lang={lang} />
      <section className="game-band">
        <div>
          <h2>Little Clip Factory</h2>
          <a className="primary" href="#/game">
            {text(l("Play the game", "Zahraj si"), lang)}
            <Arrow />
          </a>
        </div>
        <img
          src={clipbot}
          loading="lazy"
          decoding="async"
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
  current,
  heading: Heading = "h2",
}: {
  lang: Lang;
  current?: string;
  heading?: "h1" | "h2";
}) {
  return (
    <section className="course-map">
      <Heading>{text(l("Chapters", "Kapitoly"), lang)}</Heading>
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
                    aria-current={current === lesson.id ? "page" : undefined}
                  >
                    <span className={`chapter-icon color-${i}`}>
                      <Icon name={lesson.id} />
                    </span>
                    <span>
                      <strong>{text(lesson.name, lang)}</strong>
                      <small>{text(lesson.subtitle, lang)}</small>
                    </span>
                  </a>
                ))}
            </div>
          </section>
        ))}
      </div>
    </section>
  );
}

export function Library({ lang }: { lang: Lang }) {
  const [query, setQuery] = useState("");
  const year = (source: (typeof sources)[number]) =>
    typeof source.year === "string" ? source.year : text(source.year, lang);
  const search = query.trim().toLocaleLowerCase();
  const visible = sources.filter((source) =>
    `${source.id} ${source.title} ${source.author} ${year(source)} ${source.note[lang]}`
      .toLocaleLowerCase()
      .includes(search),
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
            "Books, papers and documentation behind these chapters.",
            "Knihy, studie a dokumentace, ze kterých kapitoly vycházejí.",
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
            "Sources checked 11 October 2026.",
            "Zdroje ověřeny 11. října 2026.",
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
                {source.author} · {year(source)}
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
        <h2>{text(l("Glossary", "Slovníček"), lang)}</h2>
        {glossary.map(([term, definition]) => (
          <details key={term}>
            <summary>
              {term}
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

function GameFrame({ url, lang }: { url: string; lang: Lang }) {
  const [ready, setReady] = useState(false);
  return (
    <>
      {!ready && (
        <p role="status">
          {text(l("Loading the factory…", "Načítám továrnu…"), lang)}
        </p>
      )}
      <iframe
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
    </>
  );
}

export function GamePage({ lang, motion }: { lang: Lang; motion: boolean }) {
  const origin = import.meta.env.DEV
    ? "http://127.0.0.1:4174/"
    : "https://Majkey25.github.io/little-clip-factory/";
  const fullUrl = `${origin}?lang=${lang}${motion ? "" : "&motion=off"}`;
  const url = `${fullUrl}&embed=1`;
  return (
    <div className="game-page">
      <div className="game-page-heading">
        <div>
          <h1>Little Clip Factory</h1>
        </div>
        <a
          className="secondary"
          href={fullUrl}
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
            "by Frank Lantz.",
            "od Franka Lantze.",
          ),
          lang,
        )}
      </p>
      <GameFrame key={url} url={url} lang={lang} />
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
