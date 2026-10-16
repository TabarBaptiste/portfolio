import React from "react";
import { interpolate, useCurrentFrame } from "remotion";
import { Chars, Dir, Scene, Typewriter, Words } from "../components";
import { BEAT, fonts, grounds, progress, easeInOut } from "../theme";

const g = grounds.paper;
const PANEL = 1150;
// Un chiffre tous les trois temps ; la caméra glisse d'un panneau à l'autre
const STOPS = [0, 3 * BEAT, 6 * BEAT, 9 * BEAT];

const stats = [
    { value: "3", count: 3, size: 440, label: "années d'alternance", note: "au Conseil Départemental du Val-de-Marne" },
    { value: "5", count: 5, size: 440, label: "projets en production", note: "dont une extension publiée sur le VSCode Marketplace" },
    { value: "TS · PHP", size: 230, label: "stack principale", note: "NestJS, Next.js, Angular, Symfony" },
    { value: "BAC+5", size: 300, label: "niveau d'études", note: "Mastère Architecte Web, Digital School of Paris" },
];

const cameraAt = (frame: number) =>
    STOPS.slice(1).reduce((x, stop) => x + progress(frame, stop - 8, 26, easeInOut) * PANEL, 0);

export const Stats: React.FC<{ duration: number; exit?: Dir }> = ({ duration, exit }) => {
    const frame = useCurrentFrame();
    const cam = cameraAt(frame);
    // Effet de vitesse : le panneau s'incline pendant le déplacement
    const skew = interpolate(cam - cameraAt(frame - 1), [0, 120], [0, -8], { extrapolateRight: "clamp" });

    return (
        <Scene ground="paper" duration={duration} exit={exit} padded={false}>
            <div style={{ position: "absolute", left: 160, top: 0, transform: `translateX(${-cam}px) skewX(${skew}deg)` }}>
                {stats.map((stat, i) => {
                    const start = STOPS[i];
                    const next = STOPS[i + 1];
                    const active = progress(frame, start - 8, 26) - (next ? progress(frame, next - 8, 26) : 0);
                    const p = progress(frame, start, 36);
                    const shown = stat.count ? String(Math.round(p * stat.count)) : null;
                    return (
                        <div
                            key={stat.label}
                            style={{ position: "absolute", left: i * PANEL, top: 0, width: PANEL - 80, height: 1080, opacity: 0.15 + active * 0.85 }}
                        >
                            <div style={{ position: "absolute", left: 0, top: 150, height: 480, display: "flex", alignItems: "flex-end" }}>
                                {shown !== null ? (
                                    <span style={{ fontFamily: fonts.mono, fontSize: stat.size, lineHeight: 0.8, color: g.ink, opacity: frame >= start ? 1 : 0 }}>
                                        {shown}
                                    </span>
                                ) : (
                                    <Chars text={stat.value} delay={start} stagger={3} style={{ fontFamily: fonts.mono, fontSize: stat.size, lineHeight: 0.85, color: g.ink }} />
                                )}
                            </div>
                            <Words text={stat.label} delay={start + 10} style={{ position: "absolute", top: 700, fontSize: 72, fontWeight: 600, color: g.ink }} />
                            <Typewriter text={stat.note} delay={start + 22} speed={0.8} cursorUntil={next ?? Infinity} style={{ position: "absolute", top: 820, fontSize: 28, color: g.soft }} />
                        </div>
                    );
                })}
            </div>
        </Scene>
    );
};
