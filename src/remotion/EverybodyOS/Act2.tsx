/**
 * ACT 2 — "Tearing Down the System"
 * Local frames 0 – 299 (10 seconds, global 150–449)
 *
 * ENERGY AUDIT segment  (local  0 – 119)
 *   0–40   : Energy_Audit_2.png slides in from right (90% canvas width)
 *   30–80  : Orange glowing marker pill animates onto the chart
 *   10–90  : Glass VO panel fades in at bottom
 *
 * PATTERN DECODER segment (local 120 – 299)
 *   120–160: Left node "Brain Fog" fades/springs in
 *   130–175: Right node "Poor Sleep" fades/springs in
 *   155–185: Orange SVG line shoots left→right
 *   175–205: "Crashing Fatigue" node drops in below
 *   195–235: Two orange lines shoot down to bottom node
 *   205–260: Pattern_Decoder.jpeg crossfades behind at 40% opacity
 *   245–260: "PATTERN DECODER™" flash text
 *   80–299 : VO panel transitions
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

// Node positions in the 1080×1920 canvas
const NODE_BRAIN_FOG    = { cx: 230, cy: 870 };
const NODE_POOR_SLEEP   = { cx: 850, cy: 870 };
const NODE_FATIGUE      = { cx: 540, cy: 1250 };

// Approximate SVG line lengths
const LINE_HORIZONTAL   = Math.hypot(
  NODE_POOR_SLEEP.cx - NODE_BRAIN_FOG.cx,
  NODE_POOR_SLEEP.cy - NODE_BRAIN_FOG.cy
); // ≈ 620
const LINE_LEFT_DOWN    = Math.hypot(
  NODE_FATIGUE.cx - NODE_BRAIN_FOG.cx,
  NODE_FATIGUE.cy - NODE_BRAIN_FOG.cy
); // ≈ 527
const LINE_RIGHT_DOWN   = Math.hypot(
  NODE_FATIGUE.cx - NODE_POOR_SLEEP.cx,
  NODE_FATIGUE.cy - NODE_POOR_SLEEP.cy
); // ≈ 508

const GlassNode: React.FC<{
  label: string;
  cx: number;
  cy: number;
  opacity: number;
  scale: number;
}> = ({ label, cx, cy, opacity, scale }) => (
  <div
    style={{
      position: 'absolute',
      left: cx - 140,
      top: cy - 38,
      width: 280,
      height: 76,
      ...GLASS_STYLE,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      opacity,
      transform: `scale(${scale})`,
    }}
  >
    <span
      style={{
        color: '#fff',
        fontSize: 34,
        fontFamily: NB,
        letterSpacing: 1,
      }}
    >
      {label}
    </span>
  </div>
);

export const Act2: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // ----------------------------------------------------------------
  // ENERGY AUDIT
  // ----------------------------------------------------------------
  const imgSlide = spring({
    frame,
    fps,
    config: { damping: 18, stiffness: 200, mass: 1 },
    from: 1080,
    to: 0,
  });

  const markerFrame = Math.max(0, frame - 30);
  const markerScale = spring({
    frame: markerFrame,
    fps,
    config: { damping: 14, stiffness: 350, mass: 0.6 },
    from: 0,
    to: 1,
  });
  const markerGlow = 0.5 + Math.sin(frame * 0.18) * 0.3;

  const auditVOOpacity = interpolate(frame, [10, 30, 105, 120], [0, 1, 1, 0], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  // ----------------------------------------------------------------
  // PATTERN DECODER
  // ----------------------------------------------------------------
  const pf = (start: number) => Math.max(0, frame - start);

  const nodeBFOpacity = interpolate(frame, [120, 145], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });
  const nodeBFScale = spring({
    frame: pf(118),
    fps,
    config: { damping: 16, stiffness: 400 },
    from: 0.7,
    to: 1,
  });

  const nodePSOpacity = interpolate(frame, [130, 155], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });
  const nodePSScale = spring({
    frame: pf(128),
    fps,
    config: { damping: 16, stiffness: 400 },
    from: 0.7,
    to: 1,
  });

  // Horizontal line progress (left → right)
  const hLineProgress = spring({
    frame: pf(155),
    fps,
    config: { damping: 20, stiffness: 600 },
    from: 0,
    to: 1,
  });

  const nodeFatOpacity = interpolate(frame, [175, 200], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });
  const nodeFatScale = spring({
    frame: pf(173),
    fps,
    config: { damping: 14, stiffness: 400 },
    from: 0.7,
    to: 1,
  });

  const lLineProgress = spring({
    frame: pf(195),
    fps,
    config: { damping: 20, stiffness: 600 },
    from: 0,
    to: 1,
  });
  const rLineProgress = spring({
    frame: pf(205),
    fps,
    config: { damping: 20, stiffness: 600 },
    from: 0,
    to: 1,
  });

  // Pattern Decoder bg image crossfade
  const pdBgOpacity = interpolate(frame, [205, 235], [0, 0.4], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  // Flash text
  const flashOpacity = interpolate(frame, [245, 252, 258, 265], [0, 1, 1, 0], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  // Pattern Decoder VO
  const pdVOOpacity = interpolate(frame, [130, 155, 285, 299], [0, 1, 1, 0], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  // Which segment are we in?
  const inAudit   = frame < 120;
  const inDecoder = frame >= 120;

  return (
    <AbsoluteFill style={{ background: '#000000', overflow: 'hidden' }}>

      {/* ============================================================
          ENERGY AUDIT SEGMENT
      ============================================================ */}
      {inAudit && (
        <>
          {/* Screenshot sliding in from right */}
          <div
            style={{
              position: 'absolute',
              left: (1080 - 1080 * 0.9) / 2 + imgSlide,
              top: 300,
              width: 1080 * 0.9,
              borderRadius: 24,
              overflow: 'hidden',
              boxShadow: '0 24px 80px rgba(0,0,0,0.6)',
            }}
          >
            <Img
              src={staticFile('Energy_Audit_2.png')}
              style={{ width: '100%', display: 'block' }}
            />
          </div>

          {/* Orange glowing marker at ~2:00 PM area of the chart */}
          <div
            style={{
              position: 'absolute',
              left: 540 + imgSlide - 70,
              top: 780,
              width: 140,
              height: 44,
              background: 'rgba(255,107,0,0.25)',
              border: '2px solid rgba(255,107,0,0.8)',
              borderRadius: 100,
              boxShadow: `0 0 ${20 + markerGlow * 18}px rgba(255,107,0,0.7)`,
              transform: `scale(${markerScale})`,
            }}
          />

          {/* Audit VO panel */}
          <div
            style={{
              position: 'absolute',
              bottom: 140,
              left: 72,
              right: 72,
              ...GLASS_STYLE,
              padding: '40px 56px',
              textAlign: 'center',
              opacity: auditVOOpacity,
            }}
          >
            <div style={{ color: '#fff', fontSize: 44, marginBottom: 16, fontFamily: NB }}>
              We don't do average.
            </div>
            <div style={{ color: '#fff', fontSize: 44, marginBottom: 16, fontFamily: NB }}>
              Enter EverybodyOS.
            </div>
            <div style={{ color: 'rgba(255,255,255,0.7)', fontSize: 36, fontFamily: NB, lineHeight: 1.4 }}>
              The Energy Audit maps exactly where your drive is leaking.
            </div>
          </div>
        </>
      )}

      {/* ============================================================
          PATTERN DECODER SEGMENT
      ============================================================ */}
      {inDecoder && (
        <>
          {/* Pattern Decoder background image at 40% opacity */}
          <div
            style={{
              position: 'absolute',
              inset: 0,
              opacity: pdBgOpacity,
            }}
          >
            <Img
              src={staticFile('Pattern_Decoder.jpeg')}
              style={{ width: '100%', height: '100%', objectFit: 'cover' }}
            />
          </div>

          {/* SVG overlay for connecting lines */}
          <svg
            width={1080}
            height={1920}
            style={{ position: 'absolute', top: 0, left: 0, pointerEvents: 'none' }}
          >
            <defs>
              <linearGradient id="act2LineGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#FF6B00" />
                <stop offset="100%" stopColor="#FFB347" />
              </linearGradient>
            </defs>

            {/* Horizontal line: Brain Fog → Poor Sleep */}
            <line
              x1={NODE_BRAIN_FOG.cx}
              y1={NODE_BRAIN_FOG.cy}
              x2={NODE_POOR_SLEEP.cx}
              y2={NODE_POOR_SLEEP.cy}
              stroke="url(#act2LineGrad)"
              strokeWidth={3}
              strokeLinecap="round"
              strokeDasharray={LINE_HORIZONTAL}
              strokeDashoffset={LINE_HORIZONTAL * (1 - hLineProgress)}
            />
            {/* Left-down line: Brain Fog → Crashing Fatigue */}
            <line
              x1={NODE_BRAIN_FOG.cx}
              y1={NODE_BRAIN_FOG.cy}
              x2={NODE_FATIGUE.cx}
              y2={NODE_FATIGUE.cy}
              stroke="url(#act2LineGrad)"
              strokeWidth={3}
              strokeLinecap="round"
              strokeDasharray={LINE_LEFT_DOWN}
              strokeDashoffset={LINE_LEFT_DOWN * (1 - lLineProgress)}
            />
            {/* Right-down line: Poor Sleep → Crashing Fatigue */}
            <line
              x1={NODE_POOR_SLEEP.cx}
              y1={NODE_POOR_SLEEP.cy}
              x2={NODE_FATIGUE.cx}
              y2={NODE_FATIGUE.cy}
              stroke="url(#act2LineGrad)"
              strokeWidth={3}
              strokeLinecap="round"
              strokeDasharray={LINE_RIGHT_DOWN}
              strokeDashoffset={LINE_RIGHT_DOWN * (1 - rLineProgress)}
            />
          </svg>

          {/* Glassmorphism nodes */}
          <GlassNode
            label="Brain Fog"
            cx={NODE_BRAIN_FOG.cx}
            cy={NODE_BRAIN_FOG.cy}
            opacity={nodeBFOpacity}
            scale={nodeBFScale}
          />
          <GlassNode
            label="Poor Sleep"
            cx={NODE_POOR_SLEEP.cx}
            cy={NODE_POOR_SLEEP.cy}
            opacity={nodePSOpacity}
            scale={nodePSScale}
          />
          <GlassNode
            label="Crashing Fatigue"
            cx={NODE_FATIGUE.cx}
            cy={NODE_FATIGUE.cy}
            opacity={nodeFatOpacity}
            scale={nodeFatScale}
          />

          {/* PATTERN DECODER™ flash text */}
          <div
            style={{
              position: 'absolute',
              top: 540,
              left: 0,
              right: 0,
              textAlign: 'center',
              fontFamily: NB,
              fontSize: 64,
              letterSpacing: 8,
              color: '#fff',
              opacity: flashOpacity,
              pointerEvents: 'none',
            }}
          >
            PATTERN DECODER™
          </div>

          {/* Pattern Decoder VO panel */}
          <div
            style={{
              position: 'absolute',
              bottom: 140,
              left: 72,
              right: 72,
              ...GLASS_STYLE,
              padding: '40px 56px',
              textAlign: 'center',
              opacity: pdVOOpacity,
            }}
          >
            <div style={{ color: '#fff', fontSize: 44, marginBottom: 16, fontFamily: NB }}>
              Symptoms aren't random.
            </div>
            <div style={{ color: '#fff', fontSize: 44, marginBottom: 16, fontFamily: NB }}>
              They're data.
            </div>
            <div style={{ color: 'rgba(255,255,255,0.7)', fontSize: 36, fontFamily: NB }}>
              Pattern Decoder connects the dots.
            </div>
          </div>
        </>
      )}
    </AbsoluteFill>
  );
};
