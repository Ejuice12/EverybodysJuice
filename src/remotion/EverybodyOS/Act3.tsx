/**
 * ACT 3 — "The 1% Standard"
 * Local frames 0 – 299 (10 seconds, global 450–749)
 *
 * PremiumSnapLayer stack:
 *   frame  0  → Personal_Engine_Range_1.jpeg snaps in (zIndex 1, pushed back at 60)
 *   frame  60 → Personal_Engine_Range_2.jpeg snaps in (zIndex 2, pushed back at 120)
 *   frame 120 → Epignetic_Analyzer.png snaps in       (zIndex 3)
 *
 * Overlays (above all layers, zIndex 10+):
 *   Range bar + bracket snap: frames 35–120
 *   PERSONAL RANGE ENGINE™ flash: frames 55–72
 *   DNA strands: frame 130+
 *   EPIGENETIC ANALYZER™ flash: frames 152–170
 *   Range Engine VO: frames 20–115
 *   Epigenetic VO: frames 125–299
 */
import React from 'react';
import {
  AbsoluteFill,
  Img,
  interpolate,
  spring,
  staticFile,
  useCurrentFrame,
  useVideoConfig,
} from 'remotion';
import { GLASS_STYLE, NB, ORANGE_TEXT_STYLE } from './constants';
import { PremiumSnapLayer } from './PremiumSnapLayer';

const sinePath = (
  frame: number,
  canvasW: number,
  centerY: number,
  amplitude: number,
  wavelength: number,
  phaseOffset: number
): string => {
  const speed = frame * 3;
  let d = '';
  for (let x = 0; x <= canvasW; x += 8) {
    const y =
      centerY +
      Math.sin(((x + speed) / wavelength) * Math.PI * 2 + phaseOffset) * amplitude;
    d += x === 0 ? `M ${x} ${y}` : ` L ${x} ${y}`;
  }
  return d;
};

