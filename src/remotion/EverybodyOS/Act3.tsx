/**
 * ACT 3 — "The 1% Standard"
 * Local frames 0 – 299 (10 seconds, global 450–749)
 *
 * PERSONAL RANGE ENGINE segment (local 0 – 149)
 *   0–40   : Personal_Engine_Range_1.jpeg slides up from bottom
 *   35–80  : Gray "Normal Range" bar appears, then orange bracket SNAPS inward
 *   70–100 : "YOUR RANGE" text in orange
 *   110–140: Personal_Engine_Range_2.jpeg crossfades in
 *   125–145: "PERSONAL RANGE ENGINE™" flash text
 *   20–145 : VO glass panel
 *
 * EPIGENETIC ANALYZER segment (local 150 – 299)
 *   150+   : Epignetic_Analyzer.png Ken Burns (slow scale 1.0 → 1.15)
 *   160+   : Abstract orange DNA strand animation (two sine-wave paths)
 *   200–220: "EPIGENETIC ANALYZER™" flash text
 *   155–299: VO glass panel
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

// ------------------------------------------------------------------
// DNA strand helper — returns an SVG path string for a sine wave
// ------------------------------------------------------------------
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
      Math.sin(((x + speed) / wavelength) * Math.PI * 2 + phaseOffset) *
        amplitude;
    d += x === 0 ? `M ${x} ${y}` : ` L ${x} ${y}`;
  }
  return d;
};

export const Act3: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // ----------------------------------------------------------------
  // PERSONAL RANGE ENGINE
  // ----------------------------------------------------------------
  const imgSlideY = spring({
    frame,
    fps,
    config: { damping: 18, stiffness: 180, mass: 1 },
    from: 400,
    to: 0,
  });

  // Range bar appears
  const barOpacity = interpolate(frame, [35, 55], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  // Bracket snap — crushes inward (overshoot spring)
  const bracketProgress = spring({
    frame: Math.max(0, frame - 50),
    fps,
    config: { damping: 8, stiffness: 700, mass: 0.4 },
    from: 0,
    to: 1,
  });

  // "YOUR RANGE" text
  const yourRangeOpacity = interpolate(frame, [70, 90], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  // Crossfade to second screenshot
  const img2Opacity = interpolate(frame, [110, 135], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  // Flash text
  const flash1Opacity = interpolate(frame, [125, 132, 138, 145], [0, 1, 1, 0], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  // VO panel (Range Engine)
  const reVOOpacity = interpolate(frame, [20, 40, 138, 150], [0, 1, 1, 0], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  // ----------------------------------------------------------------
  // EPIGENETIC ANALYZER
  // ----------------------------------------------------------------
  const epiFrame = Math.max(0, frame - 150);

  // Ken Burns: slow scale 1.0 → 1.15 over 150 frames
  const epiScale = interpolate(epiFrame, [0, 150], [1.0, 1.15], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  const dnaOpacity = interpolate(frame, [160, 185], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  const flash2Opacity = interpolate(frame, [200, 208, 214, 222], [0, 1, 1, 0], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  const epiVOOpacity = interpolate(frame, [155, 175, 288, 299], [0, 1, 1, 0], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  const inRange = frame < 150;
  const inEpi   = frame >= 150;

  // Normal-range bar: total width 600, centred at x=240 in a 1080px canvas
  const BAR_LEFT   = 240;
  const BAR_WIDTH  = 600;
  const BAR_TOP    = 960;
  // Bracket shrinks inward from both sides (bracketProgress 0→1)
  const bracketInset = bracketProgress * 180;

  return (
    <AbsoluteFill style={{ background: '#000000', overflow: 'hidden' }}>

      {/* ============================================================
          PERSONAL RANGE ENGINE
      ============================================================ */}
      {inRange && (
        <>
          {/* Screenshot 1 sliding up */}
          <div
            style={{
              position: 'absolute',
              left: (1080 - 1080 * 0.88) / 2,
              top: 280 + imgSlideY,
              width: 1080 * 0.88,
              borderRadius: 20,
              overflow: 'hidden',
              boxShadow: '0 24px 80px rgba(0,0,0,0.6)',
            }}
          >
            <Img
              src={staticFile('Personal_Engine_Range_1.jpeg')}
              style={{ width: '100%', display: 'block' }}
            />
            {/* Screenshot 2 crossfades on top */}
            <div
              style={{
                position: 'absolute',
                inset: 0,
                opacity: img2Opacity,
              }}
            >
              <Img
                src={staticFile('Personal_Engine_Range_2.jpeg')}
                style={{ width: '100%', height: '100%', objectFit: 'cover' }}
              />
            </div>
          </div>

          {/* Normal range bar */}
          <div
            style={{
              position: 'absolute',
              left: BAR_LEFT,
              top: BAR_TOP,
              width: BAR_WIDTH,
              opacity: barOpacity,
            }}
          >
            {/* Gray full bar */}
            <div
              style={{
                width: '100%',
                height: 16,
                background: 'rgba(200,200,200,0.2)',
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

            {/* Orange bracket — snap inward */}
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
                top: -56,
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

          {/* Flash text */}
          <div
            style={{
              position: 'absolute',
              top: 520,
              left: 0,
              right: 0,
              textAlign: 'center',
              fontFamily: NB,
              fontSize: 58,
              letterSpacing: 6,
              color: '#fff',
              opacity: flash1Opacity,
              pointerEvents: 'none',
            }}
          >
            PERSONAL RANGE ENGINE™
          </div>

          {/* Range Engine VO panel */}
          <div
            style={{
              position: 'absolute',
              bottom: 130,
              left: 72,
              right: 72,
              ...GLASS_STYLE,
              padding: '40px 56px',
              textAlign: 'center',
              opacity: reVOOpacity,
            }}
          >
            <div style={{ color: '#fff', fontSize: 42, marginBottom: 14, fontFamily: NB }}>
              You upload your labs.
            </div>
            <div style={{ color: '#fff', fontSize: 42, marginBottom: 14, fontFamily: NB }}>
              We ignore the standard ranges.
            </div>
            <div
              style={{
                fontSize: 42,
                marginBottom: 14,
                fontFamily: NB,
                ...ORANGE_TEXT_STYLE,
              }}
            >
              'Normal' is a statistical lie.
            </div>
            <div style={{ color: 'rgba(255,255,255,0.65)', fontSize: 34, fontFamily: NB, lineHeight: 1.4 }}>
              We learn YOUR unique biological baseline.
            </div>
          </div>
        </>
      )}

      {/* ============================================================
          EPIGENETIC ANALYZER
      ============================================================ */}
      {inEpi && (
        <>
          {/* Ken Burns image */}
          <div
            style={{
              position: 'absolute',
              inset: 0,
              overflow: 'hidden',
            }}
          >
            <Img
              src={staticFile('Epignetic_Analyzer.png')}
              style={{
                width: '100%',
                height: '100%',
                objectFit: 'cover',
                transform: `scale(${epiScale})`,
                transformOrigin: 'center center',
              }}
            />
            {/* Darken overlay so text is readable */}
            <div
              style={{
                position: 'absolute',
                inset: 0,
                background: 'rgba(0,0,0,0.5)',
              }}
            />
          </div>

          {/* DNA strand animation */}
          <svg
            width={1080}
            height={320}
            style={{
              position: 'absolute',
              top: 760,
              left: 0,
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
            {/* Strand 1 */}
            <path
              d={sinePath(epiFrame, 1080, 160, 55, 220, 0)}
              stroke="url(#dnaGrad1)"
              strokeWidth={3.5}
              fill="none"
              strokeLinecap="round"
            />
            {/* Strand 2 (π phase offset) */}
            <path
              d={sinePath(epiFrame, 1080, 160, 55, 220, Math.PI)}
              stroke="url(#dnaGrad2)"
              strokeWidth={3.5}
              fill="none"
              strokeLinecap="round"
            />
            {/* Cross-link rungs */}
            {Array.from({ length: 12 }).map((_, i) => {
              const x = 40 + i * 90;
              const speed = epiFrame * 3;
              const y1 =
                160 +
                Math.sin(((x + speed) / 220) * Math.PI * 2) * 55;
              const y2 =
                160 +
                Math.sin(((x + speed) / 220) * Math.PI * 2 + Math.PI) * 55;
              return (
                <line
                  key={i}
                  x1={x}
                  y1={y1}
                  x2={x}
                  y2={y2}
                  stroke="rgba(255,140,50,0.35)"
                  strokeWidth={2}
                />
              );
            })}
          </svg>

          {/* EPIGENETIC ANALYZER™ flash */}
          <div
            style={{
              position: 'absolute',
              top: 520,
              left: 0,
              right: 0,
              textAlign: 'center',
              fontFamily: NB,
              fontSize: 56,
              letterSpacing: 6,
              color: '#fff',
              opacity: flash2Opacity,
              pointerEvents: 'none',
            }}
          >
            EPIGENETIC ANALYZER™
          </div>

          {/* Epi VO panel */}
          <div
            style={{
              position: 'absolute',
              bottom: 130,
              left: 72,
              right: 72,
              ...GLASS_STYLE,
              padding: '40px 56px',
              textAlign: 'center',
              opacity: epiVOOpacity,
            }}
          >
            <div style={{ color: '#fff', fontSize: 44, marginBottom: 16, fontFamily: NB }}>
              Then we go to the source code.
            </div>
            <div style={{ color: 'rgba(255,255,255,0.7)', fontSize: 36, fontFamily: NB, lineHeight: 1.4 }}>
              See how your lifestyle turns your genes on and off.
            </div>
          </div>
        </>
      )}
    </AbsoluteFill>
  );
};
