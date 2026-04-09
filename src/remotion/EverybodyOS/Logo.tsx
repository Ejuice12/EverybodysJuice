import React from 'react';
import { NB } from './constants';

interface LogoProps {
  /** Overall size multiplier — base circle is 120px at size=1 */
  size?: number;
  opacity?: number;
  /** 0–1 value that pulses the glow intensity */
  glowPulse?: number;
}

export const EverybodyOSLogo: React.FC<LogoProps> = ({
  size = 1,
  opacity = 1,
  glowPulse = 0,
}) => {
  const circleSize = 120 * size;
  const glowStrength = 24 + glowPulse * 16;

  return (
    <div
      style={{
        opacity,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: 16 * size,
        filter: `drop-shadow(0 0 ${glowStrength}px rgba(255, 107, 0, 0.6))`,
      }}
    >
      {/* Row: circle icon + Everybody™ */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 28 * size }}>
        {/* Orange circle with stick figure */}
        <svg
          width={circleSize}
          height={circleSize}
          viewBox="0 0 100 100"
          style={{ flexShrink: 0 }}
        >
          <defs>
            <linearGradient id="logoOrangeGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#FF6B00" />
              <stop offset="100%" stopColor="#FFB347" />
            </linearGradient>
          </defs>
          {/* Background circle */}
          <circle cx="50" cy="50" r="48" fill="url(#logoOrangeGrad)" />
          {/* Head */}
          <circle cx="50" cy="24" r="9" fill="white" />
          {/* Body */}
          <line x1="50" y1="33" x2="50" y2="65" stroke="white" strokeWidth="6" strokeLinecap="round" />
          {/* Left arm raised */}
          <line x1="50" y1="47" x2="27" y2="33" stroke="white" strokeWidth="6" strokeLinecap="round" />
          {/* Right arm raised */}
          <line x1="50" y1="47" x2="73" y2="33" stroke="white" strokeWidth="6" strokeLinecap="round" />
          {/* Left leg */}
          <line x1="50" y1="65" x2="35" y2="84" stroke="white" strokeWidth="6" strokeLinecap="round" />
          {/* Right leg */}
          <line x1="50" y1="65" x2="65" y2="84" stroke="white" strokeWidth="6" strokeLinecap="round" />
        </svg>

        {/* "Everybody™" wordmark */}
        <div
          style={{
            fontFamily: NB,
            fontSize: 72 * size,
            color: '#FFFFFF',
            fontWeight: 'normal',
            lineHeight: 1,
            letterSpacing: -1 * size,
          }}
        >
          Everybody
          <sup
            style={{
              fontSize: '0.45em',
              verticalAlign: 'super',
              fontFamily: NB,
            }}
          >
            ™
          </sup>
        </div>
      </div>

      {/* EverybodyOS.app subtitle */}
      <div
        style={{
          fontFamily: NB,
          fontSize: 28 * size,
          color: 'rgba(255,255,255,0.8)',
          letterSpacing: 4 * size,
          textAlign: 'center',
        }}
      >
        EverybodyOS.app
      </div>
    </div>
  );
};
