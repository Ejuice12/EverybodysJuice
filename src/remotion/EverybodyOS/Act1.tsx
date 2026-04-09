/**
 * ACT 1 — "The Illusion of Normal"
 * Local frames 0 – 149 (5 seconds)
 *
 * 0–60   : Chaotic gray health-data web floats in
 * 0–100  : Three VO lines appear word-by-word in gray at centre
 * 120    : SHATTER — all gray elements snap to black in 2 frames
 * 120–150: EverybodyOS dark interface springs in; orange bleeds from edges
 * 125–150: Four white VO lines appear; "middle of the curve" in orange
 */
import React from 'react';
import {
  AbsoluteFill,
  interpolate,
  spring,
  useCurrentFrame,
  useVideoConfig,
} from 'remotion';
import { GLASS_STYLE, NB, ORANGE_TEXT_STYLE } from './constants';

// ------------------------------------------------------------------
// Floating data labels
// ------------------------------------------------------------------
const DATA_LABELS = [
  { text: '8,432 steps',     x:  80, y:  320 },
  { text: '2,100 cal',       x: 680, y:  220 },
  { text: '6.5 hrs sleep',   x: 110, y:  560 },
  { text: '74 bpm',          x: 720, y:  510 },
  { text: '98% SpO₂',        x:  60, y:  920 },
  { text: '120/80 mmHg',     x: 640, y:  870 },
  { text: '1,850 cal burned', x: 90, y: 1240 },
  { text: '7:32 active',     x: 660, y: 1190 },
];

// Sparse web connections between label indices
const WEB_EDGES = [
  [0, 1], [0, 2], [1, 3], [2, 4], [3, 5], [4, 6], [5, 7], [6, 7], [1, 5], [2, 6],
];