export const Act3: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // ── Range bar + bracket ──────────────────────────────────────────
  const barOpacity = interpolate(frame, [35, 52], [0, 1], {
    extrapolateLeft: 'clamp', extrapolateRight: 'clamp',
  });
  const bracketProgress = spring({
    frame: Math.max(0, frame - 48),
    fps,
    config: { damping: 8, stiffness: 700, mass: 0.4 },
    from: 0,
    to: 1,
  });
  const yourRangeOpacity = interpolate(frame, [68, 85], [0, 1], {
    extrapolateLeft: 'clamp', extrapolateRight: 'clamp',
  });
  const bracketInset = bracketProgress * 180;

  // ── Flash texts ──────────────────────────────────────────────────
  const flash1Opacity = interpolate(frame, [55, 62, 68, 75], [0, 1, 1, 0], {
    extrapolateLeft: 'clamp', extrapolateRight: 'clamp',
  });
  const flash2Opacity = interpolate(frame, [152, 160, 166, 174], [0, 1, 1, 0], {
    extrapolateLeft: 'clamp', extrapolateRight: 'clamp',
  });

  // ── VO panels ────────────────────────────────────────────────────
  const reVOOpacity = interpolate(frame, [20, 38, 108, 120], [0, 1, 1, 0], {
    extrapolateLeft: 'clamp', extrapolateRight: 'clamp',
  });
  const epiVOOpacity = interpolate(frame, [125, 145, 288, 299], [0, 1, 1, 0], {
    extrapolateLeft: 'clamp', extrapolateRight: 'clamp',
  });

  // ── Epigenetic Ken Burns (from frame 120) ────────────────────────
  const epiFrame = Math.max(0, frame - 120);
  const epiKenBurns = interpolate(epiFrame, [0, 180], [1.0, 1.15], {
    extrapolateLeft: 'clamp', extrapolateRight: 'clamp',
  });

  // ── DNA strands (from frame 130) ─────────────────────────────────
  const dnaOpacity = interpolate(frame, [130, 155], [0, 1], {
    extrapolateLeft: 'clamp', extrapolateRight: 'clamp',
  });

  return (
    <AbsoluteFill style={{ background: '#000000', overflow: 'hidden' }}>

      {/* ── LAYER 1 : Personal Range Engine 1 ── */}
      <PremiumSnapLayer startFrame={0} pushBackFrame={60} zIndex={1}>
        <Img
          src={staticFile('Personal_Engine_Range_1.jpeg')}
          style={{
            width: 886,
            borderRadius: 24,
            boxShadow: '0 30px 60px rgba(0,0,0,0.8)',
            display: 'block',
          }}
        />
      </PremiumSnapLayer>

      {/* ── LAYER 2 : Personal Range Engine 2 ── */}
      <PremiumSnapLayer startFrame={60} pushBackFrame={120} zIndex={2}>
        <Img
          src={staticFile('Personal_Engine_Range_2.jpeg')}
          style={{
            width: 886,
            borderRadius: 24,
            boxShadow: '0 30px 60px rgba(0,0,0,0.8)',
            display: 'block',
          }}
        />
      </PremiumSnapLayer>

      {/* ── LAYER 3 : Epigenetic Analyzer ── */}
      <PremiumSnapLayer startFrame={120} zIndex={3}>
        <div
          style={{
            width: 886,
            borderRadius: 24,
            overflow: 'hidden',
            boxShadow: '0 30px 60px rgba(0,0,0,0.8)',
          }}
        >
          <Img
            src={staticFile('Epignetic_Analyzer.png')}
            style={{
              width: '100%',
              display: 'block',
              transform: `scale(${epiKenBurns})`,
              transformOrigin: 'center center',
            }}
          />
        </div>
      </PremiumSnapLayer>

      {/* ── Range bar + bracket (above layers) ── */}
      <div
        style={{
          position: 'absolute',
          left: 200,
          top: 1340,
          width: 680,
          zIndex: 10,
          opacity: barOpacity,
        }}
      >
        {/* Full gray bar */}
        <div
          style={{
            width: '100%',
            height: 16,
            background: 'rgba(255,255,255,0.12)',
            borderRadius: 8,
            position: 'relative',
            marginBottom: 12,
          }}
        >
          <span
            style={{
              position: 'absolute',
              left: 0,
              top: 24,
              color: 'rgba(255,255,255,0.4)',
              fontSize: 26,
              fontFamily: NB,
            }}
          >
            Normal Range: 15–150 ng/mL
          </span>
        </div>
        {/* Orange bracket snap */}
        <div
          style={{
            position: 'absolute',
            left: bracketInset,
            top: -8,
            right: bracketInset,
            height: 32,
            borderLeft: '4px solid #FF6B00',
            borderRight: '4px solid #FFB347',
            borderTop: '4px solid #FF8C30',
            borderRadius: '4px 4px 0 0',
            boxShadow: '0 0 12px rgba(255,107,0,0.6)',
          }}
        />
        {/* YOUR RANGE label */}
        <div
          style={{
            position: 'absolute',
            left: bracketInset,
            top: -58,
            fontFamily: NB,
            fontSize: 28,
            letterSpacing: 3,
            opacity: yourRangeOpacity,
            ...ORANGE_TEXT_STYLE,
          }}
        >
          YOUR RANGE
        </div>
      </div>

      {/* ── DNA strand animation ── */}
      <svg
        width={1080}
        height={320}
        style={{
          position: 'absolute',
          bottom: 360,
          left: 0,
          zIndex: 10,
          opacity: dnaOpacity,
          pointerEvents: 'none',
        }}
      >
        <defs>
          <linearGradient id="dnaGrad1" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#FF6B00" stopOpacity="0.9" />
            <stop offset="100%" stopColor="#FFB347" stopOpacity="0.9" />
          </linearGradient>
          <linearGradient id="dnaGrad2" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#FFB347" stopOpacity="0.6" />
            <stop offset="100%" stopColor="#FF6B00" stopOpacity="0.6" />
          </linearGradient>
        </defs>
        <path
          d={sinePath(epiFrame, 1080, 160, 55, 220, 0)}
          stroke="url(#dnaGrad1)"
          strokeWidth={3.5}
          fill="none"
          strokeLinecap="round"
        />
        <path
          d={sinePath(epiFrame, 1080, 160, 55, 220, Math.PI)}
          stroke="url(#dnaGrad2)"
          strokeWidth={3.5}
          fill="none"
          strokeLinecap="round"
        />
        {Array.from({ length: 12 }).map((_, i) => {
          const x = 40 + i * 90;
          const speed = epiFrame * 3;
          const y1 = 160 + Math.sin(((x + speed) / 220) * Math.PI * 2) * 55;
          const y2 = 160 + Math.sin(((x + speed) / 220) * Math.PI * 2 + Math.PI) * 55;
          return (
            <line key={i} x1={x} y1={y1} x2={x} y2={y2}
              stroke="rgba(255,107,0,0.35)" strokeWidth={2} />
          );
        })}
      </svg>

      {/* ── PERSONAL RANGE ENGINE™ flash ── */}
      <div
        style={{
          position: 'absolute',
          top: 200,
          left: 0,
          right: 0,
          zIndex: 10,
          textAlign: 'center',
          fontFamily: NB,
          fontSize: 54,
          letterSpacing: 6,
          color: '#FFFFFF',
          opacity: flash1Opacity,
          pointerEvents: 'none',
        }}
      >
        PERSONAL RANGE ENGINE™
      </div>

      {/* ── EPIGENETIC ANALYZER™ flash ── */}
      <div
        style={{
          position: 'absolute',
          top: 200,
          left: 0,
          right: 0,
          zIndex: 10,
          textAlign: 'center',
          fontFamily: NB,
          fontSize: 56,
          letterSpacing: 6,
          color: '#FFFFFF',
          opacity: flash2Opacity,
          pointerEvents: 'none',
        }}
      >
        EPIGENETIC ANALYZER™
      </div>

      {/* ── Range Engine VO panel ── */}
      <div
        style={{
          position: 'absolute',
          bottom: 130,
          left: 72,
          right: 72,
          zIndex: 10,
          ...GLASS_STYLE,
          padding: '40px 56px',
          textAlign: 'center',
          opacity: reVOOpacity,
        }}
      >
        <div style={{ color: '#FFFFFF', fontSize: 42, marginBottom: 14, fontFamily: NB }}>
          You upload your labs.
        </div>
        <div style={{ color: '#FFFFFF', fontSize: 42, marginBottom: 14, fontFamily: NB }}>
          We ignore the standard ranges.
        </div>
        <div style={{ fontSize: 42, marginBottom: 14, fontFamily: NB, ...ORANGE_TEXT_STYLE }}>
          'Normal' is a statistical lie.
        </div>
        <div style={{ color: 'rgba(255,255,255,0.6)', fontSize: 34, fontFamily: NB, lineHeight: 1.4 }}>
          We learn YOUR unique biological baseline.
        </div>
      </div>

      {/* ── Epigenetic VO panel ── */}
      <div
        style={{
          position: 'absolute',
          bottom: 130,
          left: 72,
          right: 72,
          zIndex: 10,
          ...GLASS_STYLE,
          padding: '40px 56px',
          textAlign: 'center',
          opacity: epiVOOpacity,
        }}
      >
        <div style={{ color: '#FFFFFF', fontSize: 44, marginBottom: 16, fontFamily: NB }}>
          Then we go to the source code.
        </div>
        <div style={{ color: 'rgba(255,255,255,0.6)', fontSize: 36, fontFamily: NB, lineHeight: 1.4 }}>
          See how your lifestyle turns your genes on and off.
        </div>
      </div>
    </AbsoluteFill>
  );
};
