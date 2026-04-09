import { Composition } from "remotion";
import { EverybodyOSVideo } from "./EverybodyOS/Video";

export const RemotionRoot: React.FC = () => (
  <>
    <Composition
      id="EverybodyOS"
      component={EverybodyOSVideo}
      durationInFrames={1050}
      fps={30}
      width={1080}
      height={1920}
      defaultProps={{}}
    />
  </>
);
