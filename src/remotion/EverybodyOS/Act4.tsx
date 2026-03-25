/**
 * ACT 4 — "Transcendence"
 * Local frames 0 – 299 (10 seconds, global 750–1049)
 *
 *   0–149  : Rapid-fire montage — 5 screenshots cycle, 30 frames each (2 full loops)
 *            Each cut: scale 0.95→1.0 spring + fade in; orange pulse between cuts
 *   150    : Cut to pure black
 *   152–220: Three copy lines appear one at a time (~23 frames apart)
 *   222–240: All three lines fade out simultaneously
 *   240–260: EverybodyOS logo fades in (20 frames)
 *   255–270: Tagline "Biological intelligence for your body." fades in
 *   265–285: Hold (orange glow pulses)
 *   275–299: Slow fade to black
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
import { EverybodyOSLogo } from './Logo';

// The 5 asset filenames in cycle order
const MONTAGE_IMAGES = [
  'Energy_Audit_2.png',
  'Pattern_Decoder.jpeg',
  'Personal_Engine_Range_1.jpeg',
  'Personal_Engine_Range_2.jpeg',
  'Epignetic_Analyzer.png',
];

const FRAMES_PER_IMAGE = 30; // 5 images × 30 frames = 150-frame montage

export const Act4: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // ----------------------------------------------------------------
  // RAPID-FIRE MONTAGE (local 0–149)
  // ----------------------------------------------------------------
  const inMontage = frame < 150;

  const currentImageIndex = Math.floor(frame / FRAMES_PER_IMAGE) % MONTAGE_IMAGES.length;
  const slotFrame = frame % FRAMES_PER_IMAGE;

  // Per-slot spring: fast scale-in
  const montageScale = spring({
    frame: slotFrame,
    fps,
    config: { damping: 14, stiffness: 600, mass: 0.4 },
    from: 0.95,
    to: 1.0,
  });
  const montageOpacity = interpolate(slotFrame, [0, 6], [0, 1], {
    extrapolateRight: 'clamp',
  });

  // Orange gradient pulse flashes at every cut (slotFrame 0–3)
  const cutPulse = interpolate(slotFrame, [0, 3, 8], [0.5, 0, 0], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  // ----------------------------------------------------------------
  // BLACK SCREEN + COPY LINES (local 150–239)
  // ----------------------------------------------------------------
  const line1Opacity = interpolate(frame, [152, 162, 220, 240], [0, 1, 1, 0], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });
  const line2Opacity = interpolate(frame, [175, 185, 220, 240], [0, 1, 1, 0], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });
  const line3Opacity = interpolate(frame, [198, 208, 220, 240], [0, 1, 1, 0], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  // ----------------------------------------------------------------
  // LOGO + TAGLINE (local 240–299)
  // ----------------------------------------------------------------
  const logoOpacity = interpolate(frame, [240, 260], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });
  const taglineOpacity = interpolate(frame, [255, 270], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  // Soft glow pulse (one wave)
  const glowPulse = Math.max(
    0,
    Math.sin(interpolate(frame, [265, 299], [0, Math.PI], {
      extrapolateLeft: 'clamp',
      extrapolateRight: 'clamp',
    }))
  );

  // Final fade to black
  const finalFade = interpolate(frame, [275, 299], [1, 0], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  return (
    <AbsoluteFill style={{ background: '#000000', overflow: 'hidden', opacity: finalFade }}>

      {/* ============================================================
          RAPID-FIRE MONTAGE
      ============================================================ */}
      {inMontage && (
        <>
          {/* Current screenshot */}
          <div
            style={{
              position: 'absolute',
              inset: 0,
              opacity: montageOpacity,
              transform: `scale(${montageScale})`,
            }}
          >
            <Img
              src={staticFile(MONTAGE_IMAGES[currentImageIndex])}
              style={{
                width: '100%',
                height: '100%',
                objectFit: 'cover',
              }}
            />
          </div>

          {/* Darken overlay for readability */}
          <AbsoluteFill
            style={{ background: 'rgba(0,0,0,0.35)', pointerEvents: 'none' }}
          />

          {/* Orange gradient cut-flash */}
          <AbsoluteFill
            style={{
              background: 'linear-gradient(135deg, rgba(255,107,0,0.6), rgba(255,179,71,0.6))',
              opacity: cutPulse,
              pointerEvents: 'none',
            }}
          />
        </>
      )}

      {/* ============================================================
          THREE COPY LINES (black screen)
      ============================================================ */}
      {frame >= 150 && frame < 265 && (
        <AbsoluteFill
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            gap: 40,
          }}
        >
          <div
            style={{
              fontFamily: NB,
              fontSize: 72,
              color: '#fff',
              textAlign: 'center',
              opacity: line1Opacity,
            }}
          >
            Stop guessing.
          </div>
          <div
            style={{
              fontFamily: NB,
              fontSize: 72,
              color: '#fff',
              textAlign: 'center',
              opacity: line2Opacity,
            }}
          >
            Stop settling for fine.
          </div>
          <div
            style={{
              fontFamily: NB,
              fontSize: 72,
              textAlign: 'center',
              opacity: line3Opacity,
              ...ORANGE_TEXT_STYLE,
            }}
          >
            Take absolute control.
          </div>
        </AbsoluteFill>
      )}

      {/* ============================================================
          LOGO + TAGLINE
      ============================================================ */}
      {frame >= 240 && (
        <AbsoluteFill
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            gap: 48,
          }}
        >
          <EverybodyOSLogo
            size={1.1}
            opacity={logoOpacity}
            glowPulse={glowPulse}
          />

          <div
            style={{
              fontFamily: NB,
              fontSize: 38,
              color: '#fff',
              textAlign: 'center',
              opacity: taglineOpacity,
              letterSpacing: 1,
              maxWidth: 800,
              lineHeight: 1.4,
            }}
          >
            Biological intelligence for your body.
          </div>
        </AbsoluteFill>
      )}
    </AbsoluteFill>
  );
};
