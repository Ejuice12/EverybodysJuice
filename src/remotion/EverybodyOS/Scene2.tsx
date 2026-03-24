import { AbsoluteFill, interpolate, spring, useCurrentFrame, useVideoConfig } from 'remotion';
import { COLORS } from './constants';

const CX = 640;
const CY = 290;
const RADIUS = 185;

const NODES = [
  { label: 'Sleep',    color: '#60a5fa', angleDeg: -90  },
  { label: 'Stress',   color: '#f87171', angleDeg: -45  },
  { label: 'Energy',   color: '#fbbf24', angleDeg: 0    },
  { label: 'Mood',     color: '#a78bfa', angleDeg: 45   },
  { label: 'Focus',    color: '#34d399', angleDeg: 90   },
  { label: 'Drive',    color: '#f472b6', angleDeg: 135  },
  { label: 'Anxiety',  color: '#fb923c', angleDeg: 180  },
  { label: 'Recovery', color: '#22d3ee', angleDeg: 225  },
];

function nodePos(angleDeg: number) {
  const rad = (angleDeg * Math.PI) / 180;
  return { x: CX + RADIUS * Math.cos(rad), y: CY + RADIUS * Math.sin(rad) };
}

export const Scene2: React.FC<{ durationInFrames: number }> = ({ durationInFrames }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const sceneOpacity = interpolate(frame, [0, 20, durationInFrames - 25, durationInFrames], [0, 1, 1, 0], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const hubScale = spring({ fps, frame, config: { damping: 20, stiffness: 55 } });
  const titleProgress = spring({ fps, frame: frame - 90, config: { damping: 22, stiffness: 65 } });
  const subtitleProgress = spring({ fps, frame: frame - 150, config: { damping: 22, stiffness: 65 } });
  const pulse1 = (frame % 50) / 50;
  const pulse2 = ((frame + 17) % 50) / 50;
  const pulse3 = ((frame + 34) % 50) / 50;
  return (
    <AbsoluteFill style={{ opacity: sceneOpacity }}>
      <svg style={{ position: 'absolute', width: '100%', height: '100%', overflow: 'visible' }} viewBox="0 0 1280 720">
        {NODES.map((node, i) => {
          const { x, y } = nodePos(node.angleDeg);
          const lineProgress = interpolate(frame, [i * 5 + 5, i * 5 + 35], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
          return (<line key={node.label} x1={CX} y1={CY} x2={x} y2={y} stroke={node.color} strokeWidth="1.5" strokeOpacity={0.35 * lineProgress} strokeDasharray={RADIUS} strokeDashoffset={RADIUS * (1 - lineProgress)} strokeLinecap="round" />);
        })}
        {[pulse1, pulse2, pulse3].map((p, i) => (<circle key={i} cx={CX} cy={CY} r={55 + p * 80} fill="none" stroke={COLORS.teal} strokeWidth="1" strokeOpacity={(1 - p) * 0.2 * hubScale} />))}
        <circle cx={CX} cy={CY} r={48 * hubScale} fill={COLORS.teal} fillOpacity={0.07} />
        <circle cx={CX} cy={CY} r={28 * hubScale} fill={COLORS.teal} fillOpacity={0.12} />
        <circle cx={CX} cy={CY} r={10 * hubScale} fill={COLORS.teal} fillOpacity={hubScale} />
      </svg>
      {NODES.map((node, i) => {
        const { x, y } = nodePos(node.angleDeg);
        const nodeAppear = spring({ fps, frame: frame - i * 5, config: { damping: 15, stiffness: 130 } });
        return (
          <div key={node.label} style={{ position: 'absolute', left: x, top: y, transform: `translate(-50%, -50%) scale(${nodeAppear})`, opacity: nodeAppear, pointerEvents: 'none' }}>
            <div style={{ background: `${node.color}18`, border: `1.5px solid ${node.color}55`, borderRadius: 100, padding: '7px 16px', color: node.color, fontSize: 14, fontWeight: 600, whiteSpace: 'nowrap' }}>
              {node.label}
            </div>
          </div>
        );
      })}
      <div style={{ position: 'absolute', left: '50%', top: 538, transform: 'translateX(-50%)', textAlign: 'center', whiteSpace: 'nowrap' }}>
        <div style={{ fontSize: 50, fontWeight: 800, color: COLORS.white, letterSpacing: '-0.025em', lineHeight: 1.1, opacity: titleProgress, transform: `translateY(${interpolate(titleProgress, [0, 1], [20, 0])}px)` }}>
          Your body is a system.
        </div>
        <div style={{ fontSize: 22, color: COLORS.subtext, marginTop: 12, opacity: subtitleProgress, transform: `translateY(${interpolate(subtitleProgress, [0, 1], [12, 0])}px)` }}>
          Everything is connected — symptoms are signals, not noise.
        </div>
      </div>
    </AbsoluteFill>
  );
};
