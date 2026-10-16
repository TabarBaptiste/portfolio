import React from "react";
import { Img, interpolate, staticFile, useCurrentFrame } from "remotion";
import { Chars, Chip, Dir, Scene, Typewriter, Words } from "../components";
import { BAR, BEAT, fonts, grounds, pop } from "../theme";

const g = grounds.paper;
const tech = ["PHP", "Bash", "Linux", "Ext JS"];

const Card: React.FC<{ src: string; style: React.CSSProperties; imgStyle?: React.CSSProperties }> = ({ src, style, imgStyle }) => (
    <div style={{ position: "absolute", borderRadius: 12, overflow: "hidden", backgroundColor: "#fff", ...style }}>
        <Img src={staticFile(src)} style={{ width: "100%", height: "100%", objectFit: "cover", objectPosition: "top left", ...imgStyle }} />
    </div>
);

// Capture principale parcourue en panoramique, puis deux fiches pivotent par-dessus
export const Svn: React.FC<{ duration: number; exit?: Dir }> = ({ duration, exit }) => {
    const frame = useCurrentFrame();
    const main = pop(frame, 6, 22);
    const pan = interpolate(frame, [0, duration], [0, -18]);
    const flipA = pop(frame, BAR, 17);
    const flipB = pop(frame, BAR + BEAT, 17);
    const settle = interpolate(flipA, [0, 1], [0, 1]);

    return (
        <Scene ground="paper" duration={duration} exit={exit} padded={false}>
            <div style={{ position: "absolute", left: 160, top: 110, width: 1600 }}>
                <Typewriter text="en production · val-de-marne" delay={8} speed={1} style={{ fontSize: 26, color: g.accent }} />
                <Chars text="Interface de gestion SVN" delay={4} stagger={1} style={{ fontFamily: fonts.display, fontSize: 110, lineHeight: 1.1, marginTop: 16, color: g.ink }} />
                <Words
                    text="Dépôts, branches, tags et sauvegardes gérés depuis le navigateur, sans ligne de commande."
                    delay={20}
                    stagger={2}
                    style={{ fontSize: 34, lineHeight: 1.45, color: g.ink, marginTop: 16, width: 1000 }}
                />
            </div>

            <div style={{ perspective: 1800, position: "absolute", inset: 0 }}>
                <Card
                    src="projects/interface-svn/accueil.png"
                    style={{
                        left: 160,
                        top: 430,
                        width: 1040,
                        height: 546,
                        border: `1px solid ${g.soft}22`,
                        transform: `translateY(${(1 - main) * 200}px) rotateY(${settle * 10}deg) scale(${1 - settle * 0.04})`,
                        transformOrigin: "0% 50%",
                        opacity: Math.min(1, main * 2),
                    }}
                    imgStyle={{ transform: `scale(1.18) translateX(${pan}%)`, transformOrigin: "0 0" }}
                />
                <Card
                    src="projects/interface-svn/lecture-droits.png"
                    style={{
                        left: 1150,
                        top: 380,
                        width: 640,
                        height: 360,
                        boxShadow: "0 30px 70px rgba(26, 24, 19, 0.22)",
                        transform: `rotateY(${(1 - flipA) * 90}deg) translateZ(40px)`,
                        transformOrigin: "100% 50%",
                        opacity: flipA > 0.02 ? 1 : 0,
                    }}
                />
                <Card
                    src="projects/interface-svn/permissions-production.png"
                    style={{
                        left: 1080,
                        top: 620,
                        width: 640,
                        height: 360,
                        boxShadow: "0 30px 70px rgba(26, 24, 19, 0.22)",
                        transform: `rotateY(${(1 - flipB) * 90}deg) translateZ(80px)`,
                        transformOrigin: "100% 50%",
                        opacity: flipB > 0.02 ? 1 : 0,
                    }}
                />
            </div>

            <div style={{ position: "absolute", left: 160, top: 1000 }}>
                {tech.map((t, i) => (
                    <Chip key={t} label={t} delay={2 * BAR + i * (BEAT / 2)} ground="paper" />
                ))}
            </div>
        </Scene>
    );
};
