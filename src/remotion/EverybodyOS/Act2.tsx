/**
 * ACT 2 — "Tearing Down the System"
 * Local frames 0 – 299 (10 seconds, global 150–449)
 *
 * PremiumSnapLayer stack:
 *   frame  0  → Energy_Audit_2.png snaps in      (zIndex 1, pushed back at 60)
 *   frame  60 → Pattern_Decoder.jpeg snaps in    (zIndex 2, pushed back at 120)
 *   frame 120 → node connections layer snaps in  (zIndex 3)
 *
 * Orange marker: appears at frame 30, on top of audit card
 * Audit VO panel: frames 5–58
 * Node animations: internal to nodes layer (stagger from frame 125)
 * PATTERN DECODER™ flash: frames 178–195
 * Decoder VO panel: frames 125–295
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

// Node positions within the full 1080×1920 node-layer canvas
const NODE_BF  = { cx: 230, cy: 870 };
const NODE_PS  = { cx: 850, cy: 870 };
const NODE_FAT = { cx: 540, cy: 1250 };

const LINE_H  = Math.hypot(NODE_PS.cx - NODE_BF.cx,  NODE_PS.cy - NODE_BF.cy);
const LINE_LD = Math.hypot(NODE_FAT.cx - NODE_BF.cx, NODE_FAT.cy - NODE_BF.cy);
const LINE_RD = Math.hypot(NODE_FAT.cx - NODE_PS.cx, NODE_FAT.cy - NODE_PS.cy);

const GlassNode: React.FC<{ label: string; cx: number; cy: number; opacity: number; scale: number }> = ({
  label, cx, cy, opacity, scale,
}) => (
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
    <span style={{ color: '#FFFFFF', fontSize: 34, fontFamily: NB, letterSpacing: 1 }}>
      {label}
    </span>
  </div>
);

export const Act2: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // ── Orange marker (on audit image) ──────────────────────────────
  const markerScale = spring({
    frame: Math.max(0, frame - 30),
    fps,
    config: { damping: 14, stiffness: 350, mass: 0.6 },
    from: 0,
    to: 1,
  });
  const markerGlow = 0.5 + Math.sin(frame * 0.18) * 0.3;

  // ── Audit VO ─────────────────────────────────────────────────────
  const auditVOOpacity = interpolate(frame, [5, 22, 52, 60], [0, 1, 1, 0], {
    extrapolateLeft: 'clamp', extrapolateRight: 'clamp',
  });

  // ── Node layer internal animations (start after snap at 120) ────
  const nf = (start: number) => Math.max(0, frame - start);

  const nodeBFOpacity = interpolate(frame, [125, 142], [0, 1], {
    extrapolateLeft: 'clamp', extrapolateRight: 'clamp',
  });
  const nodeBFScale = spring({ frame: nf(123), fps, config: { damping: 16, stiffness: 400 }, from: 0.7, to: 1 });

  const nodePSOpacity = interpolate(frame, [133, 150], [0, 1], {
    extrapolateLeft: 'clamp', extrapolateRight: 'clamp',
  });
  const nodePSScale = spring({ frame: nf(131), fps, config: { damping: 16, stiffness: 400 }, from: 0.7, to: 1 });

  const hLineProgress = spring({ frame: nf(155), fps, config: { damping: 20, stiffness: 600 }, from: 0, to: 1 });

  const nodeFatOpacity = interpolate(frame, [168, 186], [0, 1], {
    extrapolateLeft: 'clamp', extrapolateRight: 'clamp',
  });
  const nodeFatScale = spring({ frame: nf(166), fps, config: { damping: 14, stiffness: 400 }, from: 0.7, to: 1 });

  const lLineProgress = spring({ frame: nf(188), fps, config: { damping: 20, stiffness: 600 }, from: 0, to: 1 });
  const rLineProgress = spring({ frame: nf(198), fps, config: { damping: 20, stiffness: 600 }, from: 0, to: 1 });

  // ── Flash text ────────────────────────────────────────────────────
  const flashOpacity = interpolate(frame, [178, 185, 191, 198], [0, 1, 1, 0], {
    extrapolateLeft: 'clamp', extrapolateRight: 'clamp',
  });

  // ── Decoder VO ───────────────────────────────────────────────────
  const pdVOOpacity = interpolate(frame, [125, 145, 285, 299], [0, 1, 1, 0], {
    extrapolateLeft: 'clamp', extrapolateRight: 'clamp',
  });

  return (
    <AbsoluteFill style={{ background: '#000000', overflow: 'hidden' }}>

      {/* ── LAYER 1 : Energy Audit ── */}
      <PremiumSnapLayer startFrame={0} pushBackFrame={60} zIndex={1}>
        <div style={{ position: 'relative' }}>
          <Img
            src={staticFile('Energy_Audit_2.png')}
            style={{
              width: 886,
              borderRadius: 24,
              boxShadow: '0 30px 60px rgba(0,0,0,0.8)',
              display: 'block',
            }}
          />
          {/* Orange marker at ~2:00 PM area */}
          <div
            style={{
              position: 'absolute',
              left: '38%',
              top: '62%',
              width: 140,
              height: 44,
              background: 'rgba(255,107,0,0.25)',
              border: '2px solid rgba(255,107,0,0.8)',
              borderRadius: 100,
              boxShadow: `0 0 ${20 + markerGlow * 18}px rgba(255,107,0,0.7)`,
              transform: `scale(${markerScale})`,
            }}
          />
        </div>
      </PremiumSnapLayer>

      {/* ── LAYER 2 : Pattern Decoder bg image ── */}
      <PremiumSnapLayer startFrame={60} pushBackFrame={120} zIndex={2}>
        <Img
          src={staticFile('Pattern_Decoder.jpeg')}
          style={{
            width: 886,
            borderRadius: 24,
            boxShadow: '0 30px 60px rgba(0,0,0,0.8)',
            display: 'block',
          }}
        />
      </PremiumSnapLayer>

      {/* ── LAYER 3 : Glassmorphism node connections ── */}
      <PremiumSnapLayer startFrame={120} zIndex={3}>
        {/* Full-canvas container so nodes are absolutely positioned correctly */}
        <div style={{ width: 1080, height: 1920, position: 'relative' }}>
          {/* SVG connecting lines */}
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
            <line
              x1={NODE_BF.cx} y1={NODE_BF.cy} x2={NODE_PS.cx} y2={NODE_PS.cy}
              stroke="url(#act2LineGrad)" strokeWidth={3} strokeLinecap="round"
              strokeDasharray={LINE_H} strokeDashoffset={LINE_H * (1 - hLineProgress)}
            />
            <line
              x1={NODE_BF.cx} y1={NODE_BF.cy} x2={NODE_FAT.cx} y2={NODE_FAT.cy}
              stroke="url(#act2LineGrad)" strokeWidth={3} strokeLinecap="round"
              strokeDasharray={LINE_LD} strokeDashoffset={LINE_LD * (1 - lLineProgress)}
            />
            <line
              x1={NODE_PS.cx} y1={NODE_PS.cy} x2={NODE_FAT.cx} y2={NODE_FAT.cy}
              stroke="url(#act2LineGrad)" strokeWidth={3} strokeLinecap="round"
              strokeDasharray={LINE_RD} strokeDashoffset={LINE_RD * (1 - rLineProgress)}
            />
          </svg>

          <GlassNode label="Brain Fog"        cx={NODE_BF.cx}  cy={NODE_BF.cy}  opacity={nodeBFOpacity}  scale={nodeBFScale} />
          <GlassNode label="Poor Sleep"       cx={NODE_PS.cx}  cy={NODE_PS.cy}  opacity={nodePSOpacity}  scale={nodePSScale} />
          <GlassNode label="Crashing Fatigue" cx={NODE_FAT.cx} cy={NODE_FAT.cy} opacity={nodeFatOpacity} scale={nodeFatScale} />
        </div>
      </PremiumSnapLayer>

      {/* ── PATTERN DECODER™ flash (above all layers) ── */}
      <div
        style={{
          position: 'absolute',
          top: 500,
          left: 0,
          right: 0,
          zIndex: 10,
          textAlign: 'center',
          fontFamily: NB,
          fontSize: 64,
          letterSpacing: 8,
          color: '#FFFFFF',
          opacity: flashOpacity,
          pointerEvents: 'none',
        }}
      >
        PATTERN DECODER™
      </div>

      {/* ── Audit VO panel ── */}
      <div
        style={{
          position: 'absolute',
          bottom: 140,
          left: 72,
          right: 72,
          zIndex: 10,
          ...GLASS_STYLE,
          padding: '40px 56px',
          textAlign: 'center',
          opacity: auditVOOpacity,
        }}
      >
        <div style={{ color: '#FFFFFF', fontSize: 44, marginBottom: 16, fontFamily: NB }}>
          We don't do average.
        </div>
        <div style={{ color: '#FFFFFF', fontSize: 44, marginBottom: 16, fontFamily: NB }}>
          Enter EverybodyOS.
        </div>
        <div style={{ color: 'rgba(255,255,255,0.6)', fontSize: 36, fontFamily: NB, lineHeight: 1.4 }}>
          The Energy Audit maps exactly where your drive is leaking.
        </div>
      </div>

      {/* ── Decoder VO panel ── */}
      <div
        style={{
          position: 'absolute',
          bottom: 140,
          left: 72,
          right: 72,
          zIndex: 10,
          ...GLASS_STYLE,
          padding: '40px 56px',
          textAlign: 'center',
          opacity: pdVOOpacity,
        }}
      >
        <div style={{ color: '#FFFFFF', fontSize: 44, marginBottom: 16, fontFamily: NB }}>
          Symptoms aren't random.
        </div>
        <div style={{ color: '#FFFFFF', fontSize: 44, marginBottom: 16, fontFamily: NB }}>
          They're data.
        </div>
        <div style={{ color: 'rgba(255,255,255,0.6)', fontSize: 36, fontFamily: NB }}>
          Pattern Decoder connects the dots.
        </div>
      </div>
    </AbsoluteFill>
  );
};
