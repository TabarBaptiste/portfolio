import React from "react";
import { Composition } from "remotion";
import { Presentation, totalDuration } from "./Presentation";
import { FPS } from "./theme";

// Même montage, deux formats : 16:9 (site, LinkedIn, YouTube) et 9:16 (Reels, TikTok, Stories)
export const Root: React.FC = () => (
    <>
        <Composition id="Presentation" component={Presentation} durationInFrames={totalDuration} fps={FPS} width={1920} height={1080} />
        <Composition id="PresentationMobile" component={Presentation} durationInFrames={totalDuration} fps={FPS} width={1080} height={1920} />
    </>
);
