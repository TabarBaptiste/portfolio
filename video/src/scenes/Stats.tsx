import React from "react";
import { interpolate, useCurrentFrame } from "remotion";
import { Chars, Dir, Scene, Typewriter, Words, useMobile } from "../components";
import { BEAT, fonts, grounds, progress, easeInOut } from "../theme";

const g = grounds.paper;
// Largeur d'un panneau : un chiffre par écran en vertical
const panelFor = (mobile: boolean) => (mobile ? 1080 : 1150);
// Un chiffre tous les trois temps ; la caméra glisse d'un panneau à l'autre
const STOPS = [0, 3 * BEAT, 6 * BEAT, 9 * BEAT];

const stats = [
    { value: "3", count: 3, size: 440, mobileSize: 480, label: "années d'alternance", note: "au Conseil Départemental du Val-de-Marne" },
    { value: "5", count: 5, size: 440, mobileSize: 480, label: "projets en production", note: "dont une extension publiée sur le VSCode Marketplace" },
    { value: "TS · PHP", size: 200, mobileSize: 130, label: "stack principale", note: "NestJS, Next.js, Angular, Symfony" },
    { value: "BAC+5", size: 300, mobileSize: 210, label: "niveau d'études", note: "Mastère Architecte Web, Digital School of Paris" },
];

const cameraAt = (frame: number, panel: number) =>
    STOPS.slice(1).reduce((x, stop) => x + progress(frame, stop - 8, 26, easeInOut) * panel, 0);

export const Stats: React.FC<{ duration: number; exit?: Dir }> = ({ duration, exit }) => {
    const frame = useCurrentFrame();
    const m = useMobile();
    const PANEL = panelFor(m);
    const L = m
        ? { x: 80, width: 920, numTop: 560, numHeight: 520, labelTop: 1160, label: 80, noteTop: 1290, note: 36 }
        : { x: 160, width: PANEL - 80, numTop: 150, numHeight: 480, labelTop: 700, label: 72, noteTop: 820, note: 28 };
    const cam = cameraAt(frame, PANEL);
    // Effet de vitesse : le panneau s'incline pendant le déplacement
    const skew = interpolate(cam - cameraAt(frame - 1, PANEL), [0, 120], [0, -8], { extrapolateRight: "clamp" });

    return (
        <Scene ground="paper" duration={duration} exit={exit} padded={false}>
            <div style={{ position: "absolute", left: L.x, top: 0, transform: `translateX(${-cam}px) skewX(${skew}deg)` }}>
                {stats.map((stat, i) => {
                    const start = STOPS[i];
                    const next = STOPS[i + 1];
                    const active = progress(frame, start - 8, 26) - (next ? progress(frame, next - 8, 26) : 0);
                    const p = progress(frame, start, 36);
                    const shown = stat.count ? String(Math.round(p * stat.count)) : null;
                    return (
                        <div
                            key={stat.label}
                            style={{ position: "absolute", left: i * PANEL, top: 0, width: L.width, height: 1920, opacity: active }}
                        >
                            <div style={{ position: "absolute", left: 0, top: L.numTop, height: L.numHeight, display: "flex", alignItems: "flex-end" }}>
                                {shown !== null ? (
                                    <span style={{ fontFamily: fonts.mono, fontSize: m ? stat.mobileSize : stat.size, lineHeight: 0.8, color: g.ink, opacity: frame >= start ? 1 : 0 }}>
                                        {shown}
                                    </span>
                                ) : (
                                    <Chars text={stat.value} delay={start} stagger={3} style={{ fontFamily: fonts.mono, fontSize: m ? stat.mobileSize : stat.size, lineHeight: 0.85, color: g.ink }} />
                                )}
                            </div>
                            <Words text={stat.label} delay={start + 10} style={{ position: "absolute", top: L.labelTop, fontSize: L.label, fontWeight: 600, color: g.ink }} />
                            <Typewriter text={stat.note} delay={start + 22} speed={0.8} cursorUntil={next ?? Infinity} style={{ position: "absolute", top: L.noteTop, width: L.width, fontSize: L.note, lineHeight: 1.5, color: g.soft, whiteSpace: "pre-wrap" }} />
                        </div>
                    );
                })}
            </div>
        </Scene>
    );
};
