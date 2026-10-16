import React from "react";
import { Composition } from "remotion";
import { Presentation, totalDuration } from "./Presentation";
import { FPS } from "./theme";

export const Root: React.FC = () => (
    <Composition
        id="Presentation"
        component={Presentation}
        durationInFrames={totalDuration}
        fps={FPS}
        width={1920}
        height={1080}
    />
);
