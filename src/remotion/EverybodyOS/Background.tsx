import { AbsoluteFill, useCurrentFrame } from 'remotion';
import { COLORS } from './constants';

export const Background: React.FC = () => {
  const frame = useCurrentFrame();
  const drift = frame * 0.03;

  return (
    <AbsoluteFill style={{ background: COLORS.bg, overflow: 'hidden' }}>
      <svg
        style={{ position: 'absolute', width: '100%', height: '100%', opacity: 0.18 }}
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <pattern
            id="dots"
            x={drift % 40}
            y={drift % 40}
            width="40"
            height="40"
            patternUnits="userSpaceOnUse"
          >
            <circle cx="20" cy="20" r="1" fill="rgba(255,255,255,0.5)" />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#dots)" />
      </svg>
      <div
        style={{
          position: 'absolute',
          left: '50%',
          top: '50%',
          transform: 'translate(-50%, -50%)',
          width: 800,
          height: 600,
          borderRadius: '50%',
          background: `radial-gradient(ellipse, ${COLORS.teal}06 0%, transparent 70%)`,
          pointerEvents: 'none',
        }}
      />
    </AbsoluteFill>
  );
};
