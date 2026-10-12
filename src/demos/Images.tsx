import { useEffect, useId, useMemo, useState } from "react";
import { l, text } from "../content";
import { Slider, type DemoProps } from "../components";
import {
  guidedUpdate,
  IMAGE_STEPS,
  relaxTemplate,
  seededNoise,
} from "../imageMath";

const GRID = 18;
const prompts = [
  {
    name: l("A yellow flower", "Žlutá květina"),
    color: "#f6cb65",
    features: [0.4, 0.8, 0.5, 0.7, 0.3, 0.9, 0.6, 0.4],
  },
  {
    name: l("A pink star", "Růžová hvězda"),
    color: "#ec9bbb",
    features: [0.8, 0.3, 0.7, 0.4, 0.9, 0.5, 0.3, 0.8],
  },
  {
    name: l("A blue planet", "Modrá planeta"),
    color: "#8ebee8",
    features: [0.3, 0.6, 0.9, 0.4, 0.6, 0.8, 0.5, 0.7],
  },
];

// Prepared pixel art. No prompt parsing, trained model or image retrieval.
function drawnTemplate(prompt: number): number[] {
  return Array.from({ length: GRID * GRID }, (_, i) => {
    const x = ((i % GRID) + 0.5) / GRID;
    const y = (Math.floor(i / GRID) + 0.5) / GRID;
    const dx = x - 0.5;
    const dy = y - (prompt === 0 ? 0.38 : 0.48);
    const radius = Math.hypot(dx, dy);
    const angle = Math.atan2(dy, dx);
    let color = [0.98, 0.96, 1];
    if (prompt === 0) {
      if (Math.abs(dx) < 0.03 && y > 0.48 && y < 0.89) color = [0.4, 0.7, 0.55];
      if (((x - 0.62) / 0.13) ** 2 + ((y - 0.72) / 0.06) ** 2 < 1)
        color = [0.5, 0.78, 0.61];
      if (radius < 0.21 + 0.045 * Math.cos(5 * angle)) color = [1, 0.82, 0.38];
      if (radius < 0.08) color = [0.95, 0.58, 0.34];
    } else if (prompt === 1) {
      if (radius < 0.22 + 0.07 * Math.cos(5 * (angle + Math.PI / 2)))
        color = [0.95, 0.58, 0.73];
    } else {
      if (radius < 0.23) color = [0.48, 0.69, 0.9];
      if (radius < 0.23 && y > 0.42 && y < 0.54) color = [0.61, 0.8, 0.98];
      const ring = (dx / 0.34) ** 2 + ((dy + 0.3 * dx) / 0.07) ** 2;
      if (ring > 0.65 && ring < 1.25 && (radius > 0.23 || dy > 0))
        color = [0.98, 0.76, 0.5];
    }
    return color;
  }).flat();
}

function PixelField({
  values,
  x,
  y,
  size,
  motion,
}: {
  values: readonly number[];
  x: number;
  y: number;
  size: number;
  motion: boolean;
}) {
  const cell = size / GRID;
  return (
    <g transform={`translate(${x} ${y})`}>
      {Array.from({ length: GRID * GRID }, (_, i) => (
        <rect
          key={i}
          x={(i % GRID) * cell}
          y={Math.floor(i / GRID) * cell}
          width={cell + 0.2}
          height={cell + 0.2}
          fill={`rgb(${values
            .slice(i * 3, i * 3 + 3)
            .map((value) => Math.round(value * 255))
            .join(",")})`}
          style={{ transition: motion ? "fill 160ms linear" : undefined }}
        />
      ))}
      <rect
        width={size}
        height={size}
        fill="none"
        stroke="#cfc4eb"
        strokeWidth="2"
      />
    </g>
  );
}

function MovingDot({ path, motion }: { path: string; motion: boolean }) {
  return motion ? (
    <circle r="6" fill="#7560c7" stroke="white" strokeWidth="2">
      <animateMotion path={path} dur="2.2s" repeatCount="indefinite" />
    </circle>
  ) : null;
}

