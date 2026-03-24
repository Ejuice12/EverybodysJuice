import { AbsoluteFill, interpolate, spring, useCurrentFrame, useVideoConfig } from 'remotion';
import { COLORS } from './constants';

const SYMPTOMS = [
  { label: 'Poor Sleep',    x: 11, y: 17, delay: 0,  color: '#60a5fa' },
  { label: 'High Stress',   x: 74, y: 12, delay: 6,  color: '#f87171' },
  { label: 'Low Energy',    x: 83, y: 67, delay: 12, color: '#fbbf24' },
  { label: 'Mood Swings',   x: 15, y: 71, delay: 4,  color: '#a78bfa' },
  { label: 'Brain Fog',     x: 46, y: 83, delay: 18, color: '#34d399' },
  { label: 'Low Drive',     x: 59, y: 9,  delay: 10, color: '#f472b6' },
  { label: 'Anxiety',       x: 6,  y: 45, delay: 7,  color: '#fb923c' },
  { label: 'Slow Recovery', x: 88, y: 33, delay: 15, color: '#22d3ee' },
];

const Bubble: React.FC<{
  label: string; x: number; y: number; delay: number; color: string;
}> = ({ label, x, y, delay, color }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const appear = spring({ fps, frame: frame - delay, config: { damping: 14, stiffness: 110, mass: 0.6 } });
  const floatX = Math.sin(frame * 0.024 + delay) * 7;
  const floatY = Math.cos(frame * 0.018 + delay * 0.8) * 9;
  return (
    <div style={{ position: 'absolute', left: `${x}%`, top: `${y}%`, transform: `translate(-50%, -50%) translate(${floatX}px, ${floatY}px) scale(${appear})`, opacity: appear, pointerEvents: 'none' }}>
      <div style={{ background: `${color}18`, border: `1.5px solid ${color}55`, borderRadius: 100, padding: '9px 20px', color, fontSize: 15, fontWeight: 600, whiteSpace: 'nowrap', letterSpacing: '0.01em' }}>
        {label}
      </div>
    </div>
  );
};

export const Scene1: React.FC<{ durationInFrames: number }> = ({ durationInFrames }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const sceneOpacity = interpolate(frame, [0, 15, durationInFrames - 25, durationInFrames], [0, 1, 1, 0], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const titleProgress = spring({ fps, frame: frame - 45, config: { damping: 22, stiffness: 65 } });
  const subtitleProgress = spring({ fps, frame: frame - 105, config: { damping: 22, stiffness: 65 } });
  return (
    <AbsoluteFill style={{ opacity: sceneOpacity }}>
      {SYMPTOMS.map((s) => <Bubble key={s.label} {...s} />)}
      <AbsoluteFill style={{ justifyContent: 'center', alignItems: 'center', flexDirection: 'column', gap: 18 }}>
        <div style={{ fontSize: 58, fontWeight: 800, color: COLORS.white, letterSpacing: '-0.025em', lineHeight: 1.1, textAlign: 'center', opacity: titleProgress, transform: `translateY(${interpolate(titleProgress, [0, 1], [28, 0])}px)` }}>
          You track everything.
        </div>
        <div style={{ fontSize: 28, color: COLORS.subtext, textAlign: 'center', opacity: subtitleProgress, transform: `translateY(${interpolate(subtitleProgress, [0, 1], [18, 0])}px)`, letterSpacing: '0.005em' }}>
          But nothing connects.
        </div>
      </AbsoluteFill>
    </AbsoluteFill>
  );
};
