import type { ReactNode } from "react";
import { text, l, type Lang } from "./content";

export type DemoProps = { lang: Lang; step: number; motion?: boolean };
export function Arrow({ back = false }: { back?: boolean }) {
  return (
    <svg
      className="arrow-icon"
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      focusable="false"
      style={{ transform: back ? "rotate(180deg)" : undefined }}
    >
      <path d="M5 12h14M12 5l7 7-7 7" />
    </svg>
  );
}
export function BrandMark({ size = 34 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" aria-hidden="true">
      <path d="M5 6l14 6L5 18M5 6v12" />
      <g fill="var(--page, #faf9f6)"><circle cx="5" cy="6" r="3" /><circle cx="5" cy="18" r="3" /><circle cx="19" cy="12" r="3" /></g>
    </svg>
  );
}
const iconPaths: Record<string, string> = {
  ai: "M7 7h10v10H7ZM9 2v5M15 2v5M9 17v5M15 17v5M2 9h5M2 15h5M17 9h5M17 15h5",
  neural: "M7 6l10 6M7 18l10-6M5 8v8",
  learning: "M4 6q8-7 16 0v12q-8 7-16 0ZM4 6q8 7 16 0M4 12q8 7 16 0",
  tokens: "M6 3h9l4 4v14H6ZM10 10h5M10 14h5M10 18h3",
  embeddings: "M12 2l9 5v10l-9 5-9-5V7ZM3 7l9 5 9-5M12 12v10",
  attention: "M2 15q4-18 10-5t10-1",
  prediction: "M7 3l13 9-13 9Z",
  context: "M21 11a9 8 0 0 1-13 7l-5 3 1-6a9 8 0 1 1 17-4Z",
  retrieval: "M4 4h16v5H4ZM4 12h6v8H4ZM14 12h6v8h-6Z",
  hallucinations: "M16 16l5 5M18 10a8 8 0 1 1-16 0 8 8 0 0 1 16 0Z",
  tools: "M14 4a5 5 0 0 0-6 6L2 17l4 4 7-7a5 5 0 0 0 7-7l-4 4-3-3 4-4Z",
  reasoning: "M9 20h6M9 23h6M8 14a7 7 0 1 1 8 0l-1 3H9Z",
  agents:
    "M3 21v-4q0-4 5-4t5 4v4M15 14q6-2 6 3v4M12 6a4 4 0 1 1-8 0 4 4 0 0 1 8 0ZM20 7a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z",
  alignment: "M12 3l8 3v6c0 5-8 9-8 9s-8-4-8-9V6ZM8 12l3 3 5-6",
  engineering: "M8 5l-6 7 6 7M16 5l6 7-6 7M14 3l-4 18",
  whole:
    "M2 12h20M12 2c-8 8-8 12 0 20 8-8 8-12 0-20ZM22 12a10 10 0 1 1-20 0 10 10 0 0 1 20 0Z",
  images: "M3 3h18v18H3ZM3 17l6-6 4 4 3-3 5 5M17 7h.01",
  home: "M3 11l9-8 9 8M5 10v11h14V10M10 21v-7h4v7",
  sources: "M12 21V5q-5-4-10-1v15q5-3 10 2ZM12 5q5-4 10-1v15q-5-3-10 2",
};
export function Icon({ name }: { name: string }) {
  return (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d={iconPaths[name] ?? iconPaths.ai} />
      {name === "neural" && (
        <g fill="var(--page, #faf9f6)">
          <circle cx="5" cy="6" r="2.5" />
          <circle cx="5" cy="18" r="2.5" />
          <circle cx="19" cy="12" r="2.5" />
        </g>
      )}
    </svg>
  );
}
export function Slider({
  label,
  value,
  onChange,
  min = 0,
  max = 1,
  step = 0.01,
  suffix = "",
}: {
  label: string;
  value: number;
  onChange: (value: number) => void;
  min?: number;
  max?: number;
  step?: number;
  suffix?: string;
}) {
  return (
    <label className="slider">
      <span>
        {label}
        <strong>
          {Number.isInteger(value) ? value : value.toFixed(2)}
          {suffix}
        </strong>
      </span>
      <input
        type="range"
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
      />
    </label>
  );
}
export function Note({ children }: { children: ReactNode }) {
  return <p className="demo-note">{children}</p>;
}
export function Flow({ labels, active }: { labels: string[]; active: number }) {
  return (
    <ol className="flow">
      {labels.map((label, i) => (
        <li
          key={label}
          className={`flow-item ${i <= active ? "reached" : ""} ${i === active ? "current" : ""}`}
          aria-current={i === active ? "step" : undefined}
        >
          <span className={`circle color-${i % 4}`}>{i + 1}</span>
          <strong>{label}</strong>
        </li>
      ))}
    </ol>
  );
}
export function Network({
  hero = false,
  signal = 0.5,
  lang = "en",
}: {
  hero?: boolean;
  signal?: number;
  lang?: Lang;
}) {
  const points = [
    [90, 70],
    [90, 190],
    [90, 310],
    [245, 70],
    [245, 190],
    [245, 310],
    [405, 100],
    [405, 280],
  ];
  const edges = [
    [0, 3],
    [0, 4],
    [1, 3],
    [1, 4],
    [1, 5],
    [2, 4],
    [2, 5],
    [3, 6],
    [3, 7],
    [4, 6],
    [4, 7],
    [5, 7],
  ];
  return (
    <svg
      className={`network ${hero ? "hero-network" : ""}`}
      viewBox="0 0 500 385"
      role="img"
      aria-label={text(
        l(
          "Animated neural network diagram",
          "Animovaný diagram neuronové sítě",
        ),
        lang,
      )}
    >
      <g fill="none" stroke="#9691e8" strokeWidth="2.5">
        {edges.map(([a, b], i) => {
          const path = `M${points[a][0]} ${points[a][1]} L${points[b][0]} ${points[b][1]}`;
          return (
            <g key={i}>
              <path
                className="signal-path"
                style={{ opacity: 0.3 + signal * 0.7 }}
                pathLength="100"
                d={path}
              />
              <path
                className="signal-pulse"
                pathLength="100"
                d={path}
                style={{ animationDelay: `${i * -0.3}s` }}
              />
            </g>
          );
        })}
      </g>
      {points.map(([x, y], i) => (
        <g key={i}>
          <circle
            cx={x}
            cy={y}
            r="26"
            fill={i < 3 ? "#e6edf4" : i < 6 ? "#ece9ff" : "#d9efe4"}
            stroke={i < 3 ? "#8b9fb1" : i < 6 ? "#9691e8" : "#79bf9d"}
            strokeWidth="1.8"
          />
        </g>
      ))}
      {hero && (
        <g
          className="svg-label"
          fill="#4c496c"
          fontSize="18"
          fontWeight="700"
          fontFamily="inherit"
          textAnchor="middle"
        >
          <text x="90" y="372">
            {text(l("text", "text"), lang)}
          </text>
          <text x="245" y="372">
            {text(l("numbers", "čísla"), lang)}
          </text>
          <text x="405" y="372">
            {text(l("next token", "další token"), lang)}
          </text>
        </g>
      )}
    </svg>
  );
}
export function LineChart({
  values,
  label,
  color = "#7273ed",
  max,
  start = 0,
  end = values.length - 1,
}: {
  values: number[];
  label: string;
  color?: string;
  max?: number;
  start?: number;
  end?: number;
}) {
  const top = max ?? Math.max(0.01, ...values);
  const path = values
    .map(
      (v, i) =>
        `${i ? "L" : "M"}${75 + (i / Math.max(1, values.length - 1)) * 400} ${155 - (v / top) * 130}`,
    )
    .join(" ");
  return (
    <>
      <svg
        className="line-chart"
        viewBox="0 0 500 185"
        role="img"
        aria-label={`${label}. x: ${start}–${end}; y: 0–${top}; y(${end}) = ${values.at(-1)?.toFixed(3) ?? "?"}.`}
      >
        <path d="M75 20V155H475" stroke="#d1cfde" fill="none" />
        {[0.25, 0.5, 0.75].map((v) => (
          <path
            key={v}
            d={`M75 ${155 - v * 130}H475`}
            stroke="#e2dfeb"
            strokeDasharray="4 6"
          />
        ))}
        <path
          d={path}
          fill="none"
          stroke={color}
          strokeWidth="4"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        {values.length > 0 && (
          <circle
            cx={values.length > 1 ? 475 : 75}
            cy={155 - (values[values.length - 1] / top) * 130}
            r="4"
            fill={color}
          />
        )}
        <g className="svg-label" fill="#66677e" fontSize="16">
          <text x="65" y="30" textAnchor="end">{top}</text>
          <text x="65" y="160" textAnchor="end">0</text>
          <text x="75" y="180">{start}</text>
          {end !== start && <text x="475" y="180" textAnchor="end">{end}</text>}
        </g>
      </svg>
      <p className="demo-note">{label}</p>
    </>
  );
}