export function ImagesDemo({ lang, step, motion = true }: DemoProps) {
  const id = `image-${useId()}`;
  const [prompt, setPrompt] = useState(0);
  const [seed, setSeed] = useState(7);
  const [refinement, setRefinement] = useState(0);
  const [refining, setRefining] = useState(true);
  const [decoded, setDecoded] = useState(false);
  const [guidance, setGuidance] = useState(1.5);
  const template = useMemo(() => drawnTemplate(prompt), [prompt]);
  const noise = useMemo(() => seededNoise(seed, GRID * GRID * 3), [seed]);
  const picture = useMemo(
    () => relaxTemplate(noise, template, refinement),
    [noise, template, refinement],
  );
  const guided = guidedUpdate([0.7, 0.25], [0.4, 0.65], guidance);
  const guidedEnd = [140 + guided[0] * 140, 290 - guided[1] * 140];
  const purpleArrow = `url(#${id}-purple)`;
  const caption = text(
    l(
      "Teaching toy: noise moves toward a drawn template. No image model runs here.",
      "Výuková ukázka: šum přibližujeme k nakreslené předloze. Žádný obrazový model tu neběží.",
    ),
    lang,
  );

  useEffect(() => {
    if (!motion || step !== 2 || !refining || refinement >= IMAGE_STEPS) return;
    const timer = window.setTimeout(() => setRefinement(refinement + 1), 200);
    return () => window.clearTimeout(timer);
  }, [motion, step, refining, refinement]);

  const descriptions = [
    l(
      "A prepared prompt passes through a text-encoder diagram into illustrated text features.",
      "Připravené zadání projde schématem textového enkodéru do znázorněných textových příznaků.",
    ),
    l(
      `Starting noise from seed ${seed}. The same seed repeats this toy's pattern.`,
      `Počáteční šum ze seedu ${seed}. Stejný seed zopakuje vzor této ukázky.`,
    ),
    l(
      `Template relaxation at step ${refinement} of ${IMAGE_STEPS}. A separate network diagram shows fixed learned weights.`,
      `Přibližování k předloze v kroku ${refinement} z ${IMAGE_STEPS}. Vedlejší schéma sítě ukazuje pevné naučené váhy.`,
    ),
    l(
      `An abstract latent-feature diagram passes through a decoder sketch. The drawn pixels are ${decoded ? "visible" : "hidden"}.`,
      `Abstraktní schéma latentních příznaků prochází nákresem dekodéru. Nakreslené pixely jsou ${decoded ? "viditelné" : "skryté"}.`,
    ),
    l(
      `Illustrative update arrows combine with guidance ${guidance}. Zero selects the unconditioned vector; one selects the conditioned vector.`,
      `Znázorněné šipky úprav se kombinují se silou řízení ${guidance}. Nula vybere vektor bez podmínky, jednička s podmínkou.`,
    ),
  ];

  return (
    <div className="demo image-demo">
      <svg
        viewBox="0 0 560 440"
        role="img"
        aria-labelledby={`${id}-title ${id}-description`}
        style={{ display: "block", width: "100%", height: "auto" }}
        fontFamily="inherit"
        fontSize="28"
        fontWeight="800"
        fill="#3c3457"
      >
        <title id={`${id}-title`}>
          {text(l("How image generation works", "Jak vzniká obrázek"), lang)}
        </title>
        <desc id={`${id}-description`}>
          {text(descriptions[step], lang)} {caption}
        </desc>
        <defs>
          {["purple", "blue", "orange"].map((name, i) => (
            <marker
              key={name}
              id={`${id}-${name}`}
              viewBox="0 0 12 12"
              refX="10"
              refY="6"
              markerWidth="5"
              markerHeight="5"
              orient="auto-start-reverse"
            >
              <path
                d="M3 2l7 4-7 4"
                fill="none"
                stroke={["#7560c7", "#638db8", "#d38a49"][i]}
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </marker>
          ))}
        </defs>
        <rect
          x="6"
          y="6"
          width="548"
          height="428"
          rx="26"
          fill="#fcfaff"
          stroke="#ded5f0"
          strokeWidth="2"
        />

        {step === 0 && (
          <g textAnchor="middle">
            <rect
              x="50"
              y="35"
              width="460"
              height="62"
              rx="20"
              fill="#fff3d5"
            />
            <text x="280" y="75" fontSize="28">
              {text(prompts[prompt].name, lang)}
            </text>
            <path
              d="M280 102V131"
              stroke="#7560c7"
              strokeWidth="4"
              markerEnd={purpleArrow}
            />
            <rect
              x="170"
              y="142"
              width="220"
              height="76"
              rx="20"
              fill="#e5dcff"
            />
            <text x="280" y="175">
              <tspan x="280">{text(l("Text", "Textový"), lang)}</tspan>
              <tspan x="280" dy="32">
                {text(l("encoder", "enkodér"), lang)}
              </tspan>
            </text>
            <path
              d="M280 224V258"
              stroke="#7560c7"
              strokeWidth="4"
              markerEnd={purpleArrow}
            />
            {prompts[prompt].features.map((value, i) => (
              <g key={i}>
                <rect
                  x={104 + i * 44}
                  y="273"
                  width="36"
                  height="54"
                  rx="9"
                  fill="#f0ebfa"
                />
                <rect
                  x={104 + i * 44}
                  y={321 - value * 44}
                  width="36"
                  height={value * 44}
                  rx="7"
                  fill={prompts[prompt].color}
                />
              </g>
            ))}
            <text x="280" y="369">
              {text(
                l("Text features · sketch", "Textové příznaky · schéma"),
                lang,
              )}
            </text>
            <MovingDot path="M280 102V259" motion={motion} />
          </g>
        )}

        {step === 1 && (
          <g textAnchor="middle">
            <text x="280" y="46" fontSize="28">
              Seed {seed}
            </text>
            <PixelField
              values={noise}
              x={140}
              y={72}
              size={280}
              motion={motion}
            />
            <text x="280" y="398">
              {text(l("Starting noise", "Počáteční šum"), lang)}
            </text>
            {motion && (
              <rect
                x="135"
                y="67"
                width="290"
                height="290"
                rx="8"
                fill="none"
                stroke="#a99ad7"
                strokeWidth="3"
              >
                <animate
                  attributeName="opacity"
                  values="0.25;0.8;0.25"
                  dur="3s"
                  repeatCount="indefinite"
                />
              </rect>
            )}
          </g>
        )}

        {step === 2 && (
          <g textAnchor="middle">
            <text x="167" y="44">
              {text(l("Toy step", "Krok ukázky"), lang)} {refinement}/
              {IMAGE_STEPS}
            </text>
            <PixelField
              values={picture}
              x={52}
              y={70}
              size={230}
              motion={motion}
            />
            <path
              d="M294 177H329"
              stroke="#7560c7"
              strokeWidth="4"
              markerEnd={purpleArrow}
            />
            <rect
              x="341"
              y="104"
              width="169"
              height="137"
              rx="20"
              fill="#e5dcff"
            />
            <text x="425" y="142">
              {text(l("Network", "Síť"), lang)}
            </text>
            {[0, 1].flatMap((column) =>
              [0, 1, 2].flatMap((row) =>
                [0, 1, 2].map((next) => (
                  <line
                    key={`${column}-${row}-${next}`}
                    x1={373 + column * 51}
                    y1={168 + row * 24}
                    x2={424 + column * 51}
                    y2={168 + next * 24}
                    stroke="#b4a5d4"
                    strokeWidth="2"
                  />
                )),
              ),
            )}
            {[0, 1, 2].flatMap((column) =>
              [0, 1, 2].map((row) => (
                <circle
                  key={`${column}-${row}`}
                  cx={373 + column * 51}
                  cy={168 + row * 24}
                  r="7"
                  fill={column === 1 ? "#83bba1" : "#9680cf"}
                  stroke="white"
                  strokeWidth="2"
                />
              )),
            )}
            <text x="425" y="280">
              {text(l("Fixed weights", "Pevné váhy"), lang)}
            </text>
            <path
              d="M425 316V354H167V313"
              fill="none"
              stroke="#7560c7"
              strokeWidth="4"
              strokeLinejoin="round"
              markerEnd={purpleArrow}
            />
            <text x="290" y="402">
              {text(l("Apply update · repeat", "Proveď úpravu · opakuj"), lang)}
            </text>
            <MovingDot
              path="M294 177H332"
              motion={motion && refining && refinement < IMAGE_STEPS}
            />
            <MovingDot
              path="M425 316V354H167V313"
              motion={motion && refining && refinement < IMAGE_STEPS}
            />
          </g>
        )}

        {step === 3 && (
          <g textAnchor="middle">
            <text x="137" y="40">
              <tspan x="137">{text(l("Latent", "Latentní"), lang)}</tspan>
              <tspan x="137" dy="32">
                {text(l("features", "příznaky"), lang)}
              </tspan>
            </text>
            {Array.from({ length: 16 }, (_, i) => (
              <rect
                key={i}
                x={57 + (i % 4) * 41}
                y={92 + Math.floor(i / 4) * 41}
                width="34"
                height="34"
                rx="8"
                fill={
                  i % 3 === 0
                    ? prompts[prompt].color
                    : i % 3 === 1
                      ? "#9c8ad4"
                      : "#95c9b3"
                }
                opacity={0.5 + prompts[prompt].features[i % 8] * 0.5}
              />
            ))}
            <path
              d="M137 268V281"
              stroke="#7560c7"
              strokeWidth="4"
              markerEnd={purpleArrow}
            />
            <rect
              x="55"
              y="295"
              width="166"
              height="63"
              rx="18"
              fill="#e5dcff"
            />
            <text x="138" y="335">
              {text(l("Decoder", "Dekodér"), lang)}
            </text>
            <path
              d="M229 325H261V208H288"
              fill="none"
              stroke="#7560c7"
              strokeWidth="4"
              strokeLinejoin="round"
              markerEnd={purpleArrow}
            />
            {decoded ? (
              <g>
                <PixelField
                  values={template}
                  x={299}
                  y={103}
                  size={211}
                  motion={false}
                />
                {motion && (
                  <animate
                    attributeName="opacity"
                    from="0"
                    to="1"
                    dur="0.6s"
                    fill="freeze"
                  />
                )}
              </g>
            ) : (
              <g>
                <rect
                  x="299"
                  y="103"
                  width="211"
                  height="211"
                  rx="10"
                  fill="#f0ebfa"
                  stroke="#cfc4eb"
                  strokeWidth="2"
                  strokeDasharray="8 6"
                />
                <path d="m354 241 40-45 31 31 20-23 25 37Z" fill="#d3c9e6" />
                <circle cx="445" cy="160" r="15" fill="#d3c9e6" />
              </g>
            )}
            <text x="405" y="359">
              <tspan x="405">{text(l("Drawn", "Nakreslené"), lang)}</tspan>
              <tspan x="405" dy="32">
                {text(l("pixels", "pixely"), lang)}
              </tspan>
            </text>
            <MovingDot
              path="M137 268V325H261V208H288"
              motion={motion && decoded}
            />
          </g>
        )}

        {step === 4 && (
          <g>
            <text x="280" y="48" textAnchor="middle" fontSize="28">
              Guidance = {guidance.toFixed(1)}
            </text>
            <rect
              x="35"
              y="73"
              width="244"
              height="256"
              rx="18"
              fill="#f1edf9"
            />
            <path d="M55 290H260M140 315V89" stroke="#d4cbe6" strokeWidth="2" />
            <line
              x1="140"
              y1="290"
              x2="238"
              y2="255"
              stroke="#638db8"
              strokeWidth="4"
              markerEnd={`url(#${id}-blue)`}
            />
            <line
              x1="140"
              y1="290"
              x2="196"
              y2="199"
              stroke="#d38a49"
              strokeWidth="4"
              markerEnd={`url(#${id}-orange)`}
            />
            <path
              d="M238 255 196 199"
              stroke="#c4b4dd"
              strokeWidth="2"
              strokeDasharray="5 5"
            />
            <line
              x1="140"
              y1="290"
              x2={guidedEnd[0]}
              y2={guidedEnd[1]}
              stroke="#7560c7"
              strokeWidth="7"
              markerEnd={purpleArrow}
            />
            <circle cx="140" cy="290" r="7" fill="#3c3457" />
            {[
              l("Without prompt", "Bez zadání"),
              l("With prompt", "Se zadáním"),
              l("Guided update", "Řízená úprava"),
            ].map((label, i) => (
              <g key={i}>
                <circle
                  cx="309"
                  cy={150 + i * 59}
                  r="7"
                  fill={["#638db8", "#d38a49", "#7560c7"][i]}
                />
                <text x="327" y={158 + i * 59} fontSize="28">
                  {text(label, lang)}
                </text>
              </g>
            ))}
            <text x="280" y="376" textAnchor="middle" fontSize="30">
              u + g × (c − u)
            </text>
            <text x="280" y="412" textAnchor="middle" fontSize="28">
              {text(
                l("Illustrative update vectors", "Znázorněné vektory úprav"),
                lang,
              )}
            </text>
            <MovingDot
              path={`M140 290L${guidedEnd[0]} ${guidedEnd[1]}`}
              motion={motion}
            />
          </g>
        )}
      </svg>

      <div className="demo-controls" style={{ marginTop: 18 }}>
        {step === 0 && (
          <div
            className="option-list"
            role="group"
            aria-label={text(l("Prepared prompts", "Připravená zadání"), lang)}
          >
            {prompts.map((choice, i) => (
              <button
                key={i}
                className={prompt === i ? "selected" : ""}
                aria-pressed={prompt === i}
                onClick={() => setPrompt(i)}
              >
                {text(choice.name, lang)}
              </button>
            ))}
          </div>
        )}
        {step === 1 && (
          <div>
            <Slider
              label={text(l("Starting seed", "Počáteční seed"), lang)}
              value={seed}
              onChange={setSeed}
              min={0}
              max={999}
              step={1}
            />
            <p style={{ margin: "10px 0 0" }}>
              {text(
                l(
                  "Here, the seed changes only the starting noise.",
                  "Seed tu mění pouze počáteční šum.",
                ),
                lang,
              )}
            </p>
          </div>
        )}
        {step === 2 && (
          <div className="inline-controls" style={{ marginTop: 0 }}>
            <button
              className="small-button"
              onClick={() => {
                if (motion) {
                  setRefinement(0);
                  setRefining(true);
                } else {
                  setRefinement((value) =>
                    value === IMAGE_STEPS ? 0 : value + 1,
                  );
                }
              }}
            >
              {text(
                motion
                  ? l("Replay steps", "Zopakuj kroky")
                  : refinement === IMAGE_STEPS
                    ? l("Reset steps", "Vrať kroky na začátek")
                    : l("Next step", "Další krok"),
                lang,
              )}
            </button>
            <Slider
              label={text(l("Template step", "Krok k předloze"), lang)}
              value={refinement}
              onChange={(value) => {
                setRefining(false);
                setRefinement(value);
              }}
              min={0}
              max={IMAGE_STEPS}
              step={1}
            />
          </div>
        )}
        {step === 3 && (
          <button
            className="secondary"
            aria-pressed={decoded}
            onClick={() => setDecoded(!decoded)}
          >
            {text(
              decoded
                ? l("Hide drawn pixels", "Skryj nakreslené pixely")
                : l("Reveal drawn pixels", "Odhal nakreslené pixely"),
              lang,
            )}
          </button>
        )}
        {step === 4 && (
          <Slider
            label={text(l("Guidance strength", "Síla řízení"), lang)}
            value={guidance}
            onChange={setGuidance}
            min={0}
            max={3}
            step={0.1}
          />
        )}
      </div>
    </div>
  );
}
