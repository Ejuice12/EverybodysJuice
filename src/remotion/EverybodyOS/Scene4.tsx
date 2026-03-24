import { AbsoluteFill, interpolate, spring, useCurrentFrame, useVideoConfig } from 'remotion';
import { COLORS } from './constants';

export const Scene4: React.FC<{ durationInFrames: number }> = ({ durationInFrames }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const sceneOpacity = interpolate(frame, [0, 20, durationInFrames - 20, durationInFrames], [0, 1, 1, 0], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const logoProgress   = spring({ fps, frame: frame - 5,   config: { damping: 22, stiffness: 55 } });
  const taglineProgress = spring({ fps, frame: frame - 55,  config: { damping: 22, stiffness: 65 } });
  const dividerProgress = spring({ fps, frame: frame - 95,  config: { damping: 22, stiffness: 65 } });
  const urlProgress     = spring({ fps, frame: frame - 110, config: { damping: 22, stiffness: 65 } });
  const glow = 1 + Math.sin(frame * 0.04) * 0.12;
  return (
    <AbsoluteFill style={{ opacity: sceneOpacity, justifyContent: 'center', alignItems: 'center', flexDirection: 'column', gap: 0 }}>
      <div style={{ position: 'absolute', left: '50%', top: '50%', transform: 'translate(-50%, -50%)', width: 700 * glow, height: 500 * glow, borderRadius: '50%', background: `radial-gradient(ellipse, ${COLORS.teal}0d 0%, transparent 65%)`, opacity: logoProgress, pointerEvents: 'none' }} />
      <div style={{ fontSize: 88, fontWeight: 900, letterSpacing: '-0.045em', lineHeight: 1, color: COLORS.white, opacity: logoProgress, transform: `scale(${interpolate(logoProgress, [0, 1], [0.82, 1])})`, marginBottom: 26 }}>
        Everybody<span style={{ color: COLORS.teal, textShadow: `0 0 40px ${COLORS.teal}55` }}>OS</span>
      </div>
      <div style={{ fontSize: 26, color: COLORS.subtext, textAlign: 'center', letterSpacing: '0.005em', lineHeight: 1.5, maxWidth: 680, opacity: taglineProgress, transform: `translateY(${interpolate(taglineProgress, [0, 1], [14, 0])}px)`, marginBottom: 32 }}>
        Biological intelligence for your body.
      </div>
      <div style={{ width: interpolate(dividerProgress, [0, 1], [0, 180]), height: 1, background: `linear-gradient(to right, transparent, ${COLORS.teal}70, transparent)`, marginBottom: 20 }} />
      <div style={{ fontSize: 17, fontWeight: 600, letterSpacing: '0.06em', color: COLORS.teal, opacity: urlProgress, transform: `translateY(${interpolate(urlProgress, [0, 1], [10, 0])}px)` }}>
        everybodyos.app
      </div>
    </AbsoluteFill>
  );
};
