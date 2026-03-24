"use client";

import { Player } from "@remotion/player";
import type { NextPage } from "next";
import { EverybodyOSVideo } from "../remotion/EverybodyOS/Video";

const Home: NextPage = () => {
  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-screen-lg m-auto px-6 py-16">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-foreground tracking-tight mb-2">
            EverybodyOS — 30s Motion Video
          </h1>
          <p className="text-sm text-subtitle">
            1280 × 720 · 30 fps · 30 seconds
          </p>
        </div>

        <div className="overflow-hidden rounded-geist shadow-[0_0_120px_rgba(0,229,192,0.08)]">
          <Player
            component={EverybodyOSVideo}
            inputProps={{}}
            durationInFrames={900}
            fps={30}
            compositionHeight={720}
            compositionWidth={1280}
            style={{ width: "100%" }}
            controls
            autoPlay
            loop
          />
        </div>

        <div className="mt-8 flex gap-4">
          <span className="text-sm text-subtitle">
            Render locally:{" "}
            <code className="bg-unfocused-border-color px-1.5 py-0.5 rounded text-foreground font-mono text-xs">
              npx remotion render EverybodyOS
            </code>
          </span>
        </div>
      </div>
    </div>
  );
};

export default Home;
