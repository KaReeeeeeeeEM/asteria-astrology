import { signs } from "@/lib/knowledge";
import type { Placement, Aspect } from "@/lib/astrology";
function point(a: number, r: number) {
  const rad = ((a - 90) * Math.PI) / 180;
  return { x: Number((250 + r * Math.cos(rad)).toFixed(6)), y: Number((250 + r * Math.sin(rad)).toFixed(6)) };
}
export function CelestialWheel({
  placements,
  aspects,
  hero = false,
}: {
  placements?: Placement[];
  aspects?: Aspect[];
  hero?: boolean;
}) {
  const samples = [18, 64, 138, 171, 226, 274, 311, 349];
  const coords = placements?.map((p) => p.longitude) || samples;
  const lines = aspects
    ?.slice(0, 22)
    .map((a) => ({
      from: placements!.find((p) => p.name === a.a)!.longitude,
      to: placements!.find((p) => p.name === a.b)!.longitude,
      color: ["Square", "Opposition"].includes(a.name)
        ? "var(--accent-copper)"
        : "var(--sage)",
    })) || [
    { from: 18, to: 138, color: "var(--sage)" },
    { from: 64, to: 226, color: "var(--accent-copper)" },
    { from: 171, to: 311, color: "var(--sage)" },
    { from: 138, to: 274, color: "var(--accent-copper)" },
    { from: 226, to: 349, color: "var(--sage)" },
    { from: 18, to: 274, color: "var(--accent-copper)" },
  ];
  return (
    <div className={`wheel-wrap ${hero ? "hero-wheel" : ""}`}>
      <svg
        viewBox="0 0 500 500"
        className="celestial-wheel"
        role="img"
        aria-label={
          hero
            ? "Illustrative celestial zodiac wheel"
            : "Calculated tropical birth chart wheel"
        }
      >
        <defs>
          <radialGradient id="wheel-glow">
            <stop offset="0" stopColor="var(--wheel-center)" />
            <stop offset="1" stopColor="var(--background)" stopOpacity="0" />
          </radialGradient>
        </defs>
        <circle cx="250" cy="250" r="225" fill="url(#wheel-glow)" />
        <g
          className={hero ? "orbit-spin" : ""}
          style={{ transformOrigin: "250px 250px" }}
        >
          <circle
            cx="250"
            cy="250"
            r="233"
            fill="none"
            stroke="currentColor"
            opacity=".2"
            strokeWidth=".6"
          />
          <circle
            cx="250"
            cy="250"
            r="214"
            fill="none"
            stroke="currentColor"
            opacity=".3"
            strokeWidth=".7"
          />
          {Array.from({ length: 120 }, (_, i) => {
            const a = point(i * 3, 214);
            const b = point(
              i * 3,
              i % 10 === 0 ? 228 : i % 5 === 0 ? 224 : 219,
            );
            return (
              <line
                key={i}
                x1={a.x}
                y1={a.y}
                x2={b.x}
                y2={b.y}
                stroke="currentColor"
                opacity={i % 10 === 0 ? 0.5 : 0.23}
                strokeWidth=".7"
              />
            );
          })}
        </g>
        <circle
          cx="250"
          cy="250"
          r="174"
          fill="none"
          stroke="currentColor"
          opacity=".3"
          strokeWidth=".7"
        />
        <circle
          cx="250"
          cy="250"
          r="137"
          fill="none"
          stroke="currentColor"
          opacity=".2"
          strokeWidth=".7"
        />
        {signs.map((s, i) => {
          const p = point(i * 30 + 15, 194);
          const n = point(i * 30 + 15, 153);
          const a = point(i * 30, 137);
          const b = point(i * 30, 214);
          return (
            <g key={s.name}>
              <line
                x1={a.x}
                y1={a.y}
                x2={b.x}
                y2={b.y}
                stroke="currentColor"
                opacity=".25"
                strokeWidth=".7"
              />
              <text
                x={p.x}
                y={p.y + 5}
                fontSize="20"
                textAnchor="middle"
                fill="currentColor"
                opacity=".7"
                fontFamily="serif"
              >
                {s.symbol}
              </text>
              <text
                x={n.x}
                y={n.y + 3}
                fontSize="7.5"
                letterSpacing="1"
                textAnchor="middle"
                fill="currentColor"
                opacity=".48"
              >
                {s.name.toUpperCase()}
              </text>
            </g>
          );
        })}
        {lines.map((l, i) => {
          const a = point(l.from, 127);
          const b = point(l.to, 127);
          return (
            <line
              key={i}
              x1={a.x}
              y1={a.y}
              x2={b.x}
              y2={b.y}
              stroke={l.color}
              strokeWidth=".75"
              opacity=".5"
            />
          );
        })}
        {coords.map((angle, i) => {
          const p = point(angle, 127);
          const label = point(angle, 115 - (i % 3) * 11);
          return (
            <g key={i}>
              <circle cx={p.x} cy={p.y} r="3" fill="var(--accent-copper)" />
              {placements && (
                <text
                  x={label.x}
                  y={label.y + 4}
                  fontSize="13"
                  textAnchor="middle"
                  fill="currentColor"
                >
                  {placements[i].symbol}
                </text>
              )}
            </g>
          );
        })}
        {hero && (
          <g
            className="floating-star"
            style={{ transformOrigin: "250px 250px" }}
          >
            <path
              d="M250 225L256 244L275 250L256 256L250 275L244 256L225 250L244 244Z"
              fill="var(--accent-copper)"
            />
            <circle
              cx="250"
              cy="250"
              r="35"
              fill="none"
              stroke="var(--accent-copper)"
              opacity=".2"
            />
          </g>
        )}
      </svg>
      {hero && (
        <>
          <span className="wheel-annotation annotation-top">AS ABOVE</span>
          <span className="wheel-annotation annotation-bottom">SO BELOW</span>
          <span className="wheel-dot dot-one">✦</span>
          <span className="wheel-dot dot-two">✧</span>
        </>
      )}
    </div>
  );
}
