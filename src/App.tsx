import { useEffect, useState } from "react";
import { groups, l, lessons, text, type Lang } from "./content";
import { parseProgress } from "./math";
import { Icon, Star } from "./components";
import { Home, CourseMap, Progress, Library, GamePage } from "./Pages";
import { Lesson } from "./Lesson";

function initialLanguage(): Lang {
  const supplied = new URLSearchParams(window.location.search).get("lang");
  if (supplied === "cs" || supplied === "en") return supplied;
  try {
    return localStorage.getItem("little-ai-language") === "cs" ? "cs" : "en";
  } catch {
    return "en";
  }
}
function initialProgress(): string[] {
  try {
    return parseProgress(
      JSON.parse(localStorage.getItem("little-ai-progress") ?? "[]"),
      lessons.map((lesson) => lesson.id),
    );
  } catch {
    return [];
  }
}
function routeFromHash(): string {
  return window.location.hash.replace(/^#\/?/, "").split("?")[0];
}

export default function App() {
  const [lang, setLang] = useState<Lang>(initialLanguage);
  const [route, setRoute] = useState(routeFromHash);
  const [completed, setCompleted] = useState(initialProgress);
  const [menu, setMenu] = useState(false);
  const [storageError, setStorageError] = useState(false);
  const [motion, setMotion] = useState(
    () => !window.matchMedia("(prefers-reduced-motion: reduce)").matches,
  );
  const lesson = lessons.find((item) => item.id === route);
  const index = lessons.findIndex((item) => item.id === route);
  useEffect(() => {
    const update = () => {
      setRoute(routeFromHash());
      setMenu(false);
      window.scrollTo(0, 0);
    };
    window.addEventListener("hashchange", update);
    return () => window.removeEventListener("hashchange", update);
  }, []);
  useEffect(() => {
    document.documentElement.lang = lang;
    document.title = lesson
      ? `${text(lesson.name, lang)} · Little AI`
      : `Little AI · ${text(l("How AI works", "Jak funguje AI"), lang)}`;
    try {
      localStorage.setItem("little-ai-language", lang);
      localStorage.setItem("little-ai-progress", JSON.stringify(completed));
    } catch {
      setStorageError(true);
    }
  }, [lang, completed, lesson]);
  useEffect(() => {
    const close = (event: KeyboardEvent) => {
      if (event.key === "Escape") setMenu(false);
    };
    window.addEventListener("keydown", close);
    return () => window.removeEventListener("keydown", close);
  }, []);
  const title = lesson
    ? `${text(groups[lesson.group], lang)} / ${text(lesson.name, lang)}`
    : route === "sources"
      ? text(l("Source library", "Knihovna zdrojů"), lang)
      : route === "progress"
        ? text(l("Your progress", "Tvůj postup"), lang)
        : route === "game"
          ? "Little Clip Factory"
          : text(l("Course", "Kurz"), lang);
  return (
    <div className={`app ${motion ? "" : "motion-off"}`}>
      <a
        className="skip-link"
        href="#main"
        onClick={(event) => {
          event.preventDefault();
          document.getElementById("main")?.focus();
        }}
      >
        {text(l("Skip to content", "Přejít k obsahu"), lang)}
      </a>
      {menu && (
        <button
          className="menu-backdrop"
          aria-label={text(l("Close navigation", "Zavři navigaci"), lang)}
          onClick={() => setMenu(false)}
        />
      )}
      <aside id="course-nav" className={`sidebar ${menu ? "open" : ""}`}>
        <a className="brand" href="#/">
          <Star />
          <span>little ai</span>
        </a>
        <nav aria-label={text(l("Course chapters", "Kapitoly kurzu"), lang)}>
          <div className="main-links">
            <a
              className={!route || route === "chapters" ? "active" : ""}
              href="#/"
            >
              <Icon name="home" />
              {text(l("Course", "Kurz"), lang)}
            </a>
            <a
              className={route === "progress" ? "active" : ""}
              href="#/progress"
            >
              <Icon name="progress" />
              {text(l("Your progress", "Tvůj postup"), lang)}
            </a>
          </div>
          {groups.map((group, i) => (
            <div className="nav-group" key={i}>
              <p>
                <span>{String(i + 1).padStart(2, "0")}</span>
                {text(group, lang)}
              </p>
              {lessons
                .filter((item) => item.group === i)
                .map((item) => (
                  <a
                    className={route === item.id ? "active" : ""}
                    aria-current={route === item.id ? "page" : undefined}
                    href={`#/${item.id}`}
                    key={item.id}
                  >
                    <span className={`nav-icon color-${i}`}>
                      <Icon name={item.id} />
                    </span>
                    {text(item.name, lang)}
                    {completed.includes(item.id) && (
                      <span className="nav-done">✓</span>
                    )}
                  </a>
                ))}
            </div>
          ))}
          <div className="sidebar-footer">
            <a className={route === "sources" ? "active" : ""} href="#/sources">
              <Icon name="sources" />
              {text(l("Source library", "Knihovna zdrojů"), lang)}
            </a>
            <a className={route === "game" ? "active" : ""} href="#/game">
              <Icon name="ai" />
              Little Clip Factory
            </a>
            <div className="sidebar-progress">
              <span>
                {completed.length} / {lessons.length}
              </span>
              <div>
                <i
                  style={{
                    width: `${(completed.length / lessons.length) * 100}%`,
                  }}
                />
              </div>
            </div>
            <a
              className="github-link"
              href="https://github.com/Majkey25/little-ai"
              target="_blank"
              rel="noreferrer"
            >
              {text(
                l("Source code on GitHub", "Zdrojový kód na GitHubu"),
                lang,
              )}
            </a>
          </div>
        </nav>
      </aside>
      <div className="main-shell">
        <header className="topbar">
          <button
            className="menu-button"
            aria-expanded={menu}
            aria-controls="course-nav"
            onClick={() => setMenu(!menu)}
            aria-label={text(
              l("Open course navigation", "Otevři navigaci kurzu"),
              lang,
            )}
          >
            <svg
              width="22"
              height="22"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth="2"
              aria-hidden="true"
            >
              <path d="M3 6h18M3 12h18M3 18h18" />
            </svg>
          </button>
          <span className="breadcrumb">{title}</span>
          <div className="header-controls">
            <button
              className={`motion-button ${motion ? "on" : ""}`}
              aria-pressed={motion}
              onClick={() => setMotion(!motion)}
            >
              {text(
                motion
                  ? l("Animations on", "Animace zapnuté")
                  : l("Animations off", "Animace vypnuté"),
                lang,
              )}
            </button>
            <div
              className="language-switch"
              aria-label={text(l("Language", "Jazyk"), lang)}
            >
              <button
                aria-pressed={lang === "en"}
                className={lang === "en" ? "selected" : ""}
                onClick={() => setLang("en")}
              >
                EN
              </button>
              <button
                aria-pressed={lang === "cs"}
                className={lang === "cs" ? "selected" : ""}
                onClick={() => setLang("cs")}
              >
                CZ
              </button>
            </div>
          </div>
        </header>
        <main id="main" className="main-content" tabIndex={-1} key={route}>
          {storageError && (
            <p className="storage-message" role="status">
              {text(
                l(
                  "Browser storage is unavailable. Your progress lasts only until this page closes.",
                  "Úložiště prohlížeče není dostupné. Postup vydrží jen do zavření stránky.",
                ),
                lang,
              )}
            </p>
          )}
          {lesson ? (
            <Lesson
              key={lesson.id}
              lesson={lesson}
              lang={lang}
              completed={completed.includes(lesson.id)}
              onComplete={() =>
                setCompleted((current) =>
                  current.includes(lesson.id)
                    ? current
                    : [...current, lesson.id],
                )
              }
              previous={lessons[index - 1]?.id}
              next={lessons[index + 1]?.id}
              motion={motion}
            />
          ) : !route ? (
            <Home lang={lang} completed={completed} />
          ) : route === "chapters" ? (
            <CourseMap lang={lang} completed={completed} />
          ) : route === "progress" ? (
            <Progress lang={lang} completed={completed} />
          ) : route === "sources" ? (
            <Library lang={lang} />
          ) : route === "game" ? (
            <GamePage lang={lang} motion={motion} />
          ) : (
            <div>
              <h1>
                {text(
                  l(
                    "This chapter wandered off.",
                    "Tahle kapitola se zatoulala.",
                  ),
                  lang,
                )}
              </h1>
              <a className="primary" href="#/">
                {text(l("Back to the course", "Zpět do kurzu"), lang)}
              </a>
            </div>
          )}
        </main>
        <footer className="site-footer">
          little ai ·{" "}
          {text(
            l(
              "Small explanations. Real sources.",
              "Malá vysvětlení. Skutečné zdroje.",
            ),
            lang,
          )}
          <a href="#/sources">{text(l("Sources", "Zdroje"), lang)}</a>
        </footer>
      </div>
    </div>
  );
}