// ------------------------------------------------------------------
// Component
// ------------------------------------------------------------------
export const Act1: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // --- Gray elements disappear at frame 119-121 (instantaneous snap)
  const grayAlive = interpolate(frame, [118, 121], [1, 0], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  // --- Individual label entrance (stagger 0–50 frames)
  const labelOpacities = DATA_LABELS.map((_, i) =>
    grayAlive *
    interpolate(frame, [i * 6, i * 6 + 20], [0, 1], {
      extrapolateLeft: 'clamp',
      extrapolateRight: 'clamp',
    })
  );

  // --- Gray VO (lines stagger 10, 35, 60)
  const gVO = (start: number) =>
    grayAlive *
    interpolate(frame, [start, start + 18], [0, 1], {
      extrapolateLeft: 'clamp',
      extrapolateRight: 'clamp',
    });

  // --- Post-shatter: EverybodyOS interface
  const shatterFrame = Math.max(0, frame - 120);
  const interfaceScale = spring({
    frame: shatterFrame,
    fps,
    config: { damping: 12, stiffness: 500, mass: 0.5 },
    from: 0.8,
    to: 1.0,
  });
  const interfaceOpacity = interpolate(shatterFrame, [0, 8], [0, 1], {
    extrapolateRight: 'clamp',
  });
  const orangeBleed = interpolate(shatterFrame, [0, 30], [0, 1], {
    extrapolateRight: 'clamp',
  });

  // --- White VO lines (post-shatter, stagger every 6 frames from frame 124)
  const wVO = (start: number) =>
    interpolate(frame, [start, start + 8], [0, 1], {
      extrapolateLeft: 'clamp',
      extrapolateRight: 'clamp',
    });

  return (
    <AbsoluteFill style={{ background: '#000000', overflow: 'hidden' }}>

      {/* Orange edge bleed (post-shatter) */}
      <AbsoluteFill
        style={{
          opacity: orangeBleed * 0.45,
          background:
            'radial-gradient(ellipse at center, transparent 25%, rgba(255,107,0,0.35) 100%)',
          pointerEvents: 'none',
        }}
      />

      {/* --- SVG web overlay (gray connecting lines) --- */}
      <svg
        width={1080}
        height={1920}
        style={{ position: 'absolute', top: 0, left: 0, pointerEvents: 'none' }}
      >
        {WEB_EDGES.map(([a, b], i) => {
          const la = DATA_LABELS[a];
          const lb = DATA_LABELS[b];
          const avgOpacity = (labelOpacities[a] + labelOpacities[b]) / 2;
          return (
            <line
              key={i}
              x1={la.x + 80}
              y1={la.y + 20}
              x2={lb.x + 80}
              y2={lb.y + 20}
              stroke="rgba(200,200,200,0.18)"
              strokeWidth={1.5}
              opacity={avgOpacity}
            />
          );
        })}
      </svg>

      {/* --- Floating data labels --- */}
      {DATA_LABELS.map((label, i) => {
        const floatX = Math.sin((frame + i * 17) / 35) * 7;
        const floatY = Math.cos((frame + i * 13) / 28) * 9;
        return (
          <div
            key={i}
            style={{
              position: 'absolute',
              left: label.x + floatX,
              top: label.y + floatY,
              color: 'rgba(195,195,195,0.75)',
              fontSize: 36,
              fontFamily: NB,
              opacity: labelOpacities[i],
              letterSpacing: 0.5,
              pointerEvents: 'none',
            }}
          >
            {label.text}
          </div>
        );
      })}

      {/* --- Gray VO text (pre-shatter) --- */}
      <div
        style={{
          position: 'absolute',
          top: 820,
          left: 0,
          right: 0,
          textAlign: 'center',
          fontFamily: NB,
          pointerEvents: 'none',
        }}
      >
        <div
          style={{
            color: 'rgba(175,175,175,0.9)',
            fontSize: 52,
            marginBottom: 24,
            opacity: gVO(8),
          }}
        >
          You track your sleep.
        </div>
        <div
          style={{
            color: 'rgba(175,175,175,0.9)',
            fontSize: 52,
            marginBottom: 24,
            opacity: gVO(35),
          }}
        >
          You track your steps.
        </div>
        <div
          style={{
            color: 'rgba(175,175,175,0.9)',
            fontSize: 52,
            opacity: gVO(62),
          }}
        >
          You do what the apps tell you.
        </div>
      </div>

      {/* --- EverybodyOS interface mock (post-shatter) --- */}
      {frame >= 120 && (
        <AbsoluteFill
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            opacity: interfaceOpacity,
          }}
        >
          <div
            style={{
              transform: `scale(${interfaceScale})`,
              ...GLASS_STYLE,
              width: 940,
              padding: '56px 72px',
              textAlign: 'center',
            }}
          >
            {/* App header */}
            <div
              style={{
                background: 'linear-gradient(135deg, #FF6B00, #FFB347)',
                borderRadius: 12,
                padding: '10px 28px',
                display: 'inline-block',
                marginBottom: 40,
                fontSize: 30,
                color: '#fff',
                letterSpacing: 3,
                fontFamily: NB,
              }}
            >
              EverybodyOS
            </div>

            {/* Metric cards row */}
            <div
              style={{
                display: 'flex',
                justifyContent: 'space-around',
                marginBottom: 40,
              }}
            >
              {(['Energy', 'Sleep', 'Focus', 'Recovery'] as const).map(
                (label, i) => (
                  <div key={i} style={{ textAlign: 'center' }}>
                    <div
                      style={{
                        fontSize: 58,
                        fontFamily: NB,
                        ...ORANGE_TEXT_STYLE,
                      }}
                    >
                      {['94', '7.2', '88', '91'][i]}
                    </div>
                    <div
                      style={{
                        color: 'rgba(255,255,255,0.6)',
                        fontSize: 26,
                        fontFamily: NB,
                      }}
                    >
                      {label}
                    </div>
                  </div>
                )
              )}
            </div>

            {/* Fake energy bar */}
            <div
              style={{
                height: 8,
                borderRadius: 4,
                background: 'rgba(255,255,255,0.08)',
                overflow: 'hidden',
              }}
            >
              <div
                style={{
                  width: `${72 + Math.sin(frame * 0.1) * 3}%`,
                  height: '100%',
                  background: 'linear-gradient(135deg, #FF6B00, #FFB347)',
                  borderRadius: 4,
                }}
              />
            </div>
          </div>
        </AbsoluteFill>
      )}

      {/* --- White VO text (post-shatter, glassmorphism panel at bottom) --- */}
      {frame >= 124 && (
        <div
          style={{
            position: 'absolute',
            bottom: 160,
            left: 80,
            right: 80,
            ...GLASS_STYLE,
            padding: '44px 64px',
            textAlign: 'center',
          }}
        >
          <div
            style={{
              color: '#fff',
              fontSize: 46,
              marginBottom: 18,
              fontFamily: NB,
              opacity: wVO(124),
            }}
          >
            But you still feel off.
          </div>
          <div
            style={{
              color: '#fff',
              fontSize: 46,
              marginBottom: 18,
              fontFamily: NB,
              opacity: wVO(130),
            }}
          >
            Why?
          </div>
          <div
            style={{
              color: '#fff',
              fontSize: 46,
              marginBottom: 18,
              fontFamily: NB,
              opacity: wVO(136),
            }}
          >
            Because they're building for the average.
          </div>
          {/* "middle of the curve" — orange gradient, single pulse scale */}
          <div
            style={{
              fontSize: 46,
              fontFamily: NB,
              opacity: wVO(142),
              ...ORANGE_TEXT_STYLE,
              transform: `scale(${
                1 +
                interpolate(frame, [146, 152, 156], [0, 0.06, 0], {
                  extrapolateLeft: 'clamp',
                  extrapolateRight: 'clamp',
                })
              })`,
              display: 'inline-block',
            }}
          >
            The middle of the curve.
          </div>
        </div>
      )}
    </AbsoluteFill>
  );
};
