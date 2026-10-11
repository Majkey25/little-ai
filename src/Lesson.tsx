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

export function Lesson({
  lesson,
  lang,
  completed,
  onComplete,
  previous,
  next,
  motion,
}: {
  lesson: LessonData;
  lang: Lang;
  completed: boolean;
  onComplete: () => void;
  previous?: string;
  next?: string;
  motion: boolean;
}) {
  const [step, setStep] = useState(0);
  const [playing, setPlaying] = useState(false);
  const [choice, setChoice] = useState<number | null>(null);
  useEffect(() => {
    if (!playing || !motion) return;
    const timer = window.setInterval(
      () => setStep((current) => (current + 1) % 3),
      6000,
    );
    return () => window.clearInterval(timer);
  }, [playing, motion]);
  return (
    <article className="lesson-page">
      <div className="lesson-heading">
        <h1>{text(lesson.title, lang)}</h1>
        <p className="intro">{text(lesson.intro, lang)}</p>
      </div>
      <div className="story-nav">
        <div
          className="story-tabs"
          aria-label={text(l("Explanation steps", "Kroky vysvětlení"), lang)}
        >
          {lesson.scenes.map((scene, i) => (
            <button
              key={i}
              aria-pressed={step === i}
              className={step === i ? "active" : ""}
              onClick={() => {
                setStep(i);
                setPlaying(false);
              }}
            >
              <span>{i + 1}</span>
              {text(scene.title, lang)}
            </button>
          ))}
        </div>
        <button
          className="play-button"
          aria-pressed={playing && motion}
          disabled={!motion}
          onClick={() => setPlaying(!playing)}
        >
          {text(
            playing && motion
              ? l("Pause story", "Pozastav příběh")
              : l("Play story", "Přehraj příběh"),
            lang,
          )}
          <svg
            width="16"
            height="16"
            viewBox="0 0 16 16"
            fill="currentColor"
            aria-hidden="true"
          >
            {playing && motion ? (
              <path d="M3 2h3v12H3zm7 0h3v12h-3Z" />
            ) : (
              <path d="M4 2l9 6-9 6Z" />
            )}
          </svg>
        </button>
      </div>
      <p className="scene-copy" key={`${step}${lang}`}>
        {text(lesson.scenes[step].body, lang)}
      </p>
      <Demo id={lesson.id} lang={lang} step={step} />
      <div className="takeaway">
        <span className="takeaway-icon">
          <Icon name="reasoning" />
        </span>
        <p>{text(lesson.takeaway, lang)}</p>
      </div>
      <details className="deeper">
        <summary>
          <Icon name="sources" />
          {text(l("A little deeper", "Trochu hlouběji"), lang)}
          <span>+</span>
        </summary>
        <div className="detail-content">
          {lesson.details.map((detail) => (
            <section key={detail.title.en}>
              <h3>{text(detail.title, lang)}</h3>
              <p>{text(detail.body, lang)}</p>
            </section>
          ))}
        </div>
      </details>
      <details className="knowledge-check">
        <summary>
          {text(l("One quick check", "Jedna krátká otázka"), lang)}
          <span>+</span>
        </summary>
        <div className="quiz">
          <h3>{text(lesson.question, lang)}</h3>
          <div className="quiz-choices">
            {lesson.choices.map((item, i) => (
              <button
                key={i}
                onClick={() => setChoice(i)}
                className={
                  choice === i
                    ? i === lesson.answer
                      ? "correct"
                      : "incorrect"
                    : ""
                }
              >
                {text(item, lang)}
              </button>
            ))}
          </div>
          {choice !== null && (
            <p role="status">
              {text(
                choice === lesson.answer
                  ? l("Yes. ", "Ano. ")
                  : l("Try another idea. ", "Zkus jinou možnost. "),
                lang,
              )}
              {text(lesson.explanation, lang)}
            </p>
          )}
        </div>
      </details>
      <div className="lesson-sources">
        <span>
          {text(l("Read the originals", "Přečti si původní zdroje"), lang)}
        </span>
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
      <nav
        className="lesson-footer"
        aria-label={text(l("Lesson navigation", "Navigace lekce"), lang)}
      >
        <a className="secondary" href={`#/${previous ?? ""}`}>
          <Arrow back />
          {text(l("Previous", "Předchozí"), lang)}
        </a>
        <button
          className={`complete-button ${completed ? "completed" : ""}`}
          onClick={onComplete}
        >
          {completed ? "✓ " : ""}
          {text(
            completed
              ? l("Marked complete", "Označeno za dokončené")
              : l("Mark complete", "Označit za dokončené"),
            lang,
          )}
        </button>
        <a className="primary" href={`#/${next ?? "progress"}`}>
          {text(
            next
              ? l("Next lesson", "Další lekce")
              : l("Your progress", "Tvůj postup"),
            lang,
          )}
          <Arrow />
        </a>
      </nav>
    </article>
  );
}
