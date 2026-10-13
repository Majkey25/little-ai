import { useEffect, useState } from "react";
import {
  l,
  text,
  sources,
  type Lesson as LessonData,
  type Lang,
} from "./content";
import { Arrow, Icon } from "./components";
import { Demo } from "./demos";

const sceneMilliseconds = 6000;

export function Lesson({
  lesson,
  lang,
  previous,
  next,
  motion,
}: {
  lesson: LessonData;
  lang: Lang;
  previous?: string;
  next?: string;
  motion: boolean;
}) {
  const [step, setStep] = useState(0);
  const [playing, setPlaying] = useState(false);
  const [ready, setReady] = useState(false);
  const [visible, setVisible] = useState(!document.hidden);
  const last = lesson.scenes.length - 1;
  const active = playing && motion && ready && visible;
  const pause = () => setPlaying(false);
  const show = (scene: number) => {
    setStep(scene);
    setPlaying(false);
  };
  useEffect(() => {
    if (!motion) setPlaying(false);
  }, [motion]);
  useEffect(() => {
    const visibility = () => {
      setVisible(!document.hidden);
      if (document.hidden) setPlaying(false);
    };
    document.addEventListener("visibilitychange", visibility);
    return () => document.removeEventListener("visibilitychange", visibility);
  }, []);
  useEffect(() => {
    if (!active) return;
    const timer = window.setTimeout(() => {
      setStep(step + 1);
      if (step + 1 >= last) setPlaying(false);
    }, sceneMilliseconds);
    return () => {
      window.clearTimeout(timer);
    };
  }, [active, step, last]);
  return (
    <article className="lesson-page">
      <h1 className="lesson-title">
        <span className={`chapter-icon color-${lesson.group}`}>
          <Icon name={lesson.id} />
        </span>
        {text(lesson.name, lang)}
      </h1>
      <div
        className="lesson-stage"
        onPointerDown={pause}
        onFocusCapture={pause}
        onClick={pause}
        onInput={pause}
        onKeyDown={(event) => {
          if (event.key !== "Tab") pause();
        }}
      >
        <Demo id={lesson.id} lang={lang} step={step} motion={motion && visible} onReady={setReady} />
      </div>
      <p className="scene-caption" aria-live={active ? "off" : "polite"}>
        <span key={step}>{text(lesson.scenes[step].body, lang)}</span>
      </p>
      <div className="transport">
        <div className="transport-buttons">
          <button
            className="small-button"
            disabled={step === 0}
            onClick={() => show(step - 1)}
          >
            <Arrow back />
            <span className="control-label">
              {text(l("Previous", "Předchozí"), lang)}
            </span>
          </button>
          <button
            className="play-button"
            disabled={!motion || !ready}
            onClick={() => {
              if (!active && step === last) setStep(0);
              setPlaying(!active);
            }}
          >
            <svg
              width="16"
              height="16"
              viewBox="0 0 16 16"
              fill="currentColor"
              aria-hidden="true"
            >
              {active ? (
                <path d="M3 2h3v12H3zm7 0h3v12h-3Z" />
              ) : (
                <path d="M4 2l9 6-9 6Z" />
              )}
            </svg>
            {text(active ? l("Pause", "Pozastav") : l("Play", "Přehraj"), lang)}
          </button>
          <button
            className="small-button"
            onClick={() => show(step === last ? 0 : step + 1)}
          >
            <span className="control-label">
              {text(
                step === last
                  ? l("Start over", "Od začátku")
                  : l("Next", "Další"),
                lang,
              )}
            </span>
            <Arrow back={step === last} />
          </button>
        </div>
        <div
          role="group"
          className="scene-picker"
          aria-label={text(l("Scenes", "Scény"), lang)}
        >
          {lesson.scenes.map((scene, i) => (
            <button
              key={i}
              aria-label={`${text(l("Scene", "Scéna"), lang)} ${i + 1}: ${text(scene.title, lang)}`}
              aria-current={step === i ? "step" : undefined}
              className={step === i ? "active" : ""}
              onClick={() => show(i)}
            >
              <span>{i + 1}</span>
              <span className="scene-name">{text(scene.title, lang)}</span>
            </button>
          ))}
        </div>
      </div>
      <details className="lesson-details" onToggle={pause} onFocusCapture={pause}>
        <summary>
          <Icon name="sources" />
          {text(l("Details & sources", "Podrobnosti a zdroje"), lang)}
        </summary>
        <p className="detail-lead">{text(lesson.intro, lang)}</p>
        <div className="detail-content">
          {lesson.details.map((detail) => (
            <section key={detail.title.en}>
              <h3>{text(detail.title, lang)}</h3>
              <p>{text(detail.body, lang)}</p>
            </section>
          ))}
          <section>
            <h3>{text(l("Key idea", "Hlavní myšlenka"), lang)}</h3>
            <p>{text(lesson.takeaway, lang)}</p>
          </section>
        </div>
        <div className="lesson-sources">
          <span>{text(l("Sources", "Zdroje"), lang)}</span>
          {sources
            .filter((source) => lesson.sources.includes(source.id))
            .map((source) => (
              <a
                key={source.id}
                href={source.url}
                target="_blank"
                rel="noreferrer"
              >
                {source.title}
              </a>
            ))}
        </div>
      </details>
      <nav
        className="lesson-footer"
        aria-label={text(l("Chapter navigation", "Navigace kapitol"), lang)}
      >
        <a className="secondary" href={`#/${previous ?? "chapters"}`}>
          <Arrow back />
          {text(
            previous
              ? l("Previous chapter", "Předchozí kapitola")
              : l("All chapters", "Všechny kapitoly"),
            lang,
          )}
        </a>
        <a className="primary" href={`#/${next ?? "chapters"}`}>
          {text(
            next
              ? l("Next chapter", "Další kapitola")
              : l("All chapters", "Všechny kapitoly"),
            lang,
          )}
          <Arrow />
        </a>
      </nav>
    </article>
  );
}
