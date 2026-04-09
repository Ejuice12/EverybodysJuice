import React, { useEffect, useState } from 'react';
import { AbsoluteFill, Sequence, continueRender, delayRender, staticFile } from 'remotion';
import { NB } from './constants';
import { Act1 } from './Act1';
import { Act2 } from './Act2';
import { Act3 } from './Act3';
import { Act4 } from './Act4';

// 35 seconds × 30 fps = 1050 frames
// ACT 1 : frames   0 – 149   (5 s)   "The Illusion of Normal"
// ACT 2 : frames 150 – 449  (10 s)   "Tearing Down the System"
// ACT 3 : frames 450 – 749  (10 s)   "The 1% Standard"
// ACT 4 : frames 750 – 1049 (10 s)   "Transcendence"

const FONT_CSS = `
@font-face {
  font-family: 'NB International';
  src: url('${staticFile('NBInternational.otf')}') format('opentype');
  font-weight: normal;
  font-style: normal;
}
`;

export const EverybodyOSVideo: React.FC = () => {
  const [fontHandle] = useState(() => delayRender('Loading NB International font'));

  useEffect(() => {
    const style = document.createElement('style');
    style.textContent = FONT_CSS;
    document.head.appendChild(style);

    document.fonts
      .load("1em 'NB International'")
      .then(() => continueRender(fontHandle))
      .catch(() => continueRender(fontHandle));

    return () => {
      document.head.removeChild(style);
    };
  }, [fontHandle]);

  return (
    <AbsoluteFill
      style={{
        background: '#000000',
        fontFamily: NB,
      }}
    >
      <Sequence from={0}   durationInFrames={150}><Act1 /></Sequence>
      <Sequence from={150} durationInFrames={300}><Act2 /></Sequence>
      <Sequence from={450} durationInFrames={300}><Act3 /></Sequence>
      <Sequence from={750} durationInFrames={300}><Act4 /></Sequence>
    </AbsoluteFill>
  );
};
