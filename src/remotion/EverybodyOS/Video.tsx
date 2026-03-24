import { fontFamily, loadFont } from '@remotion/google-fonts/Inter';
import { AbsoluteFill, Sequence } from 'remotion';
import { Background } from './Background';
import { Scene1 } from './Scene1';
import { Scene2 } from './Scene2';
import { Scene3 } from './Scene3';
import { Scene4 } from './Scene4';

loadFont('normal', { subsets: ['latin'], weights: ['400', '600', '700', '800', '900'] });

// 30 seconds × 30fps = 900 frames total
// Scenes overlap ~30 frames for cross-fade transitions
const S1_START = 0;   const S1_DUR = 270;
const S2_START = 240; const S2_DUR = 260;
const S3_START = 468; const S3_DUR = 235;
const S4_START = 672; const S4_DUR = 228;

export const EverybodyOSVideo: React.FC = () => (
  <AbsoluteFill style={{ fontFamily }}>
    <Background />
    <Sequence from={S1_START} durationInFrames={S1_DUR}><Scene1 durationInFrames={S1_DUR} /></Sequence>
    <Sequence from={S2_START} durationInFrames={S2_DUR}><Scene2 durationInFrames={S2_DUR} /></Sequence>
    <Sequence from={S3_START} durationInFrames={S3_DUR}><Scene3 durationInFrames={S3_DUR} /></Sequence>
    <Sequence from={S4_START} durationInFrames={S4_DUR}><Scene4 durationInFrames={S4_DUR} /></Sequence>
  </AbsoluteFill>
);
