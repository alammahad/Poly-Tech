import { useId, type CSSProperties } from 'react';

// The Poly Tech mark redrawn as SVG lines so it can draw itself: construction guides first, then the
// strands, the nodes and the mesh, then the wordmark, with light travelling along the strands at the end.
// The strands form a twisted ribbon: tight on the left, pinched in the middle, wider on the right.

type Point = [number, number];
type Curve = [Point, Point, Point, Point];

const STRANDS = 13;
const TIP_LEFT: Point = [20, 150];
const PINCH: Point = [300, 142];
const TIP_RIGHT: Point = [620, 150];

// Small fixed offsets per strand so the wireframe looks hand-made rather than perfectly even.
const jitter = (k: number, seed: number) => Math.sin(k * 12.9898 + seed * 78.233) * 0.5;

function strandCurves(k: number): Curve[] {
  const a = (2 * k) / (STRANDS - 1) - 1;
  const b = -a;
  const peakLeft: Point = [196 + 34 * jitter(k, 1), 150 - (88 + 10 * jitter(k, 2)) * a];
  const peakRight: Point = [420 + 40 * jitter(k, 3), 146 + (122 + 12 * jitter(k, 4)) * b];
  return [
    [TIP_LEFT, [90, 150], [peakLeft[0] - 58, peakLeft[1]], peakLeft],
    [peakLeft, [peakLeft[0] + 44, peakLeft[1]], [268, PINCH[1]], PINCH],
    [PINCH, [334, PINCH[1]], [peakRight[0] - 74, peakRight[1]], peakRight],
    [peakRight, [peakRight[0] + 86, peakRight[1]], [560, 150], TIP_RIGHT],
  ];
}

function pointOn([p0, p1, p2, p3]: Curve, t: number): Point {
  const u = 1 - t;
  const blend = (i: 0 | 1) => u * u * u * p0[i] + 3 * u * u * t * p1[i] + 3 * u * t * t * p2[i] + t * t * t * p3[i];
  return [blend(0), blend(1)];
}

const round = (n: number) => Math.round(n * 10) / 10;
const toPath = (curves: Curve[]) =>
  `M${curves[0][0].map(round).join(' ')}` +
  curves.map(([, c1, c2, end]) => `C${[c1, c2, end].map((p) => p.map(round).join(' ')).join(' ')}`).join('');

const strands = Array.from({ length: STRANDS }, (_, k) => strandCurves(k));
const strandPaths = strands.map(toPath);

// Right lobe: a grid of nodes on every other strand, joined into triangles.
const meshStrands = strands.filter((_, k) => k % 2 === 0);
const meshStops: [number, number][] = [
  [2, 0.45],
  [2, 1],
  [3, 0.42],
];
const meshNodes = meshStrands.map((curves) => meshStops.map(([seg, t]) => pointOn(curves[seg], t)));
const meshLines: [Point, Point][] = [];
meshNodes.forEach((row, i) => {
  row.forEach((node, j) => {
    if (j + 1 < row.length) meshLines.push([node, row[j + 1]]);
    const next = meshNodes[i + 1];
    if (next) {
      meshLines.push([node, next[j]]);
      if (j + 1 < row.length) meshLines.push([node, next[j + 1]]);
    }
  });
});

// Left lobe: just a few points, like the original.
const leftNodes = strands.filter((_, k) => k % 3 === 0).flatMap((curves) => [curves[0][3], pointOn(curves[0], 0.62)]);

const delay = (i: number) => ({ '--i': i }) as CSSProperties;

export function LogoMark({ compact = false, className = '' }: { compact?: boolean; className?: string }) {
  const id = useId().replace(/:/g, '');
  const height = compact ? 300 : 380;

  return (
    <svg
      className={`lm${compact ? ' lm--compact' : ''} ${className}`}
      viewBox={`0 ${compact ? 0 : -10} 640 ${height}`}
      role="img"
      aria-label="Poly Tech"
    >
      <defs>
        <linearGradient id={`${id}-ink`} gradientUnits="userSpaceOnUse" x1="0" y1="0" x2="640" y2="0">
          <stop offset="0" style={{ stopColor: 'var(--logo-left)' }} />
          <stop offset="0.42" style={{ stopColor: 'var(--logo-left)' }} />
          <stop offset="0.58" style={{ stopColor: 'var(--logo-right)' }} />
          <stop offset="1" style={{ stopColor: 'var(--logo-right-light)' }} />
        </linearGradient>
        <filter id={`${id}-glow`} x="-20%" y="-20%" width="140%" height="140%">
          <feGaussianBlur stdDeviation="2.4" result="blur" />
          <feMerge>
            <feMergeNode in="blur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>

      {!compact && (
        <g className="lm-guides">
          <path className="lm-guide" pathLength={1} d="M0 150H640" />
          <path className="lm-guide" pathLength={1} d="M20 10V290M300 10V290M620 10V290" style={delay(1)} />
          <circle className="lm-guide" pathLength={1} cx="196" cy="150" r="96" style={delay(2)} />
          <circle className="lm-guide" pathLength={1} cx="420" cy="146" r="132" style={delay(3)} />
          <circle className="lm-guide" pathLength={1} cx="20" cy="150" r="11" style={delay(4)} />
          <circle className="lm-guide" pathLength={1} cx="620" cy="150" r="11" style={delay(4)} />
          <circle className="lm-guide" pathLength={1} cx="300" cy="142" r="22" style={delay(5)} />
        </g>
      )}

      <g stroke={`url(#${id}-ink)`} fill="none">
        {strandPaths.map((d, k) => (
          <path key={k} className="lm-strand" pathLength={1} d={d} style={delay(k)} />
        ))}
        {meshLines.map(([from, to], i) => (
          <path
            key={i}
            className="lm-mesh"
            pathLength={1}
            d={`M${from.map(round).join(' ')}L${to.map(round).join(' ')}`}
            style={delay(i)}
          />
        ))}
      </g>

      <g className="lm-nodes">
        {[...leftNodes, ...meshNodes.flat()].map(([x, y], i) => (
          <circle
            key={i}
            className={`lm-node${x > PINCH[0] ? ' lm-node--right' : ''}`}
            cx={round(x)}
            cy={round(y)}
            r={i % 4 === 0 ? 4.2 : 3}
            style={delay(i)}
          />
        ))}
        <circle className="lm-node lm-node--tip" cx={TIP_LEFT[0]} cy={TIP_LEFT[1]} r="3.4" />
        <circle className="lm-node lm-node--tip lm-node--right" cx={TIP_RIGHT[0]} cy={TIP_RIGHT[1]} r="3.4" />
      </g>

      {!compact && (
        <g className="lm-lights" filter={`url(#${id}-glow)`} fill="none">
          {strandPaths
            .filter((_, k) => k % 2 === 1)
            .map((d, i) => (
              <path key={i} className="lm-light" pathLength={1} d={d} style={delay(i)} />
            ))}
        </g>
      )}

      {!compact && (
        <text className="lm-word" x="320" y="352" textAnchor="middle">
          POLY TECH
        </text>
      )}
    </svg>
  );
}
