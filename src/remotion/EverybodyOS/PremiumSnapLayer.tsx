import React from 'react';
import { interpolate, spring, useCurrentFrame, useVideoConfig } from 'remotion';

interface PremiumSnapLayerProps {
  children: React.ReactNode;
  startFrame: number;
  pushBackFrame?: number;
  zIndex: number;
}

export const PremiumSnapLayer: React.FC<PremiumSnapLayerProps> = ({
  children,
  startFrame,
  pushBackFrame = 9999,
  zIndex,
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const entranceProgress = spring({
    frame: frame - startFrame,
    fps,
    config: { damping: 16, mass: 0.8, stiffness: 140 },
  });

  const pushBackProgress = spring({
    frame: frame - pushBackFrame,
    fps,
    config: { damping: 20, mass: 1, stiffness: 100 },
  });

  const scaleIn    = interpolate(entranceProgress, [0, 1], [0.85, 1]);
  const translateYIn = interpolate(entranceProgress, [0, 1], [150, 0]);
  const opacityIn  = interpolate(entranceProgress, [0, 1], [0, 1]);

  const scaleOut      = interpolate(pushBackProgress, [0, 1], [1, 0.9]);
  const overlayOpacity = interpolate(pushBackProgress, [0, 1], [0, 0.6]);

  const currentScale = frame >= pushBackFrame ? scaleOut : scaleIn;

  return (
    <div
      style={{
        position: 'absolute',
        width: '100%',
        height: '100%',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        opacity: opacityIn,
        transform: `scale(${currentScale}) translateY(${translateYIn}px)`,
        zIndex,
        perspective: '1000px',
      }}
    >
      <div style={{ position: 'relative' }}>
        {children}
        <div
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: 'black',
            opacity: overlayOpacity,
            borderRadius: 24,
            pointerEvents: 'none',
          }}
        />
      </div>
    </div>
  );
};
