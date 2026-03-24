import { AbsoluteFill, interpolate, spring, useCurrentFrame, useVideoConfig } from 'remotion';
import { COLORS } from './constants';

const CARDS = [
  { step: '01', title: 'DECODE',  body: 'We identify hormonal and epigenetic\npatterns hidden in your data.', accent: COLORS.teal,   delay: 15 },
  { step: '02', title: 'EXPLAIN', body: 'See exactly why your energy dropped,\nwhich system is off, and why.',    accent: COLORS.purple, delay: 50 },
  { step: '03', title: 'PLAN',    body: 'Get a precise action plan for\nwhat to change this week.',           accent: COLORS.pink,   delay: 85 },
];

const Card: React.FC<{ step: string; title: string; body: string; accent: string; delay: number }> = ({ step, title, body, accent, delay }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const appear = spring({ fps, frame: frame - delay, config: { damping: 20, stiffness: 90, mass: 0.9 } });
  return (
    <div style={{ flex: 1, background: COLORS.card, border: `1px solid ${accent}28`, borderRadius: 18, padding: '38px 32px', display: 'flex', flexDirection: 'column', gap: 14, opacity: appear, transform: `translateY(${interpolate(appear, [0, 1], [50, 0])}px)` }}>
      <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: '0.18em', color: accent }}>STEP {step}</div>
      <div style={{ fontSize: 38, fontWeight: 800, color: COLORS.white, letterSpacing: '-0.02em', lineHeight: 1 }}>{title}</div>
      <div style={{ width: 36, height: 3, background: accent, borderRadius: 2, opacity: 0.8 }} />
      <div style={{ fontSize: 17, color: COLORS.subtext, lineHeight: 1.65, whiteSpace: 'pre-line', marginTop: 4 }}>{body}</div>
    </div>
  );
};

export const Scene3: React.FC<{ durationInFrames: number }> = ({ durationInFrames }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const sceneOpacity = interpolate(frame, [0, 20, durationInFrames - 25, durationInFrames], [0, 1, 1, 0], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const headerProgress = spring({ fps, frame, config: { damping: 22, stiffness: 80 } });
  return (
    <AbsoluteFill style={{ opacity: sceneOpacity, padding: '56px 72px', flexDirection: 'column', gap: 38 }}>
      <div style={{ fontSize: 13, fontWeight: 700, letterSpacing: '0.15em', color: COLORS.teal, opacity: headerProgress, transform: `translateY(${interpolate(headerProgress, [0, 1], [-12, 0])}px)` }}>
        NOT A TRACKER — AN INTERPRETER
      </div>
      <div style={{ display: 'flex', gap: 22, flex: 1 }}>
        {CARDS.map((card) => <Card key={card.title} {...card} />)}
      </div>
    </AbsoluteFill>
  );
};
