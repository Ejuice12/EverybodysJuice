import { Composition } from "remotion";
import { EverybodyOSVideo } from "./EverybodyOS/Video";

export const RemotionRoot: React.FC = () => (
  <>
    <Composition id="EverybodyOS" component={EverybodyOSVideo} durationInFrames={900} fps={30} width={1280} height={720} defaultProps={{}} />
  </>
);
