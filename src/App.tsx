import { useEffect, useRef, useState } from "react";
import { l, lessons, text, type Lang } from "./content";
import { Icon, Star } from "./components";
import { Home, CourseMap, Library, GamePage } from "./Pages";
import { Lesson } from "./Lesson";

const reducedMotionQuery = "(prefers-reduced-motion: reduce)";

function initialLanguage(): Lang {
  const supplied = new URLSearchParams(window.location.search).get("lang");
  if (supplied === "cs" || supplied === "en") return supplied;
  try {
    return localStorage.getItem("little-ai-language") === "cs" ? "cs" : "en";
  } catch {
    return "en";
  }
}
function routeFromHash(): string {
  return window.location.hash.replace(/^#\/?/, "").split("?")[0];
}

export default function App() {
  const [lang, setLang] = useState<Lang>(initialLanguage);
  const [route, setRoute] = useState(routeFromHash);
  const [menu, setMenu] = useState(false);
  const [storageError, setStorageError] = useState(false);
  const [motion, setMotion] = useState(
    () => !window.matchMedia(reducedMotionQuery).matches,
  );
  const picker = useRef<HTMLDivElement>(null);
  const menuButton = useRef<HTMLButtonElement>(null);
  const previousRoute = useRef(route);
  const lesson = lessons.find((item) => item.id === route);
  const index = lessons.findIndex((item) => item.id === route);
  const closeMenu = () => {
    setMenu(false);
  };
  const chooseLanguage = (next: Lang) => {
    setLang(next);
    // An explicit choice must survive reloads of a ?lang= link.
    const url = new URL(window.location.href);
    if (!url.searchParams.has("lang")) return;
    url.searchParams.set("lang", next);
    window.history.replaceState(window.history.state, "", url);
  };
  useEffect(() => {
    const update = () => {
      setRoute(routeFromHash());
      const supplied = new URLSearchParams(window.location.search).get("lang");
      if (supplied === "cs" || supplied === "en") setLang(supplied);
      setMenu(false);
      window.scrollTo(0, 0);
    };
    window.addEventListener("hashchange", update);
    window.addEventListener("popstate", update);
    return () => {
      window.removeEventListener("hashchange", update);
      window.removeEventListener("popstate", update);
    };
  }, []);
  useEffect(() => {
    // Turning the system preference off must not override a manual motion-off choice.
    const query = window.matchMedia(reducedMotionQuery);
    const update = () => {
      if (query.matches) setMotion(false);
    };
    query.addEventListener("change", update);
    return () => query.removeEventListener("change", update);
  }, []);
  useEffect(() => {
    if (previousRoute.current === route) return;
    previousRoute.current = route;
    document.getElementById("main")?.focus({ preventScroll: true });
  }, [route]);
  useEffect(() => {
    document.documentElement.lang = lang;
    document.title = lesson
      ? `${text(lesson.name, lang)} · Little AI`
      : `Little AI · ${text(l("How AI works", "Jak funguje AI"), lang)}`;
    try {
      localStorage.setItem("little-ai-language", lang);
    } catch {
      setStorageError(true);
    }
  }, [lang, lesson]);
  useEffect(() => {
    if (!menu) return;
    const close = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setMenu(false);
        return;
      }
      if (event.key !== "Tab") return;
      const controls = picker.current?.querySelectorAll<HTMLElement>(
        "a[href], button:not([disabled])",
      );
      if (!controls?.length) return;
      const first = controls[0];
      const last = controls[controls.length - 1];
      if (
        !picker.current?.contains(document.activeElement) ||
        (event.shiftKey && document.activeElement === first) ||
        (!event.shiftKey && document.activeElement === last)
      ) {
        event.preventDefault();
        (event.shiftKey ? last : first).focus();
      }
    };
    window.addEventListener("keydown", close);
    (
      picker.current?.querySelector<HTMLElement>('[aria-current="page"]') ??
      picker.current?.querySelector("a")
    )?.focus();
    return () => {
      window.removeEventListener("keydown", close);
      menuButton.current?.focus();
    };
  }, [menu]);
  return (
    <div className={`app ${motion ? "" : "motion-off"}`}>
      <a
        className="skip-link"
        href="#main"
        inert={menu}
        onClick={(event) => {
          event.preventDefault();
          document.getElementById("main")?.focus();
        }}
      >
        {text(l("Skip to content", "Přejít k obsahu"), lang)}
      </a>
      <header className="topbar">
        <a className="topbar-brand" href="#/" inert={menu}>
          <Star size={26} />
          <span>little ai</span>
        </a>
        <button
          ref={menuButton}
          inert={menu}
          className="menu-button"
          aria-expanded={menu}
          aria-controls="chapter-picker"
          onClick={() => setMenu(!menu)}
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
          <span className="control-label">
            {text(l("Chapters", "Kapitoly"), lang)}
          </span>
        </button>
        <div className="header-controls" inert={menu}>
          <button
            className={`motion-button ${motion ? "on" : ""}`}
            aria-pressed={motion}
            onClick={() => setMotion(!motion)}
          >
            <span className="control-label">
              {text(
                motion
                  ? l("Animations on", "Animace zapnuté")
                  : l("Animations off", "Animace vypnuté"),
                lang,
              )}
            </span>
            <svg
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              aria-hidden="true"
            >
              <path d="M3 9q3-4 6 0t6 0 6 0M3 16q3-4 6 0t6 0 6 0" />
            </svg>
          </button>
          <div
            role="group"
            className="language-switch"
            aria-label={text(l("Language", "Jazyk"), lang)}
          >
            <button
              aria-pressed={lang === "en"}
              className={lang === "en" ? "selected" : ""}
              onClick={() => chooseLanguage("en")}
            >
              EN
            </button>
            <button
              aria-pressed={lang === "cs"}
              className={lang === "cs" ? "selected" : ""}
              onClick={() => chooseLanguage("cs")}
            >
              CZ
            </button>
          </div>
        </div>
      </header>
      {menu && (
        <>
          <button
            className="menu-backdrop"
            tabIndex={-1}
            aria-label={text(l("Close chapters", "Zavři kapitoly"), lang)}
            onClick={closeMenu}
          />
          <div
            id="chapter-picker"
            ref={picker}
            className="chapter-picker"
            role="dialog"
            aria-modal="true"
            aria-label={text(l("Chapters", "Kapitoly"), lang)}
            onClick={(event) => {
              if (event.target instanceof Element && event.target.closest("a"))
                closeMenu();
            }}
          >
            <nav aria-label={text(l("Chapters", "Kapitoly"), lang)}>
              <CourseMap lang={lang} current={route} />
              <div className="picker-links">
                <a href="#/" aria-current={!route ? "page" : undefined}>
                  <Icon name="home" />
                  {text(l("Home", "Úvod"), lang)}
                </a>
                <a
                  href="#/sources"
                  aria-current={route === "sources" ? "page" : undefined}
                >
                  <Icon name="sources" />
                  {text(l("Source library", "Knihovna zdrojů"), lang)}
                </a>
                <a
                  href="#/game"
                  aria-current={route === "game" ? "page" : undefined}
                >
                  <Icon name="ai" />
                  Little Clip Factory
                </a>
                <a
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
            <button className="small-button picker-close" onClick={closeMenu}>
              {text(l("Close", "Zavřít"), lang)}
            </button>
          </div>
        </>
      )}
      <main
        id="main"
        className="main-content"
        tabIndex={-1}
        key={route}
        inert={menu}
      >
        {storageError && (
          <p className="storage-message" role="status">
            {text(
              l(
                "Browser storage is unavailable. Your language choice lasts only until this page closes.",
                "Úložiště prohlížeče není dostupné. Volba jazyka vydrží jen do zavření stránky.",
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
            previous={lessons[index - 1]?.id}
            next={lessons[index + 1]?.id}
            motion={motion}
          />
        ) : !route ? (
          <Home lang={lang} />
        ) : route === "chapters" || route === "progress" ? (
          <CourseMap lang={lang} heading="h1" />
        ) : route === "sources" ? (
          <Library lang={lang} />
        ) : route === "game" ? (
          <GamePage lang={lang} motion={motion} />
        ) : (
          <div>
            <h1>
              {text(
                l("This chapter wandered off.", "Tahle kapitola se zatoulala."),
                lang,
              )}
            </h1>
            <a className="primary" href="#/chapters">
              {text(l("Show all chapters", "Ukaž všechny kapitoly"), lang)}
            </a>
          </div>
        )}
      </main>
      <footer className="site-footer" inert={menu}>
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
  );
}
