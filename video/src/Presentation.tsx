import React from "react";
import { AbsoluteFill, Audio, Sequence, interpolate, useCurrentFrame } from "remotion";
import "./fonts";
import { Dir, WIPE, Wipe, useMobile } from "./components";
import { Aly, alyEnd } from "./scenes/Aly";
import { Dao, daoEnd } from "./scenes/Dao";
import { Intro, introEnd } from "./scenes/Intro";
import { Journey, journeyEnd } from "./scenes/Journey";
import { Others, othersEnd } from "./scenes/Others";
import { Outro, outroEnd } from "./scenes/Outro";
import { Principles, principlesEnd } from "./scenes/Principles";
import { ProjectsTitle, projectsEnd } from "./scenes/ProjectsTitle";
import { Stack, stackEnd } from "./scenes/Stack";
import { Stats, statsEnd } from "./scenes/Stats";
import { Svn, svnEnd } from "./scenes/Svn";
import { BAR, Ground, fonts, grounds } from "./theme";
import timeline from "./timeline.json";
import music from "../audio/music.mp3";

type SceneProps = { duration: number; exit?: Dir };
const components: Record<string, React.FC<SceneProps>> = {
    intro: Intro,
    stats: Stats,
    principles: Principles,
    projects: ProjectsTitle,
    aly: Aly,
    dao: Dao,
    svn: Svn,
    others: Others,
    stack: Stack,
    journey: Journey,
    outro: Outro,
};
// Image à laquelle le dernier texte de chaque scène a eu le temps d'être lu
const readEnds: Record<string, number> = {
    intro: introEnd,
    stats: statsEnd,
    principles: principlesEnd,
    projects: projectsEnd,
    aly: alyEnd,
    dao: daoEnd,
    svn: svnEnd,
    others: othersEnd,
    stack: stackEnd,
    journey: journeyEnd,
    outro: outroEnd,
};

// Début et durée de chaque scène, en images, à partir des mesures du fichier timeline.json
const scenes = timeline.scenes.reduce<{ id: string; ground: Ground; label: string; enter?: Dir; from: number; duration: number }[]>(
    (acc, s) => {
        const prev = acc[acc.length - 1];
        const from = prev ? prev.from + prev.duration : 0;
        return [...acc, { id: s.id, ground: s.bg as Ground, label: s.label, enter: s.enter as Dir | undefined, from, duration: s.bars * BAR }];
    },
    [],
);

// Une scène trop courte couperait sa lecture : on le signale plutôt que de rendre une vidéo illisible
scenes.forEach((s, i) => {
    const next = scenes[i + 1];
    const need = readEnds[s.id] + (next?.enter && next.enter !== "zoom" ? WIPE : 0);
    if (need > s.duration) throw new Error(`timeline.json : la scène "${s.id}" doit durer ${Math.ceil(need / BAR)} mesures pour laisser le temps de lire`);
});

export const totalDuration = scenes[scenes.length - 1].from + scenes[scenes.length - 1].duration;

// Bandeau discret en haut, qui prend l'encre du chapitre en cours
const Chrome: React.FC = () => {
    const frame = useCurrentFrame();
    const m = useMobile();
    const current = scenes.find((s) => frame < s.from + s.duration) ?? scenes[scenes.length - 1];
    const last = scenes[scenes.length - 1].from;
    const opacity = interpolate(frame, [scenes[1].from, scenes[1].from + 20, last - 10, last], [0, 1, 1, 0], {
        extrapolateLeft: "clamp",
        extrapolateRight: "clamp",
    });
    const style: React.CSSProperties = { fontFamily: fonts.mono, fontSize: m ? 26 : 20, color: grounds[current.ground].soft };
    return (
        <AbsoluteFill style={{ opacity, pointerEvents: "none" }}>
            <div style={{ position: "absolute", top: m ? 90 : 50, left: m ? 80 : 160, right: m ? 80 : 160, display: "flex", justifyContent: "space-between" }}>
                <span style={style}>baptiste tabar labonne</span>
                <span style={style}>{current.label}</span>
            </div>
        </AbsoluteFill>
    );
};

export const Presentation: React.FC = () => (
    <AbsoluteFill style={{ backgroundColor: grounds.night.bg }}>
        {scenes.map((s, i) => {
            const Component = components[s.id];
            return (
                <Sequence key={s.id} from={s.from} durationInFrames={s.duration}>
                    <Component duration={s.duration} exit={scenes[i + 1]?.enter} />
                </Sequence>
            );
        })}
        <Chrome />
        {/* Volets entre chapitres : ils se terminent pile sur la coupe */}
        {scenes.map((s) =>
            s.enter && s.enter !== "zoom" ? (
                <Sequence key={`wipe-${s.id}`} from={s.from - WIPE} durationInFrames={WIPE}>
                    <Wipe dir={s.enter} to={s.ground} />
                </Sequence>
            ) : null,
        )}
        <Audio src={music} />
    </AbsoluteFill>
);
