import type { ReactNode } from "react";
import { text, l, type Lang } from "./content";

export type DemoProps = { lang: Lang; step: number };
export function Arrow({ back = false }: { back?: boolean }) {
  return (
    <svg
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      style={{ transform: back ? "rotate(180deg)" : undefined }}
    >
      <path d="M4 12h15m-6-6 6 6-6 6" />
    </svg>
  );
}
export function Star({ size = 34 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 64 64" aria-hidden="true">
      <path
        fill="currentColor"
        d="M32 3c5 0 6 17 11 18s18 6 18 11-13 9-18 11-6 18-11 18-9-13-11-18S3 37 3 32s13-9 18-11S27 3 32 3Z"
      />
    </svg>
  );
}
const iconPaths: Record<string, string> = {
  ai: "M8 10h8M9 15h.01M15 15h.01M10 19q2 2 4 0M12 3v3M4 8h16v14H4Z",
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
  alignment: "M3 21l14-14M5 19C0 8 9 2 22 2c0 13-6 20-17 17Z",
  engineering: "M8 5l-6 7 6 7M16 5l6 7-6 7M14 3l-4 18",
  whole:
    "M2 12h20M12 2c-8 8-8 12 0 20 8-8 8-12 0-20ZM22 12a10 10 0 1 1-20 0 10 10 0 0 1 20 0Z",
  home: "M3 11l9-8 9 8M5 10v11h14V10M10 21v-7h4v7",
  progress: "M4 21V11h3v10M11 21V4h3v17M18 21v-7h3v7",
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
export function TeachingLabel({ lang }: { lang: Lang }) {
  return (
    <Note>
      {text(
        l(
          "Illustrative data. Real calculations. No live LLM.",
          "Ilustrační data. Skutečné výpočty. Bez živého LLM.",
        ),
        lang,
      )}
    </Note>
  );
}
export function Flow({ labels, active }: { labels: string[]; active: number }) {
  return (
    <div className="flow">
      {labels.map((label, i) => (
        <div
          key={label}
          className={`flow-item ${i <= active ? "reached" : ""}`}
        >
          <span className={`circle color-${i % 4}`}>{i + 1}</span>
          <strong>{label}</strong>
          {i < labels.length - 1 && <Arrow />}
        </div>
      ))}
    </div>
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
          const path = `M${points[a][0]} ${points[a][1]} C${points[a][0] + 80} ${points[a][1]},${points[b][0] - 80} ${points[b][1]},${points[b][0]} ${points[b][1]}`;
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
        <g
          className="network-node"
          style={{ animationDelay: `${i * -0.6}s` }}
          key={i}
        >
          <circle
            cx={x}
            cy={y}
            r={i === 4 ? 49 : 35}
            fill={
              [
                "#f7dc7b",
                "#b6aff8",
                "#b6aff8",
                "#b6aff8",
                "#baedd5",
                "#ffd5b8",
                "#ffd5b8",
                "#f7dc7b",
              ][i]
            }
            stroke={i === 4 ? "#9ad9bf" : "#a6a0ed"}
            strokeWidth="1.8"
          />
          <path
            d={`M${x - 18} ${y - 16}q3-10 13-12`}
            fill="none"
            stroke="white"
            strokeOpacity=".6"
            strokeWidth="7"
            strokeLinecap="round"
          />
          {i === 4 && (
            <g fill="#333052">
              <ellipse cx={x - 15} cy={y} rx="3.5" ry="5" />
              <ellipse cx={x + 15} cy={y} rx="3.5" ry="5" />
              <path
                d={`M${x - 6} ${y + 9}q6 10 12 0`}
                fill="none"
                stroke="#333052"
                strokeWidth="2.5"
                strokeLinecap="round"
              />
            </g>
          )}
        </g>
      ))}
      {hero && (
        <g
          fill="#4c496c"
          fontSize="18"
          fontWeight="700"
          fontFamily="Nunito, sans-serif"
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
}: {
  values: number[];
  label: string;
  color?: string;
  max?: number;
}) {
  const top = max ?? Math.max(0.01, ...values);
  const path = values
    .map(
      (v, i) =>
        `${i ? "L" : "M"}${25 + (i / Math.max(1, values.length - 1)) * 450} ${155 - (v / top) * 130}`,
    )
    .join(" ");
  return (
    <svg
      className="line-chart"
      viewBox="0 0 500 185"
      role="img"
      aria-label={label}
    >
      <path d="M25 20V155H475" stroke="#d1cfde" fill="none" />
      {[0.25, 0.5, 0.75].map((v) => (
        <path
          key={v}
          d={`M25 ${155 - v * 130}H475`}
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
      <text x="25" y="180" fill="#66677e" fontSize="13">
        {label}
      </text>
    </svg>
  );
}
